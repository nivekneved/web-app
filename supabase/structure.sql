-- ==========================================
-- STRUCTURE.SQL
-- Consolidated Database Schema
-- Last Updated: 2026-03-18
-- ==========================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "pg_stat_statements";
CREATE EXTENSION IF NOT EXISTS "pg_graphql";

-- 2. FUNCTIONS

-- Function to reorder hero slides
CREATE OR REPLACE FUNCTION public.reorder_hero_slides(new_orders jsonb)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
    item RECORD;
BEGIN
    FOR item IN SELECT * FROM jsonb_to_recordset(new_orders) AS x(id UUID, order_index INT)
    LOOP
        UPDATE public.hero_slides
        SET order_index = item.order_index
        WHERE id = item.id;
    END LOOP;
END;
$function$;

-- Function to handle booking creation (v1)
CREATE OR REPLACE FUNCTION public.create_booking_v1(p_booking_data jsonb, p_items_data jsonb)
 RETURNS jsonb
 LANGUAGE plpgsql
AS $function$
DECLARE
  v_booking_id UUID;
  v_result JSONB;
BEGIN
  INSERT INTO bookings (
    customer_id,
    start_date,
    end_date,
    status,
    payment_status,
    pax_adults,
    pax_children,
    amount,
    tax_amount,
    activity_type,
    activity_name,
    description,
    created_at,
    updated_at
  ) VALUES (
    (p_booking_data->>'customer_id')::UUID,
    (p_booking_data->>'start_date')::TIMESTAMP WITH TIME ZONE,
    (p_booking_data->>'end_date')::TIMESTAMP WITH TIME ZONE,
    p_booking_data->>'status',
    COALESCE(p_booking_data->>'payment_status', 'pending'),
    (p_booking_data->>'pax_adults')::INTEGER,
    (p_booking_data->>'pax_children')::INTEGER,
    (p_booking_data->>'amount')::NUMERIC,
    COALESCE((p_booking_data->>'tax_amount')::NUMERIC, 0),
    p_booking_data->>'activity_type',
    p_booking_data->>'activity_name',
    p_booking_data->>'description',
    COALESCE((p_booking_data->>'created_at')::TIMESTAMP WITH TIME ZONE, NOW()),
    NOW()
  ) RETURNING id INTO v_booking_id;

  INSERT INTO booking_items (
    booking_id,
    service_id,
    service_name,
    service_category,
    amount,
    created_at
  )
  SELECT 
    v_booking_id,
    (item->>'service_id')::UUID,
    item->>'service_name',
    item->>'service_category',
    (item->>'amount')::NUMERIC,
    NOW()
  FROM jsonb_array_elements(p_items_data) AS item;

  v_result := jsonb_build_object(
    'id', v_booking_id,
    'success', true
  );

  RETURN v_result;
EXCEPTION WHEN OTHERS THEN
  RAISE;
END;
$function$;

-- Authorization Helper Functions
CREATE OR REPLACE FUNCTION public.is_secretary()
 RETURNS boolean
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
    current_user_email TEXT;
BEGIN
    current_user_email := (SELECT auth.jwt() ->> 'email');
    IF current_user_email IS NULL THEN RETURN FALSE; END IF;

    RETURN EXISTS (
        SELECT 1 FROM public.admins 
        WHERE email = current_user_email
        AND role = 'secretary'
        AND is_active = true
    );
END;
$function$;

CREATE OR REPLACE FUNCTION public.is_admin()
 RETURNS boolean
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM public.admins 
        WHERE user_id = auth.uid()
        AND role IN ('admin', 'super_admin', 'manager', 'staff', 'editor')
        AND is_active = true
    );
END;
$function$;

CREATE OR REPLACE FUNCTION public.is_admin_or_staff()
 RETURNS boolean
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM public.admins 
        WHERE user_id = auth.uid()
        AND role IN ('admin', 'super_admin', 'manager', 'staff', 'sales', 'editor', 'receptionist', 'secretary', 'operator', 'tech')
        AND is_active = true
    );
END;
$function$;

-- Updated_at Trigger Function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
 RETURNS trigger
 LANGUAGE plpgsql
 SET search_path TO 'public'
AS $function$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$function$;

-- 3. TABLES

-- Categories
CREATE TABLE IF NOT EXISTS public.categories (
    id uuid DEFAULT extensions.uuid_generate_v4() PRIMARY KEY,
    name varchar NOT NULL,
    slug varchar UNIQUE NOT NULL,
    icon varchar,
    image_url text,
    link varchar,
    display_order integer DEFAULT 0,
    is_active boolean DEFAULT true,
    created_at timestamp DEFAULT now(),
    updated_at timestamp DEFAULT now(),
    description text,
    show_on_home boolean DEFAULT true
);

-- Admins
CREATE TABLE IF NOT EXISTS public.admins (
    id uuid DEFAULT extensions.uuid_generate_v4() PRIMARY KEY,
    username varchar NOT NULL,
    email varchar UNIQUE NOT NULL,
    password varchar NOT NULL,
    role varchar DEFAULT 'admin',
    created_at timestamp DEFAULT now(),
    updated_at timestamp DEFAULT now(),
    name text,
    bio text,
    photo_url text,
    linkedin_url text,
    display_order integer DEFAULT 0,
    is_active boolean DEFAULT true,
    show_on_front_page boolean DEFAULT true,
    user_id uuid REFERENCES auth.users(id)
);

-- Services (Core Catalog)
CREATE TABLE IF NOT EXISTS public.services (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    name text NOT NULL,
    description text,
    location text,
    region text,
    base_price numeric,
    rating numeric DEFAULT 4.5,
    image_url text,
    secondary_image_url text,
    amenities text[],
    service_type text CHECK (service_type IN ('hotel', 'cruise', 'tour', 'activity', 'transfer', 'flight', 'visa', 'corporate', 'land_activity', 'sea_activity')),
    duration_days integer,
    duration_hours integer,
    max_group_size integer,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now(),
    room_types jsonb DEFAULT '[]',
    itinerary jsonb DEFAULT '[]',
    stock integer,
    status text DEFAULT 'active',
    cta_text text,
    cta_link text,
    gallery_images text[],
    meta_title text,
    meta_description text,
    seo_keywords text,
    special_features jsonb DEFAULT '[]',
    seasonality text,
    highlights jsonb DEFAULT '[]',
    included jsonb DEFAULT '[]',
    not_included jsonb DEFAULT '[]',
    cancellation_policy text,
    terms_and_conditions text,
    thumbnail_url text,
    banner_url text,
    featured boolean DEFAULT false,
    priority integer DEFAULT 0,
    is_seasonal_deal boolean DEFAULT false,
    deal_note text DEFAULT 'Limited Time'
);

-- Room Types (Table-based storage)
CREATE TABLE IF NOT EXISTS public.room_types (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    service_id uuid REFERENCES public.services(id) ON DELETE CASCADE,
    name text NOT NULL,
    weekday_price numeric,
    weekend_price numeric,
    amenities text[],
    max_occupancy integer DEFAULT 2,
    min_stay_days integer DEFAULT 1
);

-- Hotel Rooms (Inventory-based storage)
CREATE TABLE IF NOT EXISTS public.hotel_rooms (
    id uuid DEFAULT extensions.uuid_generate_v4() PRIMARY KEY,
    service_id uuid REFERENCES public.services(id) ON DELETE CASCADE,
    name text,
    type text,
    price_per_night numeric DEFAULT 0,
    total_units integer DEFAULT 1,
    created_at timestamptz DEFAULT timezone('utc'::text, now()),
    updated_at timestamptz DEFAULT now(),
    size text,
    bed text,
    view text,
    features jsonb DEFAULT '[]',
    image_url text,
    max_occupancy integer DEFAULT 2,
    meal_plan text DEFAULT 'Room Only',
    cancellation_policy text,
    deposit_policy text,
    is_active boolean DEFAULT true,
    min_stay_days integer DEFAULT 1
);

-- Customers
CREATE TABLE IF NOT EXISTS public.customers (
    id uuid DEFAULT extensions.uuid_generate_v4() PRIMARY KEY,
    first_name text,
    last_name text,
    email text UNIQUE NOT NULL,
    phone text,
    address text,
    country text,
    is_subscriber boolean DEFAULT false,
    newsletter_opt_in_date timestamptz,
    marketing_tags text[],
    status text DEFAULT 'Active',
    total_bookings_count integer DEFAULT 0,
    total_spend numeric DEFAULT 0.00,
    last_interaction_at timestamptz DEFAULT now(),
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now(),
    user_id uuid REFERENCES auth.users(id)
);

-- Bookings
CREATE TABLE IF NOT EXISTS public.bookings (
    id uuid DEFAULT extensions.uuid_generate_v4() PRIMARY KEY,
    customer_id uuid REFERENCES public.customers(id),
    activity_type text,
    activity_name text,
    description text,
    start_date timestamptz,
    end_date timestamptz,
    start_time time,
    end_time time,
    amount numeric DEFAULT 0.00,
    tax_amount numeric DEFAULT 0.00,
    total_amount numeric GENERATED ALWAYS AS (amount + tax_amount) STORED,
    currency text DEFAULT 'USD',
    payment_status text DEFAULT 'Pending',
    status text DEFAULT 'Pending',
    pax_adults integer DEFAULT 1,
    pax_children integer DEFAULT 0,
    lounge_name text,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- Booking Items
CREATE TABLE IF NOT EXISTS public.booking_items (
    id uuid DEFAULT extensions.uuid_generate_v4() PRIMARY KEY,
    booking_id uuid REFERENCES public.bookings(id) ON DELETE CASCADE,
    service_id uuid REFERENCES public.services(id),
    service_name text,
    service_category text,
    amount numeric DEFAULT 0.00,
    created_at timestamptz DEFAULT now()
);

-- Site Settings
CREATE TABLE IF NOT EXISTS public.site_settings (
    key text PRIMARY KEY,
    value jsonb NOT NULL,
    category text NOT NULL,
    description text,
    updated_at timestamptz DEFAULT timezone('utc'::text, now())
);

-- Hero Slides
CREATE TABLE IF NOT EXISTS public.hero_slides (
    id uuid DEFAULT extensions.uuid_generate_v4() PRIMARY KEY,
    image_url text NOT NULL,
    title text NOT NULL,
    subtitle text,
    description text,
    cta_text text DEFAULT 'Explore',
    cta_link text DEFAULT '/search',
    order_index integer DEFAULT 0,
    is_active boolean DEFAULT true,
    created_at timestamptz DEFAULT timezone('utc'::text, now()),
    updated_at timestamptz DEFAULT timezone('utc'::text, now()),
    video_url text,
    media_type varchar DEFAULT 'image',
    alignment text DEFAULT 'center',
    overlay_opacity float8 DEFAULT 0.4,
    animation_type text DEFAULT 'fade',
    duration integer DEFAULT 6000
);

-- Related Tables
CREATE TABLE IF NOT EXISTS public.service_categories (
    id uuid DEFAULT extensions.uuid_generate_v4() PRIMARY KEY,
    service_id uuid REFERENCES public.services(id) ON DELETE CASCADE,
    category_id uuid REFERENCES public.categories(id) ON DELETE CASCADE,
    created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.faqs (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    category text DEFAULT 'General',
    question text NOT NULL,
    answer text NOT NULL,
    order_index integer DEFAULT 0,
    is_published boolean DEFAULT true,
    created_at timestamptz DEFAULT timezone('utc'::text, now())
);

-- 4. TRIGGERS
CREATE TRIGGER update_admins_updated_at BEFORE UPDATE ON public.admins FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON public.categories FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_hero_slides_updated_at BEFORE UPDATE ON public.hero_slides FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_hotel_rooms_updated_at BEFORE UPDATE ON public.hotel_rooms FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_customers_modtime BEFORE UPDATE ON public.customers FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_bookings_modtime BEFORE UPDATE ON public.bookings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
