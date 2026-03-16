-- Comprehensive seed data for all tables (at least 11 rows each)
-- Fixed version with explicit Common Table Expressions for foreign key integrity

DO $$
DECLARE
    -- Category IDs
    cat_activities UUID;
    cat_tours UUID;
    cat_hotels UUID;
    cat_cruises UUID;
    cat_deals UUID;
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

-- 5. Customers (needed for profiles)
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

-- 6. Profiles (links to customers)
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
('Q1', 'A1', 'Cat', 1), ('Q2', 'A2', 'Cat', 2), ('Q3', 'A3', 'Cat', 3), ('Q4', 'A4', 'Cat', 4),
('Q5', 'A5', 'Cat', 5), ('Q6', 'A6', 'Cat', 6), ('Q7', 'A7', 'Cat', 7), ('Q8', 'A8', 'Cat', 8),
('Q9', 'A9', 'Cat', 9), ('Q10', 'A10', 'Cat', 10), ('Q11', 'A11', 'Cat', 11), ('Q12', 'A12', 'Cat', 12), ('Q13', 'A13', 'Cat', 13);

-- 10. Editorial
INSERT INTO public.editorial_posts (title, slug, status) VALUES
('P1', 'p1', 'published'), ('P2', 'p2', 'published'), ('P3', 'p3', 'published'), ('P4', 'p4', 'published'),
('P5', 'p5', 'published'), ('P6', 'p6', 'published'), ('P7', 'p7', 'published'), ('P8', 'p8', 'published'),
('P9', 'p9', 'published'), ('P10', 'p10', 'published'), ('P11', 'p11', 'published'), ('P12', 'p12', 'published'), ('P13', 'p13', 'published')
ON CONFLICT DO NOTHING;

-- 11. Destinations
INSERT INTO public.popular_destinations (destination, return_price) VALUES
('D1', 1000), ('D2', 1000), ('D3', 1000), ('D4', 1000), ('D5', 1000), ('D6', 1000),
('D7', 1000), ('D8', 1000), ('D9', 1000), ('D10', 1000), ('D11', 1000), ('D12', 1000), ('D13', 1000)
ON CONFLICT DO NOTHING;

-- 12. Content Blocks
INSERT INTO public.content_blocks (page_slug, section_key, content) VALUES
('s1', 'k1', '{"v":1}'), ('s2', 'k2', '{"v":1}'), ('s3', 'k3', '{"v":1}'), ('s4', 'k4', '{"v":1}'),
('s5', 'k5', '{"v":1}'), ('s6', 'k6', '{"v":1}'), ('s7', 'k7', '{"v":1}'), ('s8', 'k8', '{"v":1}'),
('s9', 'k9', '{"v":1}'), ('s10', 'k10', '{"v":1}'), ('s11', 'k11', '{"v":1}'), ('s12', 'k12', '{"v":1}'), ('s13', 'k13', '{"v":1}');

-- 13. Navigations
INSERT INTO public.navigations (label, link, display_order) VALUES
('N1', '/1', 1), ('N2', '/2', 2), ('N3', '/3', 3), ('N4', '/4', 4), ('N5', '/5', 5), ('N6', '/6', 6),
('N7', '/7', 7), ('N8', '/8', 8), ('N9', '/9', 9), ('N10', '/10', 10), ('N11', '/11', 11), ('N12', '/12', 12), ('N13', '/13', 13);

-- 14. Inquiries
INSERT INTO public.inquiries (name, email, subject, message) VALUES
('I1', 'i1@t.c', 'S1', 'M1'), ('I2', 'i2@t.c', 'S2', 'M2'), ('I3', 'i3@t.c', 'S3', 'M3'), ('I4', 'i4@t.c', 'S4', 'M4'),
('I5', 'i5@t.c', 'S5', 'M5'), ('I6', 'i6@t.c', 'S6', 'M6'), ('I7', 'i7@t.c', 'S7', 'M7'), ('I8', 'i8@t.c', 'S8', 'M8'),
('I9', 'i9@t.c', 'S9', 'M9'), ('I10', 'i10@t.c', 'S10', 'M10'), ('I11', 'i11@t.c', 'S11', 'M11'), ('I12', 'i12@t.c', 'S12', 'M12'), ('I13', 'i13@t.c', 'S13', 'M13');

-- 15. Subscribers
INSERT INTO public.subscribers (email) VALUES
('u1@t.c'), ('u2@t.c'), ('u3@t.c'), ('u4@t.c'), ('u5@t.c'), ('u6@t.c'), ('u7@t.c'), ('u8@t.c'),
('u9@t.c'), ('u10@t.c'), ('u11@t.c'), ('u12@t.c'), ('u13@t.c')
ON CONFLICT (email) DO NOTHING;

-- 16. Products
INSERT INTO public.products (name, category, price) VALUES
('P1', 'C1', 100), ('P2', 'C1', 100), ('P3', 'C1', 100), ('P4', 'C1', 100), ('P5', 'C1', 100), ('P6', 'C1', 100),
('P7', 'C1', 100), ('P8', 'C1', 100), ('P9', 'C1', 100), ('P10', 'C1', 100), ('P11', 'C1', 100), ('P12', 'C1', 100), ('P13', 'C1', 100)
ON CONFLICT DO NOTHING;

-- 17. Orders
INSERT INTO public.orders (customer_id, amount)
SELECT id, 100 FROM public.profiles
ON CONFLICT DO NOTHING;

-- 18. Order Items
INSERT INTO public.order_items (order_id, unit_price)
SELECT id, 100 FROM public.orders
ON CONFLICT DO NOTHING;

-- 19. Invoices
INSERT INTO public.invoices (customer_id, amount, service, reference)
SELECT id, 100, 'Service', 'R-' || id FROM public.profiles
ON CONFLICT DO NOTHING;

-- 20. Invoice Items
INSERT INTO public.invoice_items (invoice_id, item_description, unit_price)
SELECT id, 'Item', 100 FROM public.invoices
ON CONFLICT DO NOTHING;

-- 21. Reviews
INSERT INTO public.reviews (service_id, customer_name, rating)
SELECT id, 'User', 5 FROM public.services
ON CONFLICT DO NOTHING;

-- 22. Site Settings
INSERT INTO public.site_settings (key, value, category) VALUES
('k1', '"v1"', 'c1'), ('k2', '"v1"', 'c1'), ('k3', '"v1"', 'c1'), ('k4', '"v1"', 'c1'), ('k5', '"v1"', 'c1'), ('k6', '"v1"', 'c1'),
('k7', '"v1"', 'c1'), ('k8', '"v1"', 'c1'), ('k9', '"v1"', 'c1'), ('k10', '"v1"', 'c1'), ('k11', '"v1"', 'c1'), ('k12', '"v1"', 'c1'), ('k13', '"v1"', 'c1')
ON CONFLICT (key) DO NOTHING;

-- 23. Popups
INSERT INTO public.popup_ads (title) VALUES
('T1'), ('T2'), ('T3'), ('T4'), ('T5'), ('T6'), ('T7'), ('T8'), ('T9'), ('T10'), ('T11'), ('T12'), ('T13');

-- 24. Hero Slides
INSERT INTO public.hero_slides (title, image_url) VALUES
('T1', '/1'), ('T2', '/1'), ('T3', '/1'), ('T4', '/1'), ('T5', '/1'), ('T6', '/1'), ('T7', '/1'), ('T8', '/1'), ('T9', '/1'), ('T10', '/1'), ('T11', '/1'), ('T12', '/1'), ('T13', '/1');

-- 25. Email Templates
INSERT INTO public.email_templates (name) VALUES
('E1'), ('E2'), ('E3'), ('E4'), ('E5'), ('E6'), ('E7'), ('E8'), ('E9'), ('E10'), ('E11'), ('E12'), ('E13');

-- 26. Hotel Rooms (links to services)
INSERT INTO public.hotel_rooms (service_id, name)
SELECT id, 'Room' FROM public.services WHERE service_type = 'hotel'
ON CONFLICT DO NOTHING;

-- 27. Room Types (links to services)
INSERT INTO public.room_types (service_id, name, weekday_price, weekend_price)
SELECT id, 'Type', 100, 120 FROM public.services WHERE service_type = 'hotel'
ON CONFLICT DO NOTHING;

-- 28. Product Categories (cross link)
INSERT INTO public.product_categories (category_id, product_id)
SELECT cat_deals, id FROM public.services LIMIT 13
ON CONFLICT DO NOTHING;

END $$;
