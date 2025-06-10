
# دیجی‌کتاب - راهنمای کامل و نهایی

## 🚀 راه‌اندازی یک‌دستی

### برای کاربران عادی:
```bash
# دانلود و اجرای خودکار
git clone https://github.com/nargestabatabaii679/mobile-book-verse-reader.git
cd mobile-book-verse-reader
chmod +x quick-setup.sh
./quick-setup.sh
```

### برای توسعه‌دهندگان:
```bash
# راه‌اندازی کامل
chmod +x deploy-all.sh
./deploy-all.sh
```

## 📦 خروجی نهایی

بعد از اجرای اسکریپت:

### ✅ فایل‌های آماده:
- `release/digiketab-web.zip` - نسخه وب
- `android/` - پروژه اندروید
- `release/README-USAGE.txt` - راهنمای کاربر

### ✅ اسکریپت‌های کمکی:
- `quick-build.sh` - به‌روزرسانی سریع
- `deploy-all.sh` - ساخت کامل
- `build-script.sh` - ساخت استاندارد

## 🌐 استقرار وب

```bash
# آپلود ساده
unzip release/digiketab-web.zip
# محتویات web/ را روی سرور آپلود کنید

# یا استفاده از سرویس‌های آنلاین:
# - Netlify: drag & drop پوشه web
# - Vercel: connect GitHub repo
# - GitHub Pages: enable in settings
```

## 📱 ساخت اپ اندروید

```bash
# باز کردن Android Studio
npx cap open android

# یا ساخت از command line (نیاز به تنظیمات اضافی)
cd android
./gradlew assembleDebug
```

### نیازمندی‌ها برای اندروید:
- ✅ Android Studio
- ✅ Android SDK (API 21+)
- ✅ Java Development Kit (JDK 11+)

## 🔄 به‌روزرسانی

```bash
# به‌روزرسانی سریع بعد از تغییرات
./quick-build.sh

# یا به‌روزرسانی کامل
git pull
./deploy-all.sh
```

## 🎯 ویژگی‌های کلیدی

- ✅ **کاملاً فارسی** - رابط راست‌چین
- ✅ **آفلاین** - بدون نیاز به اینترنت
- ✅ **صفحه‌ورق واقعی** - تجربه مطالعه طبیعی
- ✅ **جستجوی پیشرفته** - یافتن سریع کتاب‌ها
- ✅ **QR اشتراک‌گذاری** - به اشتراک‌گذاری آسان
- ✅ **چند پلتفرمه** - وب + اندروید

## 🔧 عیب‌یابی

### مشکلات رایج:

**خطای npm install:**
```bash
rm -rf node_modules package-lock.json
npm install
```

**خطای build:**
```bash
npm run build -- --force
```

**مشکل اندروید:**
```bash
npx cap doctor
```

**خطای مجوزها:**
```bash
chmod +x *.sh
```

## 📂 ساختار پروژه

```
mobile-book-verse-reader/
├── src/                 # کد منبع React
├── android/             # پروژه اندروید
├── release/             # فایل‌های آماده
├── deploy-all.sh        # اسکریپت کامل
├── quick-setup.sh       # راه‌اندازی سریع
├── build-script.sh      # ساخت استاندارد
└── README-FINAL.md      # این فایل
```

## 🎉 نکات پایانی

1. **برای توزیع عمومی**: از `release/digiketab-web.zip` استفاده کنید
2. **برای اپ استور**: APK را از Android Studio بسازید
3. **برای توسعه**: از `quick-build.sh` استفاده کنید
4. **برای مشکلات**: فایل‌های راهنما را بررسی کنید

---

**🌟 پروژه دیجی‌کتاب - کتابخانه دیجیتال فارسی**

*همه چیز آماده است! فقط اجرا کنید و لذت ببرید! 🚀*

EOF
