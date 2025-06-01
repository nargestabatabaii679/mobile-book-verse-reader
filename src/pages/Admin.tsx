
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Upload, Plus, FileText, Lock, BookOpen, Download, Edit, Trash2, BarChart3, Eye, Users, TrendingUp } from 'lucide-react';
import { Book } from '@/types';
import { books } from '@/data/books';

const ADMIN_PASSWORD = '123'; // رمز عبور ساده

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [localBooks, setLocalBooks] = useState<Book[]>(books);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isAddBookDialogOpen, setIsAddBookDialogOpen] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
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

    setLocalBooks(prev => prev.map(book => 
      book.id === editingBook.id ? updatedBook : book
    ));
    
    toast.success('کتاب با موفقیت ویرایش شد');
    setIsEditDialogOpen(false);
    setEditingBook(null);
  };

  const handleDeleteBook = (bookId: string) => {
    setLocalBooks(prev => prev.filter(book => book.id !== bookId));
    toast.success('کتاب با موفقیت حذف شد');
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      toast.success('فایل اکسل آپلود شد - پردازش در حال انجام...');
      
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
    toast.info('فایل نمونه اکسل در حال دانلود...');
  };

  // آمار محاسبه شده
  const totalBooks = localBooks.length;
  const categories = [...new Set(localBooks.map(book => book.category))];
  const averageRating = localBooks.reduce((sum, book) => sum + book.rating, 0) / totalBooks || 0;
  const totalPages = localBooks.reduce((sum, book) => sum + book.pages, 0);

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
            پنل مدیریت کتابخانه دیجیتال فارسی
          </h1>
          <Button onClick={handleLogout} variant="outline">
            خروج
          </Button>
        </div>

        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="dashboard">داشبورد</TabsTrigger>
            <TabsTrigger value="add-book">افزودن کتاب</TabsTrigger>
            <TabsTrigger value="bulk-upload">بارگذاری گروهی</TabsTrigger>
            <TabsTrigger value="manage-books">مدیریت کتاب‌ها</TabsTrigger>
            <TabsTrigger value="analytics">آمار و گزارش</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">کل کتاب‌ها</p>
                      <p className="text-3xl font-bold text-blue-600">{totalBooks}</p>
                    </div>
                    <BookOpen className="w-8 h-8 text-blue-500" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">دسته‌بندی‌ها</p>
                      <p className="text-3xl font-bold text-green-600">{categories.length}</p>
                    </div>
                    <BarChart3 className="w-8 h-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">میانگین امتیاز</p>
                      <p className="text-3xl font-bold text-yellow-600">{averageRating.toFixed(1)}</p>
                    </div>
                    <TrendingUp className="w-8 h-8 text-yellow-500" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">کل صفحات</p>
                      <p className="text-3xl font-bold text-purple-600">{totalPages.toLocaleString()}</p>
                    </div>
                    <FileText className="w-8 h-8 text-purple-500" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>خلاصه فعالیت‌ها</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                    <span>کتاب‌های اضافه شده امروز</span>
                    <span className="font-bold text-blue-600">0</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                    <span>محبوب‌ترین دسته‌بندی</span>
                    <span className="font-bold text-green-600">{categories[0] || 'نامشخص'}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

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
                        <TableHead>امتیاز</TableHead>
                        <TableHead>عملیات</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {localBooks.map((book) => (
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
          </TabsContent>

          <TabsContent value="analytics">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>توزیع کتاب‌ها بر اساس دسته‌بندی</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {categories.map(category => {
                      const count = localBooks.filter(book => book.category === category).length;
                      const percentage = (count / totalBooks * 100).toFixed(1);
                      return (
                        <div key={category} className="flex items-center justify-between">
                          <span className="text-sm font-medium">{category}</span>
                          <div className="flex items-center gap-2">
                            <div className="w-20 bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-blue-600 h-2 rounded-full" 
                                style={{ width: `${percentage}%` }}
                              ></div>
                            </div>
                            <span className="text-sm text-gray-600">{count} ({percentage}%)</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>آمار کلی</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                      <span>میانگین تعداد صفحات</span>
                      <span className="font-bold">{Math.round(totalPages / totalBooks) || 0}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                      <span>بالاترین امتیاز</span>
                      <span className="font-bold">{Math.max(...localBooks.map(b => b.rating))}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                      <span>کمترین امتیاز</span>
                      <span className="font-bold">{Math.min(...localBooks.map(b => b.rating))}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                      <span>جدیدترین کتاب</span>
                      <span className="font-bold">{Math.max(...localBooks.map(b => b.publishYear))}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
