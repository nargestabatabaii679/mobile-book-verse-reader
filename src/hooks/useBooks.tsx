
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Book } from '@/types';
import { toast } from 'sonner';
import { books as initialBooks } from '@/data/books';

// Local storage key
const BOOKS_STORAGE_KEY = 'bookverse_books';

// Helper function to get books from localStorage
const getBooksFromStorage = (): Book[] => {
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
const saveBooksToStorage = (books: Book[]): void => {
  try {
    localStorage.setItem(BOOKS_STORAGE_KEY, JSON.stringify(books));
  } catch (error) {
    console.error('Error saving books to localStorage:', error);
  }
};

// Generate a simple ID
const generateId = (): string => {
  return Date.now().toString() + Math.random().toString(36).substr(2, 9);
};

export const useBooks = () => {
  return useQuery({
    queryKey: ['books'],
    queryFn: async () => {
      console.log('Fetching books from localStorage...');
      const books = getBooksFromStorage();
      console.log('Books fetched successfully:', books.length);
      return books;
    }
  });
};

export const useAddBook = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (book: Partial<Book>) => {
      console.log('Adding book to localStorage:', book);
      const currentBooks = getBooksFromStorage();
      
      const newBook: Book = {
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

      const updatedBooks = [newBook, ...currentBooks];
      saveBooksToStorage(updatedBooks);

      console.log('Book added successfully:', newBook);
      return newBook;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['books'] });
      toast.success('کتاب با موفقیت اضافه شد');
    },
    onError: (error) => {
      console.error('Failed to add book:', error);
      toast.error('خطا در افزودن کتاب');
    }
  });
};

export const useUpdateBook = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...book }: Partial<Book> & { id: string }) => {
      console.log('Updating book in localStorage:', id, book);
      const currentBooks = getBooksFromStorage();
      
      const bookIndex = currentBooks.findIndex(b => b.id === id);
      if (bookIndex === -1) {
        throw new Error('Book not found');
      }

      const updatedBook = { ...currentBooks[bookIndex], ...book };
      currentBooks[bookIndex] = updatedBook;
      
      saveBooksToStorage(currentBooks);

      console.log('Book updated successfully:', updatedBook);
      return updatedBook;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['books'] });
      toast.success('کتاب با موفقیت به‌روزرسانی شد');
    },
    onError: (error) => {
      console.error('Failed to update book:', error);
      toast.error('خطا در به‌روزرسانی کتاب');
    }
  });
};

export const useDeleteBook = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      console.log('Deleting book from localStorage:', id);
      const currentBooks = getBooksFromStorage();
      
      const filteredBooks = currentBooks.filter(book => book.id !== id);
      saveBooksToStorage(filteredBooks);

      console.log('Book deleted successfully');
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['books'] });
      toast.success('کتاب با موفقیت حذف شد');
    },
    onError: (error) => {
      console.error('Failed to delete book:', error);
      toast.error('خطا در حذف کتاب');
    }
  });
};

export const useBulkAddBooks = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (books: Book[]) => {
      console.log('Bulk adding books to localStorage:', books.length);
      const currentBooks = getBooksFromStorage();
      
      const newBooks = books.map(book => ({
        ...book,
        id: generateId(),
        coverUrl: book.coverUrl || 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop'
      }));

      const updatedBooks = [...newBooks, ...currentBooks];
      saveBooksToStorage(updatedBooks);

      console.log('Books bulk added successfully:', newBooks.length);
      return newBooks;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['books'] });
      toast.success(`${data.length} کتاب با موفقیت اضافه شد`);
    },
    onError: (error) => {
      console.error('Failed to bulk add books:', error);
      toast.error('خطا در افزودن کتاب‌ها');
    }
  });
};

// Hook for logging operations (simplified local version)
export const useLogBookOperation = () => {
  return useMutation({
    mutationFn: async (operation: any) => {
      console.log('Book operation logged:', operation);
      // In local mode, just log to console
      return operation;
    }
  });
};
