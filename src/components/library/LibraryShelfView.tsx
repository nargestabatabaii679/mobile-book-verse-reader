
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
  const booksPerShelf = 6;
  const shelves = [];
  
  if (isLoading) {
    return (
      <div className="space-y-20 px-8 pb-16">
        {Array.from({ length: 3 }).map((_, shelfIndex) => (
          <div key={shelfIndex} className="relative">
            <div 
              className="relative mx-auto"
              style={{
                width: '95%',
                height: '220px',
                background: 'linear-gradient(180deg, #8B4513 0%, #A0522D 20%, #CD853F 50%, #DEB887 80%, #D2B48C 100%)',
                borderRadius: '12px',
                boxShadow: '0 12px 24px rgba(0,0,0,0.3)'
              }}
            >
              <div className="absolute top-6 left-1/2 transform -translate-x-1/2 flex justify-center items-end space-x-3 rtl:space-x-reverse h-44">
                {Array.from({ length: booksPerShelf }).map((_, bookIndex) => (
                  <Skeleton 
                    key={bookIndex}
                    className="w-[45px] h-[140px] bg-gray-400/30 rounded-sm"
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
      <div className="text-center py-16">
        <div className="text-8xl mb-6 opacity-60">📚</div>
        <h3 className="text-2xl font-bold text-white mb-3">
          کتابی یافت نشد
        </h3>
        <p className="text-gray-300 text-lg">
          لطفاً فیلترها یا جستجوی خود را تغییر دهید
        </p>
      </div>
    );
  }

  const getRealisticBookStyle = (index: number, shelfIndex: number) => {
    const bookColors = [
      {
        spine: 'linear-gradient(180deg, #8B0000 0%, #DC143C 20%, #B22222 40%, #8B0000 60%, #A0202F 80%, #8B0000 100%)',
        accent: '#FFD700',
        shadow: 'rgba(139, 0, 0, 0.7)'
      },
      {
        spine: 'linear-gradient(180deg, #000080 0%, #4169E1 20%, #0000CD 40%, #000080 60%, #1E40AF 80%, #000080 100%)',
        accent: '#87CEEB',
        shadow: 'rgba(0, 0, 128, 0.7)'
      },
      {
        spine: 'linear-gradient(180deg, #006400 0%, #228B22 20%, #32CD32 40%, #006400 60%, #008000 80%, #006400 100%)',
        accent: '#90EE90',
        shadow: 'rgba(0, 100, 0, 0.7)'
      },
      {
        spine: 'linear-gradient(180deg, #8B4513 0%, #D2691E 20%, #CD853F 40%, #8B4513 60%, #A0522D 80%, #8B4513 100%)',
        accent: '#F4A460',
        shadow: 'rgba(139, 69, 19, 0.7)'
      },
      {
        spine: 'linear-gradient(180deg, #4B0082 0%, #8A2BE2 20%, #9370DB 40%, #4B0082 60%, #6A5ACD 80%, #4B0082 100%)',
        accent: '#DDA0DD',
        shadow: 'rgba(75, 0, 130, 0.7)'
      },
      {
        spine: 'linear-gradient(180deg, #2F4F4F 0%, #708090 20%, #696969 40%, #2F4F4F 60%, #556B2F 80%, #2F4F4F 100%)',
        accent: '#C0C0C0',
        shadow: 'rgba(47, 79, 79, 0.7)'
      }
    ];
    
    return bookColors[(shelfIndex * booksPerShelf + index) % bookColors.length];
  };

  return (
    <div className="rounded-2xl shadow-3xl overflow-hidden bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 border border-amber-200/50">
      <div className="space-y-24 px-12 pb-20 pt-12">
        {shelves.map((shelf, shelfIndex) => (
          <div key={shelfIndex} className="relative">
            {/* Enhanced Wooden Shelf */}
            <div 
              className="relative mx-auto group"
              style={{
                width: '92%',
                height: '220px',
                background: `
                  linear-gradient(180deg, 
                    #DEB887 0%, 
                    #D2B48C 15%, 
                    #CD853F 30%, 
                    #BC9A6A 45%, 
                    #A0522D 60%, 
                    #8B4513 75%, 
                    #654321 90%, 
                    #5D4037 100%
                  )
                `,
                borderRadius: '12px 12px 6px 6px',
                boxShadow: `
                  0 12px 32px rgba(0,0,0,0.4),
                  0 6px 16px rgba(139, 69, 19, 0.3),
                  inset 0 3px 6px rgba(255,255,255,0.3),
                  inset 0 -3px 6px rgba(0,0,0,0.3),
                  inset 3px 0 6px rgba(255,255,255,0.2),
                  inset -3px 0 6px rgba(0,0,0,0.2)
                `,
                transform: 'perspective(1200px) rotateX(8deg)',
                transformStyle: 'preserve-3d'
              }}
            >
              {/* Enhanced Wood Grain Pattern */}
              <div 
                className="absolute inset-0 opacity-25 rounded-xl"
                style={{
                  backgroundImage: `
                    repeating-linear-gradient(
                      90deg,
                      transparent,
                      transparent 18px,
                      rgba(101, 67, 33, 0.4) 19px,
                      rgba(101, 67, 33, 0.4) 21px,
                      transparent 22px,
                      transparent 45px
                    ),
                    repeating-linear-gradient(
                      0deg,
                      transparent,
                      transparent 8px,
                      rgba(160, 82, 45, 0.3) 9px,
                      rgba(160, 82, 45, 0.3) 11px,
                      transparent 12px,
                      transparent 25px
                    )
                  `
                }}
              />
              
              {/* Shelf Base */}
              <div 
                className="absolute bottom-0 left-1/2 transform -translate-x-1/2"
                style={{
                  width: '96%',
                  height: '28px',
                  background: 'linear-gradient(180deg, #A0522D 0%, #8B4513 50%, #654321 100%)',
                  borderRadius: '0 0 12px 12px',
                  boxShadow: '0 8px 16px rgba(0,0,0,0.5)'
                }}
              />

              {/* Decorative Metal Brackets */}
              <div className="absolute left-8 top-1/2 transform -translate-y-1/2 w-3 h-12 bg-gradient-to-b from-amber-400 via-yellow-600 to-amber-800 rounded-full shadow-lg border border-amber-300"></div>
              <div className="absolute right-8 top-1/2 transform -translate-y-1/2 w-3 h-12 bg-gradient-to-b from-amber-400 via-yellow-600 to-amber-800 rounded-full shadow-lg border border-amber-300"></div>
              <div className="absolute left-1/4 top-1/2 transform -translate-y-1/2 w-3 h-10 bg-gradient-to-b from-amber-400 via-yellow-600 to-amber-800 rounded-full shadow-lg border border-amber-300"></div>
              <div className="absolute right-1/4 top-1/2 transform -translate-y-1/2 w-3 h-10 bg-gradient-to-b from-amber-400 via-yellow-600 to-amber-800 rounded-full shadow-lg border border-amber-300"></div>

              {/* Realistic Books */}
              <div className="absolute top-6 left-1/2 transform -translate-x-1/2 flex justify-center items-end space-x-2 rtl:space-x-reverse h-44">
                {shelf.map((book, bookIndex) => {
                  const height = 150 + (bookIndex % 5) * 12;
                  const width = 35 + (bookIndex % 4) * 4;
                  const thickness = 8 + (bookIndex % 3) * 2;
                  const tilt = (Math.random() - 0.5) * 3;
                  const bookStyle = getRealisticBookStyle(bookIndex, shelfIndex);
                  
                  return (
                    <div
                      key={book.id}
                      className="group/book cursor-pointer transition-all duration-700 hover:scale-110 hover:-translate-y-4 hover:rotate-1 relative"
                      onClick={() => onSelectBook(book)}
                      style={{
                        width: `${width}px`,
                        height: `${height}px`,
                        transform: `rotateY(${tilt}deg) perspective(1000px)`,
                        transformStyle: 'preserve-3d'
                      }}
                    >
                      {/* Main Book Spine */}
                      <div
                        className="relative w-full h-full"
                        style={{
                          background: bookStyle.spine,
                          borderRadius: '4px 4px 0 0',
                          boxShadow: `
                            ${thickness}px 0 0 rgba(0,0,0,0.4),
                            ${thickness + 3}px 3px 12px ${bookStyle.shadow},
                            ${thickness + 6}px 6px 24px rgba(0,0,0,0.5),
                            inset 0 0 0 1px rgba(255,255,255,0.15),
                            inset 3px 0 0 rgba(255,255,255,0.25),
                            inset -1px 0 0 rgba(0,0,0,0.4),
                            inset 0 2px 4px rgba(255,255,255,0.2),
                            inset 0 -2px 4px rgba(0,0,0,0.3)
                          `,
                          border: '1px solid rgba(255,255,255,0.1)'
                        }}
                      >
                        {/* Book Content */}
                        <div className="absolute inset-0 p-2 flex flex-col justify-between text-white">
                          {/* Top Decorative Element */}
                          <div 
                            className="w-full h-3 rounded-full mb-2"
                            style={{ 
                              background: `linear-gradient(90deg, ${bookStyle.accent}, transparent, ${bookStyle.accent})`,
                              opacity: 0.8
                            }}
                          />
                          
                          {/* Title */}
                          <div 
                            className="writing-vertical-rl transform rotate-180 text-center font-bold leading-tight overflow-hidden flex-1 flex items-center justify-center"
                            style={{ 
                              fontSize: '9px',
                              textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
                              color: '#ffffff',
                              letterSpacing: '0.5px'
                            }}
                          >
                            {book.title.slice(0, 40)}
                          </div>
                          
                          {/* Middle Decorative Lines */}
                          <div className="flex flex-col space-y-1 items-center my-2">
                            <div className="w-full h-px bg-gradient-to-r from-transparent via-white/70 to-transparent"></div>
                            <div className="w-4/5 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>
                            <div className="w-3/5 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
                          </div>
                          
                          {/* Author */}
                          <div 
                            className="writing-vertical-rl transform rotate-180 text-center opacity-90"
                            style={{ 
                              fontSize: '7px',
                              textShadow: '1px 1px 3px rgba(0,0,0,0.8)',
                              letterSpacing: '0.3px'
                            }}
                          >
                            {book.author.slice(0, 35)}
                          </div>

                          {/* Bottom Decorative Element */}
                          <div 
                            className="w-full h-3 rounded-full mt-2"
                            style={{ 
                              background: `linear-gradient(90deg, ${bookStyle.accent}, transparent, ${bookStyle.accent})`,
                              opacity: 0.6
                            }}
                          />
                        </div>

                        {/* 3D Book Edge */}
                        <div 
                          className="absolute top-0 right-0 h-full"
                          style={{ 
                            width: `${thickness}px`,
                            background: `linear-gradient(90deg, rgba(0,0,0,0.5) 0%, rgba(255,255,255,0.15) 40%, rgba(0,0,0,0.7) 100%)`,
                            transform: 'rotateY(90deg)',
                            transformOrigin: 'left center',
                            borderRadius: '0 4px 0 0'
                          }}
                        />

                        {/* Book Top */}
                        <div 
                          className="absolute top-0 left-0 w-full"
                          style={{ 
                            height: `${thickness}px`,
                            background: `linear-gradient(180deg, rgba(255,255,255,0.4) 0%, rgba(0,0,0,0.4) 100%)`,
                            transform: 'rotateX(90deg)',
                            transformOrigin: 'bottom center',
                            borderRadius: '4px 4px 0 0'
                          }}
                        />

                        {/* Realistic Wear Effects */}
                        <div className="absolute inset-0 pointer-events-none">
                          <div className="absolute top-3 right-1 w-2 h-2 bg-black/15 rounded-full blur-sm"></div>
                          <div className="absolute bottom-4 left-2 w-1 h-4 bg-black/10 rounded blur-sm"></div>
                          <div className="absolute top-1/3 left-0 right-0 h-px bg-black/25"></div>
                          <div className="absolute top-2/3 left-0 right-0 h-px bg-black/20"></div>
                          <div className="absolute top-1 left-1 right-1 h-px bg-white/30"></div>
                        </div>

                        {/* Page Stack Effect */}
                        <div className="absolute right-1 top-2 bottom-2 w-px bg-white/40"></div>
                        <div className="absolute right-2 top-2 bottom-2 w-px bg-white/25"></div>
                        <div className="absolute right-3 top-3 bottom-3 w-px bg-white/15"></div>

                        {/* Quality Badge */}
                        {Math.random() > 0.6 && (
                          <span 
                            className="absolute -top-2 -right-2 bg-emerald-600 text-white text-xs px-2 py-1 rounded-full shadow-lg z-10 border border-white/20"
                            style={{ fontSize: '8px', fontWeight: 'bold' }}
                          >
                            جدید
                          </span>
                        )}
                      </div>

                      {/* Enhanced Tooltip */}
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-4 px-4 py-3 bg-gradient-to-r from-gray-900/95 via-black/95 to-gray-900/95 text-white text-sm rounded-xl opacity-0 group-hover/book:opacity-100 transition-all duration-500 whitespace-nowrap z-30 backdrop-blur-md border border-gray-600/50 shadow-2xl">
                        <div className="font-bold text-blue-300 mb-1 text-base">{book.title}</div>
                        <div className="text-gray-300 text-sm mb-1">{book.author}</div>
                        <div className="text-gray-400 text-xs mb-2">{book.category}</div>
                        <div className="text-yellow-400 flex items-center text-sm">
                          ⭐ {book.rating} | {book.pages} صفحه | {book.publishYear}
                        </div>
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-8 border-transparent border-t-gray-900"></div>
                      </div>
                    </div>
                  );
                })}
                
                {/* Empty Book Placeholders */}
                {Array.from({ length: Math.max(0, booksPerShelf - shelf.length) }, (_, index) => (
                  <div
                    key={`empty-${shelfIndex}-${index}`}
                    className="bg-gradient-to-b from-gray-300/30 via-gray-400/20 to-gray-500/30 border border-gray-400/40 rounded-sm"
                    style={{
                      width: '38px',
                      height: `${145 + (index % 3) * 10}px`,
                      boxShadow: '3px 0 8px rgba(0,0,0,0.15)'
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Shelf Label */}
            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-amber-800 via-amber-700 to-amber-800 text-white px-6 py-2 rounded-full text-sm font-bold shadow-xl border border-amber-600">
              قفسه {shelfIndex + 1}
            </div>
          </div>
        ))}
      </div>

      {/* Enhanced Statistics Section */}
      <div className="text-center text-gray-800 pb-12 px-8">
        <div className="bg-gradient-to-r from-white/80 via-amber-50/90 to-white/80 backdrop-blur-sm rounded-2xl p-8 mx-auto max-w-lg border border-amber-200/60 shadow-xl">
          <h3 className="text-2xl font-bold mb-6 text-amber-800">📊 آمار کتابخانه</h3>
          <div className="grid grid-cols-3 gap-6 text-base">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200">
              <div className="text-3xl font-bold text-blue-700">{books.length}</div>
              <div className="text-blue-600 font-medium">کل کتاب‌ها</div>
            </div>
            <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl p-4 border border-emerald-200">
              <div className="text-3xl font-bold text-emerald-700">{shelves.length}</div>
              <div className="text-emerald-600 font-medium">تعداد قفسه</div>
            </div>
            <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl p-4 border border-amber-200">
              <div className="text-3xl font-bold text-amber-700">{[...new Set(books.map(b => b.category))].length}</div>
              <div className="text-amber-600 font-medium">دسته‌بندی</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
