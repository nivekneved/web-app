-- Database Schema for Travel Lounge

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

-- Seed Data

-- 1. Flights / Popular Destinations
INSERT INTO popular_destinations (destination, country, return_price, is_featured) VALUES
('Dubai', 'UAE', 28500, true),
('Paris', 'France', 42000, true),
('London', 'UK', 45500, true),
('Mumbai', 'India', 22000, true),
('Johannesburg', 'South Africa', 18500, true),
('Singapore', 'Singapore', 38000, true);

-- 2. Hotels (Mauritius)
DO $$
DECLARE
    hotel_id UUID;
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

    -- Heritage Le Telfair
    INSERT INTO services (name, description, location, region, base_price, rating, service_type, amenities)
    VALUES ('Heritage Le Telfair', 'A quiet, elegant resort inspired by the 19th-century architecture.', 'Bel Ombre', 'South', 14000, 4.9, 'hotel', ARRAY['Spa', 'Nature Reserve', 'Historic Lounge'])
    RETURNING id INTO hotel_id;

    INSERT INTO room_types (service_id, name, weekday_price, weekend_price, amenities) VALUES
    (hotel_id, 'Deluxe Suite', 14000, 14000 * 1.25, ARRAY['River View', 'Personal Butler']);

    -- Trou aux Biches Beachcomber
    INSERT INTO services (name, description, location, region, base_price, rating, service_type, amenities)
    VALUES ('Trou aux Biches Beachcomber', 'An eco-friendly resort on one of the most beautiful beaches.', 'Trou aux Biches', 'North', 16000, 4.7, 'hotel', ARRAY['Eco-friendly', 'Tropical Garden', 'Kids Club'])
    RETURNING id INTO hotel_id;

    INSERT INTO room_types (service_id, name, weekday_price, weekend_price, amenities) VALUES
    (hotel_id, 'Tropical Junior Suite', 16000, 16000 * 1.25, ARRAY['Outdoor Shower', 'Garden Access']);
END $$;

-- 3. Hotels (Rodrigues)
DO $$
DECLARE
    hotel_id UUID;
BEGIN
    -- Tekoma Boutik Hotel
    INSERT INTO services (name, description, location, region, base_price, rating, service_type, amenities)
    VALUES ('Tekoma Boutik Hotel', 'An authentic Creole experience overlooking the turquoise lagoon.', 'Anse Ally', 'Rodrigues', 6000, 4.8, 'hotel', ARRAY['Pool', 'Restaurant', 'Sea View'])
    RETURNING id INTO hotel_id;
    
    INSERT INTO room_types (service_id, name, weekday_price, weekend_price, amenities) VALUES
    (hotel_id, 'Superior Room', 6000, 6000 * 1.25, ARRAY['Aircon', 'Mini Bar']);

    -- Cotton Bay Resort
    INSERT INTO services (name, description, location, region, base_price, rating, service_type, amenities)
    VALUES ('Cotton Bay Resort', 'Nestled in the heart of the beautiful Pointe Coton.', 'Pointe Coton', 'Rodrigues', 4800, 4.5, 'hotel', ARRAY['Beachfront', 'Diving', 'Tennis'])
    RETURNING id INTO hotel_id;

    INSERT INTO room_types (service_id, name, weekday_price, weekend_price, amenities) VALUES
    (hotel_id, 'Standard Room', 4800, 4800 * 1.25, ARRAY['TV', 'Balcony']);
END $$;

-- 4. Cruises
INSERT INTO services (name, description, location, region, base_price, rating, service_type, duration_days, amenities) VALUES
('Mediterranean Discovery', 'Explore the highlights of the Mediterranean coast.', 'Italy & Greece', 'Europe', 85000, 4.9, 'cruise', 7, ARRAY['Full Board', 'Entertainment', 'Excursions']),
('Caribbean Dream', 'Tropical bliss across the Caribbean islands.', 'Miami', 'Caribbean', 92000, 4.8, 'cruise', 10, ARRAY['Luxury Cabin', 'Shows', 'Gym']),
('Indian Ocean Gems', 'Discover the magic of the Indian Ocean.', 'Port Louis', 'Africa', 55000, 4.7, 'cruise', 5, ARRAY['Local Cuisine', 'Snorkeling', 'Island Hopping']),
('Red Sea & Saudi Arabia', 'Explore the mystical shores of the Red Sea.', 'Jeddah', 'Middle East', 45000, 4.6, 'cruise', 7, ARRAY['Cultural Tours', 'Diving', 'Spa']),
('Asia Discovery', 'A journey through the vibrant cities of East Asia.', 'Singapore & Tokyo', 'Asia', 115000, 4.9, 'cruise', 12, ARRAY['City Tours', 'Luxury Dining', 'Wellness Center']),
('Dubai & Emirates', 'Modern luxury meets traditional Arabian charm.', 'Dubai', 'Middle East', 38000, 4.7, 'cruise', 7, ARRAY['Shopping', 'Desert Safari', 'Fine Dining']),
('Alaska Glaciers', 'Experience the raw beauty of the Alaskan wilderness.', 'Seattle', 'North America', 125000, 4.8, 'cruise', 10, ARRAY['Wildlife Watching', 'Photography', 'Lectures']),
('South Pacific Paradise', 'Visit the remote islands of the South Pacific.', 'Tahiti', 'Pacific', 155000, 5.0, 'cruise', 14, ARRAY['Private Island', 'Water Sports', 'All-Inclusive']);

-- 5. Activities
INSERT INTO services (name, description, location, region, base_price, rating, service_type, duration_hours, amenities) VALUES
('Ile aux Cerfs Speedboat Tour', 'A full day of fun and sun at Ile aux Cerfs.', 'Trou d''Eau Douce', 'East', 2500, 4.6, 'activity', 6, ARRAY['Lunch', 'Drinks', 'Speedboat']),
('Catamaran Northern Isles', 'Sail to the beautiful northern islands of Mauritius.', 'Grand Baie', 'North', 1800, 4.8, 'activity', 8, ARRAY['BBQ Lunch', 'Open Bar', 'Snorkeling']);
