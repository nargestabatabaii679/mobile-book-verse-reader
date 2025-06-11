
import { Book } from '@/types';

// Generate a simple ID
export const generateId = (): string => {
  return Date.now().toString() + Math.random().toString(36).substr(2, 9);
};

// Create a new book with default values
export const createNewBook = (book: Partial<Book>): Book => {
  return {
    id: generateId(),
    title: book.title || '',
    author: book.author || '',
    translator: book.translator,
    category: book.category || '',
    pages: book.pages || 0,
    coverUrl: book.coverUrl || 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop',
    description: book.description || '',
    publishYear: book.publishYear || new Date().getFullYear(),
    rating: book.rating || 0,
    isbn: book.isbn || '',
    ageRange: book.ageRange,
    downloadUrl: book.downloadUrl
  };
};

// Add cover URL to books for bulk operations
export const addCoverToBooks = (books: Book[]): Book[] => {
  return books.map(book => ({
    ...book,
    id: generateId(),
    coverUrl: book.coverUrl || 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop'
  }));
};
