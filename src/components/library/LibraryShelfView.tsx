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
        shadow: 'rgba(139, 0, 0, 0.8)'
      },
      {
        spine: 'linear-gradient(180deg, #000080 0%, #4169E1 20%, #0000CD 40%, #000080 60%, #1E40AF 80%, #000080 100%)',
        accent: '#87CEEB',
        shadow: 'rgba(0, 0, 128, 0.8)'
      },
      {
        spine: 'linear-gradient(180deg, #006400 0%, #228B22 20%, #32CD32 40%, #006400 60%, #008000 80%, #006400 100%)',
        accent: '#90EE90',
        shadow: 'rgba(0, 100, 0, 0.8)'
      },
      {
        spine: 'linear-gradient(180deg, #8B4513 0%, #D2691E 20%, #CD853F 40%, #8B4513 60%, #A0522D 80%, #8B4513 100%)',
        accent: '#F4A460',
        shadow: 'rgba(139, 69, 19, 0.8)'
      },
      {
        spine: 'linear-gradient(180deg, #4B0082 0%, #8A2BE2 20%, #9370DB 40%, #4B0082 60%, #6A5ACD 80%, #4B0082 100%)',
        accent: '#DDA0DD',
        shadow: 'rgba(75, 0, 130, 0.8)'
      },
      {
        spine: 'linear-gradient(180deg, #2F4F4F 0%, #708090 20%, #696969 40%, #2F4F4F 60%, #556B2F 80%, #2F4F4F 100%)',
        accent: '#C0C0C0',
        shadow: 'rgba(47, 79, 79, 0.8)'
      }
    ];
    
    return bookColors[(shelfIndex * booksPerShelf + index) % bookColors.length];
  };

  const handleBookSelect = (book: Book, event: React.MouseEvent) => {
    const bookElement = event.currentTarget as HTMLElement;
    
    // Add pickup animation class
    bookElement.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    bookElement.style.transform = 'perspective(1200px) translateZ(80px) translateY(-40px) rotateX(-15deg) rotateY(15deg) scale(1.1)';
    bookElement.style.zIndex = '1000';
    bookElement.style.filter = 'drop-shadow(0 20px 60px rgba(0,0,0,0.8))';
    
    // Create a subtle shake effect
    setTimeout(() => {
      bookElement.style.transform = 'perspective(1200px) translateZ(85px) translateY(-42px) rotateX(-15deg) rotateY(15deg) scale(1.1)';
    }, 100);
    
    setTimeout(() => {
      bookElement.style.transform = 'perspective(1200px) translateZ(80px) translateY(-40px) rotateX(-15deg) rotateY(15deg) scale(1.1)';
    }, 200);
    
    // Call the actual book selection after animation
    setTimeout(() => {
      onSelectBook(book);
    }, 400);
  };

  return (
    <div className="rounded-3xl shadow-3xl overflow-hidden bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 border border-amber-200/50">
      {/* Enhanced atmospheric lighting */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 80% 60% at 50% 0%, rgba(255, 255, 255, 0.3) 0%, transparent 70%),
            linear-gradient(180deg, rgba(255, 248, 220, 0.4) 0%, rgba(245, 222, 179, 0.2) 50%, rgba(139, 69, 19, 0.1) 100%)
          `
        }}
      />
      
      <div className="space-y-32 px-16 pb-24 pt-16 relative">
        {shelves.map((shelf, shelfIndex) => (
          <div key={shelfIndex} className="relative">
            {/* Enhanced Wooden Shelf with dramatic perspective */}
            <div 
              className="relative mx-auto group"
              style={{
                width: '90%',
                height: '280px',
                background: `
                  linear-gradient(180deg, 
                    #DEB887 0%, 
                    #D2B48C 10%, 
                    #CD853F 25%, 
                    #BC9A6A 40%, 
                    #A0522D 55%, 
                    #8B4513 70%, 
                    #654321 85%, 
                    #5D4037 100%
                  )
                `,
                borderRadius: '16px 16px 8px 8px',
                boxShadow: `
                  0 20px 60px rgba(0,0,0,0.5),
                  0 10px 30px rgba(139, 69, 19, 0.4),
                  0 5px 15px rgba(0,0,0,0.3),
                  inset 0 4px 8px rgba(255,255,255,0.4),
                  inset 0 -4px 8px rgba(0,0,0,0.4),
                  inset 4px 0 8px rgba(255,255,255,0.25),
                  inset -4px 0 8px rgba(0,0,0,0.25)
                `,
                transform: 'perspective(1500px) rotateX(12deg) translateZ(20px)',
                transformStyle: 'preserve-3d'
              }}
            >
              {/* Enhanced Wood Grain Pattern with more detail */}
              <div 
                className="absolute inset-0 opacity-30 rounded-2xl"
                style={{
                  backgroundImage: `
                    repeating-linear-gradient(
                      90deg,
                      transparent,
                      transparent 15px,
                      rgba(101, 67, 33, 0.5) 16px,
                      rgba(101, 67, 33, 0.5) 18px,
                      transparent 19px,
                      transparent 35px
                    ),
                    repeating-linear-gradient(
                      0deg,
                      transparent,
                      transparent 6px,
                      rgba(160, 82, 45, 0.4) 7px,
                      rgba(160, 82, 45, 0.4) 9px,
                      transparent 10px,
                      transparent 20px
                    ),
                    radial-gradient(ellipse 200px 50px at 30% 20%, rgba(222, 184, 135, 0.3) 0%, transparent 50%),
                    radial-gradient(ellipse 150px 30px at 70% 60%, rgba(160, 82, 45, 0.2) 0%, transparent 50%)
                  `
                }}
              />
              
              {/* Dramatic lighting effect */}
              <div 
                className="absolute inset-0 rounded-2xl"
                style={{
                  background: `
                    linear-gradient(45deg, 
                      transparent 0%, 
                      rgba(255, 255, 255, 0.2) 30%, 
                      transparent 70%
                    )
                  `
                }}
              />
              
              {/* Enhanced Shelf Base with 3D depth */}
              <div 
                className="absolute bottom-0 left-1/2 transform -translate-x-1/2"
                style={{
                  width: '98%',
                  height: '35px',
                  background: `
                    linear-gradient(180deg, 
                      #A0522D 0%, 
                      #8B4513 30%, 
                      #654321 70%, 
                      #3E2723 100%
                    )
                  `,
                  borderRadius: '0 0 16px 16px',
                  boxShadow: `
                    0 12px 24px rgba(0,0,0,0.6),
                    inset 0 2px 4px rgba(255,255,255,0.3),
                    inset 0 -2px 4px rgba(0,0,0,0.5)
                  `,
                  transform: 'translateZ(-10px)'
                }}
              />

              {/* Enhanced Metal Brackets with more realism */}
              <div className="absolute left-12 top-1/2 transform -translate-y-1/2 w-4 h-16 bg-gradient-to-b from-amber-300 via-yellow-600 to-amber-900 rounded-full shadow-2xl border-2 border-amber-200" style={{ transform: 'translateY(-50%) rotateX(-12deg) translateZ(15px)' }}></div>
              <div className="absolute right-12 top-1/2 transform -translate-y-1/2 w-4 h-16 bg-gradient-to-b from-amber-300 via-yellow-600 to-amber-900 rounded-full shadow-2xl border-2 border-amber-200" style={{ transform: 'translateY(-50%) rotateX(-12deg) translateZ(15px)' }}></div>
              <div className="absolute left-1/3 top-1/2 transform -translate-y-1/2 w-4 h-14 bg-gradient-to-b from-amber-300 via-yellow-600 to-amber-900 rounded-full shadow-2xl border-2 border-amber-200" style={{ transform: 'translateY(-50%) rotateX(-12deg) translateZ(15px)' }}></div>
              <div className="absolute right-1/3 top-1/2 transform -translate-y-1/2 w-4 h-14 bg-gradient-to-b from-amber-300 via-yellow-600 to-amber-900 rounded-full shadow-2xl border-2 border-amber-200" style={{ transform: 'translateY(-50%) rotateX(-12deg) translateZ(15px)' }}></div>

              {/* Enhanced Books with realistic pickup interaction */}
              <div className="absolute top-8 left-1/2 transform -translate-x-1/2 flex justify-center items-end space-x-3 rtl:space-x-reverse h-52">
                {shelf.map((book, bookIndex) => {
                  const height = 160 + (bookIndex % 5) * 15;
                  const width = 38 + (bookIndex % 4) * 5;
                  const thickness = 10 + (bookIndex % 3) * 3;
                  const tilt = (Math.random() - 0.5) * 4;
                  const bookStyle = getRealisticBookStyle(bookIndex, shelfIndex);
                  
                  return (
                    <div
                      key={book.id}
                      className="group/book cursor-pointer transition-all duration-300 hover:scale-105 hover:-translate-y-2 hover:rotate-1 relative"
                      onClick={(e) => handleBookSelect(book, e)}
                      style={{
                        width: `${width}px`,
                        height: `${height}px`,
                        transform: `rotateY(${tilt}deg) perspective(1200px) translateZ(${bookIndex * 2}px)`,
                        transformStyle: 'preserve-3d'
                      }}
                    >
                      {/* Main Book Spine with enhanced pickup effect */}
                      <div
                        className="relative w-full h-full book-spine"
                        style={{
                          background: bookStyle.spine,
                          borderRadius: '5px 5px 0 0',
                          boxShadow: `
                            ${thickness}px 0 0 rgba(0,0,0,0.5),
                            ${thickness + 4}px 4px 16px ${bookStyle.shadow},
                            ${thickness + 8}px 8px 32px rgba(0,0,0,0.6),
                            inset 0 0 0 1px rgba(255,255,255,0.2),
                            inset 4px 0 0 rgba(255,255,255,0.3),
                            inset -1px 0 0 rgba(0,0,0,0.5),
                            inset 0 3px 6px rgba(255,255,255,0.25),
                            inset 0 -3px 6px rgba(0,0,0,0.4)
                          `,
                          border: '1px solid rgba(255,255,255,0.15)',
                          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                        }}
                      >
                        {/* Book Content */}
                        <div className="absolute inset-0 p-3 flex flex-col justify-between text-white">
                          {/* Top Decorative Element */}
                          <div 
                            className="w-full h-4 rounded-full mb-3"
                            style={{ 
                              background: `linear-gradient(90deg, ${bookStyle.accent}, transparent, ${bookStyle.accent})`,
                              opacity: 0.9
                            }}
                          />
                          
                          {/* Title - Properly oriented */}
                          <div 
                            className="text-center font-bold leading-tight overflow-hidden flex-1 flex items-center justify-center"
                            style={{ 
                              fontSize: '10px',
                              textShadow: '2px 2px 4px rgba(0,0,0,0.9)',
                              color: '#ffffff',
                              letterSpacing: '0.5px',
                              writingMode: 'vertical-rl',
                              textOrientation: 'mixed'
                            }}
                          >
                            {book.title.slice(0, 40)}
                          </div>
                          
                          {/* Middle Decorative Lines */}
                          <div className="flex flex-col space-y-1 items-center my-3">
                            <div className="w-full h-px bg-gradient-to-r from-transparent via-white/80 to-transparent"></div>
                            <div className="w-4/5 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent"></div>
                            <div className="w-3/5 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>
                          </div>
                          
                          {/* Author */}
                          <div 
                            className="text-center opacity-90"
                            style={{ 
                              fontSize: '8px',
                              textShadow: '1px 1px 3px rgba(0,0,0,0.9)',
                              letterSpacing: '0.3px',
                              writingMode: 'vertical-rl',
                              textOrientation: 'mixed'
                            }}
                          >
                            {book.author.slice(0, 35)}
                          </div>

                          {/* Bottom Decorative Element */}
                          <div 
                            className="w-full h-4 rounded-full mt-3"
                            style={{ 
                              background: `linear-gradient(90deg, ${bookStyle.accent}, transparent, ${bookStyle.accent})`,
                              opacity: 0.7
                            }}
                          />
                        </div>

                        {/* Enhanced 3D Book Edge */}
                        <div 
                          className="absolute top-0 right-0 h-full"
                          style={{ 
                            width: `${thickness}px`,
                            background: `
                              linear-gradient(90deg, 
                                rgba(0,0,0,0.6) 0%, 
                                rgba(255,255,255,0.2) 30%, 
                                rgba(0,0,0,0.4) 60%,
                                rgba(255,255,255,0.1) 80%,
                                rgba(0,0,0,0.8) 100%
                              )
                            `,
                            transform: 'rotateY(90deg)',
                            transformOrigin: 'left center',
                            borderRadius: '0 5px 0 0'
                          }}
                        />

                        {/* Enhanced Book Top */}
                        <div 
                          className="absolute top-0 left-0 w-full"
                          style={{ 
                            height: `${thickness}px`,
                            background: `
                              linear-gradient(180deg, 
                                rgba(255,255,255,0.5) 0%, 
                                rgba(255,255,255,0.2) 30%,
                                rgba(0,0,0,0.2) 70%,
                                rgba(0,0,0,0.5) 100%
                              )
                            `,
                            transform: 'rotateX(90deg)',
                            transformOrigin: 'bottom center',
                            borderRadius: '5px 5px 0 0'
                          }}
                        />

                        {/* Enhanced Realistic Wear Effects */}
                        <div className="absolute inset-0 pointer-events-none">
                          <div className="absolute top-4 right-2 w-3 h-3 bg-black/20 rounded-full blur-sm"></div>
                          <div className="absolute bottom-6 left-3 w-2 h-5 bg-black/15 rounded blur-sm"></div>
                          <div className="absolute top-1/4 left-0 right-0 h-px bg-black/30"></div>
                          <div className="absolute top-3/4 left-0 right-0 h-px bg-black/25"></div>
                          <div className="absolute top-2 left-2 right-2 h-px bg-white/40"></div>
                          <div className="absolute bottom-2 left-2 right-2 h-px bg-black/20"></div>
                        </div>

                        {/* Enhanced Page Stack Effect */}
                        <div className="absolute right-2 top-3 bottom-3 w-px bg-white/50"></div>
                        <div className="absolute right-3 top-3 bottom-3 w-px bg-white/35"></div>
                        <div className="absolute right-4 top-4 bottom-4 w-px bg-white/25"></div>
                        <div className="absolute right-5 top-4 bottom-4 w-px bg-white/15"></div>

                        {/* Quality Badge */}
                        {Math.random() > 0.6 && (
                          <span 
                            className="absolute -top-3 -right-3 bg-emerald-600 text-white text-xs px-3 py-1 rounded-full shadow-xl z-10 border-2 border-white/30"
                            style={{ fontSize: '9px', fontWeight: 'bold' }}
                          >
                            جدید
                          </span>
                        )}

                        {/* Enhanced Pickup Glow Effect */}
                        <div className="absolute inset-0 opacity-0 group-hover/book:opacity-100 transition-opacity duration-300 pointer-events-none">
                          <div 
                            className="absolute inset-0 rounded-lg"
                            style={{
                              background: `radial-gradient(ellipse at center, ${bookStyle.accent}20 0%, transparent 70%)`,
                              boxShadow: `0 0 20px ${bookStyle.accent}40, inset 0 0 20px ${bookStyle.accent}20`
                            }}
                          />
                        </div>
                      </div>

                      {/* Enhanced Interactive Tooltip */}
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-8 px-6 py-5 bg-gradient-to-br from-gray-900/98 via-black/98 to-gray-800/98 text-white text-sm rounded-3xl opacity-0 group-hover/book:opacity-100 transition-all duration-500 whitespace-nowrap z-50 backdrop-blur-xl border-2 border-gray-600/60 shadow-3xl">
                        <div className="font-bold text-blue-300 mb-2 text-lg">{book.title}</div>
                        <div className="text-gray-300 text-base mb-2">{book.author}</div>
                        <div className="text-gray-400 text-sm mb-3">{book.category}</div>
                        <div className="text-yellow-400 flex items-center text-base">
                          ⭐ {book.rating} | {book.pages} صفحه | {book.publishYear}
                        </div>
                        <div className="text-xs text-center mt-3 text-blue-300 animate-pulse">کلیک کنید تا برداشته شود</div>
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-12 border-transparent border-t-gray-900"></div>
                      </div>

                      {/* Floating Particles Effect on Hover */}
                      <div className="absolute inset-0 opacity-0 group-hover/book:opacity-100 transition-opacity duration-700 pointer-events-none">
                        {[...Array(6)].map((_, i) => (
                          <div
                            key={i}
                            className="absolute w-1 h-1 bg-yellow-300 rounded-full animate-pulse"
                            style={{
                              top: `${20 + i * 15}%`,
                              left: `${10 + (i % 3) * 30}%`,
                              animationDelay: `${i * 200}ms`,
                              animationDuration: '2s'
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  );
                })}
                
                {/* Enhanced Empty Book Placeholders */}
                {Array.from({ length: Math.max(0, booksPerShelf - shelf.length) }, (_, index) => (
                  <div
                    key={`empty-${shelfIndex}-${index}`}
                    className="bg-gradient-to-b from-gray-300/40 via-gray-400/25 to-gray-500/40 border border-gray-400/50 rounded-sm opacity-50"
                    style={{
                      width: '40px',
                      height: `${150 + (index % 3) * 12}px`,
                      boxShadow: '4px 0 12px rgba(0,0,0,0.2)',
                      transform: `perspective(1200px) translateZ(${index * 2}px)`
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Enhanced Shelf Label */}
            <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-amber-900 via-amber-700 to-amber-900 text-white px-8 py-3 rounded-full text-base font-bold shadow-2xl border-2 border-amber-600">
              قفسه {shelfIndex + 1}
            </div>
          </div>
        ))}
      </div>

      {/* Enhanced Statistics Section */}
      <div className="text-center text-gray-800 pb-16 px-12">
        <div className="bg-gradient-to-r from-white/85 via-amber-50/95 to-white/85 backdrop-blur-lg rounded-3xl p-10 mx-auto max-w-2xl border-2 border-amber-200/70 shadow-3xl">
          <h3 className="text-3xl font-bold mb-8 text-amber-800">📊 آمار کتابخانه</h3>
          <div className="grid grid-cols-3 gap-8 text-lg">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border-2 border-blue-200">
              <div className="text-4xl font-bold text-blue-700">{books.length}</div>
              <div className="text-blue-600 font-medium mt-2">کل کتاب‌ها</div>
            </div>
            <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-2xl p-6 border-2 border-emerald-200">
              <div className="text-4xl font-bold text-emerald-700">{shelves.length}</div>
              <div className="text-emerald-600 font-medium mt-2">تعداد قفسه</div>
            </div>
            <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl p-6 border-2 border-amber-200">
              <div className="text-4xl font-bold text-amber-700">{[...new Set(books.map(b => b.category))].length}</div>
              <div className="text-amber-600 font-medium mt-2">دسته‌بندی</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
