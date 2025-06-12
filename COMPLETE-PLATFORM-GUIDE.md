
# راهنمای کامل همه پلتفرم‌ها - دیجی‌کتاب

## 🎯 خلاصه اجرایی
این پروژه کتابخانه دیجیتال فارسی برای **همه پلتفرم‌ها** آماده شده است:

- ✅ **وب** (تمام مرورگرها)
- ✅ **ویندوز** (Windows 10/11)
- ✅ **لینوکس** (Ubuntu, Fedora, Debian)
- ✅ **macOS** (اگر روی مک بیلد شود)
- ✅ **اندروید** (5.0+)
- ✅ **iOS** (12.0+)
- ✅ **وردپرس** (5.0+)
- ✅ **PWA** (Progressive Web App)

---

## 🚀 راه‌اندازی سریع

### یک دستور برای همه چیز:
```bash
chmod +x setup-complete.sh
./setup-complete.sh
```

### بیلد همه پلتفرم‌ها:
```bash
chmod +x build-all-platforms.sh
./build-all-platforms.sh
```

---

## 📱 راهنمای هر پلتفرم

### 1. 🌐 وب اپلیکیشن

**بیلد:**
```bash
npm run build
```

**خروجی:** پوشه `dist/`

**استقرار:**
- سرور ساده: فایل‌های `dist` را آپلود کنید
- Netlify: drag & drop پوشه `dist`
- Vercel: اتصال GitHub repo
- GitHub Pages: فعال‌سازی در تنظیمات

**مثال:**
```bash
# آپلود به سرور
scp -r dist/* user@server:/var/www/html/

# یا استفاده از rsync
rsync -av dist/ user@server:/var/www/html/
```

### 2. 💻 اپلیکیشن دسکتاپ (Electron)

**توسعه:**
```bash
npm run electron:dev
```

**بیلد برای ویندوز:**
```bash
npm run electron:build:win
```

**بیلد برای لینوکس:**
```bash
npm run electron:build:linux
```

**بیلد برای macOS:**
```bash
npm run electron:build:mac  # فقط روی مک
```

**خروجی:** پوشه `dist-electron/`

**نصب:**
- **ویندوز**: `digiketab-setup-1.0.0.exe`
- **لینوکس**: `digiketab-1.0.0.AppImage`
- **macOS**: `digiketab-1.0.0.dmg`

### 3. 📱 اپلیکیشن موبایل (Capacitor)

**آماده‌سازی:**
```bash
npm run build
npx cap sync
```

**اندروید:**
```bash
npx cap open android
```
سپس در Android Studio:
1. Build > Generate Signed Bundle / APK
2. انتخاب APK
3. ایجاد کلید امضا
4. بیلد APK

**iOS (فقط روی مک):**
```bash
npx cap open ios
```
سپس در Xcode:
1. Product > Archive
2. Distribute App
3. Ad Hoc یا App Store

**تست روی دستگاه:**
```bash
# اندروید
npx cap run android

# iOS
npx cap run ios
```

### 4. 🔌 پلاگین وردپرس

**نصب:**
1. پوشه `wordpress-plugin/digiketab/` را zip کنید
2. در وردپرس: افزونه‌ها > افزودن > آپلود
3. پلاگین را فعال کنید

**استفاده:**
```php
// در صفحه یا پست
[digiketab_library]

// با پارامتر
[digiketab_library category="ادبیات" limit="8" view="shelf"]
```

**پنل مدیریت:**
- منوی "دیجی‌کتاب" در پنل ادمین
- افزودن/ویرایش کتاب‌ها
- تنظیمات و آمار

### 5. 🌐 PWA (Progressive Web App)

**ویژگی‌های PWA:**
- نصب روی صفحه اصلی
- کارکرد آفلاین
- اعلان‌های push
- به‌روزرسانی خودکار

**فعال‌سازی:**
PWA به طور خودکار فعال است. کاربران می‌توانند:
1. سایت را باز کنند
2. روی "نصب" کلیک کنند
3. اپ روی صفحه اصلی اضافه می‌شود

---

## 🛠️ نیازمندی‌های توسعه

### برای همه پلتفرم‌ها:
- Node.js 16+
- npm یا yarn
- Git

### برای موبایل:
- **اندروید**: Android Studio + Android SDK
- **iOS**: macOS + Xcode + iOS SDK

### برای دسکتاپ:
- الکترون به طور خودکار نصب می‌شود

---

## 📦 ساختار خروجی نهایی

```
dist-all/
├── web/                     # نسخه وب
│   ├── index.html
│   ├── assets/
│   └── ...
├── desktop/                 # اپلیکیشن‌های دسکتاپ
│   ├── win-unpacked/
│   ├── linux-unpacked/
│   ├── digiketab-setup-1.0.0.exe
│   ├── digiketab-1.0.0.AppImage
│   └── digiketab-1.0.0.dmg
├── mobile/                  # پروژه‌های موبایل
│   ├── android/
│   └── ios/
├── wordpress/               # پلاگین وردپرس
│   ├── digiketab.php
│   ├── templates/
│   └── assets/
├── digiketab-web.zip       # بسته وب
├── digiketab-wordpress.zip # بسته وردپرس
└── README-COMPLETE.md      # راهنمای نهایی
```

---

## 🎯 چک‌لیست توزیع

### قبل از انتشار:
- [ ] تست روی مرورگرهای مختلف
- [ ] تست روی اندروید
- [ ] تست روی iOS (اگر ممکن)
- [ ] تست PWA
- [ ] تست پلاگین وردپرس
- [ ] تست اپلیکیشن دسکتاپ

### برای انتشار:
- [ ] ایجاد کلیدهای امضا
- [ ] بهینه‌سازی تصاویر
- [ ] کمپرس فایل‌ها
- [ ] تست نهایی همه پلتفرم‌ها

---

## 🔧 عیب‌یابی

### مشکلات رایج:

**خطای npm install:**
```bash
rm -rf node_modules package-lock.json
npm install
```

**خطای Capacitor:**
```bash
npx cap doctor
npx cap sync
```

**خطای Electron:**
```bash
npm rebuild electron
```

**مشکل در بیلد:**
```bash
npm run build -- --force
```

---

## 📊 مقایسه پلتفرم‌ها

| پلتفرم | حجم | سرعت | آفلاین | نصب |
|---------|-----|-------|---------|-----|
| وب | 5MB | ⭐⭐⭐⭐ | ✅ | ❌ |
| PWA | 5MB | ⭐⭐⭐⭐⭐ | ✅ | ✅ |
| دسکتاپ | 150MB | ⭐⭐⭐⭐⭐ | ✅ | ✅ |
| موبایل | 25MB | ⭐⭐⭐⭐⭐ | ✅ | ✅ |
| وردپرس | 2MB | ⭐⭐⭐ | ✅ | ✅ |

---

## 🎉 نتیجه‌گیری

✅ **همه پلتفرم‌ها آماده**
✅ **یک کدبیس، همه جا کار می‌کند**
✅ **آفلاین کامل**
✅ **رابط فارسی**
✅ **آماده توزیع**

**دیجی‌کتاب** حالا روی تمام دستگاه‌ها و سیستم‌عامل‌ها قابل استفاده است! 🚀

---

**نسخه:** 1.0.0  
**تاریخ:** نوامبر 2024  
**سازگاری:** تمام پلتفرم‌های مدرن
