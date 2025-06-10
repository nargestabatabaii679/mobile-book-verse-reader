
import React, { useState } from 'react';
import { Book } from '@/types';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { BookOpen, Grid3X3, FileText } from 'lucide-react';

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
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'pdf'>('grid');

  const handleBookClick = (book: Book) => {
    setSelectedBook(book);
    onSelectBook(book);
  };

  const handleViewModeChange = (mode: 'grid' | 'pdf') => {
    setViewMode(mode);
    if (selectedBook) {
      onSelectBook(selectedBook);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-8">
        {[...Array(3)].map((_, shelfIndex) => (
          <div key={shelfIndex} className="relative">
            <Skeleton className="h-64 w-full bg-gradient-to-r from-amber-900/20 to-amber-700/20" />
          </div>
        ))}
      </div>
    );
  }

  // Group books into shelves (4 books per shelf)
  const shelves = [];
  for (let i = 0; i < books.length; i += 4) {
    shelves.push(books.slice(i, i + 4));
  }

  return (
    <div className="space-y-8">
      {/* View Mode Selection */}
      {selectedBook && (
        <div className="flex justify-center gap-2 mb-6">
          <Button
            onClick={() => handleViewModeChange('grid')}
            variant={viewMode === 'grid' ? 'default' : 'outline'}
            className="flex items-center gap-2"
          >
            <Grid3X3 className="w-4 h-4" />
            نمای شبکه‌ای
          </Button>
          <Button
            onClick={() => handleViewModeChange('pdf')}
            variant={viewMode === 'pdf' ? 'default' : 'outline'}
            className="flex items-center gap-2"
          >
            <FileText className="w-4 h-4" />
            نمای PDF
          </Button>
        </div>
      )}

      {shelves.map((shelf, shelfIndex) => (
        <div key={shelfIndex} className="relative">
          {/* Wooden shelf background */}
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
          
          {/* Books on shelf */}
          <div className="relative z-10 flex justify-center items-end h-64 px-8 pb-4">
            {shelf.map((book, bookIndex) => (
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
                    background: `linear-gradient(90deg, 
                      hsl(${bookIndex * 60 + shelfIndex * 30}, 70%, 45%) 0%,
                      hsl(${bookIndex * 60 + shelfIndex * 30}, 70%, 55%) 50%,
                      hsl(${bookIndex * 60 + shelfIndex * 30}, 70%, 40%) 100%)`,
                    borderRadius: '2px 2px 0 0',
                    boxShadow: `
                      2px 0 4px rgba(0,0,0,0.3),
                      inset 2px 0 2px rgba(255,255,255,0.2),
                      inset -2px 0 2px rgba(0,0,0,0.2)
                    `,
                  }}
                >
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
                    <BookOpen className="w-3 h-3" />
                    کلیک برای مطالعه
                  </div>
                  {/* Tooltip arrow */}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-black/90" />
                </div>
              </div>
            ))}
          </div>
          
          {/* Shelf number indicator */}
          <div className="absolute top-2 right-4 bg-amber-800/80 text-white px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm">
            قفسه {shelfIndex + 1}
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
