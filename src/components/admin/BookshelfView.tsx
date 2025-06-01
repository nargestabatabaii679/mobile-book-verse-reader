
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
                radial-gradient(circle at 25% 25%, rgba(139, 69, 19, 0.9) 0%, transparent 50%),
                radial-gradient(circle at 75% 75%, rgba(160, 82, 45, 0.7) 0%, transparent 50%),
                radial-gradient(circle at 50% 10%, rgba(218, 165, 32, 0.5) 0%, transparent 40%),
                linear-gradient(145deg, #654321 0%, #8B4513 25%, #A0522D 50%, #CD853F 75%, #DEB887 100%)
              `,
              backgroundSize: '100% 100%, 100% 100%, 100% 100%, 100% 100%',
              perspective: '2000px'
            }}
          >
            {/* نور محیطی پیشرفته */}
            <div className="absolute inset-0 opacity-30">
              <div className="absolute top-20 left-1/4 w-96 h-96 bg-yellow-400 rounded-full blur-3xl opacity-40 animate-pulse"></div>
              <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-orange-300 rounded-full blur-3xl opacity-30"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-amber-200 rounded-full blur-2xl opacity-20"></div>
            </div>

            {/* عنوان با افکت نئون پیشرفته */}
            <div className="text-center py-16 relative z-10">
              <h1 className="text-6xl font-bold text-white drop-shadow-2xl font-vazir relative transform hover:scale-105 transition-transform duration-500">
                <span className="absolute inset-0 text-amber-300 blur-md opacity-80">کتابخانه دیجیتال سه‌بعدی</span>
                <span className="absolute inset-0 text-yellow-200 blur-sm opacity-60">کتابخانه دیجیتال سه‌بعدی</span>
                <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-200">کتابخانه دیجیتال سه‌بعدی</span>
              </h1>
              <div className="mt-6 w-40 h-2 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto rounded-full shadow-lg"></div>
              <div className="mt-2 w-24 h-1 bg-gradient-to-r from-transparent via-yellow-300 to-transparent mx-auto rounded-full"></div>
            </div>

            {/* قفسه های کتاب پیشرفته */}
            <div className="space-y-24 px-8 pb-20 relative z-10">
              {shelves.map((shelf, shelfIndex) => (
                <div key={shelfIndex} className="relative group perspective-[2000px]">
                  {/* قفسه چوبی پیشرفته با عمق واقعی */}
                  <div 
                    className="relative mx-auto transform transition-all duration-1000 hover:scale-[1.02] hover:-translate-y-2"
                    style={{
                      width: '92%',
                      height: '320px',
                      background: `
                        linear-gradient(180deg, 
                          #F5E6D3 0%, 
                          #E8D5C4 3%, 
                          #DBC5A8 8%, 
                          #CD853F 20%, 
                          #B8860B 40%, 
                          #A0522D 70%, 
                          #8B4513 90%, 
                          #654321 100%
                        )
                      `,
                      borderRadius: '15px 15px 8px 8px',
                      boxShadow: `
                        0 35px 80px rgba(0,0,0,0.6),
                        0 25px 50px rgba(139, 69, 19, 0.4),
                        0 15px 30px rgba(101, 67, 33, 0.3),
                        inset 0 6px 12px rgba(255,255,255,0.4),
                        inset 0 -6px 12px rgba(0,0,0,0.4),
                        inset 0 0 0 2px rgba(255,255,255,0.15),
                        inset 0 0 0 4px rgba(139, 69, 19, 0.2)
                      `,
                      transform: 'perspective(2000px) rotateX(12deg) rotateY(2deg)',
                      transformStyle: 'preserve-3d'
                    }}
                  >
                    {/* رگه های چوب بسیار پیشرفته */}
                    <div 
                      className="absolute inset-0 opacity-50 rounded-xl"
                      style={{
                        backgroundImage: `
                          repeating-linear-gradient(
                            88deg,
                            transparent,
                            transparent 12px,
                            rgba(139, 69, 19, 0.25) 13px,
                            rgba(139, 69, 19, 0.25) 15px,
                            transparent 16px,
                            transparent 35px,
                            rgba(101, 67, 33, 0.35) 36px,
                            rgba(101, 67, 33, 0.35) 38px,
                            transparent 39px,
                            transparent 65px,
                            rgba(160, 82, 45, 0.2) 66px,
                            rgba(160, 82, 45, 0.2) 68px
                          ),
                          repeating-linear-gradient(
                            2deg,
                            transparent,
                            transparent 70px,
                            rgba(160, 82, 45, 0.18) 71px,
                            rgba(160, 82, 45, 0.18) 76px,
                            transparent 77px,
                            transparent 120px,
                            rgba(139, 69, 19, 0.12) 121px,
                            rgba(139, 69, 19, 0.12) 125px
                          ),
                          radial-gradient(ellipse at 30% 40%, rgba(101, 67, 33, 0.3) 0%, transparent 60%),
                          radial-gradient(ellipse at 80% 70%, rgba(160, 82, 45, 0.2) 0%, transparent 50%)
                        `
                      }}
                    />
                    
                    {/* پایه قفسه پیشرفته */}
                    <div 
                      className="absolute bottom-0 left-1/2 transform -translate-x-1/2"
                      style={{
                        width: '100%',
                        height: '40px',
                        background: `
                          linear-gradient(180deg, 
                            #A0522D 0%, 
                            #8B4513 30%, 
                            #654321 60%, 
                            #4A3018 85%, 
                            #2F1F0F 100%
                          )
                        `,
                        borderRadius: '0 0 15px 15px',
                        boxShadow: `
                          0 12px 30px rgba(0,0,0,0.7),
                          0 6px 15px rgba(0,0,0,0.5),
                          inset 0 3px 6px rgba(255,255,255,0.25),
                          inset 0 -2px 4px rgba(0,0,0,0.3)
                        `,
                        transform: 'perspective(1000px) rotateX(-5deg)'
                      }}
                    />

                    {/* لبه های فلزی طلایی */}
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-16 bg-gradient-to-b from-yellow-200 via-yellow-400 to-yellow-600 rounded-full shadow-xl border-2 border-yellow-500 opacity-90"></div>
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 w-4 h-16 bg-gradient-to-b from-yellow-200 via-yellow-400 to-yellow-600 rounded-full shadow-xl border-2 border-yellow-500 opacity-90"></div>

                    {/* کتاب ها */}
                    <div className="absolute top-8 left-1/2 transform -translate-x-1/2 flex justify-center items-end space-x-6 rtl:space-x-reverse h-60">
                      {shelf.map((book, bookIndex) => {
                        const height = 180 + Math.sin(bookIndex * 1.5) * 30;
                        const rotation = (Math.random() - 0.5) * 12;
                        const tilt = (Math.random() - 0.5) * 8;
                        return (
                          <div
                            key={book.id}
                            className={`
                              group/book cursor-pointer transition-all duration-1000 hover:scale-110 hover:-translate-y-6 hover:rotate-0 hover:z-50
                              ${getBookColor(shelfIndex * booksPerShelf + bookIndex)}
                              relative overflow-hidden
                            `}
                            style={{
                              width: '80px',
                              height: `${height}px`,
                              borderRadius: '6px 6px 0 0',
                              boxShadow: `
                                6px 0 20px rgba(0,0,0,0.6),
                                12px 0 35px rgba(0,0,0,0.3),
                                18px 0 50px rgba(0,0,0,0.1),
                                inset 0 0 0 2px rgba(255,255,255,0.25),
                                inset 6px 0 0 rgba(255,255,255,0.4),
                                inset -3px 0 0 rgba(0,0,0,0.25),
                                inset 0 3px 6px rgba(255,255,255,0.2),
                                inset 0 -3px 6px rgba(0,0,0,0.2)
                              `,
                              transform: `perspective(1200px) rotateY(${rotation}deg) rotateX(${tilt}deg) rotateZ(${rotation * 0.3}deg)`,
                              transformStyle: 'preserve-3d',
                              transformOrigin: 'bottom center'
                            }}
                          >
                            {/* طلایی کاری پیشرفته روی جلد */}
                            <div className="absolute inset-0 opacity-40">
                              <div className="absolute top-6 left-2 right-2 h-1 bg-gradient-to-r from-transparent via-yellow-300 to-transparent rounded-full shadow-sm"></div>
                              <div className="absolute bottom-6 left-2 right-2 h-1 bg-gradient-to-r from-transparent via-yellow-300 to-transparent rounded-full shadow-sm"></div>
                              <div className="absolute top-12 bottom-12 left-2 w-1 bg-gradient-to-b from-transparent via-yellow-300 to-transparent rounded-full shadow-sm"></div>
                              <div className="absolute top-12 bottom-12 right-2 w-1 bg-gradient-to-b from-transparent via-yellow-300 to-transparent rounded-full shadow-sm"></div>
                              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 border-2 border-yellow-300 rounded-full opacity-60"></div>
                            </div>

                            {/* عنوان کتاب */}
                            <div className="absolute inset-4 flex flex-col justify-between items-center text-white">
                              <div className="text-xs font-bold text-center leading-tight overflow-hidden writing-vertical-rl transform rotate-180 font-vazir drop-shadow-lg">
                                {book.title.slice(0, 30)}
                              </div>
                              <div className="w-full h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent my-3 rounded-full"></div>
                              <div className="text-xs opacity-90 text-center writing-vertical-rl transform rotate-180 font-vazir drop-shadow-md">
                                {book.author.slice(0, 25)}
                              </div>
                            </div>

                            {/* جلد سه بعدی با عمق واقعی */}
                            <div 
                              className="absolute top-0 right-0 w-3 h-full"
                              style={{ 
                                background: 'linear-gradient(90deg, rgba(255,255,255,0.5) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.6) 100%)',
                                transformOrigin: 'right', 
                                transform: 'rotateY(-90deg) translateZ(2px)',
                                boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.3), inset 2px 0 4px rgba(0,0,0,0.4)'
                              }}
                            />

                            {/* پشت کتاب */}
                            <div 
                              className="absolute top-0 left-0 w-full h-full opacity-70"
                              style={{ 
                                background: 'linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.6) 100%)',
                                transform: 'translateZ(-3px)',
                                borderRadius: '6px 6px 0 0'
                              }}
                            />

                            {/* نور انعکاسی دینامیک */}
                            <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-transparent opacity-0 group-hover/book:opacity-100 transition-all duration-700 rounded-t-md"></div>
                            <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-white/20 to-transparent opacity-0 group-hover/book:opacity-100 transition-all duration-500 rounded-t-md"></div>

                            {/* tooltip فوق‌العاده پیشرفته */}
                            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-6 px-6 py-4 bg-black/95 backdrop-blur-md text-white text-sm rounded-2xl opacity-0 group-hover/book:opacity-100 transition-all duration-500 whitespace-nowrap z-30 border border-white/30 shadow-2xl">
                              <div className="font-bold text-amber-300 mb-2 font-vazir text-base">{book.title}</div>
                              <div className="text-gray-300 mb-2 font-vazir">{book.author}</div>
                              <div className="text-blue-300 mb-1">📄 {book.pages} صفحه</div>
                              <div className="text-yellow-400 mb-1">⭐ {book.rating}/5</div>
                              <div className="text-green-300">📚 {book.category}</div>
                              <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-8 border-transparent border-t-black/95"></div>
                              <div className="absolute -top-1 -left-1 -right-1 -bottom-1 bg-gradient-to-r from-amber-400/20 via-transparent to-amber-400/20 rounded-2xl -z-10"></div>
                            </div>
                          </div>
                        );
                      })}
                      
                      {/* فضای خالی برای کتاب های بیشتر */}
                      {Array.from({ length: Math.max(0, booksPerShelf - shelf.length) }, (_, index) => (
                        <div
                          key={`empty-${index}`}
                          className="bg-gradient-to-br from-gray-400/20 via-gray-500/20 to-gray-600/20 opacity-30 border-2 border-dashed border-gray-400/40 backdrop-blur-sm"
                          style={{
                            width: '80px',
                            height: `${160 + Math.random() * 40}px`,
                            borderRadius: '6px 6px 0 0',
                            boxShadow: '0 8px 20px rgba(0,0,0,0.2), inset 0 2px 4px rgba(255,255,255,0.1)'
                          }}
                        />
                      ))}
                    </div>

                    {/* نور زیرین قفسه پیشرفته */}
                    <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-full h-8 bg-gradient-radial from-amber-300/40 via-amber-200/30 to-transparent blur-md opacity-80"></div>
                    <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-3/4 h-6 bg-gradient-radial from-yellow-400/30 via-orange-300/20 to-transparent blur-lg opacity-60"></div>
                  </div>
                </div>
              ))}
            </div>

            {/* اطلاعات کلی با طراحی فوق‌العاده مدرن */}
            <div className="text-center text-white pb-16 relative z-10">
              <div className="bg-black/50 backdrop-blur-xl rounded-3xl p-10 mx-auto max-w-2xl border border-white/30 shadow-2xl transform hover:scale-105 transition-all duration-500">
                <h3 className="text-3xl font-bold mb-8 text-amber-300 font-vazir drop-shadow-lg">📊 آمار کتابخانه سه‌بعدی</h3>
                <div className="grid grid-cols-2 gap-8">
                  <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-6 border border-white/30 transform hover:scale-105 transition-all duration-300 shadow-xl">
                    <div className="text-4xl font-bold text-blue-400 mb-3 drop-shadow-lg">{books.length}</div>
                    <div className="text-base text-gray-300 font-vazir">کل کتاب‌ها</div>
                  </div>
                  <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-6 border border-white/30 transform hover:scale-105 transition-all duration-300 shadow-xl">
                    <div className="text-4xl font-bold text-emerald-400 mb-3 drop-shadow-lg">{shelves.length}</div>
                    <div className="text-base text-gray-300 font-vazir">تعداد قفسه</div>
                  </div>
                </div>
                <div className="mt-6 p-4 bg-white/10 rounded-xl border border-white/20">
                  <div className="text-sm text-gray-400 font-vazir">
                    آخرین بروزرسانی: {new Date().toLocaleDateString('fa-IR')}
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
