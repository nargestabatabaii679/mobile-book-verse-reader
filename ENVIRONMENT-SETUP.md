# راهنمای تنظیم متغیرهای محیطی

این راهنما نحوه تنظیم متغیرهای محیطی برای پروژه Mobile Book Verse Reader را توضیح می‌دهد.

## فایل‌های محیطی

پروژه از چندین فایل محیطی پشتیبانی می‌کند:

- `.env` - تنظیمات عمومی (این فایل commit نمی‌شود)
- `.env.development` - تنظیمات مخصوص development
- `.env.production` - تنظیمات مخصوص production
- `.env.example` - نمونه فایل برای راهنمایی

## راه‌اندازی اولیه

### ۱. کپی کردن فایل نمونه

```bash
cp .env.example .env
```

### ۲. دریافت اطلاعات Supabase

برای دریافت اطلاعات مورد نیاز Supabase:

1. به [Supabase Dashboard](https://supabase.com/dashboard) بروید
2. پروژه خود را انتخاب کنید
3. به `Settings > API` بروید
4. اطلاعات زیر را کپی کنید:
   - **Project URL**: URL پروژه شما
   - **anon/public key**: کلید عمومی

### ۳. تنظیم متغیرهای ضروری

در فایل `.env` متغیرهای زیر را تنظیم کنید:

```env
# ضروری - اطلاعات Supabase
VITE_SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY

# محیط (development/production)
VITE_APP_ENV=development
NODE_ENV=development
```

## متغیرهای موجود

### اطلاعات Supabase
```env
VITE_SUPABASE_URL=https://awiphzyrlorpexpfclze.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key
```

### تنظیمات اپلیکیشن
```env
VITE_APP_NAME=Mobile Book Verse Reader
VITE_APP_VERSION=1.0.0
VITE_APP_DESCRIPTION=A comprehensive mobile book reading platform
VITE_APP_ENV=development
```

### تنظیمات API
```env
VITE_API_TIMEOUT=30000          # مهلت زمانی درخواست (میلی‌ثانیه)
VITE_MAX_RETRIES=3              # حداکثر تعداد تلاش مجدد
VITE_RETRY_DELAY=1000           # تأخیر بین تلاش‌ها (میلی‌ثانیه)
```

### تنظیمات Debug
```env
VITE_DEBUG_MODE=true            # فعال‌سازی حالت debug
VITE_ENABLE_LOGGING=true        # فعال‌سازی لاگ
VITE_LOG_LEVEL=info             # سطح لاگ (error/warn/info/debug)
```

### تنظیمات شبکه
```env
VITE_NETWORK_TIMEOUT=10000                # مهلت زمانی شبکه
VITE_CONNECTION_CHECK_INTERVAL=30000      # فاصله زمانی بررسی اتصال
```

### تنظیمات Cache
```env
VITE_CACHE_DURATION=300000      # مدت زمان cache (5 دقیقه)
VITE_STALE_TIME=300000          # زمان stale برای React Query
```

## محیط‌های مختلف

### Development
```env
VITE_APP_ENV=development
VITE_DEBUG_MODE=true
VITE_ENABLE_LOGGING=true
VITE_LOG_LEVEL=debug
```

### Production
```env
VITE_APP_ENV=production
VITE_DEBUG_MODE=false
VITE_ENABLE_LOGGING=false
VITE_LOG_LEVEL=error
```

## امنیت

### نکات مهم امنیتی:
1. **هرگز** کلیدهای secret را در فایل‌های `.env` قرار ندهید
2. تنها از کلیدهای `anon/public` استفاده کنید
3. فایل `.env` را commit نکنید
4. برای production از متغیرهای محیطی سرور استفاده کنید

### کلیدهای مجاز:
- ✅ `anon key` (public key)
- ❌ `service_role key` (secret key)

## اعتبارسنجی تنظیمات

پروژه تنظیمات را خودکار بررسی می‌کند:

```typescript
// بررسی خودکار در config/index.ts
validateConfig(config);
```

در صورت مشکل در تنظیمات، خطاهای واضح نمایش داده می‌شوند.

## تست تنظیمات

برای تست تنظیمات:

1. پروژه را اجرا کنید:
```bash
npm run dev
```

2. به صفحه تشخیص بروید:
```
http://localhost:8081/diagnostics
```

3. وضعیت اتصالات را بررسی کنید

## عیب‌یابی

### مشکلات رایج:

#### ۱. خطای "Missing Supabase configuration"
**راه‌حل**: بررسی کنید که `VITE_SUPABASE_URL` و `VITE_SUPABASE_ANON_KEY` تنظیم شده‌اند

#### ۲. خطای "CORS"
**راه‌حل**: مطمئن شوید که URL صحیح است و از `https://` شروع می‌شود

#### ۳. خطای "Invalid API key"
**راه‌حل**: کلید anon را از Supabase Dashboard مجدداً کپی کنید

### بررسی تنظیمات:
```bash
# مشاهده متغیرهای محیطی
echo $VITE_SUPABASE_URL
echo $VITE_SUPABASE_ANON_KEY
```

## مثال کامل

نمونه فایل `.env` کامل:

```env
# Supabase
VITE_SUPABASE_URL=https://awiphzyrlorpexpfclze.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Application
VITE_APP_NAME=Mobile Book Verse Reader
VITE_APP_VERSION=1.0.0
VITE_APP_ENV=development
NODE_ENV=development

# API
VITE_API_TIMEOUT=30000
VITE_MAX_RETRIES=3
VITE_RETRY_DELAY=1000

# Debug
VITE_DEBUG_MODE=true
VITE_ENABLE_LOGGING=true
VITE_LOG_LEVEL=info

# Network
VITE_NETWORK_TIMEOUT=10000
VITE_CONNECTION_CHECK_INTERVAL=30000

# Cache
VITE_CACHE_DURATION=300000
VITE_STALE_TIME=300000
```

## پشتیبانی

در صورت مشکل:
1. فایل `.env.example` را بررسی کنید
2. صفحه diagnostics را چک کنید
3. لاگ‌های کنسول را بررسی کنید
4. تنظیمات Supabase را تأیید کنید
