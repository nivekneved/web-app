-- Safer script to reset all tables by truncating them
-- Checks if tables exist before truncating to avoid "relation does not exist" errors
-- This will remove all data from the tables while preserving the structure

DO $$
BEGIN
  -- Disable triggers temporarily to avoid foreign key constraint issues
  SET session_replication_role = replica;

  -- Truncate tables in the correct order (dependent tables first)
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'booking_items' AND table_schema = 'public') THEN
    TRUNCATE TABLE public.booking_items RESTART IDENTITY CASCADE;
  END IF;

  IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'bookings' AND table_schema = 'public') THEN
    TRUNCATE TABLE public.bookings RESTART IDENTITY CASCADE;
  END IF;

  IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'reviews' AND table_schema = 'public') THEN
    TRUNCATE TABLE public.reviews RESTART IDENTITY CASCADE;
  END IF;

  IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'hotel_rooms' AND table_schema = 'public') THEN
    TRUNCATE TABLE public.hotel_rooms RESTART IDENTITY CASCADE;
  END IF;

  IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'service_categories' AND table_schema = 'public') THEN
    TRUNCATE TABLE public.service_categories RESTART IDENTITY CASCADE;
  END IF;

  IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'services' AND table_schema = 'public') THEN
    TRUNCATE TABLE public.services RESTART IDENTITY CASCADE;
  END IF;

  IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'customers' AND table_schema = 'public') THEN
    TRUNCATE TABLE public.customers RESTART IDENTITY CASCADE;
  END IF;

  IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'faqs' AND table_schema = 'public') THEN
    TRUNCATE TABLE public.faqs RESTART IDENTITY CASCADE;
  END IF;

  IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'content_blocks' AND table_schema = 'public') THEN
    TRUNCATE TABLE public.content_blocks RESTART IDENTITY CASCADE;
  END IF;

  IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'inquiries' AND table_schema = 'public') THEN
    TRUNCATE TABLE public.inquiries RESTART IDENTITY CASCADE;
  END IF;

  IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'subscribers' AND table_schema = 'public') THEN
    TRUNCATE TABLE public.subscribers RESTART IDENTITY CASCADE;
  END IF;

  IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'editorial_posts' AND table_schema = 'public') THEN
    TRUNCATE TABLE public.editorial_posts RESTART IDENTITY CASCADE;
  END IF;

  IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'popular_destinations' AND table_schema = 'public') THEN
    TRUNCATE TABLE public.popular_destinations RESTART IDENTITY CASCADE;
  END IF;

  IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'categories' AND table_schema = 'public') THEN
    TRUNCATE TABLE public.categories RESTART IDENTITY CASCADE;
  END IF;

  IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'navigations' AND table_schema = 'public') THEN
    TRUNCATE TABLE public.navigations RESTART IDENTITY CASCADE;
  END IF;

  IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'admins' AND table_schema = 'public') THEN
    TRUNCATE TABLE public.admins RESTART IDENTITY CASCADE;
  END IF;

  IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'products' AND table_schema = 'public') THEN
    TRUNCATE TABLE public.products RESTART IDENTITY CASCADE;
  END IF;

  IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'product_categories' AND table_schema = 'public') THEN
    TRUNCATE TABLE public.product_categories RESTART IDENTITY CASCADE;
  END IF;

  IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'product_category_assignments' AND table_schema = 'public') THEN
    TRUNCATE TABLE public.product_category_assignments RESTART IDENTITY CASCADE;
  END IF;

  -- Re-enable triggers
  SET session_replication_role = DEFAULT;
END $$;