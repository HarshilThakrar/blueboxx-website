# Deployment Guide

Complete guide for deploying BlueBoxx DA to production environments.

## 1. Prerequisites

- VPS with Ubuntu 22.04 LTS (2 CPU / 4GB RAM minimum)
- PHP 8.2+, Composer, Node.js 18+
- MySQL 8.0
- Nginx
- SSL certificate (Let's Encrypt / Cloudflare)

---

## 2. Backend Deployment (Laravel)

### Step 1: Upload & Install
```bash
# Clone / upload project to server
cd /var/www/blueboxx/backend

# Install PHP dependencies
composer install --optimize-autoloader --no-dev

# Set application key
php artisan key:generate
```

### Step 2: Configure Environment
```bash
cp .env.example .env
nano .env
# Fill in: DB_*, MAIL_*, RAZORPAY_*, APP_URL
```

### Step 3: Database Setup
```bash
php artisan migrate --force
php artisan db:seed --force  # Optional: seed initial data
```

### Step 4: Optimize for Production
```bash
php artisan config:cache
php artisan route:cache
php artisan view:cache
php artisan event:cache
php artisan storage:link
```

### Step 5: File Permissions
```bash
chown -R www-data:www-data /var/www/blueboxx/backend
chmod -R 755 /var/www/blueboxx/backend/storage
chmod -R 755 /var/www/blueboxx/backend/bootstrap/cache
```

---

## 3. Frontend Deployment (Next.js)

```bash
cd /var/www/blueboxx

# Install and build
npm install
npm run build

# Start production server (or use PM2)
npm run start
```

### Using PM2 (Recommended)
```bash
npm install -g pm2
pm2 start npm --name "blueboxx-frontend" -- start
pm2 save
pm2 startup
```

---

## 4. Nginx Configuration

```nginx
# /etc/nginx/sites-available/blueboxx

# Laravel API Backend
server {
    listen 443 ssl;
    server_name api.blueboxx.in;
    root /var/www/blueboxx/backend/public;
    index index.php;

    ssl_certificate /etc/letsencrypt/live/blueboxx.in/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/blueboxx.in/privkey.pem;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location ~ \.php$ {
        fastcgi_pass unix:/var/run/php/php8.2-fpm.sock;
        fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
        include fastcgi_params;
    }
}

# Next.js Frontend
server {
    listen 443 ssl;
    server_name blueboxx.in www.blueboxx.in;

    ssl_certificate /etc/letsencrypt/live/blueboxx.in/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/blueboxx.in/privkey.pem;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

---

## 5. Queue Workers & Cron Jobs

### Supervisor (Queue Worker)
```ini
; /etc/supervisor/conf.d/blueboxx-worker.conf
[program:blueboxx-worker]
command=php /var/www/blueboxx/backend/artisan queue:work --sleep=3 --tries=3
directory=/var/www/blueboxx/backend
autostart=true
autorestart=true
user=www-data
```

```bash
supervisorctl reread && supervisorctl update && supervisorctl start blueboxx-worker:*
```

### Laravel Scheduler (Cron)
```bash
# Add to crontab via: crontab -e
* * * * * cd /var/www/blueboxx/backend && php artisan schedule:run >> /dev/null 2>&1
```

---

## 6. Rollback Procedure

If a deployment fails:
```bash
# Revert to previous deployment
git checkout HEAD~1

# Rebuild and restart
composer install --optimize-autoloader --no-dev
php artisan migrate:rollback --step=1  # If migration was deployed
php artisan optimize
npm run build && pm2 restart blueboxx-frontend
```

---

## 7. Docker (Future Ready)

A `docker-compose.yml` scaffold is planned for Phase 2 operations (see [ROADMAP.md](ROADMAP.md)).
