
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';
import { AddBookForm } from '@/components/admin/AddBookForm';
import { BookManagementTable } from '@/components/admin/BookManagementTable';
import { BulkUploadSection } from '@/components/admin/BulkUploadSection';
import { DashboardStats } from '@/components/admin/DashboardStats';
import { AnalyticsCharts } from '@/components/admin/AnalyticsCharts';
import { ReadingReports } from '@/components/admin/ReadingReports';
import { BookshelfView } from '@/components/admin/BookshelfView';
import SoundSettings from '@/components/admin/SoundSettings';
import { InteractiveStoriesManagement } from '@/components/admin/InteractiveStoriesManagement';
import SupabaseSetupWarning from '@/components/SupabaseSetupWarning';
import { useBooks, useAddBook, useUpdateBook, useDeleteBook, useBulkAddBooks } from '@/hooks/useBooks';
import { toast } from 'sonner';
import { Book } from '@/types';
import { LogOut, Home } from 'lucide-react';

const Admin = () => {
  const navigate = useNavigate();
  const { user, isAdmin, loading: authLoading } = useAuth();

  // Use Supabase hooks
  const { data: books = [], isLoading } = useBooks();
  const addBookMutation = useAddBook();
  const updateBookMutation = useUpdateBook();
  const deleteBookMutation = useDeleteBook();
  const bulkAddBooksMutation = useBulkAddBooks();

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    } else if (!authLoading && user && !isAdmin) {
      navigate('/');
      toast.error('شما دسترسی به پنل مدیریت ندارید');
    }
  }, [user, isAdmin, authLoading, navigate]);

  const handleGoToHome = () => {
    navigate('/');
  };

  const handleAddBook = (book: Partial<Book>) => {
    addBookMutation.mutate(book);
  };

  const handleBulkAddBooks = (newBooks: Book[]) => {
    bulkAddBooksMutation.mutate(newBooks);
  };

  const handleEditBook = (book: Book) => {
    // نمایش فرم ویرایش کتاب
    toast.info('ویرایش کتاب: ' + book.title);
  };

  const handleDeleteBook = (id: string) => {
    deleteBookMutation.mutate(id);
  };

  const handleViewBook = (book: Book) => {
    // نمایش جزئیات کتاب
    toast.info('نمایش کتاب: ' + book.title);
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-white" />
      </div>
    );
  }

  if (!user || !isAdmin) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-white text-lg">در حال بارگذاری...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">پنل مدیریت کتابخانه</h1>
            <p className="text-gray-300">مدیریت کتاب‌ها و تنظیمات سیستم</p>
          </div>
          <div className="flex gap-2">
            <Button onClick={handleGoToHome} variant="outline" className="text-white border-white hover:bg-white/10">
              <Home className="w-4 h-4 mr-2" />
              صفحه اصلی
            </Button>
          </div>
        </div>

        {/* Supabase setup warning - only visible in admin panel */}
        <div className="mb-6">
          <SupabaseSetupWarning />
        </div>

        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-9 bg-white/10 backdrop-blur-sm">
            <TabsTrigger value="dashboard" className="text-white data-[state=active]:bg-white/20">داشبورد</TabsTrigger>
            <TabsTrigger value="add-book" className="text-white data-[state=active]:bg-white/20">افزودن کتاب</TabsTrigger>
            <TabsTrigger value="manage-books" className="text-white data-[state=active]:bg-white/20">مدیریت کتاب‌ها</TabsTrigger>
            <TabsTrigger value="interactive-stories" className="text-white data-[state=active]:bg-white/20">داستان‌های تعاملی</TabsTrigger>
            <TabsTrigger value="bulk-upload" className="text-white data-[state=active]:bg-white/20">بارگذاری گروهی</TabsTrigger>
            <TabsTrigger value="analytics" className="text-white data-[state=active]:bg-white/20">آنالیتیکس</TabsTrigger>
            <TabsTrigger value="reports" className="text-white data-[state=active]:bg-white/20">گزارشات</TabsTrigger>
            <TabsTrigger value="bookshelf" className="text-white data-[state=active]:bg-white/20">نمای قفسه</TabsTrigger>
            <TabsTrigger value="settings" className="text-white data-[state=active]:bg-white/20">تنظیمات</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            <DashboardStats books={books} />
          </TabsContent>

          <TabsContent value="add-book">
            <AddBookForm onAddBook={handleAddBook} />
          </TabsContent>

          <TabsContent value="manage-books">
            <BookManagementTable
              books={books}
              onEditBook={handleEditBook}
              onDeleteBook={handleDeleteBook}
              onViewBook={handleViewBook}
            />
          </TabsContent>

          <TabsContent value="interactive-stories">
            <InteractiveStoriesManagement />
          </TabsContent>

          <TabsContent value="bulk-upload">
            <BulkUploadSection onBulkAddBooks={handleBulkAddBooks} />
          </TabsContent>

          <TabsContent value="analytics">
            <AnalyticsCharts books={books} />
          </TabsContent>

          <TabsContent value="reports">
            <ReadingReports books={books} />
          </TabsContent>

          <TabsContent value="bookshelf">
            <BookshelfView books={books} />
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
