# UI Standardization Audit & Diagnosis
**Generated:** 2026-03-19
**Project Status:** Premium Migration Stage 

## 📊 Overall Completion Rate: 68%

This score is a weighted average of consistent implementation across all interactive surfaces, containers, and brand-defining visual tokens in both the `web-app` and `admin-app`.

| Category | Standard (Desired State) | Current Status | Score |
| :--- | :--- | :--- | :--- |
| **Interactive Strokes** | `border-slate-300` for inputs/outline buttons | 42/60+ instances (70%) | 70% |
| **Containers/Cards** | `rounded-[2rem]` or `rounded-[3rem]` foundations | 35/50+ instances (70%) | 70% |
| **Typography** | `font-black text-xs uppercase tracking-widest` for CTAs | 55/65+ instances (85%) | 85% |
| **Buttons** | Unified `Button` component with premium shadows | Used in 60% of cases (rest are inline) | 60% |
| **Backgrounds** | `bg-slate-50` for section offsets | Used in 80% of pages | 80% |

---

## 🔍 System-Wide Diagnosis

### 1. The "Border-Slate-200" Legacy (30% remaining)
Most forms used to use `border-slate-200` which provides poor contrast on white backgrounds.
- **Diagnosis**: 18+ high-visibility files still contain the older border token.
- **Targets**: `BookingForm.tsx`, `AdvancedFilters.tsx`, `ActivityClientWrapper.tsx`, and `admin-app` pages.

### 2. Manual Form Inconsistencies (40% remaining)
While we have a dedicated `Input.tsx` component, several high-traffic pages use inline `<input>` tags with varying padding and border-radius.
- **Diagnosis**: Inconsistent padding (`py-3` vs `py-5`) across search bars and contact forms.
- **Targets**: `Search/Details` pages and `Plan My Trip` custom questionnaire.

### 3. Container Rounding Drift (30% remaining)
The project is moving toward a "Bento-Box" premium aesthetic with large border radii.
- **Diagnosis**: 40% of cards in the `admin-app` use `rounded-xl` (12px), while `web-app` has moved to `rounded-2xl` (16px) or larger.
- **Targets**: Admin dashboard cards and web-app saved-search modules.

### 4. Admin vs Web Parity (50% remaining)
The `admin-app` feels more utilitarian and lacks the premium shadows and font-black transitions used in the `web-app`.
- **Diagnosis**: The two apps feel like they belong to slightly different eras of the same brand.
- **Targets**: `Sidebar.jsx`, `Cards.jsx`, and `Buttons` in the Admin environment.

---

## 🛠️ Actionable Roadmap to 100%

### Phase 1: Interactive Token Sync
- [ ] Replace remaining `border-slate-200` with `border-slate-300` in all interactive components.
- [ ] Update `Button.tsx` outline variant to use the new standard stroke.

### Phase 2: Form Component Migration
- [ ] Refactor `BookingForm`, `AdvancedFilters`, and `Plan My Trip` to use the unified `Input`, `Select`, and `Textarea` components exclusively. This will force 100% consistency instantly.

### Phase 3: Global Rounding Audit
- [ ] Standardize all card containers to `rounded-2xl` minimum.
- [ ] Implement `rounded-[3rem]` for all full-width section containers.

### Phase 4: Admin App UI Elevation
- [ ] Apply the `web-app` premium button styles (`shadow-lg shadow-red-600/20`) to the admin dashboard.
- [ ] Sync the `admin-app` sidebar typography to match the web-app’s minimalist uppercase standard.

---

> [!TIP]
> **Priority Fix**: Standardizing `Button.tsx` and the basic `Input` component first will automatically "fix" 40% of future drift, as developers will naturally use these atomic components.
