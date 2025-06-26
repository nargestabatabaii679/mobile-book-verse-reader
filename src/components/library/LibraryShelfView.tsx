
import React, { useState } from 'react';
import { Book } from '@/types';
import { Skeleton } from '@/components/ui/skeleton';
import { BookOpen, Sparkles } from 'lucide-react';

interface LibraryShelfViewProps {
  books: Book[];
  isLoading: boolean;
  onSelectBook: (book: Book) => void;
}

export const LibraryShelfView: React.FC<LibraryShelfViewProps> = ({
  books,
  isLoading,
  onSelectBook,
}) => {
  const handleBookClick = (book: Book) => {
    onSelectBook(book);
  };

  if (isLoading) {
    return (
      <div className="space-y-8">
        {[...Array(4)].map((_, shelfIndex) => (
          <div key={shelfIndex} className="relative">
            <Skeleton className="h-64 w-full bg-gradient-to-r from-amber-900/20 to-amber-700/20" />
          </div>
        ))}
      </div>
    );
  }

  // Separate interactive books from regular books
  const interactiveBooks = books.filter(book => book.interactiveStoryId);
  const regularBooks = books.filter(book => !book.interactiveStoryId);

  // Group regular books into shelves (4 books per shelf)
  const regularShelves = [];
  for (let i = 0; i < regularBooks.length; i += 4) {
    regularShelves.push(regularBooks.slice(i, i + 4));
  }

  // Create interactive shelf if there are interactive books
  const allShelves = [];
  if (interactiveBooks.length > 0) {
    allShelves.push({ books: interactiveBooks.slice(0, 4), isInteractive: true });
  }
  
  // Add regular shelves
  regularShelves.forEach(shelf => {
    allShelves.push({ books: shelf, isInteractive: false });
  });

  return (
    <div className="space-y-8">
      {allShelves.map((shelf, shelfIndex) => (
        <div key={shelfIndex} className="relative">
          {/* Interactive shelf has special styling */}
          {shelf.isInteractive ? (
            <>
              {/* Special background for interactive shelf */}
              <div 
                className="absolute inset-0 rounded-lg shadow-2xl"
                style={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
                  height: '300px',
                  boxShadow: '0 20px 40px rgba(102, 126, 234, 0.4), inset 0 2px 4px rgba(255, 255, 255, 0.3)',
                }}
              >
                {/* Magical sparkle effect */}
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute top-4 left-8 w-2 h-2 bg-yellow-300 rounded-full animate-pulse"></div>
                  <div className="absolute top-12 right-12 w-1 h-1 bg-pink-300 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
                  <div className="absolute bottom-8 left-16 w-1.5 h-1.5 bg-blue-300 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
                </div>
              </div>
            </>
          ) : (
            /* Regular wooden shelf background */
            <div 
              className="absolute inset-0 rounded-lg shadow-2xl"
              style={{
                background: 'linear-gradient(180deg, #8B4513 0%, #A0522D 20%, #CD853F 50%, #A0522D 80%, #8B4513 100%)',
                height: '280px',
                boxShadow: '0 15px 35px rgba(139, 69, 19, 0.4), inset 0 2px 4px rgba(255, 255, 255, 0.2)',
              }}
            >
              {/* Wood grain texture overlay */}
              <div 
                className="absolute inset-0 opacity-30 rounded-lg"
                style={{
                  backgroundImage: `repeating-linear-gradient(
                    90deg,
                    transparent,
                    transparent 2px,
                    rgba(0,0,0,0.1) 2px,
                    rgba(0,0,0,0.1) 4px
                  )`
                }}
              />
              
              {/* Shelf edge shadow */}
              <div 
                className="absolute bottom-0 left-0 right-0 h-6 rounded-b-lg"
                style={{
                  background: 'linear-gradient(180deg, transparent 0%, rgba(139, 69, 19, 0.8) 100%)',
                  boxShadow: '0 4px 8px rgba(139, 69, 19, 0.6)'
                }}
              />
            </div>
          )}
          
          {/* Books on shelf */}
          <div className={`relative z-10 flex justify-center items-end px-8 pb-4 ${shelf.isInteractive ? 'h-72' : 'h-64'}`}>
            {shelf.books.map((book, bookIndex) => (
              <div
                key={book.id}
                className="relative group cursor-pointer mx-1"
                onClick={() => handleBookClick(book)}
                style={{
                  transform: `rotate(${(Math.random() - 0.5) * 6}deg)`,
                  transformOrigin: 'bottom center'
                }}
              >
                {/* Book spine */}
                <div 
                  className="relative transition-all duration-300 hover:scale-110 hover:-translate-y-4 hover:rotate-0"
                  style={{
                    width: '45px',
                    height: `${200 + Math.random() * 40}px`,
                    background: shelf.isInteractive 
                      ? `linear-gradient(90deg, 
                          hsl(${280 + bookIndex * 20}, 80%, 60%) 0%,
                          hsl(${280 + bookIndex * 20}, 80%, 70%) 50%,
                          hsl(${280 + bookIndex * 20}, 80%, 50%) 100%)`
                      : `linear-gradient(90deg, 
                          hsl(${bookIndex * 60 + shelfIndex * 30}, 70%, 45%) 0%,
                          hsl(${bookIndex * 60 + shelfIndex * 30}, 70%, 55%) 50%,
                          hsl(${bookIndex * 60 + shelfIndex * 30}, 70%, 40%) 100%)`,
                    borderRadius: '2px 2px 0 0',
                    boxShadow: shelf.isInteractive
                      ? `2px 0 8px rgba(147, 51, 234, 0.4), inset 2px 0 2px rgba(255,255,255,0.3), inset -2px 0 2px rgba(0,0,0,0.2)`
                      : `2px 0 4px rgba(0,0,0,0.3), inset 2px 0 2px rgba(255,255,255,0.2), inset -2px 0 2px rgba(0,0,0,0.2)`,
                  }}
                >
                  {/* Interactive book indicator */}
                  {shelf.isInteractive && (
                    <div className="absolute top-1 left-1/2 transform -translate-x-1/2">
                      <Sparkles className="w-3 h-3 text-yellow-300 animate-pulse" />
                    </div>
                  )}
                  
                  {/* Book title on spine */}
                  <div 
                    className="absolute inset-x-0 top-4 text-white text-xs font-bold px-1"
                    style={{
                      writingMode: 'vertical-rl',
                      textOrientation: 'mixed',
                      lineHeight: '1.2',
                      textShadow: '0 1px 2px rgba(0,0,0,0.8)'
                    }}
                  >
                    <div className="truncate max-h-32 overflow-hidden">
                      {book.title.length > 20 ? book.title.substring(0, 20) + '...' : book.title}
                    </div>
                  </div>
                  
                  {/* Author name */}
                  <div 
                    className="absolute inset-x-0 bottom-4 text-white/80 text-xs px-1"
                    style={{
                      writingMode: 'vertical-rl',
                      textOrientation: 'mixed',
                      lineHeight: '1.1',
                      textShadow: '0 1px 2px rgba(0,0,0,0.8)'
                    }}
                  >
                    {book.author.length > 15 ? book.author.substring(0, 15) + '...' : book.author}
                  </div>
                  
                  {/* Decorative elements */}
                  <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-6 h-1 bg-gradient-to-r from-transparent via-white/40 to-transparent rounded-full" />
                  <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-6 h-1 bg-gradient-to-r from-transparent via-white/40 to-transparent rounded-full" />
                </div>
                
                {/* Hover tooltip */}
                <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-black/90 text-white px-3 py-2 rounded-lg text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-20 pointer-events-none">
                  <div className="font-bold text-center">{book.title}</div>
                  <div className="text-xs text-gray-300 text-center">{book.author}</div>
                  <div className="text-xs text-blue-300 text-center flex items-center justify-center gap-1 mt-1">
                    {shelf.isInteractive ? <Sparkles className="w-3 h-3" /> : <BookOpen className="w-3 h-3" />}
                    {shelf.isInteractive ? 'کلیک برای شروع ماجراجویی' : 'کلیک برای مطالعه'}
                  </div>
                  {/* Tooltip arrow */}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-black/90" />
                </div>
              </div>
            ))}
          </div>
          
          {/* Shelf number indicator */}
          <div className={`absolute top-2 right-4 px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm ${
            shelf.isInteractive 
              ? 'bg-purple-600/80 text-white' 
              : 'bg-amber-800/80 text-white'
          }`}>
            {shelf.isInteractive 
              ? `قفسه ۴: داستان‌های تعاملی (${interactiveBooks.length} کتاب)`
              : `قفسه ${shelfIndex + (interactiveBooks.length > 0 ? 0 : 1)}`
            }
          </div>
        </div>
      ))}
      
      {books.length === 0 && (
        <div className="text-center py-16">
          <BookOpen className="w-16 h-16 mx-auto mb-4 text-gray-400" />
          <p className="text-xl text-gray-300">هیچ کتابی یافت نشد</p>
          <p className="text-gray-400 mt-2">فیلترهای خود را تغییر دهید</p>
        </div>
      )}
    </div>
  );
};
