
import React, { useState } from 'react';
import { Book } from '@/types';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Download, QrCode, X } from 'lucide-react';
import { QRCodeGenerator } from './QRCodeGenerator';

interface BookReaderProps {
  book: Book | null;
  isOpen: boolean;
  onClose: () => void;
}

const BookReader: React.FC<BookReaderProps> = ({ book, isOpen, onClose }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [showQR, setShowQR] = useState(false);

  if (!book) return null;

  // Generate mock pages for demonstration
  const totalPages = Math.min(book.pages, 20); // Limit to 20 pages for demo

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleDownload = () => {
    // Create a simple text file with book info for demo
    const content = `
عنوان: ${book.title}
نویسنده: ${book.author}
دسته‌بندی: ${book.category}
تعداد صفحات: ${book.pages}
سال انتشار: ${book.publishYear}
امتیاز: ${book.rating}/5

توضیحات:
${book.description}
    `;
    
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${book.title}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[95vh] bg-gray-900/95 border-gray-700 p-0">
        <DialogHeader className="p-6 pb-2">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-bold text-white">
              {book.title}
            </DialogTitle>
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowQR(!showQR)}
                className="text-white hover:bg-white/10"
              >
                <QrCode className="w-4 h-4" />
                QR کد
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleDownload}
                className="text-white hover:bg-white/10"
              >
                <Download className="w-4 h-4" />
                دانلود
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="text-white hover:bg-white/10"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </DialogHeader>
        
        <div className="flex-1 px-6 pb-6">
          {showQR ? (
            <div className="flex justify-center items-center h-96">
              <QRCodeGenerator book={book} />
            </div>
          ) : (
            <>
              {/* Book Reader */}
              <div className="bg-white rounded-lg shadow-2xl mx-auto max-w-4xl">
                <div className="aspect-[3/4] relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg overflow-hidden">
                  <div className="absolute inset-4 bg-white rounded shadow-inner p-8">
                    <div className="h-full flex flex-col">
                      <div className="text-center mb-6">
                        <h3 className="text-xl font-bold text-gray-800 mb-2">
                          {book.title}
                        </h3>
                        <p className="text-gray-600">صفحه {currentPage}</p>
                      </div>
                      
                      <div className="flex-1 text-gray-700 leading-relaxed">
                        {currentPage === 1 ? (
                          <div className="text-center">
                            <img
                              src={book.coverUrl}
                              alt={book.title}
                              className="w-48 h-64 object-cover mx-auto mb-4 rounded shadow"
                            />
                            <h2 className="text-2xl font-bold mb-2">{book.title}</h2>
                            <p className="text-lg text-gray-600 mb-4">{book.author}</p>
                            <p className="text-sm">{book.description.substring(0, 200)}...</p>
                          </div>
                        ) : (
                          <div>
                            <p className="mb-4">
                              این صفحه {currentPage} از کتاب {book.title} است.
                            </p>
                            <p className="mb-4">
                              {book.description}
                            </p>
                            <p className="text-sm text-gray-500 mt-8">
                              محتوای نمونه برای نمایش عملکرد ورق زن کتاب.
                              در پیاده‌سازی واقعی، محتوای صفحات از پایگاه داده یا فایل‌های PDF بارگذاری می‌شود.
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Navigation Controls */}
              <div className="flex items-center justify-between mt-6 max-w-4xl mx-auto">
                <Button
                  variant="outline"
                  onClick={prevPage}
                  disabled={currentPage === 1}
                  className="bg-white/20 border-white/30 text-white hover:bg-white/30 disabled:opacity-50"
                >
                  <ChevronRight className="w-4 h-4 mr-2" />
                  صفحه قبل
                </Button>
                
                <div className="flex items-center space-x-4 rtl:space-x-reverse text-white">
                  <span>{currentPage} از {totalPages}</span>
                  <div className="w-32 bg-white/20 rounded-full h-2">
                    <div 
                      className="bg-blue-400 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(currentPage / totalPages) * 100}%` }}
                    />
                  </div>
                </div>
                
                <Button
                  variant="outline"
                  onClick={nextPage}
                  disabled={currentPage === totalPages}
                  className="bg-white/20 border-white/30 text-white hover:bg-white/30 disabled:opacity-50"
                >
                  صفحه بعد
                  <ChevronLeft className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BookReader;
