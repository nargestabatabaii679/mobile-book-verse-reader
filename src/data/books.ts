import { Book } from '@/types';

export const books: Book[] = [
  {
    id: "1",
    title: "ماجراهای تنگ ناری",
    author: "احمد خیام نکویی",
    category: "ادبیات کودک",
    pages: 250,
    coverUrl: "https://via.placeholder.com/300x400?text=ماجراهای+تنگ+ناری",
    description: "داستان ماجراجویی پسری در تنگ ناری و کشف اسرار طبیعت",
    publishYear: 1398,
    rating: 4.5,
    isbn: "978-600-123-456-7",
    ageRange: "7-10 سال",
    translator: "ترجمه نیازی ندارد"
  },
  {
    id: "2",
    title: "جزیره گنج",
    author: "رابرت لویی استیونسن",
    category: "ماجراجویی",
    pages: 320,
    coverUrl: "https://via.placeholder.com/300x400?text=جزیره+گنج",
    description: "ماجراجویی جیم هاوکینز و جستجو برای گنج",
    publishYear: 1882,
    rating: 4.8,
    isbn: "978-600-234-567-8",
    ageRange: "11-14 سال",
    translator: "محمد قاضی"
  },
  {
    id: "3",
    title: "علوم طبیعی برای کودکان",
    author: "دکتر سارا احمدی",
    category: "علمی",
    pages: 180,
    coverUrl: "https://via.placeholder.com/300x400?text=علوم+طبیعی",
    description: "آشنایی کودکان با اصول اولیه علوم طبیعی",
    publishYear: 1400,
    rating: 4.2,
    isbn: "978-600-345-678-9",
    ageRange: "7-10 سال"
  },
  {
    id: "4",
    title: "تاریخ ایران باستان",
    author: "غلامحسین یوسفی",
    category: "تاریخی",
    pages: 420,
    coverUrl: "https://via.placeholder.com/300x400?text=تاریخ+ایران",
    description: "مروری بر تاریخ ایران از آغاز تا دوره اسلامی",
    publishYear: 1399,
    rating: 4.6,
    isbn: "978-600-456-789-0",
    ageRange: "15+ سال"
  },
  {
    id: "5",
    title: "آموزش زبان انگلیسی",
    author: "مریم رضوی",
    category: "آموزشی",
    pages: 200,
    coverUrl: "https://via.placeholder.com/300x400?text=آموزش+انگلیسی",
    description: "کتاب آموزش زبان انگلیسی برای مبتدیان",
    publishYear: 1401,
    rating: 4.0,
    isbn: "978-600-567-890-1",
    ageRange: "11-14 سال"
  },
  {
    id: "6",
    title: "قصه‌های شب",
    author: "عفت داوری",
    category: "ادبیات کودک",
    pages: 150,
    coverUrl: "https://via.placeholder.com/300x400?text=قصه‌های+شب",
    description: "مجموعه قصه‌های شب برای کودکان",
    publishYear: 1397,
    rating: 4.3,
    isbn: "978-600-678-901-2",
    ageRange: "3-6 سال"
  },
  {
    id: "7",
    title: "فیزیک برای نوجوانان",
    author: "دکتر حسین کریمی",
    category: "علمی",
    pages: 300,
    coverUrl: "https://via.placeholder.com/300x400?text=فیزیک+نوجوانان",
    description: "آشنایی با مفاهیم پایه فیزیک",
    publishYear: 1402,
    rating: 4.4,
    isbn: "978-600-789-012-3",
    ageRange: "15+ سال"
  },
  {
    id: "8",
    title: "ماجراهای علی کوچولو",
    author: "فاطمه موسوی",
    category: "ادبیات کودک",
    pages: 120,
    coverUrl: "https://via.placeholder.com/300x400?text=علی+کوچولو",
    description: "داستان‌های جذاب علی کوچولو",
    publishYear: 1400,
    rating: 4.1,
    isbn: "978-600-890-123-4",
    ageRange: "3-6 سال"
  },
  {
    id: "9",
    title: "تاریخ جهان کودکان",
    author: "رضا تاریخی",
    category: "تاریخی",
    pages: 280,
    coverUrl: "https://via.placeholder.com/300x400?text=تاریخ+جهان",
    description: "آشنایی کودکان با تاریخ جهان",
    publishYear: 1401,
    rating: 4.5,
    isbn: "978-600-901-234-5",
    ageRange: "11-14 سال"
  },
  {
    id: "10",
    title: "ریاضی خلاق",
    author: "مهدی عدلی",
    category: "آموزشی",
    pages: 220,
    coverUrl: "https://via.placeholder.com/300x400?text=ریاضی+خلاق",
    description: "روش‌های خلاقانه آموزش ریاضی",
    publishYear: 1399,
    rating: 4.2,
    isbn: "978-600-012-345-6",
    ageRange: "7-10 سال"
  },
  {
    id: "magical-forest",
    title: "جنگل جادویی",
    author: "مریم صفایی",
    category: "داستان تعاملی",
    pages: 50,
    coverUrl: "https://via.placeholder.com/300x400?text=جنگل+جادویی",
    description: "ماجراجویی تعاملی در جنگل جادویی پر از موجودات اسرارآمیز",
    publishYear: 1402,
    rating: 4.8,
    isbn: "978-600-111-222-3",
    ageRange: "7-10 سال",
    interactiveStoryId: "magical-forest"
  },
  // چهار کتاب تعاملی جدید
  {
    id: "ancient-cave",
    title: "راز غار کهن",
    author: "احمد باستانی",
    category: "داستان تعاملی",
    pages: 45,
    coverUrl: "https://via.placeholder.com/300x400?text=راز+غار+کهن",
    description: "ماجراجویی تعاملی یک باستان‌شناس در غاری مرموز پر از رازهای کهن و گنج‌های پنهان",
    publishYear: 1403,
    rating: 4.7,
    isbn: "978-600-555-111-1",
    ageRange: "11-14 سال",
    interactiveStoryId: "ancient-cave"
  },
  {
    id: "space-journey",
    title: "سفر به ستاره‌ها",
    author: "سارا فضایی",
    category: "داستان تعاملی",
    pages: 40,
    coverUrl: "https://via.placeholder.com/300x400?text=سفر+به+ستاره‌ها",
    description: "ماجراجویی علمی‌تخیلی فضانوردی که با موجودات بیگانه ملاقات می‌کند و فناوری‌های جدید کشف می‌کند",
    publishYear: 1403,
    rating: 4.9,
    isbn: "978-600-555-222-2",
    ageRange: "11-14 سال",
    interactiveStoryId: "space-journey"
  },
  {
    id: "caravanserai-mystery",
    title: "معمای کاروانسرا",
    author: "حسین تاریخی",
    category: "داستان تعاملی",
    pages: 55,
    coverUrl: "https://via.placeholder.com/300x400?text=معمای+کاروانسرا",
    description: "کارآگاهی تاریخی در دوره صفویه برای حل معمای گنج دزدیده‌شده از کاروانسرا",
    publishYear: 1403,
    rating: 4.6,
    isbn: "978-600-555-333-3",
    ageRange: "15+ سال",
    interactiveStoryId: "caravanserai-mystery"
  },
  {
    id: "haunted-house",
    title: "خانه تسخیرشده",
    author: "فاطمه ترسناک",
    category: "داستان تعاملی",
    pages: 50,
    coverUrl: "https://via.placeholder.com/300x400?text=خانه+تسخیرشده",
    description: "ماجراجویی هیجان‌انگیز در خانه‌ای مرموز برای کشف رازهای پنهان و حل معماهای ترسناک",
    publishYear: 1403,
    rating: 4.5,
    isbn: "978-600-555-444-4",
    ageRange: "15+ سال",
    interactiveStoryId: "haunted-house"
  }
];
