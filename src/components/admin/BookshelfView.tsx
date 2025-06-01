
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Book } from '@/types';

interface BookshelfViewProps {
  books: Book[];
}

export const BookshelfView: React.FC<BookshelfViewProps> = ({ books }) => {
  const booksPerShelf = 4;
  const shelves = [];
  
  for (let i = 0; i < books.length; i += booksPerShelf) {
    shelves.push(books.slice(i, i + booksPerShelf));
  }

  const getBookColor = (index: number) => {
    const colors = [
      'bg-gradient-to-r from-red-600 to-red-800',
      'bg-gradient-to-r from-blue-600 to-blue-900', 
      'bg-gradient-to-r from-green-600 to-green-800',
      'bg-gradient-to-r from-orange-600 to-orange-800',
      'bg-gradient-to-r from-purple-700 to-purple-900',
      'bg-gradient-to-r from-indigo-600 to-indigo-800',
      'bg-gradient-to-r from-teal-600 to-teal-800',
      'bg-gradient-to-r from-pink-600 to-pink-800',
      'bg-gradient-to-r from-yellow-600 to-yellow-700',
      'bg-gradient-to-r from-gray-700 to-gray-900'
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
                  #D2B48C 0%, 
                  #DEB887 10%, 
                  #CD853F 20%, 
                  #D2B48C 30%, 
                  #DEB887 40%, 
                  #CD853F 50%, 
                  #D2B48C 60%, 
                  #DEB887 70%, 
                  #CD853F 80%, 
                  #D2B48C 90%, 
                  #DEB887 100%
                ),
                repeating-linear-gradient(
                  0deg,
                  transparent 0px,
                  rgba(139, 69, 19, 0.05) 1px,
                  rgba(160, 82, 45, 0.08) 2px,
                  transparent 3px,
                  transparent 15px
                )
              `,
              backgroundSize: '100% 100%, 100% 15px'
            }}
          >
            {/* Wood grain texture overlay */}
            <div 
              className="absolute inset-0 opacity-15"
              style={{
                backgroundImage: `
                  repeating-linear-gradient(
                    90deg,
                    transparent,
                    transparent 20px,
                    rgba(139, 69, 19, 0.1) 21px,
                    rgba(139, 69, 19, 0.1) 23px,
                    transparent 24px,
                    transparent 50px
                  ),
                  repeating-linear-gradient(
                    0deg,
                    transparent,
                    transparent 8px,
                    rgba(160, 82, 45, 0.08) 9px,
                    rgba(160, 82, 45, 0.08) 10px,
                    transparent 11px,
                    transparent 25px
                  )
                `
              }}
            />

            {/* Main title */}
            <div className="text-center py-12">
              <h1 className="text-4xl font-bold text-blue-800 drop-shadow-lg font-vazir">
                کتابخانه دیجیتال سه‌بعدی
              </h1>
            </div>

            {/* Bookshelves */}
            <div className="space-y-24 px-12 pb-16">
              {shelves.map((shelf, shelfIndex) => (
                <div key={shelfIndex} className="relative">
                  {/* Shelf structure - exactly like the reference image */}
                  <div className="relative mx-auto" style={{ width: '90%', maxWidth: '1200px' }}>
                    
                    {/* Books on shelf */}
                    <div 
                      className="flex justify-center items-end space-x-12 rtl:space-x-reverse mb-4"
                      style={{ minHeight: '220px' }}
                    >
                      {shelf.map((book, bookIndex) => {
                        const height = 190 + (bookIndex % 3) * 20;
                        const width = 28 + (bookIndex % 3) * 4;
                        const tilt = (Math.random() - 0.5) * 3;
                        
                        return (
                          <div
                            key={book.id}
                            className={`
                              group cursor-pointer transition-all duration-300 hover:scale-105 hover:-translate-y-3
                              ${getBookColor(shelfIndex * booksPerShelf + bookIndex)}
                              relative overflow-hidden
                            `}
                            style={{
                              width: `${width}px`,
                              height: `${height}px`,
                              borderRadius: '2px 2px 0 0',
                              boxShadow: `
                                2px 0 8px rgba(0,0,0,0.3),
                                4px 0 16px rgba(0,0,0,0.15),
                                inset 0 0 0 1px rgba(255,255,255,0.2),
                                inset 2px 0 0 rgba(255,255,255,0.3),
                                inset -1px 0 0 rgba(0,0,0,0.2)
                              `,
                              transform: `rotateY(${tilt}deg)`,
                              transformStyle: 'preserve-3d'
                            }}
                          >
                            {/* Book spine details */}
                            <div className="absolute inset-0 p-2 flex flex-col justify-between text-white text-xs">
                              {/* Title on spine */}
                              <div 
                                className="writing-vertical-rl transform rotate-180 text-center font-bold leading-tight overflow-hidden font-vazir"
                                style={{ fontSize: '9px' }}
                              >
                                {book.title.slice(0, 30)}
                              </div>
                              
                              {/* Decorative lines */}
                              <div className="flex flex-col space-y-1 items-center my-2">
                                <div className="w-full h-px bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
                                <div className="w-2/3 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent"></div>
                              </div>
                              
                              {/* Author on spine */}
                              <div 
                                className="writing-vertical-rl transform rotate-180 text-center opacity-80 font-vazir"
                                style={{ fontSize: '7px' }}
                              >
                                {book.author.slice(0, 25)}
                              </div>
                            </div>

                            {/* Book spine edge (3D effect) */}
                            <div 
                              className="absolute top-0 right-0 w-1 h-full"
                              style={{ 
                                background: 'linear-gradient(90deg, rgba(255,255,255,0.3) 0%, rgba(0,0,0,0.3) 100%)'
                              }}
                            />

                            {/* Hover tooltip */}
                            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-4 px-3 py-2 bg-black/90 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-50 shadow-xl">
                              <div className="font-bold text-blue-300 mb-1 font-vazir">{book.title}</div>
                              <div className="text-gray-300 font-vazir">{book.author}</div>
                              <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-black/90"></div>
                            </div>
                          </div>
                        );
                      })}
                      
                      {/* Empty spaces for additional books */}
                      {Array.from({ length: Math.max(0, booksPerShelf - shelf.length) }, (_, index) => (
                        <div
                          key={`empty-${index}`}
                          className="bg-gradient-to-r from-gray-300/20 to-gray-400/20 border border-dashed border-gray-400/30"
                          style={{
                            width: '28px',
                            height: '190px',
                            borderRadius: '2px 2px 0 0'
                          }}
                        />
                      ))}
                    </div>

                    {/* Main shelf board - exactly like reference image */}
                    <div 
                      className="relative mx-auto"
                      style={{
                        width: '100%',
                        height: '20px',
                        background: `
                          linear-gradient(180deg, 
                            #F5DEB3 0%, 
                            #DEB887 30%, 
                            #CD853F 70%, 
                            #A0522D 100%
                          )
                        `,
                        borderRadius: '0 0 4px 4px',
                        boxShadow: `
                          0 4px 12px rgba(0,0,0,0.4),
                          0 2px 6px rgba(0,0,0,0.3),
                          inset 0 1px 2px rgba(255,255,255,0.4),
                          inset 0 -1px 2px rgba(0,0,0,0.2)
                        `
                      }}
                    >
                      {/* Shelf edge highlight */}
                      <div 
                        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-200/60 to-transparent"
                      />
                    </div>

                    {/* Shelf brackets - like reference image */}
                    <div className="absolute top-full left-12 w-3 h-4 bg-gradient-to-b from-gray-400 to-gray-600 rounded-sm shadow-lg" style={{ marginTop: '-2px' }}></div>
                    <div className="absolute top-full right-12 w-3 h-4 bg-gradient-to-b from-gray-400 to-gray-600 rounded-sm shadow-lg" style={{ marginTop: '-2px' }}></div>
                    
                    {/* Additional support brackets */}
                    <div className="absolute top-full left-1/3 w-3 h-4 bg-gradient-to-b from-gray-400 to-gray-600 rounded-sm shadow-lg" style={{ marginTop: '-2px' }}></div>
                    <div className="absolute top-full right-1/3 w-3 h-4 bg-gradient-to-b from-gray-400 to-gray-600 rounded-sm shadow-lg" style={{ marginTop: '-2px' }}></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer statistics with blue theme */}
            <div className="text-center pb-12">
              <div className="bg-blue-900/80 backdrop-blur-sm rounded-2xl p-6 mx-auto max-w-md border border-blue-300/20">
                <h3 className="text-xl font-bold mb-4 text-blue-200 font-vazir">📊 آمار کتابخانه</h3>
                <div className="grid grid-cols-2 gap-4 text-white">
                  <div className="bg-blue-800/30 rounded-xl p-3">
                    <div className="text-2xl font-bold text-blue-300">{books.length}</div>
                    <div className="text-sm font-vazir">کل کتاب‌ها</div>
                  </div>
                  <div className="bg-blue-800/30 rounded-xl p-3">
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
