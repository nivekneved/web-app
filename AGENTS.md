# AGENTS.md

## 2026-03-17 - UI Standardization & Dynamic Pricing
### Changes Made:
- Standardized hero banner heights to `h-[250px] md:h-[350px]` across the entire application.
- Compacted the Tailormade page by reducing hero height, section padding, and grid gaps.
- Converted Hotel, Activity, and Tour detail pages to Server Components with `force-dynamic` to ensure real-time pricing.
- Added `showRoomSelection` prop to `BookingWizard.tsx` to conditionally hide room selection for Tours and Activities.
- Fixed minor lint errors and unused variables in the FAQ page.

### Verified:
- All banners are now consistent.
- Tailormade page is more professional and compact.
- Data fetching is now dynamic and not from cache.
- Booking form logic correctly handles room selection visibility.
