import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Book } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Play, ChevronLeft, ChevronRight, Sparkles, BookOpen, Clock } from 'lucide-react';
import { useInteractiveStories } from '@/hooks/useInteractiveStories';

interface InteractiveShelfProps {
  books: Book[];
}

const InteractiveShelf: React.FC<InteractiveShelfProps> = ({ books }) => {
  const navigate = useNavigate();
  const scrollRef = useRef<HTMLDivElement>(null);
  const { data: interactiveStories = [], isLoading } = useInteractiveStories();

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  // Combine database stories with any book-based interactive stories
  const bookInteractiveStories = books.filter(book => 
    book.interactiveStoryId || book.category === 'داستان تعاملی'
  );

  const allInteractiveStories = [...interactiveStories, ...bookInteractiveStories];

  if (allInteractiveStories.length === 0 && !isLoading) {
    return null;
  }

  const getDifficultyColor = (level: string) => {
    switch (level) {
      case 'آسان': return 'bg-green-500';
      case 'متوسط': return 'bg-yellow-500';
      case 'سخت': return 'bg-red-500';
      default: return 'bg-blue-500';
    }
  };

  const getDifficultyIcon = (level: string) => {
    switch (level) {
      case 'آسان': return '⭐';
      case 'متوسط': return '⭐⭐';
      case 'سخت': return '⭐⭐⭐';
      default: return '⭐⭐';
    }
  };

  return (
    <section className="mb-8 relative">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Sparkles className="w-8 h-8 text-yellow-400 animate-pulse" />
          <h2 className="text-3xl font-bold text-white bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
            قفسه داستان‌های تعاملی
          </h2>
          <Sparkles className="w-8 h-8 text-yellow-400 animate-pulse" />
        </div>
        
        {/* Story Count Badge */}
        <span className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600/20 to-pink-600/20 text-white px-4 py-2 rounded-full text-sm backdrop-blur-sm border border-purple-300/30">
          <BookOpen className="w-4 h-4" />
          {allInteractiveStories.length} داستان تعاملی
        </span>
      </div>

      {/* Interactive Books Shelf */}
      <div className="relative">
        {/* Navigation Arrows */}
        {allInteractiveStories.length > 3 && (
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
          {isLoading ? (
            // Loading skeletons
            [...Array(4)].map((_, i) => (
              <div key={i} className="flex-shrink-0 w-56 h-72 bg-gradient-to-br from-purple-600/20 to-pink-600/20 backdrop-blur-sm border border-purple-300/30 rounded-lg animate-pulse" />
            ))
          ) : (
            allInteractiveStories.map((story) => {
              // Handle both database stories and book-based stories
              const isDbStory = 'difficulty_level' in story;
              const storyData = isDbStory ? {
                id: story.id,
                title: story.title,
                description: story.description,
                cover_url: story.cover_url,
                difficulty_level: story.difficulty_level,
                estimated_time: story.estimated_time,
                category: story.category,
                age_range: story.age_range
              } : {
                id: story.id,
                title: story.title,
                description: story.description,
                cover_url: story.coverUrl || story.cover,
                difficulty_level: 'متوسط',
                estimated_time: 20,
                category: story.category,
                age_range: story.ageRange
              };

              return (
                <Card
                  key={storyData.id}
                  className="flex-shrink-0 w-56 bg-gradient-to-br from-purple-600/20 to-pink-600/20 backdrop-blur-sm border-purple-300/30 hover:border-purple-300/50 transition-all duration-300 hover:scale-105 cursor-pointer group"
                >
                  <CardContent className="p-4">
                    <div className="relative mb-4">
                      <img
                        src={storyData.cover_url || '/placeholder.svg'}
                        alt={storyData.title}
                        className="w-full h-36 object-cover rounded-lg"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      {/* Interactive Badge */}
                      <div className="absolute top-2 right-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        تعاملی
                      </div>
                      
                      {/* Difficulty Badge */}
                      <div className={`absolute top-2 left-2 ${getDifficultyColor(storyData.difficulty_level)} text-white px-2 py-1 rounded-full text-xs font-bold`}>
                        {getDifficultyIcon(storyData.difficulty_level)} {storyData.difficulty_level}
                      </div>
                      
                      {/* Age Range */}
                      {storyData.age_range && (
                        <div className="absolute bottom-2 left-2 bg-black/70 text-white px-2 py-1 rounded-full text-xs">
                          {storyData.age_range}
                        </div>
                      )}
                    </div>
                    
                    <h3 className="text-white font-bold text-lg mb-2 line-clamp-2">
                      {storyData.title}
                    </h3>
                    
                    <p className="text-gray-300 text-sm mb-2">
                      دسته‌بندی: {storyData.category}
                    </p>
                    
                    <div className="flex items-center gap-4 mb-3 text-xs text-gray-300">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {storyData.estimated_time} دقیقه
                      </div>
                    </div>
                    
                    <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                      {storyData.description}
                    </p>

                    <Button
                      onClick={() => {
                        if (isDbStory) {
                          navigate(`/interactive/story/${story.id}`);
                        } else if (story.interactiveStoryId) {
                          navigate(`/interactive/${story.interactiveStoryId}`);
                        }
                      }}
                      className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 group"
                    >
                      <Play className="w-4 h-4 mr-2 group-hover:animate-pulse" />
                      شروع ماجراجویی
                    </Button>
                  </CardContent>
                </Card>
              );
            })
          )}
        </div>
      </div>

      {/* CSS for custom scrollbar */}
      <style>{`
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