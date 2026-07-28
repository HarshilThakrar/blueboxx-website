# Complete API Documentation

BlueBoxx DA utilizes a RESTful JSON API powered by Laravel 12.

## 1. Global API Standards
- **Base URL:** `https://api.blueboxx.in/api`
- **Headers Required:** 
  - `Accept: application/json`
  - `Content-Type: application/json`
  - `Authorization: Bearer {token}` (for protected routes)
- **Response Format:**
  ```json
  {
    "success": true,
    "data": { ... },
    "message": "Operation successful"
  }
  ```

## 2. Authentication Flow (`/api/login`)
- **POST** `/api/login`
  - **Body:** `{ email, password }`
  - **Response:** Returns a Sanctum Personal Access Token. This token carries specific "abilities" (e.g., `role:student`) which are strictly verified by route middleware.

## 3. Public APIs
These APIs are accessible without Bearer tokens.
- **GET `/api/public/courses`** - Returns paginated course listings.
- **GET `/api/public/jobs`** - Returns active job listings.
- **GET `/api/public/seo?path={route}`** - Returns dynamic JSON-LD and Meta overrides for the requested Next.js frontend route.

## 4. Role-Protected APIs
Endpoints are strictly guarded by `role:` middleware.

### Admin (`/api/admin/*`)
- **GET `/api/admin/users`** - Manage all platform users.
- **POST `/api/admin/seo-metadata`** - Create override configurations for the frontend SEO engine.

### Student (`/api/student/*`)
- **POST `/api/student/checkout`** - Initializes a Razorpay order.
- **GET `/api/student/courses`** - Retrieves active enrollments.

### Company (`/api/company/*`)
- **POST `/api/company/jobs`** - Creates a new Job Posting.
- **GET `/api/company/applications`** - Retrieves paginated resumes for applied candidates.

## 5. Rate Limiting
To prevent abuse, global API routes are protected by Laravel's `throttle` middleware:
- Public endpoints: `60 requests / 1 minute`
- Authentication endpoints: `5 requests / 1 minute` (Prevents Brute Force).
