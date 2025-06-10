
#!/bin/bash

echo "🚀 ساخت دیجی‌کتاب برای وب و اندروید"

# بررسی وجود Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js نصب نشده است. لطفاً ابتدا Node.js نصب کنید."
    exit 1
fi

# بررسی وجود npm
if ! command -v npm &> /dev/null; then
    echo "❌ npm نصب نشده است."
    exit 1
fi

echo "📦 نصب وابستگی‌ها..."
npm install

# ساخت نسخه وب
echo "📱 ساخت نسخه وب..."
npm run build

# بررسی موفقیت ساخت
if [ ! -d "dist" ]; then
    echo "❌ خطا در ساخت نسخه وب"
    exit 1
fi

# ایجاد پوشه خروجی
echo "📁 ایجاد پوشه خروجی..."
mkdir -p release

# کپی فایل‌های وب
echo "📦 بسته‌بندی نسخه وب..."
cp -r dist release/web
cd release && zip -r digiketab-web.zip web && cd ..

echo "✅ نسخه وب آماده است: release/digiketab-web.zip"

# آماده‌سازی برای اندروید
echo "🔧 آماده‌سازی برای اندروید..."

# بررسی نصب Capacitor
if ! npm list @capacitor/core &> /dev/null; then
    echo "📱 نصب Capacitor..."
    npm install @capacitor/core @capacitor/cli @capacitor/android
fi

# اضافه کردن پلتفرم اندروید (اگر وجود نداشته باشد)
if [ ! -d "android" ]; then
    echo "📱 اضافه کردن پلتفرم اندروید..."
    npx cap add android
fi

# کپی فایل‌های وب به اندروید
echo "📱 کپی فایل‌ها به پلتفرم اندروید..."
npx cap copy

echo "
🎉 همه چیز آماده است!

📁 فایل‌های آماده:
   ✅ وب: release/digiketab-web.zip
   ✅ اندروید: پوشه android آماده شده

📱 برای ساخت APK:
   1. Android Studio را باز کنید
   2. دستور زیر را اجرا کنید:
      npx cap open android
   3. در Android Studio:
      - Build > Generate Signed Bundle / APK
      - APK را انتخاب کنید
      - کلید امضا ایجاد/انتخاب کنید
      - APK را بسازید

📄 راهنمای کامل در README-DEPLOYMENT.md موجود است.

🌐 توزیع:
   - وب: فایل ZIP را extract کرده و در سرور آپلود کنید
   - اندروید: APK را نصب کنید (منابع ناشناخته باید فعال باشد)
"
