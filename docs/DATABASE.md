# Database Architecture

BlueBoxx DA utilizes a relational MySQL 8 database designed for extreme data integrity via strict foreign keys and cascading constraints.

## 1. Entity-Relationship Diagram (ERD)
```mermaid
erDiagram
    USERS ||--o{ ROLES : has
    USERS ||--o{ PROFILES : one-to-one
    USERS ||--o{ COURSE_ENROLLMENTS : creates
    USERS ||--o{ JOB_APPLICATIONS : submits
    
    COMPANIES ||--o{ JOBS : posts
    COMPANIES ||--o{ INTERNSHIPS : posts
    
    JOBS ||--o{ JOB_APPLICATIONS : receives
    INTERNSHIPS ||--o{ INTERNSHIP_APPLICATIONS : receives
    
    COLLEGES ||--o{ PLACEMENT_DRIVES : hosts
    PLACEMENT_DRIVES ||--o{ PLACEMENT_RECORDS : generates
```

## 2. Core Tables
- **`users`**: The absolute core table. Holds credentials and the primary `role` enum.
- **Profiles**: Polymorphic/One-to-One splits. `student_profiles`, `company_profiles`, `expert_profiles`, `college_profiles`.
- **Commerce**: `courses`, `course_enrollments`, `payments`, `transactions`.
- **Careers**: `jobs`, `job_applications`, `internships`, `internship_applications`.
- **B2B**: `placement_drives`, `placement_records`.
- **System**: `support_tickets`, `notifications`, `seo_metadata`.

## 3. Data Integrity & Constraints (Production Standard)
In Phase 4, the database was aggressively hardened to prevent orphaned rows and duplicate data.

**Cascading Deletes (`ON DELETE CASCADE`):**
- If a `Job` is deleted, all corresponding `job_applications` are structurally wiped by MySQL.
- If a `College` is deleted, all `placement_drives` and subsequent `placement_records` are wiped.
- *Mechanism:* `foreign('job_id')->references('id')->on('jobs')->onDelete('cascade');`

**Duplicate Prevention:**
- Composite Unique Indexes prevent a student from applying to the same job twice.
- *Mechanism:* `$table->unique(['user_id', 'job_id']);`

## 4. Query Optimization
All heavy relationships utilize Laravel's Eager Loading to prevent the `N+1 Query Problem`.
Example: `Job::with(['company', 'applications.user'])->paginate(20);`

## 5. Security & Transactions
Financial entries (`payments`, `course_enrollments`) are exclusively manipulated inside `DB::transaction()` closures. If the payment record creates successfully but the enrollment fails, the entire SQL transaction rolls back, preventing data corruption.
