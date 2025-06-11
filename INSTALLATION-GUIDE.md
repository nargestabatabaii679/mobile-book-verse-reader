
# راهنمای نصب برای کارفرما

## 🎯 خلاصه اجرایی
این پکیج شامل یک کتابخانه دیجیتال کامل فارسی است که بدون نیاز به اینترنت کار می‌کند.

## 📦 محتویات پکیج
```
digiketab-complete-project.zip
├── src/                    # کد منبع
├── android/               # پروژه اندروید  
├── public/                # فایل‌های عمومی
├── release/               # فایل‌های آماده
├── *.sh                   # اسکریپت‌های خودکار
├── *.md                   # راهنماها
└── package.json           # تنظیمات پروژه
```

## ⚡ نصب سریع (5 دقیقه)

### گام 1: پیش‌نیازها
دانلود و نصب:
- [Node.js](https://nodejs.org/) (نسخه 16+)
- [Git](https://git-scm.com/)

### گام 2: استخراج و اجرا
```bash
# استخراج فایل
unzip digiketab-complete-project.zip
cd mobile-book-verse-reader

# اجرای خودکار
chmod +x quick-setup.sh
./quick-setup.sh
```

### گام 3: نتیجه
- ✅ نسخه وب: `release/digiketab-web.zip`
- ✅ نسخه اندروید: پوشه `android/`

## 🌐 استقرار وب

### روش 1: سرور ساده
```bash
# استخراج نسخه وب
unzip release/digiketab-web.zip

# آپلود محتویات پوشه web به سرور
# آدرس نهایی: http://yourdomain.com
```

### روش 2: سرویس‌های رایگان
- **Netlify**: آپلود فایل ZIP
- **Vercel**: اتصال به GitHub
- **GitHub Pages**: فعال‌سازی در تنظیمات

## 📱 ساخت اپ اندروید

### روش 1: خودکار
```bash
# باز کردن Android Studio
npx cap open android

# در Android Studio:
# Build > Generate Signed Bundle / APK
```

### روش 2: دستی
1. Android Studio را نصب کنید
2. پوشه `android` را باز کنید
3. APK را بسازید

## 🔧 تنظیمات اختیاری

### تغییر نام اپ
```typescript
// capacitor.config.ts
appName: 'نام جدید شما'
```

### تغییر آیکون
جایگزینی فایل‌ها در:
- `public/lovable-uploads/`
- `android/app/src/main/res/`

## 📋 چک‌لیست تحویل

- [ ] Node.js نصب شده
- [ ] Git نصب شده  
- [ ] فایل استخراج شده
- [ ] اسکریپت اجرا شده
- [ ] فایل‌های خروجی موجود
- [ ] تست روی مرورگر
- [ ] Android Studio آماده (اختیاری)

## 🆘 حل مشکلات

### خطای Node.js
```bash
# بررسی نسخه
node --version  # باید 16+ باشد
npm --version
```

### خطای مجوز فایل
```bash
chmod +x *.sh
```

### خطای Build
```bash
rm -rf node_modules
npm install
npm run build
```

## 📞 پشتیبانی

### مشکلات رایج:
1. **سایت باز نمی‌شود**: بررسی آپلود فایل‌ها
2. **اپ نصب نمی‌شود**: فعال کردن "منابع ناشناخته"
3. **خطای Build**: پاک کردن cache و تلاش مجدد

### لاگ‌ها:
- مرورگر: F12 > Console
- Terminal: پیام‌های خطا
- Android: Logcat در Android Studio

---

## ✅ تایید نهایی

پس از تکمیل موفق:
- ✅ سایت در `yourdomain.com` در دسترس
- ✅ APK روی گوشی نصب شده  
- ✅ هر دو نسخه آفلاین کار می‌کنند

**پروژه آماده بهره‌برداری است! 🎉**
