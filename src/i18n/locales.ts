
export const locales = {
  fa: {
    // Navigation
    'nav.home': 'خانه',
    'nav.library': 'کتابخانه',
    'nav.admin': 'پنل مدیریت',
    
    // Book actions
    'book.read': 'مطالعه کتاب',
    'book.download': 'دانلود',
    'book.nextPage': 'صفحه بعد',
    'book.prevPage': 'صفحه قبل',
    'book.zoom': 'زوم',
    'book.pages': 'صفحه',
    
    // Filters
    'filter.all': 'همه',
    'filter.categories': 'دسته‌ها',
    'filter.search': 'جستجو',
    'filter.author': 'نویسنده',
    
    // Admin
    'admin.login': 'ورود',
    'admin.dashboard': 'داشبورد',
    'admin.addBook': 'افزودن کتاب',
    'admin.manageBooks': 'مدیریت کتاب‌ها',
    'admin.settings': 'تنظیمات',
    'admin.soundSettings': 'تنظیمات صدا',
    
    // Messages
    'message.loading': 'در حال بارگذاری...',
    'message.pageFlipping': 'در حال ورق زدن...',
    'message.bookOpening': 'در حال باز کردن کتاب...'
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.library': 'Library',
    'nav.admin': 'Admin Panel',
    
    // Book actions
    'book.read': 'Read Book',
    'book.download': 'Download',
    'book.nextPage': 'Next Page',
    'book.prevPage': 'Previous Page',
    'book.zoom': 'Zoom',
    'book.pages': 'Pages',
    
    // Filters
    'filter.all': 'All',
    'filter.categories': 'Categories',
    'filter.search': 'Search',
    'filter.author': 'Author',
    
    // Admin
    'admin.login': 'Login',
    'admin.dashboard': 'Dashboard',
    'admin.addBook': 'Add Book',
    'admin.manageBooks': 'Manage Books',
    'admin.settings': 'Settings',
    'admin.soundSettings': 'Sound Settings',
    
    // Messages
    'message.loading': 'Loading...',
    'message.pageFlipping': 'Flipping page...',
    'message.bookOpening': 'Opening book...'
  }
};

export type LocaleKey = keyof typeof locales.fa;
export type SupportedLocale = keyof typeof locales;
