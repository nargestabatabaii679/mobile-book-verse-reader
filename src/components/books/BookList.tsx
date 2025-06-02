
import React from 'react';
import { Book } from '@/types';
import BookCard from './BookCard';
import { Skeleton } from '@/components/ui/skeleton';

interface BookListProps {
  books: Book[];
  isLoading: boolean;
  onSelectBook: (book: Book) => void;
}

const BookList: React.FC<BookListProps> = ({ books, isLoading, onSelectBook }) => {
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
          هیچ کتابی یافت نشد
        </h3>
        <p className="text-gray-300">
          Try adjusting your search or filter criteria
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {books.map((book) => (
        <BookCard
          key={book.id}
          book={book}
          onSelect={onSelectBook}
        />
      ))}
    </div>
  );
};

export default BookList;
