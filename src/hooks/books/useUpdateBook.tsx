
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Book } from '@/types';
import { toast } from 'sonner';
import { getBooksFromStorage, saveBooksToStorage } from '@/utils/bookStorage';

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
