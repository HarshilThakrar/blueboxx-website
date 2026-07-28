# Performance Documentation

BlueBoxx DA is engineered for sub-2-second page loads and 95+ Lighthouse scores.

## 1. Performance Target Scores

| Metric | Target | Implementation |
| :--- | :--- | :--- |
| Lighthouse Performance | 95+ | Next.js Image optimization, lazy loading |
| Lighthouse Accessibility | 100 | Semantic HTML, ARIA labels |
| Lighthouse SEO | 100 | Schema.org, dynamic meta tags |
| LCP (Largest Contentful Paint) | < 1.2s | Priority image preloading |
| CLS (Cumulative Layout Shift) | < 0.1 | Explicit image aspect ratios |
| FID (First Input Delay) | < 100ms | React Concurrent rendering |

## 2. N+1 Query Elimination

The single most impactful database performance optimization. Every relational query uses Eager Loading.

```php
// ❌ N+1 Problem — 1 + N queries
$jobs = Job::all();
foreach ($jobs as $job) {
    echo $job->company->name; // Executes a new query each iteration
}

// ✅ Eager Loading — 2 total queries
$jobs = Job::with('company')->paginate(20);
```

## 3. Dashboard Caching

Admin dashboard analytics queries are computationally expensive. They are cached using Laravel's Cache facade:

```php
$stats = Cache::remember('dashboard.summary', 60, function () {
    return [
        'total_users'  => User::count(),
        'active_jobs'  => Job::where('status', 'active')->count(),
        'total_revenue'=> Payment::where('status', 'success')->sum('amount'),
    ];
});
```

Cache is automatically invalidated every 60 seconds, ensuring live data with no unnecessary DB load.

## 4. Frontend Image Optimization

All images use Next.js `<Image>` component which:
- Automatically converts to **WebP** format.
- Generates multiple responsive **srcsets** for different screen sizes.
- Implements **lazy loading** by default (images below the fold are not fetched until visible).
- Hero images use `priority` prop to be preloaded, directly improving LCP.

```tsx
<Image
  src={course.thumbnail}
  alt={course.title}
  fill
  sizes="(max-width: 768px) 100vw, 33vw"
  className="object-cover"
/>
```

## 5. Pagination Strategy

All listing endpoints (Jobs, Courses, Applications) use server-side pagination to prevent loading thousands of records:

```php
// Returns only 20 records, with total count metadata for UI
return Job::with('company')->latest()->paginate(20);
```

## 6. Bundle Optimization

- `SWR` caches API responses in-browser, preventing redundant network requests.
- `dedupingInterval: 60000` ensures the same API endpoint isn't fetched more than once per minute.
- Code-splitting is automatic with the Next.js Pages Router.
