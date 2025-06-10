
#!/bin/bash

echo "🚀 شروع فرآیند کامل ساخت و آماده‌سازی دیجی‌کتاب"

# رنگ‌ها برای خروجی بهتر
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# تابع برای نمایش پیام‌های رنگی
print_status() {
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
print_status "بررسی پیش‌نیازها..."

if ! command -v node &> /dev/null; then
    print_error "Node.js نصب نشده است. لطفاً ابتدا Node.js نصب کنید."
    echo "دانلود از: https://nodejs.org/"
    exit 1
fi

if ! command -v npm &> /dev/null; then
    print_error "npm نصب نشده است."
    exit 1
fi

if ! command -v git &> /dev/null; then
    print_error "Git نصب نشده است. لطفاً ابتدا Git نصب کنید."
    echo "دانلود از: https://git-scm.com/"
    exit 1
fi

print_success "تمام پیش‌نیازها موجود است"

# بررسی وجود پروژه محلی
if [ ! -f "package.json" ]; then
    print_status "دانلود پروژه از GitHub..."
    
    # پاک کردن پوشه موجود (اگر وجود دارد)
    if [ -d "mobile-book-verse-reader" ]; then
        print_warning "پوشه قبلی حذف می‌شود..."
        rm -rf mobile-book-verse-reader
    fi
    
    # کلون کردن پروژه
    git clone https://github.com/nargestabatabaii679/mobile-book-verse-reader.git
    
    if [ $? -eq 0 ]; then
        print_success "پروژه با موفقیت دانلود شد"
        cd mobile-book-verse-reader
    else
        print_error "خطا در دانلود پروژه"
        exit 1
    fi
else
    print_success "پروژه در مسیر فعلی موجود است"
fi

# نصب وابستگی‌ها
print_status "نصب وابستگی‌ها..."
npm install

if [ $? -ne 0 ]; then
    print_error "خطا در نصب وابستگی‌ها"
    exit 1
fi

print_success "وابستگی‌ها نصب شدند"

# ساخت نسخه وب
print_status "ساخت نسخه وب..."
npm run build

if [ $? -ne 0 ]; then
    print_error "خطا در ساخت نسخه وب"
    exit 1
fi

if [ ! -d "dist" ]; then
    print_error "پوشه dist ایجاد نشد"
    exit 1
fi

print_success "نسخه وب ساخته شد"

# ایجاد پوشه خروجی
print_status "آماده‌سازی فایل‌های خروجی..."
mkdir -p release

# بسته‌بندی نسخه وب
print_status "بسته‌بندی نسخه وب..."
cp -r dist release/web
cd release && zip -r digiketab-web.zip web && cd ..
print_success "نسخه وب بسته‌بندی شد: release/digiketab-web.zip"

# نصب Capacitor (اگر نصب نشده)
print_status "بررسی و نصب Capacitor..."

if ! npm list @capacitor/core &> /dev/null; then
    print_status "نصب Capacitor..."
    npm install @capacitor/core @capacitor/cli @capacitor/android
    print_success "Capacitor نصب شد"
else
    print_success "Capacitor قبلاً نصب شده"
fi

# اضافه کردن پلتفرم اندروید
if [ ! -d "android" ]; then
    print_status "اضافه کردن پلتفرم اندروید..."
    npx cap add android
    print_success "پلتفرم اندروید اضافه شد"
else
    print_success "پلتفرم اندروید موجود است"
fi

# همگام‌سازی با اندروید
print_status "همگام‌سازی فایل‌ها با اندروید..."
npx cap copy
npx cap sync

if [ $? -eq 0 ]; then
    print_success "همگام‌سازی با اندروید انجام شد"
else
    print_warning "خطا در همگام‌سازی - ممکن است Android SDK نصب نباشد"
fi

# ایجاد فایل راهنما برای کاربر نهایی
print_status "ایجاد راهنمای استفاده..."

cat > release/README-USAGE.txt << 'EOF'
🎉 دیجی‌کتاب آماده است!

📁 فایل‌های آماده:
├── digiketab-web.zip (نسخه وب)
└── android/ (پروژه اندروید)

🌐 نصب نسخه وب:
1. فایل digiketab-web.zip را extract کنید
2. محتویات پوشه web را روی سرور آپلود کنید
3. یا از Netlify, Vercel استفاده کنید

📱 ساخت APK اندروید:
1. Android Studio را نصب کنید
2. دستور زیر را اجرا کنید:
   npx cap open android
3. در Android Studio:
   - Build > Generate Signed Bundle / APK
   - APK را انتخاب کنید
   - کلید امضا ایجاد کنید
   - Build کنید

💡 نکات مهم:
- برای اندروید، Android Studio لازم است
- برای وب، فقط یک سرور ساده کافی است
- هر دو نسخه آفلاین کار می‌کنند

📞 پشتیبانی:
در صورت بروز مشکل، به فایل‌های راهنما مراجعه کنید:
- README-DEPLOYMENT.md
- DISTRIBUTION-GUIDE.md
EOF

print_success "راهنمای استفاده ایجاد شد"

# خلاصه نهایی
echo ""
echo "🎊🎊🎊🎊🎊🎊🎊🎊🎊🎊🎊🎊🎊🎊🎊🎊🎊🎊🎊🎊"
echo ""
print_success "همه کارها با موفقیت انجام شد!"
echo ""
echo -e "${BLUE}📦 فایل‌های آماده:${NC}"
echo "   ✅ وب: release/digiketab-web.zip"
echo "   ✅ اندروید: پوشه android/"
echo "   ✅ راهنما: release/README-USAGE.txt"
echo ""
echo -e "${YELLOW}🚀 مراحل بعدی:${NC}"
echo "   📱 برای APK: npx cap open android"
echo "   🌐 برای وب: فایل ZIP را extract و آپلود کنید"
echo ""
echo -e "${GREEN}🎯 پروژه شما کاملاً آماده توزیع است!${NC}"
echo ""
echo "🎊🎊🎊🎊🎊🎊🎊🎊🎊🎊🎊🎊🎊🎊🎊🎊🎊🎊🎊🎊"

# ایجاد shortcut برای آینده
cat > quick-build.sh << 'EOF'
#!/bin/bash
echo "🔄 به‌روزرسانی سریع..."
npm run build
cp -r dist release/web
cd release && zip -r digiketab-web.zip web && cd ..
npx cap copy
echo "✅ به‌روزرسانی انجام شد!"
EOF

chmod +x quick-build.sh
print_success "اسکریپت quick-build.sh برای به‌روزرسانی‌های آینده آماده شد"

EOF
