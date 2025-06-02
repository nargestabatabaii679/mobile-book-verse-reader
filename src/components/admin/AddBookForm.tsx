
import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Plus, Upload, X, FileText, Link } from 'lucide-react';
import { Book } from '@/types';

interface AddBookFormProps {
  onAddBook: (book: Partial<Book>) => void;
}

export const AddBookForm: React.FC<AddBookFormProps> = ({ onAddBook }) => {
  const [coverImage, setCoverImage] = useState<string>('');
  const [pdfUrlInput, setPdfUrlInput] = useState<string>('');
  const coverFileInputRef = useRef<HTMLInputElement>(null);
  
  const form = useForm<Partial<Book>>({
    defaultValues: {
      title: '',
      author: '',
      translator: '',
      category: '',
      pages: 0,
      coverUrl: '',
      description: '',
      publishYear: new Date().getFullYear(),
      rating: 0,
      isbn: '',
      downloadUrl: ''
    }
  });

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        setCoverImage(imageUrl);
        form.setValue('coverUrl', imageUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePdfUrlChange = (url: string) => {
    setPdfUrlInput(url);
    form.setValue('downloadUrl', url);
  };

  const removeCoverImage = () => {
    setCoverImage('');
    form.setValue('coverUrl', '');
    if (coverFileInputRef.current) {
      coverFileInputRef.current.value = '';
    }
  };

  const clearPdfUrl = () => {
    setPdfUrlInput('');
    form.setValue('downloadUrl', '');
  };

  const handleAddSingleBook = (data: Partial<Book>) => {
    const newBook: Book = {
      id: Date.now().toString(),
      title: data.title || '',
      author: data.author || '',
      translator: data.translator || undefined,
      category: data.category || '',
      pages: data.pages || 0,
      coverUrl: coverImage || data.coverUrl || 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop',
      description: data.description || '',
      publishYear: data.publishYear || new Date().getFullYear(),
      rating: data.rating || 0,
      isbn: data.isbn || '',
      downloadUrl: pdfUrlInput || data.downloadUrl || ''
    };

    onAddBook(newBook);
    toast.success('کتاب با موفقیت اضافه شد');
    form.reset();
    setCoverImage('');
    setPdfUrlInput('');
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
            {/* آپلود عکس جلد */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                عکس جلد کتاب
              </label>
              <div className="flex items-start gap-4">
                <div className="flex-1">
                  <input
                    ref={coverFileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => coverFileInputRef.current?.click()}
                    className="w-full h-24 border-2 border-dashed border-gray-300 hover:border-blue-400 transition-colors"
                  >
                    <div className="flex flex-col items-center">
                      <Upload className="w-6 h-6 mb-2 text-gray-400" />
                      <span className="text-sm text-gray-500">انتخاب عکس جلد</span>
                    </div>
                  </Button>
                </div>
                
                {coverImage && (
                  <div className="relative">
                    <img 
                      src={coverImage} 
                      alt="Cover preview" 
                      className="w-20 h-24 object-cover rounded border"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={removeCoverImage}
                      className="absolute -top-2 -right-2 w-6 h-6 rounded-full p-0"
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {/* لینک فایل PDF */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                لینک فایل PDF کتاب
              </label>
              <div className="flex items-start gap-2">
                <div className="flex-1">
                  <Input
                    type="url"
                    placeholder="https://example.com/book.pdf"
                    value={pdfUrlInput}
                    onChange={(e) => handlePdfUrlChange(e.target.value)}
                    className="w-full"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    لینک مستقیم به فایل PDF کتاب را وارد کنید
                  </p>
                </div>
                
                {pdfUrlInput && (
                  <div className="relative">
                    <div className="w-20 h-12 bg-green-100 rounded border flex flex-col items-center justify-center">
                      <Link className="w-6 h-6 text-green-600 mb-1" />
                      <span className="text-xs text-green-600">PDF</span>
                    </div>
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={clearPdfUrl}
                      className="absolute -top-2 -right-2 w-6 h-6 rounded-full p-0"
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </div>
                )}
              </div>
            </div>

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
              name="translator"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>نام مترجم (اختیاری)</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="نام مترجم را وارد کنید" />
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
                  <FormLabel>تعداد صفحات ({form.watch('category') || 'دسته‌بندی'})</FormLabel>
                  <FormControl>
                    <Input 
                      {...field} 
                      type="number" 
                      placeholder="تعداد صفحات را وارد کنید"
                      onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                      value={field.value || ''}
                    />
                  </FormControl>
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
                  <FormLabel>امتیاز (نظر خوانندگان)</FormLabel>
                  <Select onValueChange={(value) => field.onChange(parseFloat(value))} defaultValue={field.value?.toString()}>
                    <FormControl>
                      <SelectTrigger className="bg-white">
                        <SelectValue placeholder="امتیاز خوانندگان را انتخاب کنید" />
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
                  <FormLabel>آدرس تصویر جلد (اختیاری)</FormLabel>
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
                    <FormLabel>توضیحات کتاب</FormLabel>
                    <FormControl>
                      <Textarea {...field} placeholder="توضیحات و خلاصه کتاب" rows={4} />
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
