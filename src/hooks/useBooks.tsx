import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Book } from '@/types';
import { toast } from 'sonner';
import { useLogBookOperation } from './useBookLogs';

interface DatabaseBook {
  id: string;
  title: string;
  author: string;
  category: string;
  pages: number;
  cover_url: string | null;
  description: string | null;
  publish_year: number | null;
  rating: number;
  isbn: string | null;
  age_range: string | null;
  download_url: string | null;
  created_at: string;
  updated_at: string;
}

const transformDatabaseBookToBook = (dbBook: DatabaseBook): Book => ({
  id: dbBook.id,
  title: dbBook.title,
  author: dbBook.author,
  translator: dbBook.description?.includes('مترجم:') ? 
    dbBook.description.split('مترجم:')[1]?.split('\n')[0]?.trim() : undefined,
  category: dbBook.category,
  pages: dbBook.pages,
  coverUrl: dbBook.cover_url || 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop',
  description: dbBook.description || '',
  publishYear: dbBook.publish_year || new Date().getFullYear(),
  rating: Number(dbBook.rating),
  isbn: dbBook.isbn || '',
  ageRange: dbBook.age_range,
  downloadUrl: dbBook.download_url
});

const transformBookToDatabaseBook = (book: Partial<Book>) => {
  let description = book.description || '';
  if (book.translator) {
    description = `مترجم: ${book.translator}\n${description}`;
  }
  
  return {
    title: book.title,
    author: book.author,
    category: book.category,
    pages: book.pages,
    cover_url: book.coverUrl,
    description: description,
    publish_year: book.publishYear,
    rating: book.rating,
    isbn: book.isbn,
    age_range: book.ageRange,
    download_url: book.downloadUrl
  };
};

export const useBooks = () => {
  return useQuery({
    queryKey: ['books'],
    queryFn: async () => {
      console.log('Fetching books from Supabase...');
      const { data, error } = await supabase
        .from('books')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching books:', error);
        throw error;
      }

      console.log('Books fetched successfully:', data?.length);
      return data.map(transformDatabaseBookToBook);
    }
  });
};

export const useAddBook = () => {
  const queryClient = useQueryClient();
  const logBookOperation = useLogBookOperation();

  return useMutation({
    mutationFn: async (book: Partial<Book>) => {
      console.log('Adding book to Supabase:', book);
      const { data, error } = await supabase
        .from('books')
        .insert([transformBookToDatabaseBook(book)])
        .select()
        .single();

      if (error) {
        console.error('Error adding book:', error);
        throw error;
      }

      // Log the operation
      await logBookOperation.mutateAsync({
        operation_type: 'single',
        books_count: 1,
        book_ids: [data.id],
        operation_details: {
          title: book.title,
          author: book.author,
          category: book.category
        }
      });

      console.log('Book added successfully:', data);
      return transformDatabaseBookToBook(data);
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
      console.log('Updating book in Supabase:', id, book);
      const { data, error } = await supabase
        .from('books')
        .update(transformBookToDatabaseBook(book))
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Error updating book:', error);
        throw error;
      }

      console.log('Book updated successfully:', data);
      return transformDatabaseBookToBook(data);
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
      console.log('Deleting book from Supabase:', id);
      const { error } = await supabase
        .from('books')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting book:', error);
        throw error;
      }

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
  const logBookOperation = useLogBookOperation();

  return useMutation({
    mutationFn: async (books: Book[]) => {
      console.log('Bulk adding books to Supabase:', books.length);
      const { data, error } = await supabase
        .from('books')
        .insert(books.map(transformBookToDatabaseBook))
        .select();

      if (error) {
        console.error('Error bulk adding books:', error);
        throw error;
      }

      // Log the bulk operation
      await logBookOperation.mutateAsync({
        operation_type: 'bulk',
        books_count: books.length,
        book_ids: data.map(book => book.id),
        operation_details: {
          categories: [...new Set(books.map(book => book.category))],
          total_pages: books.reduce((sum, book) => sum + book.pages, 0)
        }
      });

      console.log('Books bulk added successfully:', data?.length);
      return data.map(transformDatabaseBookToBook);
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
