# Web App Architecture

## Core Technologies

- **Next.js 15+**: App Router for server-side rendering and routing.
- **Tailwind CSS**: Utility-first styling with custom brand colors.
- **Framer Motion**: Smooth animations and transitions.
- **Supabase**: Backend-as-a-Service for database and authentication.

## Folder Structure

- `app/`: Next.js App Router pages and layouts.
- `components/`: Reusable UI components (Navbar, Footer, ServiceCard, etc.).
- `contexts/`: React Contexts for global state (Wishlist, Theme).
- `lib/`: Utility functions and shared logic.
- `public/`: Static assets including optimized images and logos.
- `supabase/`: Database migrations and configuration.

## State Management

- **Context API**: Used for lightweight global state.
- **URL Parameters**: Used for filtering and sorting states in listing pages.
