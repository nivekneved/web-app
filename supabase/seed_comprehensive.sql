-- Comprehensive seed data for all tables (at least 7 entries per table)
-- Updated with Group Tours and various services

DO $$
DECLARE
    cat_activities UUID;
    cat_tours UUID;
    cat_hotels UUID;
    cat_cruises UUID;
    cat_deals UUID;
    cat_flights UUID;
    cat_transfers UUID;
    cat_group_tours UUID;
    h_id UUID;
BEGIN

-- 1. Categories
INSERT INTO public.categories (name, slug, description, image_url, show_on_home, display_order) VALUES
('Activities', 'activities', 'Fun experiences for everyone', '/placeholders/activity_main.png', true, 1),
('Tours', 'tours', 'Guided day trips', '/placeholders/tour_main.png', true, 2),
('Group Tours', 'guided-group-tours', 'Explore together in a friendly group', '/placeholders/group_tours_main.png', true, 3),
('Hotels', 'hotels', 'Quality stays and resorts', '/placeholders/hotel_main.png', true, 6),
('Cruises', 'cruises', 'Relaxing sea journeys', '/placeholders/cruise_main.png', true, 4),
('Local Deals', 'local-deals', 'Special offers for you', '/placeholders/activity_main.png', true, 11),
('Day Packages', 'day-packages', 'One-day escapes', '/placeholders/hotel_main.png', true, 4),
('Rodrigues', 'rodrigues', 'Discover the authentic island charm', '/placeholders/tour_main.png', true, 5),
('Flights', 'flights', 'Great flight deals', '/placeholders/flight_main.png', true, 7),
('Transfers', 'transfers', 'Reliable transportation', '/placeholders/transfer_main.png', true, 8),
('Travel Insurance', 'travel-insurance', 'Travel with peace of mind', '/hero-insurance.png', true, 9),
('Visa Services', 'visa-services', 'Help with your applications', '/hero-visa.png', true, 10),
('Tailor Made', 'tailor-made', 'Your trip, your way', '/hero-tailor.png', true, 12),
('Corporate Travel', 'corporate', 'Business solutions', '/hero-business.png', true, 13)
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, description = EXCLUDED.description;

SELECT id INTO cat_activities FROM public.categories WHERE slug = 'activities';
SELECT id INTO cat_tours FROM public.categories WHERE slug = 'tours';
SELECT id INTO cat_group_tours FROM public.categories WHERE slug = 'guided-group-tours';
SELECT id INTO cat_hotels FROM public.categories WHERE slug = 'hotels';
SELECT id INTO cat_cruises FROM public.categories WHERE slug = 'cruises';
SELECT id INTO cat_deals FROM public.categories WHERE slug = 'local-deals';
SELECT id INTO cat_flights FROM public.categories WHERE slug = 'flights';
SELECT id INTO cat_transfers FROM public.categories WHERE slug = 'transfers';

-- 2. Services
INSERT INTO public.services (name, description, location, region, base_price, rating, image_url, service_type, amenities) VALUES
-- HOTELS (7+)
('Le Morne Beach Resort', 'Beautiful beachfront stay with amazing views', 'Le Morne', 'South', 15000, 4.8, '/placeholders/hotel_main.png', 'hotel', ARRAY['Wifi', 'Pool', 'Breakfast']),
('Blue Bay Grand Hotel', 'Excellent hospitality near the marine park', 'Blue Bay', 'South-East', 12000, 4.7, '/placeholders/hotel_main.png', 'hotel', ARRAY['Wifi', 'Snorkeling', 'Pool']),
('Flic en Flac Sands', 'Relaxing resort with golden beaches', 'Flic en Flac', 'West', 9500, 4.6, '/placeholders/hotel_main.png', 'hotel', ARRAY['Wifi', 'Bar', 'Pool']),
('Belle Mare Ocean View', 'Spacious rooms with direct ocean access', 'Belle Mare', 'East', 18000, 4.9, '/placeholders/hotel_main.png', 'hotel', ARRAY['Wifi', 'Spa', 'Pool']),
('Grand Gaube Retreat', 'Quiet and peaceful north coast getaway', 'Grand Gaube', 'North', 11000, 4.5, '/placeholders/hotel_main.png', 'hotel', ARRAY['Wifi', 'Garden', 'Pool']),
('Tamarin Bay Boutique', 'Intimate stay close to the surfing spots', 'Tamarin', 'West', 8500, 4.4, '/placeholders/hotel_main.png', 'hotel', ARRAY['Wifi', 'Surf Gear']),
('Balaclava Marine Resort', 'Family friendly stay in a marine protected area', 'Balaclava', 'North-West', 14000, 4.7, '/placeholders/hotel_main.png', 'hotel', ARRAY['Wifi', 'Kids Club', 'Pool']),

-- TOURS (including Group Tours - 7+)
('South Island Adventure', 'Guided group tour exploring the wild south', 'Chamarel', 'South', 4500, 4.8, '/placeholders/group_tours_main.png', 'tour', ARRAY['Guide', 'Transport', 'Lunch']),
('Northern Highlights', 'Group tour of historic Port Louis and the north', 'Port Louis', 'North', 3800, 4.7, '/placeholders/group_tours_main.png', 'tour', ARRAY['Guide', 'Transport']),
('Tea Path Discovery', 'Cultural group tour through tea plantations', 'Bois Cheri', 'Curepipe', 3200, 4.6, '/placeholders/group_tours_main.png', 'tour', ARRAY['Tasting', 'Transport']),
('Wild West Exploration', 'Discover the salt pans and rugged west coast', 'Tamarin', 'West', 4200, 4.8, '/placeholders/group_tours_main.png', 'tour', ARRAY['Guide', 'Transport']),
('East Coast Island Hopping', 'A group day out visiting eastern islets', 'Trou d''Eau Douce', 'East', 5500, 4.9, '/placeholders/group_tours_main.png', 'tour', ARRAY['Boat', 'Lunch', 'Guide']),
('Port Louis Heritage Walk', 'Deep dive into the capital''s history', 'Port Louis', 'Central', 2500, 4.5, '/placeholders/group_tours_main.png', 'tour', ARRAY['Guide']),
('Rum & Sugar Trail', 'Taste the local flavors and learn the history', 'Pamplemousses', 'North', 3500, 4.7, '/placeholders/group_tours_main.png', 'tour', ARRAY['Tasting', 'Guide']),

-- ACTIVITIES (7+)
('Scuba Diving - Coin de Mire', 'Explore the underwater beauty of the north', 'Cap Malheureux', 'North', 6500, 4.9, '/placeholders/activity_main.png', 'activity', ARRAY['Instructor', 'Gear']),
('Skydiving over the Coast', 'Thrill seeking jump with amazing views', 'Belle Vue', 'North', 15000, 5.0, '/placeholders/activity_main.png', 'activity', ARRAY['Instruction', 'Video']),
('Chamarel Ziplining', 'Fly over the mountains and waterfalls', 'Chamarel', 'South-West', 2800, 4.8, '/placeholders/activity_main.png', 'activity', ARRAY['Safety Gear']),
('Black River Gorges Hiking', 'Nature walk through the lush green forests', 'Black River', 'South-West', 1500, 4.7, '/placeholders/activity_main.png', 'activity', ARRAY['Guide']),
('Casela Nature Park Entry', 'Interact with wildlife and enjoy the safari', 'Cascavelle', 'West', 1800, 4.6, '/placeholders/activity_main.png', 'activity', ARRAY['Safari']),
('Deep Sea Fishing', 'Target the big fish in the deep blue ocean', 'Black River', 'West', 25000, 4.9, '/placeholders/activity_main.png', 'activity', ARRAY['Tackle', 'Refreshments']),
('Dolphin Watching', 'See dolphin pods in their natural habitat', 'Tamarin', 'West', 3500, 4.8, '/placeholders/activity_main.png', 'activity', ARRAY['Boat', 'Snorkeling']),

-- CRUISES (7+)
('Gabriel Island Catamaran', 'Full day of sun and sand on a remote island', 'Grand Baie', 'North', 4500, 4.8, '/placeholders/cruise_main.png', 'cruise', ARRAY['Lunch', 'Drinks', 'Music']),
('Sunset Dinner Cruise', 'Romantic evening on the water with dinner', 'Grand Baie', 'North', 6500, 4.9, '/placeholders/cruise_main.png', 'cruise', ARRAY['Dinner', 'Drinks']),
('Speedboat Coast Explorer', 'Fast paced tour of the western coastline', 'Flic en Flac', 'West', 5000, 4.7, '/placeholders/cruise_main.png', 'cruise', ARRAY['Drinks']),
('Benitier Island Day Trip', 'Relax with a BBQ lunch on the beach', 'Le Morne', 'South-West', 4200, 4.8, '/placeholders/cruise_main.png', 'cruise', ARRAY['Lunch', 'BBQ']),
('Ile aux Cerfs Full-Day', 'Beautiful day trip to the east coast', 'Trou d''Eau Douce', 'East', 5800, 4.9, '/placeholders/cruise_main.png', 'cruise', ARRAY['Lunch', 'Drinks']),
('Whale Watching Tour', 'Experience the majestic giants of the sea', 'Black River', 'West', 6500, 4.8, '/placeholders/cruise_main.png', 'cruise', ARRAY['Boat', 'Guide']),
('Flat Island Adventure', 'Visit the northernmost accessible island', 'Grand Baie', 'North', 5200, 4.7, '/placeholders/cruise_main.png', 'cruise', ARRAY['Lunch', 'Adventure']),

-- FLIGHTS/TRANSFERS/MISC (Represented as services for list views)
('Standard Van Transfer', 'Reliable transfer for groups and families', 'Airport', 'National', 2500, 4.8, '/placeholders/transfer_main.png', 'transfer', ARRAY['AC', 'Large Bags']),
('Private Car Transfer', 'Personalized transport to your hotel', 'Airport', 'National', 1800, 4.9, '/placeholders/transfer_main.png', 'transfer', ARRAY['AC', 'Direct']),
('Mauritius to Rodrigues', 'Return flight to the beautiful sister island', 'SSR Airport', 'National', 8500, 4.7, '/placeholders/flight_main.png', 'flight', ARRAY['Luggage']),
('Mauritius to Reunion', 'Regional hop for a quick getaway', 'SSR Airport', 'International', 12000, 4.6, '/placeholders/flight_main.png', 'flight', ARRAY['In-flight snack']),
('Mauritius to Dubai', 'Great connections to the rest of the world', 'SSR Airport', 'International', 45000, 4.9, '/placeholders/flight_main.png', 'flight', ARRAY['Entertainment', 'Meals']),
('Visa Consultation', 'Expert help with your travel visa application', 'Port Louis', 'Central', 1500, 4.8, '/placeholders/activity_main.png', 'visa', ARRAY['Expert Advice']),
('Corporate Travel Plan', 'Efficient solutions for your business trips', 'Ebene', 'Central', 0, 4.7, '/placeholders/activity_main.png', 'corporate', ARRAY['Dedicated Manager']),
('Corporate Travel Plan', 'Efficient solutions for your business trips', 'Ebene', 'Central', 0, 4.7, '/services/corporate.jpg', 'corporate', ARRAY['Dedicated Manager']);

-- 3. Service Categories (Link them)
-- Link Hotels
INSERT INTO public.service_categories (service_id, category_id)
SELECT id, cat_hotels FROM public.services WHERE service_type = 'hotel'
ON CONFLICT DO NOTHING;

-- Link Cruises
INSERT INTO public.service_categories (service_id, category_id)
SELECT id, cat_cruises FROM public.services WHERE service_type = 'cruise'
ON CONFLICT DO NOTHING;

-- Link Tours (Standard)
INSERT INTO public.service_categories (service_id, category_id)
SELECT id, cat_tours FROM public.services WHERE service_type = 'tour'
ON CONFLICT DO NOTHING;

-- Link Tours (Group)
INSERT INTO public.service_categories (service_id, category_id)
SELECT id, cat_group_tours FROM public.services WHERE service_type = 'tour' AND name LIKE '%Group%'
ON CONFLICT DO NOTHING;

-- Link Activities
INSERT INTO public.service_categories (service_id, category_id)
SELECT id, cat_activities FROM public.services WHERE service_type = 'activity'
ON CONFLICT DO NOTHING;

-- Link Flights
INSERT INTO public.service_categories (service_id, category_id)
SELECT id, cat_flights FROM public.services WHERE service_type = 'flight'
ON CONFLICT DO NOTHING;

-- Link Transfers
INSERT INTO public.service_categories (service_id, category_id)
SELECT id, cat_transfers FROM public.services WHERE service_type = 'transfer'
ON CONFLICT DO NOTHING;

-- 4. Admins
INSERT INTO public.admins (username, email, password, role, name) VALUES
('sysadmin', 'admin@travellounge.mu', 'hash', 'super_admin', 'System Admin'),
('jdoe', 'john@travellounge.mu', 'hash', 'admin', 'John Doe'),
('jsmith', 'jane@travellounge.mu', 'hash', 'manager', 'Jane Smith'),
('rwhite', 'robert@travellounge.mu', 'hash', 'operator', 'Robert White'),
('ewilliams', 'emily@travellounge.mu', 'hash', 'support', 'Emily Williams')
ON CONFLICT (email) DO NOTHING;

-- 5. Customers
INSERT INTO public.customers (first_name, last_name, email, phone, status) VALUES
('James', 'Wilson', 'james.w@email.com', '23055678901', 'Active'),
('Sarah', 'Thompson', 'sarah.t@email.com', '23055678902', 'Active'),
('Michael', 'Chen', 'michael.c@email.com', '23055678903', 'Active'),
('Emma', 'Davis', 'emma.d@email.com', '23055678904', 'Active'),
('Robert', 'Garcia', 'robert.g@email.com', '23055678905', 'Active'),
('Jennifer', 'Lee', 'jennifer.l@email.com', '23055678906', 'Active'),
('David', 'Kim', 'david.k@email.com', '23055678907', 'Active')
ON CONFLICT (email) DO NOTHING;

-- 6. Profiles
INSERT INTO public.profiles (id, name, email, phone)
SELECT id, first_name || ' ' || last_name, email, phone FROM public.customers
ON CONFLICT (id) DO NOTHING;

-- 7. Bookings
INSERT INTO public.bookings (customer_id, activity_type, activity_name, start_date, amount, status, payment_status)
SELECT id, 'tour', 'Group Adventure Tour', NOW(), 4500, 'Confirmed', 'Paid' FROM public.customers
ON CONFLICT DO NOTHING;

-- 8. Reviews
INSERT INTO public.reviews (service_id, customer_name, rating, comment)
SELECT id, 'Happy traveler', 5, 'Absolutely loved the experience! Highly recommended.' FROM public.services
ON CONFLICT DO NOTHING;

END $$;