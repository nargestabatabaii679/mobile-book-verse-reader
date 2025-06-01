
import React, { useState, useEffect } from 'react';
import { Book } from '@/types';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Download, QrCode, X, Maximize2, Minimize2 } from 'lucide-react';
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
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null);

  if (!book) return null;

  // Generate mock pages for demonstration
  const totalPages = Math.min(book.pages, 20);

  // Reset page when book changes and trigger opening animation
  useEffect(() => {
    if (book && isOpen) {
      setCurrentPage(1);
      setIsBookOpening(true);
      setTimeout(() => {
        setIsBookOpening(false);
      }, 1200);
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
      }, 800);
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
      }, 800);
    }
  };

  const handleDownload = () => {
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
        <div className="text-center h-full flex flex-col justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-amber-50 opacity-60"></div>
          <div className="relative z-10">
            <div className="relative mb-6">
              <img
                src={book.coverUrl}
                alt={book.title}
                className="w-40 h-56 object-cover mx-auto rounded-lg shadow-2xl transform hover:scale-105 transition-all duration-500 ring-4 ring-white/50"
              />
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full shadow-lg animate-pulse"></div>
            </div>
            <h2 className="text-3xl font-bold mb-3 text-gray-800 tracking-wide">{book.title}</h2>
            <p className="text-xl text-gray-600 mb-6 font-medium">{book.author}</p>
            <div className="max-w-md mx-auto">
              <p className="text-sm text-gray-700 leading-relaxed px-6 py-4 bg-white/70 rounded-xl shadow-inner backdrop-blur-sm">
                {book.description.substring(0, 200)}...
              </p>
            </div>
            <div className="mt-6 flex justify-center space-x-4 rtl:space-x-reverse">
              <div className="flex items-center space-x-1 rtl:space-x-reverse text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={`text-lg ${i < book.rating ? 'opacity-100' : 'opacity-30'}`}>⭐</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="h-full flex flex-col justify-start p-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-50/50 via-white to-blue-50/30"></div>
          <div className="relative z-10">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-2 tracking-wide">
                فصل {Math.ceil(pageNum / 3)}
              </h3>
              <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-blue-500 mx-auto rounded-full"></div>
            </div>
            
            <div className="flex-1 text-gray-700 leading-8 text-justify space-y-6">
              <p className="indent-8 text-base">
                این متن نمونه‌ای از محتوای صفحه {pageNum} کتاب {book.title} است. 
                در یک پیاده‌سازی واقعی، این محتوا از پایگاه داده یا فایل‌های متنی بارگذاری می‌شود.
              </p>
              <p className="indent-8 text-base bg-white/50 p-4 rounded-lg shadow-sm">
                {book.description}
              </p>
              <p className="indent-8 text-base">
                هر صفحه از کتاب حاوی محتوای ارزشمندی است که به خواننده کمک می‌کند تا درک بهتری از موضوع پیدا کند.
                این تجربه مطالعه با امکان ورق زدن صفحات، حس واقعی خواندن کتاب را ارائه می‌دهد.
              </p>
              {pageNum > 5 && (
                <blockquote className="border-l-4 border-amber-400 pl-4 py-2 bg-amber-50 rounded-r-lg">
                  <p className="text-sm text-gray-600 italic">
                    "خواندن کتاب مانند سفر کردن به دنیای جدیدی است که در آن می‌توانید تجربه‌های جدیدی کسب کنید."
                  </p>
                </blockquote>
              )}
            </div>
            
            <div className="text-center text-xs text-gray-400 mt-6 pt-4 border-t border-gray-200">
              صفحه {pageNum} از {totalPages}
            </div>
          </div>
        </div>
      );
    }
  };

  const getPageFlipStyle = (isRightPage: boolean) => {
    if (!isPageTurning) return {};
    
    if (pageFlipDirection === 'left') {
      return isRightPage ? {
        transform: 'perspective(1200px) rotateY(-180deg)',
        transformOrigin: 'left center',
        zIndex: 10,
        transition: 'transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
      } : {};
    } else if (pageFlipDirection === 'right') {
      return !isRightPage ? {
        transform: 'perspective(1200px) rotateY(180deg)',
        transformOrigin: 'right center',
        zIndex: 10,
        transition: 'transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
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

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    setTouchStart({ x: touch.clientX, y: touch.clientY });
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart) return;
    
    const touch = e.changedTouches[0];
    const deltaX = touch.clientX - touchStart.x;
    const deltaY = touch.clientY - touchStart.y;
    
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
      if (deltaX > 0) {
        prevPage(); // Swipe right - previous page
      } else {
        nextPage(); // Swipe left - next page
      }
    }
    
    setTouchStart(null);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={`${isFullscreen ? 'max-w-full max-h-full w-full h-full' : 'max-w-7xl max-h-[95vh]'} bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 border-slate-700 p-0 overflow-hidden transition-all duration-500`}>
        <DialogHeader className="p-6 pb-2 bg-gradient-to-r from-slate-800/90 to-blue-800/90 border-b border-slate-700 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-bold text-white flex items-center space-x-3 rtl:space-x-reverse">
              <span className="w-2 h-8 bg-gradient-to-b from-amber-400 to-blue-500 rounded-full"></span>
              <span>{book.title}</span>
            </DialogTitle>
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowQR(!showQR)}
                className="text-blue-300 hover:bg-blue-800/50 hover:text-white transition-all duration-300"
              >
                <QrCode className="w-4 h-4" />
                QR کد
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleDownload}
                className="text-blue-300 hover:bg-blue-800/50 hover:text-white transition-all duration-300"
              >
                <Download className="w-4 h-4" />
                دانلود
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="text-blue-300 hover:bg-blue-800/50 hover:text-white transition-all duration-300"
              >
                {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="text-blue-300 hover:bg-red-600/50 hover:text-white transition-all duration-300"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </DialogHeader>
        
        <div className="flex-1 p-6 relative">
          {showQR ? (
            <div className="flex justify-center items-center h-96">
              <QRCodeGenerator book={book} />
            </div>
          ) : (
            <>
              {/* Enhanced Modern Book Reader */}
              <div className="max-w-6xl mx-auto perspective-1200">
                <div 
                  className={`modern-book-container relative bg-gradient-to-br from-white via-blue-50 to-amber-50 rounded-3xl shadow-2xl overflow-hidden border border-white/30 cursor-pointer transition-all duration-1000 ${
                    isBookOpening ? 'scale-95 opacity-70 rotate-x-10' : 'scale-100 opacity-100 rotate-x-0'
                  }`}
                  onClick={handlePageClick}
                  onTouchStart={handleTouchStart}
                  onTouchEnd={handleTouchEnd}
                >
                  {/* Modern book spine with glowing effect */}
                  <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-slate-800 via-blue-800 to-slate-700 shadow-inner z-20 rounded-l-3xl">
                    <div className="absolute inset-1 bg-gradient-to-r from-blue-400/20 to-amber-400/20 rounded-l-2xl animate-pulse"></div>
                  </div>
                  
                  {/* Enhanced double page spread */}
                  <div className="flex min-h-[650px] relative">
                    {/* Left Page */}
                    {currentPage > 1 && (
                      <div 
                        className="w-1/2 border-r border-slate-300/30 relative transition-all duration-800 ease-out transform-gpu hover:bg-gradient-to-r hover:from-white/50 hover:to-blue-50/30"
                        style={{
                          ...getPageFlipStyle(false),
                          backfaceVisibility: 'hidden'
                        }}
                      >
                        <div className="absolute inset-0 p-8 ml-12">
                          <div className="h-full bg-white/95 rounded-2xl shadow-lg p-8 overflow-y-auto relative backdrop-blur-sm border border-white/40">
                            <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-bl from-slate-200/50 to-transparent opacity-40 transform rotate-45 rounded-full"></div>
                            {getPageContent(currentPage - 1)}
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {/* Right Page */}
                    <div 
                      className={`${currentPage === 1 ? 'w-full' : 'w-1/2'} relative transition-all duration-800 ease-out transform-gpu hover:bg-gradient-to-l hover:from-white/50 hover:to-amber-50/30`}
                      style={{
                        ...getPageFlipStyle(true),
                        backfaceVisibility: 'hidden'
                      }}
                    >
                      <div className={`absolute inset-0 p-8 ${currentPage === 1 ? 'ml-12' : ''}`}>
                        <div className="h-full bg-white/95 rounded-2xl shadow-lg p-8 overflow-y-auto relative backdrop-blur-sm border border-white/40">
                          <div className="absolute top-0 left-0 w-12 h-12 bg-gradient-to-br from-slate-200/50 to-transparent opacity-40 transform -rotate-45 rounded-full"></div>
                          {getPageContent(currentPage)}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Enhanced modern lighting effects */}
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 left-12 right-0 h-6 bg-gradient-to-b from-black/10 to-transparent rounded-t-3xl"></div>
                    <div className="absolute bottom-0 left-12 right-0 h-6 bg-gradient-to-t from-black/15 to-transparent rounded-b-3xl"></div>
                    <div className="absolute top-0 bottom-0 left-1/2 w-6 bg-gradient-to-r from-black/5 via-black/10 to-black/5 transform -translate-x-1/2"></div>
                    
                    {isPageTurning && (
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-white/20 to-amber-500/10 transition-opacity duration-300 animate-pulse"></div>
                    )}
                    
                    {isBookOpening && (
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
                    )}
                  </div>

                  {/* Interactive hover indicators */}
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute left-0 top-0 bottom-0 w-1/2 pointer-events-auto cursor-w-resize transition-colors duration-300 hover:bg-gradient-to-r hover:from-blue-500/5 hover:to-transparent" title="صفحه قبل"></div>
                    <div className="absolute right-0 top-0 bottom-0 w-1/2 pointer-events-auto cursor-e-resize transition-colors duration-300 hover:bg-gradient-to-l hover:from-amber-500/5 hover:to-transparent" title="صفحه بعد"></div>
                  </div>
                </div>
              </div>
              
              {/* Modern Navigation Controls */}
              <div className="flex items-center justify-between mt-8 max-w-6xl mx-auto">
                <Button
                  variant="outline"
                  onClick={prevPage}
                  disabled={currentPage === 1 || isPageTurning}
                  className="bg-gradient-to-r from-blue-600 to-blue-700 border-blue-500 text-white hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 px-8 py-4 text-lg transition-all duration-300 hover:scale-110 active:scale-95 shadow-lg hover:shadow-blue-500/25"
                >
                  <ChevronRight className="w-5 h-5 mr-2" />
                  صفحه قبل
                </Button>
                
                <div className="flex items-center space-x-8 rtl:space-x-reverse text-white">
                  <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-amber-400 bg-clip-text text-transparent">
                    {currentPage} از {totalPages}
                  </span>
                  <div className="w-64 bg-slate-700 rounded-full h-4 overflow-hidden shadow-inner border border-slate-600">
                    <div 
                      className="bg-gradient-to-r from-blue-500 via-purple-500 to-amber-500 h-4 rounded-full transition-all duration-1000 ease-out shadow-lg relative overflow-hidden"
                      style={{ width: `${(currentPage / totalPages) * 100}%` }}
                    >
                      <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                    </div>
                  </div>
                  <span className="text-lg text-blue-300 font-bold">
                    {Math.round((currentPage / totalPages) * 100)}%
                  </span>
                </div>
                
                <Button
                  variant="outline"
                  onClick={nextPage}
                  disabled={currentPage === totalPages || isPageTurning}
                  className="bg-gradient-to-r from-amber-600 to-orange-600 border-amber-500 text-white hover:from-amber-700 hover:to-orange-700 disabled:opacity-50 px-8 py-4 text-lg transition-all duration-300 hover:scale-110 active:scale-95 shadow-lg hover:shadow-amber-500/25"
                >
                  صفحه بعد
                  <ChevronLeft className="w-5 h-5 ml-2" />
                </Button>
              </div>
              
              {/* Modern page turning indicator */}
              {isPageTurning && (
                <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-blue-900/90 to-purple-900/90 text-white px-6 py-3 rounded-full text-lg z-50 backdrop-blur-sm border border-white/20 shadow-2xl">
                  <div className="flex items-center space-x-3 rtl:space-x-reverse">
                    <div className="w-4 h-4 bg-white rounded-full animate-pulse"></div>
                    <span>در حال ورق زدن...</span>
                  </div>
                </div>
              )}

              {/* Modern opening book indicator */}
              {isBookOpening && (
                <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-slate-900/95 to-blue-900/95 text-white px-8 py-4 rounded-2xl text-xl z-50 backdrop-blur-sm border border-white/20 shadow-2xl">
                  <div className="flex items-center space-x-4 rtl:space-x-reverse">
                    <div className="text-3xl animate-bounce">📖</div>
                    <span>در حال باز کردن کتاب...</span>
                    <div className="flex space-x-1 rtl:space-x-reverse">
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                  </div>
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
