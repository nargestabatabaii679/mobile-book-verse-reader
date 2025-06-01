import React, { useState, useEffect, useMemo } from 'react';
import { Book } from '@/types';
import { useTranslation } from 'react-i18next';
import { useToast } from '@/hooks/use-toast';
import { books } from '@/data/books';
import BookReader from '@/components/book-reader/BookReader';
import FilterTabs from '@/components/FilterTabs';
import Header from '@/components/layout/Header';
import BookList from '@/components/books/BookList';
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
  
  // Hooks
  const { t, i18n } = useTranslation();
  const { toast } = useToast();

  // Count active filters
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

  // Memoize filtered books for better performance
  const processedBooks = useMemo(() => {
    let result = [...books];
    
    // Apply search filter for book title
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(book => 
        book.title.toLowerCase().includes(searchLower)
      );
    }
    
    // Apply search filter for author
    if (filters.authorSearch) {
      const authorSearchLower = filters.authorSearch.toLowerCase();
      result = result.filter(book => 
        book.author.toLowerCase().includes(authorSearchLower)
      );
    }
    
    // Apply category filters
    if (filters.categories.length > 0) {
      result = result.filter(book => filters.categories.includes(book.category));
    }
    
    // Apply page range filter
    if (filters.minPages !== undefined || filters.maxPages !== undefined) {
      result = result.filter(book => {
        if (filters.minPages !== undefined && book.pages < filters.minPages) return false;
        if (filters.maxPages !== undefined && book.pages > filters.maxPages) return false;
        return true;
      });
    }
    
    // Apply age range filter
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
    
    // Apply sorting
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

  // Set filtered books from memoized result
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setFilteredBooks(processedBooks);
      setIsLoading(false);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [processedBooks]);

  // Check URL parameters for direct book opening
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

  // Extract unique categories from books
  useEffect(() => {
    const uniqueCategories = Array.from(new Set(books.map(book => book.category)));
    setCategories(uniqueCategories);
  }, []);

  // Set page direction based on language
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

  // Handler functions
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 overflow-x-hidden">
      <div className="container mx-auto px-4 py-6">
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
            <div className="rounded-xl shadow-2xl p-6 min-h-[70vh] bg-white/5 backdrop-blur-lg border border-white/10 relative">
              <BookList 
                books={filteredBooks}
                isLoading={isLoading}
                onSelectBook={handleSelectBook}
              />
            </div>
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
