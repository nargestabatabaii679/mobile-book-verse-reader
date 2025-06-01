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
  const [isPageTurning, setIsPageTurning] = useState(false);

  if (!book) return null;

  // Generate mock pages for demonstration
  const totalPages = Math.min(book.pages, 20); // Limit to 20 pages for demo

  const nextPage = () => {
    if (currentPage < totalPages && !isPageTurning) {
      setIsPageTurning(true);
      setTimeout(() => {
        setCurrentPage(currentPage + 1);
        setIsPageTurning(false);
      }, 300);
    }
  };

  const prevPage = () => {
    if (currentPage > 1 && !isPageTurning) {
      setIsPageTurning(true);
      setTimeout(() => {
        setCurrentPage(currentPage - 1);
        setIsPageTurning(false);
      }, 300);
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

  const getPageContent = (pageNum: number) => {
    if (pageNum === 1) {
      return (
        <div className="text-center h-full flex flex-col justify-center">
          <img
            src={book.coverUrl}
            alt={book.title}
            className="w-32 h-44 object-cover mx-auto mb-4 rounded shadow-lg"
          />
          <h2 className="text-2xl font-bold mb-2 text-gray-800">{book.title}</h2>
          <p className="text-lg text-gray-600 mb-4">{book.author}</p>
          <p className="text-sm text-gray-700 px-4">{book.description.substring(0, 150)}...</p>
        </div>
      );
    } else {
      return (
        <div className="h-full flex flex-col justify-start p-6">
          <div className="text-center mb-6">
            <h3 className="text-lg font-bold text-gray-800 mb-2">
              فصل {Math.ceil(pageNum / 3)}
            </h3>
          </div>
          
          <div className="flex-1 text-gray-700 leading-relaxed text-justify">
            <p className="mb-4 indent-8">
              این متن نمونه‌ای از محتوای صفحه {pageNum} کتاب {book.title} است. 
              در یک پیاده‌سازی واقعی، این محتوا از پایگاه داده یا فایل‌های متنی بارگذاری می‌شود.
            </p>
            <p className="mb-4 indent-8">
              {book.description}
            </p>
            <p className="mb-4 indent-8">
              هر صفحه از کتاب حاوی محتوای ارزشمندی است که به خواننده کمک می‌کند تا درک بهتری از موضوع پیدا کند.
              این تجربه مطالعه با امکان ورق زدن صفحات، حس واقعی خواندن کتاب را ارائه می‌دهد.
            </p>
            {pageNum > 5 && (
              <p className="text-sm text-gray-500 mt-8">
                "خواندن کتاب مانند سفر کردن به دنیای جدیدی است که در آن می‌توانید تجربه‌های جدیدی کسب کنید."
              </p>
            )}
          </div>
          
          <div className="text-center text-xs text-gray-400 mt-4">
            صفحه {pageNum}
          </div>
        </div>
      );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl max-h-[95vh] bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200 p-0 overflow-hidden">
        <DialogHeader className="p-6 pb-2 bg-gradient-to-r from-amber-100 to-orange-100 border-b border-amber-200">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-bold text-amber-900">
              {book.title}
            </DialogTitle>
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowQR(!showQR)}
                className="text-amber-700 hover:bg-amber-200/50"
              >
                <QrCode className="w-4 h-4" />
                QR کد
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleDownload}
                className="text-amber-700 hover:bg-amber-200/50"
              >
                <Download className="w-4 h-4" />
                دانلود
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="text-amber-700 hover:bg-amber-200/50"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </DialogHeader>
        
        <div className="flex-1 p-6">
          {showQR ? (
            <div className="flex justify-center items-center h-96">
              <QRCodeGenerator book={book} />
            </div>
          ) : (
            <>
              {/* Book Reader with realistic book appearance */}
              <div className="max-w-6xl mx-auto">
                <div className="relative bg-gradient-to-br from-amber-100 to-yellow-50 rounded-2xl shadow-2xl overflow-hidden border-4 border-amber-200">
                  {/* Book binding effect */}
                  <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-amber-800 to-amber-600 shadow-inner"></div>
                  
                  {/* Double page spread layout */}
                  <div className="flex min-h-[600px]">
                    {/* Left Page */}
                    {currentPage > 1 && (
                      <div className={`w-1/2 border-r-2 border-amber-300/50 relative transition-all duration-300 ${
                        isPageTurning ? 'transform -skew-y-1 opacity-50' : ''
                      }`}>
                        <div className="absolute inset-0 p-8 ml-8">
                          <div className="h-full bg-white/80 rounded-lg shadow-inner p-6 overflow-y-auto">
                            {getPageContent(currentPage - 1)}
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {/* Right Page */}
                    <div className={`${currentPage === 1 ? 'w-full' : 'w-1/2'} relative transition-all duration-300 ${
                      isPageTurning ? 'transform skew-y-1 opacity-50' : ''
                    }`}>
                      <div className={`absolute inset-0 p-8 ${currentPage === 1 ? 'ml-8' : ''}`}>
                        <div className="h-full bg-white/90 rounded-lg shadow-inner p-6 overflow-y-auto">
                          {getPageContent(currentPage)}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Page shadow effects */}
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 left-0 right-0 h-4 bg-gradient-to-b from-black/10 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-black/10 to-transparent"></div>
                  </div>
                </div>
              </div>
              
              {/* Enhanced Navigation Controls */}
              <div className="flex items-center justify-between mt-8 max-w-6xl mx-auto">
                <Button
                  variant="outline"
                  onClick={prevPage}
                  disabled={currentPage === 1 || isPageTurning}
                  className="bg-amber-100 border-amber-300 text-amber-800 hover:bg-amber-200 disabled:opacity-50 px-6 py-3 text-lg"
                >
                  <ChevronRight className="w-5 h-5 mr-2" />
                  صفحه قبل
                </Button>
                
                <div className="flex items-center space-x-6 rtl:space-x-reverse text-amber-800">
                  <span className="text-lg font-medium">{currentPage} از {totalPages}</span>
                  <div className="w-48 bg-amber-200 rounded-full h-3 overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-amber-500 to-orange-500 h-3 rounded-full transition-all duration-500 ease-out"
                      style={{ width: `${(currentPage / totalPages) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm text-amber-600">
                    {Math.round((currentPage / totalPages) * 100)}%
                  </span>
                </div>
                
                <Button
                  variant="outline"
                  onClick={nextPage}
                  disabled={currentPage === totalPages || isPageTurning}
                  className="bg-amber-100 border-amber-300 text-amber-800 hover:bg-amber-200 disabled:opacity-50 px-6 py-3 text-lg"
                >
                  صفحه بعد
                  <ChevronLeft className="w-5 h-5 ml-2" />
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
