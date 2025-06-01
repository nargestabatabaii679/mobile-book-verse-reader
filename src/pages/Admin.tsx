
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Lock, BookOpen } from 'lucide-react';
import { Book } from '@/types';
import { books } from '@/data/books';
import { DashboardStats } from '@/components/admin/DashboardStats';
import { AddBookForm } from '@/components/admin/AddBookForm';
import { BulkUploadSection } from '@/components/admin/BulkUploadSection';
import { BookManagementTable } from '@/components/admin/BookManagementTable';
import { AnalyticsCharts } from '@/components/admin/AnalyticsCharts';
import { BookshelfView } from '@/components/admin/BookshelfView';
import { ReadingReports } from '@/components/admin/ReadingReports';

const ADMIN_PASSWORD = '123';

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [localBooks, setLocalBooks] = useState<Book[]>(books);
  const navigate = useNavigate();

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
    } else {
      console.log('رمز عبور اشتباه است');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPassword('');
    navigate('/');
  };

  const handleAddBook = (book: Partial<Book>) => {
    setLocalBooks(prev => [...prev, book as Book]);
  };

  const handleBulkAddBooks = (newBooks: Book[]) => {
    setLocalBooks(prev => [...prev, ...newBooks]);
  };

  const handleEditBook = (book: Book) => {
    console.log('Edit book:', book);
    // Handle edit functionality here
  };

  const handleDeleteBook = (bookId: string) => {
    setLocalBooks(prev => prev.filter(book => book.id !== bookId));
  };

  const handleViewBook = (book: Book) => {
    console.log('View book:', book);
    // Handle view functionality here
  };

  // آمار محاسبه شده
  const categories = [...new Set(localBooks.map(book => book.category))];

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
          <TabsList className="grid w-full grid-cols-7">
            <TabsTrigger value="dashboard">داشبورد</TabsTrigger>
            <TabsTrigger value="add-book">افزودن کتاب</TabsTrigger>
            <TabsTrigger value="bulk-upload">بارگذاری گروهی</TabsTrigger>
            <TabsTrigger value="manage-books">مدیریت کتاب‌ها</TabsTrigger>
            <TabsTrigger value="bookshelf">قفسه کتاب</TabsTrigger>
            <TabsTrigger value="reports">گزارش مطالعه</TabsTrigger>
            <TabsTrigger value="analytics">آمار و گزارش</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <DashboardStats books={localBooks} />

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
            <AddBookForm onAddBook={handleAddBook} />
          </TabsContent>

          <TabsContent value="bulk-upload">
            <BulkUploadSection onBulkAddBooks={handleBulkAddBooks} />
          </TabsContent>

          <TabsContent value="manage-books">
            <BookManagementTable 
              books={localBooks}
              onEditBook={handleEditBook}
              onDeleteBook={handleDeleteBook}
              onViewBook={handleViewBook}
            />
          </TabsContent>

          <TabsContent value="bookshelf">
            <BookshelfView books={localBooks} />
          </TabsContent>

          <TabsContent value="reports">
            <ReadingReports books={localBooks} />
          </TabsContent>

          <TabsContent value="analytics">
            <AnalyticsCharts books={localBooks} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
