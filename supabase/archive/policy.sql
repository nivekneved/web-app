-- ==========================================
-- POLICY.SQL
-- Consolidated RLS Policies
-- Last Updated: 2026-03-18
-- ==========================================

-- Enable RLS on all tables
ALTER TABLE public.admins ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.room_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hotel_rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.booking_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hero_slides ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;

-- 1. ADMINS POLICIES
CREATE POLICY "Public profiles are viewable by everyone" ON public.admins FOR SELECT USING (true);
CREATE POLICY "Admins can manage other admins" ON public.admins FOR ALL USING (is_admin());

-- 2. CATEGORIES POLICIES
CREATE POLICY "Categories are viewable by everyone" ON public.categories FOR SELECT USING (true);
CREATE POLICY "Admins can manage categories" ON public.categories FOR ALL USING (is_admin());

-- 3. SERVICES POLICIES
CREATE POLICY "Services are viewable by everyone" ON public.services FOR SELECT USING (true);
CREATE POLICY "Admins can manage services" ON public.services FOR ALL USING (is_admin());

-- 4. ROOM_TYPES POLICIES
CREATE POLICY "Room types are viewable by everyone" ON public.room_types FOR SELECT USING (true);
CREATE POLICY "Admins can manage room types" ON public.room_types FOR ALL USING (is_admin());

-- 5. HOTEL_ROOMS POLICIES
CREATE POLICY "Hotel rooms are viewable by everyone" ON public.hotel_rooms FOR SELECT USING (true);
CREATE POLICY "Admins can manage hotel rooms" ON public.hotel_rooms FOR ALL USING (is_admin());

-- 6. CUSTOMERS POLICIES
CREATE POLICY "Users can view their own profile" ON public.customers FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update their own profile" ON public.customers FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Admins can view all customers" ON public.customers FOR SELECT USING (is_admin());
CREATE POLICY "Admins can manage customers" ON public.customers FOR ALL USING (is_admin());

-- 7. BOOKINGS POLICIES
CREATE POLICY "Users can view their own bookings" ON public.bookings FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.customers 
    WHERE customers.id = bookings.customer_id 
    AND customers.user_id = auth.uid()
  )
);
CREATE POLICY "Admins can manage all bookings" ON public.bookings FOR ALL USING (is_admin_or_staff());

-- 8. SITE_SETTINGS POLICIES
CREATE POLICY "Site settings are viewable by everyone" ON public.site_settings FOR SELECT USING (true);
CREATE POLICY "Admins can manage site settings" ON public.site_settings FOR ALL USING (is_admin());

-- 9. HERO_SLIDES POLICIES
CREATE POLICY "Hero slides are viewable by everyone" ON public.hero_slides FOR SELECT USING (true);
CREATE POLICY "Admins can manage hero slides" ON public.hero_slides FOR ALL USING (is_admin());

-- 10. FAQS POLICIES
CREATE POLICY "FAQs are viewable by everyone" ON public.faqs FOR SELECT USING (true);
CREATE POLICY "Admins can manage faqs" ON public.faqs FOR ALL USING (is_admin());
