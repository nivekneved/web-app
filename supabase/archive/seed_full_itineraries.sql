-- ==============================================================================
-- COMPREHENSIVE SEED DATA V2 (INCLUDING FULL ITINERARIES)
-- ==============================================================================

DO $$ 
DECLARE
    service_id UUID;
    cat_activities UUID;
    cat_tours      UUID;
    cat_daypkgs    UUID;
    cat_cruises    UUID;
    cat_rodrigues  UUID;
    cat_hotels     UUID;
BEGIN

-- Ensure basic categories exist and get theirs IDs
INSERT INTO public.categories (name, slug, description, image_url, show_on_home)
VALUES 
    ('Activities', 'activities', 'Exhilarating experiences across Mauritius', '/hero-flight.png', true),
    ('Tours', 'tours', 'Guided journeys through Mauritian heritage', '/hero-tour.png', true),
    ('Day Packages', 'day-packages', 'Exclusive one-day escapes', '/hero-hotel.png', true),
    ('Cruises', 'cruises', 'Luxury sailing in turquoise waters', '/hero-cruise.png', true),
    ('Rodrigues', 'rodrigues', 'Discover the untouched charm of Rodrigues island', '/hero-rodrigues.png', true),
    ('Hotels', 'hotels', 'Premium stays at the finest resorts', '/hero-hotel.png', true)
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, description = EXCLUDED.description;

SELECT id INTO cat_activities FROM public.categories WHERE slug = 'activities' LIMIT 1;
SELECT id INTO cat_tours FROM public.categories WHERE slug = 'tours' LIMIT 1;
SELECT id INTO cat_daypkgs FROM public.categories WHERE slug = 'day-packages' LIMIT 1;
SELECT id INTO cat_cruises FROM public.categories WHERE slug = 'cruises' LIMIT 1;
SELECT id INTO cat_rodrigues FROM public.categories WHERE slug = 'rodrigues' LIMIT 1;
SELECT id INTO cat_hotels FROM public.categories WHERE slug = 'hotels' LIMIT 1;

-- 1. HOTEL: The Oberoi Beach Resort, Mauritius
IF NOT EXISTS (SELECT 1 FROM public.services WHERE name = 'The Oberoi Beach Resort') THEN
    INSERT INTO public.services (name, description, location, region, base_price, status, rating, image_url, service_type, amenities, featured)
    VALUES (
        'The Oberoi Beach Resort',
        'Situated on the pristine white sands of Turtle Bay, The Oberoi Beach Resort is a world-class luxury hotel that offers a unique experience of Mauritius.',
        'Turtle Bay',
        'North-West',
        45000.00,
        'In Stock',
        5.0,
        'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb',
        'hotel',
        ARRAY['Private Pools', 'Subtropical Gardens', 'Spa', 'Fine Dining', 'Beachfront', 'Butler Service'],
        true
    ) RETURNING id INTO service_id;
    INSERT INTO public.service_categories (service_id, category_id) VALUES (service_id, cat_hotels);
    
    INSERT INTO public.hotel_rooms (service_id, name, type, price_per_night, size, view, bed) VALUES
    (service_id, 'Luxury Pavilion', 'Standard', 45000.00, '70 sqm', 'Garden', 'King Size'),
    (service_id, 'Luxury Villa with Private Pool', 'Suite', 75000.00, '325 sqm', 'Ocean', 'King Size'),
    (service_id, 'Royal Villa', 'Presidential', 150000.00, '650 sqm', 'Panoramic Ocean', 'Two King Suites');
END IF;

-- 2. ACTIVITY: Chamarel 7-Coloured Earth & Waterfall
IF NOT EXISTS (SELECT 1 FROM public.services WHERE name = 'Chamarel Discovery') THEN
    INSERT INTO public.services (name, description, location, region, base_price, status, rating, image_url, service_type, duration_hours, itinerary, highlights, included)
    VALUES (
        'Chamarel Discovery',
        'Witness the unique geological phenomenon of the Seven Coloured Earth and the majestic Chamarel Waterfall.',
        'Chamarel',
        'South-West',
        2500.00,
        'In Stock',
        4.8,
        'https://images.unsplash.com/photo-1544551763-47a0159f963f',
        'activity',
        4,
        '[{"time": "09:00", "title": "Arrival at Park", "description": "Check-in at the Chamarel Seven Coloured Earth Geopark."}, {"time": "10:00", "title": "7 Coloured Earth", "description": "Observe the unique volcanic sands that never erode, forming distinct layers of colors."}, {"time": "11:00", "title": "Chamarel Waterfall", "description": "Panoramic view of the highest waterfall in Mauritius dropping 100m."}, {"time": "12:00", "title": "Tortoise Park", "description": "Meet the giant Aldabra tortoises that inhabit the park."}]'::jsonb,
        '["Rare Geological Formation", "100m Chamarel Waterfall", "Giant Tortoises", "Coffee Plantations"]'::jsonb,
        '["Entrance Fees", "Access to Waterfall", "Guided Information", "Parking"]'::jsonb
    ) RETURNING id INTO service_id;
    INSERT INTO public.service_categories (service_id, category_id) VALUES (service_id, cat_activities);
END IF;

-- 3. CRUISE: Catamaran Cruise to Ile aux Cerfs
IF NOT EXISTS (SELECT 1 FROM public.services WHERE name = 'Catamaran Ile aux Cerfs') THEN
    INSERT INTO public.services (name, description, location, region, base_price, status, rating, image_url, service_type, duration_hours, itinerary, highlights, included)
    VALUES (
        'Catamaran Ile aux Cerfs',
        'A full day of sun, sea and fun on a luxury catamaran sailing to the famous island of Ile aux Cerfs.',
        'Trou d''Eau Douce',
        'East',
        3800.00,
        'In Stock',
        4.9,
        'https://images.unsplash.com/photo-1534447677768-be436bb09401',
        'cruise',
        8,
        '[{"time": "09:30", "title": "Departure", "description": "Sailing from Trou d''Eau Douce jetty."}, {"time": "11:00", "title": "GRSE Waterfall", "description": "Visit the mouth of Grand River South East for waterfall views from the boat."}, {"time": "12:00", "title": "Island BBQ", "description": "Gourmet BBQ lunch served on board (Chicken, Fish, Salads, Open Bar)."}, {"time": "13:30", "title": "Ile aux Cerfs", "description": "Disembark for free time on the white sand beaches of the island."}, {"time": "16:30", "title": "Return", "description": "Arrive back at jetty after a relaxing sail with live SEGA music."}]'::jsonb,
        '["Waterfall Visit", "Catamaran BBQ", "Ile aux Cerfs Beaches", "Open Bar Unlimited Drinks"]'::jsonb,
        '["Full Day Cruise", "BBQ Lunch", "Snorkeling Equipment", "Unlimited Drinks (Beer, Wine, Soft)"]'::jsonb
    ) RETURNING id INTO service_id;
    INSERT INTO public.service_categories (service_id, category_id) VALUES (service_id, cat_cruises);
END IF;

-- 4. TOUR: Tea Route Experience
IF NOT EXISTS (SELECT 1 FROM public.services WHERE name = 'Tea Route Experience') THEN
    INSERT INTO public.services (name, description, location, region, base_price, status, rating, image_url, service_type, duration_days, itinerary, highlights, included)
    VALUES (
        'Tea Route Experience',
        'Follow the journey of tea from plantation to cup through the historic estates of the South.',
        'Bois Cheri',
        'South',
        4200.00,
        'In Stock',
        4.7,
        'https://images.unsplash.com/photo-1546853127-88789cc64761',
        'tour',
        1,
        '[{"time": "10:00", "title": "Domaine des Aubineaux", "description": "Visit the 19th-century colonial mansion and camphor gardens."}, {"time": "11:30", "title": "Bois Cheri Tea Factory", "description": "Tour the factory and museum followed by a tea tasting overlooking the lake."}, {"time": "13:00", "title": "Le Saint Aubin", "description": "Traditional lunch and visit to the vanilla plantation and rum distillery."}]'::jsonb,
        '["Colonial Architecture", "Tea Tasting", "Distillery Tour", "Gastronomic Lunch"]'::jsonb,
        '["Entry Tickets", "Tea Tasting", "3-Course Lunch", "Personal Guide"]'::jsonb
    ) RETURNING id INTO service_id;
    INSERT INTO public.service_categories (service_id, category_id) VALUES (service_id, cat_tours);
END IF;

-- 5. RODRIGUES: Trou d''Argent Coastal Trek
IF NOT EXISTS (SELECT 1 FROM public.services WHERE name = 'Trou d''Argent Magic') THEN
    INSERT INTO public.services (name, description, location, region, base_price, status, rating, image_url, service_type, duration_hours, itinerary, highlights, included)
    VALUES (
        'Trou d''Argent Magic',
        'Hike along the raw, cliff-lined coast of Rodrigues to reach the hidden cove of Trou d''Argent.',
        'Graviers',
        'Rodrigues',
        1800.00,
        'In Stock',
        5.0,
        'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0',
        'activity',
        5,
        '[{"time": "08:30", "title": "Trek Start", "description": "Departure from Graviers beach with our local expert guide."}, {"time": "10:00", "title": "Secret Coves", "description": "Explore several hidden beaches accessible only by foot or boat."}, {"time": "11:00", "title": "Trou d''Argent", "description": "Relax and swim in the breathtaking turquoise waters of the natural pool."}, {"time": "13:00", "title": "Picnic Lunch", "description": "Authentic Rodriguan picnic lunch served on the shore."}]'::jsonb,
        '["Exotic Coastal Views", "Natural Lagoon Pools", "Expert Local Guide", "Authentic Local Flavors"]'::jsonb,
        '["Guide Service", "Picnic Lunch", "Bottle of Water", "First Aid Support"]'::jsonb
    ) RETURNING id INTO service_id;
    INSERT INTO public.service_categories (service_id, category_id) VALUES (service_id, cat_rodrigues);
END IF;

-- 6. FLIGHT DESTINATION: Dubai Explorer
IF NOT EXISTS (SELECT 1 FROM public.popular_destinations WHERE destination = 'Dubai') THEN
    INSERT INTO public.popular_destinations (destination, country, return_price, is_featured, image_url)
    VALUES (
        'Dubai',
        'UAE',
        55000.00,
        true,
        'https://images.unsplash.com/photo-1512453979798-5ea266f8880c'
    );
END IF;

-- 7. NEWS/EDITORIAL: Modern Luxury Travel Trends 2026
IF NOT EXISTS (SELECT 1 FROM public.editorial_posts WHERE slug = 'travel-trends-2026') THEN
    INSERT INTO public.editorial_posts (title, slug, excerpt, content, featured_image, status, tags, published_at)
    VALUES (
        'Luxury Travel Trends for 2026',
        'travel-trends-2026',
        'From deep nature immersions to high-tech personalization, see what''s shaping the future of luxury travel.',
        '<p>As we move into 2026, the definition of luxury travel continues to evolve. No longer just about 5-star hotels, today''s discerning traveler seeks authenticity, privacy, and meaningful connection with local cultures...</p>',
        'https://images.unsplash.com/photo-1436491865332-7a61a109c0f2',
        'published',
        ARRAY['luxury', 'trends', 'travel'],
        NOW()
    );
END IF;

-- 8. FAQ: Booking & Modification
INSERT INTO public.faqs (category, question, answer, order_index) VALUES
('Booking', 'How far in advance should I book my hotel?', 'For peak season (December-January), we recommend booking at least 6 months in advance. For other times, 2-3 months is usually sufficient.', 5),
('Visa', 'Do I need a visa for Dubai?', 'Mauritian passport holders currently enjoy visa-free entry to the UAE for up to 90 days. For other nationalities, we provide full assistance with visa applications.', 6);

-- 9. REVIEWS
INSERT INTO public.reviews (service_id, service_type, customer_name, rating, comment, status)
SELECT id, service_type, 'Elena Gilbert', 5, 'The Oberoi was beyond expectations. Every detail was perfect!', 'approved'
FROM public.services WHERE name = 'The Oberoi Beach Resort' LIMIT 1;

INSERT INTO public.reviews (service_id, service_type, customer_name, rating, comment, status)
SELECT id, service_type, 'Stefan Salvatore', 4, 'Great hike in Rodrigues, the guide was very knowledgeable.', 'approved'
FROM public.services WHERE name = 'Trou d''Argent Magic' LIMIT 1;

END $$;
