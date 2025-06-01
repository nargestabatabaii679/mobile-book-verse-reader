
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { BookOpen, BarChart3, TrendingUp, FileText } from 'lucide-react';
import { Book } from '@/types';

interface DashboardStatsProps {
  books: Book[];
}

export const DashboardStats: React.FC<DashboardStatsProps> = ({ books }) => {
  const totalBooks = books.length;
  const categories = [...new Set(books.map(book => book.category))];
  const averageRating = books.reduce((sum, book) => sum + book.rating, 0) / totalBooks || 0;
  const totalPages = books.reduce((sum, book) => sum + book.pages, 0);

  return (
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
  );
};
