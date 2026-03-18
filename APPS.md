# Travel Lounge: Application Logic & Functional Scenarios

This document provides a consolidated overview of the business logic, technical architecture, features, and end-to-end user scenarios for the Travel Lounge ecosystem (Web, Admin, and Mobile).

---

## 1. Core Services & Logic Architecture

### 1.1 Dynamic Configuration System
- **Source of Truth**: Supabase `site_settings` table.
- **Implementation**: Fetching settings via `AuthContext` (Web) or `SettingsContext` (Mobile/Admin) to dynamically update primary colors, contact info, SEO metadata, and app versioning.
- **Benefit**: Zero-code branding and maintenance across all platforms.

### 1.2 Search & Listing Logic
- **Universal Component**: `ServiceListing.tsx`.
- **Filtering Capabilities**: 
  - **Budget**: Real-time price range filtering using client-side hooks.
  - **Categories**: Integration with `service_categories` table to filter by `service_type` (Hotels, Tours, Activities, Cruises).
  - **Geography**: Regional filtering (e.g., Mauritius North/South, Rodrigues).
- **Sub-Activities Logic**: Dedicated land and sea routes (`/activities/land`, `/activities/sea`) point to filtered views of the main activities engine.

### 1.3 Booking & Reservation Logic
- **Wizard Pattern**: 4-step interactive wizard (`BookingWizard.tsx`) ensuring data validation (participants, dates, contact details).
- **Conditionals**: Room type selection for Hotels and Itinerary viewing for Tours/Cruises.
- **Backend Flow**: Use of Supabase RPCs and service functions (`bookingService.ts`) to handle customer registration and booking atomicity.

---

## 2. End-to-End Scenarios

### 2.1 Customer Journey (E2E)
1. **Discovery**: User enters the Homepage, interacts with the **Hero Slider**, and selects a category from the **Navbar**.
2. **Browsing**: User navigates to a listing page (e.g., **Mauritius Hotels**), applies filters for budget and rating.
3. **Selection**: User views detail-rich pages (Gallery, Amenities, Itineraries, Reviews).
4. **Reservation**: User opens the **Booking Wizard**, selects preferred dates/rooms, and submits the request.
5. **Post-Booking**: User (authenticated) views booking status and history in their **Personal Dashboard**.

### 2.2 Admin Journey (E2E)
1. **Overview**: Admin logs in and views **Revenue/Booking Trends** on the main dashboard.
2. **Content Management**:
   - Updates the **Hero Slider** with new seasonal promotions.
   - Manages **FAQs** or publishes a new **Editorial Post** in the CMS.
3. **Service Management**:
   - Adds a new **Hotel** or **Sea Activity**, links it to categories, and sets complex pricing models (e.g., room-specific rates).
4. **Operations**:
   - Moderates **Customer Reviews**.
   - Responds to **Inquiries** and tracks **Booking Statuses** from the management portal.

---

## 3. Platform Feature Map

| Feature | Web App | Mobile App | Admin App |
| :--- | :---: | :---: | :---: |
| **Search & Discovery** | ✅ | ✅ | ❌ |
| **Booking Wizard** | ✅ | ✅ | ❌ |
| **Reviews Moderation** | ❌ | ❌ | ✅ |
| **Customer Insights** | ❌ | ❌ | ✅ |
| **Push/Meta Mgmt** | ❌ | ✅ | ✅ |
| **Dynamic Branding** | ✅ | ✅ | ✅ |

---

## 4. Technical Stack

- **Frontend**: Next.js 15+ (Web), Expo/React Native (Mobile), Vite/React (Admin).
- **Backend**: Supabase (PostgreSQL, Auth, Functions, Storage).
- **Styling**: Tailwind CSS (Utility-First), Framer Motion (Animations).
- **State**: React Context API, TanStack Query.
