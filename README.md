# Blueboxx - Next-Gen Career & Learning Platform

Welcome to the **Blueboxx** repository! Blueboxx is a comprehensive, multi-portal SaaS platform designed to seamlessly connect Students, Interns, Jobseekers, Expert Mentors, Colleges, and Companies in a single, unified ecosystem.

##  Overview

Blueboxx is built with a decoupled modern architecture:
- **Frontend**: Next.js 14, TypeScript, Tailwind CSS, Framer Motion
- **Backend**: Laravel 11, PHP 8, MySQL (RESTful APIs)

---

##  Frontend Completions

The frontend is a premium, fully responsive application featuring multiple tailored dashboards:

- **6 Distinct Portals**: Admin, Company (ATS), Student (LMS), Jobseeker, Intern, and Expert Mentors.
- **Modern UI/UX**: Designed with glassmorphism, fluid page transitions, magnetic hover effects, and vibrant color palettes.
- **Robust Admin Settings**: Complete system settings, API configurations, and email templating UI built out.
- **Analytics Hubs**: Beautiful, interactive charting and metrics for platform monitoring.
- **Comprehensive QA**: Fully audited with automated Playwright suites covering 18+ viewports for flawless responsive design.

---

##  Backend Completions

The Laravel API backend powers the robust data engine of Blueboxx:

- **Authentication System**: Secure JWT-based authentication supporting multiple distinct user roles (Admin, Student, Company, etc.).
- **Database Architecture**: Complex relational schema managing users, job postings, internships, course enrollments, and applications.
- **RESTful API Endpoints**: Scalable routing structure built to serve the Next.js frontend seamlessly.
- **Form Validation**: Strict backend validation rules to ensure data integrity for all incoming requests.

---

## Platform Portals Directory

*Assuming your dev server is running on `http://localhost:3000`*

###  Administration
- **[Admin Dashboard](http://localhost:3000/admin/dashboard)** - Global command center
- **[System Settings](http://localhost:3000/admin/settings/general)** - Core platform configuration

### Corporate & Hiring
- **[Company Dashboard](http://localhost:3000/company/dashboard)** - Applicant Tracking System
- **[Manage Jobs](http://localhost:3000/company/jobs)** - Create and edit job postings

### Learning & Careers
- **[Student Dashboard](http://localhost:3000/student/dashboard)** - LMS, Courses, and Live Classes
- **[Jobseeker Dashboard](http://localhost:3000/jobseeker/dashboard)** - Job applications and tracking
- **[Intern Dashboard](http://localhost:3000/intern/dashboard)** - Internship progress tracking

###  Mentorship
- **[Expert Dashboard](http://localhost:3000/expert/dashboard)** - Manage mentor availability and sessions

###  Public Pages
- **[Main Landing Page](http://localhost:3000/)**
- **[Browse Jobs](http://localhost:3000/jobs)** | **[Browse Experts](http://localhost:3000/experts)**
- **[Authentication](http://localhost:3000/auth)**

---

##  Getting Started

### 1. Start the Frontend
```bash
npm install
npm run dev
# Runs on http://localhost:3000
```

### 2. Start the Backend (Laravel)
```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan serve
# Runs on http://localhost:8000
```

