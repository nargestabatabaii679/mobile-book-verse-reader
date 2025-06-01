
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Upload, Plus, FileText, Lock, BookOpen, Download } from 'lucide-react';
import { Book } from '@/types';
import { books } from '@/data/books';

const ADMIN_PASSWORD = 'admin123'; // در پروژه واقعی باید از متغیر محیطی استفاده شود

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [localBooks, setLocalBooks] = useState<Book[]>(books);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isAddBookDialogOpen, setIsAddBookDialogOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

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

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      toast.success('ورود موفقیت‌آمیز به پنل مدیریت');
    } else {
      toast.error('رمز عبور اشتباه است');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPassword('');
    navigate('/');
  };

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

    setLocalBooks(prev => [...prev, newBook]);
    toast.success('کتاب با موفقیت اضافه شد');
    setIsAddBookDialogOpen(false);
    form.reset();
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      // در پروژه واقعی باید فایل اکسل پردازش شود
      toast.success('فایل اکسل آپلود شد - پردازش در حال انجام...');
      
      // شبیه‌سازی پردازش فایل اکسل
      setTimeout(() => {
        const sampleBooksFromExcel: Book[] = [
          {
            id: Date.now().toString(),
            title: 'کتاب نمونه از اکسل',
            author: 'نویسنده نمونه',
            category: 'ادبیات',
            pages: 200,
            coverUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop',
            description: 'این کتاب از فایل اکسل بارگذاری شده است',
            publishYear: 2024,
            rating: 4.5,
            isbn: '978-123-456-789-0'
          }
        ];
        
        setLocalBooks(prev => [...prev, ...sampleBooksFromExcel]);
        toast.success('کتاب‌ها از فایل اکسل با موفقیت اضافه شدند');
        setUploadedFile(null);
      }, 2000);
    }
  };

  const downloadExcelTemplate = () => {
    // در پروژه واقعی باید فایل اکسل نمونه ایجاد شود
    toast.info('فایل نمونه اکسل در حال دانلود...');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-2 text-2xl">
              <Lock className="w-6 h-6" />
              پنل مدیریت
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="password">رمز عبور</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="رمز عبور را وارد کنید"
                onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
              />
            </div>
            <Button onClick={handleLogin} className="w-full">
              ورود
            </Button>
            <Button onClick={() => navigate('/')} variant="outline" className="w-full">
              بازگشت به صفحه اصلی
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white flex items-center gap-2">
            <BookOpen className="w-8 h-8" />
            پنل مدیریت کتابخانه دیجیتال
          </h1>
          <Button onClick={handleLogout} variant="outline">
            خروج
          </Button>
        </div>

        <Tabs defaultValue="add-book" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="add-book">افزودن کتاب</TabsTrigger>
            <TabsTrigger value="bulk-upload">بارگذاری گروهی</TabsTrigger>
            <TabsTrigger value="manage-books">مدیریت کتاب‌ها</TabsTrigger>
          </TabsList>

          <TabsContent value="add-book">
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
                          <FormControl>
                            <Input {...field} placeholder="دسته‌بندی کتاب" />
                          </FormControl>
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
                          <FormControl>
                            <Input {...field} type="number" placeholder="تعداد صفحات" />
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
                          <FormControl>
                            <Input {...field} type="number" placeholder="سال انتشار" />
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
          </TabsContent>

          <TabsContent value="bulk-upload">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="w-5 h-5" />
                  بارگذاری گروهی از طریق اکسل
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                  <Button onClick={downloadExcelTemplate} variant="outline" className="mb-4">
                    <Download className="w-4 h-4 mr-2" />
                    دانلود فایل نمونه اکسل
                  </Button>
                  <p className="text-sm text-gray-600 mb-4">
                    فایل اکسل باید شامل ستون‌های: عنوان، نویسنده، دسته‌بندی، تعداد صفحات، ISBN، سال انتشار، توضیحات باشد
                  </p>
                </div>

                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".xlsx,.xls"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <FileText className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                  <Button onClick={() => fileInputRef.current?.click()}>
                    انتخاب فایل اکسل
                  </Button>
                  {uploadedFile && (
                    <p className="mt-2 text-sm text-green-600">
                      فایل انتخاب شده: {uploadedFile.name}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="manage-books">
            <Card>
              <CardHeader>
                <CardTitle>مدیریت کتاب‌ها ({localBooks.length} کتاب)</CardTitle>
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
                        <TableHead>سال انتشار</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {localBooks.map((book) => (
                        <TableRow key={book.id}>
                          <TableCell className="font-medium">{book.title}</TableCell>
                          <TableCell>{book.author}</TableCell>
                          <TableCell>{book.category}</TableCell>
                          <TableCell>{book.pages}</TableCell>
                          <TableCell>{book.publishYear}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
