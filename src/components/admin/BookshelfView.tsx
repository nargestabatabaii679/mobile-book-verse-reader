
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

  const getBookColor = (index: number) => {
    const colors = [
      'bg-gradient-to-br from-red-400 via-red-500 to-red-700',
      'bg-gradient-to-br from-blue-400 via-blue-500 to-blue-800', 
      'bg-gradient-to-br from-emerald-400 via-emerald-500 to-emerald-700',
      'bg-gradient-to-br from-amber-400 via-amber-500 to-amber-700',
      'bg-gradient-to-br from-purple-400 via-purple-500 to-purple-800',
      'bg-gradient-to-br from-pink-400 via-pink-500 to-pink-700',
      'bg-gradient-to-br from-indigo-400 via-indigo-500 to-indigo-800',
      'bg-gradient-to-br from-teal-400 via-teal-500 to-teal-700',
      'bg-gradient-to-br from-orange-400 via-orange-500 to-orange-700',
      'bg-gradient-to-br from-cyan-400 via-cyan-500 to-cyan-700'
    ];
    return colors[index % colors.length];
  };

  return (
    <div className="w-full">
      <Card className="overflow-hidden border-none shadow-2xl">
        <CardHeader className="bg-gradient-to-r from-amber-900 via-amber-800 to-amber-900 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform skew-x-12"></div>
          <CardTitle className="text-center text-3xl font-bold relative z-10 font-vazir">
            📚 کتابخانه دیجیتال مدیریتی
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div 
            className="min-h-screen relative overflow-hidden"
            style={{
              background: `
                radial-gradient(circle at 20% 30%, rgba(139, 69, 19, 0.8) 0%, transparent 40%),
                radial-gradient(circle at 80% 70%, rgba(160, 82, 45, 0.6) 0%, transparent 40%),
                radial-gradient(circle at 40% 80%, rgba(101, 67, 33, 0.4) 0%, transparent 30%),
                linear-gradient(135deg, #8B4513 0%, #A0522D 25%, #CD853F 50%, #D2B48C 75%, #F4A460 100%)
              `,
              backgroundSize: '100% 100%, 100% 100%, 100% 100%, 100% 100%'
            }}
          >
            {/* نور محیطی */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-20 left-1/4 w-96 h-96 bg-yellow-300 rounded-full blur-3xl opacity-30"></div>
              <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-orange-200 rounded-full blur-3xl opacity-20"></div>
            </div>

            {/* عنوان با افکت نئون */}
            <div className="text-center py-12 relative z-10">
              <h1 className="text-5xl font-bold text-white drop-shadow-2xl font-vazir relative">
                <span className="absolute inset-0 text-amber-300 blur-sm">کتابخانه دیجیتال پیشرفته</span>
                <span className="relative">کتابخانه دیجیتال پیشرفته</span>
              </h1>
              <div className="mt-4 w-32 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto rounded-full"></div>
            </div>

            {/* قفسه های کتاب */}
            <div className="space-y-20 px-8 pb-16 relative z-10">
              {shelves.map((shelf, shelfIndex) => (
                <div key={shelfIndex} className="relative group">
                  {/* قفسه چوبی پیشرفته */}
                  <div 
                    className="relative mx-auto transform transition-all duration-700 hover:scale-105"
                    style={{
                      width: '95%',
                      height: '280px',
                      background: `
                        linear-gradient(180deg, 
                          #F4E4BC 0%, 
                          #E6D7B8 5%, 
                          #D2B48C 15%, 
                          #CD853F 30%, 
                          #B8860B 60%, 
                          #A0522D 85%, 
                          #8B4513 100%
                        )
                      `,
                      borderRadius: '12px 12px 6px 6px',
                      boxShadow: `
                        0 25px 50px rgba(0,0,0,0.4),
                        0 15px 30px rgba(139, 69, 19, 0.3),
                        inset 0 4px 8px rgba(255,255,255,0.3),
                        inset 0 -4px 8px rgba(0,0,0,0.3),
                        inset 0 0 0 1px rgba(255,255,255,0.1)
                      `,
                      transform: 'perspective(1200px) rotateX(8deg)',
                      transformStyle: 'preserve-3d'
                    }}
                  >
                    {/* رگه های چوب پیشرفته */}
                    <div 
                      className="absolute inset-0 opacity-40 rounded-xl"
                      style={{
                        backgroundImage: `
                          repeating-linear-gradient(
                            90deg,
                            transparent,
                            transparent 15px,
                            rgba(139, 69, 19, 0.2) 16px,
                            rgba(139, 69, 19, 0.2) 18px,
                            transparent 19px,
                            transparent 40px,
                            rgba(101, 67, 33, 0.3) 41px,
                            rgba(101, 67, 33, 0.3) 43px
                          ),
                          repeating-linear-gradient(
                            0deg,
                            transparent,
                            transparent 80px,
                            rgba(160, 82, 45, 0.15) 81px,
                            rgba(160, 82, 45, 0.15) 85px
                          )
                        `
                      }}
                    />
                    
                    {/* پایه قفسه */}
                    <div 
                      className="absolute bottom-0 left-1/2 transform -translate-x-1/2"
                      style={{
                        width: '98%',
                        height: '30px',
                        background: 'linear-gradient(180deg, #A0522D 0%, #8B4513 50%, #654321 100%)',
                        borderRadius: '0 0 12px 12px',
                        boxShadow: `
                          0 8px 20px rgba(0,0,0,0.5),
                          inset 0 2px 4px rgba(255,255,255,0.2)
                        `
                      }}
                    />

                    {/* نگهدارنده های فلزی */}
                    <div className="absolute left-6 top-1/2 transform -translate-y-1/2 w-3 h-12 bg-gradient-to-b from-yellow-300 via-yellow-500 to-yellow-700 rounded-full shadow-xl border border-yellow-600"></div>
                    <div className="absolute right-6 top-1/2 transform -translate-y-1/2 w-3 h-12 bg-gradient-to-b from-yellow-300 via-yellow-500 to-yellow-700 rounded-full shadow-xl border border-yellow-600"></div>

                    {/* کتاب ها */}
                    <div className="absolute top-6 left-1/2 transform -translate-x-1/2 flex justify-center items-end space-x-4 rtl:space-x-reverse h-52">
                      {shelf.map((book, bookIndex) => {
                        const height = 160 + Math.sin(bookIndex) * 25;
                        const rotation = (Math.random() - 0.5) * 8;
                        return (
                          <div
                            key={book.id}
                            className={`
                              group/book cursor-pointer transition-all duration-700 hover:scale-110 hover:-translate-y-4 hover:rotate-0
                              ${getBookColor(shelfIndex * booksPerShelf + bookIndex)}
                              relative overflow-hidden
                            `}
                            style={{
                              width: '70px',
                              height: `${height}px`,
                              borderRadius: '4px 4px 0 0',
                              boxShadow: `
                                4px 0 12px rgba(0,0,0,0.4),
                                8px 0 20px rgba(0,0,0,0.2),
                                inset 0 0 0 1px rgba(255,255,255,0.2),
                                inset 4px 0 0 rgba(255,255,255,0.3),
                                inset -2px 0 0 rgba(0,0,0,0.2)
                              `,
                              transform: `perspective(1000px) rotateY(${rotation}deg) rotateX(2deg)`,
                              transformStyle: 'preserve-3d',
                              transformOrigin: 'bottom center'
                            }}
                          >
                            {/* طلایی کاری روی جلد */}
                            <div className="absolute inset-0 opacity-30">
                              <div className="absolute top-4 left-1 right-1 h-0.5 bg-gradient-to-r from-transparent via-yellow-300 to-transparent"></div>
                              <div className="absolute bottom-4 left-1 right-1 h-0.5 bg-gradient-to-r from-transparent via-yellow-300 to-transparent"></div>
                              <div className="absolute top-8 bottom-8 left-1 w-0.5 bg-gradient-to-b from-transparent via-yellow-300 to-transparent"></div>
                              <div className="absolute top-8 bottom-8 right-1 w-0.5 bg-gradient-to-b from-transparent via-yellow-300 to-transparent"></div>
                            </div>

                            {/* عنوان کتاب */}
                            <div className="absolute inset-3 flex flex-col justify-between items-center text-white">
                              <div className="text-xs font-bold text-center leading-tight overflow-hidden writing-vertical-rl transform rotate-180 font-vazir">
                                {book.title.slice(0, 25)}
                              </div>
                              <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-white/40 to-transparent my-2"></div>
                              <div className="text-xs opacity-80 text-center writing-vertical-rl transform rotate-180 font-vazir">
                                {book.author.slice(0, 20)}
                              </div>
                            </div>

                            {/* جلد سه بعدی */}
                            <div 
                              className="absolute top-0 right-0 w-2 h-full bg-gradient-to-b from-white/40 via-black/20 to-black/40"
                              style={{ 
                                transformOrigin: 'right', 
                                transform: 'rotateY(-90deg) translateZ(1px)',
                                boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.2)'
                              }}
                            />

                            {/* نور انعکاسی */}
                            <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-0 group-hover/book:opacity-100 transition-opacity duration-500"></div>

                            {/* tooltip پیشرفته */}
                            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-4 px-4 py-3 bg-black/90 backdrop-blur-sm text-white text-xs rounded-xl opacity-0 group-hover/book:opacity-100 transition-all duration-300 whitespace-nowrap z-20 border border-white/20">
                              <div className="font-bold text-amber-300 mb-1 font-vazir">{book.title}</div>
                              <div className="text-gray-300 mb-1 font-vazir">{book.author}</div>
                              <div className="text-blue-300 mb-1">📄 {book.pages} صفحه</div>
                              <div className="text-yellow-400">⭐ {book.rating}/5</div>
                              <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-black/90"></div>
                            </div>
                          </div>
                        );
                      })}
                      
                      {/* فضای خالی برای کتاب های بیشتر */}
                      {Array.from({ length: Math.max(0, booksPerShelf - shelf.length) }, (_, index) => (
                        <div
                          key={`empty-${index}`}
                          className="bg-gradient-to-br from-gray-300/20 via-gray-400/20 to-gray-500/20 opacity-40 border-2 border-dashed border-gray-400/30"
                          style={{
                            width: '70px',
                            height: `${140 + Math.random() * 30}px`,
                            borderRadius: '4px 4px 0 0',
                          }}
                        />
                      ))}
                    </div>

                    {/* نور زیرین قفسه */}
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-full h-4 bg-gradient-radial from-amber-200/30 via-amber-100/20 to-transparent blur-sm"></div>
                  </div>
                </div>
              ))}
            </div>

            {/* اطلاعات کلی با طراحی مدرن */}
            <div className="text-center text-white pb-12 relative z-10">
              <div className="bg-black/40 backdrop-blur-lg rounded-2xl p-8 mx-auto max-w-lg border border-white/20 shadow-2xl">
                <h3 className="text-2xl font-bold mb-6 text-amber-300 font-vazir">📊 آمار کتابخانه</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                    <div className="text-3xl font-bold text-blue-400 mb-2">{books.length}</div>
                    <div className="text-sm text-gray-300 font-vazir">کل کتاب‌ها</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                    <div className="text-3xl font-bold text-emerald-400 mb-2">{shelves.length}</div>
                    <div className="text-sm text-gray-300 font-vazir">تعداد قفسه</div>
                  </div>
                </div>
                <div className="mt-4 text-xs text-gray-400 font-vazir">
                  آخرین بروزرسانی: {new Date().toLocaleDateString('fa-IR')}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
