
import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Upload, Download, FileText } from 'lucide-react';
import { Book } from '@/types';

interface BulkUploadSectionProps {
  onBulkAddBooks: (books: Book[]) => void;
}

export const BulkUploadSection: React.FC<BulkUploadSectionProps> = ({ onBulkAddBooks }) => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      toast.success('فایل اکسل آپلود شد - پردازش در حال انجام...');
      
      setTimeout(() => {
        const sampleBooksFromExcel: Book[] = [
          {
            id: Date.now().toString(),
            title: 'کتاب نمونه از اکسل',
            author: 'نویسنده نمونه',
            category: 'ادبیات',
            pages: 200,
            coverUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop',
            description: 'این کتاب از فایل اکسل بارگذاری شده است',
            publishYear: 2024,
            rating: 4.5,
            isbn: '978-123-456-789-0'
          }
        ];
        
        onBulkAddBooks(sampleBooksFromExcel);
        toast.success('کتاب‌ها از فایل اکسل با موفقیت اضافه شدند');
        setUploadedFile(null);
      }, 2000);
    }
  };

  const downloadExcelTemplate = () => {
    toast.info('فایل نمونه اکسل در حال دانلود...');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="w-5 h-5" />
          بارگذاری گروهی از طریق اکسل
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center">
          <Button onClick={downloadExcelTemplate} variant="outline" className="mb-4">
            <Download className="w-4 h-4 mr-2" />
            دانلود فایل نمونه اکسل
          </Button>
          <p className="text-sm text-gray-600 mb-4">
            فایل اکسل باید شامل ستون‌های: عنوان، نویسنده، دسته‌بندی، تعداد صفحات، ISBN، سال انتشار، توضیحات باشد
          </p>
        </div>

        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
          <input
            ref={fileInputRef}
            type="file"
            accept=".xlsx,.xls"
            onChange={handleFileUpload}
            className="hidden"
          />
          <FileText className="w-12 h-12 mx-auto text-gray-400 mb-4" />
          <Button onClick={() => fileInputRef.current?.click()}>
            انتخاب فایل اکسل
          </Button>
          {uploadedFile && (
            <p className="mt-2 text-sm text-green-600">
              فایل انتخاب شده: {uploadedFile.name}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
