
import React from 'react';
import { Book } from '@/types';
import { Skeleton } from '@/components/ui/skeleton';

interface LibraryShelfViewProps {
  books: Book[];
  isLoading: boolean;
  onSelectBook: (book: Book) => void;
}

export const LibraryShelfView: React.FC<LibraryShelfViewProps> = ({ 
  books, 
  isLoading, 
  onSelectBook 
}) => {
  const booksPerShelf = 4;
  const shelves = [];
  
  if (isLoading) {
    return (
      <div className="space-y-16 px-8 pb-16">
        {Array.from({ length: 3 }).map((_, shelfIndex) => (
          <div key={shelfIndex} className="relative">
            <div 
              className="relative mx-auto"
              style={{
                width: '90%',
                height: '200px',
                background: 'linear-gradient(180deg, #DEB887 0%, #D2B48C 20%, #CD853F 80%, #A0522D 100%)',
                borderRadius: '8px 8px 4px 4px',
                boxShadow: '0 8px 16px rgba(0,0,0,0.3)'
              }}
            >
              <div className="absolute top-4 left-1/2 transform -translate-x-1/2 flex justify-center items-end space-x-2 rtl:space-x-reverse h-40">
                {Array.from({ length: booksPerShelf }).map((_, bookIndex) => (
                  <Skeleton 
                    key={bookIndex}
                    className="w-[60px] h-[120px] bg-gray-400/30"
                  />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  for (let i = 0; i < books.length; i += booksPerShelf) {
    shelves.push(books.slice(i, i + booksPerShelf));
  }

  if (books.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">📚</div>
        <h3 className="text-xl font-semibold text-white mb-2">
          کتابی یافت نشد
        </h3>
        <p className="text-gray-300">
          لطفاً فیلترها یا جستجوی خود را تغییر دهید
        </p>
      </div>
    );
  }

  const getBookColor = (index: number) => {
    const colors = [
      'bg-gradient-to-b from-red-600 to-red-800',
      'bg-gradient-to-b from-blue-600 to-blue-800', 
      'bg-gradient-to-b from-green-600 to-green-800',
      'bg-gradient-to-b from-yellow-600 to-yellow-800',
      'bg-gradient-to-b from-purple-600 to-purple-800',
      'bg-gradient-to-b from-pink-600 to-pink-800',
      'bg-gradient-to-b from-indigo-600 to-indigo-800',
      'bg-gradient-to-b from-teal-600 to-teal-800'
    ];
    return colors[index % colors.length];
  };

  return (
    <div className="rounded-xl shadow-2xl overflow-hidden bg-black/10 backdrop-blur-sm border border-white/10">
      <div className="space-y-16 px-8 pb-16 pt-8">
        {shelves.map((shelf, shelfIndex) => (
          <div key={shelfIndex} className="relative">
            {/* قفسه چوبی */}
            <div 
              className="relative mx-auto group"
              style={{
                width: '90%',
                height: '200px',
                background: 'linear-gradient(180deg, #DEB887 0%, #D2B48C 20%, #CD853F 80%, #A0522D 100%)',
                borderRadius: '8px 8px 4px 4px',
                boxShadow: `
                  0 8px 16px rgba(0,0,0,0.3),
                  inset 0 2px 4px rgba(255,255,255,0.2),
                  inset 0 -2px 4px rgba(0,0,0,0.2)
                `,
                transform: 'perspective(1000px) rotateX(5deg)',
                transformStyle: 'preserve-3d'
              }}
            >
              {/* رگه های چوب */}
              <div 
                className="absolute inset-0 opacity-20 rounded-lg"
                style={{
                  backgroundImage: `
                    repeating-linear-gradient(
                      90deg,
                      transparent,
                      transparent 20px,
                      rgba(139, 69, 19, 0.3) 22px,
                      rgba(139, 69, 19, 0.3) 24px
                    )
                  `
                }}
              />
              
              {/* پایه قفسه */}
              <div 
                className="absolute bottom-0 left-1/2 transform -translate-x-1/2"
                style={{
                  width: '95%',
                  height: '20px',
                  background: 'linear-gradient(180deg, #A0522D 0%, #8B4513 100%)',
                  borderRadius: '0 0 8px 8px',
                  boxShadow: '0 4px 8px rgba(0,0,0,0.4)'
                }}
              />

              {/* نگهدارنده های طلایی */}
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 w-2 h-8 bg-gradient-to-b from-yellow-400 to-yellow-600 rounded-full shadow-lg"></div>
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 w-2 h-8 bg-gradient-to-b from-yellow-400 to-yellow-600 rounded-full shadow-lg"></div>

              {/* کتاب ها */}
              <div className="absolute top-4 left-1/2 transform -translate-x-1/2 flex justify-center items-end space-x-3 rtl:space-x-reverse h-40">
                {shelf.map((book, bookIndex) => (
                  <div
                    key={book.id}
                    className={`
                      group/book cursor-pointer transition-all duration-500 hover:scale-105 hover:-translate-y-3 relative
                      ${getBookColor(shelfIndex * booksPerShelf + bookIndex)}
                    `}
                    onClick={() => onSelectBook(book)}
                    style={{
                      width: '70px',
                      height: `${120 + Math.random() * 20}px`,
                      borderRadius: '3px 3px 0 0',
                      boxShadow: `
                        3px 0 10px rgba(0,0,0,0.4),
                        inset 0 0 0 1px rgba(255,255,255,0.1),
                        inset 3px 0 0 rgba(255,255,255,0.2),
                        0 0 20px rgba(0,0,0,0.2)
                      `,
                      transform: `perspective(800px) rotateY(${Math.random() * 8 - 4}deg)`,
                      transformStyle: 'preserve-3d'
                    }}
                  >
                    {/* عنوان کتاب */}
                    <div className="absolute inset-2 flex flex-col justify-between p-1">
                      <div 
                        className="text-white text-xs font-bold text-center leading-tight overflow-hidden"
                        style={{ 
                          writingMode: 'vertical-rl',
                          textOrientation: 'mixed',
                          lineHeight: '1.2',
                          maxHeight: '80px'
                        }}
                      >
                        {book.title.slice(0, 25)}
                      </div>
                      <div 
                        className="text-white/80 text-xs text-center mt-2"
                        style={{ 
                          writingMode: 'vertical-rl',
                          textOrientation: 'mixed',
                          lineHeight: '1.1',
                          maxHeight: '40px'
                        }}
                      >
                        {book.author.slice(0, 20)}
                      </div>
                    </div>

                    {/* جلد کتاب */}
                    <div 
                      className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-white/30 to-black/30"
                      style={{ 
                        transformOrigin: 'right', 
                        transform: 'rotateY(-90deg)' 
                      }}
                    />

                    {/* برچسب ثبت نشده */}
                    {Math.random() > 0.7 && (
                      <span 
                        className="absolute -top-1 -right-1 bg-red-600 text-white text-xs px-2 py-1 rounded-full shadow-lg z-10"
                        style={{ fontSize: '10px' }}
                      >
                        ثبت‌نشده
                      </span>
                    )}

                    {/* tooltip */}
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-black/90 text-white text-xs rounded-lg opacity-0 group-hover/book:opacity-100 transition-opacity whitespace-nowrap z-20 backdrop-blur-sm">
                      <div className="font-bold">{book.title}</div>
                      <div className="text-gray-300">{book.author}</div>
                      <div className="text-yellow-400 flex items-center">
                        ⭐ {book.rating} | {book.pages} صفحه
                      </div>
                      <div className="text-blue-300 text-xs">{book.category}</div>
                    </div>
                  </div>
                ))}
                
                {/* کتاب های خالی برای تکمیل قفسه */}
                {Array.from({ length: booksPerShelf - shelf.length }, (_, index) => (
                  <div
                    key={`empty-${shelfIndex}-${index}`}
                    className="bg-gradient-to-b from-gray-400/20 to-gray-600/20 border border-gray-500/30"
                    style={{
                      width: '70px',
                      height: `${120 + Math.random() * 20}px`,
                      borderRadius: '3px 3px 0 0',
                      boxShadow: '2px 0 6px rgba(0,0,0,0.2)'
                    }}
                  />
                ))}
              </div>
            </div>

            {/* شماره قفسه */}
            <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-amber-800 text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg">
              قفسه {shelfIndex + 1}
            </div>
          </div>
        ))}
      </div>

      {/* اطلاعات کلی در پایین */}
      <div className="text-center text-white pb-8 px-8">
        <div className="bg-black/30 backdrop-blur-sm rounded-lg p-6 mx-auto max-w-md border border-white/10">
          <h3 className="text-xl font-bold mb-4">📊 آمار کتابخانه</h3>
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div>
              <div className="text-2xl font-bold text-yellow-400">{books.length}</div>
              <div>کل کتاب‌ها</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-400">{shelves.length}</div>
              <div>تعداد قفسه</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-400">{[...new Set(books.map(b => b.category))].length}</div>
              <div>دسته‌بندی</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
