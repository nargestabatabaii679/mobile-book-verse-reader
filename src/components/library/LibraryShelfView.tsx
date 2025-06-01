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
                    className="w-[45px] h-[140px] bg-gray-400/30 rounded-sm animate-pulse"
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
      <div className="text-center py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-cyan-900/20 rounded-3xl blur-xl"></div>
        <div className="relative z-10">
          <div className="text-9xl mb-8 opacity-80 animate-bounce">📚</div>
          <h3 className="text-3xl font-bold text-white mb-4 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            هیچ کتابی یافت نشد
          </h3>
          <p className="text-gray-300 text-xl">
            جستجوی خود را تغییر دهید 🔍
          </p>
        </div>
      </div>
    );
  }

  const getModernBookStyle = (index: number, shelfIndex: number) => {
    const modernColors = [
      {
        spine: 'linear-gradient(145deg, #667eea 0%, #764ba2 50%, #667eea 100%)',
        accent: '#ffffff',
        shadow: 'rgba(102, 126, 234, 0.6)',
        glow: '#667eea'
      },
      {
        spine: 'linear-gradient(145deg, #f093fb 0%, #f5576c 50%, #f093fb 100%)',
        accent: '#ffffff',
        shadow: 'rgba(240, 147, 251, 0.6)',
        glow: '#f093fb'
      },
      {
        spine: 'linear-gradient(145deg, #4facfe 0%, #00f2fe 50%, #4facfe 100%)',
        accent: '#ffffff',
        shadow: 'rgba(79, 172, 254, 0.6)',
        glow: '#4facfe'
      },
      {
        spine: 'linear-gradient(145deg, #a8edea 0%, #fed6e3 50%, #a8edea 100%)',
        accent: '#333333',
        shadow: 'rgba(168, 237, 234, 0.6)',
        glow: '#a8edea'
      },
      {
        spine: 'linear-gradient(145deg, #ff9a9e 0%, #fecfef 50%, #ff9a9e 100%)',
        accent: '#333333',
        shadow: 'rgba(255, 154, 158, 0.6)',
        glow: '#ff9a9e'
      },
      {
        spine: 'linear-gradient(145deg, #a18cd1 0%, #fbc2eb 50%, #a18cd1 100%)',
        accent: '#ffffff',
        shadow: 'rgba(161, 140, 209, 0.6)',
        glow: '#a18cd1'
      }
    ];
    
    return modernColors[(shelfIndex * booksPerShelf + index) % modernColors.length];
  };

  const handleBookSelect = (book: Book, event: React.MouseEvent) => {
    const bookElement = event.currentTarget as HTMLElement;
    
    // Enhanced Gen Z style pickup animation
    bookElement.style.transition = 'all 1.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    bookElement.style.transform = 'perspective(1500px) translateZ(100px) translateY(-60px) rotateX(-20deg) rotateY(25deg) scale(1.2)';
    bookElement.style.zIndex = '1000';
    bookElement.style.filter = 'drop-shadow(0 30px 80px rgba(0,0,0,0.8)) brightness(1.2) saturate(1.4)';
    
    // Particle explosion effect
    const particles = document.createElement('div');
    particles.className = 'absolute inset-0 pointer-events-none';
    particles.innerHTML = Array.from({ length: 12 }, (_, i) => 
      `<div class="absolute w-2 h-2 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full animate-ping" style="
        top: ${Math.random() * 100}%; 
        left: ${Math.random() * 100}%; 
        animation-delay: ${i * 0.05}s;
        animation-duration: 0.8s;
        transform: scale(${0.5 + Math.random()});
      "></div>`
    ).join('');
    bookElement.appendChild(particles);
    
    // Sound effect simulation with visual feedback
    const soundWave = document.createElement('div');
    soundWave.className = 'absolute inset-0 rounded-lg border-4 border-cyan-400/50 animate-ping';
    soundWave.style.animationDuration = '0.6s';
    bookElement.appendChild(soundWave);
    
    setTimeout(() => {
      onSelectBook(book);
      if (particles.parentNode) particles.parentNode.removeChild(particles);
      if (soundWave.parentNode) soundWave.parentNode.removeChild(soundWave);
    }, 600);
  };

  return (
    <div 
      className="min-h-screen relative overflow-hidden"
      style={{
        background: `
          radial-gradient(ellipse at top, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
          radial-gradient(ellipse at bottom, rgba(255, 119, 198, 0.3) 0%, transparent 50%),
          linear-gradient(135deg, 
            #0f0c29 0%, 
            #302b63 25%, 
            #24243e 50%, 
            #2c1810 75%, 
            #1a1a2e 100%
          )
        `
      }}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-cyan-400/10 to-purple-500/10 blur-xl animate-pulse"
            style={{
              width: `${Math.random() * 200 + 50}px`,
              height: `${Math.random() * 200 + 50}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      {/* Floating geometric shapes */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="absolute animate-bounce opacity-20"
            style={{
              top: `${Math.random() * 80 + 10}%`,
              left: `${Math.random() * 80 + 10}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${4 + Math.random() * 2}s`
            }}
          >
            {i % 3 === 0 && <div className="w-4 h-4 bg-gradient-to-r from-cyan-400 to-blue-500 rotate-45"></div>}
            {i % 3 === 1 && <div className="w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full"></div>}
            {i % 3 === 2 && <div className="w-5 h-1 bg-gradient-to-r from-yellow-400 to-orange-500"></div>}
          </div>
        ))}
      </div>
      
      <div className="space-y-32 px-8 pb-16 pt-12 relative z-10">
        {shelves.map((shelf, shelfIndex) => (
          <div key={shelfIndex} className="relative group">
            {/* Futuristic Shelf with holographic effects */}
            <div 
              className="relative mx-auto transition-all duration-1000 hover:scale-105"
              style={{
                width: '90%',
                height: '220px',
                background: `
                  linear-gradient(145deg, 
                    rgba(255, 255, 255, 0.1) 0%, 
                    rgba(255, 255, 255, 0.05) 50%, 
                    rgba(0, 0, 0, 0.1) 100%
                  )
                `,
                borderRadius: '20px',
                boxShadow: `
                  0 25px 60px rgba(0,0,0,0.4),
                  0 15px 35px rgba(120, 119, 198, 0.3),
                  inset 0 2px 4px rgba(255,255,255,0.2),
                  inset 0 -3px 6px rgba(0,0,0,0.3),
                  0 0 40px rgba(120, 119, 198, 0.2)
                `,
                transform: 'perspective(2000px) rotateX(5deg) translateZ(20px)',
                transformStyle: 'preserve-3d',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}
            >
              {/* Holographic shimmer effect */}
              <div 
                className="absolute inset-0 opacity-30 rounded-2xl animate-pulse"
                style={{
                  background: `
                    linear-gradient(
                      45deg,
                      transparent 30%,
                      rgba(120, 119, 198, 0.4) 50%,
                      transparent 70%
                    )
                  `,
                  animation: 'shimmer 3s infinite linear'
                }}
              />
              
              {/* Neon shelf base */}
              <div 
                className="absolute bottom-2 left-1/2 transform -translate-x-1/2"
                style={{
                  width: '94%',
                  height: '24px',
                  background: `
                    linear-gradient(180deg, 
                      rgba(120, 119, 198, 0.6) 0%, 
                      rgba(255, 119, 198, 0.4) 50%, 
                      rgba(120, 119, 198, 0.6) 100%
                    )
                  `,
                  borderRadius: '0 0 16px 16px',
                  boxShadow: `
                    0 10px 25px rgba(120, 119, 198, 0.4),
                    inset 0 2px 4px rgba(255,255,255,0.2),
                    0 0 20px rgba(120, 119, 198, 0.3)
                  `,
                  transform: 'translateZ(-12px)'
                }}
              />

              {/* Futuristic support pillars */}
              <div className="absolute left-12 top-1/2 transform -translate-y-1/2 w-3 h-12 bg-gradient-to-b from-cyan-400 via-purple-500 to-pink-500 rounded-full shadow-lg opacity-80" style={{ transform: 'translateY(-50%) translateZ(12px)', filter: 'drop-shadow(0 0 8px rgba(120, 119, 198, 0.6))' }}></div>
              <div className="absolute right-12 top-1/2 transform -translate-y-1/2 w-3 h-12 bg-gradient-to-b from-cyan-400 via-purple-500 to-pink-500 rounded-full shadow-lg opacity-80" style={{ transform: 'translateY(-50%) translateZ(12px)', filter: 'drop-shadow(0 0 8px rgba(120, 119, 198, 0.6))' }}></div>

              {/* Next-gen Books with enhanced 3D and glow effects */}
              <div className="absolute top-8 left-1/2 transform -translate-x-1/2 flex justify-center items-end space-x-3 rtl:space-x-reverse h-44">
                {shelf.map((book, bookIndex) => {
                  const height = 160 + (bookIndex % 4) * 15;
                  const width = 38 + (bookIndex % 3) * 6;
                  const thickness = 10 + (bookIndex % 2) * 3;
                  const tilt = (Math.random() - 0.5) * 4;
                  const bookStyle = getModernBookStyle(bookIndex, shelfIndex);
                  
                  return (
                    <div
                      key={book.id}
                      className="group/book cursor-pointer transition-all duration-700 hover:scale-110 hover:-translate-y-6 relative"
                      onClick={(e) => handleBookSelect(book, e)}
                      style={{
                        width: `${width}px`,
                        height: `${height}px`,
                        transform: `rotateY(${tilt}deg) perspective(2000px) translateZ(${bookIndex * 4}px)`,
                        transformStyle: 'preserve-3d',
                        filter: 'drop-shadow(0 0 10px rgba(0,0,0,0.3))'
                      }}
                    >
                      {/* Futuristic Book Spine with neon glow */}
                      <div
                        className="relative w-full h-full book-spine transition-all duration-700 hover:brightness-125"
                        style={{
                          background: bookStyle.spine,
                          borderRadius: '4px 4px 2px 2px',
                          boxShadow: `
                            ${thickness}px 0 0 rgba(0,0,0,0.3),
                            ${thickness + 4}px 4px 20px ${bookStyle.shadow},
                            ${thickness + 8}px 8px 40px rgba(0,0,0,0.4),
                            inset 0 0 0 1px rgba(255,255,255,0.2),
                            inset 3px 0 0 rgba(255,255,255,0.3),
                            inset -1px 0 0 rgba(0,0,0,0.4),
                            inset 0 3px 6px rgba(255,255,255,0.2),
                            inset 0 -3px 6px rgba(0,0,0,0.3),
                            0 0 20px ${bookStyle.glow}20
                          `,
                          border: '1px solid rgba(255,255,255,0.2)'
                        }}
                      >
                        {/* Modern book content with improved typography */}
                        <div className="absolute inset-0 p-3 flex flex-col justify-between text-white">
                          {/* Neon top accent */}
                          <div 
                            className="w-full h-2 rounded-full"
                            style={{ 
                              background: `linear-gradient(90deg, transparent, ${bookStyle.glow}, transparent)`,
                              opacity: 0.8,
                              filter: `drop-shadow(0 0 4px ${bookStyle.glow})`
                            }}
                          />
                          
                          {/* Enhanced title text */}
                          <div 
                            className="text-center font-bold leading-tight overflow-hidden flex-1 flex items-center justify-center px-1"
                            style={{ 
                              fontSize: '11px',
                              textShadow: `2px 2px 8px rgba(0,0,0,0.9), 0 0 10px ${bookStyle.glow}`,
                              color: bookStyle.accent,
                              fontWeight: '800',
                              lineHeight: '1.1',
                              letterSpacing: '0.5px'
                            }}
                          >
                            <div className="transform -rotate-90 whitespace-nowrap max-w-full overflow-hidden text-ellipsis">
                              {book.title.slice(0, 28)}
                            </div>
                          </div>
                          
                          {/* Glowing divider */}
                          <div 
                            className="w-full h-px my-2"
                            style={{
                              background: `linear-gradient(90deg, transparent, ${bookStyle.glow}, transparent)`,
                              filter: `drop-shadow(0 0 2px ${bookStyle.glow})`
                            }}
                          ></div>
                          
                          {/* Enhanced author text */}
                          <div 
                            className="text-center opacity-90 flex items-center justify-center px-1"
                            style={{ 
                              fontSize: '9px',
                              textShadow: `2px 2px 6px rgba(0,0,0,0.9), 0 0 8px ${bookStyle.glow}`,
                              color: bookStyle.accent,
                              fontWeight: '600',
                              letterSpacing: '0.3px'
                            }}
                          >
                            <div className="transform -rotate-90 whitespace-nowrap max-w-full overflow-hidden text-ellipsis">
                              {book.author.slice(0, 22)}
                            </div>
                          </div>

                          {/* Neon bottom accent */}
                          <div 
                            className="w-full h-2 rounded-full"
                            style={{ 
                              background: `linear-gradient(90deg, transparent, ${bookStyle.glow}, transparent)`,
                              opacity: 0.6,
                              filter: `drop-shadow(0 0 4px ${bookStyle.glow})`
                            }}
                          />
                        </div>

                        {/* Enhanced 3D edge with holographic effect */}
                        <div 
                          className="absolute top-0 right-0 h-full"
                          style={{ 
                            width: `${thickness}px`,
                            background: `
                              linear-gradient(90deg, 
                                rgba(0,0,0,0.6) 0%, 
                                rgba(255,255,255,0.2) 30%, 
                                ${bookStyle.glow}40 50%,
                                rgba(255,255,255,0.15) 70%,
                                rgba(0,0,0,0.8) 100%
                              )
                            `,
                            transform: 'rotateY(90deg)',
                            transformOrigin: 'left center',
                            borderRadius: '0 4px 2px 0'
                          }}
                        />

                        {/* Holographic top edge */}
                        <div 
                          className="absolute top-0 left-0 w-full"
                          style={{ 
                            height: `${thickness}px`,
                            background: `
                              linear-gradient(180deg, 
                                rgba(255,255,255,0.4) 0%, 
                                ${bookStyle.glow}30 50%,
                                rgba(0,0,0,0.2) 100%
                              )
                            `,
                            transform: 'rotateX(90deg)',
                            transformOrigin: 'bottom center',
                            borderRadius: '4px 4px 0 0'
                          }}
                        />

                        {/* Advanced wear and digital effects */}
                        <div className="absolute inset-0 pointer-events-none">
                          <div className="absolute top-4 right-1 w-1 h-1 bg-white/30 rounded-full blur-sm"></div>
                          <div className="absolute bottom-6 left-1 w-1 h-2 bg-black/20 rounded blur-sm"></div>
                          <div className="absolute top-1/3 left-0 right-0 h-px bg-white/20"></div>
                          <div className="absolute top-2/3 left-0 right-0 h-px bg-black/15"></div>
                        </div>

                        {/* Digital page stack effect */}
                        <div className="absolute right-1 top-3 bottom-3 w-px bg-white/40"></div>
                        <div className="absolute right-2 top-3 bottom-3 w-px bg-white/25"></div>
                        <div className="absolute right-3 top-4 bottom-4 w-px bg-white/15"></div>

                        {/* Pulsing glow on hover */}
                        <div className="absolute inset-0 opacity-0 group-hover/book:opacity-100 transition-all duration-700 pointer-events-none">
                          <div 
                            className="absolute inset-0 rounded-lg animate-pulse"
                            style={{
                              background: `radial-gradient(ellipse at center, ${bookStyle.glow}15 0%, transparent 70%)`,
                              boxShadow: `0 0 30px ${bookStyle.glow}40, inset 0 0 20px ${bookStyle.glow}20`
                            }}
                          />
                        </div>

                        {/* Scan line effect */}
                        <div className="absolute inset-0 overflow-hidden rounded-lg opacity-0 group-hover/book:opacity-60 transition-opacity duration-500">
                          <div 
                            className="absolute w-full h-1 bg-gradient-to-r from-transparent via-white to-transparent"
                            style={{
                              top: '0%',
                              animation: 'scan 2s infinite linear',
                              filter: 'blur(1px)'
                            }}
                          />
                        </div>
                      </div>

                      {/* Next-gen tooltip with glassmorphism */}
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-8 px-5 py-4 bg-black/80 text-white text-sm rounded-2xl opacity-0 group-hover/book:opacity-100 transition-all duration-500 whitespace-nowrap z-50 backdrop-blur-xl border border-white/20">
                        <div className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 mb-2 text-base">{book.title}</div>
                        <div className="text-gray-300 text-sm">{book.author}</div>
                        <div className="text-gray-400 text-xs mt-1 flex items-center gap-2">
                          <span>📚 {book.category}</span>
                          <span>⭐ {book.rating}</span>
                        </div>
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-6 border-transparent border-t-black/80"></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Futuristic shelf label with neon effect */}
            <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-600/90 via-pink-600/90 to-cyan-600/90 text-white px-6 py-3 rounded-2xl text-sm font-bold shadow-2xl backdrop-blur-sm border border-white/20 transition-all duration-500 hover:scale-110">
              <span className="relative z-10">قفسه {shelfIndex + 1}</span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 rounded-2xl blur-sm opacity-50 -z-10"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Futuristic statistics panel */}
      <div className="text-center pb-16 px-8 relative z-10">
        <div className="bg-black/60 backdrop-blur-xl rounded-3xl p-8 mx-auto max-w-2xl border border-white/20 shadow-2xl relative overflow-hidden">
          {/* Animated background gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-pink-600/20 to-cyan-600/20 animate-pulse"></div>
          
          <h3 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 relative z-10">
            📊 آمار کتابخانه هوشمند
          </h3>
          <div className="grid grid-cols-3 gap-6 text-sm relative z-10">
            <div className="bg-gradient-to-br from-blue-600/40 to-cyan-600/40 rounded-2xl p-4 border border-blue-400/30 backdrop-blur-sm hover:scale-105 transition-all duration-300">
              <div className="text-3xl font-bold text-cyan-300 mb-2">{books.length}</div>
              <div className="text-gray-300 font-medium">کل کتاب‌ها</div>
              <div className="text-xs text-cyan-400 mt-1">📚 Digital</div>
            </div>
            <div className="bg-gradient-to-br from-purple-600/40 to-pink-600/40 rounded-2xl p-4 border border-purple-400/30 backdrop-blur-sm hover:scale-105 transition-all duration-300">
              <div className="text-3xl font-bold text-pink-300 mb-2">{shelves.length}</div>
              <div className="text-gray-300 font-medium">تعداد قفسه</div>
              <div className="text-xs text-pink-400 mt-1">🏗️ 3D Shelves</div>
            </div>
            <div className="bg-gradient-to-br from-green-600/40 to-emerald-600/40 rounded-2xl p-4 border border-green-400/30 backdrop-blur-sm hover:scale-105 transition-all duration-300">
              <div className="text-3xl font-bold text-emerald-300 mb-2">{[...new Set(books.map(b => b.category))].length}</div>
              <div className="text-gray-300 font-medium">دسته‌بندی</div>
              <div className="text-xs text-emerald-400 mt-1">🎯 Categories</div>
            </div>
          </div>
        </div>
      </div>

      <style>
        {`
          @keyframes shimmer {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
          @keyframes scan {
            0% { top: 0%; }
            100% { top: 100%; }
          }
        `}
      </style>
    </div>
  );
};
