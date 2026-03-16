-- Script to reset all tables by truncating them
-- This will remove all data from the tables while preserving the structure

-- Disable triggers temporarily to avoid foreign key constraint issues
SET session_replication_role = replica;

-- Truncate all tables individually to handle CASCADE properly
TRUNCATE TABLE public.booking_items RESTART IDENTITY CASCADE;
TRUNCATE TABLE public.bookings RESTART IDENTITY CASCADE;
TRUNCATE TABLE public.customers RESTART IDENTITY CASCADE;
TRUNCATE TABLE public.reviews RESTART IDENTITY CASCADE;
TRUNCATE TABLE public.services RESTART IDENTITY CASCADE;
TRUNCATE TABLE public.faqs RESTART IDENTITY CASCADE;
TRUNCATE TABLE public.content_blocks RESTART IDENTITY CASCADE;
TRUNCATE TABLE public.inquiries RESTART IDENTITY CASCADE;
TRUNCATE TABLE public.subscribers RESTART IDENTITY CASCADE;
TRUNCATE TABLE public.editorial_posts RESTART IDENTITY CASCADE;
TRUNCATE TABLE public.popular_destinations RESTART IDENTITY CASCADE;
TRUNCATE TABLE public.categories RESTART IDENTITY CASCADE;
TRUNCATE TABLE public.service_categories RESTART IDENTITY CASCADE;
TRUNCATE TABLE public.hotel_rooms RESTART IDENTITY CASCADE;
TRUNCATE TABLE public.navigations RESTART IDENTITY CASCADE;
TRUNCATE TABLE public.admins RESTART IDENTITY CASCADE;
TRUNCATE TABLE public.products RESTART IDENTITY CASCADE;
TRUNCATE TABLE public.product_categories RESTART IDENTITY CASCADE;
TRUNCATE TABLE public.product_category_assignments RESTART IDENTITY CASCADE;

-- Re-enable triggers
SET session_replication_role = DEFAULT;