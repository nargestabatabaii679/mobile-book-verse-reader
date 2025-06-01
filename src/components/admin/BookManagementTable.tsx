
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Edit, Trash2 } from 'lucide-react';
import { Book } from '@/types';

interface BookManagementTableProps {
  books: Book[];
  onUpdateBook: (bookId: string, updatedBook: Partial<Book>) => void;
  onDeleteBook: (bookId: string) => void;
}

export const BookManagementTable: React.FC<BookManagementTableProps> = ({
  books,
  onUpdateBook,
  onDeleteBook
}) => {
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const editForm = useForm<Partial<Book>>({
    defaultValues: {
      title: '',
      author: '',
      category: '',
      pages: 0,
      coverUrl: '',
      description: '',
      publishYear: new Date().getFullYear(),
      rating: 0,
      isbn: ''
    }
  });

  const handleEditBook = (book: Book) => {
    setEditingBook(book);
    editForm.reset(book);
    setIsEditDialogOpen(true);
  };

  const handleUpdateBook = (data: Partial<Book>) => {
    if (!editingBook) return;
    
    const updatedBook: Book = {
      ...editingBook,
      ...data
    };

    onUpdateBook(editingBook.id, updatedBook);
    toast.success('کتاب با موفقیت ویرایش شد');
    setIsEditDialogOpen(false);
    setEditingBook(null);
  };

  const handleDeleteBook = (bookId: string) => {
    onDeleteBook(bookId);
    toast.success('کتاب با موفقیت حذف شد');
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>مدیریت کتاب‌ها ({books.length} کتاب)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="max-h-96 overflow-y-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>عنوان</TableHead>
                  <TableHead>نویسنده</TableHead>
                  <TableHead>دسته‌بندی</TableHead>
                  <TableHead>صفحات</TableHead>
                  <TableHead>امتیاز</TableHead>
                  <TableHead>عملیات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {books.map((book) => (
                  <TableRow key={book.id}>
                    <TableCell className="font-medium">{book.title}</TableCell>
                    <TableCell>{book.author}</TableCell>
                    <TableCell>{book.category}</TableCell>
                    <TableCell>{book.pages}</TableCell>
                    <TableCell>{book.rating}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEditBook(book)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDeleteBook(book.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>ویرایش کتاب</DialogTitle>
          </DialogHeader>
          <Form {...editForm}>
            <form onSubmit={editForm.handleSubmit(handleUpdateBook)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={editForm.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>عنوان کتاب</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="عنوان کتاب را وارد کنید" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={editForm.control}
                name="author"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>نام نویسنده</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="نام نویسنده را وارد کنید" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={editForm.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>دسته‌بندی</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-white">
                          <SelectValue placeholder="دسته‌بندی را انتخاب کنید" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-white border border-gray-200 shadow-lg">
                        <SelectItem value="ادبیات">ادبیات</SelectItem>
                        <SelectItem value="تاریخ">تاریخ</SelectItem>
                        <SelectItem value="علوم">علوم</SelectItem>
                        <SelectItem value="فلسفه">فلسفه</SelectItem>
                        <SelectItem value="کودک و نوجوان">کودک و نوجوان</SelectItem>
                        <SelectItem value="روانشناسی">روانشناسی</SelectItem>
                        <SelectItem value="اقتصاد">اقتصاد</SelectItem>
                        <SelectItem value="هنر">هنر</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={editForm.control}
                name="pages"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>تعداد صفحات</FormLabel>
                    <FormControl>
                      <Input {...field} type="number" placeholder="تعداد صفحات" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="md:col-span-2">
                <FormField
                  control={editForm.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>توضیحات</FormLabel>
                      <FormControl>
                        <Textarea {...field} placeholder="توضیحات کتاب" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="md:col-span-2 flex gap-2">
                <Button type="submit" className="flex-1">
                  ذخیره تغییرات
                </Button>
                <Button type="button" variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                  انصراف
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};
