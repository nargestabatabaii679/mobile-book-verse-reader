
import React, { useState } from 'react';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Edit, Trash2, Eye, Search } from 'lucide-react';
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

  const filteredBooks = books.filter(book => {
    const titleMatch = book.title.toLowerCase().includes(titleSearch.toLowerCase());
    const authorMatch = book.author.toLowerCase().includes(authorSearch.toLowerCase());
    return titleMatch && authorMatch;
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>مدیریت کتاب‌ها</CardTitle>
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
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
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
              {filteredBooks.map((book) => (
                <TableRow key={book.id}>
                  <TableCell className="font-medium">{book.title}</TableCell>
                  <TableCell>{book.author}</TableCell>
                  <TableCell>{book.category}</TableCell>
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
              هیچ کتابی با این معیارهای جستجو یافت نشد
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
