-- Add story nodes and choices for the remaining interactive stories

-- First, let's add story nodes for "ماجراجویی افسانه‌ای" (Fantasy Adventure)
-- Assuming the story_id exists, we'll add nodes for it
INSERT INTO story_nodes (story_id, node_id, title, content, is_ending, score_impact) VALUES
-- Fantasy Adventure Story
((SELECT id FROM interactive_stories WHERE title = 'ماجراجویی افسانه‌ای' LIMIT 1), 'start', 'آغاز ماجراجویی', 'شما جوان جنگجویی هستید که وارد جنگل مرموز شده‌اید. در عمق جنگل، کلبه‌ای قدیمی می‌بینید که نور عجیبی از آن بیرون می‌زند. ناگهان صدای غرش اژدهایی از دوردست می‌آید.', false, 0),
((SELECT id FROM interactive_stories WHERE title = 'ماجراجویی افسانه‌ای' LIMIT 1), 'cottage', 'کلبه جادوگر', 'وارد کلبه شدید و جادوگر پیری را دیدید که بر روی کتاب‌های جادویی کار می‌کند. او به شما نگاه کرد و گفت: "جوان، اژدها قلعه را تسخیر کرده است. برای نجات مردم به این شمشیر جادویی نیاز داری."', false, 10),
((SELECT id FROM interactive_stories WHERE title = 'ماجراجویی افسانه‌ای' LIMIT 1), 'dragon_lair', 'لانه اژدها', 'به لانه اژدها نزدیک شدید. اژدهای بزرگ و سیاهی در مقابل شما ایستاده است. چشمانش مثل آتش می‌درخشد و دهانش پر از شعله است. زمان نبرد فرا رسیده!', false, 15),
((SELECT id FROM interactive_stories WHERE title = 'ماجراجویی افسانه‌ای' LIMIT 1), 'magic_sword', 'دریافت شمشیر جادویی', 'جادوگر شمشیر نورانی و درخشانی به شما داد. این شمشیر قدرت خاصی برای شکست اژدها دارد. حالا برای نبرد نهایی آماده هستید!', false, 20),
((SELECT id FROM interactive_stories WHERE title = 'ماجراجویی افسانه‌ای' LIMIT 1), 'victory', 'پیروزی', 'با شمشیر جادویی توانستید اژدها را شکست دهید! اژدها متحول شد و به یک جادوگر مهربان تبدیل شد. قلعه نجات یافت و شما قهرمان مردم شدید!', true, 50),
((SELECT id FROM interactive_stories WHERE title = 'ماجراجویی افسانه‌ای' LIMIT 1), 'defeat', 'شکست', 'متأسفانه بدون تجهیزات مناسب نتوانستید اژدها را شکست دهید. اما تجربه ارزشمندی کسب کردید و می‌توانید دوباره تلاش کنید.', true, -5);

-- Add story nodes for "سفر فضایی" (Space Journey)
INSERT INTO story_nodes (story_id, node_id, title, content, is_ending, score_impact) VALUES
((SELECT id FROM interactive_stories WHERE title = 'سفر فضایی' LIMIT 1), 'start', 'آغاز سفر فضایی', 'شما فضانورد جوانی هستید که تازه وارد کشتی فضایی شده‌اید. مأموریت شما کاوش سیاره‌ای ناشناخته است. ناگهان سیگنال خطری از موتورهای کشتی دریافت می‌کنید.', false, 0),
((SELECT id FROM interactive_stories WHERE title = 'سفر فضایی' LIMIT 1), 'engine_room', 'اتاق موتور', 'وارد اتاق موتور شدید. یکی از موتورهای اصلی دچار نقص شده است. باید سریع تصمیم بگیرید که آیا خودتان تعمیر کنید یا به پایگاه اطلاع دهید.', false, 10),
((SELECT id FROM interactive_stories WHERE title = 'سفر فضایی' LIMIT 1), 'alien_planet', 'سیاره بیگانه', 'به سیاره مرموز رسیدید. سطح سیاره پوشیده از کریستال‌های درخشان است. ناگهان موجودات بیگانه‌ای ظاهر شدند که به نظر دوستانه می‌آیند.', false, 15),
((SELECT id FROM interactive_stories WHERE title = 'سفر فضایی' LIMIT 1), 'repair_success', 'تعمیر موفق', 'با دانش فنی خود توانستید موتور را تعمیر کنید. حالا می‌توانید به مأموریت خود ادامه دهید و به سیاره هدف برسید.', false, 25),
((SELECT id FROM interactive_stories WHERE title = 'سفر فضایی' LIMIT 1), 'alien_friendship', 'دوستی با بیگانگان', 'با موجودات بیگانه ارتباط برقرار کردید. آنها دانش پیشرفته‌ای از علوم فضایی داشتند و آن را با شما به اشتراک گذاشتند. این کشف تاریخی است!', true, 60),
((SELECT id FROM interactive_stories WHERE title = 'سفر فضایی' LIMIT 1), 'emergency_landing', 'فرود اضطراری', 'مجبور به فرود اضطراری شدید اما خوشبختانه سالم ماندید. تیم نجات در راه است و شما تجربه ارزشمندی کسب کردید.', true, 10);

-- Add story nodes for "راز کارآگاه" (Detective Mystery)
INSERT INTO story_nodes (story_id, node_id, title, content, is_ending, score_impact) VALUES
((SELECT id FROM interactive_stories WHERE title = 'راز کارآگاه' LIMIT 1), 'start', 'شروع تحقیقات', 'شما کارآگاه باتجربه‌ای هستید که برای حل پرونده سرقت جواهرات گرانبها به عمارت بزرگی آمده‌اید. صاحب خانه می‌گوید جواهرات دیشب ناپدید شده‌اند.', false, 0),
((SELECT id FROM interactive_stories WHERE title = 'راز کارآگاه' LIMIT 1), 'library', 'کتابخانه', 'وارد کتابخانه عمارت شدید. پشت یکی از کتاب‌ها نامه‌ای پیدا کردید که در آن تهدیدی علیه صاحب خانه نوشته شده است. این سرنخ مهمی است!', false, 15),
((SELECT id FROM interactive_stories WHERE title = 'راز کارآگاه' LIMIT 1), 'garden', 'باغ عمارت', 'در باغ ردپای مشکوکی پیدا کردید که به دیوار عمارت منتهی می‌شود. به نظر می‌رسد کسی از این طریق وارد شده باشد.', false, 15),
((SELECT id FROM interactive_stories WHERE title = 'راز کارآگاه' LIMIT 1), 'interrogation', 'بازجویی از خدمه', 'شروع به بازجویی از خدمه کردید. یکی از خدمتکاران رفتار مشکوکی دارد و نمی‌تواند برای دیشب شاهد ارائه دهد.', false, 20),
((SELECT id FROM interactive_stories WHERE title = 'راز کارآگاه' LIMIT 1), 'case_solved', 'حل پرونده', 'با ترکیب تمام سرنخ‌ها توانستید مجرم را پیدا کنید! خدمتکار در تبانی با دزدان بیرونی جواهرات را دزدیده بود. پرونده با موفقیت حل شد!', true, 50),
((SELECT id FROM interactive_stories WHERE title = 'راز کارآگاه' LIMIT 1), 'wrong_suspect', 'مظنون اشتباه', 'متأسفانه مظنون اشتباهی را انتخاب کردید. پرونده هنوز حل نشده اما تجربه خوبی کسب کردید.', true, 5);

-- Add story choices for Fantasy Adventure
INSERT INTO story_choices (node_id, choice_text, next_node_id, score_impact, order_index) VALUES
-- Start node choices for Fantasy Adventure
((SELECT id FROM story_nodes WHERE node_id = 'start' AND story_id = (SELECT id FROM interactive_stories WHERE title = 'ماجراجویی افسانه‌ای' LIMIT 1)), 'به کلبه نزدیک شوید', 'cottage', 5, 1),
((SELECT id FROM story_nodes WHERE node_id = 'start' AND story_id = (SELECT id FROM interactive_stories WHERE title = 'ماجراجویی افسانه‌ای' LIMIT 1)), 'مستقیم به سمت صدای اژدها بروید', 'dragon_lair', 10, 2),

-- Cottage choices
((SELECT id FROM story_nodes WHERE node_id = 'cottage' AND story_id = (SELECT id FROM interactive_stories WHERE title = 'ماجراجویی افسانه‌ای' LIMIT 1)), 'شمشیر جادویی را بپذیرید', 'magic_sword', 15, 1),
((SELECT id FROM story_nodes WHERE node_id = 'cottage' AND story_id = (SELECT id FROM interactive_stories WHERE title = 'ماجراجویی افسانه‌ای' LIMIT 1)), 'بدون کمک به نبرد بروید', 'dragon_lair', 5, 2),

-- Magic sword choices
((SELECT id FROM story_nodes WHERE node_id = 'magic_sword' AND story_id = (SELECT id FROM interactive_stories WHERE title = 'ماجراجویی افسانه‌ای' LIMIT 1)), 'با شمشیر جادویی به نبرد بروید', 'victory', 30, 1),

-- Dragon lair choices
((SELECT id FROM story_nodes WHERE node_id = 'dragon_lair' AND story_id = (SELECT id FROM interactive_stories WHERE title = 'ماجراجویی افسانه‌ای' LIMIT 1)), 'با شجاعت حمله کنید', 'defeat', -10, 1),
((SELECT id FROM story_nodes WHERE node_id = 'dragon_lair' AND story_id = (SELECT id FROM interactive_stories WHERE title = 'ماجراجویی افسانه‌ای' LIMIT 1)), 'برگردید و کمک بگیرید', 'cottage', 0, 2);

-- Add story choices for Space Journey
INSERT INTO story_choices (node_id, choice_text, next_node_id, score_impact, order_index) VALUES
-- Start node choices for Space Journey
((SELECT id FROM story_nodes WHERE node_id = 'start' AND story_id = (SELECT id FROM interactive_stories WHERE title = 'سفر فضایی' LIMIT 1)), 'به اتاق موتور بروید', 'engine_room', 5, 1),
((SELECT id FROM story_nodes WHERE node_id = 'start' AND story_id = (SELECT id FROM interactive_stories WHERE title = 'سفر فضایی' LIMIT 1)), 'فرود اضطراری انجام دهید', 'emergency_landing', 0, 2),

-- Engine room choices
((SELECT id FROM story_nodes WHERE node_id = 'engine_room' AND story_id = (SELECT id FROM interactive_stories WHERE title = 'سفر فضایی' LIMIT 1)), 'خودتان موتور را تعمیر کنید', 'repair_success', 20, 1),
((SELECT id FROM story_nodes WHERE node_id = 'engine_room' AND story_id = (SELECT id FROM interactive_stories WHERE title = 'سفر فضایی' LIMIT 1)), 'به پایگاه اطلاع دهید', 'emergency_landing', -5, 2),

-- Repair success choices
((SELECT id FROM story_nodes WHERE node_id = 'repair_success' AND story_id = (SELECT id FROM interactive_stories WHERE title = 'سفر فضایی' LIMIT 1)), 'به سیاره هدف ادامه دهید', 'alien_planet', 15, 1),

-- Alien planet choices
((SELECT id FROM story_nodes WHERE node_id = 'alien_planet' AND story_id = (SELECT id FROM interactive_stories WHERE title = 'سفر فضایی' LIMIT 1)), 'با بیگانگان ارتباط برقرار کنید', 'alien_friendship', 25, 1),
((SELECT id FROM story_nodes WHERE node_id = 'alien_planet' AND story_id = (SELECT id FROM interactive_stories WHERE title = 'سفر فضایی' LIMIT 1)), 'با احتیاط به کشتی برگردید', 'emergency_landing', 10, 2);

-- Add story choices for Detective Mystery
INSERT INTO story_choices (node_id, choice_text, next_node_id, score_impact, order_index) VALUES
-- Start node choices for Detective Mystery
((SELECT id FROM story_nodes WHERE node_id = 'start' AND story_id = (SELECT id FROM interactive_stories WHERE title = 'راز کارآگاه' LIMIT 1)), 'کتابخانه را بررسی کنید', 'library', 10, 1),
((SELECT id FROM story_nodes WHERE node_id = 'start' AND story_id = (SELECT id FROM interactive_stories WHERE title = 'راز کارآگاه' LIMIT 1)), 'باغ عمارت را بگردید', 'garden', 10, 2),

-- Library choices
((SELECT id FROM story_nodes WHERE node_id = 'library' AND story_id = (SELECT id FROM interactive_stories WHERE title = 'راز کارآگاه' LIMIT 1)), 'خدمه را بازجویی کنید', 'interrogation', 15, 1),
((SELECT id FROM story_nodes WHERE node_id = 'library' AND story_id = (SELECT id FROM interactive_stories WHERE title = 'راز کارآگاه' LIMIT 1)), 'باغ را هم بررسی کنید', 'garden', 5, 2),

-- Garden choices
((SELECT id FROM story_nodes WHERE node_id = 'garden' AND story_id = (SELECT id FROM interactive_stories WHERE title = 'راز کارآگاه' LIMIT 1)), 'خدمه را بازجویی کنید', 'interrogation', 15, 1),
((SELECT id FROM story_nodes WHERE node_id = 'garden' AND story_id = (SELECT id FROM interactive_stories WHERE title = 'راز کارآگاه' LIMIT 1)), 'کتابخانه را هم بررسی کنید', 'library', 5, 2),

-- Interrogation choices
((SELECT id FROM story_nodes WHERE node_id = 'interrogation' AND story_id = (SELECT id FROM interactive_stories WHERE title = 'راز کارآگاه' LIMIT 1)), 'خدمتکار مشکوک را متهم کنید', 'case_solved', 30, 1),
((SELECT id FROM story_nodes WHERE node_id = 'interrogation' AND story_id = (SELECT id FROM interactive_stories WHERE title = 'راز کارآگاه' LIMIT 1)), 'صاحب خانه را متهم کنید', 'wrong_suspect', -15, 2);