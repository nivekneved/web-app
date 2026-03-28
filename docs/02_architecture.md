# 02 Architecture & Flow

## Repository Structure
The **Web App** utilizes the Next.js 15 App Router for a highly performant and SEO-friendly architecture.

- **`src/app/`**: Next.js App Router pages and layouts.
- **`src/components/`**: Modularized UI components (e.g., `Hero`, `BookingWizard`, `Footer`).
- **`src/lib/`**: Core logic for Supabase clients and service-specific API wrappers.
- **`src/types/`**: Centralized TypeScript definitions and unified site settings interfaces.
- **`public/assets/`**: Standardized directory for categories, heroes, and branding icons.
- **`docs/`**: Standardized project documentation bundle.

---

## Technical Flow
1. **Dynamic Configuration**: The portal fetches site-wide settings (logo, dimensions, social URLs) from Supabase on render.
2. **Flight Search Engine**: The `/flights` page integrates the GOL IBE D4 engine, handling dynamic height and `postMessage` events for cross-tab communication.
3. **Checkout Logic**: The `BookingWizard` manages transient state and submits finalized payloads to the `create_booking_v1` RPC.

---

## Elite standards (UI/UX)
- **Compact Layouts**: Minimal padding and gaps on mobile/web forms for a tighter, more professional feel.
- **Visual Parity**: Uses standardized paths (e.g., `/assets/heroes/`) to ensure visual consistency with mobile/admin.
- **Performance**: Leveraging React 19 concurrent features for smooth transitions.
