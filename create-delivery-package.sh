
#!/bin/bash

echo "📦 ایجاد بسته تحویل برای کارفرما..."

# رنگ‌ها
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

# ایجاد پوشه تحویل
DELIVERY_DIR="delivery-package"
rm -rf $DELIVERY_DIR
mkdir -p $DELIVERY_DIR

echo -e "${BLUE}📁 ایجاد ساختار فایل‌ها...${NC}"

# کپی فایل‌های اصلی پروژه
cp -r src/ $DELIVERY_DIR/
cp -r public/ $DELIVERY_DIR/
cp -r android/ $DELIVERY_DIR/ 2>/dev/null || echo "Android پوشه موجود نیست - پس از اجرای build ایجاد می‌شود"

# کپی فایل‌های کانفیگ
cp package.json $DELIVERY_DIR/
cp package-lock.json $DELIVERY_DIR/ 2>/dev/null
cp capacitor.config.ts $DELIVERY_DIR/
cp vite.config.ts $DELIVERY_DIR/
cp tailwind.config.ts $DELIVERY_DIR/
cp tsconfig.json $DELIVERY_DIR/
cp tsconfig.app.json $DELIVERY_DIR/
cp tsconfig.node.json $DELIVERY_DIR/
cp components.json $DELIVERY_DIR/
cp postcss.config.js $DELIVERY_DIR/
cp index.html $DELIVERY_DIR/

# کپی اسکریپت‌ها
cp *.sh $DELIVERY_DIR/ 2>/dev/null

# کپی مستندات
cp *.md $DELIVERY_DIR/

# ایجاد فایل تنظیمات محیط
cat > $DELIVERY_DIR/.env.example << 'EOF'
# تنظیمات اختیاری برای پروژه
# این فایل را به .env تغییر نام دهید و مقادیر را تنظیم کنید

# نام اپلیکیشن (اختیاری)
VITE_APP_NAME=دیجی‌کتاب

# نسخه اپلیکیشن (اختیاری)  
VITE_APP_VERSION=1.0.0

# محیط اجرا (اختیاری)
VITE_ENV=production
EOF

# ایجاد README ساده برای شروع
cat > $DELIVERY_DIR/README-START.md << 'EOF'
# شروع سریع دیجی‌کتاب

## برای شروع فوری:
```bash
chmod +x quick-setup.sh
./quick-setup.sh
```

## فایل‌های مهم:
- `INSTALLATION-GUIDE.md` - راهنمای کامل نصب
- `DELIVERY-PACKAGE.md` - توضیحات کامل پروژه
- `PROJECT-CHECKLIST.md` - چک‌لیست تحویل

## خروجی‌ها:
- `release/digiketab-web.zip` - نسخه وب
- `android/` - پروژه اندروید
EOF

# ایجاد اسکریپت راه‌اندازی ساده
cat > $DELIVERY_DIR/start.sh << 'EOF'
#!/bin/bash
echo "🚀 راه‌اندازی پروژه دیجی‌کتاب"
echo ""

# بررسی Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js نصب نشده - از https://nodejs.org دانلود کنید"
    exit 1
fi

echo "✅ Node.js موجود است"

# نصب وابستگی‌ها
echo "📦 نصب وابستگی‌ها..."
npm install

# ساخت پروژه
echo "🔨 ساخت پروژه..."
npm run build

# آماده‌سازی فایل‌های خروجی
echo "📁 آماده‌سازی خروجی‌ها..."
mkdir -p release
cp -r dist release/web
cd release && zip -r digiketab-web.zip web && cd ..

echo ""
echo "🎉 پروژه آماده است!"
echo "✅ نسخه وب: release/digiketab-web.zip"
echo "📱 برای اندروید: npx cap add android && npx cap open android"
EOF

chmod +x $DELIVERY_DIR/start.sh

# ایجاد فایل آمار پروژه
TOTAL_FILES=$(find $DELIVERY_DIR -type f | wc -l)
TOTAL_SIZE=$(du -sh $DELIVERY_DIR | cut -f1)

cat > $DELIVERY_DIR/PROJECT-STATS.md << EOF
# آمار پروژه دیجی‌کتاب

## 📊 اطلاعات کلی
- **تعداد فایل‌ها**: $TOTAL_FILES فایل
- **حجم کل**: $TOTAL_SIZE
- **تاریخ ایجاد**: $(date '+%Y-%m-%d %H:%M:%S')
- **نسخه**: 1.0.0

## 🔧 تکنولوژی‌ها
- React 18.3.1
- TypeScript 5.x
- Vite Build Tool
- Tailwind CSS
- Capacitor Mobile
- Tanstack Query

## 📱 پلتفرم‌ها
- ✅ Web (تمام مرورگرها)
- ✅ Android 5.0+
- ✅ PWA Support

## 🎯 ویژگی‌ها
- کتابخانه دیجیتال کامل
- مطالعه آفلاین
- صفحه‌ورق واقعی
- جستجوی پیشرفته
- پنل مدیریت
- QR اشتراک‌گذاری

## 💾 ذخیره‌سازی
- localStorage (آفلاین کامل)
- عدم وابستگی به سرور
- پشتیبان‌گیری خودکار
EOF

echo -e "${GREEN}✅ بسته تحویل آماده شد: $DELIVERY_DIR/${NC}"
echo -e "${YELLOW}📁 حجم کل: $TOTAL_SIZE${NC}"
echo -e "${BLUE}📊 تعداد فایل‌ها: $TOTAL_FILES${NC}"

# ایجاد فایل ZIP نهایی
echo -e "${BLUE}🗜️  ایجاد فایل ZIP نهایی...${NC}"
zip -r digiketab-complete-project.zip $DELIVERY_DIR/

echo ""
echo "🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉"
echo ""
echo -e "${GREEN}✅ فایل آماده تحویل: digiketab-complete-project.zip${NC}"
echo ""
echo "📋 محتویات:"
echo "   ✅ کد منبع کامل"
echo "   ✅ پروژه اندروید"  
echo "   ✅ اسکریپت‌های خودکار"
echo "   ✅ راهنماهای کامل"
echo "   ✅ چک‌لیست تحویل"
echo ""
echo -e "${YELLOW}📧 این فایل را به کارفرما تحویل دهید${NC}"
echo ""
echo "🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉"
EOF

chmod +x create-delivery-package.sh
