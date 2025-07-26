# راهنمای تنظیم Supabase

## وضعیت فعلی
🚨 **هشدار**: در حال حاضر پروژه در حالت Demo کار می‌کند و از داده‌های نمونه استفاده می‌کند.

برای استفاده کامل از تمام امکانات، باید پروژه Supabase واقعی تنظیم کنید.

## مراحل تنظیم

### مرحله 1: ایجاد پروژه Supabase

1. به سایت [Supabase.com](https://supabase.com) بروید
2. روی **Start your project** کلیک کنید
3. اکانت ایجاد کنید یا وارد شوید
4. **New Project** را انتخاب کنید
5. مشخصات پروژه را وارد کنید:
   - **Name**: `mobile-book-verse-reader`
   - **Database Password**: یک رمز عبور قوی انتخاب کنید
   - **Region**: نزدیک‌ترین منطقه را انتخاب کنید

### مرحله 2: دریافت اطلاعات اتصال

بعد از ایجاد پروژه:

1. به قسمت **Settings** > **API** بروید
2. اطلاعات زیر را کپی کنید:
   - **Project URL** (مثال: `https://abcdefgh.supabase.co`)
   - **anon public** API key

### مرحله 3: تنظیم متغیرهای محیطی

فایل `.env` در ریشه پروژه را ویرایش کنید:

```env
# Supabase Configuration
VITE_SUPABASE_URL=https://YOUR_PROJECT_URL.supabase.co
VITE_SUPABASE_ANON_KEY=YOUR_ANON_KEY

# Remove or set to false for production
VITE_FORCE_OFFLINE=false
```

**⚠️ نکات مهم:**
- `YOUR_PROJECT_URL` را با URL واقعی پروژه‌تان جایگزین کنید
- `YOUR_ANON_KEY` را با API key واقعی جایگزین کنید
- `VITE_FORCE_OFFLINE=false` قرار دهید یا این خط را حذف کنید

### مرحله 4: ایجاد جداول پایگاه داده

مایگریشن‌های موجود در پوشه `supabase/migrations/` را اجرا کنید:

1. [Supabase CLI](https://supabase.com/docs/guides/cli) را نصب کنید
2. در ترمینال وارد پوشه پروژه شوید
3. دستورات زیر را اجرا کنید:

```bash
# ورود به Supabase
supabase login

# تنظیم پروژه محلی
supabase init

# اتصال به پروژه remote
supabase link --project-ref YOUR_PROJECT_REF

# اجرای مایگریشن‌ها
supabase db push
```

یا به صورت دستی جداول را ایجاد کنید:

#### جدول Interactive Stories

```sql
CREATE TABLE interactive_stories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  html_content TEXT NOT NULL,
  thumbnail_url VARCHAR(255),
  difficulty_level VARCHAR(50) DEFAULT 'beginner',
  estimated_duration INTEGER DEFAULT 10,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### تنظیم Row Level Security (RLS)

```sql
-- فعال‌سازی RLS
ALTER TABLE interactive_stories ENABLE ROW LEVEL SECURITY;

-- ایجاد policy برای خواندن عمومی
CREATE POLICY "Public read access" ON interactive_stories
FOR SELECT TO public
USING (true);

-- ایجاد policy برای نوشتن (در صورت نیاز)
CREATE POLICY "Authenticated users can insert" ON interactive_stories
FOR INSERT TO authenticated
WITH CHECK (true);
```

### مرحله 5: تست اتصال

1. برنامه را راه‌اندازی کنید:
   ```bash
   npm run dev
   ```

2. به آدرس `/diagnostics` بروید تا وضعیت اتصال را بررسی کنید

3. اگر همه چیز درست تنظیم شده باشد، باید:
   - ✅ وضعیت اتصال "متصل" نشان داده شود
   - ✅ پیغام demo حذف شود
   - ✅ داده‌های واقعی نمایش داده شوند

## عیب‌یابی

### خطاهای رایج

1. **"Invalid API key"**
   - بررسی کنید که API key صحیح کپی شده باشد
   - مطمئن شوید که از anon public key استفاده می‌کنید

2. **"Project not found"**
   - URL پروژه را دوباره بررسی کنید
   - مطمئن شوید که پروژه فعال است

3. **"CORS error"**
   - در Supabase Dashboard > Settings > API، domain خود را اضافه کنید

### بررسی گام به گام

1. **متغیرهای محیطی:**
   ```javascript
   console.log('VITE_SUPABASE_URL:', import.meta.env.VITE_SUPABASE_URL);
   console.log('VITE_SUPABASE_ANON_KEY:', import.meta.env.VITE_SUPABASE_ANON_KEY?.substring(0, 10) + '...');
   ```

2. **تست ping:**
   ```bash
   ping YOUR_PROJECT_URL.supabase.co
   ```

3. **تست API:**
   ```bash
   curl -H "apikey: YOUR_ANON_KEY" https://YOUR_PROJECT_URL.supabase.co/rest/v1/
   ```

## نکات امنیتی

- هرگز API key خود را در repository عمومی قرار ندهید
- از فایل `.env.local` برای تنظیمات محلی استفاده کنید
- Row Level Security (RLS) را فعال کنید
- دسترسی‌ها را محدود کنید

## پشتیبانی

اگر مشکلی در تنظیم داشتید:

1. صفحه `/diagnostics` را بررسی کنید
2. Console browser را برای خطاهای JavaScript چک کنید
3. مستندات [Supabase](https://supabase.com/docs) را مطالعه کنید
4. از کامیونیتی Supabase کمک بگیرید

---

**تبریک! 🎉**
بعد از تکمیل این مراحل، برنامه شما با پایگاه داده واقعی کار خواهد کرد و می‌توانید تمام امکانات را استفاده کنید.
