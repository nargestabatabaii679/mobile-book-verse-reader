
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Book } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, BookOpen } from 'lucide-react';

interface BookCardProps {
  book: Book;
  onClick: () => void;
}

const BookCard: React.FC<BookCardProps> = ({ book, onClick }) => {
  const { t } = useTranslation();

  return (
    <Card 
      className="group cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl bg-white/10 backdrop-blur-sm border-white/20 overflow-hidden"
      onClick={onClick}
    >
      <div className="relative overflow-hidden">
        <img
          src={book.coverUrl}
          alt={book.title}
          className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <Badge className="absolute top-2 right-2 bg-blue-500/80 text-white">
          {book.category}
        </Badge>
        <div className="absolute bottom-2 left-2 flex items-center text-white text-sm">
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
          {book.rating}
        </div>
      </div>
      
      <CardContent className="p-4">
        <h3 className="font-semibold text-white text-lg mb-1 line-clamp-2 group-hover:text-blue-300 transition-colors">
          {book.title}
        </h3>
        <p className="text-gray-300 text-sm mb-2">{book.author}</p>
        <div className="flex items-center justify-between text-xs text-gray-400">
          <div className="flex items-center">
            <BookOpen className="w-3 h-3 mr-1" />
            {book.pages} {t('pages')}
          </div>
          <span>{book.publishYear}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default BookCard;
