# Travel Lounge: Unified Ecosystem Strategy

This document serves as the master consolidation of the Travel Lounge business logic, architectural standards, and functional capabilities across all platforms (Web, Admin, Mobile).

---

## 🏗️ 1. Architecture Overview
- **Shared Backend**: Supabase (PostgreSQL, Real-time, Auth).
- **Web App**: Primary customer storefront (Next.js 15).
- **Mobile App**: High-engagement itinerary and concierge interface (Expo).
- **Admin App**: Mission control for service providers (Vite/Ant-D).

---

## 💎 2. Elite Standards (11/10 Goal)
- **Typography & Branding**: Centrally managed via Supabase `site_settings`. Standardized on **Outfit Black (900)** and **Slate-300** high-definition palette.
- **Visual Parity**: Shared asset directory and standardized UI components across all platforms.
- **Conversion focus**: Integrated WhatsApp/Email concierge paths on all detail-rich pages.

---

## 🛠️ 3. Functional Capabilities Map
### 3.1 Customer Discovery
- Universal search across all modules (Hotels, Activities, Cruises, etc.).
- Dynamic filtering by budget, region, and benefits (All-Inclusive).
- Elite Service Cards with high-contrast pricing and benefit badges.

### 3.2 Booking & Inquiries
- 4-step interactive Wizard on Web & Mobile.
- Direct booking status tracking for authenticated users.
- Automated email/whatsapp lead generation for conversion.

### 3.3 Management & Audit
- Admin portal for content injection and SEO management.
- Dynamic branding & versioning propagation from the dashboard.
- Automated audit scripts for data integrity and logic alignment.

---

## 📁 4. Document Consolidation Path
- All legacy audits (`UI_Audit.md`, `APPS.md`) are moved to the `/docs/archive/` folder.
- All technical specifications are now under version control in `/docs/`.
- [README.md](../README.md) - Project Entry Point.
- [AGENTS.md](../AGENTS.md) - Incremental Development Log.
