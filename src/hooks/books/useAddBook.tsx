
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Book } from '@/types';
import { toast } from 'sonner';
import { getBooksFromStorage, saveBooksToStorage } from '@/utils/bookStorage';
import { createNewBook } from '@/utils/bookHelpers';

export const useAddBook = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (book: Partial<Book>) => {
      console.log('Adding book to localStorage:', book);
      const currentBooks = getBooksFromStorage();
      
      const newBook = createNewBook(book);
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
