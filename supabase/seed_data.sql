-- Comprehensive Database Schema & Seed Data for Travel Lounge
-- This script ensures all tables have at least 7 entries and maintains relational integrity.

-- ==========================================
-- 1. CLEANUP (Optional - Use with caution)
-- ==========================================
-- DROP TABLE IF EXISTS reviews, bookings, editorial_posts, popular_destinations, room_types, services, profiles CASCADE;

-- ==========================================
-- 2. SCHEMA DEFINITIONS
-- ==========================================

-- Profiles (User Data)
CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    phone TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Services Table (Hotels, Cruises, Tours, Activities)
CREATE TABLE IF NOT EXISTS services (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    description TEXT,
    location TEXT,
    region TEXT,
    base_price NUMERIC,
    rating NUMERIC DEFAULT 4.5,
    image_url TEXT,
    amenities TEXT[],
    service_type TEXT CHECK (service_type IN ('hotel', 'cruise', 'tour', 'activity')),
    duration_days INTEGER,
    duration_hours INTEGER,
    max_group_size INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Room Types (Linked to Hotels)
CREATE TABLE IF NOT EXISTS room_types (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    service_id UUID REFERENCES services(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    weekday_price NUMERIC NOT NULL,
    weekend_price NUMERIC NOT NULL,
    amenities TEXT[],
    max_occupancy INTEGER DEFAULT 2
);

-- Popular Destinations (Flights)
CREATE TABLE IF NOT EXISTS popular_destinations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    destination TEXT NOT NULL,
    country TEXT,
    return_price NUMERIC NOT NULL,
    image_url TEXT,
    is_featured BOOLEAN DEFAULT false
);

-- Bookings
CREATE TABLE IF NOT EXISTS bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    service_id UUID REFERENCES services(id) ON DELETE SET NULL,
    service_name TEXT,
    service_type TEXT,
    check_in_date DATE,
    check_out_date DATE,
    total_price NUMERIC,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Editorial Posts (News)
CREATE TABLE IF NOT EXISTS editorial_posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    excerpt TEXT,
    content TEXT,
    featured_image TEXT,
    tags TEXT[],
    status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
    published_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Reviews
CREATE TABLE IF NOT EXISTS reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    service_id UUID REFERENCES services(id) ON DELETE CASCADE,
    service_type TEXT,
    customer_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    customer_name TEXT,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==========================================
-- 3. SEED DATA (Minimum 7 entries per table)
-- ==========================================

DO $$
DECLARE
    -- Profile IDs
    p1 UUID; p2 UUID; p3 UUID; p4 UUID; p5 UUID; p6 UUID; p7 UUID;
    -- Service IDs (Hotels)
    h1 UUID; h2 UUID; h3 UUID; h4 UUID; h5 UUID; h6 UUID; h7 UUID;
    -- Service IDs (Non-Hotel)
    c1 UUID; c2 UUID; t1 UUID; t2 UUID; a1 UUID; a2 UUID; a3 UUID;
BEGIN
    -- --- [1. PROFILES] ---
    INSERT INTO profiles (name, email, phone) VALUES 
    ('Jean Dupont', 'jean.dupont@email.mu', '+230 5123 4567') RETURNING id INTO p1;
    INSERT INTO profiles (name, email, phone) VALUES 
    ('Sarah Smith', 'sarah.smith@email.com', '+44 7700 900000') RETURNING id INTO p2;
    INSERT INTO profiles (name, email, phone) VALUES 
    ('Anjali Ram', 'anjali.ram@email.in', '+91 98765 43210') RETURNING id INTO p3;
    INSERT INTO profiles (name, email, phone) VALUES 
    ('Michael Wong', 'michael.wong@email.hk', '+852 2123 4567') RETURNING id INTO p4;
    INSERT INTO profiles (name, email, phone) VALUES 
    ('Elena Rossi', 'elena.rossi@email.it', '+39 02 1234 567') RETURNING id INTO p5;
    INSERT INTO profiles (name, email, phone) VALUES 
    ('Ahmed Al-Farsi', 'ahmed.alfarsi@email.ae', '+971 4 123 4567') RETURNING id INTO p6;
    INSERT INTO profiles (name, email, phone) VALUES 
    ('David Miller', 'david.miller@email.us', '+1 212 555 0123') RETURNING id INTO p7;

    -- --- [2. SERVICES (Hotels)] ---
    INSERT INTO services (name, description, location, region, base_price, rating, service_type, amenities)
    VALUES ('Lux* Grand Baie', 'Boutique resort in Grand Baie.', 'Grand Baie', 'North', 15500, 5.0, 'hotel', ARRAY['Spa', 'Infinity Pool']) RETURNING id INTO h1;
    INSERT INTO services (name, description, location, region, base_price, rating, service_type, amenities)
    VALUES ('Constance Belle Mare', 'Luxury golf resort.', 'Belle Mare', 'East', 12800, 4.8, 'hotel', ARRAY['Golf', 'Wine Cellar']) RETURNING id INTO h2;
    INSERT INTO services (name, description, location, region, base_price, rating, service_type, amenities)
    VALUES ('Heritage Le Telfair', '19th-century inspired elegance.', 'Bel Ombre', 'South', 13500, 4.9, 'hotel', ARRAY['Nature Reserve', 'Spa']) RETURNING id INTO h3;
    INSERT INTO services (name, description, location, region, base_price, rating, service_type, amenities)
    VALUES ('Trou aux Biches', 'Eco-friendly beachfront resort.', 'Trou aux Biches', 'North', 16200, 4.7, 'hotel', ARRAY['Kids Club', 'Water Sports']) RETURNING id INTO h4;
    INSERT INTO services (name, description, location, region, base_price, rating, service_type, amenities)
    VALUES ('Tekoma Boutik', 'Authentic Rodrigues experience.', 'Anse Ally', 'Rodrigues', 6500, 4.8, 'hotel', ARRAY['Lagoon View', 'Authentic Dining']) RETURNING id INTO h5;
    INSERT INTO services (name, description, location, region, base_price, rating, service_type, amenities)
    VALUES ('Shangri-La Le Touessrok', 'Iconic luxury on the east coast.', 'Trou d''Eau Douce', 'East', 18500, 4.9, 'hotel', ARRAY['Private Island', 'Butler Service']) RETURNING id INTO h6;
    INSERT INTO services (name, description, location, region, base_price, rating, service_type, amenities)
    VALUES ('One&Only Le Saint Géran', 'Legendary ultra-luxury resort.', 'Poste de Flacq', 'East', 22000, 5.0, 'hotel', ARRAY['Michelin Dining', 'Private Beach']) RETURNING id INTO h7;

    -- --- [3. ROOM TYPES] --- (Linked to Hotels)
    INSERT INTO room_types (service_id, name, weekday_price, weekend_price, amenities) VALUES
    (h1, 'Junior Suite', 15500, 19375, ARRAY['Balcony', 'King Bed']),
    (h2, 'Prestige Room', 12800, 16000, ARRAY['Terrace', 'Sea Access']),
    (h3, 'Deluxe Suite', 13500, 16875, ARRAY['Butler', 'River View']),
    (h4, 'Beach Front Suite', 18500, 23125, ARRAY['Plunge Pool', 'Direct Beach']),
    (h5, 'Superior Sea View', 6500, 8125, ARRAY['Balcony', 'Eco-cool']),
    (h6, 'Coral Deluxe Ocean', 18500, 23125, ARRAY['Marble Bath', 'Personal Bar']),
    (h7, 'Lagoon Room', 22000, 27500, ARRAY['Sun Deck', 'Fine Linen']);

    -- --- [4. SERVICES (Other Types)] ---
    INSERT INTO services (name, description, location, region, base_price, rating, service_type, duration_days, amenities)
    VALUES ('Mediterranean Discovery', 'Cruise Italy & Greece shores.', 'Italy & Greece', 'Europe', 85000, 4.9, 'cruise', 7, ARRAY['Full Board', 'Entertainment']) RETURNING id INTO c1;
    INSERT INTO services (name, description, location, region, base_price, rating, service_type, duration_days, amenities)
    VALUES ('Asia Voyager', 'Cruise through SE Asia cities.', 'Singapore/Tokyo', 'Asia', 110000, 4.8, 'cruise', 10, ARRAY['City Tours', 'Luxury Dining']) RETURNING id INTO c2;
    INSERT INTO services (name, description, location, region, base_price, rating, service_type, duration_days, amenities)
    VALUES ('Mystical India Tour', 'Golden Triangle spiritual journey.', 'Delhi/Agra/Jaipur', 'India', 45000, 4.7, 'tour', 6, ARRAY['Private Driver', 'Heritage Hotels']) RETURNING id INTO t1;
    INSERT INTO services (name, description, location, region, base_price, rating, service_type, duration_days, amenities)
    VALUES ('South African Safari', 'Kruger Park adventure.', 'Johannesburg', 'Africa', 65000, 4.9, 'tour', 5, ARRAY['Game Drive', 'Bush Braai']) RETURNING id INTO t2;
    INSERT INTO services (name, description, location, region, base_price, rating, service_type, duration_hours, amenities)
    VALUES ('Ile aux Cerfs Speedboat', 'Day tour to the island.', 'Trou d''Eau Douce', 'East', 2800, 4.6, 'activity', 6, ARRAY['Lunch', 'Drinks']) RETURNING id INTO a1;
    INSERT INTO services (name, description, location, region, base_price, rating, service_type, duration_hours, amenities)
    VALUES ('Chamarel 7-Colored Earth', 'Visit the volcanic wonders.', 'Chamarel', 'West', 1500, 4.5, 'activity', 4, ARRAY['Eco-Walk', 'Photography']) RETURNING id INTO a2;
    INSERT INTO services (name, description, location, region, base_price, rating, service_type, duration_hours, amenities)
    VALUES ('Grand Bassin Temple Visit', 'Discover Mauritian spirituality.', 'Grand Bassin', 'South', 1200, 4.8, 'activity', 3, ARRAY['Cultural Guide', 'Peaceful']) RETURNING id INTO a3;

    -- --- [5. POPULAR DESTINATIONS (Flights)] ---
    INSERT INTO popular_destinations (destination, country, return_price, is_featured) VALUES
    ('Paris', 'France', 42500, true),
    ('Dubai', 'UAE', 29000, true),
    ('London', 'UK', 46500, true),
    ('Singapore', 'Singapore', 39500, true),
    ('Mumbai', 'India', 22500, true),
    ('Istanbul', 'Turkey', 38000, true),
    ('Sydney', 'Australia', 55000, true);

    -- --- [6. BOOKINGS] --- (Dynamic linking)
    INSERT INTO bookings (customer_id, service_id, service_name, service_type, check_in_date, check_out_date, total_price, status) VALUES
    (p1, h1, 'Lux* Grand Baie', 'hotel', '2026-04-10', '2026-04-15', 77500, 'confirmed'),
    (p2, c1, 'Mediterranean Discovery', 'cruise', '2026-06-01', '2026-06-08', 85000, 'pending'),
    (p3, h5, 'Tekoma Boutik', 'hotel', '2026-05-20', '2026-05-25', 32500, 'confirmed'),
    (p4, t1, 'Mystical India Tour', 'tour', '2026-09-15', '2026-09-21', 45000, 'confirmed'),
    (p5, h7, 'One&Only Saint Géran', 'hotel', '2026-10-01', '2026-10-05', 88000, 'cancelled'),
    (p6, a1, 'Ile aux Cerfs Speedboat', 'activity', '2026-03-25', '2026-03-25', 2800, 'confirmed'),
    (p7, h2, 'Constance Belle Mare', 'hotel', '2026-08-12', '2026-08-15', 38400, 'pending');

    -- --- [7. REVIEWS] ---
    INSERT INTO reviews (service_id, service_type, customer_id, customer_name, rating, comment, status) VALUES
    (h1, 'hotel', p1, 'Jean Dupont', 5, 'Absolutely stunning resort and service!', 'approved'),
    (h2, 'hotel', p2, 'Sarah Smith', 4, 'Great golf course, but slightly busy beach.', 'approved'),
    (h5, 'hotel', p3, 'Anjali Ram', 5, 'Rodrigues at its best. Loved the location.', 'approved'),
    (c1, 'cruise', p4, 'Michael Wong', 5, 'Unforgettable views along the coast.', 'pending'),
    (t2, 'tour', p5, 'Elena Rossi', 5, 'The Safari was breath-taking! Highly recommend.', 'approved'),
    (a1, 'activity', p6, 'Ahmed Al-Farsi', 4, 'Good fun on the water, lunch was simple.', 'approved'),
    (h6, 'hotel', p7, 'David Miller', 5, 'World class luxury and island privacy.', 'approved');

    -- --- [8. EDITORIAL POSTS (News)] ---
    INSERT INTO editorial_posts (title, slug, excerpt, content, status) VALUES
    ('Ultimate Guide to Grand Baie', 'guide-grand-baie', 'Everything you need to know about the North.', 'Content about beaches and nightlife...', 'published'),
    ('Why Choose Rodrigues for 2026', 'rodrigues-2026', 'The sleeper destination of the year.', 'Content about hidden lagoons and authenticity...', 'published'),
    ('Luxury Cruises on a Budget', 'cruises-budget', 'How to save without losing the status.', 'Tips on booking early and choosing cabins...', 'published'),
    ('Safaris in South Africa', 'safari-tips', 'Top 5 parks to see the Big Five.', 'Kruger vs Sabi Sands vs Pilanesberg...', 'published'),
    ('Mauritian Street Food Secrets', 'mauritius-street-food', 'Where locals eat in Port Louis.', 'Gates Piment, Dholl Puri, and more...', 'published'),
    ('Spiritual Journey to India', 'spiritual-india', 'The Golden Triangle and beyond.', 'Temples of Jaipur and the Ganges experience...', 'published'),
    ('Top 10 Resorts for Families', 'family-resorts-2026', 'Keep the kids happy and you relaxed.', 'Activities, clubs, and spacious suites...', 'published');

END $$;
