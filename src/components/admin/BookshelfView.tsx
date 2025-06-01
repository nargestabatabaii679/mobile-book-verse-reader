
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
      'bg-gradient-to-b from-red-500 to-red-700',
      'bg-gradient-to-b from-blue-500 to-blue-700', 
      'bg-gradient-to-b from-green-500 to-green-700',
      'bg-gradient-to-b from-yellow-500 to-yellow-700',
      'bg-gradient-to-b from-purple-500 to-purple-700',
      'bg-gradient-to-b from-pink-500 to-pink-700',
      'bg-gradient-to-b from-indigo-500 to-indigo-700',
      'bg-gradient-to-b from-teal-500 to-teal-700'
    ];
    return colors[index % colors.length];
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-amber-800 to-amber-900 text-white">
        <CardTitle className="text-center text-2xl font-bold">
          🏛️ قفسه کتابخانه دیجیتال
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div 
          className="min-h-screen relative"
          style={{
            background: 'linear-gradient(180deg, #8B4513 0%, #A0522D 50%, #8B4513 100%)',
            backgroundImage: `
              radial-gradient(circle at 20% 50%, rgba(139, 69, 19, 0.3) 0%, transparent 50%),
              radial-gradient(circle at 80% 50%, rgba(160, 82, 45, 0.3) 0%, transparent 50%),
              linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.1) 50%, transparent 100%)
            `
          }}
        >
          {/* عنوان */}
          <div className="text-center py-8">
            <h1 className="text-4xl font-bold text-white drop-shadow-lg">
              نرم افزار کتابخانه دیجیتال
            </h1>
          </div>

          {/* قفسه های کتاب */}
          <div className="space-y-16 px-8 pb-16">
            {shelves.map((shelf, shelfIndex) => (
              <div key={shelfIndex} className="relative">
                {/* قفسه چوبی */}
                <div 
                  className="relative mx-auto"
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
                    className="absolute inset-0 opacity-20"
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
                  <div className="absolute top-4 left-1/2 transform -translate-x-1/2 flex justify-center items-end space-x-2 rtl:space-x-reverse h-40">
                    {shelf.map((book, bookIndex) => (
                      <div
                        key={book.id}
                        className={`
                          group cursor-pointer transition-all duration-500 hover:scale-105 hover:-translate-y-2
                          ${getBookColor(shelfIndex * booksPerShelf + bookIndex)}
                        `}
                        style={{
                          width: '60px',
                          height: `${120 + Math.random() * 20}px`,
                          borderRadius: '2px 2px 0 0',
                          boxShadow: `
                            2px 0 8px rgba(0,0,0,0.3),
                            inset 0 0 0 1px rgba(255,255,255,0.1),
                            inset 2px 0 0 rgba(255,255,255,0.2)
                          `,
                          transform: `perspective(800px) rotateY(${Math.random() * 6 - 3}deg)`,
                          transformStyle: 'preserve-3d'
                        }}
                      >
                        {/* عنوان کتاب */}
                        <div className="absolute inset-2 flex flex-col justify-between">
                          <div className="text-white text-xs font-bold writing-vertical-rl text-center leading-tight overflow-hidden">
                            {book.title.slice(0, 20)}
                          </div>
                          <div className="text-white text-xs opacity-75 writing-vertical-rl text-center">
                            {book.author.slice(0, 15)}
                          </div>
                        </div>

                        {/* جلد کتاب */}
                        <div 
                          className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-white/30 to-black/30"
                          style={{ transformOrigin: 'right', transform: 'rotateY(-90deg)' }}
                        />

                        {/* tooltip */}
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-black/80 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                          <div className="font-bold">{book.title}</div>
                          <div className="text-gray-300">{book.author}</div>
                          <div className="text-yellow-400">⭐ {book.rating}</div>
                        </div>
                      </div>
                    ))}
                    
                    {/* کتاب های خالی برای تکمیل قفسه */}
                    {Array.from({ length: booksPerShelf - shelf.length }, (_, index) => (
                      <div
                        key={`empty-${index}`}
                        className="bg-gradient-to-b from-gray-200 to-gray-400 opacity-30"
                        style={{
                          width: '60px',
                          height: `${120 + Math.random() * 20}px`,
                          borderRadius: '2px 2px 0 0',
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* اطلاعات کلی */}
          <div className="text-center text-white pb-8">
            <div className="bg-black/30 backdrop-blur-sm rounded-lg p-6 mx-auto max-w-md">
              <h3 className="text-xl font-bold mb-4">آمار کتابخانه</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-2xl font-bold text-yellow-400">{books.length}</div>
                  <div>کل کتاب‌ها</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-400">{shelves.length}</div>
                  <div>تعداد قفسه</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
