-- Comprehensive seed data for all tables (at least 11 rows each)
-- Targets project: tbyudagfjspedeqtlgjv

-- 1. Categories
INSERT INTO public.categories (name, slug, description, image_url, show_on_home, display_order) VALUES
('Activities', 'activities', 'Exhilarating experiences across Mauritius', '/hero-flight.png', true, 1),
('Tours', 'tours', 'Guided journeys through Mauritian heritage', '/hero-tour.png', true, 2),
('Day Packages', 'day-packages', 'Exclusive one-day escapes', '/hero-hotel.png', true, 3),
('Cruises', 'cruises', 'Luxury sailing in turquoise waters', '/hero-cruise.png', true, 4),
('Rodrigues', 'rodrigues', 'Discover the untouched charm of Rodrigues island', '/hero-rodrigues.png', true, 5),
('Hotels', 'hotels', 'Premium stays at the finest resorts', '/hero-hotel.png', true, 6),
('Flights', 'flights', 'Best deals on domestic and international flights', '/hero-flight.png', true, 7),
('Transfers', 'transfers', 'Comfortable and reliable transportation', '/hero-transfer.png', true, 8),
('Travel Insurance', 'travel-insurance', 'Peace of mind for your journey', '/hero-insurance.png', true, 9),
('Visa Services', 'visa-services', 'Assistance with visa applications', '/hero-visa.png', true, 10),
('Local Deals', 'local-deals', 'Exclusive offers for residents', '/hero-deals.png', true, 11),
('Tailor Made', 'tailor-made', 'Customized travel experiences', '/hero-tailor.png', true, 12),
('Corporate Travel', 'corporate', 'Business travel solutions', '/hero-business.png', true, 13)
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name;

-- 2. Services
INSERT INTO public.services (name, description, location, region, base_price, rating, image_url, service_type, amenities) VALUES
('LUX* Grand Baie', 'Luxury resort in Grand Baie', 'Grand Baie', 'North', 35000, 4.8, '/hotels/lux.jpg', 'hotel', ARRAY['Wifi', 'Pool', 'Spa']),
('Constance Prince Maurice', 'Exclusive luxury resort', 'Poste de Flacq', 'East', 52000, 4.9, '/hotels/constance.jpg', 'hotel', ARRAY['Wifi', 'Golf', 'Fine Dining']),
('The Oberoi', 'Beachfront luxury', 'Turtle Bay', 'North-West', 45000, 5.0, '/hotels/oberoi.jpg', 'hotel', ARRAY['Wifi', 'Pool', 'Beach']),
('Seven Seas Explorer', 'Indian Ocean Cruise', 'Port Louis', 'Indian Ocean', 120000, 4.9, '/cruises/sevenseas.jpg', 'cruise', ARRAY['Luxury', 'All-inclusive']),
('Rodrigues Adventure', 'Untouched beauty tour', 'Port Mathurin', 'Rodrigues', 18500, 4.9, '/tours/rodrigues.jpg', 'tour', ARRAY['Nature', 'Local Guide']),
('Grand North Tour', 'Historic north tour', 'Port Louis', 'North', 8500, 4.6, '/tours/north.jpg', 'tour', ARRAY['Guide', 'Transport']),
('Catamaran Sunset', 'Dinner on the water', 'Trou aux Biches', 'North', 4500, 4.8, '/activities/catamaran.jpg', 'activity', ARRAY['Dinner', 'Drinks']),
('Underwater Walk', 'Marine life walking', 'Grand Baie', 'North', 3200, 4.7, '/activities/underwater.jpg', 'activity', ARRAY['Gear', 'Photos']),
('Four Seasons', 'Southern luxury', 'Bel Ombre', 'South', 60000, 4.9, '/hotels/fourseasons.jpg', 'hotel', ARRAY['Beach', 'Golf']),
('Tea Route', 'Culinary journey', 'Bois Cheri', 'South', 4200, 4.7, '/tours/tea.jpg', 'tour', ARRAY['Tasting', 'Lunch']),
('Chamarel Wonders', 'Seven Coloured Earth', 'Chamarel', 'South-West', 2500, 4.8, '/activities/chamarel.jpg', 'activity', ARRAY['Sightseeing']),
('Shangri-La Touessrok', 'Lagoon luxury', 'Trou d''Eau Douce', 'East', 48000, 4.9, '/hotels/shangrila.jpg', 'hotel', ARRAY['Private Island', 'Spa']),
('Sofitel Trois Iles', 'Panoramic ocean views', 'Black River', 'West', 42000, 4.7, '/hotels/sofitel.jpg', 'hotel', ARRAY['Pool', 'Tennis'])
ON CONFLICT (id) DO NOTHING;

-- 3. Service Categories (links)
INSERT INTO public.service_categories (service_id, category_id)
SELECT s.id, c.id FROM public.services s, public.categories c
WHERE (s.service_type = 'hotel' AND c.slug = 'hotels')
OR (s.service_type = 'cruise' AND c.slug = 'cruises')
OR (s.service_type = 'tour' AND c.slug = 'tours')
OR (s.service_type = 'activity' AND c.slug = 'activities')
ON CONFLICT DO NOTHING;

-- 4. Admins
INSERT INTO public.admins (username, email, password, role, name) VALUES
('sysadmin', 'admin@travellounge.mu', 'argon2id$v=19$m=65536,t=3,p=4$dummyhash', 'super_admin', 'System Admin'),
('jdoe', 'john@travellounge.mu', 'hash123', 'admin', 'John Doe'),
('jsmith', 'jane@travellounge.mu', 'hash123', 'manager', 'Jane Smith'),
('rwhite', 'robert@travellounge.mu', 'hash123', 'operator', 'Robert White'),
('ewilliams', 'emily@travellounge.mu', 'hash123', 'support', 'Emily Williams'),
('mbrown', 'michael@travellounge.mu', 'hash123', 'staff', 'Michael Brown'),
('sdavis', 'sarah@travellounge.mu', 'hash123', 'editor', 'Sarah Davis'),
('dmiller', 'david@travellounge.mu', 'hash123', 'sales', 'David Miller'),
('lwilson', 'laura@travellounge.mu', 'hash123', 'marketing', 'Laura Wilson'),
('ktaylor', 'kevin@travellounge.mu', 'hash123', 'tech', 'Kevin Taylor'),
('athomas', 'anna@travellounge.mu', 'hash123', 'finance', 'Anna Thomas'),
('canderson', 'chris@travellounge.mu', 'hash123', 'hr', 'Chris Anderson'),
('ljackson', 'lisa@travellounge.mu', 'hash123', 'operations', 'Lisa Jackson')
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
SELECT id, 'hotel', 'Luxury Stay ' || first_name, NOW(), 5000 * length(first_name), 'Confirmed', 'Paid' FROM public.customers
LIMIT 13
ON CONFLICT (id) DO NOTHING;

-- 8. Booking Items
INSERT INTO public.booking_items (booking_id, service_name, service_category, amount)
SELECT id, 'Standard Service ' || id, 'General', amount FROM public.bookings
LIMIT 13
ON CONFLICT (id) DO NOTHING;

-- 9. FAQs
INSERT INTO public.faqs (question, answer, category, order_index) VALUES
('How to book?', 'Detailed booking guide...', 'General', 1),
('Refund policy?', 'Info on refunds...', 'Policies', 2),
('Visa help?', 'We assist with visas...', 'Visa', 3),
('Payment options?', 'Credit cards, bank transfer...', 'Payment', 4),
('Hotel check-in?', 'Usually 2 PM...', 'Hotels', 5),
('Baggage weight?', 'Depends on airline...', 'Flights', 6),
('Travel insurance?', 'Highly recommended...', 'Insurance', 7),
('Group rates?', 'Contact sales...', 'Groups', 8),
('Pet policy?', 'Check with airline...', 'Policies', 9),
('Special meals?', 'Request 48h before...', 'Flights', 10),
('Covid rules?', 'Latest updates here...', 'Travel Advisories', 11),
('Office hours?', '8:30 to 17:00...', 'General', 12),
('Careers?', 'Visit our team page...', 'Company', 13);

-- 10. Editorial Posts
INSERT INTO public.editorial_posts (title, slug, excerpt, content, status) VALUES
('Beaches of Gem', 'beach-gems', 'Top beaches...', '<p>Content</p>', 'published'),
('Culture Guide', 'culture-guide', 'Rich heritage...', '<p>Content</p>', 'published'),
('Foodie Tour', 'foodie-tour', 'Street food...', '<p>Content</p>', 'published'),
('Hiking Trails', 'hiking-trails', 'Great peaks...', '<p>Content</p>', 'published'),
('Water Sports', 'water-sports', 'Surf and sail...', '<p>Content</p>', 'published'),
('History Walk', 'history-walk', 'Port Louis history...', '<p>Content</p>', 'published'),
('Luxury Living', 'luxury-living', 'Resort life...', '<p>Content</p>', 'published'),
('Budget Travel', 'budget-travel', 'Save more...', '<p>Content</p>', 'published'),
('Nature Escape', 'nature-escape', 'Gorges tour...', '<p>Content</p>', 'published'),
('Wedding Spots', 'wedding-spots', 'Romantic venues...', '<p>Content</p>', 'published'),
('Business Class', 'business-travel', 'Work and fly...', '<p>Content</p>', 'published'),
('Rodrigues Life', 'rodrigues-life', 'Island vibe...', '<p>Content</p>', 'published'),
('Travel Safety', 'travel-safety', 'Tips for safety...', '<p>Content</p>', 'published')
ON CONFLICT (slug) DO NOTHING;

-- 11. Popular Destinations
INSERT INTO public.popular_destinations (destination, country, return_price, is_featured) VALUES
('Paris', 'France', 45000, true),
('Dubai', 'UAE', 55000, true),
('London', 'UK', 48000, true),
('New York', 'USA', 75000, true),
('Bangkok', 'Thailand', 38000, true),
('Singapore', 'Singapore', 32000, true),
('Tokyo', 'Japan', 85000, true),
('Sydney', 'Australia', 95000, true),
('Cape Town', 'South Africa', 65000, true),
('Seychelles', 'Seychelles', 120000, true),
('Maldives', 'Maldives', 150000, true),
('Bali', 'Indonesia', 42000, true),
('Phuket', 'Thailand', 35000, true);

-- 12. Content Blocks
INSERT INTO public.content_blocks (page_slug, section_key, content) VALUES
('home', 'hero', '{"title": "Travel Excellence"}'),
('home', 'about', '{"text": "Since 2014..."}'),
('home', 'footer', '{"links": []}'),
('about', 'vision', '{"text": "Our vision..."}'),
('about', 'mission', '{"text": "Our mission..."}'),
('contact', 'info', '{"email": "info@tl.mu"}'),
('news', 'header', '{"title": "Latest News"}'),
('faq', 'header', '{"title": "FAQs"}'),
('packages', 'header', '{"title": "Packages"}'),
('hotels', 'header', '{"title": "Hotels"}'),
('flights', 'header', '{"title": "Flights"}'),
('insurance', 'header', '{"title": "Insurance"}'),
('visa', 'header', '{"title": "Visa"}');

-- 13. Navigations
INSERT INTO public.navigations (label, link, display_order) VALUES
('Home', '/', 1), ('Hotels', '/hotels', 2), ('Flights', '/flights', 3),
('Packages', '/packages', 4), ('Tours', '/tours', 5), ('Cruises', '/cruises', 6),
('Transfers', '/transfers', 7), ('About', '/about', 8), ('Contact', '/contact', 9),
('News', '/news', 10), ('FAQ', '/faq', 11), ('Destinations', '/destinations', 12),
('Visa', '/visa', 13);

-- 14. Inquiries
INSERT INTO public.inquiries (name, email, subject, message) VALUES
('John', 'j@test.com', 'Hotel link', 'Need info on Lux'),
('Jane', 'jane@test.com', 'Prices', 'What is base price?'),
('Bob', 'bob@test.com', 'Visa', 'Need help with UAE'),
('Alice', 'alice@test.com', 'Group', '20 pax quote'),
('Tom', 'tom@test.com', 'Career', 'Hiring info'),
('Sue', 'sue@test.com', 'Partner', 'Logo collab'),
('Rob', 'rob@test.com', 'Booking', 'Cancel q'),
('Fin', 'fin@test.com', 'Payment', 'Amex ok?'),
('Gia', 'gia@test.com', 'News', 'Subscribe help'),
('Leo', 'leo@test.com', 'Tour', 'North tour timing'),
('Mia', 'mia@test.com', 'Cruise', 'Itinerary info'),
('Zoe', 'zoe@test.com', 'Insurance', 'Medical cover'),
('Dan', 'dan@test.com', 'Hotel', 'Bed types')
ON CONFLICT (id) DO NOTHING;

-- 15. Subscribers
INSERT INTO public.subscribers (email, status) VALUES
('s1@test.com', 'active'), ('s2@test.com', 'active'), ('s3@test.com', 'active'),
('s4@test.com', 'active'), ('s5@test.com', 'active'), ('s6@test.com', 'active'),
('s7@test.com', 'active'), ('s8@test.com', 'active'), ('s9@test.com', 'active'),
('s10@test.com', 'active'), ('s11@test.com', 'active'), ('s12@test.com', 'active'),
('s13@test.com', 'active')
ON CONFLICT (email) DO NOTHING;

-- 16. Products (aligned with schema)
INSERT INTO public.products (name, category, price, stock, status, description) VALUES
('Passport Cover', 'Accessories', 850, 50, 'In Stock', 'Premium RFID cover'),
('Neck Pillow', 'Comfort', 1250, 30, 'In Stock', 'Memory foam pillow'),
('Power Adapter', 'Electronics', 2450, 25, 'In Stock', 'Universal adapter'),
('Toiletry Kit', 'Essentials', 1850, 40, 'In Stock', 'Travel bag'),
('Travel Backpack', 'Luggage', 3500, 20, 'In Stock', 'Anti-theft backpack'),
('Phone Charger', 'Electronics', 1950, 35, 'In Stock', 'Portable charger'),
('TSA Locks', 'Safety', 1200, 60, 'In Stock', 'Luggage security'),
('Travel Towel', 'Essentials', 950, 45, 'In Stock', 'Quick dry towel'),
('Umbrella', 'Essentials', 1450, 25, 'In Stock', 'Compact windproof'),
('Packing Cubes', 'Luggage', 2200, 30, 'In Stock', 'Set of 6 cubes'),
('First Aid Kit', 'Health', 3200, 20, 'In Stock', 'Travel first aid'),
('Organizer', 'Documents', 1650, 35, 'In Stock', 'RFID organizer'),
('Repellent', 'Health', 750, 50, 'In Stock', 'Wristbands')
ON CONFLICT (id) DO NOTHING;

-- 17. Orders
INSERT INTO public.orders (customer_id, customer_name, amount, status, payment_method)
SELECT id, name, 2000, 'Pending', 'Credit Card' FROM public.profiles LIMIT 13
ON CONFLICT (id) DO NOTHING;

-- 18. Order Items
INSERT INTO public.order_items (order_id, service_name, quantity, unit_price)
SELECT id, 'Item for order ' || id, 1, amount FROM public.orders LIMIT 13
ON CONFLICT (id) DO NOTHING;

-- 19. Invoices
INSERT INTO public.invoices (customer_id, customer_name, amount, status, service, reference)
SELECT id, name, 5000, 'Pending', 'Travel Services', 'INV-' || encode(gen_random_bytes(4), 'hex') FROM public.profiles LIMIT 13
ON CONFLICT (id) DO NOTHING;

-- 20. Invoice Items
INSERT INTO public.invoice_items (invoice_id, item_description, quantity, unit_price)
SELECT id, 'Consultancy Fee', 1, amount FROM public.invoices LIMIT 13
ON CONFLICT (id) DO NOTHING;

-- 21. Reviews
INSERT INTO public.reviews (service_id, customer_name, rating, comment, status)
SELECT id, 'User ' || left(id::text, 4), 5, 'Great experience!', 'approved' FROM public.services LIMIT 13
ON CONFLICT (id) DO NOTHING;

-- 22. Site Settings
INSERT INTO public.site_settings (key, value, category, description) VALUES
('social_fb', '"https://facebook.com/tl"', 'social', 'Facebook URL'),
('social_ig', '"https://instagram.com/tl"', 'social', 'Instagram URL'),
('contact_email', '"info@tl.mu"', 'contact', 'Contact Email'),
('contact_phone', '"+230 123 4567"', 'contact', 'Contact Phone'),
('site_logo', '"/logo.png"', 'general', 'Site Logo URL'),
('site_favicon', '"/favicon.ico"', 'general', 'Favicon URL'),
('maintenance_mode', 'false', 'security', 'Global maintenance toggle'),
('api_timeout', '5000', 'system', 'Global API timeout'),
('default_currency', '"MUR"', 'general', 'System currency'),
('date_format', '"DD/MM/YYYY"', 'general', 'Display date format'),
('support_whatsapp', '"23059407701"', 'contact', 'Primary WhatsApp')
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;

-- 23. Popups
INSERT INTO public.popup_ads (title, content, is_active) VALUES
('Summer Sale', 'Get 20% off all hotels', true),
('Early Bird', 'Book for 2026 now', true),
('Newsletter', 'Sign up for travel tips', true),
('Flash Deal', '30% off Cruises today', true),
('Visa Help', 'Seamless UAE visas', true),
('Rodrigues', 'Special island stay', true),
('Insurance', 'Free cover for groups', true),
('App Launch', 'Download our admin app', true),
('Job Alert', 'We are hiring guides', true),
('Review Us', 'Get a gift for review', true),
('Corporate', 'Business elite plans', true),
('Waitlist', 'Join our VIP club', true),
('Social', 'Follow us for prizes', true);

-- 24. Hero Slides
INSERT INTO public.hero_slides (title, subtitle, image_url) VALUES
('World Expertise', 'Since 2014', '/h1.jpg'),
('Luxury Stays', 'Handpicked hotels', '/h2.jpg'),
('Cruise Life', 'Sail the islands', '/h3.jpg'),
('Tours Plus', 'Guided heritage', '/h4.jpg'),
('Rodrigues Gem', 'Untouched island', '/h5.jpg'),
('Fast Flights', 'Best global rates', '/h6.jpg'),
('Visa Done', 'UAE and more', '/h7.jpg'),
('Corporate Pro', 'Business efficiency', '/h8.jpg'),
('Special Deals', 'Limited offers', '/h9.jpg'),
('Family Fun', 'Resort holidays', '/h10.jpg'),
('Adventure Awaits', 'Explore the wild', '/h11.jpg')
ON CONFLICT (id) DO NOTHING;

-- 25. Email Templates
INSERT INTO public.email_templates (name, subject, body) VALUES
('Welcome', 'Welcome to TL', 'Hello {{name}}...'),
('Booking Confirmation', 'Your Booking is Set', 'Confirming {{id}}...'),
('Order Received', 'New Order #{{id}}', 'Processing...'),
('Password Reset', 'Reset Link', 'Click here...'),
('Newsletter Issue', 'Travel Trends', 'Weekly update...'),
('Inquiry Reply', 'Re: {{subject}}', 'Thank you...'),
('Payment Success', 'Payment Received', 'Receipt for {{id}}...'),
('Cruise Alert', 'Sail Away!', 'New cruise deals...'),
('Hotel Peak', 'High Season', 'Book now...'),
('Review Request', 'How was it?', 'Rate your trip...'),
('Staff Alert', 'New Support Ticket', 'Action needed...')
ON CONFLICT (id) DO NOTHING;

-- 26. Hotel Rooms
INSERT INTO public.hotel_rooms (service_id, name, type, price_per_night)
SELECT id, 'Superior Room', 'Standard', base_price FROM public.services WHERE service_type = 'hotel' LIMIT 13
ON CONFLICT (id) DO NOTHING;

-- 27. Room Types
INSERT INTO public.room_types (service_id, name, weekday_price, weekend_price)
SELECT id, 'Deluxe Suite', base_price, base_price * 1.2 FROM public.services WHERE service_type = 'hotel' LIMIT 13
ON CONFLICT (id) DO NOTHING;

-- 28. Product Categories (linking products to categories - specific to requirements)
INSERT INTO public.product_categories (product_id, category_id)
SELECT s.id, c.id FROM public.services s, public.categories c
WHERE c.slug = 'local-deals' -- Arbitrary link to ensure rows exist
LIMIT 13
ON CONFLICT (id) DO NOTHING;
