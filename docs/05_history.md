# 05 History & Agent Progress

## 2026-04-02 - Ecosystem Auth Removal & Admin Decommissioning
- **Admin App Deletion**: Permanently removed the entire `admin-app` directory per client request. (A-01)
- **Auth Guard Neutralization**: Deleted `middleware.ts` to disable all route protection and authentication redirects. (W-01)
- **Guest-Only Session Injection**: Refactored `AuthContext.tsx` to provide a persistent, mocked guest user, ensuring logic parity without login. (W-02)
- **Session Cleanup Automation**: Implemented `useEffect` in `AuthContext` to scan and clear legacy Supabase `localStorage` and `sessionStorage` on startup. (W-03)
- **Supabase Client Hardening**: Disabled `persistSession` and `autoRefreshToken` in `lib/supabase.ts` and `lib/supabaseServer.ts` for a session-free environment. (W-04)
- **UI De-authentication**: Removed the "Sign Out" button from the Dashboard and deleted the `/login` route. (W-05)

---

- **Admin Auth Bug Fix**: Fixed a critical bug in `AuthContext.jsx` where the `isAdmin` check was incorrectly parsing the JSONB response from Supabase as an array. (A-02)
- **Mobile Booking Sync**: Aligned `mobile-app` submission logic with the latest Supabase schema, mapping local keys to `check_in_date`, `check_out_date`, `service_type`, and `service_name`. (M-02)
- **Search Detail Redirector**: Implemented dynamic routing in `app/search/details/[id]` to fix 404s, automatically mapping requests to specialized routes (`/hotels/`, `/activities/`). (R-01)
- **Database Transaction Verification**: Confirmed `create_booking_v1` RPC correctly handles multi-table inserts (`bookings` + `booking_items`). (B-02)
- **Regional Metadata E2E**: Verified 100% parity for regional filtering and display across Web (`ServiceListing`) and Admin (`Create Service`). (S-02)
- **History Audit**: Completed a full-scale testing of all possible scenarios (Discovery → Inquiry → Booking → Report).

---

## 2026-03-28 - Final Production Hardening & Navigation Refactor
- **Navigation Architecture**: Removed hardcoded `lib/navigation.ts` and refactored `Navbar.tsx` to be 100% database-driven, eliminating data drift. (H-01)
- **Security Sanitization**: Verified and enforced `sanitizeHtml` on all dynamic CMS content blocks to prevent stored XSS. (C-04)
- **Database Precision**: Synchronized `SettingsContext` and `GeneralConfig` types to ensure a shared, drift-proof data layer.
- **Build Verification**: Achieved 100% build success (Exit Code 0) after comprehensive refactoring.

---

## 2026-03-27 - Form Refactoring & Layout Compaction
- **UI Simplification**: Streamlined the "Plan My Trip" and "Tailormade" forms by removing non-essential fields (Return Date, Preferred Budget, etc.).
- **Layout Compaction**: Reduced excessive padding and margins across inquiry pages for an elegant, professional look.
- **Branding Excellence**: Generated and integrated a transparent red bird logo variant. Updated Footer typography and social UI colors.
- **Routing Fixes**: Corrected the `Hotels -> Mauritius` link in the navigations table to route to `/hotels/mauritius`.
- **Hotel Seeding**: Generated realistic `room_types` and `amenities` for the top 11 hotels to enhance the booking preview.

---

## 2026-03-25 - Assets & Branding Integration
- **Thematic Category Image Integration**: Replaced generic category cards with 8k custom thematic visuals.
- **Thematic Hero Banner Integration**: Deployed 8k professional banners for all core modules (About, Flights, Hotels, Cruises).
- **Image Resolution Fix**: Updated `lib/image.ts` to correctly handle local `/assets/` paths and bucket prefixes.
- **Type Unification**: Centralized `SiteSettings` types to resolve Vercel build errors.

---

## 2026-03-24 - GOL IBE Integration (Elite Feature)
- **Flight IBE Integration**: Successfully integrated the GOL IBE D4 engine on the `/flights` page.
- **Navigation Security**: Configured search results to open in a new tab to bypass iframe restrictions.
- **Dynamic Sizing**: Implemented a `postMessage` listener for automatic iframe height adjustment.

---

## 2026-03-24 - Schema Parity
- **Booking Checkout Sync**: Overhauled the `lib/bookingService.ts` payload to transmit updated database keys (`service_name`, `total_price`).
- **Asset Migration**: Moved all images to a unified `public/assets/` structure for cross-app parity.
