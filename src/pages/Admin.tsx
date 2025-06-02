
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AddBookForm from '@/components/admin/AddBookForm';
import BookManagementTable from '@/components/admin/BookManagementTable';
import BulkUploadSection from '@/components/admin/BulkUploadSection';
import DashboardStats from '@/components/admin/DashboardStats';
import AnalyticsCharts from '@/components/admin/AnalyticsCharts';
import ReadingReports from '@/components/admin/ReadingReports';
import BookshelfView from '@/components/admin/BookshelfView';
import SoundSettings from '@/components/admin/SoundSettings';
import { books } from '@/data/books';
import { toast } from 'sonner';

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (password === 'admin123') {
      setIsAuthenticated(true);
      toast.success('ورود موفق به پنل مدیریت');
    } else {
      toast.error('رمز عبور اشتباه است');
    }
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
            <DashboardStats />
          </TabsContent>

          <TabsContent value="add-book">
            <AddBookForm />
          </TabsContent>

          <TabsContent value="manage-books">
            <BookManagementTable books={books} />
          </TabsContent>

          <TabsContent value="bulk-upload">
            <BulkUploadSection />
          </TabsContent>

          <TabsContent value="analytics">
            <AnalyticsCharts />
          </TabsContent>

          <TabsContent value="reports">
            <ReadingReports />
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
