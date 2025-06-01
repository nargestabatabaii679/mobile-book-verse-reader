
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Book } from '@/types';

interface BookshelfViewProps {
  books: Book[];
}

export const BookshelfView: React.FC<BookshelfViewProps> = ({ books }) => {
  const booksPerShelf = 5;
  const shelves = [];
  
  for (let i = 0; i < books.length; i += booksPerShelf) {
    shelves.push(books.slice(i, i + booksPerShelf));
  }

  const getBookStyle = (index: number) => {
    const colors = [
      { 
        spine: 'linear-gradient(145deg, #8B4513 0%, #A0522D 20%, #8B4513 40%, #654321 60%, #8B4513 80%, #A0522D 100%)',
        shadow: 'rgba(139, 69, 19, 0.8)',
        accent: '#D2691E'
      },
      { 
        spine: 'linear-gradient(145deg, #1e3a8a 0%, #2563eb 20%, #1e40af 40%, #1e3a8a 60%, #2563eb 80%, #1e40af 100%)',
        shadow: 'rgba(30, 58, 138, 0.8)',
        accent: '#60a5fa'
      },
      { 
        spine: 'linear-gradient(145deg, #166534 0%, #16a34a 20%, #15803d 40%, #166534 60%, #16a34a 80%, #15803d 100%)',
        shadow: 'rgba(22, 101, 52, 0.8)',
        accent: '#4ade80'
      },
      { 
        spine: 'linear-gradient(145deg, #c2410c 0%, #ea580c 20%, #dc2626 40%, #c2410c 60%, #ea580c 80%, #dc2626 100%)',
        shadow: 'rgba(194, 65, 12, 0.8)',
        accent: '#fb923c'
      },
      { 
        spine: 'linear-gradient(145deg, #7c2d12 0%, #9a3412 20%, #7c2d12 40%, #451a03 60%, #7c2d12 80%, #9a3412 100%)',
        shadow: 'rgba(124, 45, 18, 0.8)',
        accent: '#f97316'
      },
      { 
        spine: 'linear-gradient(145deg, #581c87 0%, #7c3aed 20%, #6d28d9 40%, #581c87 60%, #7c3aed 80%, #6d28d9 100%)',
        shadow: 'rgba(88, 28, 135, 0.8)',
        accent: '#a78bfa'
      }
    ];
    return colors[index % colors.length];
  };

  return (
    <div className="w-full min-h-screen">
      <Card className="overflow-hidden border-none shadow-none">
        <CardHeader className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white">
          <CardTitle className="text-center text-2xl font-bold font-vazir">
            📚 کتابخانه دیجیتال مدیریتی
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div 
            className="min-h-screen relative"
            style={{
              background: `
                linear-gradient(180deg, 
                  #8B4513 0%, 
                  #A0522D 15%, 
                  #8B4513 30%, 
                  #D2B48C 45%, 
                  #DEB887 55%, 
                  #D2B48C 70%, 
                  #A0522D 85%, 
                  #8B4513 100%
                )
              `,
            }}
          >
            {/* Wood grain texture overlay */}
            <div 
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: `
                  repeating-linear-gradient(
                    90deg,
                    transparent,
                    transparent 25px,
                    rgba(101, 67, 33, 0.3) 26px,
                    rgba(101, 67, 33, 0.3) 28px,
                    transparent 29px,
                    transparent 60px
                  ),
                  repeating-linear-gradient(
                    0deg,
                    transparent,
                    transparent 12px,
                    rgba(160, 82, 45, 0.2) 13px,
                    rgba(160, 82, 45, 0.2) 15px,
                    transparent 16px,
                    transparent 35px
                  )
                `
              }}
            />

            {/* Main title */}
            <div className="text-center py-12">
              <h1 className="text-4xl font-bold text-blue-100 drop-shadow-2xl font-vazir">
                کتابخانه دیجیتال سه‌بعدی
              </h1>
            </div>

            {/* Bookshelves */}
            <div className="space-y-32 px-12 pb-16">
              {shelves.map((shelf, shelfIndex) => (
                <div key={shelfIndex} className="relative">
                  {/* Shelf structure */}
                  <div className="relative mx-auto" style={{ width: '85%', maxWidth: '1100px' }}>
                    
                    {/* Books on shelf */}
                    <div 
                      className="flex justify-center items-end space-x-8 rtl:space-x-reverse mb-6"
                      style={{ minHeight: '240px' }}
                    >
                      {shelf.map((book, bookIndex) => {
                        const height = 200 + (bookIndex % 4) * 15;
                        const width = 35 + (bookIndex % 3) * 5;
                        const thickness = 8 + (bookIndex % 2) * 3;
                        const tilt = (Math.random() - 0.5) * 2;
                        const bookStyle = getBookStyle(shelfIndex * booksPerShelf + bookIndex);
                        
                        return (
                          <div
                            key={book.id}
                            className="group cursor-pointer transition-all duration-500 hover:scale-110 hover:-translate-y-4 hover:rotate-1"
                            style={{
                              width: `${width}px`,
                              height: `${height}px`,
                              transform: `rotateY(${tilt}deg) perspective(1000px)`,
                              transformStyle: 'preserve-3d'
                            }}
                          >
                            {/* Book spine (main visible part) */}
                            <div
                              className="relative w-full h-full"
                              style={{
                                background: bookStyle.spine,
                                borderRadius: '3px 3px 1px 1px',
                                boxShadow: `
                                  ${thickness}px 0 0 rgba(0,0,0,0.3),
                                  ${thickness + 2}px 2px 8px ${bookStyle.shadow},
                                  ${thickness + 4}px 4px 16px rgba(0,0,0,0.4),
                                  inset 0 0 0 1px rgba(255,255,255,0.2),
                                  inset 2px 0 0 rgba(255,255,255,0.4),
                                  inset -1px 0 0 rgba(0,0,0,0.3),
                                  inset 0 1px 2px rgba(255,255,255,0.3),
                                  inset 0 -1px 2px rgba(0,0,0,0.2)
                                `,
                                border: '1px solid rgba(255,255,255,0.1)'
                              }}
                            >
                              {/* Book spine content with corrected text direction */}
                              <div className="absolute inset-0 p-3 flex flex-col justify-between text-white">
                                {/* Decorative top band */}
                                <div 
                                  className="w-full h-2 rounded-full mb-2"
                                  style={{ background: `linear-gradient(90deg, ${bookStyle.accent}, transparent, ${bookStyle.accent})` }}
                                />
                                
                                {/* Corrected Title on spine - vertical but readable */}
                                <div 
                                  className="text-center font-bold leading-tight overflow-hidden font-vazir flex-1 flex items-center justify-center"
                                  style={{ 
                                    fontSize: '11px',
                                    textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
                                    color: '#ffffff',
                                    fontWeight: 'bold'
                                  }}
                                >
                                  <div className="transform -rotate-90 whitespace-nowrap max-w-full overflow-hidden text-ellipsis">
                                    {book.title.slice(0, 30)}
                                  </div>
                                </div>
                                
                                {/* Middle decorative lines */}
                                <div className="flex flex-col space-y-1 items-center my-3">
                                  <div className="w-full h-px bg-gradient-to-r from-transparent via-white/60 to-transparent"></div>
                                  <div className="w-3/4 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
                                  <div className="w-1/2 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
                                </div>
                                
                                {/* Corrected Author on spine - vertical but readable */}
                                <div 
                                  className="text-center opacity-90 font-vazir flex items-center justify-center"
                                  style={{ 
                                    fontSize: '9px',
                                    textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
                                    fontWeight: '500'
                                  }}
                                >
                                  <div className="transform -rotate-90 whitespace-nowrap max-w-full overflow-hidden text-ellipsis">
                                    {book.author.slice(0, 25)}
                                  </div>
                                </div>

                                {/* Decorative bottom band */}
                                <div 
                                  className="w-full h-2 rounded-full mt-2"
                                  style={{ background: `linear-gradient(90deg, ${bookStyle.accent}, transparent, ${bookStyle.accent})` }}
                                />
                              </div>

                              {/* Book spine edge (right side - 3D depth) */}
                              <div 
                                className="absolute top-0 right-0 h-full"
                                style={{ 
                                  width: `${thickness}px`,
                                  background: `linear-gradient(90deg, rgba(0,0,0,0.4) 0%, rgba(255,255,255,0.1) 50%, rgba(0,0,0,0.6) 100%)`,
                                  transform: 'rotateY(90deg)',
                                  transformOrigin: 'left center',
                                  borderRadius: '0 3px 1px 0'
                                }}
                              />

                              {/* Book top edge */}
                              <div 
                                className="absolute top-0 left-0 w-full"
                                style={{ 
                                  height: `${thickness}px`,
                                  background: `linear-gradient(180deg, rgba(255,255,255,0.3) 0%, rgba(0,0,0,0.3) 100%)`,
                                  transform: 'rotateX(90deg)',
                                  transformOrigin: 'bottom center',
                                  borderRadius: '3px 3px 0 0'
                                }}
                              />

                              {/* Realistic wear and tear effects */}
                              <div className="absolute inset-0 pointer-events-none">
                                {/* Corner wear */}
                                <div className="absolute top-2 right-1 w-2 h-2 bg-black/10 rounded-full blur-sm"></div>
                                <div className="absolute bottom-3 left-2 w-1 h-3 bg-black/10 rounded blur-sm"></div>
                                
                                {/* Spine creases */}
                                <div className="absolute top-1/4 left-0 right-0 h-px bg-black/20"></div>
                                <div className="absolute top-3/4 left-0 right-0 h-px bg-black/15"></div>
                              </div>
                            </div>

                            {/* Enhanced hover tooltip */}
                            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-6 px-4 py-3 bg-gradient-to-r from-gray-900 to-black text-white text-sm rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap z-50 shadow-2xl border border-gray-600">
                              <div className="font-bold text-blue-300 mb-1 font-vazir">{book.title}</div>
                              <div className="text-gray-300 font-vazir text-xs">{book.author}</div>
                              <div className="text-gray-400 font-vazir text-xs mt-1">{book.category}</div>
                              <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-8 border-transparent border-t-gray-900"></div>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Enhanced wooden shelf */}
                    <div 
                      className="relative mx-auto"
                      style={{
                        width: '100%',
                        height: '25px',
                        background: `
                          linear-gradient(180deg, 
                            #DEB887 0%, 
                            #D2B48C 20%, 
                            #CD853F 40%, 
                            #A0522D 60%, 
                            #8B4513 80%, 
                            #654321 100%
                          )
                        `,
                        borderRadius: '0 0 6px 6px',
                        boxShadow: `
                          0 6px 20px rgba(0,0,0,0.6),
                          0 3px 10px rgba(0,0,0,0.4),
                          inset 0 2px 4px rgba(255,255,255,0.5),
                          inset 0 -2px 4px rgba(0,0,0,0.3),
                          inset 2px 0 4px rgba(255,255,255,0.2),
                          inset -2px 0 4px rgba(0,0,0,0.2)
                        `
                      }}
                    >
                      {/* Shelf edge highlight */}
                      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-yellow-200/80 to-transparent rounded-t" />
                      
                      {/* Wood grain on shelf */}
                      <div 
                        className="absolute inset-0 opacity-30 rounded"
                        style={{
                          backgroundImage: `
                            repeating-linear-gradient(
                              90deg,
                              transparent,
                              transparent 8px,
                              rgba(101, 67, 33, 0.3) 9px,
                              rgba(101, 67, 33, 0.3) 10px,
                              transparent 11px,
                              transparent 20px
                            )
                          `
                        }}
                      />
                    </div>

                    {/* Enhanced metal brackets */}
                    <div className="absolute top-full left-16 w-4 h-6 bg-gradient-to-b from-gray-300 via-gray-500 to-gray-700 rounded-sm shadow-xl border border-gray-400" style={{ marginTop: '-3px' }}></div>
                    <div className="absolute top-full right-16 w-4 h-6 bg-gradient-to-b from-gray-300 via-gray-500 to-gray-700 rounded-sm shadow-xl border border-gray-400" style={{ marginTop: '-3px' }}></div>
                    <div className="absolute top-full left-1/3 w-4 h-6 bg-gradient-to-b from-gray-300 via-gray-500 to-gray-700 rounded-sm shadow-xl border border-gray-400" style={{ marginTop: '-3px' }}></div>
                    <div className="absolute top-full right-1/3 w-4 h-6 bg-gradient-to-b from-gray-300 via-gray-500 to-gray-700 rounded-sm shadow-xl border border-gray-400" style={{ marginTop: '-3px' }}></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer statistics with blue theme */}
            <div className="text-center pb-12">
              <div className="bg-blue-900/90 backdrop-blur-sm rounded-2xl p-6 mx-auto max-w-md border border-blue-300/30 shadow-2xl">
                <h3 className="text-xl font-bold mb-4 text-blue-200 font-vazir">📊 آمار کتابخانه</h3>
                <div className="grid grid-cols-2 gap-4 text-white">
                  <div className="bg-blue-800/40 rounded-xl p-3 border border-blue-600/30">
                    <div className="text-2xl font-bold text-blue-300">{books.length}</div>
                    <div className="text-sm font-vazir">کل کتاب‌ها</div>
                  </div>
                  <div className="bg-blue-800/40 rounded-xl p-3 border border-blue-600/30">
                    <div className="text-2xl font-bold text-blue-300">{shelves.length}</div>
                    <div className="text-sm font-vazir">تعداد قفسه</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
