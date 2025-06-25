
import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Book } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Play, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

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

  const interactiveBooks = books.filter(book => book.interactiveStoryId);

  if (interactiveBooks.length === 0) {
    return null;
  }

  return (
    <section className="mb-8 relative">
      {/* Header */}
      <div className="flex items-center justify-center gap-3 mb-6">
        <Sparkles className="w-8 h-8 text-yellow-400" />
        <h2 className="text-3xl font-bold text-white text-center bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
          📚 کتاب‌های تعاملی
        </h2>
        <Sparkles className="w-8 h-8 text-yellow-400" />
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
                  <div className="absolute top-2 right-2 bg-yellow-500 text-black px-2 py-1 rounded-full text-xs font-bold">
                    تعاملی
                  </div>
                </div>
                
                <h3 className="text-white font-bold text-lg mb-2 line-clamp-2">
                  {book.title}
                </h3>
                
                <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                  {book.description}
                </p>

                <Button
                  onClick={() => navigate(`/interactive/${book.interactiveStoryId}`)}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 group"
                >
                  <Play className="w-4 h-4 mr-2 group-hover:animate-pulse" />
                  شروع ماجراجویی
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Story Count Badge */}
        <div className="text-center mt-4">
          <span className="inline-flex items-center gap-2 bg-white/10 text-white px-4 py-2 rounded-full text-sm backdrop-blur-sm border border-white/20">
            <Sparkles className="w-4 h-4" />
            {interactiveBooks.length} داستان تعاملی موجود
          </span>
        </div>
      </div>
    </section>
  );
};

export default InteractiveShelf;
