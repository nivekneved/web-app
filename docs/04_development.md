# 04 Development & DevOps Guide

## Local Setup
1. **Dependencies**:
   ```bash
   npm install
   ```
2. **Environment Specs**:
   Create a `.env.local` file with:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   ```
3. **Development**:
   ```bash
   npm run dev
   ```

---

## Build & Deployment
- **Production Build**:
  ```bash
  npm run build
  ```
- **Deployment Platform**: **Vercel** with automatic preview branches for all PRs and production deployment for `main`.
- **Validation**: Ensure `npm run lint` passes before deployment to avoid Vercel build failures related to unreachable properties.

---

## SEO & Analytics
- **Metadata Engine**: Dynamically generated based on site settings.
- **Google Maps Interaction**: Integrated via the standard API endpoints for location-aware contact pages.
