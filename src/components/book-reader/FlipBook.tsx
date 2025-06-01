
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Volume2, VolumeX } from 'lucide-react';
import { audioManager } from '@/utils/audioUtils';

interface FlipBookProps {
  pages: string[];
  width?: number;
  height?: number;
}

const FlipBook: React.FC<FlipBookProps> = ({ pages, width = 600, height = 700 }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipDirection, setFlipDirection] = useState<'left' | 'right' | null>(null);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isBookOpen, setIsBookOpen] = useState(false);

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
      }, 400);

      setTimeout(() => {
        setIsFlipping(false);
        setFlipDirection(null);
      }, 800);
    }
  };

  const prevPage = () => {
    if (currentPage > 0 && !isFlipping) {
      setIsFlipping(true);
      setFlipDirection('left');
      audioManager.playPageFlipSound();
      
      setTimeout(() => {
        setCurrentPage(currentPage - 1);
      }, 400);

      setTimeout(() => {
        setIsFlipping(false);
        setFlipDirection(null);
      }, 800);
    }
  };

  const getPageContent = (pageIndex: number) => {
    if (pageIndex < 0 || pageIndex >= pages.length) return '';
    return pages[pageIndex];
  };

  return (
    <div className="flex flex-col items-center p-8">
      {/* Book Container */}
      <div 
        className={`relative transition-all duration-1000 ${isBookOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
        style={{ 
          width: `${width}px`, 
          height: `${height}px`,
          perspective: '2000px',
          transformStyle: 'preserve-3d'
        }}
      >
        {/* Book Base/Spine */}
        <div 
          className="absolute left-1/2 top-0 bottom-0 w-8 z-20 transform -translate-x-1/2"
          style={{
            background: 'linear-gradient(90deg, #8B4513 0%, #A0522D 20%, #654321 50%, #A0522D 80%, #8B4513 100%)',
            boxShadow: 'inset 0 0 20px rgba(0,0,0,0.5), 0 0 30px rgba(0,0,0,0.3)',
            borderRadius: '6px'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-black/30 rounded"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1 h-16 bg-gold/60 rounded-full"></div>
        </div>

        {/* Left Page */}
        <div 
          className={`absolute top-0 left-0 w-1/2 h-full transition-all duration-800 cursor-pointer group ${
            isFlipping && flipDirection === 'left' ? 'animate-flip-left' : ''
          }`}
          style={{
            transformOrigin: 'right center',
            transformStyle: 'preserve-3d',
            zIndex: isFlipping && flipDirection === 'left' ? 30 : 10
          }}
          onClick={prevPage}
        >
          <div 
            className="w-full h-full bg-gradient-to-r from-gray-50 to-white rounded-l-3xl shadow-2xl relative overflow-hidden group-hover:shadow-3xl transition-shadow duration-300"
            style={{
              boxShadow: `
                -8px 0 20px rgba(0,0,0,0.15),
                inset 8px 0 15px rgba(0,0,0,0.08),
                0 0 40px rgba(0,0,0,0.12)
              `
            }}
          >
            {/* Page content */}
            <div className="p-10 h-full overflow-y-auto relative z-10">
              <div className="text-gray-800 leading-relaxed text-justify font-serif">
                {currentPage > 0 && getPageContent(currentPage - 1).split('\n').map((paragraph, index) => (
                  <p key={index} className="mb-6 text-lg leading-8">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
            
            {/* Page number */}
            {currentPage > 0 && (
              <div className="absolute bottom-8 left-8 text-sm text-gray-500 font-medium">
                {currentPage}
              </div>
            )}

            {/* Enhanced paper texture */}
            <div 
              className="absolute inset-0 opacity-5 pointer-events-none"
              style={{
                backgroundImage: `
                  radial-gradient(circle at 20% 80%, rgba(139, 69, 19, 0.4) 0%, transparent 50%),
                  radial-gradient(circle at 80% 20%, rgba(160, 82, 45, 0.3) 0%, transparent 50%),
                  radial-gradient(circle at 40% 40%, rgba(210, 180, 140, 0.3) 0%, transparent 50%),
                  repeating-linear-gradient(
                    90deg,
                    transparent,
                    transparent 50px,
                    rgba(139, 69, 19, 0.02) 51px,
                    rgba(139, 69, 19, 0.02) 52px
                  )
                `
              }}
            />

            {/* Page margin line */}
            <div className="absolute top-0 bottom-0 left-16 w-px bg-pink-200 opacity-30"></div>

            {/* Page back (visible during flip) */}
            <div 
              className="absolute inset-0 bg-gradient-to-l from-gray-100 to-gray-50 rounded-l-3xl"
              style={{
                backfaceVisibility: 'visible',
                transform: 'rotateY(180deg)',
                zIndex: -1
              }}
            >
              <div className="p-10 h-full flex items-center justify-center text-gray-400">
                <div className="text-center opacity-50">
                  <div className="text-lg">صفحه پشت</div>
                </div>
              </div>
            </div>

            {/* Page glow effect on hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-l-3xl"></div>
          </div>
        </div>

        {/* Right Page */}
        <div 
          className={`absolute top-0 right-0 w-1/2 h-full transition-all duration-800 cursor-pointer group ${
            isFlipping && flipDirection === 'right' ? 'animate-flip-right' : ''
          }`}
          style={{
            transformOrigin: 'left center',
            transformStyle: 'preserve-3d',
            zIndex: isFlipping && flipDirection === 'right' ? 30 : 10
          }}
          onClick={nextPage}
        >
          <div 
            className="w-full h-full bg-gradient-to-l from-gray-50 to-white rounded-r-3xl shadow-2xl relative overflow-hidden group-hover:shadow-3xl transition-shadow duration-300"
            style={{
              boxShadow: `
                8px 0 20px rgba(0,0,0,0.15),
                inset -8px 0 15px rgba(0,0,0,0.08),
                0 0 40px rgba(0,0,0,0.12)
              `
            }}
          >
            {/* Page content */}
            <div className="p-10 h-full overflow-y-auto relative z-10">
              <div className="text-gray-800 leading-relaxed text-justify font-serif">
                {getPageContent(currentPage).split('\n').map((paragraph, index) => (
                  <p key={index} className="mb-6 text-lg leading-8">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
            
            {/* Page number */}
            <div className="absolute bottom-8 right-8 text-sm text-gray-500 font-medium">
              {currentPage + 1}
            </div>

            {/* Enhanced paper texture */}
            <div 
              className="absolute inset-0 opacity-5 pointer-events-none"
              style={{
                backgroundImage: `
                  radial-gradient(circle at 80% 20%, rgba(139, 69, 19, 0.4) 0%, transparent 50%),
                  radial-gradient(circle at 20% 80%, rgba(160, 82, 45, 0.3) 0%, transparent 50%),
                  radial-gradient(circle at 60% 60%, rgba(210, 180, 140, 0.3) 0%, transparent 50%),
                  repeating-linear-gradient(
                    90deg,
                    transparent,
                    transparent 50px,
                    rgba(139, 69, 19, 0.02) 51px,
                    rgba(139, 69, 19, 0.02) 52px
                  )
                `
              }}
            />

            {/* Page margin line */}
            <div className="absolute top-0 bottom-0 right-16 w-px bg-pink-200 opacity-30"></div>

            {/* Page back (visible during flip) */}
            <div 
              className="absolute inset-0 bg-gradient-to-r from-gray-100 to-gray-50 rounded-r-3xl"
              style={{
                backfaceVisibility: 'visible',
                transform: 'rotateY(180deg)',
                zIndex: -1
              }}
            >
              <div className="p-10 h-full flex items-center justify-center text-gray-400">
                <div className="text-center opacity-50">
                  <div className="text-lg">صفحه پشت</div>
                </div>
              </div>
            </div>

            {/* Page glow effect on hover */}
            <div className="absolute inset-0 bg-gradient-to-l from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-r-3xl"></div>
          </div>
        </div>

        {/* Enhanced Book Binding Shadow */}
        <div className="absolute inset-0 pointer-events-none">
          <div 
            className="absolute top-0 bottom-0 left-1/2 w-12 transform -translate-x-1/2"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(0,0,0,0.15), rgba(0,0,0,0.25), rgba(0,0,0,0.15), transparent)',
              zIndex: 15
            }}
          />
        </div>

        {/* Next Page Preview (more realistic) */}
        {currentPage < pages.length - 2 && (
          <div 
            className="absolute top-3 right-3 w-1/2 h-full bg-gradient-to-l from-gray-200 to-gray-100 rounded-r-3xl shadow-xl opacity-40 transform translate-x-2 -translate-y-2"
            style={{ zIndex: 5 }}
          />
        )}

        {/* Book lighting effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div 
            className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-white/20 to-transparent rounded-t-3xl"
            style={{ zIndex: 25 }}
          />
          <div 
            className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/10 to-transparent rounded-b-3xl"
            style={{ zIndex: 25 }}
          />
        </div>
      </div>

      {/* Enhanced Controls */}
      <div className="flex items-center justify-between w-full max-w-5xl mt-12">
        <button
          onClick={prevPage}
          disabled={currentPage === 0 || isFlipping}
          className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-blue-500/30 transform hover:scale-105 active:scale-95 font-medium text-lg"
        >
          <ChevronRight className="w-6 h-6" />
          صفحه قبل
        </button>

        <div className="flex items-center gap-8">
          {/* Sound Toggle */}
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`p-4 rounded-full transition-all duration-300 shadow-lg ${
              soundEnabled 
                ? 'bg-green-600 hover:bg-green-700 text-white shadow-green-500/30' 
                : 'bg-gray-600 hover:bg-gray-700 text-gray-300 shadow-gray-500/30'
            }`}
            title={soundEnabled ? 'غیرفعال کردن صدا' : 'فعال کردن صدا'}
          >
            {soundEnabled ? <Volume2 className="w-6 h-6" /> : <VolumeX className="w-6 h-6" />}
          </button>

          {/* Enhanced Page Indicator */}
          <div className="text-center">
            <div className="text-2xl font-bold text-white mb-3">
              صفحه {currentPage + 1} از {pages.length}
            </div>
            <div className="w-64 bg-gray-700 rounded-full h-4 overflow-hidden shadow-inner">
              <div 
                className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 h-4 rounded-full transition-all duration-700 shadow-lg relative"
                style={{ width: `${((currentPage + 1) / pages.length) * 100}%` }}
              >
                <div className="absolute inset-0 bg-white/20 rounded-full animate-pulse"></div>
              </div>
            </div>
            <div className="text-sm text-gray-400 mt-2">
              {Math.round(((currentPage + 1) / pages.length) * 100)}% مطالعه شده
            </div>
          </div>
        </div>

        <button
          onClick={nextPage}
          disabled={currentPage === pages.length - 1 || isFlipping}
          className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed hover:from-purple-700 hover:to-purple-800 transition-all duration-300 shadow-lg hover:shadow-purple-500/30 transform hover:scale-105 active:scale-95 font-medium text-lg"
        >
          صفحه بعد
          <ChevronLeft className="w-6 h-6" />
        </button>
      </div>

      {/* Enhanced Flip Animation Status */}
      {isFlipping && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-black/90 via-gray-900/90 to-black/90 text-white px-8 py-4 rounded-2xl z-50 flex items-center gap-4 backdrop-blur-sm border border-white/20 shadow-2xl">
          <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
          <span className="text-lg font-medium">در حال ورق زدن صفحه...</span>
        </div>
      )}

      <style jsx>{`
        @keyframes flip-right {
          0% {
            transform: rotateY(0deg);
            box-shadow: 8px 0 20px rgba(0,0,0,0.15);
          }
          25% {
            transform: rotateY(-45deg);
            box-shadow: 15px 0 30px rgba(0,0,0,0.25);
          }
          50% {
            transform: rotateY(-90deg);
            box-shadow: 20px 0 40px rgba(0,0,0,0.35);
          }
          75% {
            transform: rotateY(-135deg);
            box-shadow: 15px 0 30px rgba(0,0,0,0.25);
          }
          100% {
            transform: rotateY(-180deg);
            box-shadow: 8px 0 20px rgba(0,0,0,0.15);
          }
        }

        @keyframes flip-left {
          0% {
            transform: rotateY(-180deg);
            box-shadow: -8px 0 20px rgba(0,0,0,0.15);
          }
          25% {
            transform: rotateY(-135deg);
            box-shadow: -15px 0 30px rgba(0,0,0,0.25);
          }
          50% {
            transform: rotateY(-90deg);
            box-shadow: -20px 0 40px rgba(0,0,0,0.35);
          }
          75% {
            transform: rotateY(-45deg);
            box-shadow: -15px 0 30px rgba(0,0,0,0.25);
          }
          100% {
            transform: rotateY(0deg);
            box-shadow: -8px 0 20px rgba(0,0,0,0.15);
          }
        }

        .animate-flip-right {
          animation: flip-right 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .animate-flip-left {
          animation: flip-left 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
      `}</style>
    </div>
  );
};

export default FlipBook;
