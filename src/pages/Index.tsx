
import React, { useState, useEffect, useMemo } from 'react';
import { Book } from '@/types';
import { useTranslation } from 'react-i18next';
import { useToast } from '@/hooks/use-toast';
import { books } from '@/data/books';
import BookReader from '@/components/book-reader/BookReader';
import FilterTabs from '@/components/FilterTabs';
import Header from '@/components/layout/Header';
import { LibraryShelfView } from '@/components/library/LibraryShelfView';
import { FilterOptions } from '@/components/FilterSidebar';

const Index = () => {
  // State management
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categories, setCategories] = useState<string[]>([]);
  const [filters, setFilters] = useState<FilterOptions>({ 
    search: '', 
    authorSearch: '',
    categories: [],
    sortBy: '',
    minPages: 0,
    maxPages: 1000,
    ageRange: ''
  });
  const [isLoading, setIsLoading] = useState(true);
  const [activeFiltersCount, setActiveFiltersCount] = useState(0);
  
  const { t, i18n } = useTranslation();
  const { toast } = useToast();

  useEffect(() => {
    let count = 0;
    if (filters.search) count++;
    if (filters.authorSearch) count++;
    if (filters.categories.length > 0) count += 1;
    if (filters.sortBy) count++;
    if (filters.minPages !== undefined && filters.minPages > 0) count++;
    if (filters.maxPages !== undefined && filters.maxPages < 1000) count++;
    if (filters.ageRange) count++;
    
    setActiveFiltersCount(count);
  }, [filters]);

  const processedBooks = useMemo(() => {
    let result = [...books];
    
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(book => 
        book.title.toLowerCase().includes(searchLower)
      );
    }
    
    if (filters.authorSearch) {
      const authorSearchLower = filters.authorSearch.toLowerCase();
      result = result.filter(book => 
        book.author.toLowerCase().includes(authorSearchLower)
      );
    }
    
    if (filters.categories.length > 0) {
      result = result.filter(book => filters.categories.includes(book.category));
    }
    
    if (filters.minPages !== undefined || filters.maxPages !== undefined) {
      result = result.filter(book => {
        if (filters.minPages !== undefined && book.pages < filters.minPages) return false;
        if (filters.maxPages !== undefined && book.pages > filters.maxPages) return false;
        return true;
      });
    }
    
    if (filters.ageRange) {
      result = result.filter(book => {
        if (filters.ageRange === "0-6") {
          return book.pages < 30;
        }
        else if (filters.ageRange === "7-12") {
          return book.pages >= 30 && book.pages < 100;
        }
        else if (filters.ageRange === "13-17") {
          return book.pages >= 100 && book.pages < 300;
        }
        else if (filters.ageRange === "18+") {
          return book.pages >= 300;
        }
        return true;
      });
    }
    
    if (filters.sortBy) {
      switch(filters.sortBy) {
        case 'title-asc':
          result.sort((a, b) => a.title.localeCompare(b.title));
          break;
        case 'title-desc':
          result.sort((a, b) => b.title.localeCompare(a.title));
          break;
        case 'pages-asc':
          result.sort((a, b) => a.pages - b.pages);
          break;
        case 'pages-desc':
          result.sort((a, b) => b.pages - a.pages);
          break;
      }
    }
    
    return result;
  }, [filters]);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setFilteredBooks(processedBooks);
      setIsLoading(false);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [processedBooks]);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const bookId = urlParams.get('book');
    
    if (bookId) {
      const book = books.find(b => b.id === bookId);
      if (book) {
        setSelectedBook(book);
        setIsModalOpen(true);
      } else {
        toast({
          title: t('book_not_found'),
          description: t('book_not_found_desc'),
          variant: "destructive"
        });
      }
    }
    
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, [t, toast]);

  useEffect(() => {
    const uniqueCategories = Array.from(new Set(books.map(book => book.category)));
    setCategories(uniqueCategories);
  }, []);

  useEffect(() => {
    const direction = i18n.language === 'fa' ? 'rtl' : 'ltr';
    document.documentElement.dir = direction;
    document.documentElement.lang = i18n.language;
    
    if (direction === 'rtl') {
      document.body.classList.add('font-farsi', 'rtl');
    } else {
      document.body.classList.remove('font-farsi', 'rtl');
    }
  }, [i18n.language]);

  const handleSelectBook = (book: Book) => {
    setSelectedBook(book);
    setIsModalOpen(true);
    
    const url = new URL(window.location.href);
    url.searchParams.set('book', book.id);
    window.history.pushState({}, '', url);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedBook(null);
    
    const url = new URL(window.location.href);
    url.searchParams.delete('book');
    window.history.pushState({}, '', url);
  };

  const handleFilterChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
  };

  return (
    <div 
      className="min-h-screen overflow-x-hidden"
      style={{
        background: 'linear-gradient(180deg, #8B4513 0%, #A0522D 50%, #8B4513 100%)',
        backgroundImage: `
          radial-gradient(circle at 20% 50%, rgba(139, 69, 19, 0.3) 0%, transparent 50%),
          radial-gradient(circle at 80% 50%, rgba(160, 82, 45, 0.3) 0%, transparent 50%),
          linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.1) 50%, transparent 100%)
        `
      }}
    >
      <div className="container mx-auto px-4 py-6">
        {/* عنوان کتابخانه */}
        <div className="text-center py-8">
          <h1 className="text-5xl font-bold text-white drop-shadow-lg mb-4" style={{ fontFamily: 'Vazir, IRANSans, sans-serif' }}>
            📚 کتابخانه دیجیتال چندنقطه‌ای
          </h1>
          <p className="text-white/80 text-lg">کتابخانه‌ای برای همه علاقه‌مندان کتاب و مطالعه</p>
        </div>
        
        <Header />
        
        <FilterTabs 
          categories={categories}
          onFilterChange={handleFilterChange}
          activeFiltersCount={activeFiltersCount}
          currentFilters={filters}
          minPages={0}
          maxPages={1000}
        />
        
        <div className="flex flex-col mt-4">
          <div className="w-full">
            <LibraryShelfView 
              books={filteredBooks}
              isLoading={isLoading}
              onSelectBook={handleSelectBook}
            />
          </div>
        </div>
      </div>
      
      <BookReader
        book={selectedBook}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default Index;
