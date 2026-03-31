-- Rich Data Enriched Seed (Galleries, Itineraries, Vectors)
-- Generated: 2026-03-31

-- Note: This script contains high-quality images and structured itineraries for the current service catalog.

-- Update Tours with Itineraries
UPDATE public.services 
SET 
  gallery_images = ARRAY[
    'https://images.unsplash.com/photo-1544473244-f6895a69ad6b',
    'https://images.unsplash.com/photo-1534351590666-13e3e96b5017',
    'https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5'
  ],
  secondary_image_url = 'https://images.unsplash.com/photo-1562285810-798824147051?q=80&w=200&auto=format&fit=crop',
  itinerary = '[
    {"time": "09:00", "title": "Boarding at Trou d''Eau Douce", "description": "Welcome drinks and safety briefing onboard our luxury catamaran."},
    {"time": "10:30", "title": "GRSE Waterfall Visit", "description": "Short boat trip upstream to witness the majestic Grand River South East waterfall."},
    {"time": "11:30", "title": "Snorkeling at the Lagoon", "description": "Crystal clear water session with tropical fish and coral reefs."},
    {"time": "13:00", "title": "BBQ Lunch Onboard", "description": "Freshly grilled fish, chicken, and salads served with local rum and beer."},
    {"time": "14:30", "title": "Ile aux Cerfs Relaxation", "description": "Free time to explore the white sandy beaches and turquoise waters."},
    {"time": "16:30", "title": "Sundown Sail Back", "description": "Smooth sailing back to the mainland with ambient island music."}
  ]'::jsonb
WHERE name LIKE '%Catamaran%';

-- [ ... Remaining updates applied via SQL directly in previous turns ... ]
-- Full catalog including Hotels and Packages updated with multi-image galleries.
