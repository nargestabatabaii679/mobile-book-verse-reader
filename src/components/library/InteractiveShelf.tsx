
import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Book } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Play, ChevronLeft, ChevronRight, Sparkles, BookOpen } from 'lucide-react';

interface InteractiveShelfProps {
  books: Book[];
}

const InteractiveShelf: React.FC<InteractiveShelfProps> = ({ books }) => {
  const navigate = useNavigate();
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  // Filter books that have interactiveStoryId OR are in the interactive category
  const interactiveBooks = books.filter(book => 
    book.interactiveStoryId || book.category === 'داستان تعاملی'
  );

  if (interactiveBooks.length === 0) {
    return null;
  }

  return (
    <section className="mb-8 relative">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Sparkles className="w-8 h-8 text-yellow-400 animate-pulse" />
          <h2 className="text-3xl font-bold text-white bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
            قفسه ۴: داستان‌های تعاملی
          </h2>
          <Sparkles className="w-8 h-8 text-yellow-400 animate-pulse" />
        </div>
        
        {/* Story Count Badge */}
        <span className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600/20 to-pink-600/20 text-white px-4 py-2 rounded-full text-sm backdrop-blur-sm border border-purple-300/30">
          <BookOpen className="w-4 h-4" />
          {interactiveBooks.length} داستان تعاملی
        </span>
      </div>

      {/* Interactive Books Shelf */}
      <div className="relative">
        {/* Navigation Arrows */}
        {interactiveBooks.length > 3 && (
          <>
            <Button
              onClick={() => scroll('left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/30 text-white border-white/30 rounded-full w-12 h-12 p-0"
              variant="outline"
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>
            <Button
              onClick={() => scroll('right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/30 text-white border-white/30 rounded-full w-12 h-12 p-0"
              variant="outline"
            >
              <ChevronRight className="w-6 h-6" />
            </Button>
          </>
        )}

        {/* Books Container */}
        <div
          ref={scrollRef}
          className="interactive-shelf-scroll flex gap-4 overflow-x-auto pb-4 px-12"
          style={{ scrollbarWidth: 'thin' }}
        >
          {interactiveBooks.map((book) => (
            <Card
              key={book.id}
              className="flex-shrink-0 w-64 bg-gradient-to-br from-purple-600/20 to-pink-600/20 backdrop-blur-sm border-purple-300/30 hover:border-purple-300/50 transition-all duration-300 hover:scale-105 cursor-pointer group"
            >
              <CardContent className="p-4">
                <div className="relative mb-4">
                  <img
                    src={book.coverUrl || book.cover || '/placeholder.svg'}
                    alt={book.title}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute top-2 right-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    تعاملی
                  </div>
                  {book.ageRange && (
                    <div className="absolute top-2 left-2 bg-black/70 text-white px-2 py-1 rounded-full text-xs">
                      {book.ageRange}
                    </div>
                  )}
                </div>
                
                <h3 className="text-white font-bold text-lg mb-2 line-clamp-2">
                  {book.title}
                </h3>
                
                <p className="text-gray-300 text-sm mb-2">
                  نویسنده: {book.author}
                </p>
                
                <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                  {book.description}
                </p>

                <Button
                  onClick={() => {
                    if (book.interactiveStoryId) {
                      navigate(`/interactive/${book.interactiveStoryId}`);
                    } else {
                      // If no interactive story ID, show a message or handle differently
                      console.log('کتاب تعاملی بدون شناسه داستان:', book.title);
                    }
                  }}
                  disabled={!book.interactiveStoryId}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Play className="w-4 h-4 mr-2 group-hover:animate-pulse" />
                  {book.interactiveStoryId ? 'شروع ماجراجویی' : 'به زودی...'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* CSS for custom scrollbar */}
      <style jsx>{`
        .interactive-shelf-scroll::-webkit-scrollbar {
          height: 6px;
        }
        .interactive-shelf-scroll::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 3px;
        }
        .interactive-shelf-scroll::-webkit-scrollbar-thumb {
          background: linear-gradient(90deg, #9333ea, #ec4899);
          border-radius: 3px;
        }
        .interactive-shelf-scroll::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(90deg, #7c3aed, #db2777);
        }
      `}</style>
    </section>
  );
};

export default InteractiveShelf;
