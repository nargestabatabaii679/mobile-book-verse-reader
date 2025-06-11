
import { useQuery } from '@tanstack/react-query';
import { getBooksFromStorage } from '@/utils/bookStorage';

export const useGetBooks = () => {
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
