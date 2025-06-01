
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
        <CardHeader className="bg-gradient-to-r from-amber-900 via-amber-800 to-amber-900 text-white">
          <CardTitle className="text-center text-2xl font-bold font-vazir">
            📚 کتابخانه دیجیتال مدیریتی
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div 
            className="min-h-screen relative"
            style={{
              background: `
                linear-gradient(90deg, 
                  #8B4513 0%, 
                  #A0522D 8%, 
                  #CD853F 15%, 
                  #DEB887 22%, 
                  #F5DEB3 30%, 
                  #DEB887 38%, 
                  #CD853F 45%, 
                  #A0522D 52%, 
                  #8B4513 60%,
                  #A0522D 68%,
                  #CD853F 75%,
                  #DEB887 82%,
                  #F5DEB3 90%,
                  #DEB887 100%
                ),
                repeating-linear-gradient(
                  90deg,
                  transparent 0px,
                  rgba(139, 69, 19, 0.1) 2px,
                  rgba(139, 69, 19, 0.2) 4px,
                  transparent 6px,
                  transparent 20px
                )
              `,
              backgroundSize: '100% 100%, 20px 100%'
            }}
          >
            {/* Wood grain texture overlay */}
            <div 
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: `
                  repeating-linear-gradient(
                    92deg,
                    transparent,
                    transparent 8px,
                    rgba(101, 67, 33, 0.3) 9px,
                    rgba(101, 67, 33, 0.3) 11px,
                    transparent 12px,
                    transparent 25px
                  ),
                  repeating-linear-gradient(
                    88deg,
                    transparent,
                    transparent 15px,
                    rgba(160, 82, 45, 0.2) 16px,
                    rgba(160, 82, 45, 0.2) 18px,
                    transparent 19px,
                    transparent 40px
                  )
                `
              }}
            />

            {/* Main title */}
            <div className="text-center py-12">
              <h1 className="text-4xl font-bold text-amber-800 drop-shadow-lg font-vazir">
                کتابخانه دیجیتال سه‌بعدی
              </h1>
            </div>

            {/* Bookshelves */}
            <div className="space-y-16 px-8 pb-16">
              {shelves.map((shelf, shelfIndex) => (
                <div key={shelfIndex} className="relative">
                  {/* Shelf structure - exactly like the image */}
                  <div className="relative mx-auto" style={{ width: '85%' }}>
                    {/* Main shelf board */}
                    <div 
                      className="relative"
                      style={{
                        height: '25px',
                        background: `
                          linear-gradient(180deg, 
                            #F5DEB3 0%, 
                            #DEB887 20%, 
                            #CD853F 50%, 
                            #A0522D 80%, 
                            #8B4513 100%
                          )
                        `,
                        borderRadius: '0 0 8px 8px',
                        boxShadow: `
                          0 8px 16px rgba(0,0,0,0.4),
                          0 4px 8px rgba(0,0,0,0.3),
                          inset 0 2px 4px rgba(255,255,255,0.3),
                          inset 0 -2px 4px rgba(0,0,0,0.2)
                        `,
                        transform: 'perspective(1000px) rotateX(45deg)',
                        transformOrigin: 'top'
                      }}
                    >
                      {/* Shelf edge highlight */}
                      <div 
                        className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-yellow-200 to-transparent opacity-60"
                        style={{ borderRadius: '8px 8px 0 0' }}
                      />
                    </div>

                    {/* Shelf brackets */}
                    <div className="absolute -bottom-2 left-8 w-4 h-6 bg-gradient-to-b from-gray-300 to-gray-500 rounded-sm shadow-md transform rotate-2"></div>
                    <div className="absolute -bottom-2 right-8 w-4 h-6 bg-gradient-to-b from-gray-300 to-gray-500 rounded-sm shadow-md transform -rotate-2"></div>

                    {/* Books on shelf */}
                    <div 
                      className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex justify-center items-end space-x-4 rtl:space-x-reverse"
                      style={{ width: '90%' }}
                    >
                      {shelf.map((book, bookIndex) => {
                        const height = 180 + (bookIndex % 3) * 15;
                        const width = 32 + (bookIndex % 2) * 8;
                        const tilt = (Math.random() - 0.5) * 4;
                        
                        return (
                          <div
                            key={book.id}
                            className={`
                              group cursor-pointer transition-all duration-300 hover:scale-105 hover:-translate-y-2
                              ${getBookColor(shelfIndex * booksPerShelf + bookIndex)}
                              relative overflow-hidden
                            `}
                            style={{
                              width: `${width}px`,
                              height: `${height}px`,
                              borderRadius: '4px 4px 0 0',
                              boxShadow: `
                                4px 0 12px rgba(0,0,0,0.5),
                                8px 0 24px rgba(0,0,0,0.2),
                                inset 0 0 0 1px rgba(255,255,255,0.2),
                                inset 4px 0 0 rgba(255,255,255,0.3),
                                inset -2px 0 0 rgba(0,0,0,0.3)
                              `,
                              transform: `perspective(800px) rotateY(${tilt}deg)`,
                              transformStyle: 'preserve-3d'
                            }}
                          >
                            {/* Book spine details */}
                            <div className="absolute inset-0 p-2 flex flex-col justify-between text-white text-xs">
                              {/* Title on spine */}
                              <div 
                                className="writing-vertical-rl transform rotate-180 text-center font-bold leading-tight overflow-hidden font-vazir"
                                style={{ fontSize: '10px' }}
                              >
                                {book.title.slice(0, 25)}
                              </div>
                              
                              {/* Decorative lines */}
                              <div className="flex flex-col space-y-1 items-center my-2">
                                <div className="w-full h-px bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>
                                <div className="w-3/4 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
                              </div>
                              
                              {/* Author on spine */}
                              <div 
                                className="writing-vertical-rl transform rotate-180 text-center opacity-90 font-vazir"
                                style={{ fontSize: '8px' }}
                              >
                                {book.author.slice(0, 20)}
                              </div>
                            </div>

                            {/* Book spine edge (3D effect) */}
                            <div 
                              className="absolute top-0 right-0 w-2 h-full"
                              style={{ 
                                background: 'linear-gradient(90deg, rgba(255,255,255,0.4) 0%, rgba(0,0,0,0.4) 100%)',
                                transform: 'rotateY(-90deg) translateZ(1px)',
                                transformOrigin: 'right'
                              }}
                            />

                            {/* Book top edge */}
                            <div 
                              className="absolute top-0 left-0 w-full h-2"
                              style={{ 
                                background: 'linear-gradient(180deg, rgba(255,255,255,0.3) 0%, rgba(0,0,0,0.2) 100%)',
                                transform: 'rotateX(90deg) translateZ(1px)',
                                transformOrigin: 'top'
                              }}
                            />

                            {/* Hover tooltip */}
                            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-4 px-3 py-2 bg-black/90 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-50 shadow-xl">
                              <div className="font-bold text-yellow-300 mb-1 font-vazir">{book.title}</div>
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
                          className="bg-gradient-to-r from-gray-300/30 to-gray-400/30 border-2 border-dashed border-gray-400/50"
                          style={{
                            width: '32px',
                            height: '180px',
                            borderRadius: '4px 4px 0 0',
                            boxShadow: '2px 0 6px rgba(0,0,0,0.2)'
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer statistics */}
            <div className="text-center pb-12">
              <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-6 mx-auto max-w-md border border-white/20">
                <h3 className="text-xl font-bold mb-4 text-amber-200 font-vazir">📊 آمار کتابخانه</h3>
                <div className="grid grid-cols-2 gap-4 text-white">
                  <div className="bg-white/10 rounded-xl p-3">
                    <div className="text-2xl font-bold text-blue-300">{books.length}</div>
                    <div className="text-sm font-vazir">کل کتاب‌ها</div>
                  </div>
                  <div className="bg-white/10 rounded-xl p-3">
                    <div className="text-2xl font-bold text-green-300">{shelves.length}</div>
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
