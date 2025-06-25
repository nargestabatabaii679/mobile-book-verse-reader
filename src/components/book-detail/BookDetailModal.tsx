import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Book } from '@/types';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, BookOpen, Calendar, Hash, QrCode, Book as BookIcon, Download, Play } from 'lucide-react';
import FlipBook from '@/components/book-reader/FlipBook';
import QRCode from '@/components/ui/qr-code';

interface BookDetailModalProps {
  book: Book | null;
  isOpen: boolean;
  onClose: () => void;
}

const BookDetailModal: React.FC<BookDetailModalProps> = ({ book, isOpen, onClose }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'info' | 'read' | 'access'>('read');

  if (!book) return null;

  const bookUrl = `${window.location.origin}/book/${book.id}/read`;
  const isInteractive = book.category === 'داستان تعاملی' && book.interactiveStoryId;

  const handleStartInteractiveStory = () => {
    if (book.interactiveStoryId) {
      onClose();
      navigate(`/interactive/${book.interactiveStoryId}`);
    }
  };

  // Generate sample content for the book pages
  const generateBookContent = () => {
    const pages = [];
    const totalPages = Math.min(book.pages, 50); // Limit to 50 pages for demo
    
    // First page - Title page
    pages.push(`
      ${book.title}
      
      نوشته: ${book.author}
      
      ${book.description}
      
      انتشارات: دانشگاه علوم
      سال انتشار: ${book.publishYear}
      
      ---
      
      این کتاب حاوی ${book.pages} صفحه از محتوای علمی و آموزشی است.
    `);

    // Generate content pages
    for (let i = 2; i <= totalPages; i++) {
      const chapterTitle = `فصل ${Math.ceil(i / 5)}`;
      const content = `
        ${chapterTitle}
        
        این متن نمونه‌ای از محتوای صفحه ${i} کتاب "${book.title}" است.
        
        ${book.description}
        
        در این بخش به موضوعات مختلفی پرداخته می‌شود که شامل:
        
        • نکات مهم و کاربردی
        • مثال‌های عملی
        • تمرین‌های متنوع
        • راهکارهای مؤثر
        
        محتوای این کتاب با دقت و مطالعه گسترده تهیه شده است تا خوانندگان بتوانند بهترین یادگیری را داشته باشند.
        
        نویسنده ${book.author} با تجربه چندین ساله در این زمینه، سعی کرده است تا مطالب را به شکلی ساده و قابل فهم ارائه دهد.
        
        ---
        
        ادامه محتوا در صفحه بعد...
      `;
      pages.push(content);
    }
    
    return pages;
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

محتوای کامل کتاب:
${generateBookContent().join('\n\n---\n\n')}
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
        
        {/* Tab Navigation */}
        <div className="flex justify-center gap-1 mt-0 mb-1 px-2">
          {!isInteractive && (
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
          )}
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
          {activeTab === 'read' && !isInteractive && (
            <div className="flex flex-col h-full">
              <div className="flex-1 flex justify-center items-center px-4 py-2">
                <FlipBook 
                  pages={generateBookContent()}
                  width={Math.min(600, window.innerWidth * 0.45)}
                  height={Math.min(800, window.innerHeight * 0.7)}
                />
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
                  
                  {/* Interactive Story Button or Download Button */}
                  {isInteractive ? (
                    <Button
                      onClick={handleStartInteractiveStory}
                      className="w-full mt-4 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white"
                    >
                      <Play className="w-4 h-4 mr-2" />
                      شروع داستان تعاملی
                    </Button>
                  ) : (
                    <Button
                      onClick={handleDownload}
                      className="w-full mt-4 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      دانلود کتاب
                    </Button>
                  )}
                </div>
              </div>
              
              {/* Book Details */}
              <div className="lg:col-span-2 space-y-6">
                <div>
                  <Badge className={`mb-4 text-lg px-4 py-2 ${
                    isInteractive 
                      ? 'bg-purple-500/20 text-purple-300' 
                      : 'bg-blue-500/20 text-blue-300'
                  }`}>
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

          {/* Access Tab - Only QR Code */}
          {activeTab === 'access' && (
            <div className="flex items-center justify-center p-6">
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
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BookDetailModal;
