import React, { useEffect, useRef, useState } from 'react';
import { Book } from '@/types';
import { Button } from '@/components/ui/button';
import { Share2 } from 'lucide-react';
import BookDownloader from './BookDownloader';

interface QRCodeGeneratorProps {
  book: Book;
}

const QRCodeGenerator: React.FC<QRCodeGeneratorProps> = ({ book }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    setIsLoading(true);

    // Enhanced QR code pattern generator with modern design
    const size = 240;
    canvas.width = size;
    canvas.height = size;

    // Create modern gradient background
    const gradient = ctx.createLinearGradient(0, 0, size, size);
    gradient.addColorStop(0, '#f8fafc');
    gradient.addColorStop(1, '#e2e8f0');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);

    // Add subtle grid background
    ctx.strokeStyle = '#f1f5f9';
    ctx.lineWidth = 0.5;
    for (let i = 0; i < size; i += 8) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, size);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(size, i);
      ctx.stroke();
    }

    // Create enhanced QR pattern
    ctx.fillStyle = '#1e293b';
    const blockSize = 8;
    const blocks = size / blockSize;

    // Generate deterministic pattern based on book data
    const seed = (book.id + book.title + book.author).split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    
    for (let i = 0; i < blocks; i++) {
      for (let j = 0; j < blocks; j++) {
        const value = (seed * (i + 1) * (j + 1) + i * j) % 100;
        if (value > 45) {
          // Add rounded corners for modern look
          const x = i * blockSize;
          const y = j * blockSize;
          ctx.beginPath();
          ctx.roundRect(x + 0.5, y + 0.5, blockSize - 1, blockSize - 1, 1);
          ctx.fill();
        }
      }
    }

    // Enhanced corner markers with modern styling
    const markerSize = blockSize * 7;
    const cornerRadius = 4;
    
    // Function to draw modern finder pattern
    const drawFinderPattern = (x: number, y: number) => {
      // Outer square
      ctx.fillStyle = '#1e293b';
      ctx.beginPath();
      ctx.roundRect(x, y, markerSize, markerSize, cornerRadius);
      ctx.fill();
      
      // Inner white square
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.roundRect(x + blockSize, y + blockSize, markerSize - 2 * blockSize, markerSize - 2 * blockSize, cornerRadius - 1);
      ctx.fill();
      
      // Center square with gradient
      const centerGradient = ctx.createLinearGradient(x + 2 * blockSize, y + 2 * blockSize, x + markerSize - 2 * blockSize, y + markerSize - 2 * blockSize);
      centerGradient.addColorStop(0, '#3b82f6');
      centerGradient.addColorStop(1, '#1e40af');
      ctx.fillStyle = centerGradient;
      ctx.beginPath();
      ctx.roundRect(x + 2 * blockSize, y + 2 * blockSize, markerSize - 4 * blockSize, markerSize - 4 * blockSize, cornerRadius - 2);
      ctx.fill();
    };

    // Draw finder patterns
    drawFinderPattern(0, 0); // Top-left
    drawFinderPattern(size - markerSize, 0); // Top-right
    drawFinderPattern(0, size - markerSize); // Bottom-left

    // Add modern decorative elements
    const centerX = size / 2;
    const centerY = size / 2;
    
    // Central decorative circle
    const decorativeGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 20);
    decorativeGradient.addColorStop(0, 'rgba(59, 130, 246, 0.3)');
    decorativeGradient.addColorStop(1, 'rgba(59, 130, 246, 0.1)');
    ctx.fillStyle = decorativeGradient;
    ctx.beginPath();
    ctx.arc(centerX, centerY, 16, 0, 2 * Math.PI);
    ctx.fill();

    // Add subtle border
    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(2, 2, size - 4, size - 4, 8);
    ctx.stroke();

    setTimeout(() => setIsLoading(false), 500);
  }, [book]);

  const bookUrl = `${window.location.origin}/?book=${book.id}`;

  const shareBook = async () => {
    const bookUrl = `${window.location.origin}?book=${encodeURIComponent(book.title)}`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: book.title,
          text: `کتاب "${book.title}" نوشته ${book.author}`,
          url: bookUrl,
        });
      } catch (error) {
        console.log('Error sharing:', error);
        copyToClipboard(bookUrl);
      }
    } else {
      copyToClipboard(bookUrl);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      alert('لینک کپی شد!');
    });
  };

  return (
    <div className="flex flex-col gap-3 p-4 bg-gray-50 rounded-lg">
      <h3 className="text-lg font-semibold text-gray-800 mb-2">اشتراک‌گذاری و دانلود</h3>
      
      <div className="flex gap-2 flex-wrap">
        <Button 
          onClick={shareBook}
          className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
        >
          <Share2 className="h-4 w-4" />
          اشتراک‌گذاری
        </Button>
        
        <BookDownloader book={book} />
      </div>
      
      <p className="text-sm text-gray-600 mt-2">
        با دانلود، فایل کتاب همراه با آیکون آن ذخیره می‌شود
      </p>
    </div>
  );
};

export default QRCodeGenerator;
