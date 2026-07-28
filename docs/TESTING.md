# Testing Documentation

BlueBoxx DA uses a multi-layer testing strategy covering API, database, security, and performance.

## 1. Backend Testing

### Database & Workflow Tests (`db_test_runner.php`)
A custom PHP test runner validates DB integrity, cascade rules, and real query patterns:

```bash
# Run from backend root
php db_test_runner.php
```

**Tests performed:**
- Cascade delete chains (Company → Jobs → Applications)
- Unique constraint enforcement (duplicate enrollment prevention)
- Live dashboard counter accuracy (no hardcoded values)
- Transaction integrity for payment flows

### API Test Runner (`api_test_runner.php`)
Tests every major API endpoint for correct status codes, auth enforcement, and response format:

```bash
php api_test_runner.php
```

### Laravel PHPUnit Tests
```bash
cd backend
php artisan test
# Or with coverage report:
php artisan test --coverage
```

## 2. Frontend Testing

### TypeScript Type Checking
```bash
# In the root directory
npx tsc --noEmit
```
This validates all TypeScript types without compiling, catching type errors before build.

### ESLint Code Quality
```bash
npm run lint
```
ESLint is configured in `.eslintrc.json` to enforce Next.js best practices.

### Build Validation
```bash
npm run build
```
If the build succeeds without errors, the frontend is production-ready.

## 3. Security Testing Checklist

| Test | Method | Status |
| :--- | :--- | :--- |
| SQL Injection | Eloquent ORM parameterized queries | ✅ Protected |
| CORS | `config/cors.php` with whitelisted origins | ✅ Configured |
| Rate Limiting | Manual load test with >60 req/min | ✅ 429 returned |
| Mass Assignment | Attempt to set `role=admin` via API POST | ✅ Rejected |
| Unauthorized Access | Access `/admin/*` without admin token | ✅ 403 returned |

## 4. Performance Testing

### Lighthouse Audit
1. Open Chrome DevTools.
2. Navigate to any public page.
3. Run Lighthouse in **Desktop** mode.
4. All pages should score 90+ in Performance, 100 in SEO and Accessibility.

## 5. Production QA Procedure

Before every production release:
1. Run `php api_test_runner.php` → verify all PASS.
2. Run `php db_test_runner.php` → verify all PASS.
3. Run `npm run build` → verify zero build errors.
4. Run `npx tsc --noEmit` → verify zero type errors.
5. Run `npm run lint` → verify zero ESLint warnings.
