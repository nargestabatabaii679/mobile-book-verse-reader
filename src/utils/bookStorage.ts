
import { Book } from '@/types';
import { books as initialBooks } from '@/data/books';

// Local storage key
const BOOKS_STORAGE_KEY = 'bookverse_books';

// Helper function to get books from localStorage
export const getBooksFromStorage = (): Book[] => {
  try {
    const stored = localStorage.getItem(BOOKS_STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
    // If no books in storage, use initial books and store them
    localStorage.setItem(BOOKS_STORAGE_KEY, JSON.stringify(initialBooks));
    return initialBooks;
  } catch (error) {
    console.error('Error reading books from localStorage:', error);
    return initialBooks;
  }
};

// Helper function to save books to localStorage
export const saveBooksToStorage = (books: Book[]): void => {
  try {
    localStorage.setItem(BOOKS_STORAGE_KEY, JSON.stringify(books));
  } catch (error) {
    console.error('Error saving books to localStorage:', error);
  }
};
