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
    ('Is my payment information secure?', 'Yes, we use industry-standard SSL encryption and comply with PCI DSS standards to ensure your payment information is completely secure.', 'Payment', 2, true),
    ('How far in advance should I book my hotel?', 'For peak season (December-January), we recommend booking at least 6 months in advance. For other times, 2-3 months is usually sufficient.', 'Booking', 4, true),
    ('Do I need a visa for Dubai?', 'Mauritian passport holders currently enjoy visa-free entry to the UAE for up to 90 days. For other nationalities, we provide full assistance with visa applications.', 'Visa', 5, true),
    ('What documents do I need for travel?', 'You will typically need a valid passport with at least 6 months validity, visa if required, and travel insurance documents.', 'Documentation', 6, true),
    ('Are pets allowed on flights?', 'Most airlines allow pets but have specific restrictions. Contact us for detailed information about pet policies with specific airlines.', 'Flights', 7, true),
    ('Can I request special meals on flights?', 'Yes, most airlines offer special meal options. You need to request these at least 24-48 hours before departure.', 'Flights', 8, true),
    ('What is the baggage allowance?', 'Baggage allowance varies by airline and ticket class. Check your specific airline policy or contact our support for details.', 'Flights', 9, true);
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
    ('contact', 'contact_info', '{"contact_email": "info@travellounge.mu", "contact_phone": "(+230) 212 4070", "whatsapp_number1": "+230 5940 7711", "whatsapp_number2": "+230 5940 7701", "office1_title": "Port Louis Office", "office1_address": "Ground Floor Newton Tower, Corner Sir William Newton and Remy Ollier Street, Port Louis, Mauritius", "office2_title": "Ebene Office", "office2_address": "Ground Floor, 57 Ebene Mews, Rue Du Savoir, Ebene Cybercity, Mauritius", "working_hours": "Mon - Fri: 08:30 - 17:00"}'),
    ('home', 'services', '{"title": "Our <span class=\"text-red-600\">Services</span>", "description": "We offer a wide range of travel services tailored to meet your needs.", "features": [{"icon": "flight", "title": "Flights", "description": "Find the best deals on flights worldwide"}, {"icon": "hotel", "title": "Hotels", "description": "Book luxury stays at competitive prices"}, {"icon": "car", "title": "Car Rentals", "description": "Rent cars from trusted providers"}, {"icon": "package", "title": "Holiday Packages", "description": "Complete holiday packages with everything planned"}]}'),
    ('home', 'testimonials', '{"title": "What Our <span class=\"text-red-600\">Clients Say</span>", "description": "Don''t just take our word for it, hear from our satisfied customers."}'),
    ('home', 'destinations', '{"title": "Popular <span class=\"text-red-600\">Destinations</span>", "description": "Explore the most sought-after destinations around the world."}'),
    ('privacy-policy', 'policy', '{"title": "Privacy Policy", "content": "<p>We respect your privacy and are committed to protecting your personal data.</p>"}'),
    ('terms-conditions', 'terms', '{"title": "Terms & Conditions", "content": "<p>Please read these terms and conditions carefully before using our services.</p>"}'),
    ('faq', 'faq_section', '{"title": "Frequently Asked <span class=\"text-red-600\">Questions</span>", "description": "Find answers to common questions about our services."}');
  END IF;
END $$;

-- Insert seed data into inquiries table (if it exists)
DO $$
BEGIN
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'inquiries' AND table_schema = 'public') THEN
    INSERT INTO public.inquiries (name, email, phone, subject, message, status) VALUES
    ('John Smith', 'john.smith@email.com', '+230 12345678', 'Luxury Hotel Inquiry', 'I am interested in booking a luxury resort for my family vacation in Mauritius. Could you provide recommendations for high-end properties?', 'unread'),
    ('Maria Rodriguez', 'maria.r@email.com', '+230 87654321', 'Flight Booking', 'I need assistance booking flights from Paris to Mauritius for a group of 6 people in December 2025.', 'read'),
    ('David Johnson', 'd.johnson@email.com', '+230 54321678', 'Cruise Package', 'Looking for a luxury cruise package around the Indian Ocean. What options do you offer?', 'unread'),
    ('Sophie Martinez', 'sophie.m@email.com', '+230 98765432', 'Visa Requirements', 'I''m planning a trip to the USA. What visa documentation do I need?', 'read'),
    ('Thomas Wilson', 'thomas.w@email.com', '+230 65432109', 'Car Rental', 'Need to rent a car for 2 weeks during our stay in Mauritius. What options do you have?', 'pending'),
    ('Emma Thompson', 'emma.t@email.com', '+230 52345678', 'Activity Booking', 'Looking for adventure activities in Mauritius. Can you suggest water sports options?', 'unread'),
    ('Michael Brown', 'michael.b@email.com', '+230 53456789', 'Wedding Package', 'Interested in honeymoon packages in Mauritius. Need special arrangements for a wedding ceremony.', 'read'),
    ('Olivia Davis', 'olivia.d@email.com', '+230 54567890', 'Business Travel', 'Corporate trip for 10 people to Dubai. Need hotel and flight arrangements.', 'pending'),
    ('James Wilson', 'james.w@email.com', '+230 55678901', 'Family Vacation', 'Planning a family vacation with children. Looking for family-friendly resorts.', 'unread'),
    ('Isabella Garcia', 'isabella.g@email.com', '+230 56789012', 'Group Booking', 'Organizing a group tour for 20 people to Europe. Need group rates.', 'read'),
    ('William Rodriguez', 'william.r@email.com', '+230 57890123', 'Last Minute Deal', 'Looking for last-minute deals for a spontaneous trip to Seychelles.', 'pending');
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
    ('family.vacation@email.com', 'active'),
    ('backpacker.world@email.com', 'active'),
    ('cruise.lover@email.com', 'active'),
    ('beach.bum@email.com', 'unsubscribed'),
    ('mountain.explorer@email.com', 'active'),
    ('city.hopper@email.com', 'active'),
    ('luxury.hotel.guest@email.com', 'active');
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
    ('Best Adventure Activities in Mauritius', 'best-adventure-activities-mauritius', 'Get your adrenaline pumping with these exciting activities in paradise.', '<p>From underwater walks to zip-lining through forests, Mauritius offers adventure for everyone...</p>', '/blog/adventure.jpg', 'draft', ARRAY['adventures', 'activities', 'mauritius'], NULL),
    ('Mauritian Cuisine: A Culinary Journey', 'mauritian-cuisine-journey', 'Discover the flavors of Mauritius through its diverse culinary traditions.', '<p>Experience the fusion of Creole, Indian, Chinese, and European influences in Mauritian cuisine...</p>', '/blog/food.jpg', 'published', ARRAY['food', 'culture', 'mauritius'], NOW() - INTERVAL '3 days'),
    ('Travel Tips for First-Time Visitors to Mauritius', 'travel-tips-mauritius-first-time', 'Essential tips to make your first trip to Mauritius unforgettable.', '<p>From weather considerations to cultural etiquette, here''s what you need to know before visiting...</p>', '/blog/tips.jpg', 'published', ARRAY['tips', 'first-time', 'mauritius'], NOW() - INTERVAL '15 days'),
    ('Hidden Gems: Off-the-Beaten-Path Mauritius', 'hidden-gems-mauritius', 'Explore the lesser-known attractions that make Mauritius special.', '<p>Beyond the tourist hotspots, discover secret lagoons, mountain trails, and authentic villages...</p>', '/blog/gems.jpg', 'published', ARRAY['hidden', 'gems', 'mauritius'], NOW() - INTERVAL '20 days'),
    ('Sustainable Tourism in Mauritius', 'sustainable-tourism-mauritius', 'How Mauritius is leading the way in eco-friendly tourism practices.', '<p>Learn about conservation efforts and sustainable travel options in Mauritius...</p>', '/blog/sustainability.jpg', 'published', ARRAY['sustainability', 'eco-tourism', 'mauritius'], NOW() - INTERVAL '25 days'),
    ('The Cultural Diversity of Mauritius', 'cultural-diversity-mauritius', 'Understanding the multicultural heritage that defines Mauritius.', '<p>Explore the rich tapestry of cultures that coexist in this tropical paradise...</p>', '/blog/culture.jpg', 'published', ARRAY['culture', 'heritage', 'diversity'], NOW() - INTERVAL '30 days'),
    ('Best Photography Spots in Mauritius', 'photography-spots-mauritius', 'Capture the beauty of Mauritius with these Instagram-worthy locations.', '<p>From sunrise at Black River Gorges to sunset at Grand Bassin, find the perfect shots...</p>', '/blog/photography.jpg', 'published', ARRAY['photography', 'instagram', 'mauritius'], NOW() - INTERVAL '35 days'),
    ('Mauritius vs. Other Tropical Destinations', 'mauritius-vs-tropical-destinations', 'Why Mauritius stands out among tropical paradises.', '<p>A comparison of Mauritius with other popular tropical destinations...</p>', '/blog/comparison.jpg', 'published', ARRAY['comparison', 'tropical', 'destinations'], NOW() - INTERVAL '40 days');
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
    ('Singapore', 'Singapore', 32000, '/destinations/singapore.jpg', true),
    ('Tokyo', 'Japan', 85000, '/destinations/tokyo.jpg', true),
    ('Sydney', 'Australia', 95000, '/destinations/sydney.jpg', true),
    ('Cape Town', 'South Africa', 65000, '/destinations/cape-town.jpg', true),
    ('Seychelles', 'Seychelles', 120000, '/destinations/seychelles.jpg', true),
    ('Maldives', 'Maldives', 150000, '/destinations/maldives.jpg', true);
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
    ('The Oberoi Beach Resort', 'Situated on the pristine white sands of Turtle Bay, The Oberoi Beach Resort is a world-class luxury hotel that offers a unique experience of Mauritius.', 'Turtle Bay', 'North-West', 45000, 5.0, 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb', 'hotel', ARRAY['Private Pools', 'Subtropical Gardens', 'Spa', 'Fine Dining', 'Beachfront', 'Butler Service'], NULL, NULL, NULL),
    ('Shangri-La''s Le Touessrok Resort & Spa', 'Overlooking the turquoise lagoon of Trou d''Eau Douce', 'Trou d''Eau Douce', 'Mauritius', 48000, 4.9, '/hotels/shangri-la.jpg', 'hotel', ARRAY['Spa', 'Multiple Pools', 'Water Sports', 'Kids Club', 'Private Beach'], NULL, NULL, NULL),
    ('Four Seasons Resort Mauritius', 'Located on the southernmost tip of the island', 'Bel Ombre', 'Mauritius', 60000, 4.9, '/hotels/fourseasons.jpg', 'hotel', ARRAY['Private Beach', 'Golf Course', 'Spa', 'Tennis', 'Watersports'], NULL, NULL, NULL),
    ('Heritage Awali Golf & Spa Resort', 'Set in lush tropical gardens with mountain views', 'Bel Ombre', 'Mauritius', 38000, 4.6, '/hotels/heritage-awali.jpg', 'hotel', ARRAY['Spa', 'Golf Course', 'Tennis', 'Multiple Restaurants', 'Private Beach'], NULL, NULL, NULL),
    ('Maritim Hotel Mauritius', 'Family-friendly beachfront resort', 'Pointe des Biches', 'Mauritius', 32000, 4.5, '/hotels/maritim.jpg', 'hotel', ARRAY['Private Beach', 'Kids Club', 'Tennis', 'Water Sports', 'Spa'], NULL, NULL, NULL),

    -- Cruises
    ('Seven Seas Explorer', 'Ultra-luxury cruise ship exploring Indian Ocean islands', 'Port Louis', 'Indian Ocean', 120000, 4.9, '/cruises/seven-seas.jpg', 'cruise', ARRAY['Spa', 'Casino', 'Multiple Restaurants', 'Pool', 'Theater'], 7, NULL, NULL),
    ('Celebrity Xpedition', 'Luxury expedition cruise to exotic destinations', 'Port Louis', 'Indian Ocean', 180000, 4.8, '/cruises/celebrity.jpg', 'cruise', ARRAY['Naturalist Guide', 'Observation Lounge', 'Fitness Center', 'Spa', 'Balcony Staterooms'], 10, NULL, NULL),
    ('Catamaran Ile aux Cerfs', 'A full day of sun, sea and fun on a luxury catamaran sailing to the famous island of Ile aux Cerfs.', 'Trou d''Eau Douce', 'East', 3800, 4.9, 'https://images.unsplash.com/photo-1534447677768-be436bb09401', 'cruise', ARRAY['BBQ Lunch', 'Snorkeling Equipment', 'Open Bar Unlimited Drinks', 'Live Music'], 1, 8, 50);

    -- Tours
    INSERT INTO public.services (name, description, location, region, base_price, rating, image_url, service_type, amenities, duration_days, duration_hours, max_group_size) VALUES
    ('Grand North Tour', 'Explore the beautiful northern region of Mauritius', 'Port Louis', 'Mauritius', 8500, 4.6, '/tours/grand-north.jpg', 'tour', ARRAY['Professional Guide', 'Transportation', 'Lunch', 'Entrance Fees'], 1, NULL, 25),
    ('Rodrigues Island Adventure', 'Experience the untouched beauty of Rodrigues Island', 'Port Mathurin', 'Rodrigues', 18500, 4.9, '/tours/rodrigues.jpg', 'tour', ARRAY['Local Guide', 'Transportation', 'Meals', 'Accommodation'], 3, NULL, 15),
    ('Tea Route Experience', 'Follow the journey of tea from plantation to cup through the historic estates of the South.', 'Bois Cheri', 'South', 4200, 4.7, 'https://images.unsplash.com/photo-1546853127-88789cc64761', 'tour', ARRAY['Entry Tickets', 'Tea Tasting', '3-Course Lunch', 'Personal Guide'], 1, NULL, 20),
    ('West Coast Adventure', 'Explore the dramatic western coastline of Mauritius', 'Black River', 'Mauritius', 12000, 4.8, '/tours/west-coast.jpg', 'tour', ARRAY['Professional Guide', 'Boat Trip', 'Snorkeling', 'Lunch'], 1, NULL, 12),
    ('Cultural Heritage Tour', 'Discover the rich cultural history of Mauritius', 'Centre de Flacq', 'Mauritius', 9500, 4.5, '/tours/cultural-heritage.jpg', 'tour', ARRAY['Cultural Guide', 'Transportation', 'Museum Entry', 'Lunch'], 1, NULL, 20);

    -- Activities
    INSERT INTO public.services (name, description, location, region, base_price, rating, image_url, service_type, amenities, duration_days, duration_hours, max_group_size) VALUES
    ('Underwater Walking Helmet Tour', 'Walk under the sea with a special helmet', 'Grand Baie', 'Mauritius', 3200, 4.7, '/activities/underwater-walking.jpg', 'activity', ARRAY['Helmet Rental', 'Professional Guide', 'Photos'], NULL, 1, NULL),
    ('Catamaran Sunset Cruise', 'Relaxing cruise with barbecue dinner', 'Trou aux Biches', 'Mauritius', 4500, 4.8, '/activities/catamaran-cruise.jpg', 'activity', ARRAY['Dinner', 'Drinks', 'Music', 'Swimming'], NULL, 4, NULL),
    ('Chamarel Discovery', 'Witness the unique geological phenomenon of the Seven Coloured Earth and the majestic Chamarel Waterfall.', 'Chamarel', 'South-West', 2500, 4.8, 'https://images.unsplash.com/photo-1544551763-47a0159f963f', 'activity', ARRAY['Entrance Fees', 'Access to Waterfall', 'Guided Information', 'Parking'], NULL, 4, 30),
    ('Twin Lagoon Kayaking', 'Kayak through two connected lagoons in the south of Mauritius', 'Blue Bay', 'Mauritius', 2800, 4.6, '/activities/kayaking.jpg', 'activity', ARRAY['Kayak Rental', 'Life Jacket', 'Guide', 'Snacks'], NULL, 3, NULL),
    ('Deep Sea Fishing Adventure', 'Exciting deep sea fishing experience', 'Grand Baie', 'Mauritius', 6500, 4.9, '/activities/fishing.jpg', 'activity', ARRAY['Equipment', 'Guide', 'Lunch', 'Drinks'], NULL, 8, 6);
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
    ('Robert Garcia', (SELECT id FROM services WHERE name = 'Catamaran Sunset Cruise'), 'activity', 4, 'Beautiful evening on the water. Great food and music. A must-do in Mauritius!', 'approved'),
    ('Jennifer Lee', (SELECT id FROM services WHERE name = 'The Oberoi Beach Resort'), 'hotel', 5, 'The service was impeccable. Every detail was attended to. Simply outstanding experience.', 'approved'),
    ('David Kim', (SELECT id FROM services WHERE name = 'Catamaran Ile aux Cerfs'), 'cruise', 5, 'Perfect day out on the water. The crew was friendly and the food was delicious.', 'approved'),
    ('Lisa Anderson', (SELECT id FROM services WHERE name = 'Tea Route Experience'), 'tour', 4, 'Educational and delicious. The tea tasting was the highlight of our trip.', 'approved'),
    ('Mark Johnson', (SELECT id FROM services WHERE name = 'Chamarel Discovery'), 'activity', 5, 'The 7 Coloured Earth was amazing! Beautiful natural phenomenon and great guide.', 'approved'),
    ('Nancy White', (SELECT id FROM services WHERE name = 'Shangri-La''s Le Touessrok Resort & Spa'), 'hotel', 5, 'Exceptional property with direct access to the most beautiful lagoon.', 'approved'),
    ('Paul Roberts', (SELECT id FROM services WHERE name = 'Grand North Tour'), 'tour', 4, 'Comprehensive tour of the north. Well organized and informative.', 'approved');
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
    ('Thomas', 'Wilson', 'thomas.w@email.com', '+230 65432109', 'active'),
    ('Emma', 'Thompson', 'emma.t@email.com', '+230 52345678', 'active'),
    ('Michael', 'Brown', 'michael.b@email.com', '+230 53456789', 'active'),
    ('Olivia', 'Davis', 'olivia.d@email.com', '+230 54567890', 'active'),
    ('James', 'Wilson', 'james.w@email.com', '+230 55678901', 'active'),
    ('Isabella', 'Garcia', 'isabella.g@email.com', '+230 56789012', 'active'),
    ('William', 'Rodriguez', 'william.r@email.com', '+230 57890123', 'active');
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
    ((SELECT id FROM customers WHERE email = 'thomas.w@email.com'), 'Constance Le Prince Maurice Stay', 'hotel', '2025-09-12', '2025-09-19', 52000, 2, 0, 'confirmed', 'paid', 'Honeymoon trip'),
    ((SELECT id FROM customers WHERE email = 'emma.t@email.com'), 'Catamaran Ile aux Cerfs Cruise', 'cruise', '2025-06-25', NULL, 3800, 4, 1, 'confirmed', 'paid', 'Family day out'),
    ((SELECT id FROM customers WHERE email = 'michael.b@email.com'), 'Chamarel Discovery Tour', 'activity', '2025-07-15', NULL, 2500, 2, 0, 'confirmed', 'paid', 'Nature enthusiasts'),
    ((SELECT id FROM customers WHERE email = 'olivia.d@email.com'), 'The Oberoi Beach Resort Stay', 'hotel', '2025-08-01', '2025-08-08', 45000, 2, 0, 'confirmed', 'paid', 'Luxury getaway'),
    ((SELECT id FROM customers WHERE email = 'james.w@email.com'), 'Tea Route Experience', 'tour', '2025-06-30', NULL, 4200, 3, 0, 'pending', 'pending', 'Cultural exploration'),
    ((SELECT id FROM customers WHERE email = 'isabella.g@email.com'), 'Shangri-La''s Le Touessrok Resort Stay', 'hotel', '2025-07-20', '2025-07-27', 48000, 2, 2, 'confirmed', 'paid', 'Family vacation with kids'),
    ((SELECT id FROM customers WHERE email = 'william.r@email.com'), 'Catamaran Sunset Cruise', 'activity', '2025-06-28', NULL, 4500, 2, 0, 'confirmed', 'paid', 'Romantic evening');
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
    ((SELECT id FROM bookings WHERE activity_name = 'Constance Le Prince Maurice Stay'), (SELECT id FROM services WHERE name = 'Constance Le Prince Maurice'), 'Constance Le Prince Maurice', 'hotel', 52000),
    ((SELECT id FROM bookings WHERE activity_name = 'Catamaran Ile aux Cerfs Cruise'), (SELECT id FROM services WHERE name = 'Catamaran Ile aux Cerfs'), 'Catamaran Ile aux Cerfs', 'cruise', 3800),
    ((SELECT id FROM bookings WHERE activity_name = 'Chamarel Discovery Tour'), (SELECT id FROM services WHERE name = 'Chamarel Discovery'), 'Chamarel Discovery', 'activity', 2500),
    ((SELECT id FROM bookings WHERE activity_name = 'The Oberoi Beach Resort Stay'), (SELECT id FROM services WHERE name = 'The Oberoi Beach Resort'), 'The Oberoi Beach Resort', 'hotel', 45000),
    ((SELECT id FROM bookings WHERE activity_name = 'Tea Route Experience'), (SELECT id FROM services WHERE name = 'Tea Route Experience'), 'Tea Route Experience', 'tour', 4200),
    ((SELECT id FROM bookings WHERE activity_name = 'Shangri-La''s Le Touessrok Resort Stay'), (SELECT id FROM services WHERE name = 'Shangri-La''s Le Touessrok Resort & Spa'), 'Shangri-La''s Le Touessrok Resort & Spa', 'hotel', 48000),
    ((SELECT id FROM bookings WHERE activity_name = 'Catamaran Sunset Cruise'), (SELECT id FROM services WHERE name = 'Catamaran Sunset Cruise'), 'Catamaran Sunset Cruise', 'activity', 4500);
  END IF;
END $$;