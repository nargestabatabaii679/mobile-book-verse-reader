
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Book } from '@/types';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, BookOpen, Calendar, Hash, Download, QrCode, Book as BookIcon } from 'lucide-react';
import FlipBook from '@/components/book-reader/FlipBook';
import QRCode from '@/components/ui/qr-code';

interface BookDetailModalProps {
  book: Book | null;
  isOpen: boolean;
  onClose: () => void;
}

const BookDetailModal: React.FC<BookDetailModalProps> = ({ book, isOpen, onClose }) => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<'info' | 'read' | 'access'>('read');

  if (!book) return null;

  const handleDownload = () => {
    if (book.downloadUrl) {
      const link = document.createElement('a');
      link.href = book.downloadUrl;
      link.download = `${book.title}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const bookUrl = `${window.location.origin}/book/${book.id}/read`;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={`${
        activeTab === 'read' 
          ? 'max-w-[98vw] w-[98vw] max-h-[98vh] h-[98vh]' 
          : 'max-w-7xl max-h-[95vh]'
      } overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 border-gray-700`}>
        <DialogHeader className="pb-0 px-2">
          <DialogTitle className="text-lg font-bold text-white text-center">
            {book.title}
          </DialogTitle>
          <div className="text-center text-gray-300 text-xs">
            نوشته {book.author} • {book.category}
          </div>
        </DialogHeader>
        
        {/* Smaller and more compact Tab Navigation */}
        <div className="flex justify-center gap-1 mt-0 mb-1 px-2">
          <button
            onClick={() => setActiveTab('read')}
            className={`flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium transition-all ${
              activeTab === 'read'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-white/10 text-white/70 hover:bg-white/20'
            }`}
          >
            <BookIcon className="w-3 h-3" />
            مطالعه کتاب
          </button>
          <button
            onClick={() => setActiveTab('info')}
            className={`flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium transition-all ${
              activeTab === 'info'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-white/10 text-white/70 hover:bg-white/20'
            }`}
          >
            <Star className="w-3 h-3" />
            اطلاعات کتاب
          </button>
          <button
            onClick={() => setActiveTab('access')}
            className={`flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium transition-all ${
              activeTab === 'access'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-white/10 text-white/70 hover:bg-white/20'
            }`}
          >
            <QrCode className="w-3 h-3" />
            دسترسی سریع
          </button>
        </div>

        <div className="overflow-y-auto flex-1 relative">
          {/* Reading Tab */}
          {activeTab === 'read' && (
            <div className="flex flex-col h-full">
              {/* Book container with more space */}
              <div className="flex-1 flex justify-center items-center px-4 py-2">
                {book.pagesContent && book.pagesContent.length > 0 ? (
                  <FlipBook 
                    pages={book.pagesContent}
                    width={Math.min(600, window.innerWidth * 0.45)}
                    height={Math.min(800, window.innerHeight * 0.7)}
                  />
                ) : (
                  <div className="text-center text-white py-12">
                    <BookOpen className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                    <p className="text-xl">محتوای کتاب در دسترس نیست</p>
                    <p className="text-gray-400 mt-2">برای مطالعه کامل فایل PDF را دانلود کنید</p>
                  </div>
                )}
              </div>
              
              {/* Smaller navigation controls at the bottom */}
              <div className="bg-gradient-to-r from-slate-800/90 to-blue-800/90 backdrop-blur-sm border-t border-slate-700 px-4 py-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-white/70">صفحه قبل</span>
                  <div className="flex items-center space-x-4 rtl:space-x-reverse">
                    <span className="text-sm font-medium text-white">
                      صفحه 1 از 3
                    </span>
                    <span className="text-xs text-blue-300">
                      33% مطالعه شده
                    </span>
                  </div>
                  <span className="text-white/70">صفحه بعد</span>
                </div>
              </div>
            </div>
          )}

          {/* Info Tab */}
          {activeTab === 'info' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-6">
              {/* Book Cover */}
              <div className="lg:col-span-1">
                <div className="sticky top-0">
                  <img
                    src={book.coverUrl}
                    alt={book.title}
                    className="w-full h-96 object-cover rounded-lg shadow-2xl transform hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>
              
              {/* Book Details */}
              <div className="lg:col-span-2 space-y-6">
                <div>
                  <Badge className="bg-blue-500/20 text-blue-300 mb-4 text-lg px-4 py-2">
                    {book.category}
                  </Badge>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="flex items-center text-gray-300 text-lg">
                      <span className="font-semibold mr-3">{t('author')}:</span>
                      <span className="text-white">{book.author}</span>
                    </div>
                    
                    <div className="flex items-center text-gray-300 text-lg">
                      <BookOpen className="w-5 h-5 mr-3" />
                      <span className="font-semibold mr-3">{t('pages')}:</span>
                      <span className="text-white">{book.pages}</span>
                    </div>
                    
                    <div className="flex items-center text-gray-300 text-lg">
                      <Calendar className="w-5 h-5 mr-3" />
                      <span className="font-semibold mr-3">{t('published')}:</span>
                      <span className="text-white">{book.publishYear}</span>
                    </div>
                    
                    <div className="flex items-center text-gray-300 text-lg">
                      <Star className="w-5 h-5 mr-3 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold mr-3">{t('rating')}:</span>
                      <span className="text-white">{book.rating}/5</span>
                    </div>
                  </div>
                  
                  <div className="mb-8">
                    <div className="flex items-center text-gray-300 text-lg">
                      <Hash className="w-5 h-5 mr-3" />
                      <span className="font-semibold mr-3">{t('isbn')}:</span>
                      <span className="text-white">{book.isbn}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-2xl font-semibold text-white mb-4">
                    {t('description')}
                  </h4>
                  <div className="bg-white/5 rounded-lg p-6 backdrop-blur-sm">
                    <p className="text-gray-300 leading-relaxed text-lg">
                      {book.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Access Tab */}
          {activeTab === 'access' && (
            <div className="flex flex-col lg:flex-row items-center justify-center gap-12 p-6">
              {/* QR Code Section */}
              <div className="text-center">
                <h3 className="text-2xl font-bold text-white mb-6">کد QR دسترسی سریع</h3>
                <div className="bg-white/10 rounded-2xl p-8 backdrop-blur-sm">
                  <QRCode 
                    value={bookUrl}
                    size={200}
                    className="mb-4"
                  />
                  <p className="text-gray-300 text-sm max-w-[200px]">
                    با اسکن این کد از گوشی خود، مستقیماً به صفحه مطالعه آنلاین دسترسی پیدا کنید
                  </p>
                </div>
              </div>

              {/* Download Section */}
              <div className="text-center">
                <h3 className="text-2xl font-bold text-white mb-6">دانلود فایل کتاب</h3>
                <div className="bg-white/10 rounded-2xl p-8 backdrop-blur-sm">
                  <Download className="w-20 h-20 mx-auto mb-6 text-green-400" />
                  <Button
                    onClick={handleDownload}
                    className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg font-medium rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
                    disabled={!book.downloadUrl}
                  >
                    <Download className="w-5 h-5 mr-2" />
                    دانلود PDF
                  </Button>
                  {!book.downloadUrl && (
                    <p className="text-gray-400 text-sm mt-4">
                      فایل دانلود در دسترس نیست
                    </p>
                  )}
                  <p className="text-gray-300 text-sm mt-4 max-w-[250px]">
                    نسخه کامل کتاب را به صورت فایل PDF دانلود کنید تا بتوانید در هر زمان و مکانی مطالعه کنید
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BookDetailModal;
