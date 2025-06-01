
import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Upload, Download, FileText, ImageIcon, FileIcon, CheckCircle2, XCircle, Loader2 } from 'lucide-react';
import { Book } from '@/types';

interface BulkUploadSectionProps {
  onBulkAddBooks: (books: Book[]) => void;
}

interface UploadFile {
  file: File;
  type: 'excel' | 'pdf' | 'image';
  status: 'pending' | 'uploading' | 'success' | 'error';
  progress: number;
}

export const BulkUploadSection: React.FC<BulkUploadSectionProps> = ({ onBulkAddBooks }) => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const excelInputRef = useRef<HTMLInputElement>(null);
  const pdfInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (files: FileList | null, type: 'excel' | 'pdf' | 'image') => {
    if (!files) return;

    const newFiles: UploadFile[] = Array.from(files).map(file => ({
      file,
      type,
      status: 'pending',
      progress: 0
    }));

    setUploadedFiles(prev => [...prev, ...newFiles]);

    // شبیه‌سازی آپلود فایل‌ها
    newFiles.forEach((uploadFile, index) => {
      setTimeout(() => {
        simulateUpload(uploadFile);
      }, index * 500);
    });
  };

  const simulateUpload = (uploadFile: UploadFile) => {
    setUploadedFiles(prev => 
      prev.map(f => f === uploadFile ? { ...f, status: 'uploading' } : f)
    );

    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 30;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        
        setUploadedFiles(prev => 
          prev.map(f => f === uploadFile ? { ...f, status: 'success', progress: 100 } : f)
        );

        if (uploadFile.type === 'excel') {
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
          }, 1000);
        }
      } else {
        setUploadedFiles(prev => 
          prev.map(f => f === uploadFile ? { ...f, progress } : f)
        );
      }
    }, 200);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (file.type.includes('sheet') || file.name.endsWith('.xlsx') || file.name.endsWith('.xls')) {
        handleFileUpload(files, 'excel');
      } else if (file.type === 'application/pdf') {
        handleFileUpload(files, 'pdf');
      } else if (file.type.startsWith('image/')) {
        handleFileUpload(files, 'image');
      }
    }
  };

  const removeFile = (fileToRemove: UploadFile) => {
    setUploadedFiles(prev => prev.filter(f => f !== fileToRemove));
  };

  const downloadExcelTemplate = () => {
    toast.info('فایل نمونه اکسل در حال دانلود...');
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'excel': return FileText;
      case 'pdf': return FileIcon;
      case 'image': return ImageIcon;
      default: return FileText;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'uploading': return Loader2;
      case 'success': return CheckCircle2;
      case 'error': return XCircle;
      default: return FileText;
    }
  };

  return (
    <div className="space-y-6">
      <Card className="overflow-hidden border-0 shadow-2xl bg-gradient-to-br from-white via-blue-50 to-purple-50">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <CardTitle className="flex items-center gap-3 text-2xl">
            <Upload className="w-6 h-6" />
            بارگذاری گروهی فایل‌ها
          </CardTitle>
        </CardHeader>
        <CardContent className="p-8 space-y-8">
          {/* دانلود فایل نمونه */}
          <div className="text-center">
            <Button 
              onClick={downloadExcelTemplate} 
              variant="outline" 
              className="mb-6 bg-white hover:bg-blue-50 border-blue-200 text-blue-700 shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              <Download className="w-4 h-4 mr-2" />
              دانلود فایل نمونه اکسل
            </Button>
            <p className="text-sm text-gray-600 mb-6 bg-blue-50 p-4 rounded-lg border-r-4 border-blue-400">
              فایل اکسل باید شامل ستون‌های: عنوان، نویسنده، دسته‌بندی، تعداد صفحات، ISBN، سال انتشار، توضیحات باشد
            </p>
          </div>

          {/* منطقه drag & drop */}
          <div 
            className={`border-2 border-dashed rounded-xl p-12 text-center transition-all duration-300 ${
              isDragging 
                ? 'border-blue-400 bg-blue-50 scale-105 shadow-lg' 
                : 'border-gray-300 hover:border-blue-300 hover:bg-blue-25'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div className="flex flex-col items-center space-y-4">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
                <Upload className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-700">فایل‌ها را اینجا بکشید و رها کنید</h3>
              <p className="text-gray-500">یا روی دکمه‌های زیر کلیک کنید</p>
            </div>
          </div>

          {/* دکمه‌های انتخاب فایل */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* اکسل */}
            <div className="group">
              <input
                ref={excelInputRef}
                type="file"
                accept=".xlsx,.xls"
                onChange={(e) => handleFileUpload(e.target.files, 'excel')}
                className="hidden"
              />
              <Button 
                onClick={() => excelInputRef.current?.click()}
                className="w-full h-24 bg-gradient-to-br from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 group-hover:shadow-green-200"
              >
                <div className="flex flex-col items-center space-y-2">
                  <FileText className="w-8 h-8" />
                  <span className="font-medium">فایل اکسل</span>
                </div>
              </Button>
            </div>

            {/* PDF */}
            <div className="group">
              <input
                ref={pdfInputRef}
                type="file"
                accept=".pdf"
                multiple
                onChange={(e) => handleFileUpload(e.target.files, 'pdf')}
                className="hidden"
              />
              <Button 
                onClick={() => pdfInputRef.current?.click()}
                className="w-full h-24 bg-gradient-to-br from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 group-hover:shadow-red-200"
              >
                <div className="flex flex-col items-center space-y-2">
                  <FileIcon className="w-8 h-8" />
                  <span className="font-medium">فایل‌های PDF</span>
                </div>
              </Button>
            </div>

            {/* تصاویر */}
            <div className="group">
              <input
                ref={imageInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => handleFileUpload(e.target.files, 'image')}
                className="hidden"
              />
              <Button 
                onClick={() => imageInputRef.current?.click()}
                className="w-full h-24 bg-gradient-to-br from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 group-hover:shadow-purple-200"
              >
                <div className="flex flex-col items-center space-y-2">
                  <ImageIcon className="w-8 h-8" />
                  <span className="font-medium">تصاویر جلد</span>
                </div>
              </Button>
            </div>
          </div>

          {/* لیست فایل‌های آپلود شده */}
          {uploadedFiles.length > 0 && (
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-700 border-b border-gray-200 pb-2">
                فایل‌های آپلود شده
              </h4>
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {uploadedFiles.map((uploadFile, index) => {
                  const FileIcon = getFileIcon(uploadFile.type);
                  const StatusIcon = getStatusIcon(uploadFile.status);
                  
                  return (
                    <div 
                      key={index}
                      className="flex items-center space-x-4 space-x-reverse p-4 bg-white rounded-lg border shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="flex-shrink-0">
                        <FileIcon className="w-8 h-8 text-blue-500" />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {uploadFile.file.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {(uploadFile.file.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>

                      {/* نوار پیشرفت */}
                      {uploadFile.status === 'uploading' && (
                        <div className="flex-1 mx-4">
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${uploadFile.progress}%` }}
                            />
                          </div>
                          <p className="text-xs text-gray-500 mt-1">{Math.round(uploadFile.progress)}%</p>
                        </div>
                      )}

                      <div className="flex items-center space-x-2 space-x-reverse">
                        <StatusIcon 
                          className={`w-5 h-5 ${
                            uploadFile.status === 'uploading' ? 'animate-spin text-blue-500' :
                            uploadFile.status === 'success' ? 'text-green-500' :
                            uploadFile.status === 'error' ? 'text-red-500' : 'text-gray-400'
                          }`}
                        />
                        
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFile(uploadFile)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        >
                          <XCircle className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
