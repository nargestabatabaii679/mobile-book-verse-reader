
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
      className="group cursor-pointer transition-all duration-500 hover:scale-105 hover:shadow-2xl bg-white/95 backdrop-blur-sm border-gray-200 overflow-hidden rounded-lg"
      onClick={onClick}
      style={{
        boxShadow: '0 8px 32px rgba(0,0,0,0.12), 0 2px 6px rgba(0,0,0,0.08)'
      }}
    >
      <div className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
        {/* Book Cover with Realistic Styling */}
        <div className="relative p-4 pb-2">
          <div 
            className="relative mx-auto transition-transform duration-500 group-hover:scale-105"
            style={{
              width: '140px',
              height: '200px',
              background: `linear-gradient(135deg, #f8f9fa 0%, #e9ecef 20%, #f8f9fa 100%)`,
              borderRadius: '6px',
              boxShadow: `
                8px 0 0 -2px rgba(0,0,0,0.15),
                12px 0 0 -4px rgba(0,0,0,0.1),
                16px 0 0 -6px rgba(0,0,0,0.05),
                0 4px 20px rgba(0,0,0,0.2),
                inset 0 0 0 1px rgba(255,255,255,0.8),
                inset 8px 0 0 rgba(255,255,255,0.4)
              `,
              border: '1px solid rgba(0,0,0,0.1)'
            }}
          >
            {/* Book Cover Image */}
            <div className="absolute inset-1 rounded-md overflow-hidden">
              <img
                src={book.coverUrl}
                alt={book.title}
                className="w-full h-full object-cover"
                style={{
                  filter: 'saturate(1.1) contrast(1.05)'
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/10" />
            </div>
            
            {/* Book Spine Shadow */}
            <div 
              className="absolute top-0 right-0 bottom-0"
              style={{
                width: '8px',
                background: 'linear-gradient(90deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.6) 100%)',
                borderRadius: '0 6px 6px 0'
              }}
            />
            
            {/* Category Badge */}
            <Badge 
              className="absolute top-2 right-2 bg-blue-600/90 text-white text-xs px-2 py-1 shadow-lg backdrop-blur-sm border border-white/20"
              style={{
                fontSize: '10px',
                fontWeight: '600'
              }}
            >
              {book.category}
            </Badge>
            
            {/* Rating Badge */}
            <div className="absolute bottom-2 left-2 flex items-center bg-black/70 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm border border-white/20">
              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400 mr-1" />
              <span className="font-semibold">{book.rating}</span>
            </div>
          </div>
        </div>
        
        {/* Realistic Paper/Page Effect */}
        <div className="absolute bottom-16 left-6 right-6 h-1 bg-white rounded-full shadow-sm opacity-60" />
        <div className="absolute bottom-14 left-7 right-7 h-1 bg-gray-100 rounded-full shadow-sm opacity-40" />
      </div>
      
      <CardContent className="p-4 bg-white">
        <h3 className="font-bold text-gray-800 text-base mb-2 line-clamp-2 group-hover:text-blue-700 transition-colors leading-tight">
          {book.title}
        </h3>
        <p className="text-gray-600 text-sm mb-3 font-medium">{book.author}</p>
        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center bg-gray-50 px-2 py-1 rounded-full">
            <BookOpen className="w-3 h-3 mr-1 text-gray-400" />
            <span className="font-medium">{book.pages} صفحه</span>
          </div>
          <span className="bg-gray-50 px-2 py-1 rounded-full font-medium">{book.publishYear}</span>
        </div>
        
        {/* Page Quality Indicator */}
        <div className="mt-3 flex items-center justify-center">
          <div className="flex space-x-1 rtl:space-x-reverse">
            {[...Array(3)].map((_, i) => (
              <div 
                key={i}
                className="w-1 h-3 bg-gradient-to-b from-gray-300 to-gray-400 rounded-full shadow-sm"
                style={{ opacity: 0.6 + (i * 0.2) }}
              />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BookCard;
