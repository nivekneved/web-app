-- Comprehensive seed data for all tables (at least 11 rows each)
-- Consolidated working version

DO $$
DECLARE
    cat_activities UUID;
    cat_tours UUID;
    cat_hotels UUID;
    cat_cruises UUID;
    cat_deals UUID;
    h_id UUID;
BEGIN

-- 1. Categories
INSERT INTO public.categories (name, slug, description, image_url, show_on_home, display_order) VALUES
('Activities', 'activities', 'Exhilarating experiences', '/hero-flight.png', true, 1),
('Tours', 'tours', 'Guided journeys', '/hero-tour.png', true, 2),
('Hotels', 'hotels', 'Premium stays', '/hero-hotel.png', true, 6),
('Cruises', 'cruises', 'Luxury sailing', '/hero-cruise.png', true, 4),
('Local Deals', 'local-deals', 'Exclusive offers', '/hero-deals.png', true, 11),
('Day Packages', 'day-packages', 'Exclusive one-day escapes', '/hero-hotel.png', true, 3),
('Rodrigues', 'rodrigues', 'Discover the untouched charm', '/hero-rodrigues.png', true, 5),
('Flights', 'flights', 'Best deals', '/hero-flight.png', true, 7),
('Transfers', 'transfers', 'Reliable transportation', '/hero-transfer.png', true, 8),
('Travel Insurance', 'travel-insurance', 'Peace of mind', '/hero-insurance.png', true, 9),
('Visa Services', 'visa-services', 'Assistance with applications', '/hero-visa.png', true, 10),
('Tailor Made', 'tailor-made', 'Customized experiences', '/hero-tailor.png', true, 12),
('Corporate Travel', 'corporate', 'Business travel solutions', '/hero-business.png', true, 13)
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name;

SELECT id INTO cat_activities FROM public.categories WHERE slug = 'activities';
SELECT id INTO cat_tours FROM public.categories WHERE slug = 'tours';
SELECT id INTO cat_hotels FROM public.categories WHERE slug = 'hotels';
SELECT id INTO cat_cruises FROM public.categories WHERE slug = 'cruises';
SELECT id INTO cat_deals FROM public.categories WHERE slug = 'local-deals';

-- 2. Services
INSERT INTO public.services (name, description, location, region, base_price, rating, image_url, service_type, amenities) VALUES
('LUX* Grand Baie', 'Luxury resort', 'Grand Baie', 'North', 35000, 4.8, '/hotels/lux.jpg', 'hotel', ARRAY['Wifi', 'Pool']),
('Constance Prince Maurice', 'Exclusive luxury', 'Poste de Flacq', 'East', 52000, 4.9, '/hotels/constance.jpg', 'hotel', ARRAY['Wifi', 'Golf']),
('The Oberoi', 'Beachfront luxury', 'Turtle Bay', 'North-West', 45000, 5.0, '/hotels/oberoi.jpg', 'hotel', ARRAY['Wifi', 'Beach']),
('Seven Seas Explorer', 'Indian Ocean Cruise', 'Port Louis', 'Indian Ocean', 120000, 4.9, '/cruises/sevenseas.jpg', 'cruise', ARRAY['Luxury']),
('Rodrigues Adventure', 'Untouched beauty', 'Port Mathurin', 'Rodrigues', 18500, 4.9, '/tours/rodrigues.jpg', 'tour', ARRAY['Nature']),
('Grand North Tour', 'Historic north', 'Port Louis', 'North', 8500, 4.6, '/tours/north.jpg', 'tour', ARRAY['Guide']),
('Catamaran Sunset', 'Dinner on water', 'Trou aux Biches', 'North', 4500, 4.8, '/activities/catamaran.jpg', 'activity', ARRAY['Dinner']),
('Underwater Walk', 'Marine life', 'Grand Baie', 'North', 3200, 4.7, '/activities/underwater.jpg', 'activity', ARRAY['Gear']),
('Four Seasons', 'Southern luxury', 'Bel Ombre', 'South', 60000, 4.9, '/hotels/fourseasons.jpg', 'hotel', ARRAY['Beach']),
('Tea Route', 'Culinary journey', 'Bois Cheri', 'South', 4200, 4.7, '/tours/tea.jpg', 'tour', ARRAY['Tasting']),
('Chamarel Wonders', 'Coloured Earth', 'Chamarel', 'South-West', 2500, 4.8, '/activities/chamarel.jpg', 'activity', ARRAY['Sightseeing']),
('Shangri-La Touessrok', 'Lagoon luxury', 'Trou d''Eau Douce', 'East', 48000, 4.9, '/hotels/shangrila.jpg', 'hotel', ARRAY['Private Island']),
('Sofitel Trois Iles', 'Ocean views', 'Black River', 'West', 42000, 4.7, '/hotels/sofitel.jpg', 'hotel', ARRAY['Pool'])
ON CONFLICT DO NOTHING;

-- 3. Service Categories
INSERT INTO public.service_categories (service_id, category_id)
SELECT s.id, cat_hotels FROM public.services s WHERE s.service_type = 'hotel'
UNION ALL
SELECT s.id, cat_cruises FROM public.services s WHERE s.service_type = 'cruise'
UNION ALL
SELECT s.id, cat_tours FROM public.services s WHERE s.service_type = 'tour'
UNION ALL
SELECT s.id, cat_activities FROM public.services s WHERE s.service_type = 'activity'
ON CONFLICT DO NOTHING;

-- 4. Admins
INSERT INTO public.admins (username, email, password, role, name) VALUES
('sysadmin', 'admin@travellounge.mu', 'hash', 'super_admin', 'System Admin'),
('jdoe', 'john@travellounge.mu', 'hash', 'admin', 'John Doe'),
('jsmith', 'jane@travellounge.mu', 'hash', 'manager', 'Jane Smith'),
('rwhite', 'robert@travellounge.mu', 'hash', 'operator', 'Robert White'),
('ewilliams', 'emily@travellounge.mu', 'hash', 'support', 'Emily Williams'),
('mbrown', 'michael@travellounge.mu', 'hash', 'staff', 'Michael Brown'),
('sdavis', 'sarah@travellounge.mu', 'hash', 'editor', 'Sarah Davis'),
('dmiller', 'david@travellounge.mu', 'hash', 'sales', 'David Miller'),
('lwilson', 'laura@travellounge.mu', 'hash', 'marketing', 'Laura Wilson'),
('ktaylor', 'kevin@travellounge.mu', 'hash', 'tech', 'Kevin Taylor'),
('athomas', 'anna@travellounge.mu', 'hash', 'finance', 'Anna Thomas'),
('canderson', 'chris@travellounge.mu', 'hash', 'hr', 'Chris Anderson'),
('ljackson', 'lisa@travellounge.mu', 'hash', 'operations', 'Lisa Jackson')
ON CONFLICT (email) DO NOTHING;

-- 5. Customers
INSERT INTO public.customers (first_name, last_name, email, phone, status) VALUES
('James', 'Wilson', 'james.w@email.com', '23055678901', 'Active'),
('Sarah', 'Thompson', 'sarah.t@email.com', '23055678902', 'Active'),
('Michael', 'Chen', 'michael.c@email.com', '23055678903', 'Active'),
('Emma', 'Davis', 'emma.d@email.com', '23055678904', 'Active'),
('Robert', 'Garcia', 'robert.g@email.com', '23055678905', 'Active'),
('Jennifer', 'Lee', 'jennifer.l@email.com', '23055678906', 'Active'),
('David', 'Kim', 'david.k@email.com', '23055678907', 'Active'),
('Lisa', 'Anderson', 'lisa.a@email.com', '23055678908', 'Active'),
('Mark', 'Johnson', 'mark.j@email.com', '23055678909', 'Active'),
('Paul', 'Roberts', 'paul.r@email.com', '23055678910', 'Active'),
('Nancy', 'White', 'nancy.w@email.com', '23055678911', 'Active'),
('Tom', 'Brown', 'tom.b@email.com', '23055678912', 'Active'),
('Alice', 'Wonder', 'alice@test.com', '23055678913', 'Active')
ON CONFLICT (email) DO NOTHING;

-- 6. Profiles
INSERT INTO public.profiles (id, name, email, phone)
SELECT id, first_name || ' ' || last_name, email, phone FROM public.customers
ON CONFLICT (id) DO NOTHING;

-- 7. Bookings
INSERT INTO public.bookings (customer_id, activity_type, activity_name, start_date, amount, status, payment_status)
SELECT id, 'hotel', 'Booking for ' || first_name, NOW(), 1000, 'Confirmed', 'Paid' FROM public.customers
ON CONFLICT DO NOTHING;

-- 8. Booking Items
INSERT INTO public.booking_items (booking_id, service_name, amount)
SELECT id, 'Primary Item', amount FROM public.bookings
ON CONFLICT DO NOTHING;

-- 9. FAQs
INSERT INTO public.faqs (question, answer, category, order_index) VALUES
('How to book?', 'A: Simple...', 'General', 1),
('Refund?', 'A: Contact us', 'General', 2),
('Visa?', 'A: We help', 'General', 3),
('Payment?', 'A: All cards', 'General', 4),
('Hotel?', 'A: Check in 2pm', 'General', 5),
('Flight?', 'A: Baggage 23kg', 'General', 6),
('Insurance?', 'A: Safe travel', 'General', 7),
('Group?', 'A: 10% off', 'General', 8),
('Pets?', 'A: No pets', 'General', 9),
('Meals?', 'A: Halal/Veg', 'General', 10),
('Covid?', 'A: Safe stay', 'General', 11),
('Office?', 'A: 9 to 5', 'General', 12),
('Careers?', 'A: Join us', 'General', 13)
ON CONFLICT DO NOTHING;

-- 10. Editorial Posts
INSERT INTO public.editorial_posts (title, slug, status) VALUES
('Post 1', 'post-1', 'published'), ('Post 2', 'post-2', 'published'), ('Post 3', 'post-3', 'published'),
('Post 4', 'post-4', 'published'), ('Post 5', 'post-5', 'published'), ('Post 6', 'post-6', 'published'),
('Post 7', 'post-7', 'published'), ('Post 8', 'post-8', 'published'), ('Post 9', 'post-9', 'published'),
('Post 10', 'post-10', 'published'), ('Post 11', 'post-11', 'published'), ('Post 12', 'post-12', 'published'),
('Post 13', 'post-13', 'published')
ON CONFLICT (slug) DO NOTHING;

-- 11. Popular Destinations
INSERT INTO public.popular_destinations (destination, return_price) VALUES
('Paris', 45000), ('Dubai', 55000), ('London', 48000), ('New York', 75000), ('Bangkok', 38000),
('Singapore', 32000), ('Tokyo', 85000), ('Sydney', 95000), ('Cape Town', 65000), ('Seychelles', 120000),
('Maldives', 150000), ('Bali', 42000), ('Phuket', 35000)
ON CONFLICT DO NOTHING;

-- 12. Content Blocks
INSERT INTO public.content_blocks (page_slug, section_key, content) VALUES
('h', 's1', '{"t":"1"}'), ('h', 's2', '{"t":"1"}'), ('h', 's3', '{"t":"1"}'), ('h', 's4', '{"t":"1"}'),
('h', 's5', '{"t":"1"}'), ('h', 's6', '{"t":"1"}'), ('h', 's7', '{"t":"1"}'), ('h', 's8', '{"t":"1"}'),
('h', 's9', '{"t":"1"}'), ('h', 's10', '{"t":"1"}'), ('h', 's11', '{"t":"1"}'), ('h', 's12', '{"t":"1"}'),
('h', 's13', '{"t":"1"}')
ON CONFLICT DO NOTHING;

-- 13. Navigations
INSERT INTO public.navigations (label, link, display_order) VALUES
('Home', '/', 1), ('Services', '/ser', 2), ('About', '/ab', 3), ('Contact', '/co', 4),
('Blog', '/bl', 5), ('FAQ', '/faq', 6), ('Help', '/he', 7), ('Profile', '/pr', 8),
('Settings', '/se', 9), ('Login', '/lo', 10), ('Signup', '/si', 11), ('Cart', '/ca', 12),
('Dash', '/da', 13)
ON CONFLICT DO NOTHING;

-- 14. Inquiries
INSERT INTO public.inquiries (name, email, subject, message) VALUES
('User 1', 'u1@t.c', 'S1', 'M1'), ('User 2', 'u2@t.c', 'S2', 'M1'), ('User 3', 'u3@t.c', 'S3', 'M1'),
('User 4', 'u4@t.c', 'S4', 'M1'), ('User 5', 'u5@t.c', 'S5', 'M1'), ('User 6', 'u6@t.c', 'S6', 'M1'),
('User 7', 'u7@t.c', 'S7', 'M1'), ('User 8', 'u8@t.c', 'S8', 'M1'), ('User 9', 'u9@t.c', 'S9', 'M1'),
('User 10', 'u10@t.c', 'S10', 'M1'), ('User 11', 'u11@t.c', 'S11', 'M1'), ('User 12', 'u12@t.c', 'S12', 'M1'),
('User 13', 'u13@t.c', 'S13', 'M1')
ON CONFLICT DO NOTHING;

-- 15. Subscribers
INSERT INTO public.subscribers (email) VALUES
('s1@t.c'), ('s2@t.c'), ('s3@t.c'), ('s4@t.c'), ('s5@t.c'), ('s6@t.c'), ('s7@t.c'), ('s8@t.c'),
('s9@t.c'), ('s10@t.c'), ('s11@t.c'), ('s12@t.c'), ('s13@t.c')
ON CONFLICT (email) DO NOTHING;

-- 16. Products
INSERT INTO public.products (name, category, price) VALUES
('P1', 'C1', 100), ('P2', 'C1', 100), ('P3', 'C1', 100), ('P4', 'C1', 100), ('P5', 'C1', 100),
('P6', 'C1', 100), ('P7', 'C1', 100), ('P8', 'C1', 100), ('P9', 'C1', 100), ('P10', 'C1', 100),
('P11', 'C1', 100), ('P12', 'C1', 100), ('P13', 'C1', 100)
ON CONFLICT DO NOTHING;

-- 17. Orders
INSERT INTO public.orders (customer_id, amount)
SELECT id, 100 FROM public.customers
ON CONFLICT DO NOTHING;

-- 18. Order Items
INSERT INTO public.order_items (order_id, unit_price)
SELECT id, 100 FROM public.orders
ON CONFLICT DO NOTHING;

-- 19. Invoices
INSERT INTO public.invoices (customer_id, amount, service, reference)
SELECT id, 100, 'Service', 'REF-' || id FROM public.customers
ON CONFLICT DO NOTHING;

-- 20. Invoice Items
INSERT INTO public.invoice_items (invoice_id, item_description, unit_price)
SELECT id, 'Charge', 100 FROM public.invoices
ON CONFLICT DO NOTHING;

-- 21. Reviews
INSERT INTO public.reviews (service_id, customer_name, rating)
SELECT id, 'Reviewer', 5 FROM public.services
ON CONFLICT DO NOTHING;

-- 22. Site Settings
INSERT INTO public.site_settings (key, value, category) VALUES
('k1', '"v1"', 'c1'), ('k2', '"v1"', 'c1'), ('k3', '"v1"', 'c1'), ('k4', '"v1"', 'c1'),
('k5', '"v1"', 'c1'), ('k6', '"v1"', 'c1'), ('k7', '"v1"', 'c1'), ('k8', '"v1"', 'c1'),
('k9', '"v1"', 'c1'), ('k10', '"v1"', 'c1'), ('k11', '"v1"', 'c1'), ('k12', '"v1"', 'c1'),
('k13', '"v1"', 'c1')
ON CONFLICT (key) DO NOTHING;

-- 23. Popups
INSERT INTO public.popup_ads (title) VALUES
('T1'), ('T2'), ('T3'), ('T4'), ('T5'), ('T6'), ('T7'), ('T8'), ('T9'), ('T10'), ('T11'), ('T12'), ('T13');

-- 24. Hero Slides
INSERT INTO public.hero_slides (title, image_url) VALUES
('S1', '/1'), ('S2', '/1'), ('S3', '/1'), ('S4', '/1'), ('S5', '/1'), ('S6', '/1'),
('S7', '/1'), ('S8', '/1'), ('S9', '/1'), ('S10', '/1'), ('S11', '/1'), ('S12', '/1'),
('S13', '/1');

-- 25. Email Templates
INSERT INTO public.email_templates (name) VALUES
('E1'), ('E2'), ('E3'), ('E4'), ('E5'), ('E6'), ('E7'), ('E8'), ('E9'), ('E10'), ('E11'), ('E12'), ('E13');

-- 26. Hotel Rooms
SELECT id INTO h_id FROM public.services WHERE service_type = 'hotel' LIMIT 1;
INSERT INTO public.hotel_rooms (service_id, name)
SELECT id, 'Basic Room' FROM public.services WHERE service_type = 'hotel'
UNION ALL
SELECT h_id, 'Exec Room ' || g FROM generate_series(1,5) g
ON CONFLICT DO NOTHING;

-- 27. Room Types
INSERT INTO public.room_types (service_id, name, weekday_price, weekend_price)
SELECT id, 'Type A', 100, 120 FROM public.services WHERE service_type = 'hotel'
UNION ALL
SELECT h_id, 'Special Type ' || g, 200, 240 FROM generate_series(1,5) g
ON CONFLICT DO NOTHING;

-- 28. Product Categories
INSERT INTO public.product_categories (category_id, product_id)
SELECT cat_deals, id FROM public.services LIMIT 13
ON CONFLICT DO NOTHING;

END $$;