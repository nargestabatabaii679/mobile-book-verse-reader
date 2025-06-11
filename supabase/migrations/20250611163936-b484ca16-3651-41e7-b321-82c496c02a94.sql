
-- فعال کردن Row-Level Security روی جدول book_additions_log
ALTER TABLE public.book_additions_log ENABLE ROW LEVEL SECURITY;

-- ایجاد policy برای خواندن داده‌ها (همه کاربران احراز هویت شده می‌توانند تمام رکوردها را ببینند)
CREATE POLICY "Allow authenticated users to view all logs" 
ON public.book_additions_log 
FOR SELECT 
TO authenticated 
USING (true);

-- ایجاد policy برای درج داده‌ها (همه کاربران احراز هویت شده می‌توانند لاگ جدید ایجاد کنند)
CREATE POLICY "Allow authenticated users to insert logs" 
ON public.book_additions_log 
FOR INSERT 
TO authenticated 
WITH CHECK (true);

-- ایجاد policy برای به‌روزرسانی داده‌ها (در صورت نیاز)
CREATE POLICY "Allow authenticated users to update logs" 
ON public.book_additions_log 
FOR UPDATE 
TO authenticated 
USING (true) 
WITH CHECK (true);
