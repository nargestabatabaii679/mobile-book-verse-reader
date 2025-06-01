
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface FlipBookProps {
  pages: string[];
  width?: number;
  height?: number;
}

const FlipBook: React.FC<FlipBookProps> = ({ pages, width = 500, height = 700 }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);

  const nextPage = () => {
    if (currentPage < pages.length - 1 && !isFlipping) {
      setIsFlipping(true);
      setTimeout(() => {
        setCurrentPage(currentPage + 1);
        setIsFlipping(false);
      }, 400);
    }
  };

  const prevPage = () => {
    if (currentPage > 0 && !isFlipping) {
      setIsFlipping(true);
      setTimeout(() => {
        setCurrentPage(currentPage - 1);
        setIsFlipping(false);
      }, 400);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div 
        className="relative perspective-1200 mb-4"
        style={{ width: `${width}px`, height: `${height}px` }}
      >
        {/* Current Page */}
        <div className={`absolute inset-0 bg-white rounded-lg shadow-2xl transform-gpu transition-all duration-400 ${
          isFlipping ? 'modern-page-flip-right' : ''
        }`}>
          <div className="p-6 h-full overflow-y-auto">
            <div className="text-gray-800 leading-relaxed text-justify page-texture">
              {pages[currentPage]?.split('\n').map((paragraph, index) => (
                <p key={index} className="mb-4">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
          
          {/* Page number */}
          <div className="absolute bottom-4 right-6 text-sm text-gray-500 font-medium">
            {currentPage + 1}
          </div>
        </div>

        {/* Next Page Preview (slightly visible) */}
        {currentPage < pages.length - 1 && (
          <div className="absolute inset-0 bg-gray-50 rounded-lg shadow-xl transform translate-x-1 translate-y-1 -z-10">
            <div className="p-6 h-full overflow-hidden">
              <div className="text-gray-600 leading-relaxed text-justify opacity-60">
                {pages[currentPage + 1]?.substring(0, 200)}...
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center gap-4">
        <button
          onClick={prevPage}
          disabled={currentPage === 0 || isFlipping}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg disabled:bg-gray-400 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors"
        >
          <ChevronRight className="w-4 h-4 rotate-180" />
          صفحه قبل
        </button>

        <span className="text-white font-medium">
          {currentPage + 1} از {pages.length}
        </span>

        <button
          onClick={nextPage}
          disabled={currentPage === pages.length - 1 || isFlipping}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg disabled:bg-gray-400 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors"
        >
          صفحه بعد
          <ChevronLeft className="w-4 h-4 rotate-180" />
        </button>
      </div>
    </div>
  );
};

export default FlipBook;
