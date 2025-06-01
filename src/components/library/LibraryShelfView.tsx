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

  const getMinimalBookStyle = (index: number, shelfIndex: number) => {
    // Minimal monochromatic color palette
    const bookColors = [
      {
        spine: 'linear-gradient(180deg, #2D3748 0%, #4A5568 20%, #718096 40%, #4A5568 60%, #2D3748 80%, #1A202C 100%)',
        accent: '#E2E8F0',
        shadow: 'rgba(45, 55, 72, 0.8)'
      },
      {
        spine: 'linear-gradient(180deg, #1A202C 0%, #2D3748 20%, #4A5568 40%, #2D3748 60%, #1A202C 80%, #171923 100%)',
        accent: '#CBD5E0',
        shadow: 'rgba(26, 32, 44, 0.8)'
      },
      {
        spine: 'linear-gradient(180deg, #4A5568 0%, #718096 20%, #A0AEC0 40%, #718096 60%, #4A5568 80%, #2D3748 100%)',
        accent: '#F7FAFC',
        shadow: 'rgba(74, 85, 104, 0.8)'
      },
      {
        spine: 'linear-gradient(180deg, #2C5282 0%, #3182CE 20%, #4299E1 40%, #3182CE 60%, #2C5282 80%, #2A4365 100%)',
        accent: '#EBF8FF',
        shadow: 'rgba(44, 82, 130, 0.8)'
      },
      {
        spine: 'linear-gradient(180deg, #553C9A 0%, #6B46C1 20%, #8B5CF6 40%, #6B46C1 60%, #553C9A 80%, #44337A 100%)',
        accent: '#F3E8FF',
        shadow: 'rgba(85, 60, 154, 0.8)'
      },
      {
        spine: 'linear-gradient(180deg, #065F46 0%, #047857 20%, #10B981 40%, #047857 60%, #065F46 80%, #064E3B 100%)',
        accent: '#ECFDF5',
        shadow: 'rgba(6, 95, 70, 0.8)'
      }
    ];
    
    return bookColors[(shelfIndex * booksPerShelf + index) % bookColors.length];
  };

  const handleBookSelect = (book: Book, event: React.MouseEvent) => {
    const bookElement = event.currentTarget as HTMLElement;
    
    // Enhanced pickup animation
    bookElement.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    bookElement.style.transform = 'perspective(1200px) translateZ(80px) translateY(-40px) rotateX(-15deg) rotateY(15deg) scale(1.1)';
    bookElement.style.zIndex = '1000';
    bookElement.style.filter = 'drop-shadow(0 20px 60px rgba(0,0,0,0.8))';
    
    // Add particle effect
    const particles = document.createElement('div');
    particles.className = 'absolute inset-0 pointer-events-none';
    particles.innerHTML = Array.from({ length: 6 }, (_, i) => 
      `<div class="absolute w-1 h-1 bg-white rounded-full animate-ping" style="
        top: ${20 + i * 15}%; 
        left: ${30 + (i % 3) * 20}%; 
        animation-delay: ${i * 0.1}s;
        animation-duration: 1s;
      "></div>`
    ).join('');
    bookElement.appendChild(particles);
    
    setTimeout(() => {
      onSelectBook(book);
      if (particles.parentNode) {
        particles.parentNode.removeChild(particles);
      }
    }, 400);
  };

  return (
    <div 
      className="min-h-screen relative"
      style={{
        background: `
          linear-gradient(180deg, 
            #D4A574 0%, 
            #B8956A 10%, 
            #9E7B55 20%, 
            #8B6F47 30%, 
            #7A5F3A 40%, 
            #6B512E 50%, 
            #5D4423 60%, 
            #52391C 70%, 
            #472F16 80%, 
            #3E2612 90%, 
            #361F0F 100%
          )
        `
      }}
    >
      {/* Enhanced realistic wood grain texture */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              90deg,
              transparent,
              transparent 2px,
              rgba(101, 67, 33, 0.15) 3px,
              rgba(101, 67, 33, 0.15) 4px,
              transparent 5px,
              transparent 12px
            ),
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 40px,
              rgba(139, 69, 19, 0.1) 41px,
              rgba(139, 69, 19, 0.1) 43px,
              transparent 44px,
              transparent 80px
            ),
            radial-gradient(ellipse 300px 100px at 20% 30%, rgba(160, 82, 45, 0.2) 0%, transparent 70%),
            radial-gradient(ellipse 200px 80px at 80% 70%, rgba(139, 69, 19, 0.15) 0%, transparent 70%),
            radial-gradient(ellipse 250px 60px at 50% 50%, rgba(101, 67, 33, 0.1) 0%, transparent 70%)
          `,
          opacity: 0.8
        }}
      />

      {/* Atmospheric lighting effects */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 70% 40% at 50% 0%, rgba(255, 248, 220, 0.15) 0%, transparent 60%),
            linear-gradient(180deg, rgba(245, 222, 179, 0.1) 0%, rgba(139, 69, 19, 0.05) 100%)
          `
        }}
      />
      
      <div className="space-y-24 px-12 pb-16 pt-8 relative">
        {shelves.map((shelf, shelfIndex) => (
          <div key={shelfIndex} className="relative">
            {/* Minimalist Wooden Shelf with enhanced 3D depth */}
            <div 
              className="relative mx-auto group"
              style={{
                width: '88%',
                height: '200px',
                background: `
                  linear-gradient(180deg, 
                    #E6C29A 0%, 
                    #D4A574 15%, 
                    #C2956A 30%, 
                    #B08660 45%, 
                    #9E7756 60%, 
                    #8C684C 75%, 
                    #7A5942 90%, 
                    #684A38 100%
                  )
                `,
                borderRadius: '8px',
                boxShadow: `
                  0 25px 50px rgba(0,0,0,0.4),
                  0 15px 25px rgba(104, 74, 56, 0.3),
                  0 8px 15px rgba(0,0,0,0.2),
                  inset 0 2px 4px rgba(255,255,255,0.3),
                  inset 0 -3px 6px rgba(0,0,0,0.3),
                  inset 2px 0 4px rgba(255,255,255,0.2),
                  inset -2px 0 4px rgba(0,0,0,0.2)
                `,
                transform: 'perspective(2000px) rotateX(8deg) translateZ(15px)',
                transformStyle: 'preserve-3d'
              }}
            >
              {/* Subtle wood grain */}
              <div 
                className="absolute inset-0 opacity-25 rounded-lg"
                style={{
                  backgroundImage: `
                    repeating-linear-gradient(
                      90deg,
                      transparent,
                      transparent 8px,
                      rgba(104, 74, 56, 0.4) 9px,
                      rgba(104, 74, 56, 0.4) 10px,
                      transparent 11px,
                      transparent 18px
                    )
                  `
                }}
              />
              
              {/* Clean shelf base */}
              <div 
                className="absolute bottom-0 left-1/2 transform -translate-x-1/2"
                style={{
                  width: '96%',
                  height: '20px',
                  background: `
                    linear-gradient(180deg, 
                      #8C684C 0%, 
                      #7A5942 50%, 
                      #684A38 100%
                    )
                  `,
                  borderRadius: '0 0 8px 8px',
                  boxShadow: `
                    0 8px 16px rgba(0,0,0,0.4),
                    inset 0 1px 2px rgba(255,255,255,0.2),
                    inset 0 -1px 2px rgba(0,0,0,0.4)
                  `,
                  transform: 'translateZ(-8px)'
                }}
              />

              {/* Minimalist metal brackets */}
              <div className="absolute left-8 top-1/2 transform -translate-y-1/2 w-2 h-8 bg-gradient-to-b from-silver via-gray-400 to-gray-600 rounded-sm shadow-lg" style={{ transform: 'translateY(-50%) translateZ(8px)' }}></div>
              <div className="absolute right-8 top-1/2 transform -translate-y-1/2 w-2 h-8 bg-gradient-to-b from-silver via-gray-400 to-gray-600 rounded-sm shadow-lg" style={{ transform: 'translateY(-50%) translateZ(8px)' }}></div>

              {/* Enhanced Books with premium 3D effects */}
              <div className="absolute top-4 left-1/2 transform -translate-x-1/2 flex justify-center items-end space-x-2 rtl:space-x-reverse h-40">
                {shelf.map((book, bookIndex) => {
                  const height = 140 + (bookIndex % 4) * 12;
                  const width = 32 + (bookIndex % 3) * 4;
                  const thickness = 8 + (bookIndex % 2) * 2;
                  const tilt = (Math.random() - 0.5) * 3;
                  const bookStyle = getMinimalBookStyle(bookIndex, shelfIndex);
                  
                  return (
                    <div
                      key={book.id}
                      className="group/book cursor-pointer transition-all duration-300 hover:scale-105 hover:-translate-y-3 relative"
                      onClick={(e) => handleBookSelect(book, e)}
                      style={{
                        width: `${width}px`,
                        height: `${height}px`,
                        transform: `rotateY(${tilt}deg) perspective(1500px) translateZ(${bookIndex * 3}px)`,
                        transformStyle: 'preserve-3d'
                      }}
                    >
                      {/* Premium Book Spine */}
                      <div
                        className="relative w-full h-full book-spine"
                        style={{
                          background: bookStyle.spine,
                          borderRadius: '3px 3px 0 0',
                          boxShadow: `
                            ${thickness}px 0 0 rgba(0,0,0,0.4),
                            ${thickness + 3}px 3px 12px ${bookStyle.shadow},
                            ${thickness + 6}px 6px 24px rgba(0,0,0,0.5),
                            inset 0 0 0 1px rgba(255,255,255,0.15),
                            inset 2px 0 0 rgba(255,255,255,0.25),
                            inset -1px 0 0 rgba(0,0,0,0.4),
                            inset 0 2px 4px rgba(255,255,255,0.2),
                            inset 0 -2px 4px rgba(0,0,0,0.3)
                          `,
                          border: '1px solid rgba(255,255,255,0.1)',
                          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                        }}
                      >
                        {/* Clean book content */}
                        <div className="absolute inset-0 p-2 flex flex-col justify-between text-white">
                          {/* Minimal top accent */}
                          <div 
                            className="w-full h-1 rounded-full"
                            style={{ 
                              background: `linear-gradient(90deg, transparent, ${bookStyle.accent}, transparent)`,
                              opacity: 0.6
                            }}
                          />
                          
                          {/* Clean title text */}
                          <div 
                            className="text-center font-medium leading-tight overflow-hidden flex-1 flex items-center justify-center"
                            style={{ 
                              fontSize: '8px',
                              textShadow: '1px 1px 2px rgba(0,0,0,0.8)',
                              color: bookStyle.accent,
                              writingMode: 'vertical-rl',
                              textOrientation: 'mixed',
                              transform: 'rotate(180deg)'
                            }}
                          >
                            {book.title.slice(0, 35)}
                          </div>
                          
                          {/* Simple divider */}
                          <div className="w-full h-px bg-white/30 my-1"></div>
                          
                          {/* Author text */}
                          <div 
                            className="text-center opacity-70"
                            style={{ 
                              fontSize: '7px',
                              textShadow: '1px 1px 2px rgba(0,0,0,0.8)',
                              writingMode: 'vertical-rl',
                              textOrientation: 'mixed',
                              transform: 'rotate(180deg)',
                              color: bookStyle.accent
                            }}
                          >
                            {book.author.slice(0, 25)}
                          </div>

                          {/* Minimal bottom accent */}
                          <div 
                            className="w-full h-1 rounded-full"
                            style={{ 
                              background: `linear-gradient(90deg, transparent, ${bookStyle.accent}, transparent)`,
                              opacity: 0.4
                            }}
                          />
                        </div>

                        {/* Premium 3D edge */}
                        <div 
                          className="absolute top-0 right-0 h-full"
                          style={{ 
                            width: `${thickness}px`,
                            background: `
                              linear-gradient(90deg, 
                                rgba(0,0,0,0.5) 0%, 
                                rgba(255,255,255,0.15) 40%, 
                                rgba(0,0,0,0.3) 70%,
                                rgba(0,0,0,0.7) 100%
                              )
                            `,
                            transform: 'rotateY(90deg)',
                            transformOrigin: 'left center',
                            borderRadius: '0 3px 0 0'
                          }}
                        />

                        {/* Clean top edge */}
                        <div 
                          className="absolute top-0 left-0 w-full"
                          style={{ 
                            height: `${thickness}px`,
                            background: `
                              linear-gradient(180deg, 
                                rgba(255,255,255,0.3) 0%, 
                                rgba(0,0,0,0.2) 100%
                              )
                            `,
                            transform: 'rotateX(90deg)',
                            transformOrigin: 'bottom center',
                            borderRadius: '3px 3px 0 0'
                          }}
                        />

                        {/* Subtle wear effects */}
                        <div className="absolute inset-0 pointer-events-none">
                          <div className="absolute top-3 right-1 w-1 h-1 bg-black/15 rounded-full blur-sm"></div>
                          <div className="absolute bottom-4 left-1 w-1 h-2 bg-black/10 rounded blur-sm"></div>
                          <div className="absolute top-1/3 left-0 right-0 h-px bg-black/15"></div>
                          <div className="absolute top-2/3 left-0 right-0 h-px bg-black/10"></div>
                        </div>

                        {/* Premium page stack */}
                        <div className="absolute right-1 top-2 bottom-2 w-px bg-white/30"></div>
                        <div className="absolute right-2 top-2 bottom-2 w-px bg-white/20"></div>

                        {/* Enhanced glow on hover */}
                        <div className="absolute inset-0 opacity-0 group-hover/book:opacity-100 transition-opacity duration-300 pointer-events-none">
                          <div 
                            className="absolute inset-0 rounded-lg"
                            style={{
                              background: `radial-gradient(ellipse at center, ${bookStyle.accent}10 0%, transparent 60%)`,
                              boxShadow: `0 0 15px ${bookStyle.accent}20`
                            }}
                          />
                        </div>
                      </div>

                      {/* Premium tooltip */}
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-6 px-4 py-3 bg-black/95 text-white text-xs rounded-lg opacity-0 group-hover/book:opacity-100 transition-all duration-300 whitespace-nowrap z-50 backdrop-blur-sm border border-gray-600">
                        <div className="font-semibold text-blue-300 mb-1">{book.title}</div>
                        <div className="text-gray-300">{book.author}</div>
                        <div className="text-gray-400 text-xs mt-1">{book.category}</div>
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-black"></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Clean shelf label */}
            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-amber-800/90 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg backdrop-blur-sm">
              قفسه {shelfIndex + 1}
            </div>
          </div>
        ))}
      </div>

      {/* Clean statistics */}
      <div className="text-center pb-12 px-8">
        <div className="bg-black/70 backdrop-blur-lg rounded-2xl p-6 mx-auto max-w-lg border border-gray-600/50 shadow-2xl">
          <h3 className="text-xl font-bold mb-4 text-white">📊 آمار کتابخانه</h3>
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div className="bg-white/10 rounded-xl p-3">
              <div className="text-2xl font-bold text-blue-300">{books.length}</div>
              <div className="text-gray-300">کل کتاب‌ها</div>
            </div>
            <div className="bg-white/10 rounded-xl p-3">
              <div className="text-2xl font-bold text-emerald-300">{shelves.length}</div>
              <div className="text-gray-300">تعداد قفسه</div>
            </div>
            <div className="bg-white/10 rounded-xl p-3">
              <div className="text-2xl font-bold text-amber-300">{[...new Set(books.map(b => b.category))].length}</div>
              <div className="text-gray-300">دسته‌بندی</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
