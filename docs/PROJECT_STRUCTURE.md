# Project Structure

Complete file and folder reference for the BlueBoxx DA monorepo.

## 1. Root Directory Tree

```
blueboxx-da/
├── pages/                        # Next.js Pages Router
│   ├── _app.tsx                  # Global App wrapper, Zustand provider
│   ├── _document.tsx             # HTML Document structure
│   ├── index.tsx                 # Homepage (/)
│   ├── about.tsx                 # About page (/about)
│   ├── courses.tsx               # Course listings (/courses)
│   ├── courses/[slug].tsx        # Dynamic course detail page
│   ├── jobs.tsx                  # Job listings (/jobs)
│   ├── jobs/[slug].tsx           # Dynamic job detail page
│   ├── internships.tsx           # Internship listings
│   ├── experts.tsx               # Expert/Mentor directory
│   ├── blog.tsx                  # Blog listing
│   ├── blog/[slug].tsx           # Individual blog post
│   ├── login.tsx                 # Login page
│   ├── signup.tsx                # Registration page
│   ├── checkout.tsx              # Razorpay checkout
│   ├── admin/                    # Admin portal pages
│   │   ├── index.tsx             # Admin Dashboard
│   │   ├── seo.tsx               # SEO Admin Dashboard
│   │   └── ...
│   ├── student/                  # Student portal
│   ├── intern/                   # Intern portal
│   ├── jobseeker/                # Job Seeker portal
│   ├── expert/                   # Expert portal
│   ├── company/                  # Company portal
│   └── college/                  # College portal
│
├── src/
│   ├── components/               # Reusable UI components
│   │   ├── seo/SEO.tsx           # ⭐ Global SEO Wrapper
│   │   ├── ui/                   # Base UI: Button, Card, Badge, Modal
│   │   └── ...
│   ├── layout/
│   │   └── MainLayout.tsx        # Public-facing navigation layout
│   ├── lib/
│   │   └── axios.ts              # ⭐ Configured Axios instance (auth interceptor)
│   ├── pages/                    # Page-level component implementations
│   │   └── HomePage.tsx          # Homepage content component
│   └── sections/                 # Reusable page sections (Hero, Partners, etc.)
│
├── public/                       # Static assets (served directly)
│   ├── robots.txt                # ⭐ Crawler instructions
│   ├── sitemap.xml               # ⭐ XML Sitemap for Google Search Console
│   ├── favicon.ico
│   └── logoblue.png
│
├── docs/                         # ⭐ Complete Technical Documentation
│   ├── ARCHITECTURE.md
│   ├── API.md
│   └── ...
│
├── backend/                      # Laravel 12 API Backend
│   ├── app/
│   │   ├── Http/Controllers/Api/ # Role-namespaced Controllers
│   │   │   ├── Admin/
│   │   │   ├── Student/
│   │   │   ├── Company/
│   │   │   └── Public/
│   │   ├── Models/               # Eloquent Models
│   │   ├── Policies/             # Authorization Policies
│   │   └── Services/             # Business Logic Services
│   ├── database/
│   │   ├── migrations/           # Database schema migrations
│   │   └── seeders/              # Data seeders
│   ├── routes/
│   │   └── api.php               # ⭐ All API Routes (1200+ lines)
│   └── storage/
│       └── app/private/          # Private file uploads
│
├── README.md                     # ⭐ GitHub Landing Page
├── .gitignore                    # ⭐ Git exclusion rules
├── LICENSE                       # MIT License
├── package.json                  # Node.js dependencies
└── tailwind.config.js            # Tailwind CSS configuration
```

## 2. Key Files Reference

| File | Purpose |
| :--- | :--- |
| `src/lib/axios.ts` | Injects Bearer tokens from localStorage into every outgoing API request |
| `src/components/seo/SEO.tsx` | Central SEO engine: queries DB overrides, generates meta tags |
| `backend/routes/api.php` | Complete REST API definition — the backbone of the backend |
| `backend/app/Models/SeoMetadata.php` | Model for Admin-managed SEO overrides |
| `public/robots.txt` | Controls which pages Googlebot can index |
| `public/sitemap.xml` | Maps all public URLs for Google Search Console submission |
