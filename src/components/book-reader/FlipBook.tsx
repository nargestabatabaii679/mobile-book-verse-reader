import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Volume2, VolumeX } from 'lucide-react';
import { audioManager } from '@/utils/audioUtils';

interface FlipBookProps {
  pages: string[];
  width?: number;
  height?: number;
}

const FlipBook: React.FC<FlipBookProps> = ({ pages, width = 400, height = 550 }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipDirection, setFlipDirection] = useState<'left' | 'right' | null>(null);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isBookOpen, setIsBookOpen] = useState(false);
  const [isHovering, setIsHovering] = useState<'left' | 'right' | null>(null);

  // Calculate realistic book dimensions (A5 format - 148 x 210 mm scaled up)
  const bookWidth = Math.min(width, window.innerWidth * 0.8);
  const bookHeight = Math.min(height, window.innerHeight * 0.7);
  const realBookRatio = 1.414; // A5 ratio (height/width)
  
  const finalWidth = Math.min(bookWidth, bookHeight / realBookRatio);
  const finalHeight = finalWidth * realBookRatio;

  useEffect(() => {
    // Book opening animation and sound
    setTimeout(() => {
      setIsBookOpen(true);
      audioManager.playBookOpenSound();
    }, 500);
  }, []);

  useEffect(() => {
    audioManager.setSoundEnabled(soundEnabled);
  }, [soundEnabled]);

  const nextPage = () => {
    if (currentPage < pages.length - 1 && !isFlipping) {
      setIsFlipping(true);
      setFlipDirection('right');
      audioManager.playPageFlipSound();
      
      setTimeout(() => {
        setCurrentPage(currentPage + 1);
      }, 600);

      setTimeout(() => {
        setIsFlipping(false);
        setFlipDirection(null);
      }, 1200);
    }
  };

  const prevPage = () => {
    if (currentPage > 0 && !isFlipping) {
      setIsFlipping(true);
      setFlipDirection('left');
      audioManager.playPageFlipSound();
      
      setTimeout(() => {
        setCurrentPage(currentPage - 1);
      }, 600);

      setTimeout(() => {
        setIsFlipping(false);
        setFlipDirection(null);
      }, 1200);
    }
  };

  const getPageContent = (pageIndex: number) => {
    if (pageIndex < 0 || pageIndex >= pages.length) return '';
    return pages[pageIndex];
  };

  return (
    <div className="flex flex-col items-center p-4">
      {/* Realistic Book Container */}
      <div 
        className={`relative transition-all duration-1000 ${isBookOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
        style={{ 
          width: `${finalWidth * 2}px`, // Double width for open book
          height: `${finalHeight}px`,
          perspective: '2000px',
          transformStyle: 'preserve-3d'
        }}
      >
        {/* Realistic Book Base/Spine */}
        <div 
          className="absolute left-1/2 top-0 bottom-0 z-20 transform -translate-x-1/2"
          style={{
            width: '8px',
            background: 'linear-gradient(90deg, #654321 0%, #8B4513 20%, #A0522D 50%, #8B4513 80%, #654321 100%)',
            boxShadow: 'inset 0 0 8px rgba(0,0,0,0.7), 0 0 15px rgba(0,0,0,0.4)',
            borderRadius: '3px'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-black/40 rounded"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-0.5 h-8 bg-amber-400/70 rounded-full"></div>
        </div>

        {/* Left Page */}
        <div 
          className={`absolute top-0 left-0 w-1/2 h-full transition-all duration-1200 cursor-pointer group ${
            isFlipping && flipDirection === 'left' ? 'animate-gentle-flip-left' : ''
          }`}
          style={{
            transformOrigin: 'right center',
            transformStyle: 'preserve-3d',
            zIndex: isFlipping && flipDirection === 'left' ? 30 : 10
          }}
          onClick={prevPage}
          onMouseEnter={() => setIsHovering('left')}
          onMouseLeave={() => setIsHovering(null)}
        >
          <div 
            className="w-full h-full bg-gradient-to-r from-white to-gray-50 shadow-2xl relative overflow-hidden group-hover:shadow-3xl transition-shadow duration-500"
            style={{
              borderRadius: '8px 0 0 8px',
              boxShadow: `
                -4px 0 12px rgba(0,0,0,0.2),
                inset 4px 0 8px rgba(0,0,0,0.1),
                0 0 20px rgba(0,0,0,0.15)
              `
            }}
          >
            {/* Realistic Page Corner Curl Effect */}
            {isHovering === 'left' && !isFlipping && currentPage > 0 && (
              <>
                {/* Main curl triangle */}
                <div 
                  className="absolute top-4 left-4 pointer-events-none"
                  style={{
                    width: '32px',
                    height: '32px',
                    zIndex: 35,
                    clipPath: 'polygon(0% 0%, 100% 0%, 0% 100%)',
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(245,245,245,0.9) 30%, rgba(230,230,230,0.8) 100%)',
                    transform: 'perspective(200px) rotateX(-15deg) rotateY(10deg) rotateZ(-5deg)',
                    transformOrigin: 'top left',
                    boxShadow: '3px 3px 8px rgba(0,0,0,0.15), inset -1px -1px 2px rgba(0,0,0,0.1)',
                    animation: 'realistic-curl 0.4s ease-out forwards'
                  }}
                />
                
                {/* Shadow underneath the curl */}
                <div 
                  className="absolute top-6 left-6 pointer-events-none"
                  style={{
                    width: '24px',
                    height: '24px',
                    background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.08) 40%, transparent 70%)',
                    borderRadius: '50%',
                    zIndex: 30,
                    animation: 'curl-shadow 0.4s ease-out forwards'
                  }}
                />

                {/* Paper fiber effect on curl edge */}
                <div 
                  className="absolute top-4 left-4 pointer-events-none"
                  style={{
                    width: '32px',
                    height: '32px',
                    clipPath: 'polygon(0% 0%, 100% 0%, 0% 100%)',
                    background: `
                      repeating-linear-gradient(
                        45deg,
                        rgba(200,200,200,0.3) 0px,
                        rgba(200,200,200,0.3) 1px,
                        transparent 1px,
                        transparent 3px
                      )
                    `,
                    zIndex: 36,
                    transform: 'perspective(200px) rotateX(-15deg) rotateY(10deg) rotateZ(-5deg)',
                    transformOrigin: 'top left',
                  }}
                />
              </>
            )}

            {/* Page content */}
            <div className="p-6 h-full overflow-y-auto relative z-10" style={{ fontSize: '13px', lineHeight: '1.6' }}>
              <div className="text-gray-800 leading-relaxed text-justify font-serif">
                {currentPage > 0 && getPageContent(currentPage - 1).split('\n').map((paragraph, index) => (
                  <p key={index} className="mb-4 text-sm leading-6 indent-4">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
            
            {/* Page number */}
            {currentPage > 0 && (
              <div className="absolute bottom-4 left-4 text-xs text-gray-500 font-medium">
                {currentPage}
              </div>
            )}

            {/* Paper texture */}
            <div 
              className="absolute inset-0 opacity-3 pointer-events-none"
              style={{
                backgroundImage: `
                  repeating-linear-gradient(
                    0deg,
                    transparent,
                    transparent 24px,
                    rgba(139, 69, 19, 0.03) 25px
                  ),
                  repeating-linear-gradient(
                    90deg,
                    transparent,
                    transparent 49px,
                    rgba(139, 69, 19, 0.02) 50px
                  )
                `
              }}
            />

            {/* Left margin line */}
            <div className="absolute top-0 bottom-0 left-8 w-px bg-red-200 opacity-40"></div>

            {/* Page back (visible during flip) */}
            <div 
              className="absolute inset-0 bg-gradient-to-l from-gray-100 to-gray-50"
              style={{
                backfaceVisibility: 'visible',
                transform: 'rotateY(180deg)',
                zIndex: -1,
                borderRadius: '8px 0 0 8px'
              }}
            >
              <div className="p-6 h-full flex items-center justify-center text-gray-400">
                <div className="text-center opacity-30">
                  <div className="text-sm">صفحه پشت</div>
                </div>
              </div>
            </div>

            {/* Subtle hover glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ borderRadius: '8px 0 0 8px' }}></div>
          </div>
        </div>

        {/* Right Page */}
        <div 
          className={`absolute top-0 right-0 w-1/2 h-full transition-all duration-1200 cursor-pointer group ${
            isFlipping && flipDirection === 'right' ? 'animate-gentle-flip-right' : ''
          }`}
          style={{
            transformOrigin: 'left center',
            transformStyle: 'preserve-3d',
            zIndex: isFlipping && flipDirection === 'right' ? 30 : 10
          }}
          onClick={nextPage}
          onMouseEnter={() => setIsHovering('right')}
          onMouseLeave={() => setIsHovering(null)}
        >
          <div 
            className="w-full h-full bg-gradient-to-l from-white to-gray-50 shadow-2xl relative overflow-hidden group-hover:shadow-3xl transition-shadow duration-500"
            style={{
              borderRadius: '0 8px 8px 0',
              boxShadow: `
                4px 0 12px rgba(0,0,0,0.2),
                inset -4px 0 8px rgba(0,0,0,0.1),
                0 0 20px rgba(0,0,0,0.15)
              `
            }}
          >
            {/* Realistic Page Corner Curl Effect - Right Side */}
            {isHovering === 'right' && !isFlipping && currentPage < pages.length - 1 && (
              <>
                {/* Main curl triangle */}
                <div 
                  className="absolute top-4 right-4 pointer-events-none"
                  style={{
                    width: '32px',
                    height: '32px',
                    zIndex: 35,
                    clipPath: 'polygon(100% 0%, 100% 100%, 0% 0%)',
                    background: 'linear-gradient(225deg, rgba(255,255,255,0.95) 0%, rgba(245,245,245,0.9) 30%, rgba(230,230,230,0.8) 100%)',
                    transform: 'perspective(200px) rotateX(-15deg) rotateY(-10deg) rotateZ(5deg)',
                    transformOrigin: 'top right',
                    boxShadow: '-3px 3px 8px rgba(0,0,0,0.15), inset 1px -1px 2px rgba(0,0,0,0.1)',
                    animation: 'realistic-curl-right 0.4s ease-out forwards'
                  }}
                />
                
                {/* Shadow underneath the curl */}
                <div 
                  className="absolute top-6 right-6 pointer-events-none"
                  style={{
                    width: '24px',
                    height: '24px',
                    background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.08) 40%, transparent 70%)',
                    borderRadius: '50%',
                    zIndex: 30,
                    animation: 'curl-shadow-right 0.4s ease-out forwards'
                  }}
                />

                {/* Paper fiber effect on curl edge */}
                <div 
                  className="absolute top-4 right-4 pointer-events-none"
                  style={{
                    width: '32px',
                    height: '32px',
                    clipPath: 'polygon(100% 0%, 100% 100%, 0% 0%)',
                    background: `
                      repeating-linear-gradient(
                        -45deg,
                        rgba(200,200,200,0.3) 0px,
                        rgba(200,200,200,0.3) 1px,
                        transparent 1px,
                        transparent 3px
                      )
                    `,
                    zIndex: 36,
                    transform: 'perspective(200px) rotateX(-15deg) rotateY(-10deg) rotateZ(5deg)',
                    transformOrigin: 'top right',
                  }}
                />
              </>
            )}

            {/* Page content */}
            <div className="p-6 h-full overflow-y-auto relative z-10" style={{ fontSize: '13px', lineHeight: '1.6' }}>
              <div className="text-gray-800 leading-relaxed text-justify font-serif">
                {getPageContent(currentPage).split('\n').map((paragraph, index) => (
                  <p key={index} className="mb-4 text-sm leading-6 indent-4">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
            
            {/* Page number */}
            <div className="absolute bottom-4 right-4 text-xs text-gray-500 font-medium">
              {currentPage + 1}
            </div>

            {/* Paper texture */}
            <div 
              className="absolute inset-0 opacity-3 pointer-events-none"
              style={{
                backgroundImage: `
                  repeating-linear-gradient(
                    0deg,
                    transparent,
                    transparent 24px,
                    rgba(139, 69, 19, 0.03) 25px
                  ),
                  repeating-linear-gradient(
                    90deg,
                    transparent,
                    transparent 49px,
                    rgba(139, 69, 19, 0.02) 50px
                  )
                `
              }}
            />

            {/* Right margin line */}
            <div className="absolute top-0 bottom-0 right-8 w-px bg-red-200 opacity-40"></div>

            {/* Page back (visible during flip) */}
            <div 
              className="absolute inset-0 bg-gradient-to-r from-gray-100 to-gray-50"
              style={{
                backfaceVisibility: 'visible',
                transform: 'rotateY(180deg)',
                zIndex: -1,
                borderRadius: '0 8px 8px 0'
              }}
            >
              <div className="p-6 h-full flex items-center justify-center text-gray-400">
                <div className="text-center opacity-30">
                  <div className="text-sm">صفحه پشت</div>
                </div>
              </div>
            </div>

            {/* Subtle hover glow */}
            <div className="absolute inset-0 bg-gradient-to-l from-purple-500/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ borderRadius: '0 8px 8px 0' }}></div>
          </div>
        </div>

        {/* Book Binding Shadow */}
        <div className="absolute inset-0 pointer-events-none">
          <div 
            className="absolute top-0 bottom-0 left-1/2 w-6 transform -translate-x-1/2"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(0,0,0,0.1), rgba(0,0,0,0.2), rgba(0,0,0,0.1), transparent)',
              zIndex: 15
            }}
          />
        </div>

        {/* Next Page Preview */}
        {currentPage < pages.length - 2 && (
          <div 
            className="absolute top-1 right-1 w-1/2 h-full bg-gradient-to-l from-gray-300 to-gray-200 shadow-lg opacity-30 transform translate-x-1 -translate-y-1"
            style={{ 
              zIndex: 5,
              borderRadius: '0 8px 8px 0'
            }}
          />
        )}

        {/* Book lighting effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div 
            className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-white/15 to-transparent"
            style={{ 
              zIndex: 25,
              borderRadius: '8px 8px 0 0'
            }}
          />
          <div 
            className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-black/8 to-transparent"
            style={{ 
              zIndex: 25,
              borderRadius: '0 0 8px 8px'
            }}
          />
        </div>
      </div>

      {/* Compact Controls */}
      <div className="flex items-center justify-between w-full max-w-4xl mt-6">
        <button
          onClick={prevPage}
          disabled={currentPage === 0 || isFlipping}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-md hover:shadow-blue-500/20 transform hover:scale-105 active:scale-95 font-medium text-sm"
        >
          <ChevronRight className="w-4 h-4" />
          صفحه قبل
        </button>

        <div className="flex items-center gap-4">
          {/* Sound Toggle */}
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`p-2 rounded-full transition-all duration-300 shadow-md ${
              soundEnabled 
                ? 'bg-green-600 hover:bg-green-700 text-white shadow-green-500/20' 
                : 'bg-gray-600 hover:bg-gray-700 text-gray-300 shadow-gray-500/20'
            }`}
            title={soundEnabled ? 'غیرفعال کردن صدا' : 'فعال کردن صدا'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Page Indicator */}
          <div className="text-center">
            <div className="text-lg font-bold text-white mb-2">
              صفحه {currentPage + 1} از {pages.length}
            </div>
            <div className="w-40 bg-gray-700 rounded-full h-2 overflow-hidden shadow-inner">
              <div 
                className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 h-2 rounded-full transition-all duration-700 shadow-sm relative"
                style={{ width: `${((currentPage + 1) / pages.length) * 100}%` }}
              >
                <div className="absolute inset-0 bg-white/20 rounded-full animate-pulse"></div>
              </div>
            </div>
            <div className="text-xs text-gray-400 mt-1">
              {Math.round(((currentPage + 1) / pages.length) * 100)}% مطالعه شده
            </div>
          </div>
        </div>

        <button
          onClick={nextPage}
          disabled={currentPage === pages.length - 1 || isFlipping}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:from-purple-700 hover:to-purple-800 transition-all duration-300 shadow-md hover:shadow-purple-500/20 transform hover:scale-105 active:scale-95 font-medium text-sm"
        >
          صفحه بعد
          <ChevronLeft className="w-4 h-4" />
        </button>
      </div>

      {/* Flip Animation Status */}
      {isFlipping && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-black/90 via-gray-900/90 to-black/90 text-white px-6 py-3 rounded-2xl z-50 flex items-center gap-3 backdrop-blur-sm border border-white/20 shadow-2xl">
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          <span className="text-base font-medium">در حال ورق زدن صفحه...</span>
        </div>
      )}

      <style>{`
        @keyframes realistic-curl {
          0% {
            transform: perspective(200px) rotateX(0deg) rotateY(0deg) rotateZ(0deg);
            opacity: 0;
            width: 0px;
            height: 0px;
          }
          30% {
            transform: perspective(200px) rotateX(-5deg) rotateY(3deg) rotateZ(-2deg);
            opacity: 0.3;
            width: 16px;
            height: 16px;
          }
          60% {
            transform: perspective(200px) rotateX(-10deg) rotateY(6deg) rotateZ(-3deg);
            opacity: 0.7;
            width: 24px;
            height: 24px;
          }
          100% {
            transform: perspective(200px) rotateX(-15deg) rotateY(10deg) rotateZ(-5deg);
            opacity: 1;
            width: 32px;
            height: 32px;
          }
        }

        @keyframes realistic-curl-right {
          0% {
            transform: perspective(200px) rotateX(0deg) rotateY(0deg) rotateZ(0deg);
            opacity: 0;
            width: 0px;
            height: 0px;
          }
          30% {
            transform: perspective(200px) rotateX(-5deg) rotateY(-3deg) rotateZ(2deg);
            opacity: 0.3;
            width: 16px;
            height: 16px;
          }
          60% {
            transform: perspective(200px) rotateX(-10deg) rotateY(-6deg) rotateZ(3deg);
            opacity: 0.7;
            width: 24px;
            height: 24px;
          }
          100% {
            transform: perspective(200px) rotateX(-15deg) rotateY(-10deg) rotateZ(5deg);
            opacity: 1;
            width: 32px;
            height: 32px;
          }
        }

        @keyframes curl-shadow {
          0% {
            opacity: 0;
            transform: scale(0);
          }
          50% {
            opacity: 0.8;
            transform: scale(0.8);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes curl-shadow-right {
          0% {
            opacity: 0;
            transform: scale(0);
          }
          50% {
            opacity: 0.8;
            transform: scale(0.8);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes gentle-flip-right {
          0% {
            transform: rotateY(0deg) scale(1);
            box-shadow: 4px 0 12px rgba(0,0,0,0.2);
          }
          15% {
            transform: rotateY(-15deg) scale(1.02);
            box-shadow: 8px 0 20px rgba(0,0,0,0.25);
          }
          30% {
            transform: rotateY(-30deg) scale(1.03);
            box-shadow: 12px 0 25px rgba(0,0,0,0.3);
          }
          50% {
            transform: rotateY(-90deg) scale(1.04);
            box-shadow: 16px 0 30px rgba(0,0,0,0.35);
          }
          70% {
            transform: rotateY(-150deg) scale(1.03);
            box-shadow: 12px 0 25px rgba(0,0,0,0.3);
          }
          85% {
            transform: rotateY(-165deg) scale(1.02);
            box-shadow: 8px 0 20px rgba(0,0,0,0.25);
          }
          100% {
            transform: rotateY(-180deg) scale(1);
            box-shadow: 4px 0 12px rgba(0,0,0,0.2);
          }
        }

        @keyframes gentle-flip-left {
          0% {
            transform: rotateY(-180deg) scale(1);
            box-shadow: -4px 0 12px rgba(0,0,0,0.2);
          }
          15% {
            transform: rotateY(-165deg) scale(1.02);
            box-shadow: -8px 0 20px rgba(0,0,0,0.25);
          }
          30% {
            transform: rotateY(-150deg) scale(1.03);
            box-shadow: -12px 0 25px rgba(0,0,0,0.3);
          }
          50% {
            transform: rotateY(-90deg) scale(1.04);
            box-shadow: -16px 0 30px rgba(0,0,0,0.35);
          }
          70% {
            transform: rotateY(-30deg) scale(1.03);
            box-shadow: -12px 0 25px rgba(0,0,0,0.3);
          }
          85% {
            transform: rotateY(-15deg) scale(1.02);
            box-shadow: -8px 0 20px rgba(0,0,0,0.25);
          }
          100% {
            transform: rotateY(0deg) scale(1);
            box-shadow: -4px 0 12px rgba(0,0,0,0.2);
          }
        }

        .animate-gentle-flip-right {
          animation: gentle-flip-right 1.2s cubic-bezier(0.165, 0.84, 0.44, 1);
        }

        .animate-gentle-flip-left {
          animation: gentle-flip-left 1.2s cubic-bezier(0.165, 0.84, 0.44, 1);
        }
      `}</style>
    </div>
  );
};

export default FlipBook;
