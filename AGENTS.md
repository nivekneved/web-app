# AGENTS.md

## 2026-03-18 - Seasonal Deals & Promotional System
### Changes Made:
- Added `is_seasonal_deal` and `deal_note` fields to the `services` table in Supabase.
- Updated Admin App `CreateService.jsx` with a new "Promotional Strategy" section for managing deal flags and badge notes.
- Refactored Web App `DealsCarousel.tsx` to fetch products dynamically based on the `is_seasonal_deal` flag.
- Standardized promotional badge styling across the homepage deals list.

### Verified:
- Admin UI correctly toggles and saves promotional states.
- Web UI dynamically reflects database changes in the "Seasonal Deals" carousel.
- Linting clean for both projects.

## 2026-03-17 - Navigation & Search Refinements
### Changes Made:
- Implemented "hide on scroll" logic for the red top bar in `Navbar.tsx` using Framer Motion.
- Added a prominent "Search as you type" input box above the service listings in `ServiceListing.tsx`.
- Refined Mauritius Hotels filtering to explicitly include Mauritius regions and exclude Rodrigues in `app/hotels/mauritius/page.tsx`.
- Standardized hero banner heights to `h-[250px] md:h-[350px]` across the entire application.
- Compacted the Tailormade page by reducing hero height, section padding, and grid gaps.
- Converted Hotel, Activity, and Tour detail pages to Server Components with `force-dynamic` to ensure real-time pricing.
- Added `showRoomSelection` prop to `BookingWizard.tsx` to conditionally hide room selection for Tours and Activities.
- Fixed minor lint errors and unused variables in the FAQ page.

### Verified:
- Navbar red bar hides correctly on scroll and reappears at the top.
- "Search as you type" is functional and highly visible on service pages.
- Mauritius Hotels page accurately filters out Rodrigues hotels.
- All banners are now consistent.
- Tailormade page is more professional and compact.
- Data fetching is now dynamic and not from cache.
- Booking form logic correctly handles room selection visibility.
