# Environment Variables Reference

All environment-specific configuration is managed via `.env` files. **Never commit `.env` to version control.**

---

## 1. Laravel Backend (`/backend/.env`)

### Core Application
```env
APP_NAME="BlueBoxx DA"
APP_ENV=production        # local | staging | production
APP_KEY=                  # Auto-generated via: php artisan key:generate
APP_DEBUG=false           # MUST be false in production
APP_URL=https://api.blueboxx.in
FRONTEND_URL=https://blueboxx.in
```

### Database
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=blueboxx_db
DB_USERNAME=blueboxx_user
DB_PASSWORD=your_strong_password
```

### Mail (SMTP)
```env
MAIL_MAILER=smtp
MAIL_HOST=smtp.gmail.com          # or smtp.mailgun.org
MAIL_PORT=587
MAIL_USERNAME=noreply@blueboxx.in
MAIL_PASSWORD=your_app_password
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS=noreply@blueboxx.in
MAIL_FROM_NAME="BlueBoxx DA"
```

### Razorpay Payments
```env
RAZORPAY_KEY_ID=rzp_live_xxxxxxxxxxxx
RAZORPAY_KEY_SECRET=your_razorpay_secret
RAZORPAY_WEBHOOK_SECRET=your_webhook_secret
```

### Queue & Cache
```env
CACHE_STORE=redis          # or file for simple setups
QUEUE_CONNECTION=redis     # or database
REDIS_HOST=127.0.0.1
REDIS_PASSWORD=null
REDIS_PORT=6379
```

### File Storage
```env
FILESYSTEM_DISK=local      # or s3 for production
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_DEFAULT_REGION=ap-south-1
AWS_BUCKET=blueboxx-uploads
```

---

## 2. Next.js Frontend (`.env.local`)

```env
NEXT_PUBLIC_API_URL=https://api.blueboxx.in/api
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_live_xxxxxxxxxxxx
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_APP_URL=https://blueboxx.in
```

> [!IMPORTANT]
> Variables prefixed with `NEXT_PUBLIC_` are exposed to the browser. Never put secrets in them. 
> The Razorpay **Secret Key** must only exist in the Laravel `.env`, never in Next.js.

---

## 3. Variable Validation Checklist

Before deploying, verify these are set:
- [ ] `APP_KEY` is generated (not empty)
- [ ] `APP_DEBUG=false`
- [ ] `DB_*` credentials are correct
- [ ] `RAZORPAY_KEY_ID` + `RAZORPAY_KEY_SECRET` are **live** keys (not test keys)
- [ ] `MAIL_*` credentials are verified by sending a test email
- [ ] `NEXT_PUBLIC_API_URL` points to the production API domain
