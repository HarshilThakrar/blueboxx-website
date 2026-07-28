# Admin Guide

The Admin Portal is the operational control centre for the entire BlueBoxx DA platform. Admins have unrestricted access to all modules.

## 1. Accessing the Admin Portal

1. Navigate to `https://blueboxx.in/login`.
2. Login with an account assigned the `admin` or `super_admin` role.
3. You will be redirected to `/admin/dashboard`.

---

## 2. Dashboard

The Admin Dashboard provides a real-time platform health overview sourced directly from live MySQL queries (no hardcoded counters).

| Metric Card | Source |
| :--- | :--- |
| Total Users | `SELECT COUNT(*) FROM users` |
| Active Jobs | `SELECT COUNT(*) FROM jobs WHERE status = 'active'` |
| Total Revenue | `SELECT SUM(amount) FROM payments WHERE status = 'success'` |
| Pending Approvals | Combined count of unapproved Companies + Colleges |

---

## 3. User Management

- **View all users** with role filtering.
- **Approve / Reject** Company and College accounts awaiting verification.
- **Impersonate** users for debugging (Super Admin only).
- **Ban / Unban** accounts for Terms of Service violations.

---

## 4. Content Management

### Courses
- Create, edit, publish, and archive courses.
- Assign course to a category and instructor.
- Upload thumbnails, videos, and course materials.

### Blogs
- Full-featured Blog CMS with a Tiptap rich text editor.
- Assign categories, tags, and SEO metadata per post.
- Schedule publications.

### FAQs & Testimonials
- Manage platform-wide FAQ entries displayed on the homepage.
- Curate featured testimonials.

---

## 5. Approval Workflows

Companies and Colleges cannot use the platform until an Admin explicitly approves them:
1. Admin receives a notification when a new Company/College registers.
2. Admin navigates to **Users > Pending Approvals**.
3. After reviewing the profile, Admin clicks **Approve** or **Reject with Reason**.
4. An automated email is dispatched to the Company/College notifying them of the decision.

---

## 6. SEO Module (`/admin/seo`)

The SEO Admin Dashboard (built in Phase 2) allows the marketing team to manage metadata without developer access:
- Create a custom **SEO Override** for any frontend URL path.
- Set custom Title, Description, Canonical URL, OG Image, and robots directives.
- Inject custom JSON-LD Schema snippets for specialized pages.

---

## 7. Reports & Analytics

- **Revenue Report:** Monthly breakdown of payments by course and product.
- **Placement Report:** Success rate of college placement drives.
- **User Growth Chart:** Weekly registration trends by role.

---

## 8. Support Tickets

- View all open support tickets submitted by any user role.
- Reply to tickets, assign priority, and mark as resolved.
- Tickets are automatically escalated if unresponded for 48 hours (via Laravel Scheduler).
