-- ==========================================
-- SEED.SQL
-- Consolidated Seed Data
-- Last Updated: 2026-03-18
-- ==========================================

-- [SEED DATA START]

-- Categories
INSERT INTO public.categories (name, slug, icon, image_url, display_order, is_active, description) VALUES
('Hotels', 'hotels', 'Hotel', '/categories/hotels.jpg', 1, true, 'Luxury resorts and boutique hotels across the islands.'),
('Cruises', 'cruises', 'Ship', '/categories/cruises.jpg', 2, true, 'Ocean voyages and coastal catamaran excursions.'),
('Activities', 'activities', 'Activity', '/categories/activities_final.png', 3, true, 'Land and sea adventures for all ages.'),
('Rodrigues', 'rodrigues-hotels', 'MapPin', '/categories/rodrigues_final.png', 4, true, 'Explore the untouched beauty of Rodrigues island.');

-- Site Settings (Example)
INSERT INTO public.site_settings (key, value, category, description) VALUES
('contact_info', '{"email": "info@travellounge.mu", "phone": "+230 212 4070"}', 'contact', 'Global contact information'),
('social_links', '{"facebook": "facebook.com/travellounge", "instagram": "instagram.com/travellounge"}', 'social', 'Social media integration links');

-- FAQs
INSERT INTO public.faqs (question, answer, category, order_index, is_published) VALUES
('How do I make a booking?', 'Browse our services, select your preferred option, fill in the booking form with your details, and proceed to payment.', 'Booking', 1, true),
('Can I modify my booking after confirmation?', 'Yes, you can modify your booking by contacting our support team at least 48 hours before your travel date.', 'Booking', 2, true),
('What is your cancellation policy?', 'Cancellations made 7+ days before travel: full refund. Policies vary by provider.', 'Booking', 3, true);

-- Services & Room Types
-- [Note: Using simplified sample data for seed. Comprehensive data is available in separate catalog files if needed.]

INSERT INTO public.services (name, description, location, region, base_price, service_type, image_url, featured, is_seasonal_deal, deal_note) VALUES
('LUX* Grand Baie', 'Luxury resort with stunning views of Grand Baie lagoon', 'Grand Baie', 'Mauritius', 35000, 'hotel', '/hotels/lux-grandbaie.jpg', true, true, 'Summer Special'),
('Constance Le Prince Maurice', 'Exclusive 5-star resort nestled on a private peninsula', 'Poste de Flacq', 'Mauritius', 52000, 'hotel', '/hotels/constance-prince.jpg', true, false, 'Limited Time');

-- [SEED DATA END]