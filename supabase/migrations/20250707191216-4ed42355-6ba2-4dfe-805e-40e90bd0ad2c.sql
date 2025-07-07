-- Add story nodes for "خانه تسخیر شده" story
INSERT INTO story_nodes (story_id, node_id, title, content, is_ending, score_impact) VALUES
('13e2cdda-8580-4b9f-92f8-333b3928ea38', 'start', 'ورود به خانه تسخیر شده', 'شما در مقابل خانه‌ای قدیمی و ترسناک ایستاده‌اید. باد سردی می‌وزد و صدای عجیبی از داخل خانه می‌آید. درب ورودی نیمه‌باز است و نوری ضعیف از پنجره‌ها بیرون می‌زند.', false, 0),
('13e2cdda-8580-4b9f-92f8-333b3928ea38', 'enter_house', 'داخل خانه', 'وارد خانه شدید. فضا تاریک و خاک‌آلود است. صدای قدم‌هایتان در سکوت طنین‌انداز می‌شود. دو مسیر پیش رویتان است: پله‌هایی که به طبقه بالا می‌رود و راهرویی که به عمق خانه منتهی می‌شود.', false, 5),
('13e2cdda-8580-4b9f-92f8-333b3928ea38', 'upstairs', 'طبقه بالا', 'از پله‌ها بالا رفتید. چوب پله‌ها زیر پایتان می‌ترقد. در طبقه بالا چندین اتاق است. ناگهان صدای غریبی از یکی از اتاق‌ها می‌آید.', false, 10),
('13e2cdda-8580-4b9f-92f8-333b3928ea38', 'corridor', 'راهروی تاریک', 'وارد راهروی طولانی شدید. دیوارها پوشیده از تابلوهای قدیمی است که چشمانشان شما را تعقیب می‌کند. در انتهای راهرو نوری می‌درخشد.', false, 10),
('13e2cdda-8580-4b9f-92f8-333b3928ea38', 'investigate_room', 'بررسی اتاق', 'وارد اتاقی شدید که صدا از آنجا می‌آمد. اتاق خالی است اما یک صندوق قدیمی در گوشه قرار دارد. صندوق قفل است اما کلیدی در کنارش پیدا می‌کنید.', false, 15),
('13e2cdda-8580-4b9f-92f8-333b3928ea38', 'light_source', 'منبع نور', 'به سمت نور رفتید و متوجه شدید که از یک شمع بزرگ می‌آید. شمع روی میزی قرار دارد که اسناد مرموزی روی آن پخش شده است.', false, 15),
('13e2cdda-8580-4b9f-92f8-333b3928ea38', 'open_chest', 'باز کردن صندوق', 'صندوق را با کلید باز کردید. درون آن یک کتاب قدیمی و جواهری درخشان پیدا کردید. ناگهان صدای پایی از پله‌ها می‌آید!', false, 20),
('13e2cdda-8580-4b9f-92f8-333b3928ea38', 'read_documents', 'خواندن اسناد', 'اسناد را بررسی کردید و متوجه شدید که خانه متعلق به خانواده‌ای است که سال‌ها پیش ناپدید شده‌اند. در اسناد نقشه‌ای از خانه و راز مخفی‌اش پیدا کردید.', false, 20),
('13e2cdda-8580-4b9f-92f8-333b3928ea38', 'hide', 'پنهان شدن', 'به سرعت خود را پنهان کردید. صدای قدم‌ها نزدیک‌تر می‌شود... و سپس دور می‌شود. با احتیاط از مخفیگاهتان بیرون آمدید.', false, 25),
('13e2cdda-8580-4b9f-92f8-333b3928ea38', 'escape_success', 'فرار موفق', 'با کتاب و جواهر در دست، از خانه فرار کردید. راز خانه را کشف کردید و گنجی ارزشمند پیدا کردید. ماجراجویی شما با موفقیت به پایان رسید!', true, 50),
('13e2cdda-8580-4b9f-92f8-333b3928ea38', 'discovery_ending', 'کشف راز', 'با استفاده از نقشه، راه مخفی خانه را پیدا کردید و راز ناپدید شدن خانواده را کشف کردید. این دانش ارزشمند برای شما خواهد بود.', true, 40),
('13e2cdda-8580-4b9f-92f8-333b3928ea38', 'caught_ending', 'دستگیری', 'متأسفانه نتوانستید فرار کنید و توسط روح خانه دستگیر شدید. شاید بار دیگر شانس بیشتری داشته باشید...', true, -10);

-- Add story choices
INSERT INTO story_choices (node_id, choice_text, next_node_id, score_impact, order_index) VALUES
-- Start node choices
((SELECT id FROM story_nodes WHERE node_id = 'start' AND story_id = '13e2cdda-8580-4b9f-92f8-333b3928ea38'), 'وارد خانه شوید', 'enter_house', 5, 1),
((SELECT id FROM story_nodes WHERE node_id = 'start' AND story_id = '13e2cdda-8580-4b9f-92f8-333b3928ea38'), 'دور خانه بگردید', 'enter_house', 0, 2),

-- Enter house choices
((SELECT id FROM story_nodes WHERE node_id = 'enter_house' AND story_id = '13e2cdda-8580-4b9f-92f8-333b3928ea38'), 'به طبقه بالا بروید', 'upstairs', 10, 1),
((SELECT id FROM story_nodes WHERE node_id = 'enter_house' AND story_id = '13e2cdda-8580-4b9f-92f8-333b3928ea38'), 'راهروی تاریک را بررسی کنید', 'corridor', 10, 2),

-- Upstairs choices
((SELECT id FROM story_nodes WHERE node_id = 'upstairs' AND story_id = '13e2cdda-8580-4b9f-92f8-333b3928ea38'), 'صدا را بررسی کنید', 'investigate_room', 15, 1),
((SELECT id FROM story_nodes WHERE node_id = 'upstairs' AND story_id = '13e2cdda-8580-4b9f-92f8-333b3928ea38'), 'سریع پایین بروید', 'corridor', 5, 2),

-- Corridor choices
((SELECT id FROM story_nodes WHERE node_id = 'corridor' AND story_id = '13e2cdda-8580-4b9f-92f8-333b3928ea38'), 'به سمت نور بروید', 'light_source', 15, 1),
((SELECT id FROM story_nodes WHERE node_id = 'corridor' AND story_id = '13e2cdda-8580-4b9f-92f8-333b3928ea38'), 'به طبقه بالا بازگردید', 'upstairs', 0, 2),

-- Investigate room choices
((SELECT id FROM story_nodes WHERE node_id = 'investigate_room' AND story_id = '13e2cdda-8580-4b9f-92f8-333b3928ea38'), 'صندوق را باز کنید', 'open_chest', 20, 1),
((SELECT id FROM story_nodes WHERE node_id = 'investigate_room' AND story_id = '13e2cdda-8580-4b9f-92f8-333b3928ea38'), 'از اتاق خارج شوید', 'corridor', 0, 2),

-- Light source choices
((SELECT id FROM story_nodes WHERE node_id = 'light_source' AND story_id = '13e2cdda-8580-4b9f-92f8-333b3928ea38'), 'اسناد را بخوانید', 'read_documents', 20, 1),
((SELECT id FROM story_nodes WHERE node_id = 'light_source' AND story_id = '13e2cdda-8580-4b9f-92f8-333b3928ea38'), 'به طبقه بالا بروید', 'upstairs', 0, 2),

-- Open chest choices
((SELECT id FROM story_nodes WHERE node_id = 'open_chest' AND story_id = '13e2cdda-8580-4b9f-92f8-333b3928ea38'), 'پنهان شوید', 'hide', 25, 1),
((SELECT id FROM story_nodes WHERE node_id = 'open_chest' AND story_id = '13e2cdda-8580-4b9f-92f8-333b3928ea38'), 'سریع فرار کنید', 'escape_success', 30, 2),

-- Read documents choices
((SELECT id FROM story_nodes WHERE node_id = 'read_documents' AND story_id = '13e2cdda-8580-4b9f-92f8-333b3928ea38'), 'از نقشه استفاده کنید', 'discovery_ending', 40, 1),
((SELECT id FROM story_nodes WHERE node_id = 'read_documents' AND story_id = '13e2cdda-8580-4b9f-92f8-333b3928ea38'), 'سریع فرار کنید', 'escape_success', 20, 2),

-- Hide choices
((SELECT id FROM story_nodes WHERE node_id = 'hide' AND story_id = '13e2cdda-8580-4b9f-92f8-333b3928ea38'), 'با احتیاط فرار کنید', 'escape_success', 30, 1),
((SELECT id FROM story_nodes WHERE node_id = 'hide' AND story_id = '13e2cdda-8580-4b9f-92f8-333b3928ea38'), 'بیشتر منتظر بمانید', 'caught_ending', -20, 2);