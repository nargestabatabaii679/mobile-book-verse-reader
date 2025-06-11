
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { getBooksFromStorage, saveBooksToStorage } from '@/utils/bookStorage';

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
