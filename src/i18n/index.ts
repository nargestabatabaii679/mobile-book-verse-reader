
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      // Header
      library_title: "BookVerse Library",
      search_placeholder: "Search books...",
      language: "Language",
      
      // Filters
      all_categories: "All Categories",
      filter_by_category: "Filter by Category",
      sort_by: "Sort by",
      title_asc: "Title (A-Z)",
      title_desc: "Title (Z-A)",
      pages_asc: "Pages (Low to High)",
      pages_desc: "Pages (High to Low)",
      page_range: "Page Range",
      age_range: "Age Range",
      clear_filters: "Clear Filters",
      active_filters: "Active Filters",
      
      // Age ranges
      "0-6": "0-6 years",
      "7-12": "7-12 years", 
      "13-17": "13-17 years",
      "18+": "18+ years",
      
      // Book details
      author: "Author",
      pages: "Pages",
      published: "Published",
      rating: "Rating",
      isbn: "ISBN",
      description: "Description",
      close: "Close",
      
      // Messages
      no_books_found: "No books found",
      book_not_found: "Book not found",
      book_not_found_desc: "The requested book could not be found.",
      loading: "Loading..."
    }
  },
  fa: {
    translation: {
      // Header
      library_title: "کتابخانه کتاب‌ورس",
      search_placeholder: "جستجوی کتاب...",
      language: "زبان",
      
      // Filters
      all_categories: "همه دسته‌ها",
      filter_by_category: "فیلتر بر اساس دسته",
      sort_by: "مرتب‌سازی",
      title_asc: "عنوان (الف-ی)",
      title_desc: "عنوان (ی-الف)",
      pages_asc: "صفحات (کم به زیاد)",
      pages_desc: "صفحات (زیاد به کم)",
      page_range: "بازه صفحات",
      age_range: "گروه سنی",
      clear_filters: "پاک کردن فیلترها",
      active_filters: "فیلترهای فعال",
      
      // Age ranges
      "0-6": "۰-۶ سال",
      "7-12": "۷-۱۲ سال",
      "13-17": "۱۳-۱۷ سال", 
      "18+": "۱۸+ سال",
      
      // Book details
      author: "نویسنده",
      pages: "صفحات",
      published: "انتشار",
      rating: "امتیاز",
      isbn: "شابک",
      description: "توضیحات",
      close: "بستن",
      
      // Messages
      no_books_found: "کتابی یافت نشد",
      book_not_found: "کتاب یافت نشد",
      book_not_found_desc: "کتاب درخواستی یافت نشد.",
      loading: "در حال بارگذاری..."
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'fa',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
