
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { useBookLogs } from '@/hooks/useBookLogs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Calendar, BookOpen, Users } from 'lucide-react';
import { format } from 'date-fns';

export const BookOperationsLog = () => {
  const { data: logs = [], isLoading } = useBookLogs();

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            لاگ عملیات کتاب‌ها
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-4">در حال بارگذاری...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          لاگ عملیات کتاب‌ها
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-96">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>نوع عملیات</TableHead>
                <TableHead>تعداد کتاب</TableHead>
                <TableHead>وضعیت</TableHead>
                <TableHead>زمان</TableHead>
                <TableHead>جزئیات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {logs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {log.operation_type === 'single' ? (
                        <BookOpen className="w-4 h-4" />
                      ) : (
                        <Users className="w-4 h-4" />
                      )}
                      <span>
                        {log.operation_type === 'single' ? 'افزودن تکی' : 'افزودن گروهی'}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {log.books_count} کتاب
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant={
                        log.status === 'success' ? 'default' : 
                        log.status === 'failed' ? 'destructive' : 'secondary'
                      }
                    >
                      {log.status === 'success' ? 'موفق' : 
                       log.status === 'failed' ? 'ناموفق' : 'جزئی'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm text-gray-600">
                      {format(new Date(log.created_at), 'yyyy/MM/dd HH:mm')}
                    </div>
                  </TableCell>
                  <TableCell>
                    {log.operation_details && (
                      <div className="text-xs text-gray-500">
                        {log.operation_type === 'single' ? (
                          <div>
                            <div>عنوان: {log.operation_details.title}</div>
                            <div>نویسنده: {log.operation_details.author}</div>
                          </div>
                        ) : (
                          <div>
                            <div>دسته‌ها: {log.operation_details.categories?.join(', ')}</div>
                            <div>مجموع صفحات: {log.operation_details.total_pages}</div>
                          </div>
                        )}
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
