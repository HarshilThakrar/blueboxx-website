# Security Documentation

BlueBoxx DA is built with a security-first methodology. Every layer of the stack has been hardened against common attack vectors.

## 1. Security Matrix

| Threat | Protection | Status |
| :--- | :--- | :--- |
| SQL Injection | Eloquent ORM (Parameterized Queries) | ✅ Protected |
| XSS | React DOM escaping + Content-Security-Policy | ✅ Protected |
| CSRF | Sanctum token-based auth (stateless) | ✅ Protected |
| Brute Force | `throttle:5,1` on auth endpoints | ✅ Protected |
| Mass Assignment | `$fillable` on every Eloquent Model | ✅ Protected |
| IDOR | Policy-based authorization on every resource | ✅ Protected |
| File Upload Attacks | MIME + Size validation before storage | ✅ Protected |

## 2. SQL Injection Prevention

All database queries use Eloquent ORM which internally uses PDO prepared statements. Raw queries are never constructed via string interpolation.

```php
// ✅ SAFE — Parameterized
$jobs = Job::where('company_id', $companyId)->get();

// ❌ UNSAFE — Never done in this project
$jobs = DB::select("SELECT * FROM jobs WHERE company_id = " . $companyId);
```

## 3. Mass Assignment Protection

Every Model in the application defines explicit `$fillable` arrays, preventing attackers from injecting arbitrary fields via API requests.

```php
protected $fillable = ['title', 'description', 'salary_min', 'salary_max'];
// 'is_approved', 'admin_notes' etc. are NOT fillable
```

## 4. Authorization (Policies)

Beyond Role middleware, resource-specific authorization uses Laravel Policies. For example, a Company can only edit its **own** Job:

```php
public function update(User $user, Job $job): bool
{
    return $user->companyProfile?->id === $job->company_id;
}
```

## 5. File Upload Security

All uploaded files (resumes, thumbnails) pass strict validation before storage:
- **MIME type** must be explicitly whitelisted (`pdf`, `docx`, `jpg`, `png`, `webp`).
- **File size** is capped at 5MB.
- Files are stored in `storage/app/private` — **never** in the publicly accessible web root.

## 6. Rate Limiting

```php
// Global Public APIs: 60 req/min
Route::middleware('throttle:60,1')->prefix('public')...

// Auth Endpoints: 5 req/min (Brute Force Prevention)
Route::middleware('throttle:5,1')->group(function() {
    Route::post('/login', ...);
    Route::post('/forgot-password', ...);
});
```
