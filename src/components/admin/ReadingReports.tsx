
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, Eye, Clock, Star, Download, BookOpen } from 'lucide-react';
import { Book } from '@/types';

interface ReadingReportsProps {
  books: Book[];
}

interface ReadingData {
  bookId: string;
  views: number;
  readingTime: number; // in minutes
  lastRead: Date;
  completionRate: number; // percentage
  userRating: number;
}

export const ReadingReports: React.FC<ReadingReportsProps> = ({ books }) => {
  // Mock reading data - in real app this would come from database
  const [readingData] = useState<ReadingData[]>([
    { bookId: '1', views: 145, readingTime: 320, lastRead: new Date('2024-01-15'), completionRate: 85, userRating: 4.5 },
    { bookId: '2', views: 89, readingTime: 180, lastRead: new Date('2024-01-10'), completionRate: 60, userRating: 4.2 },
    { bookId: '3', views: 67, readingTime: 90, lastRead: new Date('2024-01-05'), completionRate: 30, userRating: 3.8 },
    { bookId: '4', views: 234, readingTime: 450, lastRead: new Date('2024-01-20'), completionRate: 95, userRating: 4.8 },
    { bookId: '5', views: 156, readingTime: 280, lastRead: new Date('2024-01-18'), completionRate: 75, userRating: 4.3 },
  ]);

  const getMostReadBooks = () => {
    return readingData
      .sort((a, b) => b.views - a.views)
      .slice(0, 5)
      .map(data => {
        const book = books.find(b => b.id === data.bookId);
        return { ...data, book };
      })
      .filter(item => item.book);
  };

  const getTotalReadingTime = () => {
    return readingData.reduce((total, data) => total + data.readingTime, 0);
  };

  const getAverageCompletionRate = () => {
    return readingData.reduce((total, data) => total + data.completionRate, 0) / readingData.length;
  };

  const getTotalViews = () => {
    return readingData.reduce((total, data) => total + data.views, 0);
  };

  const exportReport = () => {
    const reportData = getMostReadBooks();
    const csvContent = "data:text/csv;charset=utf-8," 
      + "عنوان کتاب,نویسنده,تعداد مشاهده,زمان مطالعه (دقیقه),درصد تکمیل,امتیاز\n"
      + reportData.map(item => 
          `"${item.book?.title}","${item.book?.author}",${item.views},${item.readingTime},${item.completionRate}%,${item.userRating}`
        ).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "reading_report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}س ${mins}د`;
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('fa-IR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  };

  return (
    <div className="space-y-6">
      {/* آمار کلی */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">کل مشاهدات</p>
                <p className="text-3xl font-bold text-blue-800">{getTotalViews().toLocaleString()}</p>
              </div>
              <Eye className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600">زمان مطالعه</p>
                <p className="text-3xl font-bold text-green-800">{formatTime(getTotalReadingTime())}</p>
              </div>
              <Clock className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600">میانگین تکمیل</p>
                <p className="text-3xl font-bold text-purple-800">{getAverageCompletionRate().toFixed(1)}%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-yellow-600">میانگین امتیاز</p>
                <p className="text-3xl font-bold text-yellow-800">
                  {(readingData.reduce((sum, d) => sum + d.userRating, 0) / readingData.length).toFixed(1)}
                </p>
              </div>
              <Star className="w-8 h-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* محبوب ترین کتاب ها */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            محبوب‌ترین کتاب‌ها
          </CardTitle>
          <Button onClick={exportReport} variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            دانلود گزارش
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {getMostReadBooks().map((item, index) => (
              <div key={item.bookId} className="flex items-center space-x-4 rtl:space-x-reverse p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex-shrink-0">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                    index === 0 ? 'bg-yellow-500' : 
                    index === 1 ? 'bg-gray-400' : 
                    index === 2 ? 'bg-amber-600' : 'bg-blue-500'
                  }`}>
                    {index + 1}
                  </div>
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <h3 className="text-lg font-semibold text-gray-900 truncate">
                      {item.book?.title}
                    </h3>
                    {index < 3 && (
                      <Badge variant={index === 0 ? "default" : "secondary"}>
                        {index === 0 ? "محبوب‌ترین" : index === 1 ? "دوم" : "سوم"}
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-600">{item.book?.author}</p>
                </div>

                <div className="flex flex-col items-end space-y-2">
                  <div className="flex items-center space-x-4 rtl:space-x-reverse text-sm text-gray-600">
                    <div className="flex items-center space-x-1 rtl:space-x-reverse">
                      <Eye className="w-4 h-4" />
                      <span>{item.views}</span>
                    </div>
                    <div className="flex items-center space-x-1 rtl:space-x-reverse">
                      <Clock className="w-4 h-4" />
                      <span>{formatTime(item.readingTime)}</span>
                    </div>
                    <div className="flex items-center space-x-1 rtl:space-x-reverse">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span>{item.userRating}</span>
                    </div>
                  </div>
                  
                  <div className="w-24">
                    <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                      <span>پیشرفت</span>
                      <span>{item.completionRate}%</span>
                    </div>
                    <Progress value={item.completionRate} className="h-2" />
                  </div>
                </div>

                <div className="text-xs text-gray-500">
                  آخرین مطالعه: {formatDate(item.lastRead)}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* نمودار تحلیل رفتار مطالعه */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>توزیع زمان مطالعه</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {readingData.slice(0, 5).map((data) => {
                const book = books.find(b => b.id === data.bookId);
                const maxTime = Math.max(...readingData.map(d => d.readingTime));
                const percentage = (data.readingTime / maxTime) * 100;
                
                return (
                  <div key={data.bookId} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">{book?.title}</span>
                      <span className="text-gray-600">{formatTime(data.readingTime)}</span>
                    </div>
                    <Progress value={percentage} className="h-2" />
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>نرخ تکمیل کتاب‌ها</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {readingData.slice(0, 5).map((data) => {
                const book = books.find(b => b.id === data.bookId);
                
                return (
                  <div key={data.bookId} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">{book?.title}</span>
                      <span className="text-gray-600">{data.completionRate}%</span>
                    </div>
                    <Progress value={data.completionRate} className="h-2" />
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
