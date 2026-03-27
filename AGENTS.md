# AGENTS.md

## 2026-03-27 - Form Refactoring & Layout Compaction

### Web App Changes
- **UI Simplification**: Removed unnecessary fields ("Return Date", "Preferred Budget", "Preferred Accommodation") from the "Plan My Trip" form to streamline user submissions.
- **Hero Image Resolution**: Updated the hero banner image source from a missing placeholder to a high-quality thematic asset (`/assets/placeholders/hero-adventure.png`) for visual parity.
- **Layout Compaction**: Reduced excessive top/bottom padding, margins, and gaps across the "Plan My Trip" page to create a more compact and elegant user interface.
- **Tailormade Parity**: Applied identical UI simplification (field removal) and layout compaction to the "Tailormade" page to ensure consistent booking experiences.
- **About Page Fix**: Implemented `dangerouslySetInnerHTML` in the "Who We Are" section title to properly render inline HTML span styles (e.g., `<span class="text-red-600">`) instead of escaping them as text.
- **Team Page Banner**: Restored the missing hero image on the 'Meet the Team' page by pointing the source to the standardized `/assets/heroes/hero-about.png` using the dynamic image resolver.
- **Branding Update**: Programmatically generated and uploaded a flawless transparent background variant of the logo (`public/assets/logo-red-bird.png`) featuring a `text-red-600` colored bird above the text.
- **Footer UI**: Integrated the newly generated red bird logo into the `Footer` component, removing the `brightness-0 invert` filter to preserve the colored bird while displaying the white text properly against the dark theme.
- **Routing & Navigation**: Fixed a routing bug where the `Hotels -> Mauritius` menu item incorrectly linked to the generic destination page (`/destinations/mauritius`). Updated the Supabase `navigations` table to route traffic specifically to `/hotels/mauritius`.
- **UI Asset Fix**: Updated the broken hero image path in `/hotels/mauritius/page.tsx` to standard `/assets/heroes/hero-hotels.png` to guarantee visual parity.
## 2026-03-25 - Thematic Category Image Integration

### Web App Changes
- **Visual Restoration**: Replaced generic and mismatched category images with 8k custom-generated thematic visuals for all 6 core categories.
- **Path Standardization**: Moved all category assets to `/assets/categories/` and updated the `categories` table to reflect these paths.
- **Logic Correction**: Replaced the incorrect flight icon for "Day Packages" with an appropriate nautical adventure theme.

### Mobile App Changes
- **Platform Parity**: Synchronized the new thematic category assets to the mobile bundle, ensuring a consistent premium look.

## 2026-03-25 - Thematic Hero Banner Integration

### Web App Changes
- **Thematic Generation**: Generated 8k professional thematic banners for Home (Flights, Cruises, Hotels), About, Flights, Hotels, and Cruises.
- **Asset Storage**: Stored images in `public/assets/heroes/`.
- **Database Logic**: Updated `hero_slides` table to point to new thematic local assets.
- **Component Sync**: Updated hardcoded fallbacks in `AboutPage`, `FlightsPage`, `HotelsPage`, and `CruisesPage` to ensure conceptual alignment.

### Mobile App Changes
- **Visual Parity**: Synchronized new thematic banners to `assets/placeholders/` to ensure consistent premium experience.
- **Mapping Sync**: Leveraging existing `resolveImageUrl` logic to map database-driven homepage banners to new high-definition thematic assets.

## 2026-03-25 - Image 404 Resolution (Hero Slider & Logo)

### Web App Changes

- **Image Resolution Fix**: Fixed `resolveImageUrl` in `lib/image.ts` to correctly handle local `/assets/` paths and prepend the `bucket/` prefix for Supabase storage objects (Logo).
- **Maintenance**: Resolved ESLint warning for unused `SUPABASE_URL` constant.

### Mobile App Changes

- **Asset Synchronization**: Synced photographic hero slider placeholders from the Web App to the Mobile App bundle.
- **Dynamic Mapping**: Updated `resolveImageUrl` in `src/utils/imageUtils.ts` to map hero slider database paths to the new local photographic assets.

## 2026-03-25 - Build Fix & Type Unification

### Web App Changes
- **Type Unification**: Created `types/settings.ts` to centralize `SiteSettings` and `GeneralConfig` definitions across all components (`Navbar`, `Footer`, `HomePage`).
- **Build Fix**: Resolved a critical Vercel build error caused by missing `facebookUrl` and `instagramUrl` properties in the `Navbar`'s local settings interface.
- **Maintenance**: Verified 100% build success locally using `npm run build`.

## 2026-03-25 - Branding Integration & Asset Resolution

### Admin App Changes
- **Local Asset Integration**: Synchronized `src/assets` folder with standard icons and placeholders from the Web App.
- **Dynamic Asset Resolver**: Implemented a centralized `resolveImageUrl` in `src/utils/image.js` using `import.meta.glob` to support bundled local assets via `/assets/` prefix.
- **Enhanced Branding**: Expanded `Settings.jsx` and `site_settings` schema to include site logo, dimensions, favicons, and social sharing metadata.
- **CMS Expansion**: Upgraded `CMS.jsx` with full support for [NEW] Hero sections across all dynamic pages (Destinations, News, Flights, Activities).
- **Service Catalog**: Integrated multi-image gallery support and narrative metadata (highlights, includes, policies) in `CreateService.jsx`.
- **UI Maintenance**: Verified 100% asset resolution across `Categories.jsx`, `Services.jsx`, `HeroSlider.jsx`, and `PopupAds.jsx` to eliminate 404 errors.

### Web App Changes
- **Asset Standardization**: Synchronized `public/assets` with the Admin App to ensure icon parity.
- **Branding Logic**: Verified that dynamic branding from `site_settings` (logo, dimensions) is correctly reflected in the frontend.

### Verification Expected
- All local icons (e.g., categories, team, partners) render correctly in both Web and Admin interfaces.
- Site branding updates in Admin are reflected instantly on the website.
- No 404 errors in the browser console for bundled assets.

## 2026-03-24 - Zero-Regression Database Schema Parity

### Admin App Changes
- **Database Refactor Integration**: Replaced legacy `bookings` table queries (`activity_name`, `activity_type`, `total_amount`) with their new UI-driven counterparts (`service_name`, `service_type`, `total_price`) across all files (`Bookings.jsx`, `CreateBooking.jsx`, `Dashboard.jsx`, `ViewCustomer.jsx`, `Reports.jsx`).
- **Migration Execution**: Executed Supabase SQL migration (e.g. `start_date` -> `check_in_date`) to force the backend database perfectly into alignment with the frontend naming structures.

### Web App Changes
- **Booking Checkout Sync**: Overhauled the structural payload in `lib/bookingService.ts` to transmit the new database keys, and seamlessly recreated the `create_booking_v1` secure RPC without regression.

### Mobile App Changes
- **Bookings Hook Fix**: Finalized flattening of the nested `booking_items` interface in `useCustomerBookings.ts` to surface `service_name`, `service_type`, and `total_price` independently of `uid` crashes.
- **UI Restoration**: Safe refactor of `bookings.tsx` to present user history pulling directly from the newly updated bookings view.

## 2026-03-24 - Dynamic Footer Visibility & Asset Standardization

### Web App Changes
- **Asset Migration**: Moved all images to unified `public/assets/` structure (activities, categories, partners, team, placeholders).
- **Dynamic Experience**: Refactored homepage "Experience" section to use dynamic image from Supabase `site_settings`.
- **Flight IBE Integration**: Successfully integrated GOL IBE D4 on the `/flights` page.
- **New Tab Results**: Configured search results to open in a new tab via `target=_blank`.

### Mobile App Changes
- **Image Resolution Engine**: Centralized image handling in `src/utils/imageUtils.ts` with robust fallback logic. Now correctly resolves `bucket/` paths and local assets.
- **Hero Dynamic Fix**: Updated `Hero.tsx` to use the new resolution engine for promotional slides.

### Admin App Changes
- **Independent Toggles**: Separated "Web Footer Visibility" and "Mobile Footer Visibility" in Global Settings.
- **Asset Management**: Added dynamic configuration field for "Experience Section Image".

## 2026-03-24 - GOL IBE Finalization, Image Fixes & Mobile Build

### Web App Changes
- **Flight IBE Integration**: Successfully integrated GOL IBE D4 on the `/flights` page.
- **New Tab Results**: Configured search results to open in a new tab via `target=_blank` to bypass restrictive top-level navigation blocks (Hardened Iframe).
- **Dynamic Height**: Implemented a `postMessage` listener for automatic iframe stretching to fit the form content.
- **Environment Parity**: Updated to `travellounge.golibe.com` subdomain for production-ready integration.

### Mobile App Changes
- **Image Resolution Engine Fix**: Resolved critical 404 errors on homepage service cards by correcting the Supabase storage path resolution in `src/utils/imageUtils.ts` (added `bucket/` segment).
- **Version 1.0.1 (APK Build)**: Incremented to `versionCode: 3` and version `1.0.1`. Successfully authenticated as `travellounge` and triggered the queued cloud build for the Android APK.
- **E2E Strategy**: Defined 5 core End-to-End user scenarios for systematic UI verification.

### Verification Expected (2026-03-24)
- `/flights` page on web-app should render the flight search form correctly.
- Service card images on mobile homepage load without 404 errors.
- EAS Build v1.0.1 dashboard shows a successful or running build status.
- **Footer Visibility**: Toggling "Web Footer Visibility" and "Mobile Footer Visibility" independently in Admin Settings hides/shows the footer on the respective platform.
