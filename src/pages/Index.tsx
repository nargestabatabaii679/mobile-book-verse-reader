
import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import BookList from '@/components/books/BookList';
import FilterTabs from '@/components/FilterTabs';
import { LibraryShelfView } from '@/components/library/LibraryShelfView';
import { books } from '@/data/books';
import { Book, FilterOptions } from '@/types';

const Index = () => {
  const [filteredBooks, setFilteredBooks] = useState<Book[]>(books);
  const [viewMode, setViewMode] = useState<'grid' | 'shelf'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  // Get unique categories from books
  const categories = [...new Set(books.map(book => book.category))];

  // Get min and max pages
  const minPages = Math.min(...books.map(book => book.pages));
  const maxPages = Math.max(...books.map(book => book.pages));

  // Current filters state
  const [currentFilters, setCurrentFilters] = useState<FilterOptions>({
    search: '',
    authorSearch: '',
    categories: [],
    minPages: minPages,
    maxPages: maxPages,
    ageRange: '',
  });

  const handleFilterChange = (filters: FilterOptions) => {
    setCurrentFilters(filters);
    
    let filtered = books;

    // Apply search filter
    if (filters.search && filters.search.trim() !== '') {
      filtered = filtered.filter(book =>
        book.title.toLowerCase().includes(filters.search!.toLowerCase())
      );
    }

    // Apply author search filter
    if (filters.authorSearch && filters.authorSearch.trim() !== '') {
      filtered = filtered.filter(book =>
        book.author.toLowerCase().includes(filters.authorSearch!.toLowerCase())
      );
    }

    // Apply category filter
    if (filters.categories && filters.categories.length > 0) {
      filtered = filtered.filter(book =>
        filters.categories!.includes(book.category)
      );
    }

    // Apply pages filter
    if (filters.minPages !== undefined && filters.maxPages !== undefined) {
      filtered = filtered.filter(book =>
        book.pages >= filters.minPages! && book.pages <= filters.maxPages!
      );
    }

    // Apply age range filter
    if (filters.ageRange && filters.ageRange !== '') {
      // This would need to be implemented based on your book data structure
      // For now, we'll skip this filter
    }

    setFilteredBooks(filtered);
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (currentFilters.search && currentFilters.search.trim() !== '') count++;
    if (currentFilters.authorSearch && currentFilters.authorSearch.trim() !== '') count++;
    if (currentFilters.categories && currentFilters.categories.length > 0) count++;
    if (currentFilters.minPages !== minPages || currentFilters.maxPages !== maxPages) count++;
    if (currentFilters.ageRange && currentFilters.ageRange !== '') count++;
    return count;
  };

  const handleSelectBook = (book: Book) => {
    setSelectedBook(book);
    // You can add more logic here like opening a modal
    console.log('Selected book:', book);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Hyper-realistic background with multiple layers */}
      <div 
        className="fixed inset-0 z-0"
        style={{
          background: `
            radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.2) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(120, 219, 255, 0.15) 0%, transparent 50%),
            linear-gradient(135deg, 
              #0f1419 0%, 
              #1a1f3a 15%, 
              #2d1b3d 30%, 
              #1a1f3a 45%, 
              #0f1419 60%,
              #1e293b 75%,
              #0f172a 100%
            )
          `
        }}
      />

      {/* Realistic paper texture overlay */}
      <div 
        className="fixed inset-0 z-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            radial-gradient(circle at 25% 25%, #fff 1px, transparent 1px),
            radial-gradient(circle at 75% 75%, #fff 0.5px, transparent 0.5px),
            linear-gradient(0deg, 
              transparent 48%, 
              rgba(255,255,255,0.08) 49%, 
              rgba(255,255,255,0.08) 51%, 
              transparent 52%
            ),
            linear-gradient(90deg, 
              transparent 48%, 
              rgba(255,255,255,0.04) 49%, 
              rgba(255,255,255,0.04) 51%, 
              transparent 52%
            )
          `,
          backgroundSize: '30px 30px, 50px 50px, 25px 25px, 40px 40px'
        }}
      />

      {/* Floating particles effect */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-300/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      {/* Main content with glass morphism effect */}
      <div className="relative z-10">
        <Header />
        
        {/* Hero section with hyper-realistic elements */}
        <div className="relative py-16 px-6">
          <div className="max-w-7xl mx-auto text-center">
            {/* Glowing title with realistic text effects */}
            <div className="relative mb-8">
              <h1 
                className="text-6xl md:text-8xl font-bold text-transparent bg-clip-text mb-4 relative"
                style={{
                  backgroundImage: `
                    linear-gradient(135deg, 
                      #60a5fa 0%, 
                      #a78bfa 25%, 
                      #60a5fa 50%, 
                      #34d399 75%, 
                      #60a5fa 100%
                    )
                  `,
                  textShadow: `
                    0 0 20px rgba(96, 165, 250, 0.5),
                    0 0 40px rgba(167, 139, 250, 0.3),
                    0 0 60px rgba(52, 211, 153, 0.2)
                  `
                }}
              >
                کتابخانه دیجیتال
              </h1>
              
              {/* Realistic glow effect behind title */}
              <div 
                className="absolute inset-0 blur-3xl opacity-30 -z-10"
                style={{
                  background: `
                    radial-gradient(ellipse at center, 
                      rgba(96, 165, 250, 0.6) 0%, 
                      rgba(167, 139, 250, 0.4) 50%, 
                      transparent 100%
                    )
                  `
                }}
              />
            </div>

            {/* Subtitle with elegant styling */}
            <p className="text-xl md:text-2xl text-blue-100/90 mb-12 leading-relaxed font-light">
              مجموعه‌ای منحصر به فرد از کتاب‌های فارسی با تجربه‌ای فراتر از واقعیت
            </p>

            {/* Statistics cards with realistic glass effect */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-16">
              {[
                { number: books.length, label: 'کتاب', icon: '📚' },
                { number: [...new Set(books.map(b => b.category))].length, label: 'دسته‌بندی', icon: '🏷️' },
                { number: books.reduce((sum, book) => sum + book.pages, 0), label: 'صفحه', icon: '📄' }
              ].map((stat, index) => (
                <div
                  key={index}
                  className="relative group cursor-pointer"
                  style={{
                    background: `
                      linear-gradient(135deg, 
                        rgba(255, 255, 255, 0.1) 0%, 
                        rgba(255, 255, 255, 0.05) 100%
                      )
                    `,
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '20px',
                    boxShadow: `
                      0 8px 32px rgba(0, 0, 0, 0.3),
                      inset 0 1px 0 rgba(255, 255, 255, 0.2),
                      inset 0 -1px 0 rgba(0, 0, 0, 0.1)
                    `
                  }}
                >
                  <div className="p-8 text-center transition-all duration-500 group-hover:scale-105">
                    <div className="text-4xl mb-4 filter drop-shadow-lg">{stat.icon}</div>
                    <div className="text-3xl font-bold text-white mb-2 relative">
                      {stat.number.toLocaleString()}
                      <div className="absolute inset-0 blur-sm bg-blue-400/20 -z-10 rounded"></div>
                    </div>
                    <div className="text-blue-200/80 font-medium">{stat.label}</div>
                  </div>
                  
                  {/* Hover glow effect */}
                  <div 
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"
                    style={{
                      background: `
                        radial-gradient(circle at center, 
                          rgba(96, 165, 250, 0.3) 0%, 
                          transparent 70%
                        )
                      `,
                      filter: 'blur(20px)'
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main content area with realistic depth */}
        <div 
          className="relative"
          style={{
            background: `
              linear-gradient(180deg, 
                rgba(15, 23, 42, 0.95) 0%, 
                rgba(30, 41, 59, 0.98) 100%
              )
            `,
            backdropFilter: 'blur(10px)',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)'
          }}
        >
          <div className="flex">
            {/* Enhanced sidebar with realistic styling */}
            <div 
              className="w-80 min-h-screen border-r border-white/10"
              style={{
                background: `
                  linear-gradient(180deg, 
                    rgba(15, 23, 42, 0.9) 0%, 
                    rgba(30, 41, 59, 0.95) 100%
                  )
                `,
                backdropFilter: 'blur(15px)'
              }}
            >
              <div className="p-6">
                <FilterTabs 
                  categories={categories}
                  onFilterChange={handleFilterChange}
                  activeFiltersCount={getActiveFiltersCount()}
                  currentFilters={currentFilters}
                  minPages={minPages}
                  maxPages={maxPages}
                />
              </div>
            </div>

            {/* Enhanced main content area */}
            <div className="flex-1">
              <div className="p-8">
                {viewMode === 'grid' ? (
                  <BookList 
                    books={filteredBooks} 
                    isLoading={isLoading}
                    onSelectBook={handleSelectBook}
                  />
                ) : (
                  <LibraryShelfView 
                    books={filteredBooks}
                    isLoading={isLoading}
                    onSelectBook={handleSelectBook}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Ambient lighting effects */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0">
        <div 
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-10"
          style={{
            background: 'radial-gradient(circle, rgba(96, 165, 250, 0.8) 0%, transparent 70%)',
            filter: 'blur(60px)'
          }}
        />
        <div 
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-10"
          style={{
            background: 'radial-gradient(circle, rgba(167, 139, 250, 0.8) 0%, transparent 70%)',
            filter: 'blur(80px)'
          }}
        />
      </div>
    </div>
  );
};

export default Index;
