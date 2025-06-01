
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Book } from '@/types';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Star, BookOpen, Calendar, Hash } from 'lucide-react';

interface BookDetailModalProps {
  book: Book | null;
  isOpen: boolean;
  onClose: () => void;
}

const BookDetailModal: React.FC<BookDetailModalProps> = ({ book, isOpen, onClose }) => {
  const { t } = useTranslation();

  if (!book) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-gray-900/95 border-gray-700">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-white">
            {book.title}
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Book Cover */}
          <div className="md:col-span-1">
            <img
              src={book.coverUrl}
              alt={book.title}
              className="w-full h-96 object-cover rounded-lg shadow-lg"
            />
          </div>
          
          {/* Book Details */}
          <div className="md:col-span-2 space-y-4">
            <div>
              <Badge className="bg-blue-500/20 text-blue-300 mb-4">
                {book.category}
              </Badge>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center text-gray-300">
                  <span className="font-semibold mr-2">{t('author')}:</span>
                  {book.author}
                </div>
                
                <div className="flex items-center text-gray-300">
                  <BookOpen className="w-4 h-4 mr-2" />
                  <span className="font-semibold mr-2">{t('pages')}:</span>
                  {book.pages}
                </div>
                
                <div className="flex items-center text-gray-300">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span className="font-semibold mr-2">{t('published')}:</span>
                  {book.publishYear}
                </div>
                
                <div className="flex items-center text-gray-300">
                  <Star className="w-4 h-4 mr-2 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold mr-2">{t('rating')}:</span>
                  {book.rating}/5
                </div>
              </div>
              
              <div className="mb-6">
                <div className="flex items-center text-gray-300 mb-2">
                  <Hash className="w-4 h-4 mr-2" />
                  <span className="font-semibold mr-2">{t('isbn')}:</span>
                  {book.isbn}
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-white mb-3">
                {t('description')}
              </h4>
              <p className="text-gray-300 leading-relaxed">
                {book.description}
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BookDetailModal;
