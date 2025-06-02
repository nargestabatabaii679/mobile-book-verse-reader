
import React from 'react';
import { Book } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BookOpen, Star } from 'lucide-react';

interface BookCardProps {
  book: Book;
  onSelect: (book: Book) => void;
}

const BookCard: React.FC<BookCardProps> = ({ book, onSelect }) => {
  return (
    <Card className="group relative overflow-hidden bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25">
      <div className="relative overflow-hidden">
        <img
          src={book.coverUrl}
          alt={book.title}
          className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Rating badge */}
        <div className="absolute top-3 right-3">
          <Badge className="bg-amber-500/90 text-white border-0 backdrop-blur-sm">
            <Star className="w-3 h-3 mr-1" />
            {book.rating}
          </Badge>
        </div>
        
        {/* Age range badge */}
        <div className="absolute top-3 left-3">
          <Badge variant="secondary" className="bg-blue-500/90 text-white border-0 backdrop-blur-sm">
            {book.ageRange}
          </Badge>
        </div>

        {/* Hover overlay with read button */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button
            onClick={() => onSelect(book)}
            className="bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-white/30 hover:scale-110 transition-all duration-300 shadow-xl"
          >
            <BookOpen className="w-4 h-4 mr-2" />
            مطالعه کتاب
          </Button>
        </div>
      </div>
      
      <CardContent className="p-4 text-white">
        <div className="space-y-3">
          <div>
            <h3 className="font-bold text-lg leading-tight line-clamp-2 group-hover:text-blue-300 transition-colors duration-300">
              {book.title}
            </h3>
            <p className="text-blue-200 text-sm mt-1">{book.author}</p>
          </div>
          
          <div className="flex items-center justify-between">
            <Badge variant="outline" className="border-blue-300 text-blue-300 bg-blue-500/10">
              {book.category}
            </Badge>
            <span className="text-xs text-gray-300">
              {book.pages} صفحه
            </span>
          </div>
          
          <p className="text-gray-300 text-sm line-clamp-2 leading-relaxed">
            {book.description}
          </p>
          
          <div className="flex items-center justify-between pt-2 border-t border-white/10">
            <span className="text-xs text-gray-400">
              انتشار: {book.publishYear}
            </span>
            <div className="flex items-center space-x-1 rtl:space-x-reverse">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3 h-3 ${
                    i < book.rating
                      ? 'text-amber-400 fill-amber-400'
                      : 'text-gray-600'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BookCard;
