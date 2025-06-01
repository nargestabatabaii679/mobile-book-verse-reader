
import React from 'react';
import { Book } from '@/types';

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
  
  for (let i = 0; i < books.length; i += booksPerShelf) {
    shelves.push(books.slice(i, i + booksPerShelf));
  }

  const getBookStyle = (index: number) => {
    const colors = [
      {
        spine: 'linear-gradient(145deg, #8B4513 0%, #CD853F 25%, #D2691E 50%, #A0522D 75%, #8B4513 100%)',
        shadow: 'rgba(139, 69, 19, 0.8)',
        accent: '#FFD700',
        leather: 'linear-gradient(90deg, #8B4513 0%, #A0522D 50%, #8B4513 100%)'
      },
      {
        spine: 'linear-gradient(145deg, #1e3a8a 0%, #3b82f6 25%, #60a5fa 50%, #2563eb 75%, #1e3a8a 100%)',
        shadow: 'rgba(30, 58, 138, 0.8)',
        accent: '#87CEEB',
        leather: 'linear-gradient(90deg, #1e3a8a 0%, #2563eb 50%, #1e3a8a 100%)'
      },
      {
        spine: 'linear-gradient(145deg, #166534 0%, #22c55e 25%, #4ade80 50%, #16a34a 75%, #166534 100%)',
        shadow: 'rgba(22, 101, 52, 0.8)',
        accent: '#98FB98',
        leather: 'linear-gradient(90deg, #166534 0%, #16a34a 50%, #166534 100%)'
      },
      {
        spine: 'linear-gradient(145deg, #c2410c 0%, #f97316 25%, #fb923c 50%, #ea580c 75%, #c2410c 100%)',
        shadow: 'rgba(194, 65, 12, 0.8)',
        accent: '#FFE4B5',
        leather: 'linear-gradient(90deg, #c2410c 0%, #ea580c 50%, #c2410c 100%)'
      },
      {
        spine: 'linear-gradient(145deg, #7c2d12 0%, #dc2626 25%, #f87171 50%, #b91c1c 75%, #7c2d12 100%)',
        shadow: 'rgba(124, 45, 18, 0.8)',
        accent: '#FFB6C1',
        leather: 'linear-gradient(90deg, #7c2d12 0%, #dc2626 50%, #7c2d12 100%)'
      },
      {
        spine: 'linear-gradient(145deg, #581c87 0%, #8b5cf6 25%, #a78bfa 50%, #7c3aed 75%, #581c87 100%)',
        shadow: 'rgba(88, 28, 135, 0.8)',
        accent: '#DDA0DD',
        leather: 'linear-gradient(90deg, #581c87 0%, #7c3aed 50%, #581c87 100%)'
      }
    ];
    return colors[index % colors.length];
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="text-white text-xl">در حال بارگذاری کتاب‌ها...</div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen relative">
      <div 
        className="min-h-screen relative overflow-hidden"
        style={{
          background: `
            radial-gradient(ellipse at top, rgba(139, 69, 19, 0.4) 0%, transparent 50%),
            linear-gradient(180deg, 
              #2D1B14 0%, 
              #3D2518 15%, 
              #4A2E1A 30%, 
              #5C371E 45%, 
              #6B4023 55%, 
              #5C371E 70%, 
              #4A2E1A 85%, 
              #2D1B14 100%
            )
          `,
        }}
      >
        {/* Enhanced wood grain texture */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `
              repeating-linear-gradient(
                90deg,
                transparent,
                transparent 25px,
                rgba(101, 67, 33, 0.4) 26px,
                rgba(101, 67, 33, 0.4) 28px,
                transparent 29px,
                transparent 60px
              ),
              repeating-linear-gradient(
                0deg,
                transparent,
                transparent 12px,
                rgba(160, 82, 45, 0.3) 13px,
                rgba(160, 82, 45, 0.3) 15px,
                transparent 16px,
                transparent 35px
              ),
              radial-gradient(circle at 30% 20%, rgba(210, 180, 140, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 70% 80%, rgba(222, 184, 135, 0.1) 0%, transparent 50%)
            `
          }}
        />

        {/* Main title */}
        <div className="text-center py-16 relative z-10">
          <h1 className="text-5xl font-bold text-amber-100 drop-shadow-2xl">
            کتابخانه دیجیتال سه‌بعدی
          </h1>
          <p className="text-xl text-amber-200 mt-4 drop-shadow-lg">
            مجموعه‌ای از بهترین کتاب‌های فارسی
          </p>
        </div>

        {/* Enhanced Bookshelves */}
        <div className="space-y-40 px-8 pb-20">
          {shelves.map((shelf, shelfIndex) => (
            <div key={shelfIndex} className="relative">
              <div className="relative mx-auto perspective-1000" style={{ width: '90%', maxWidth: '1200px' }}>
                
                {/* Books on shelf */}
                <div 
                  className="flex justify-center items-end space-x-6 rtl:space-x-reverse mb-8"
                  style={{ minHeight: '280px' }}
                >
                  {shelf.map((book, bookIndex) => {
                    const height = 220 + (bookIndex % 5) * 15;
                    const width = 38 + (bookIndex % 4) * 4;
                    const thickness = 12 + (bookIndex % 3) * 4;
                    const tilt = (Math.random() - 0.5) * 3;
                    const lean = (Math.random() - 0.5) * 1.5;
                    const bookStyle = getBookStyle(shelfIndex * booksPerShelf + bookIndex);
                    
                    return (
                      <div
                        key={book.id}
                        className="group cursor-pointer transition-all duration-700 hover:scale-110 hover:-translate-y-6 hover:rotate-1 hover:z-50 relative"
                        style={{
                          width: `${width}px`,
                          height: `${height}px`,
                          transform: `rotateY(${tilt}deg) rotateZ(${lean}deg) perspective(1500px)`,
                          transformStyle: 'preserve-3d',
                          filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.4))'
                        }}
                        onClick={() => onSelectBook(book)}
                      >
                        {/* Enhanced Book Structure */}
                        <div
                          className="relative w-full h-full transition-all duration-700 group-hover:brightness-110"
                          style={{
                            background: bookStyle.spine,
                            borderRadius: '4px 4px 2px 2px',
                            boxShadow: `
                              ${thickness}px 0 0 rgba(0,0,0,0.4),
                              ${thickness + 2}px 2px 12px ${bookStyle.shadow},
                              ${thickness + 6}px 6px 24px rgba(0,0,0,0.5),
                              ${thickness + 8}px 8px 32px rgba(0,0,0,0.3),
                              inset 0 0 0 1px rgba(255,255,255,0.3),
                              inset 3px 0 0 rgba(255,255,255,0.5),
                              inset -2px 0 0 rgba(0,0,0,0.4),
                              inset 0 2px 4px rgba(255,255,255,0.4),
                              inset 0 -2px 4px rgba(0,0,0,0.3)
                            `,
                            border: '1px solid rgba(255,255,255,0.2)',
                            position: 'relative'
                          }}
                        >
                          {/* Enhanced leather texture overlay */}
                          <div 
                            className="absolute inset-0 opacity-60 rounded"
                            style={{
                              background: `
                                radial-gradient(circle at 25% 25%, rgba(255,255,255,0.3) 0%, transparent 50%),
                                radial-gradient(circle at 75% 75%, rgba(0,0,0,0.2) 0%, transparent 50%),
                                repeating-linear-gradient(
                                  45deg,
                                  transparent,
                                  transparent 2px,
                                  rgba(0,0,0,0.1) 3px,
                                  rgba(0,0,0,0.1) 4px
                                )
                              `
                            }}
                          />

                          {/* Book spine content */}
                          <div className="absolute inset-0 p-4 flex flex-col justify-between text-white relative z-10">
                            {/* Top decorative element */}
                            <div 
                              className="w-full h-3 rounded-full mb-3 shadow-inner"
                              style={{ 
                                background: `linear-gradient(90deg, ${bookStyle.accent}80, ${bookStyle.accent}40, ${bookStyle.accent}80)`,
                                boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.3)'
                              }}
                            />
                            
                            {/* Enhanced title on spine */}
                            <div 
                              className="text-center font-bold leading-tight overflow-hidden flex-1 flex items-center justify-center relative"
                              style={{ 
                                fontSize: '12px',
                                textShadow: '3px 3px 6px rgba(0,0,0,0.9)',
                                color: '#ffffff',
                                fontWeight: 'bold'
                              }}
                            >
                              <div className="transform -rotate-90 whitespace-nowrap max-w-full overflow-hidden text-ellipsis">
                                {book.title.slice(0, 35)}
                              </div>
                              {/* Title background glow */}
                              <div 
                                className="absolute inset-0 rounded opacity-20"
                                style={{ background: `radial-gradient(ellipse, ${bookStyle.accent} 0%, transparent 70%)` }}
                              />
                            </div>
                            
                            {/* Enhanced decorative middle section */}
                            <div className="flex flex-col space-y-2 items-center my-4 relative">
                              <div 
                                className="w-full h-px"
                                style={{ background: `linear-gradient(90deg, transparent, ${bookStyle.accent}80, transparent)` }}
                              />
                              <div 
                                className="w-4 h-4 rounded-full border-2 shadow-lg"
                                style={{ 
                                  borderColor: bookStyle.accent,
                                  background: `radial-gradient(circle, ${bookStyle.accent}60 0%, transparent 70%)`
                                }}
                              />
                              <div 
                                className="w-3/4 h-px"
                                style={{ background: `linear-gradient(90deg, transparent, ${bookStyle.accent}60, transparent)` }}
                              />
                            </div>
                            
                            {/* Enhanced author on spine */}
                            <div 
                              className="text-center opacity-95 flex items-center justify-center relative"
                              style={{ 
                                fontSize: '10px',
                                textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
                                fontWeight: '600'
                              }}
                            >
                              <div className="transform -rotate-90 whitespace-nowrap max-w-full overflow-hidden text-ellipsis">
                                {book.author.slice(0, 25)}
                              </div>
                            </div>

                            {/* Bottom decorative element */}
                            <div 
                              className="w-full h-3 rounded-full mt-3 shadow-inner"
                              style={{ 
                                background: `linear-gradient(90deg, ${bookStyle.accent}60, ${bookStyle.accent}30, ${bookStyle.accent}60)`,
                                boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.3)'
                              }}
                            />
                          </div>

                          {/* Enhanced 3D edges */}
                          <div 
                            className="absolute top-0 right-0 h-full"
                            style={{ 
                              width: `${thickness}px`,
                              background: `linear-gradient(90deg, rgba(0,0,0,0.5) 0%, rgba(255,255,255,0.2) 30%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0.7) 100%)`,
                              transform: 'rotateY(90deg)',
                              transformOrigin: 'left center',
                              borderRadius: '0 4px 2px 0',
                              boxShadow: 'inset 1px 0 2px rgba(255,255,255,0.3)'
                            }}
                          />

                          <div 
                            className="absolute top-0 left-0 w-full"
                            style={{ 
                              height: `${thickness}px`,
                              background: `linear-gradient(180deg, rgba(255,255,255,0.4) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.4) 100%)`,
                              transform: 'rotateX(90deg)',
                              transformOrigin: 'bottom center',
                              borderRadius: '4px 4px 0 0',
                              boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.4)'
                            }}
                          />

                          {/* Enhanced wear and aging effects */}
                          <div className="absolute inset-0 pointer-events-none">
                            <div className="absolute top-3 right-2 w-3 h-3 bg-black/15 rounded-full blur-sm"></div>
                            <div className="absolute bottom-4 left-3 w-2 h-4 bg-black/10 rounded blur-sm"></div>
                            <div className="absolute top-1/3 left-0 right-0 h-px bg-black/25"></div>
                            <div className="absolute top-2/3 left-0 right-0 h-px bg-black/20"></div>
                            
                            {/* Aging spots */}
                            <div className="absolute top-1/4 right-1 w-1 h-1 bg-amber-800/30 rounded-full blur-sm"></div>
                            <div className="absolute bottom-1/3 left-2 w-1 h-2 bg-amber-700/20 rounded blur-sm"></div>
                          </div>

                          {/* Enhanced shimmer effect on hover */}
                          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                            <div 
                              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 animate-pulse"
                              style={{ animation: 'shimmer 2s infinite' }}
                            />
                          </div>
                        </div>

                        {/* Ultra enhanced hover tooltip */}
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-8 px-6 py-4 bg-gradient-to-br from-gray-900 via-blue-900 to-black text-white text-sm rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 whitespace-nowrap z-50 shadow-2xl border border-blue-400/30 backdrop-blur-sm min-w-max">
                          <div className="font-bold text-blue-300 mb-2 text-lg">{book.title}</div>
                          <div className="text-gray-300 mb-1">نویسنده: {book.author}</div>
                          <div className="text-gray-400 text-xs mb-2">{book.category} • {book.pages} صفحه</div>
                          <div className="flex items-center text-amber-400">
                            {[...Array(5)].map((_, i) => (
                              <span key={i} className={`text-sm ${i < book.rating ? 'opacity-100' : 'opacity-30'}`}>⭐</span>
                            ))}
                            <span className="ml-2 text-xs text-gray-400">({book.rating}/5)</span>
                          </div>
                          <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-8 border-transparent border-t-gray-900"></div>
                          
                          {/* Tooltip glow effect */}
                          <div className="absolute inset-0 bg-blue-500/10 rounded-2xl blur-xl opacity-50"></div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Ultra enhanced wooden shelf */}
                <div 
                  className="relative mx-auto"
                  style={{
                    width: '105%',
                    height: '35px',
                    background: `
                      linear-gradient(180deg, 
                        #F4E4BC 0%, 
                        #DEB887 10%, 
                        #D2B48C 20%, 
                        #CD853F 40%, 
                        #A0522D 60%, 
                        #8B4513 80%, 
                        #654321 95%,
                        #3D2815 100%
                      )
                    `,
                    borderRadius: '0 0 8px 8px',
                    boxShadow: `
                      0 8px 25px rgba(0,0,0,0.7),
                      0 4px 15px rgba(0,0,0,0.5),
                      0 15px 35px rgba(0,0,0,0.4),
                      inset 0 3px 6px rgba(255,255,255,0.6),
                      inset 0 -3px 6px rgba(0,0,0,0.4),
                      inset 3px 0 6px rgba(255,255,255,0.3),
                      inset -3px 0 6px rgba(0,0,0,0.3)
                    `,
                    transform: 'perspective(1000px) rotateX(-5deg)'
                  }}
                >
                  {/* Enhanced shelf edge highlight */}
                  <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-transparent via-yellow-200/90 to-transparent rounded-t" />
                  
                  {/* Enhanced wood grain on shelf */}
                  <div 
                    className="absolute inset-0 opacity-40 rounded"
                    style={{
                      backgroundImage: `
                        repeating-linear-gradient(
                          90deg,
                          transparent,
                          transparent 12px,
                          rgba(101, 67, 33, 0.4) 13px,
                          rgba(101, 67, 33, 0.4) 15px,
                          transparent 16px,
                          transparent 28px
                        ),
                        repeating-linear-gradient(
                          0deg,
                          transparent,
                          transparent 3px,
                          rgba(160, 82, 45, 0.2) 4px,
                          rgba(160, 82, 45, 0.2) 5px,
                          transparent 6px,
                          transparent 12px
                        )
                      `
                    }}
                  />

                  {/* Shelf wear marks */}
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-1 left-1/4 w-8 h-1 bg-black/20 rounded blur-sm"></div>
                    <div className="absolute top-2 right-1/3 w-6 h-1 bg-black/15 rounded blur-sm"></div>
                    <div className="absolute bottom-1 left-1/2 w-4 h-1 bg-black/10 rounded blur-sm"></div>
                  </div>
                </div>

                {/* Enhanced metal brackets with realistic shadows */}
                <div className="absolute top-full left-20 w-6 h-8 bg-gradient-to-b from-gray-200 via-gray-400 to-gray-700 rounded-md shadow-2xl border border-gray-300" style={{ marginTop: '-4px', transform: 'perspective(500px) rotateX(-10deg)' }}>
                  <div className="absolute inset-1 bg-gradient-to-b from-gray-300 to-gray-600 rounded-sm"></div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-gray-800 rounded-full shadow-inner"></div>
                </div>
                <div className="absolute top-full right-20 w-6 h-8 bg-gradient-to-b from-gray-200 via-gray-400 to-gray-700 rounded-md shadow-2xl border border-gray-300" style={{ marginTop: '-4px', transform: 'perspective(500px) rotateX(-10deg)' }}>
                  <div className="absolute inset-1 bg-gradient-to-b from-gray-300 to-gray-600 rounded-sm"></div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-gray-800 rounded-full shadow-inner"></div>
                </div>
                <div className="absolute top-full left-1/3 w-6 h-8 bg-gradient-to-b from-gray-200 via-gray-400 to-gray-700 rounded-md shadow-2xl border border-gray-300" style={{ marginTop: '-4px', transform: 'perspective(500px) rotateX(-10deg)' }}>
                  <div className="absolute inset-1 bg-gradient-to-b from-gray-300 to-gray-600 rounded-sm"></div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-gray-800 rounded-full shadow-inner"></div>
                </div>
                <div className="absolute top-full right-1/3 w-6 h-8 bg-gradient-to-b from-gray-200 via-gray-400 to-gray-700 rounded-md shadow-2xl border border-gray-300" style={{ marginTop: '-4px', transform: 'perspective(500px) rotateX(-10deg)' }}>
                  <div className="absolute inset-1 bg-gradient-to-b from-gray-300 to-gray-600 rounded-sm"></div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-gray-800 rounded-full shadow-inner"></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced footer statistics */}
        <div className="text-center pb-16 relative z-10">
          <div className="bg-gradient-to-br from-amber-900/90 via-yellow-800/90 to-amber-900/90 backdrop-blur-lg rounded-3xl p-8 mx-auto max-w-md border-2 border-amber-400/40 shadow-2xl">
            <h3 className="text-2xl font-bold mb-6 text-amber-200">📊 آمار کتابخانه</h3>
            <div className="grid grid-cols-2 gap-6 text-white">
              <div className="bg-amber-800/50 rounded-2xl p-4 border border-amber-600/40 shadow-inner">
                <div className="text-3xl font-bold text-amber-300">{books.length}</div>
                <div className="text-sm font-semibold text-amber-100">کل کتاب‌ها</div>
              </div>
              <div className="bg-amber-800/50 rounded-2xl p-4 border border-amber-600/40 shadow-inner">
                <div className="text-3xl font-bold text-amber-300">{shelves.length}</div>
                <div className="text-sm font-semibold text-amber-100">تعداد قفسه</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%) skewX(-12deg); }
          100% { transform: translateX(300%) skewX(-12deg); }
        }
        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>
    </div>
  );
};
