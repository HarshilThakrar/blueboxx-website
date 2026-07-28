# SEO Architecture Documentation

BlueBoxx DA uses a multi-layer SEO system: a static foundation, a programmatic engine, and a dynamic Admin Override layer.

## 1. SEO Architecture Layers

```
Layer 1: Static Foundation (robots.txt, sitemap.xml, canonical base)
   ↓
Layer 2: Programmatic Templates (auto-generated per-route meta tags via SEO.tsx)
   ↓
Layer 3: Dynamic Admin Overrides (seo_metadata DB table queried at runtime)
```

## 2. Core SEO Component

The `<SEO>` component in `src/components/seo/SEO.tsx` acts as the central injection point for all meta tags:

- **Queries** `GET /api/public/seo?path={route}` on every page render.
- If a DB override exists → uses it (highest priority).
- If no override → uses the programmatic template props.
- All results inject into `<Head>` via `next/head`.

**Tags Injected:**
- `<title>` — 50-60 character optimized title
- `<meta name="description">` — 150 character description
- `<meta name="keywords">` — comma-separated keywords
- `<link rel="canonical">` — prevents duplicate content penalties
- `<meta property="og:*">` — Full Open Graph suite for social sharing
- `<meta property="twitter:*">` — Twitter Card with large summary image
- `<script type="application/ld+json">` — Schema.org JSON-LD

## 3. Schema.org Implementations

| Page | Schema Type | Google SERP Benefit |
| :--- | :--- | :--- |
| Homepage | `WebSite` + `SearchAction` | Sitelinks Search Box |
| About | `LocalBusiness` | Local map pack (Vadodara) |
| Courses | `Course` | Rich snippets (price, rating) |
| Jobs | `JobPosting` | Google for Jobs integration |
| Blog Posts | `BlogPosting` | Top Stories carousel (mobile) |
| Experts | `Person` | Knowledge Graph entity |

## 4. Technical SEO Files

- **`/public/robots.txt`** — Directs crawlers to allow all public pages and block all authenticated portals (`/admin`, `/student`).
- **`/public/sitemap.xml`** — Static sitemap submitted to Google Search Console covering all 16 primary public routes with priority weighting.

## 5. Admin SEO Dashboard

Navigate to `/admin/seo` to manage metadata overrides:
1. Click **+ New Metadata Override**.
2. Enter the exact URL path (e.g., `/courses/react-js`).
3. Fill in the custom Title, Description, OG Image URL, and Schema JSON.
4. Save — the override is live instantly on the next page request.

## 6. Google Tools Integration

| Tool | Status | Setup Required |
| :--- | :--- | :--- |
| Google Search Console | Ready | Submit `sitemap.xml`, add HTML verification tag to `_document.tsx` |
| Google Analytics 4 | Ready | Add `G-XXXXXXXXXX` to `NEXT_PUBLIC_GA_MEASUREMENT_ID` env variable |
| Microsoft Clarity | Ready | Add Clarity script tag to `_document.tsx` |
