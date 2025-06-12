
#!/bin/bash

echo "🚀 راه‌اندازی کامل دیجی‌کتاب برای همه پلتفرم‌ها"

# رنگ‌ها
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${BLUE}📋 مراحل راه‌اندازی:${NC}"
echo "1. نصب وابستگی‌ها"
echo "2. بیلد پروژه اصلی"
echo "3. راه‌اندازی Capacitor"
echo "4. راه‌اندازی Electron"
echo "5. آماده‌سازی تمام خروجی‌ها"

# 1. نصب وابستگی‌ها
echo -e "${BLUE}📦 نصب وابستگی‌ها...${NC}"
npm install

# 2. نصب وابستگی‌های موبایل
echo -e "${BLUE}📱 نصب Capacitor...${NC}"
npm install @capacitor/core @capacitor/cli @capacitor/android @capacitor/ios

# 3. نصب Electron
echo -e "${BLUE}💻 نصب Electron...${NC}"
npm install electron electron-builder concurrently wait-on --save-dev

# 4. مقداردهی اولیه Capacitor
echo -e "${BLUE}🔧 مقداردهی Capacitor...${NC}"
npx cap init "دیجی‌کتاب" "com.digiketab.app" --web-dir="dist"

# 5. بیلد اولیه
echo -e "${BLUE}🔨 بیلد اولیه...${NC}"
npm run build

# 6. همگام‌سازی Capacitor
echo -e "${BLUE}🔄 همگام‌سازی Capacitor...${NC}"
npx cap sync

# 7. اضافه کردن پلتفرم‌ها
echo -e "${BLUE}📱 اضافه کردن پلتفرم اندروید...${NC}"
npx cap add android

if [[ "$OSTYPE" == "darwin"* ]]; then
    echo -e "${BLUE}🍎 اضافه کردن پلتفرم iOS...${NC}"
    npx cap add ios
fi

# 8. ایجاد راهنمای نهایی
cat > PLATFORM-GUIDE.md << 'EOF'
# راهنمای همه پلتفرم‌ها - دیجی‌کتاب

## 🌐 وب اپلیکیشن
```bash
npm run build
# فایل‌ها در پوشه dist آماده‌اند
```

## 💻 اپلیکیشن دسکتاپ
```bash
# توسعه
npm run electron:dev

# بیلد برای ویندوز
npm run electron:build:win

# بیلد برای لینوکس  
npm run electron:build:linux

# بیلد برای مک (فقط روی مک)
npm run electron:build:mac
```

## 📱 اپلیکیشن موبایل
```bash
# اندروید
npx cap open android
# در Android Studio: Build > Generate Signed Bundle / APK

# iOS (فقط روی مک)
npx cap open ios
# در Xcode: Product > Archive
```

## 🔌 پلاگین وردپرس
پوشه `wordpress-plugin/digiketab/` را در وردپرس آپلود کنید.

## 🚀 بیلد همه پلتفرم‌ها
```bash
./build-all-platforms.sh
```

## ✨ ویژگی‌های همه نسخه‌ها
- ✅ مطالعه آفلاین
- ✅ رابط فارسی راست‌چین
- ✅ صفحه‌ورق واقعی
- ✅ جستجو و فیلتر
- ✅ QR اشتراک‌گذاری
- ✅ پنل مدیریت

EOF

echo ""
echo -e "${GREEN}🎉 همه چیز آماده است!${NC}"
echo ""
echo -e "${YELLOW}📋 دستورات مهم:${NC}"
echo "   🌐 وب: npm run build"
echo "   💻 دسکتاپ: npm run electron:build"
echo "   📱 اندروید: npx cap open android"
echo "   🔌 وردپرس: آپلود پوشه wordpress-plugin"
echo "   🚀 همه: ./build-all-platforms.sh"
echo ""
echo -e "${BLUE}📖 راهنمای کامل: PLATFORM-GUIDE.md${NC}"

chmod +x setup-complete.sh
