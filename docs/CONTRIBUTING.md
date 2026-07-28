# Contributing Guidelines

Thank you for contributing to BlueBoxx DA! Please follow these standards to maintain codebase quality.

## 1. Git Branching Strategy (Git Flow)

```
main          ← Production releases only
  └── develop ← Active development branch
        ├── feature/feature-name    ← New features
        ├── fix/bug-description     ← Bug fixes
        ├── hotfix/critical-issue   ← Urgent production patches
        └── docs/document-name      ← Documentation only
```

**Rules:**
- Never commit directly to `main`.
- All features must branch from `develop` and be merged back via Pull Request.
- Hotfixes branch from `main`, are merged to `main`, then cherry-picked to `develop`.

## 2. Branch Naming Conventions

| Type | Format | Example |
| :--- | :--- | :--- |
| Feature | `feature/short-description` | `feature/expert-booking-calendar` |
| Bug Fix | `fix/short-description` | `fix/job-application-cascade` |
| Hotfix | `hotfix/critical-description` | `hotfix/payment-webhook-failure` |
| Documentation | `docs/document-name` | `docs/update-api-reference` |

## 3. Commit Message Format

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
type(scope): short imperative description

Examples:
feat(company): add resume download endpoint
fix(student): prevent duplicate course enrollment
docs(api): update authentication endpoint docs
refactor(seo): extract schema logic into helper
perf(dashboard): cache admin analytics query
```

**Types:** `feat`, `fix`, `docs`, `refactor`, `perf`, `test`, `chore`

## 4. Coding Standards

**PHP / Laravel:**
- Follow [PSR-12](https://www.php-fig.org/psr/psr-12/) standards.
- All new Models must define `$fillable` explicitly.
- All new Controllers must use Form Request validation classes.

**TypeScript / React:**
- Follow the existing ESLint configuration (`.eslintrc.json`).
- Use `const` by default. Only use `let` when reassignment is necessary.
- All new components must have explicit TypeScript prop interfaces.

## 5. Pull Request Process

1. Ensure your branch is up-to-date with `develop` before submitting.
2. Run all test runners and confirm zero failures.
3. PR description must include: **What changed**, **Why it changed**, **How to test it**.
4. At least 1 approved review is required before merging.
5. Squash merge to keep commit history clean.
