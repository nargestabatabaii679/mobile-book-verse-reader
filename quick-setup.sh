
#!/bin/bash

echo "⚡ راه‌اندازی سریع دیجی‌کتاب"

# بررسی وجود deploy-all.sh
if [ ! -f "deploy-all.sh" ]; then
    echo "❌ فایل deploy-all.sh پیدا نشد"
    echo "لطفاً ابتدا پروژه را از GitHub دانلود کنید"
    exit 1
fi

# اجرای اسکریپت اصلی
chmod +x deploy-all.sh
chmod +x build-script.sh 2>/dev/null

echo "🚀 شروع فرآیند کامل..."
./deploy-all.sh

echo ""
echo "🎉 تمام! حالا می‌توانید:"
echo "   📱 برای اندروید: npx cap open android"
echo "   🌐 برای وب: فایل release/digiketab-web.zip را آپلود کنید"

EOF
