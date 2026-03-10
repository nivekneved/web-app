-- Database Schema for Travel Lounge

-- 1. Profiles (User Data)
CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    phone TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Services Table (Hotels, Cruises, Tours, Activities)
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

-- 3. Room Types (Linked to Hotels)
CREATE TABLE IF NOT EXISTS room_types (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    service_id UUID REFERENCES services(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    weekday_price NUMERIC NOT NULL,
    weekend_price NUMERIC NOT NULL,
    amenities TEXT[],
    max_occupancy INTEGER DEFAULT 2
);

-- 4. Popular Destinations (Flights)
CREATE TABLE IF NOT EXISTS popular_destinations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    destination TEXT NOT NULL,
    country TEXT,
    return_price NUMERIC NOT NULL,
    image_url TEXT,
    is_featured BOOLEAN DEFAULT false
);

-- 5. Bookings
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

-- 6. Editorial Posts (News)
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

-- 7. Reviews
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

-- Seed Data

-- Flights
INSERT INTO popular_destinations (destination, country, return_price, is_featured) VALUES
('Dubai', 'UAE', 28500, true),
('Paris', 'France', 42000, true),
('London', 'UK', 45500, true),
('Mumbai', 'India', 22000, true),
('Johannesburg', 'South Africa', 18500, true),
('Singapore', 'Singapore', 38000, true);

-- Hotels
DO $$
DECLARE
    hotel_id UUID;
    prof_id UUID := gen_random_uuid();
BEGIN
    -- LUX* Grand Baie
    INSERT INTO services (name, description, location, region, base_price, rating, service_type, amenities)
    VALUES ('Lux* Grand Baie', 'A boutique resort in the heart of Grand Baie.', 'Grand Baie', 'North', 15000, 5.0, 'hotel', ARRAY['Spa', 'Infinifty Pool', 'Beach Club'])
    RETURNING id INTO hotel_id;
    
    INSERT INTO room_types (service_id, name, weekday_price, weekend_price, amenities) VALUES
    (hotel_id, 'Junior Suite', 15000, 15000 * 1.25, ARRAY['Balcony', 'King Bed']),
    (hotel_id, 'Ocean Villa', 35000, 35000 * 1.25, ARRAY['Private Pool', 'Butler Service']);

    -- Constance Belle Mare Plage
    INSERT INTO services (name, description, location, region, base_price, rating, service_type, amenities)
    VALUES ('Constance Belle Mare Plage', 'Famous for its two championship golf courses.', 'Belle Mare', 'East', 12500, 4.8, 'hotel', ARRAY['Golf', 'Wine Cellar', 'Water Sports'])
    RETURNING id INTO hotel_id;

    INSERT INTO room_types (service_id, name, weekday_price, weekend_price, amenities) VALUES
    (hotel_id, 'Prestige Room', 12500, 12500 * 1.25, ARRAY['Beach Front', 'Terrace']),
    (hotel_id, 'Junior Suite', 18000, 18000 * 1.25, ARRAY['Garden View', 'Apple TV']);
END $$;

-- Cruises
INSERT INTO services (name, description, location, region, base_price, rating, service_type, duration_days, amenities) VALUES
('Mediterranean Discovery', 'Explore the highlights of the Mediterranean coast.', 'Italy & Greece', 'Europe', 85000, 4.9, 'cruise', 7, ARRAY['Full Board', 'Entertainment', 'Excursions']),
('Caribbean Dream', 'Tropical bliss across the Caribbean islands.', 'Miami', 'Caribbean', 92000, 4.8, 'cruise', 10, ARRAY['Luxury Cabin', 'Shows', 'Gym']);

-- News
INSERT INTO editorial_posts (title, slug, excerpt, content, featured_image, tags, status) VALUES
('Top 5 Hidden Beaches in Mauritius', 'hidden-beaches-mauritius', 'Discover the untouched paradise locations that tourists usually miss.', 'Long content here...', '/hero-hotel.png', ARRAY['Mauritius', 'Beaches', 'Travel'], 'published'),
('Packing Tips for Your Next Cruise', 'packing-tips-cruise', 'Everything you need to know to pack light but right for a 7-day cruise.', 'Long content here...', '/hero-cruise.png', ARRAY['Cruise', 'Tips'], 'published');
