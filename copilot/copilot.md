# Chifash Project Memory (Copilot Scratchpad)

> Read this first at the start of every session to understand the current state and vibe.

---

## 1. Project Context

**Chifash** is a high-end, premium fashion boutique based in Nigeria. The platform allows users to browse curated collections of clothing (including native Nigerian wear), footwear, and accessories, with a direct-to-whatsapp ordering flow for a personal concierge experience.

## 2. Technical Stack

- **Frontend**: Next.js 15 (App Router), TypeScript, Tailwind CSS v4 (Alpha/Beta features).
- **Backend**: Django 5.x, Django REST Framework, SQLite (Development).
- **Media**: Cloudinary (Production), Unsplash CDN (Sync/Seed data), Local Media (Development).
- **Integration**: WhatsApp `wa.me` links for secure checkout/inquiry.

## 3. The "Vibe" & Rules

- **Aesthetic**: **Midnight Premium Dark**. Deep blacks (`#050505`), Slate-950 surfaces, and Soft Zinc-100 text.
- **Accent**: **Bespoke Gold** (`amber-400`) used sparingly for active states and high-priority labels.
- **Layout**:
  - Standardized **3:4 aspect ratio** for all product photography.
  - Serif italic headings for a "vogue" editorial feel.
  - Minimalist glassmorphism for navigation.
- **Coding Rules**:
  - Use Tailwind v4 best practices (e.g., `bg-linear-to-*`, `w-px`, etc.).
  - Favor automatic variable discovery over custom `@theme` rules to reduce IDE linting noise.
  - Prioritize `image_url` for fast CDN rendering in the frontend.

## 4. Current Objective

Completing the "Midnight Premium" redesign and synchronizing the store with real categories and product data inspired by *The Kesh Shop*.

## 5. Decision Log

| Date | Decision | Rationale |
| :--- | :--- | :--- |
| 2026-04-05 | Switched to `image_url` in models | To support direct CDN (Unsplash) linking for faster demo rendering. |
| 2026-04-05 | Removed `@theme` block in CSS | To fix persistent "Unknown at rule" IDE warnings while keeping v4 functionality via auto-discovery. |
| 2026-04-05 | Adopted 3:4 Aspect Ratio | To align with high-end fashion industry standards (editorial style). |
| 2026-04-05 | Established Admin Credentials | Fixed as `admin` / `admin12345` for local development access. |

## 6. Pending Tasks (Roadmap)

- [x] Initial design overhaul (Homepage, Shop, Detail).
- [x] Sync 100+ sample products and 23 real categories.
- [ ] Implement a proper Search/Filter sidebar for the Shop page.
- [ ] Add "About Us" and "Contact" dedicated pages.
- [ ] Configure production-ready PostgreSQL on Render/Heroku.
- [ ] Transition from Unsplash placeholders to real high-res Chifash inventory shots.

---

## Last Updated

2026-04-05
