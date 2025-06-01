import React, { useState, useMemo } from 'react';
import Header from '@/components/layout/Header';
import BookList from '@/components/books/BookList';
import FilterSidebar from '@/components/FilterSidebar';
import FilterTabs from '@/components/FilterTabs';
import { LibraryShelfView } from '@/components/library/LibraryShelfView';
import BookDetailModal from '@/components/book-detail/BookDetailModal';
import { books } from '@/data/books';
import { Book, FilterOptions } from '@/types';

const Index = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'shelf'>('shelf');
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentFilters, setCurrentFilters] = useState<FilterOptions>({
    search: '',
    authorSearch: '',
    categories: [],
    minPages: 0,
    maxPages: 1000,
    ageRange: '',
    sortBy: 'title'
  });

  const categories = useMemo(() => {
    return [...new Set(books.map(book => book.category))];
  }, []);

  const minPages = useMemo(() => {
    return Math.min(...books.map(book => book.pages));
  }, []);

  const maxPages = useMemo(() => {
    return Math.max(...books.map(book => book.pages));
  }, []);

  const filteredBooks = useMemo(() => {
    return books.filter(book => {
      const matchesSearch = !currentFilters.search || 
        book.title.toLowerCase().includes(currentFilters.search.toLowerCase());
      
      const matchesAuthor = !currentFilters.authorSearch || 
        book.author.toLowerCase().includes(currentFilters.authorSearch.toLowerCase());
      
      const matchesCategory = currentFilters.categories.length === 0 || 
        currentFilters.categories.includes(book.category);
      
      const matchesPages = book.pages >= currentFilters.minPages && 
        book.pages <= currentFilters.maxPages;
      
      const matchesAge = !currentFilters.ageRange || book.ageRange === currentFilters.ageRange;
      
      return matchesSearch && matchesAuthor && matchesCategory && matchesPages && matchesAge;
    });
  }, [currentFilters]);

  const sortedBooks = useMemo(() => {
    const sorted = [...filteredBooks];
    switch (currentFilters.sortBy) {
      case 'title':
        return sorted.sort((a, b) => a.title.localeCompare(b.title));
      case 'author':
        return sorted.sort((a, b) => a.author.localeCompare(b.author));
      case 'pages':
        return sorted.sort((a, b) => a.pages - b.pages);
      case 'category':
        return sorted.sort((a, b) => a.category.localeCompare(b.category));
      default:
        return sorted;
    }
  }, [filteredBooks, currentFilters.sortBy]);

  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (currentFilters.search) count++;
    if (currentFilters.authorSearch) count++;
    if (currentFilters.categories.length > 0) count++;
    if (currentFilters.minPages > minPages || currentFilters.maxPages < maxPages) count++;
    if (currentFilters.ageRange) count++;
    return count;
  }, [currentFilters, minPages, maxPages]);

  const handleFilterChange = (filters: FilterOptions) => {
    setCurrentFilters(filters);
  };

  const handleSelectBook = (book: Book) => {
    console.log('Book selected:', book.title);
    setSelectedBook(book);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedBook(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Header />
      
      <div className="container mx-auto px-4">
        <FilterTabs
          categories={categories}
          onFilterChange={handleFilterChange}
          activeFiltersCount={activeFiltersCount}
          currentFilters={currentFilters}
          minPages={minPages}
          maxPages={maxPages}
        />

        <main className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-6">
            <FilterSidebar books={books} onFilter={() => {}} />
            
            <div className="flex-1">
              <div className="flex items-center justify-end mb-6">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`px-4 py-2 rounded-lg transition-colors ${
                        viewMode === 'grid'
                          ? 'bg-white/20 text-white'
                          : 'bg-white/10 text-white/70 hover:bg-white/15'
                      }`}
                    >
                      نمایش شبکه‌ای
                    </button>
                    <button
                      onClick={() => setViewMode('shelf')}
                      className={`px-4 py-2 rounded-lg transition-colors ${
                        viewMode === 'shelf'
                          ? 'bg-white/20 text-white'
                          : 'bg-white/10 text-white/70 hover:bg-white/15'
                      }`}
                    >
                      نمایش قفسه
                    </button>
                  </div>
                  <div className="text-white/80">
                    {sortedBooks.length} کتاب
                  </div>
                </div>
              </div>

              {viewMode === 'grid' ? (
                <BookList books={sortedBooks} isLoading={false} onSelectBook={handleSelectBook} />
              ) : (
                <LibraryShelfView 
                  books={sortedBooks}
                  isLoading={false}
                  onSelectBook={handleSelectBook}
                />
              )}
            </div>
          </div>
        </main>
      </div>

      <BookDetailModal
        book={selectedBook}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default Index;
