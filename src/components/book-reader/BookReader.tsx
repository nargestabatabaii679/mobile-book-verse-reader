
import React, { useState, useEffect } from 'react';
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
import './BookReader.css';

interface BookReaderProps {
  book: Book | null;
  isOpen: boolean;
  onClose: () => void;
}

const BookReader: React.FC<BookReaderProps> = ({ book, isOpen, onClose }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [showQR, setShowQR] = useState(false);
  const [isPageTurning, setIsPageTurning] = useState(false);
  const [pageFlipDirection, setPageFlipDirection] = useState<'left' | 'right' | null>(null);
  const [isBookOpening, setIsBookOpening] = useState(false);

  if (!book) return null;

  // Generate mock pages for demonstration
  const totalPages = Math.min(book.pages, 20); // Limit to 20 pages for demo

  // Reset page when book changes and trigger opening animation
  useEffect(() => {
    if (book && isOpen) {
      setCurrentPage(1);
      setIsBookOpening(true);
      setTimeout(() => {
        setIsBookOpening(false);
      }, 800);
    }
  }, [book, isOpen]);

  const nextPage = () => {
    if (currentPage < totalPages && !isPageTurning) {
      setIsPageTurning(true);
      setPageFlipDirection('left');
      setTimeout(() => {
        setCurrentPage(currentPage + 1);
        setIsPageTurning(false);
        setPageFlipDirection(null);
      }, 600);
    }
  };

  const prevPage = () => {
    if (currentPage > 1 && !isPageTurning) {
      setIsPageTurning(true);
      setPageFlipDirection('right');
      setTimeout(() => {
        setCurrentPage(currentPage - 1);
        setIsPageTurning(false);
        setPageFlipDirection(null);
      }, 600);
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

  const getPageFlipStyle = (isRightPage: boolean) => {
    if (!isPageTurning) return {};
    
    if (pageFlipDirection === 'left') {
      return isRightPage ? {
        transform: 'perspective(1000px) rotateY(-180deg)',
        transformOrigin: 'left center',
        zIndex: 10,
        transition: 'transform 0.6s ease-in-out'
      } : {};
    } else if (pageFlipDirection === 'right') {
      return !isRightPage ? {
        transform: 'perspective(1000px) rotateY(180deg)',
        transformOrigin: 'right center',
        zIndex: 10,
        transition: 'transform 0.6s ease-in-out'
      } : {};
    }
    
    return {};
  };

  const handlePageClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const isRightSide = clickX > rect.width / 2;
    
    if (isRightSide) {
      nextPage();
    } else {
      prevPage();
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
              {/* Enhanced Book Reader with realistic 3D page turning effect */}
              <div className="max-w-6xl mx-auto perspective-1000">
                <div 
                  className={`relative bg-gradient-to-br from-amber-100 to-yellow-50 rounded-2xl shadow-2xl overflow-hidden border-4 border-amber-200 cursor-pointer transition-all duration-800 ${
                    isBookOpening ? 'scale-95 opacity-80' : 'scale-100 opacity-100'
                  }`}
                  onClick={handlePageClick}
                >
                  {/* Book spine effect */}
                  <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-amber-800 to-amber-600 shadow-inner z-20"></div>
                  
                  {/* Enhanced double page spread with realistic book effect */}
                  <div className="flex min-h-[600px] relative">
                    {/* Left Page */}
                    {currentPage > 1 && (
                      <div 
                        className="w-1/2 border-r-2 border-amber-300/50 relative transition-all duration-600 ease-in-out transform-gpu hover:bg-amber-50"
                        style={{
                          ...getPageFlipStyle(false),
                          backfaceVisibility: 'hidden'
                        }}
                      >
                        <div className="absolute inset-0 p-8 ml-8">
                          <div className="h-full bg-white/90 rounded-lg shadow-inner p-6 overflow-y-auto relative">
                            {/* Page curl shadow effect */}
                            <div className="absolute top-0 right-0 w-8 h-8 bg-gradient-to-bl from-gray-300/50 to-transparent opacity-30 transform rotate-45"></div>
                            {getPageContent(currentPage - 1)}
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {/* Right Page */}
                    <div 
                      className={`${currentPage === 1 ? 'w-full' : 'w-1/2'} relative transition-all duration-600 ease-in-out transform-gpu hover:bg-amber-50`}
                      style={{
                        ...getPageFlipStyle(true),
                        backfaceVisibility: 'hidden'
                      }}
                    >
                      <div className={`absolute inset-0 p-8 ${currentPage === 1 ? 'ml-8' : ''}`}>
                        <div className="h-full bg-white/95 rounded-lg shadow-inner p-6 overflow-y-auto relative">
                          {/* Page curl shadow effect */}
                          <div className="absolute top-0 left-0 w-8 h-8 bg-gradient-to-br from-gray-300/50 to-transparent opacity-30 transform -rotate-45"></div>
                          {getPageContent(currentPage)}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Enhanced shadow and lighting effects */}
                  <div className="absolute inset-0 pointer-events-none">
                    {/* Top shadow */}
                    <div className="absolute top-0 left-8 right-0 h-4 bg-gradient-to-b from-black/15 to-transparent"></div>
                    {/* Bottom shadow */}
                    <div className="absolute bottom-0 left-8 right-0 h-4 bg-gradient-to-t from-black/15 to-transparent"></div>
                    {/* Center binding shadow */}
                    <div className="absolute top-0 bottom-0 left-1/2 w-4 bg-gradient-to-r from-black/10 via-black/5 to-black/10 transform -translate-x-1/2"></div>
                    {/* Page turning shadow overlay */}
                    {isPageTurning && (
                      <div className="absolute inset-0 bg-black/5 transition-opacity duration-300"></div>
                    )}
                    {/* Book opening effect */}
                    {isBookOpening && (
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
                    )}
                  </div>

                  {/* Click areas hint (invisible but functional) */}
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute left-0 top-0 bottom-0 w-1/2 pointer-events-auto cursor-w-resize" title="صفحه قبل"></div>
                    <div className="absolute right-0 top-0 bottom-0 w-1/2 pointer-events-auto cursor-e-resize" title="صفحه بعد"></div>
                  </div>
                </div>
              </div>
              
              {/* Enhanced Navigation Controls with page turning feedback */}
              <div className="flex items-center justify-between mt-8 max-w-6xl mx-auto">
                <Button
                  variant="outline"
                  onClick={prevPage}
                  disabled={currentPage === 1 || isPageTurning}
                  className="bg-amber-100 border-amber-300 text-amber-800 hover:bg-amber-200 disabled:opacity-50 px-6 py-3 text-lg transition-all duration-200 hover:scale-105 active:scale-95"
                >
                  <ChevronRight className="w-5 h-5 mr-2" />
                  صفحه قبل
                </Button>
                
                <div className="flex items-center space-x-6 rtl:space-x-reverse text-amber-800">
                  <span className="text-lg font-medium">{currentPage} از {totalPages}</span>
                  <div className="w-48 bg-amber-200 rounded-full h-3 overflow-hidden shadow-inner">
                    <div 
                      className="bg-gradient-to-r from-amber-500 to-orange-500 h-3 rounded-full transition-all duration-700 ease-out shadow-sm"
                      style={{ width: `${(currentPage / totalPages) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm text-amber-600 font-medium">
                    {Math.round((currentPage / totalPages) * 100)}%
                  </span>
                </div>
                
                <Button
                  variant="outline"
                  onClick={nextPage}
                  disabled={currentPage === totalPages || isPageTurning}
                  className="bg-amber-100 border-amber-300 text-amber-800 hover:bg-amber-200 disabled:opacity-50 px-6 py-3 text-lg transition-all duration-200 hover:scale-105 active:scale-95"
                >
                  صفحه بعد
                  <ChevronLeft className="w-5 h-5 ml-2" />
                </Button>
              </div>
              
              {/* Page turning indicator */}
              {isPageTurning && (
                <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black/70 text-white px-4 py-2 rounded-full text-sm z-50">
                  در حال ورق زدن...
                </div>
              )}

              {/* Opening book indicator */}
              {isBookOpening && (
                <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-amber-800/80 text-white px-6 py-3 rounded-full text-lg z-50 animate-pulse">
                  📖 در حال باز کردن کتاب...
                </div>
              )}
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BookReader;
