#  Blueboxx - Next-Gen Career & Learning Platform

Welcome to the **Blueboxx** frontend repository! Blueboxx is a comprehensive, multi-portal SaaS platform designed to bridge the gap between education, mentorship, and employment. It seamlessly connects Students, Interns, Jobseekers, Expert Mentors, and Companies in a single, unified ecosystem.

##  Technology Stack
Blueboxx is built using modern, industry-standard technologies to ensure high performance and a premium user experience:
- **Framework**: Next.js 14 (React)
- **Language**: TypeScript for robust, type-safe code
- **Styling**: Tailwind CSS paired with Custom CSS Variables for maximum flexibility
- **Animations & Micro-interactions**: Framer Motion for smooth, dynamic interfaces
- **Icons**: Lucide React for crisp, scalable iconography
- **Notifications**: React Hot Toast for beautiful, non-blocking user alerts
- **State Management**: React Context API & Zustand (simulating a real backend via `MockDataContext`)

##  Key Features
- **Multi-Portal Architecture**: Six distinct, highly-tailored dashboards for every user role (Admin, Company, Student, Jobseeker, Intern, Expert).
- **Interactive Jobs Pipeline**: Full CRUD capabilities allowing companies to post, edit, and delete jobs, with real-time updates across the platform.
- **Premium UI/UX**: Designed to WOW users with glassmorphism, fluid page transitions, magnetic hover effects, and vibrant color palettes.
- **No Clunky Alerts**: 100% of standard browser alerts have been replaced with smooth toast notifications for a true production feel.
- **Responsive Layouts**: Fully responsive grids and components that look stunning on desktop, tablet, and mobile.

---

##  Platform Portals & Page Directory

Use the following links to navigate the platform locally (assuming your dev server is running on `http://localhost:3000`):

### 1.  Company Portal (Applicant Tracking System)
Designed for recruiters and hiring managers to track applicants, post jobs, and manage pipelines.
- [Company Dashboard](http://localhost:3000/company/dashboard)
- [Manage Jobs](http://localhost:3000/company/jobs)
- [Create a New Job](http://localhost:3000/companies/jobs/create)
- [Review Applicants](http://localhost:3000/companies/applicants)
- [Manage Interviews](http://localhost:3000/company/interviews)
- [Company Profile](http://localhost:3000/company/profile)
- [Account Settings](http://localhost:3000/company/settings)
- [Support Center](http://localhost:3000/company/support)

### 2.  Student Portal
Tailored for continuous learning, completing assignments, and finding mentorship.
- [Student Dashboard](http://localhost:3000/student/dashboard)
- [Live Classes](http://localhost:3000/student/classes)
- [Assignments](http://localhost:3000/student/assignments)
- [Find Internships](http://localhost:3000/student/internships)
- [My Applications](http://localhost:3000/student/applications)
- [Mentor Sessions](http://localhost:3000/student/mentor-sessions)
- [Resume Builder](http://localhost:3000/student/resume-builder)
- [Account Settings](http://localhost:3000/student/settings)

### 3.  Jobseeker Portal
Focused entirely on career advancement, job tracking, and professional profiling.
- [Jobseeker Dashboard](http://localhost:3000/jobseeker/dashboard)
- [My Applications](http://localhost:3000/jobseeker/applications)
- [Public Profile](http://localhost:3000/jobseeker/profile)
- [Account Settings](http://localhost:3000/jobseeker/settings)

### 4.  Intern Portal
Designed specifically for tracking ongoing internships and training progress.
- [Intern Dashboard](http://localhost:3000/intern/dashboard)
- [Applications](http://localhost:3000/intern/applications)
- [My Resume](http://localhost:3000/intern/resume)

### 5.  Expert/Mentor Portal
Tools for industry professionals to offer guidance, manage schedules, and monetize their time.
- [Expert Dashboard](http://localhost:3000/expert/dashboard)
- [Manage Availability](http://localhost:3000/expert/availability)

### 6.  Admin Portal
The overarching command center for platform owners to oversee all activity.
- [Admin Dashboard](http://localhost:3000/admin/dashboard)
- [User Management](http://localhost:3000/admin/users)

### 7.  Public & Global Pages
- [Main Landing Page](http://localhost:3000/)
- [Browse Experts](http://localhost:3000/experts)
- [Jobs Board](http://localhost:3000/jobs)
- [Authentication (Login/Signup)](http://localhost:3000/auth)
- [Shopping Cart / Checkout](http://localhost:3000/cart)

---

##  Getting Started

To run this project locally on your machine:

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Start the development server:**
   ```bash
   npm run dev
   ```
3. **Open the platform:**
   Navigate to [http://localhost:3000](http://localhost:3000) in your web browser.

