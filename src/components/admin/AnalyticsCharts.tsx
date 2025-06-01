
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Book } from '@/types';

interface AnalyticsChartsProps {
  books: Book[];
}

export const AnalyticsCharts: React.FC<AnalyticsChartsProps> = ({ books }) => {
  const totalBooks = books.length;
  const categories = [...new Set(books.map(book => book.category))];
  const totalPages = books.reduce((sum, book) => sum + book.pages, 0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>توزیع کتاب‌ها بر اساس دسته‌بندی</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {categories.map(category => {
              const count = books.filter(book => book.category === category).length;
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
              <span className="font-bold">{Math.max(...books.map(b => b.rating))}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
              <span>کمترین امتیاز</span>
              <span className="font-bold">{Math.min(...books.map(b => b.rating))}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
              <span>جدیدترین کتاب</span>
              <span className="font-bold">{Math.max(...books.map(b => b.publishYear))}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
