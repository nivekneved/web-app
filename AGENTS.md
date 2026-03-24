# AGENTS.md

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
