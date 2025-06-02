
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AddBookForm } from '@/components/admin/AddBookForm';
import { BookManagementTable } from '@/components/admin/BookManagementTable';
import { BulkUploadSection } from '@/components/admin/BulkUploadSection';
import { DashboardStats } from '@/components/admin/DashboardStats';
import { AnalyticsCharts } from '@/components/admin/AnalyticsCharts';
import { ReadingReports } from '@/components/admin/ReadingReports';
import { BookshelfView } from '@/components/admin/BookshelfView';
import SoundSettings from '@/components/admin/SoundSettings';
import { books } from '@/data/books';
import { toast } from 'sonner';
import { Book } from '@/types';

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [booksList, setBooksList] = useState<Book[]>(books);

  const handleLogin = () => {
    if (password === 'admin123') {
      setIsAuthenticated(true);
      toast.success('ورود موفق به پنل مدیریت');
    } else {
      toast.error('رمز عبور اشتباه است');
    }
  };

  const handleAddBook = (book: Partial<Book>) => {
    const newBook: Book = {
      id: Date.now().toString(),
      title: book.title || '',
      author: book.author || '',
      category: book.category || '',
      pages: book.pages || 0,
      coverUrl: book.coverUrl || 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop',
      description: book.description || '',
      publishYear: book.publishYear || new Date().getFullYear(),
      rating: book.rating || 0,
      isbn: book.isbn || ''
    };
    setBooksList(prev => [...prev, newBook]);
    toast.success('کتاب با موفقیت اضافه شد');
  };

  const handleBulkAddBooks = (newBooks: Book[]) => {
    setBooksList(prev => [...prev, ...newBooks]);
    toast.success(`${newBooks.length} کتاب با موفقیت اضافه شد`);
  };

  const handleEditBook = (book: Book) => {
    // نمایش فرم ویرایش کتاب
    toast.info('ویرایش کتاب: ' + book.title);
  };

  const handleDeleteBook = (id: string) => {
    setBooksList(prev => prev.filter(book => book.id !== id));
    toast.success('کتاب با موفقیت حذف شد');
  };

  const handleViewBook = (book: Book) => {
    // نمایش جزئیات کتاب
    toast.info('نمایش کتاب: ' + book.title);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>ورود به پنل مدیریت</CardTitle>
            <CardDescription>لطفاً رمز عبور را وارد کنید</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">رمز عبور</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                placeholder="رمز عبور را وارد کنید"
              />
            </div>
            <Button onClick={handleLogin} className="w-full">
              ورود
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">پنل مدیریت کتابخانه</h1>
          <p className="text-gray-300">مدیریت کتاب‌ها و تنظیمات سیستم</p>
        </div>

        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-8 bg-white/10 backdrop-blur-sm">
            <TabsTrigger value="dashboard" className="text-white data-[state=active]:bg-white/20">داشبورد</TabsTrigger>
            <TabsTrigger value="add-book" className="text-white data-[state=active]:bg-white/20">افزودن کتاب</TabsTrigger>
            <TabsTrigger value="manage-books" className="text-white data-[state=active]:bg-white/20">مدیریت کتاب‌ها</TabsTrigger>
            <TabsTrigger value="bulk-upload" className="text-white data-[state=active]:bg-white/20">بارگذاری گروهی</TabsTrigger>
            <TabsTrigger value="analytics" className="text-white data-[state=active]:bg-white/20">آنالیتیکس</TabsTrigger>
            <TabsTrigger value="reports" className="text-white data-[state=active]:bg-white/20">گزارشات</TabsTrigger>
            <TabsTrigger value="bookshelf" className="text-white data-[state=active]:bg-white/20">نمای قفسه</TabsTrigger>
            <TabsTrigger value="settings" className="text-white data-[state=active]:bg-white/20">تنظیمات</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            <DashboardStats books={booksList} />
          </TabsContent>

          <TabsContent value="add-book">
            <AddBookForm onAddBook={handleAddBook} />
          </TabsContent>

          <TabsContent value="manage-books">
            <BookManagementTable 
              books={booksList} 
              onEditBook={handleEditBook}
              onDeleteBook={handleDeleteBook}
              onViewBook={handleViewBook}
            />
          </TabsContent>

          <TabsContent value="bulk-upload">
            <BulkUploadSection onBulkAddBooks={handleBulkAddBooks} />
          </TabsContent>

          <TabsContent value="analytics">
            <AnalyticsCharts books={booksList} />
          </TabsContent>

          <TabsContent value="reports">
            <ReadingReports books={booksList} />
          </TabsContent>

          <TabsContent value="bookshelf">
            <BookshelfView books={booksList} />
          </TabsContent>

          <TabsContent value="settings">
            <div className="grid gap-6">
              <SoundSettings />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
