-- Clean up existing navigations
TRUNCATE TABLE public.navigations CASCADE;

-- Root level items
INSERT INTO public.navigations (id, label, link, display_order, is_active) VALUES
('01db9e64-1111-4444-8888-000000000001', 'Home', '/', 1, true),
('01db9e64-1111-4444-8888-000000000002', 'Destinations', '/destinations', 2, true),
('01db9e64-1111-4444-8888-000000000003', 'Hotels', '/hotels', 3, true),
('01db9e64-1111-4444-8888-000000000004', 'Holiday Packages', '/packages', 4, true),
('01db9e64-1111-4444-8888-000000000005', 'Experiences', '/experiences', 5, true),
('01db9e64-1111-4444-8888-000000000006', 'Cruises', '/cruises', 6, true),
('01db9e64-1111-4444-8888-000000000007', 'Travel Guide', '/travel-guide', 7, true),
('01db9e64-1111-4444-8888-000000000008', 'About', '/about', 8, true),
('01db9e64-1111-4444-8888-000000000009', 'Contact', '/contact', 9, true);

-- Destinations sub-menu
INSERT INTO public.navigations (id, label, link, parent_id, display_order, is_active) VALUES
('01db9e64-2222-4444-8888-000000000001', 'Mauritius', '/destinations/mauritius', '01db9e64-1111-4444-8888-000000000002', 1, true),
('01db9e64-2222-4444-8888-000000000002', 'Rodrigues', '/destinations/rodrigues', '01db9e64-1111-4444-8888-000000000002', 2, true),
('01db9e64-2222-4444-8888-000000000003', 'International', '/destinations/international', '01db9e64-1111-4444-8888-000000000002', 3, true);

-- Mauritius sub-menu (Level 3)
INSERT INTO public.navigations (label, link, parent_id, display_order, is_active) VALUES
('North Coast', '/destinations/mauritius/north', '01db9e64-2222-4444-8888-000000000001', 1, true),
('East Coast', '/destinations/mauritius/east', '01db9e64-2222-4444-8888-000000000001', 2, true),
('South Coast', '/destinations/mauritius/south', '01db9e64-2222-4444-8888-000000000001', 3, true),
('West Coast', '/destinations/mauritius/west', '01db9e64-2222-4444-8888-000000000001', 4, true);

-- Hotels sub-menu
INSERT INTO public.navigations (label, link, parent_id, display_order, is_active) VALUES
('All Hotels', '/hotels', '01db9e64-1111-4444-8888-000000000003', 1, true),
('Luxury Resorts', '/hotels/luxury-resorts', '01db9e64-1111-4444-8888-000000000003', 2, true),
('Beach Resorts', '/hotels/beach-resorts', '01db9e64-1111-4444-8888-000000000003', 3, true),
('Adults Only', '/hotels/adults-only', '01db9e64-1111-4444-8888-000000000003', 4, true),
('Family Resorts', '/hotels/family-resorts', '01db9e64-1111-4444-8888-000000000003', 5, true),
('Boutique Hotels', '/hotels/boutique-hotels', '01db9e64-1111-4444-8888-000000000003', 6, true);

-- Holiday Packages sub-menu
INSERT INTO public.navigations (label, link, parent_id, display_order, is_active) VALUES
('All Packages', '/packages', '01db9e64-1111-4444-8888-000000000004', 1, true),
('Weekend Deals', '/packages/weekend', '01db9e64-1111-4444-8888-000000000004', 2, true),
('Full Board Packages', '/packages/full-board', '01db9e64-1111-4444-8888-000000000004', 3, true),
('All Inclusive Packages', '/packages/all-inclusive', '01db9e64-1111-4444-8888-000000000004', 4, true),
('Honeymoon Packages', '/packages/honeymoon', '01db9e64-1111-4444-8888-000000000004', 5, true),
('Family Holiday Packages', '/packages/family', '01db9e64-1111-4444-8888-000000000004', 6, true),
('Seasonal Promotions', '/packages/promotions', '01db9e64-1111-4444-8888-000000000004', 7, true);

-- Experiences sub-menu
INSERT INTO public.navigations (label, link, parent_id, display_order, is_active) VALUES
('All Experiences', '/experiences', '01db9e64-1111-4444-8888-000000000005', 1, true),
('Catamaran Cruises', '/experiences/catamaran', '01db9e64-1111-4444-8888-000000000005', 2, true),
('Island Tours', '/experiences/island-tours', '01db9e64-1111-4444-8888-000000000005', 3, true),
('Adventure Activities', '/experiences/adventure', '01db9e64-1111-4444-8888-000000000005', 4, true),
('Water Sports', '/experiences/water-sports', '01db9e64-1111-4444-8888-000000000005', 5, true),
('Day Packages', '/experiences/day-packages', '01db9e64-1111-4444-8888-000000000005', 6, true),
('Private Tours', '/experiences/private-tours', '01db9e64-1111-4444-8888-000000000005', 7, true);

-- Cruises sub-menu
INSERT INTO public.navigations (label, link, parent_id, display_order, is_active) VALUES
('All Cruises', '/cruises', '01db9e64-1111-4444-8888-000000000006', 1, true),
('Cruise Packages', '/cruises/packages', '01db9e64-1111-4444-8888-000000000006', 2, true),
('Cruise Destinations', '/cruises/destinations', '01db9e64-1111-4444-8888-000000000006', 3, true),
('Cruise Deals', '/cruises/deals', '01db9e64-1111-4444-8888-000000000006', 4, true);

-- Travel Guide sub-menu
INSERT INTO public.navigations (label, link, parent_id, display_order, is_active) VALUES
('Mauritius Travel Guide', '/travel-guide/mauritius', '01db9e64-1111-4444-8888-000000000007', 1, true),
('Rodrigues Guide', '/travel-guide/rodrigues', '01db9e64-1111-4444-8888-000000000007', 2, true),
('Best Time to Visit', '/travel-guide/best-time', '01db9e64-1111-4444-8888-000000000007', 3, true),
('Top Things to Do', '/travel-guide/things-to-do', '01db9e64-1111-4444-8888-000000000007', 4, true);

-- About sub-menu
INSERT INTO public.navigations (label, link, parent_id, display_order, is_active) VALUES
('Our Story', '/about/our-story', '01db9e64-1111-4444-8888-000000000008', 1, true),
('Our Team', '/about/team', '01db9e64-1111-4444-8888-000000000008', 2, true),
('News & Updates', '/news', '01db9e64-1111-4444-8888-000000000008', 3, true);

-- Contact sub-menu
INSERT INTO public.navigations (label, link, parent_id, display_order, is_active) VALUES
('Contact Us', '/contact', '01db9e64-1111-4444-8888-000000000009', 1, true),
('Request a Quote', '/contact/request-quote', '01db9e64-1111-4444-8888-000000000009', 2, true),
('Office Locations', '/contact/offices', '01db9e64-1111-4444-8888-000000000009', 3, true);
