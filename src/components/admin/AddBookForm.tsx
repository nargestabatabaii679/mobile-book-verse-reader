
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Plus } from 'lucide-react';
import { Book } from '@/types';

interface AddBookFormProps {
  onAddBook: (book: Partial<Book>) => void;
}

export const AddBookForm: React.FC<AddBookFormProps> = ({ onAddBook }) => {
  const form = useForm<Partial<Book>>({
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

  const handleAddSingleBook = (data: Partial<Book>) => {
    const newBook: Book = {
      id: Date.now().toString(),
      title: data.title || '',
      author: data.author || '',
      category: data.category || '',
      pages: data.pages || 0,
      coverUrl: data.coverUrl || 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop',
      description: data.description || '',
      publishYear: data.publishYear || new Date().getFullYear(),
      rating: data.rating || 0,
      isbn: data.isbn || ''
    };

    onAddBook(newBook);
    toast.success('کتاب با موفقیت اضافه شد');
    form.reset();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plus className="w-5 h-5" />
          افزودن کتاب جدید
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleAddSingleBook)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
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
              control={form.control}
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
              control={form.control}
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
              control={form.control}
              name="pages"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>تعداد صفحات</FormLabel>
                  <Select onValueChange={(value) => field.onChange(parseInt(value))} defaultValue={field.value?.toString()}>
                    <FormControl>
                      <SelectTrigger className="bg-white">
                        <SelectValue placeholder="تعداد صفحات را انتخاب کنید" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-white border border-gray-200 shadow-lg">
                      <SelectItem value="50">کمتر از 50 صفحه</SelectItem>
                      <SelectItem value="100">50-100 صفحه</SelectItem>
                      <SelectItem value="200">100-200 صفحه</SelectItem>
                      <SelectItem value="300">200-300 صفحه</SelectItem>
                      <SelectItem value="500">300-500 صفحه</SelectItem>
                      <SelectItem value="1000">بیش از 500 صفحه</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="isbn"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>شماره ISBN</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="شماره ISBN" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="publishYear"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>سال انتشار</FormLabel>
                  <Select onValueChange={(value) => field.onChange(parseInt(value))} defaultValue={field.value?.toString()}>
                    <FormControl>
                      <SelectTrigger className="bg-white">
                        <SelectValue placeholder="سال انتشار را انتخاب کنید" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-white border border-gray-200 shadow-lg">
                      {Array.from({ length: 30 }, (_, i) => {
                        const year = new Date().getFullYear() - i;
                        return (
                          <SelectItem key={year} value={year.toString()}>
                            {year}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>امتیاز</FormLabel>
                  <Select onValueChange={(value) => field.onChange(parseFloat(value))} defaultValue={field.value?.toString()}>
                    <FormControl>
                      <SelectTrigger className="bg-white">
                        <SelectValue placeholder="امتیاز را انتخاب کنید" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-white border border-gray-200 shadow-lg">
                      <SelectItem value="1">1 ستاره</SelectItem>
                      <SelectItem value="2">2 ستاره</SelectItem>
                      <SelectItem value="3">3 ستاره</SelectItem>
                      <SelectItem value="4">4 ستاره</SelectItem>
                      <SelectItem value="5">5 ستاره</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="coverUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>آدرس تصویر جلد</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="آدرس URL تصویر جلد" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="md:col-span-2">
              <FormField
                control={form.control}
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

            <div className="md:col-span-2">
              <Button type="submit" className="w-full">
                افزودن کتاب
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
