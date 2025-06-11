
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Book } from '@/types';
import { toast } from 'sonner';
import { getBooksFromStorage, saveBooksToStorage } from '@/utils/bookStorage';
import { addCoverToBooks } from '@/utils/bookHelpers';

export const useBulkAddBooks = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (books: Book[]) => {
      console.log('Bulk adding books to localStorage:', books.length);
      const currentBooks = getBooksFromStorage();
      
      const newBooks = addCoverToBooks(books);
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

export const useLogBookOperation = () => {
  return useMutation({
    mutationFn: async (operation: any) => {
      console.log('Book operation logged:', operation);
      // In local mode, just log to console
      return operation;
    }
  });
};
