
import { useState } from 'react';
import { Book } from '@/types';
import Header from '@/components/layout/Header';
import FilterSidebar from '@/components/FilterSidebar';
import BookList from '@/components/books/BookList';
import BookDetailModal from '@/components/book-detail/BookDetailModal';
import { useBooks } from '@/hooks/useBooks';

const Index = () => {
  const { data: books = [], isLoading } = useBooks();
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);

  const handleFilter = (filtered: Book[]) => {
    setFilteredBooks(filtered);
  };

  const displayBooks = filteredBooks.length > 0 ? filteredBooks : books;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <aside className="lg:col-span-1">
            <FilterSidebar books={books} onFilter={handleFilter} />
          </aside>
          
          <main className="lg:col-span-3">
            <BookList 
              books={displayBooks}
              isLoading={isLoading}
              onSelectBook={setSelectedBook}
            />
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
