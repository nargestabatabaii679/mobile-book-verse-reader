
import React, { useState } from 'react';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2, Eye, Search, Sparkles } from 'lucide-react';
import { Book } from '@/types';

interface BookManagementTableProps {
  books: Book[];
  onEditBook: (book: Book) => void;
  onDeleteBook: (id: string) => void;
  onViewBook: (book: Book) => void;
}

export const BookManagementTable: React.FC<BookManagementTableProps> = ({
  books,
  onEditBook,
  onDeleteBook,
  onViewBook
}) => {
  const [titleSearch, setTitleSearch] = useState('');
  const [authorSearch, setAuthorSearch] = useState('');
  const [showInteractiveOnly, setShowInteractiveOnly] = useState(false);

  const filteredBooks = books.filter(book => {
    const titleMatch = book.title.toLowerCase().includes(titleSearch.toLowerCase());
    const authorMatch = book.author.toLowerCase().includes(authorSearch.toLowerCase());
    const interactiveMatch = showInteractiveOnly ? book.interactiveStoryId : true;
    return titleMatch && authorMatch && interactiveMatch;
  });

  const interactiveBooks = books.filter(book => book.interactiveStoryId);
  const regularBooks = books.filter(book => !book.interactiveStoryId);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          مدیریت کتاب‌ها
          <div className="flex gap-2 text-sm">
            <Badge variant="secondary">{books.length} کل</Badge>
            <Badge variant="default" className="bg-purple-600">
              <Sparkles className="w-3 h-3 mr-1" />
              {interactiveBooks.length} تعاملی
            </Badge>
          </div>
        </CardTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              type="text"
              placeholder="جستجو بر اساس عنوان کتاب..."
              value={titleSearch}
              onChange={(e) => setTitleSearch(e.target.value)}
              className="pl-10 pr-4"
            />
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              type="text"
              placeholder="جستجو بر اساس نام نویسنده..."
              value={authorSearch}
              onChange={(e) => setAuthorSearch(e.target.value)}
              className="pl-10 pr-4"
            />
          </div>
        </div>
        <div className="flex gap-2 mt-4">
          <Button
            variant={showInteractiveOnly ? "default" : "outline"}
            onClick={() => setShowInteractiveOnly(!showInteractiveOnly)}
            className="flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            {showInteractiveOnly ? 'نمایش همه' : 'فقط داستان‌های تعاملی'}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>نوع</TableHead>
                <TableHead>عنوان</TableHead>
                <TableHead>نویسنده</TableHead>
                <TableHead>دسته‌بندی</TableHead>
                <TableHead>صفحات</TableHead>
                <TableHead>امتیاز</TableHead>
                <TableHead>عملیات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBooks.map((book) => (
                <TableRow key={book.id}>
                  <TableCell>
                    {book.interactiveStoryId ? (
                      <Badge className="bg-purple-600 text-white">
                        <Sparkles className="w-3 h-3 mr-1" />
                        تعاملی
                      </Badge>
                    ) : (
                      <Badge variant="outline">معمولی</Badge>
                    )}
                  </TableCell>
                  <TableCell className="font-medium">{book.title}</TableCell>
                  <TableCell>{book.author}</TableCell>
                  <TableCell>
                    <Badge variant={book.category === 'داستان تعاملی' ? 'default' : 'secondary'}>
                      {book.category}
                    </Badge>
                  </TableCell>
                  <TableCell>{book.pages}</TableCell>
                  <TableCell>{book.rating}/5</TableCell>
                  <TableCell>
                    <div className="flex space-x-2 rtl:space-x-reverse">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onViewBook(book)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onEditBook(book)}
                        className="text-green-600 hover:text-green-800"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onDeleteBook(book.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          {filteredBooks.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <Sparkles className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              هیچ کتابی با این معیارهای جستجو یافت نشد
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
