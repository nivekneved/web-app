-- Seed data for all tables in the database
-- This script will only insert data into tables that actually exist

-- Insert seed data into faqs table (if it exists)
DO $$
BEGIN
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'faqs' AND table_schema = 'public') THEN
    INSERT INTO public.faqs (question, answer, category, order_index, is_published) VALUES
    ('How do I make a booking?', 'Browse our services, select your preferred option, fill in the booking form with your details, and proceed to payment. You''ll receive a confirmation email once your booking is complete.', 'Booking', 1, true),
    ('Can I modify my booking after confirmation?', 'Yes, you can modify your booking by contacting our support team at least 48 hours before your travel date. Changes may be subject to availability and additional fees.', 'Booking', 2, true),
    ('What is your cancellation policy?', 'Cancellations made 7+ days before travel: full refund. 3-7 days: 50% refund. Less than 3 days: no refund. Exceptions may apply based on service provider policies.', 'Booking', 3, true),
    ('What payment methods do you accept?', 'We accept all major credit cards (Visa, Mastercard, American Express), debit cards, and bank transfers. All payments are processed securely.', 'Payment', 1, true),
    ('Is my payment information secure?', 'Yes, we use industry-standard SSL encryption and comply with PCI DSS standards to ensure your payment information is completely secure.', 'Payment', 2, true);
  END IF;
END $$;

-- Insert seed data into content_blocks table (if it exists)
DO $$
BEGIN
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'content_blocks' AND table_schema = 'public') THEN
    INSERT INTO public.content_blocks (page_slug, section_key, content) VALUES
    ('home', 'hero', '{"badge": "IATA Accredited Agency", "title": "Your World, <br />Our <span class=\"text-red-600\">Expertise</span>", "description": "Since 2014, Travel Lounge has been the premier destination for discerning travelers in Mauritius. We specialize in corporate travel and tailor-made leisure experiences worldwide.", "image": "/hero-flight.png"}'),
    ('about', 'identity', '{"subtitle": "About Travel Lounge", "title": "A One-Stop <br /><span class=\"text-red-600\">Travel Solutions</span> Provider", "description": "Located in the heart of Port Louis, Travel Lounge Ltd is an IATA accredited travel agency specializing in corporate business and personalized holiday leisure travel deals.", "quote": "Our mission is to provide dedicated support and personal advice throughout your journey, always putting customer delight at the forefront.", "stats_label": "Years of Excellence", "stats_value": "10+"}'),
    ('about', 'vision', '{"title": "Our Vision", "description": "To be a one-stop travel solutions provider which aims to continuously grow across borders, in premium services, and always putting the customer''s delight at first place."}'),
    ('about', 'mission', '{"title": "Our Mission", "description": "Our dedicated corporate team members focus on personal advice, support and communication throughout your trip abroad and also provide related solutions to individual customers."}'),
    ('contact', 'contact_info', '{"contact_email": "info@travellounge.mu", "contact_phone": "(+230) 212 4070", "whatsapp_number1": "+230 5940 7711", "whatsapp_number2": "+230 5940 7701", "office1_title": "Port Louis Office", "office1_address": "Ground Floor Newton Tower, Corner Sir William Newton and Remy Ollier Street, Port Louis, Mauritius", "office2_title": "Ebene Office", "office2_address": "Ground Floor, 57 Ebene Mews, Rue Du Savoir, Ebene Cybercity, Mauritius", "working_hours": "Mon - Fri: 08:30 - 17:00"}');
  END IF;
END $$;

-- Insert seed data into inquiries table (if it exists)
DO $$
BEGIN
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'inquiries' AND table_schema = 'public') THEN
    INSERT INTO public.inquiries (name, email, phone, subject, message, status) VALUES
    ('John Smith', 'john.smith@email.com', '+230 12345678', 'Luxury Hotel Inquiry', 'I am interested in booking a luxury resort for my family vacation in Mauritius. Could you provide recommendations for high-end properties?', 'unread'),
    ('Maria Rodriguez', 'maria.r@email.com', '+230 87654321', 'Flight Booking', 'I need assistance booking flights from Paris to Mauritius for a group of 6 people in December 2025.', 'read'),
    ('David Johnson', 'd.johnson@email.com', '+230 54321678', 'Cruise Package', 'Looking for a luxury cruise package around the Indian Ocean. What options do you offer?', 'unread');
  END IF;
END $$;

-- Insert seed data into subscribers table (if it exists)
DO $$
BEGIN
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'subscribers' AND table_schema = 'public') THEN
    INSERT INTO public.subscribers (email, status) VALUES
    ('travel.enthusiast@email.com', 'active'),
    ('luxury.traveller@email.com', 'active'),
    ('adventure.seeker@email.com', 'unsubscribed'),
    ('business.traveller@email.com', 'active'),
    ('family.vacation@email.com', 'active');
  END IF;
END $$;

-- Insert seed data into editorial_posts table (if it exists)
DO $$
BEGIN
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'editorial_posts' AND table_schema = 'public') THEN
    INSERT INTO public.editorial_posts (title, slug, excerpt, content, featured_image, status, tags, published_at) VALUES
    ('Top 10 Beaches in Mauritius', 'top-10-beaches-mauritius', 'Discover the most breathtaking beaches in Mauritius that offer pristine sands and crystal-clear waters.', '<p>Mauritius is renowned for its stunning coastline and white sandy beaches. Here are our top picks...</p>', '/blog/beaches.jpg', 'published', ARRAY['beaches', 'mauritius', 'travel'], NOW()),
    ('Exploring the Underwater Waterfall of Mauritius', 'underwater-waterfall-mauritius', 'An amazing optical illusion that creates the appearance of a waterfall beneath the ocean.', '<p>This natural phenomenon occurs off the coast of Le Morne Brabant...</p>', '/blog/waterfall.jpg', 'published', ARRAY['attractions', 'mauritius', 'nature'], NOW() - INTERVAL '5 days'),
    ('Luxury Accommodations in Rodrigues Island', 'luxury-accommodations-rodrigues', 'Experience exclusive stays in one of the Indian Ocean''s best-kept secrets.', '<p>Discover the untouched beauty of Rodrigues Island with our handpicked selection of luxury accommodations...</p>', '/blog/rodrigues.jpg', 'published', ARRAY['rodrigues', 'luxury', 'accommodation'], NOW() - INTERVAL '10 days'),
    ('Best Adventure Activities in Mauritius', 'best-adventure-activities-mauritius', 'Get your adrenaline pumping with these exciting activities in paradise.', '<p>From underwater walks to zip-lining through forests, Mauritius offers adventure for everyone...</p>', '/blog/adventure.jpg', 'draft', ARRAY['adventures', 'activities', 'mauritius'], NULL);
  END IF;
END $$;

-- Insert seed data into popular_destinations table (if it exists)
DO $$
BEGIN
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'popular_destinations' AND table_schema = 'public') THEN
    INSERT INTO public.popular_destinations (destination, country, return_price, image_url, is_featured) VALUES
    ('Paris', 'France', 45000, '/destinations/paris.jpg', true),
    ('Dubai', 'UAE', 55000, '/destinations/dubai.jpg', true),
    ('London', 'UK', 48000, '/destinations/london.jpg', true),
    ('New York', 'USA', 75000, '/destinations/newyork.jpg', true),
    ('Bangkok', 'Thailand', 38000, '/destinations/bangkok.jpg', true),
    ('Singapore', 'Singapore', 32000, '/destinations/singapore.jpg', true);
  END IF;
END $$;

-- Insert seed data for services (if it exists)
DO $$
BEGIN
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'services' AND table_schema = 'public') THEN
    INSERT INTO public.services (name, description, location, region, base_price, rating, image_url, service_type, amenities, duration_days, duration_hours, max_group_size) VALUES
    -- Hotels
    ('LUX* Grand Baie', 'Luxury resort with stunning views of Grand Baie lagoon', 'Grand Baie', 'Mauritius', 35000, 4.8, '/hotels/lux-grandbaie.jpg', 'hotel', ARRAY['Swimming Pool', 'Spa', 'Restaurant', 'Bar', 'Beach Access', 'Free WiFi'], NULL, NULL, NULL),
    ('Constance Le Prince Maurice', 'Exclusive 5-star resort nestled on a private peninsula', 'Poste de Flacq', 'Mauritius', 52000, 4.9, '/hotels/constance-prince.jpg', 'hotel', ARRAY['Private Beach', 'Golf Course', 'Spa', 'Multiple Restaurants', 'Free WiFi'], NULL, NULL, NULL),
    ('Sofitel Mauritius Trois Iles', 'Luxury hotel with panoramic views of the Indian Ocean', 'Rivière Noire', 'Mauritius', 42000, 4.7, '/hotels/sofitel-troisiles.jpg', 'hotel', ARRAY['Infinity Pool', 'Spa', 'Tennis Courts', 'Restaurant', 'Bar'], NULL, NULL, NULL),

    -- Cruises
    ('Seven Seas Explorer', 'Ultra-luxury cruise ship exploring Indian Ocean islands', 'Port Louis', 'Indian Ocean', 120000, 4.9, '/cruises/seven-seas.jpg', 'cruise', ARRAY['Spa', 'Casino', 'Multiple Restaurants', 'Pool', 'Theater'], 7, NULL, NULL),
    ('Celebrity Xpedition', 'Luxury expedition cruise to exotic destinations', 'Port Louis', 'Indian Ocean', 180000, 4.8, '/cruises/celebrity.jpg', 'cruise', ARRAY['Naturalist Guide', 'Observation Lounge', 'Fitness Center', 'Spa', 'Balcony Staterooms'], 10, NULL, NULL),

    -- Tours
    ('Grand North Tour', 'Explore the beautiful northern region of Mauritius', 'Port Louis', 'Mauritius', 8500, 4.6, '/tours/grand-north.jpg', 'tour', ARRAY['Professional Guide', 'Transportation', 'Lunch', 'Entrance Fees'], 1, NULL, 25),
    ('Rodrigues Island Adventure', 'Experience the untouched beauty of Rodrigues Island', 'Port Mathurin', 'Rodrigues', 18500, 4.9, '/tours/rodrigues.jpg', 'tour', ARRAY['Local Guide', 'Transportation', 'Meals', 'Accommodation'], 3, NULL, 15),

    -- Activities
    ('Underwater Walking Helmet Tour', 'Walk under the sea with a special helmet', 'Grand Baie', 'Mauritius', 3200, 4.7, '/activities/underwater-walking.jpg', 'activity', ARRAY['Helmet Rental', 'Professional Guide', 'Photos'], NULL, 1, NULL),
    ('Catamaran Sunset Cruise', 'Relaxing cruise with barbecue dinner', 'Trou aux Biches', 'Mauritius', 4500, 4.8, '/activities/catamaran-cruise.jpg', 'activity', ARRAY['Dinner', 'Drinks', 'Music', 'Swimming'], NULL, 4, NULL);
  END IF;
END $$;

-- Insert seed data for reviews (if it exists)
DO $$
BEGIN
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'reviews' AND table_schema = 'public') THEN
    INSERT INTO public.reviews (customer_name, service_id, service_type, rating, comment, status) VALUES
    ('James Wilson', (SELECT id FROM services WHERE name = 'LUX* Grand Baie'), 'hotel', 5, 'Absolutely wonderful stay! The staff went above and beyond to make our anniversary special.', 'approved'),
    ('Sarah Thompson', (SELECT id FROM services WHERE name = 'Constance Le Prince Maurice'), 'hotel', 5, 'The private beach and spa experience were exceptional. Worth every penny!', 'approved'),
    ('Michael Chen', (SELECT id FROM services WHERE name = 'Seven Seas Explorer'), 'cruise', 4, 'Amazing cruise with incredible service. Highly recommend the specialty dining options.', 'approved'),
    ('Emma Davis', (SELECT id FROM services WHERE name = 'Rodrigues Island Adventure'), 'tour', 5, 'A unique experience that showed us the real beauty of Rodrigues. The guide was fantastic!', 'approved'),
    ('Robert Garcia', (SELECT id FROM services WHERE name = 'Catamaran Sunset Cruise'), 'activity', 4, 'Beautiful evening on the water. Great food and music. A must-do in Mauritius!', 'approved');
  END IF;
END $$;

-- Insert seed data for customers (if it exists)
DO $$
BEGIN
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'customers' AND table_schema = 'public') THEN
    INSERT INTO public.customers (first_name, last_name, email, phone, status) VALUES
    ('John', 'Smith', 'john.smith@email.com', '+230 12345678', 'active'),
    ('Maria', 'Rodriguez', 'maria.r@email.com', '+230 87654321', 'active'),
    ('David', 'Johnson', 'd.johnson@email.com', '+230 54321678', 'active'),
    ('Sophie', 'Martinez', 'sophie.m@email.com', '+230 98765432', 'active'),
    ('Thomas', 'Wilson', 'thomas.w@email.com', '+230 65432109', 'active');
  END IF;
END $$;

-- Insert seed data for bookings (if it exists)
DO $$
BEGIN
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'bookings' AND table_schema = 'public') THEN
    INSERT INTO public.bookings (customer_id, activity_name, activity_type, start_date, end_date, amount, pax_adults, pax_children, status, payment_status, description) VALUES
    ((SELECT id FROM customers WHERE email = 'john.smith@email.com'), 'LUX* Grand Baie Stay', 'hotel', '2025-06-15', '2025-06-22', 35000, 2, 1, 'confirmed', 'paid', 'Family vacation with extra bed for child'),
    ((SELECT id FROM customers WHERE email = 'maria.r@email.com'), 'Seven Seas Explorer Cruise', 'cruise', '2025-08-10', '2025-08-17', 120000, 2, 0, 'confirmed', 'paid', 'Anniversary celebration'),
    ((SELECT id FROM customers WHERE email = 'd.johnson@email.com'), 'Rodrigues Island Adventure', 'tour', '2025-07-05', '2025-07-07', 18500, 4, 0, 'pending', 'pending', 'Business colleagues trip'),
    ((SELECT id FROM customers WHERE email = 'sophie.m@email.com'), 'Underwater Walking Helmet Tour', 'activity', '2025-05-20', NULL, 3200, 3, 0, 'confirmed', 'paid', 'Group of friends exploring marine life'),
    ((SELECT id FROM customers WHERE email = 'thomas.w@email.com'), 'Constance Le Prince Maurice Stay', 'hotel', '2025-09-12', '2025-09-19', 52000, 2, 0, 'confirmed', 'paid', 'Honeymoon trip');
  END IF;
END $$;

-- Insert seed data for booking_items (if it exists)
DO $$
BEGIN
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'booking_items' AND table_schema = 'public') THEN
    INSERT INTO public.booking_items (booking_id, service_id, service_name, service_category, amount) VALUES
    ((SELECT id FROM bookings WHERE activity_name = 'LUX* Grand Baie Stay'), (SELECT id FROM services WHERE name = 'LUX* Grand Baie'), 'LUX* Grand Baie', 'hotel', 35000),
    ((SELECT id FROM bookings WHERE activity_name = 'Seven Seas Explorer Cruise'), (SELECT id FROM services WHERE name = 'Seven Seas Explorer'), 'Seven Seas Explorer', 'cruise', 120000),
    ((SELECT id FROM bookings WHERE activity_name = 'Rodrigues Island Adventure'), (SELECT id FROM services WHERE name = 'Rodrigues Island Adventure'), 'Rodrigues Island Adventure', 'tour', 18500),
    ((SELECT id FROM bookings WHERE activity_name = 'Underwater Walking Helmet Tour'), (SELECT id FROM services WHERE name = 'Underwater Walking Helmet Tour'), 'Underwater Walking Helmet Tour', 'activity', 3200),
    ((SELECT id FROM bookings WHERE activity_name = 'Constance Le Prince Maurice Stay'), (SELECT id FROM services WHERE name = 'Constance Le Prince Maurice'), 'Constance Le Prince Maurice', 'hotel', 52000);
  END IF;
END $$;