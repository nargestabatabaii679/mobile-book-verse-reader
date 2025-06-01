
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Book } from '@/types';
import BookCard from './BookCard';
import { Skeleton } from '@/components/ui/skeleton';

interface BookListProps {
  books: Book[];
  isLoading: boolean;
  onSelectBook: (book: Book) => void;
}

const BookList: React.FC<BookListProps> = ({ books, isLoading, onSelectBook }) => {
  const { t } = useTranslation();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {Array.from({ length: 10 }).map((_, index) => (
          <div key={index} className="space-y-4">
            <Skeleton className="h-64 w-full rounded-lg" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        ))}
      </div>
    );
  }

  if (books.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">📚</div>
        <h3 className="text-xl font-semibold text-white mb-2">
          {t('no_books_found')}
        </h3>
        <p className="text-gray-300">
          Try adjusting your search or filter criteria
        </p>
      </div>
    );
  }

  // Split books into rows for cylindrical effect
  const booksPerRow = 8;
  const rows = [];
  for (let i = 0; i < books.length; i += booksPerRow) {
    rows.push(books.slice(i, i + booksPerRow));
  }

  return (
    <div className="relative min-h-[600px] perspective-1000">
      <div className="cylindrical-bookshelf">
        {rows.map((rowBooks, rowIndex) => (
          <div 
            key={rowIndex} 
            className="book-row"
            style={{
              '--row-index': rowIndex,
              transform: `translateY(${rowIndex * 120}px) rotateX(-5deg)`,
              transformStyle: 'preserve-3d'
            } as React.CSSProperties}
          >
            <div className="flex justify-center items-center h-32">
              {rowBooks.map((book, bookIndex) => {
                const angle = (bookIndex * 360) / booksPerRow;
                const radius = 300;
                const x = Math.sin((angle * Math.PI) / 180) * radius;
                const z = Math.cos((angle * Math.PI) / 180) * radius;
                
                return (
                  <div
                    key={book.id}
                    className="book-item absolute transition-all duration-500 hover:scale-110 hover:z-10"
                    style={{
                      transform: `translate3d(${x}px, 0, ${z}px) rotateY(${angle}deg)`,
                      transformStyle: 'preserve-3d'
                    }}
                  >
                    <div className="w-20 h-28 cursor-pointer group" onClick={() => onSelectBook(book)}>
                      <img
                        src={book.coverUrl}
                        alt={book.title}
                        className="w-full h-full object-cover rounded shadow-lg group-hover:shadow-xl transition-all duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded" />
                      <div className="absolute bottom-1 left-1 right-1 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <p className="truncate font-medium">{book.title}</p>
                        <p className="truncate text-gray-300">{book.author}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookList;
