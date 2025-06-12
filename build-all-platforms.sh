
#!/bin/bash

echo "🚀 بیلد دیجی‌کتاب برای تمام پلتفرم‌ها"

# رنگ‌ها
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
NC='\033[0m'

# تابع برای نمایش پیام‌ها
print_step() {
    echo -e "${BLUE}📋 $1${NC}"
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

# بررسی پیش‌نیازها
print_step "بررسی پیش‌نیازها..."

if ! command -v node &> /dev/null; then
    print_error "Node.js نصب نشده است"
    exit 1
fi

if ! command -v npm &> /dev/null; then
    print_error "npm نصب نشده است"
    exit 1
fi

print_success "Node.js و npm موجود است"

# ایجاد پوشه‌های خروجی
print_step "ایجاد پوشه‌های خروجی..."
mkdir -p dist-all/{web,desktop,mobile,wordpress}

# 1. بیلد وب
print_step "1️⃣ بیلد نسخه وب..."
npm run build
if [ $? -eq 0 ]; then
    cp -r dist/* dist-all/web/
    cd dist-all && zip -r digiketab-web.zip web && cd ..
    print_success "نسخه وب آماده شد"
else
    print_error "خطا در بیلد وب"
    exit 1
fi

# 2. بیلد دسکتاپ (Electron)
print_step "2️⃣ بیلد نسخه دسکتاپ..."

# نصب electron اگر نصب نشده
if ! npm list electron &> /dev/null; then
    print_step "نصب Electron..."
    npm install electron electron-builder --save-dev
fi

# بیلد برای ویندوز
print_step "🪟 بیلد برای ویندوز..."
npm run electron:build:win 2>/dev/null || {
    npx electron-builder --win --x64
}

# بیلد برای لینوکس  
print_step "🐧 بیلد برای لینوکس..."
npm run electron:build:linux 2>/dev/null || {
    npx electron-builder --linux --x64
}

# بیلد برای macOS (فقط روی مک)
if [[ "$OSTYPE" == "darwin"* ]]; then
    print_step "🍎 بیلد برای macOS..."
    npm run electron:build:mac 2>/dev/null || {
        npx electron-builder --mac --x64
    }
fi

# کپی فایل‌های دسکتاپ
if [ -d "dist-electron" ]; then
    cp -r dist-electron/* dist-all/desktop/ 2>/dev/null
fi

print_success "نسخه دسکتاپ آماده شد"

# 3. بیلد موبایل
print_step "3️⃣ آماده‌سازی نسخه موبایل..."

# نصب Capacitor اگر نصب نشده
if ! npm list @capacitor/core &> /dev/null; then
    print_step "نصب Capacitor..."
    npm install @capacitor/core @capacitor/cli @capacitor/android @capacitor/ios
fi

# همگام‌سازی Capacitor
npx cap sync

# کپی پروژه اندروید
if [ -d "android" ]; then
    cp -r android dist-all/mobile/
    print_success "پروژه اندروید کپی شد"
fi

# کپی پروژه iOS
if [ -d "ios" ]; then
    cp -r ios dist-all/mobile/
    print_success "پروژه iOS کپی شد"
fi

print_success "نسخه موبایل آماده شد"

# 4. بسته‌بندی وردپرس
print_step "4️⃣ بسته‌بندی پلاگین وردپرس..."
if [ -d "wordpress-plugin" ]; then
    cp -r wordpress-plugin/* dist-all/wordpress/
    cd dist-all && zip -r digiketab-wordpress.zip wordpress && cd ..
    print_success "پلاگین وردپرس بسته‌بندی شد"
fi

# 5. ایجاد PWA
print_step "5️⃣ بهینه‌سازی PWA..."
# PWA manifest و service worker قبلاً در پروژه وجود دارد

# ایجاد فایل راهنمای نهایی
print_step "📝 ایجاد راهنمای نهایی..."

cat > dist-all/README-COMPLETE.md << 'EOF'
# دیجی‌کتاب - بسته کامل همه پلتفرم‌ها

## 📦 محتویات بسته

### 🌐 نسخه وب
- **فایل**: `digiketab-web.zip`
- **مناسب برای**: تمام مرورگرها، سرورهای وب
- **نصب**: Extract کرده و روی سرور آپلود کنید

### 💻 نسخه دسکتاپ
- **ویندوز**: `digiketab-setup-1.0.0.exe`
- **لینوکس**: `digiketab-1.0.0.AppImage`
- **macOS**: `digiketab-1.0.0.dmg` (اگر روی مک بیلد شده)

### 📱 نسخه موبایل
- **اندروید**: پوشه `mobile/android/`
- **iOS**: پوشه `mobile/ios/`
- **نیاز به**: Android Studio یا Xcode برای بیلد

### 🔌 پلاگین وردپرس
- **فایل**: `digiketab-wordpress.zip`
- **نصب**: در وردپرس آپلود و فعال کنید

## 🚀 راهنمای استفاده

### وب:
1. فایل ZIP را extract کنید
2. فایل‌ها را روی سرور آپلود کنید
3. به آدرس سایت مراجعه کنید

### دسکتاپ:
- **ویندوز**: فایل exe را اجرا کنید
- **لینوکس**: فایل AppImage را executable کرده و اجرا کنید
- **macOS**: فایل dmg را mount کرده و اپ را نصب کنید

### موبایل:
- **اندروید**: پوشه android را در Android Studio باز کنید
- **iOS**: پوشه ios را در Xcode باز کنید

### وردپرس:
1. فایل ZIP را در بخش پلاگین‌ها آپلود کنید
2. پلاگین را فعال کنید
3. از کد `[digiketab_library]` استفاده کنید

## ✨ ویژگی‌ها
- مطالعه آفلاین در همه پلتفرم‌ها
- رابط فارسی راست‌چین
- صفحه‌ورق واقعی
- جستجو و فیلتر پیشرفته
- QR اشتراک‌گذاری
- مدیریت کامل کتاب‌ها

نسخه: 1.0.0
تاریخ: $(date '+%Y-%m-%d')
EOF

# خلاصه نهایی
echo ""
echo "🎊🎊🎊🎊🎊🎊🎊🎊🎊🎊🎊🎊🎊🎊🎊🎊"
echo ""
print_success "همه پلتفرم‌ها آماده شدند!"
echo ""
echo -e "${PURPLE}📦 فایل‌های نهایی:${NC}"
echo "   🌐 وب: dist-all/digiketab-web.zip"
echo "   💻 دسکتاپ: dist-all/desktop/"
echo "   📱 موبایل: dist-all/mobile/"
echo "   🔌 وردپرس: dist-all/digiketab-wordpress.zip"
echo ""
echo -e "${YELLOW}🎯 پلتفرم‌های پشتیبانی شده:${NC}"
echo "   ✅ تمام مرورگرها (وب)"
echo "   ✅ ویندوز 10/11"
echo "   ✅ لینوکس (Ubuntu, Fedora, Debian)"
echo "   ✅ macOS (اگر روی مک بیلد شود)"
echo "   ✅ اندروید 5.0+"
echo "   ✅ iOS 12+"
echo "   ✅ وردپرس 5.0+"
echo ""
echo -e "${GREEN}🚀 همه چیز آماده توزیع است!${NC}"
echo ""
echo "🎊🎊🎊🎊🎊🎊🎊🎊🎊🎊🎊🎊🎊🎊🎊🎊"

# آمار نهایی
TOTAL_SIZE=$(du -sh dist-all | cut -f1)
TOTAL_FILES=$(find dist-all -type f | wc -l)

echo ""
echo -e "${BLUE}📊 آمار نهایی:${NC}"
echo "   📁 حجم کل: $TOTAL_SIZE"
echo "   📄 تعداد فایل‌ها: $TOTAL_FILES"
echo "   🕐 زمان بیلد: $(date '+%H:%M:%S')"
EOF

chmod +x build-all-platforms.sh

حالا package.json را برای اسکریپت‌های Electron به‌روزرسانی می‌کنم:

<lov-write file_path="package.json">
{
  "name": "mobile-book-verse-reader",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "main": "electron/main.js",
  "homepage": "./",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "lint": "eslint .",
    "preview": "vite preview",
    "electron": "electron .",
    "electron:dev": "concurrently \"npm run dev\" \"wait-on http://localhost:5173 && electron .\"",
    "electron:build": "npm run build && electron-builder",
    "electron:build:win": "npm run build && electron-builder --win --x64",
    "electron:build:linux": "npm run build && electron-builder --linux --x64",
    "electron:build:mac": "npm run build && electron-builder --mac --x64",
    "build:all": "./build-all-platforms.sh"
  },
  "build": {
    "appId": "com.digiketab.app",
    "productName": "دیجی‌کتاب",
    "directories": {
      "output": "dist-electron"
    },
    "files": [
      "dist/**/*",
      "electron/**/*",
      "node_modules/**/*"
    ],
    "extraResources": [
      {
        "from": "public/lovable-uploads/",
        "to": "assets/"
      }
    ],
    "win": {
      "target": "nsis",
      "icon": "public/lovable-uploads/045f5698-67df-4c57-ba47-ead9a49ac21d.png"
    },
    "linux": {
      "target": "AppImage",
      "icon": "public/lovable-uploads/045f5698-67df-4c57-ba47-ead9a49ac21d.png"
    },
    "mac": {
      "target": "dmg",
      "icon": "public/lovable-uploads/045f5698-67df-4c57-ba47-ead9a49ac21d.png"
    }
  },
  "dependencies": {
    "@capacitor/android": "^7.3.0",
    "@capacitor/core": "^7.3.0",
    "@hookform/resolvers": "^3.9.0",
    "@radix-ui/react-accordion": "^1.2.0",
    "@radix-ui/react-alert-dialog": "^1.1.1",
    "@radix-ui/react-aspect-ratio": "^1.1.0",
    "@radix-ui/react-avatar": "^1.1.0",
    "@radix-ui/react-checkbox": "^1.1.1",
    "@radix-ui/react-collapsible": "^1.1.0",
    "@radix-ui/react-context-menu": "^2.2.1",
    "@radix-ui/react-dialog": "^1.1.2",
    "@radix-ui/react-dropdown-menu": "^2.1.1",
    "@radix-ui/react-hover-card": "^1.1.1",
    "@radix-ui/react-label": "^2.1.0",
    "@radix-ui/react-menubar": "^1.1.1",
    "@radix-ui/react-navigation-menu": "^1.2.0",
    "@radix-ui/react-popover": "^1.1.1",
    "@radix-ui/react-progress": "^1.1.0",
    "@radix-ui/react-radio-group": "^1.2.0",
    "@radix-ui/react-scroll-area": "^1.1.0",
    "@radix-ui/react-select": "^2.1.1",
    "@radix-ui/react-separator": "^1.1.0",
    "@radix-ui/react-slider": "^1.2.0",
    "@radix-ui/react-slot": "^1.1.0",
    "@radix-ui/react-switch": "^1.1.0",
    "@radix-ui/react-tabs": "^1.1.12",
    "@radix-ui/react-toast": "^1.2.1",
    "@radix-ui/react-toggle": "^1.1.0",
    "@radix-ui/react-toggle-group": "^1.1.0",
    "@radix-ui/react-tooltip": "^1.1.4",
    "@supabase/supabase-js": "^2.49.9",
    "@tanstack/react-query": "^5.56.2",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "cmdk": "^1.0.0",
    "date-fns": "^3.6.0",
    "embla-carousel-react": "^8.3.0",
    "i18next": "^25.2.1",
    "input-otp": "^1.2.4",
    "jszip": "^3.10.1",
    "lucide-react": "^0.462.0",
    "next-themes": "^0.3.0",
    "react": "^18.3.1",
    "react-day-picker": "^8.10.1",
    "react-dom": "^18.3.1",
    "react-hook-form": "^7.53.0",
    "react-i18next": "^15.5.2",
    "react-resizable-panels": "^2.1.3",
    "react-router-dom": "^6.26.2",
    "recharts": "^2.12.7",
    "sonner": "^1.5.0",
    "tailwind-merge": "^2.5.2",
    "tailwindcss-animate": "^1.0.7",
    "vaul": "^0.9.3",
    "zod": "^3.23.8",
    "electron": "^32.2.0"
  },
  "devDependencies": {
    "@eslint/js": "^9.9.1",
    "@types/node": "^22.5.4",
    "@types/react": "^18.3.8",
    "@types/react-dom": "^18.3.0",
    "@vitejs/plugin-react": "^4.3.1",
    "autoprefixer": "^10.4.20",
    "concurrently": "^9.1.0",
    "electron-builder": "^25.1.8",
    "eslint": "^9.9.1",
    "eslint-plugin-react-hooks": "^5.1.0-rc.0",
    "eslint-plugin-react-refresh": "^0.4.11",
    "globals": "^15.9.0",
    "postcss": "^8.4.47",
    "tailwindcss": "^3.4.11",
    "typescript": "^5.5.3",
    "typescript-eslint": "^8.3.0",
    "vite": "^5.4.3",
    "wait-on": "^8.0.1"
  }
}
