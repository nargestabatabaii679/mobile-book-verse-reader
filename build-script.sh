
#!/bin/bash

echo "🚀 ساخت دیجی‌کتاب برای وب و اندروید"

# ساخت نسخه وب
echo "📱 ساخت نسخه وب..."
npm run build

# ایجاد پوشه خروجی
mkdir -p release

# کپی فایل‌های وب
echo "📦 بسته‌بندی نسخه وب..."
cp -r dist release/web
cd release && zip -r digiketab-web.zip web && cd ..

echo "✅ نسخه وب آماده است: release/digiketab-web.zip"

# راهنمای اندروید
echo "
📱 برای ساخت نسخه اندروید:

1. نصب Capacitor:
   npm install @capacitor/core @capacitor/cli @capacitor/android

2. اضافه کردن پلتفرم:
   npx cap add android

3. کپی فایل‌ها:
   npx cap copy

4. باز کردن Android Studio:
   npx cap open android

5. ساخت APK در Android Studio

📁 فایل‌های آماده در پوشه release قرار دارند.
"
