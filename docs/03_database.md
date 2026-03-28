# 03 Database & API Model

## Data Interaction
The Web App serves as the primary consumer of the Supabase backend for public discovery and guest reservations.

### 1. Catalog Sourcing
Dynamically populates the homepage and destination modules from `services`, `categories`, and `hero_slides`.

### 2. Branding Engine
Consumes the `site_settings` table to render the correct brand identity (logo, favicon, dimensions) without redeployment.

### 3. Booking Procedures
- **Service Integration**: The `bookingService.ts` library handles interaction with the `create_booking_v1` secure RPC.
- **Schema Mapping**: Transmits `service_name`, `service_type`, and `total_price` to the unified backend to ensure 100% data integrity with the Admin App.

---

## API & RPC Logic
- **`create_booking_v1`**: Validates the payload and handles table insertion across legacy and modern order tables.
- **`get_or_create_customer_v1`**: Ensures guest profiles are unified across the ecosystem.

---

## Security
- **JWT Protection**: Secured endpoints for customer-specific actions.
- **Input Validation**: Front-end Zod schemas synchronized with database constraints.
