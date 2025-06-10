
import { useState } from 'react';
import { Book } from '@/types';
import Header from '@/components/layout/Header';
import FilterSidebar from '@/components/FilterSidebar';
import FilterTabs from '@/components/FilterTabs';
import { LibraryShelfView } from '@/components/library/LibraryShelfView';
import BookList from '@/components/books/BookList';
import BookDetailModal from '@/components/book-detail/BookDetailModal';
import { useBooks } from '@/hooks/useBooks';
import { FilterOptions } from '@/types';
import { Button } from '@/components/ui/button';
import { Grid3X3, Bookmark } from 'lucide-react';

const Index = () => {
  const { data: books = [], isLoading } = useBooks();
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [viewMode, setViewMode] = useState<'shelf' | 'grid'>('shelf');
  const [filters, setFilters] = useState<FilterOptions>({
    search: '',
    authorSearch: '',
    categories: [],
    minPages: 0,
    maxPages: 1000,
    ageRange: '',
  });

  const handleFilter = (filtered: Book[]) => {
    setFilteredBooks(filtered);
  };

  const handleFilterChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
    
    let filtered = books;

    // Search filter
    if (newFilters.search) {
      filtered = filtered.filter(book =>
        book.title.toLowerCase().includes(newFilters.search!.toLowerCase())
      );
    }

    // Author search filter
    if (newFilters.authorSearch) {
      filtered = filtered.filter(book =>
        book.author.toLowerCase().includes(newFilters.authorSearch!.toLowerCase())
      );
    }

    // Category filter
    if (newFilters.categories.length > 0) {
      filtered = filtered.filter(book =>
        newFilters.categories.includes(book.category)
      );
    }

    // Pages filter
    filtered = filtered.filter(book =>
      book.pages >= newFilters.minPages && book.pages <= newFilters.maxPages
    );

    // Age range filter
    if (newFilters.ageRange) {
      filtered = filtered.filter(book => book.ageRange === newFilters.ageRange);
    }

    setFilteredBooks(filtered);
  };

  const displayBooks = filteredBooks.length > 0 || Object.values(filters).some(v => v !== '' && v !== 0 && v !== 1000 && (!Array.isArray(v) || v.length > 0)) ? filteredBooks : books;

  const categories = [...new Set(books.map(book => book.category))];
  const activeFiltersCount = Object.entries(filters).filter(([key, value]) => {
    if (key === 'minPages' && value === 0) return false;
    if (key === 'maxPages' && value === 1000) return false;
    if (Array.isArray(value)) return value.length > 0;
    return value !== '' && value !== 0;
  }).length;

  const minPages = Math.min(...books.map(book => book.pages));
  const maxPages = Math.max(...books.map(book => book.pages));

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Filter Tabs */}
        <FilterTabs
          categories={categories}
          onFilterChange={handleFilterChange}
          activeFiltersCount={activeFiltersCount}
          currentFilters={filters}
          minPages={minPages}
          maxPages={maxPages}
        />

        {/* View Mode Selection */}
        <div className="flex justify-center gap-2 mb-6">
          <Button
            onClick={() => setViewMode('shelf')}
            variant={viewMode === 'shelf' ? 'default' : 'outline'}
            className="flex items-center gap-2 bg-white/20 border-white/30 text-white hover:bg-white/30 hover:text-white"
          >
            <Bookmark className="w-4 h-4" />
            نمای قفسه‌ای
          </Button>
          <Button
            onClick={() => setViewMode('grid')}
            variant={viewMode === 'grid' ? 'default' : 'outline'}
            className="flex items-center gap-2 bg-white/20 border-white/30 text-white hover:bg-white/30 hover:text-white"
          >
            <Grid3X3 className="w-4 h-4" />
            نمای شبکه‌ای
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <aside className="lg:col-span-1">
            <FilterSidebar books={books} onFilter={handleFilter} />
          </aside>
          
          <main className="lg:col-span-3">
            {viewMode === 'shelf' ? (
              <LibraryShelfView 
                books={displayBooks}
                isLoading={isLoading}
                onSelectBook={setSelectedBook}
              />
            ) : (
              <BookList 
                books={displayBooks}
                isLoading={isLoading}
                onSelectBook={setSelectedBook}
              />
            )}
          </main>
        </div>
      </div>

      {selectedBook && (
        <BookDetailModal
          book={selectedBook}
          isOpen={!!selectedBook}
          onClose={() => setSelectedBook(null)}
        />
      )}
    </div>
  );
};

export default Index;
