# Changelog

All notable changes to BlueBoxx DA are documented here.
Format follows [Keep a Changelog](https://keepachangelog.com/).

---

## [1.0.0] — July 27, 2026 🚀

### Added — Core Platform
- Multi-role authentication system (Student, Intern, Job Seeker, Expert, Company, College, Admin) via Laravel Sanctum.
- Student course purchase pipeline integrated with Razorpay — wrapped in `DB::transaction()`.
- Automated certificate generation on course completion.
- Expert mentorship booking with session tracking and payment release.

### Added — Career Pipeline
- Job and Internship application submission with resume upload.
- Company portal to receive, manage, and download applicant resumes.
- Interview scheduling workflow with automated email notifications.
- College Placement Drive management with student tracking and CSV export.

### Added — Admin Control
- Full Admin dashboard with live MySQL-sourced analytics (no hardcoded counters).
- Company and College approval workflow with email notifications.
- Blog CMS with Tiptap rich text editor, tags, and categories.
- Support ticket system with Admin reply capability.

### Added — SEO Engine
- Dynamic `<SEO>` component with per-page schema injection.
- Admin SEO Dashboard (`/admin/seo`) for programmatic metadata overrides.
- `public/robots.txt` and `public/sitemap.xml` deployed.
- Schema.org JSON-LD support: `WebSite`, `LocalBusiness`, `Course`, `JobPosting`.

### Fixed — Database Integrity (Phase 4)
- Added `ON DELETE CASCADE` foreign key constraints to prevent orphaned records.
- Added composite UNIQUE indexes to prevent duplicate enrollments and applications.
- Wrapped all payment processing in `DB::transaction()` for ACID compliance.

### Security — Phase 5 Hardening
- Rate limiting on all public and auth endpoints.
- Mass assignment protection on every Eloquent model.
- File upload MIME and size validation.
- N+1 query elimination via eager loading across all controller list actions.

---

## [Upcoming] — v1.1.0

See [ROADMAP.md](ROADMAP.md) for planned features.
