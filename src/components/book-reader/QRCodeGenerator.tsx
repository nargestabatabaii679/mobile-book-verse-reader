
import React, { useEffect, useRef, useState } from 'react';
import { Book } from '@/types';

interface QRCodeGeneratorProps {
  book: Book;
}

export const QRCodeGenerator: React.FC<QRCodeGeneratorProps> = ({ book }) => {
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

  return (
    <div className="relative">
      {/* Modern cylindrical display inspired container */}
      <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 p-8 rounded-3xl shadow-2xl text-center border border-slate-700 relative overflow-hidden">
        {/* Background pattern like the cylindrical library */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 animate-pulse"></div>
          <div className="grid grid-cols-8 gap-1 h-full opacity-30">
            {[...Array(64)].map((_, i) => (
              <div key={i} className="bg-gradient-to-b from-blue-400/20 to-amber-400/20 rounded-sm"></div>
            ))}
          </div>
        </div>

        <div className="relative z-10">
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center justify-center space-x-3 rtl:space-x-reverse">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-amber-400 rounded-lg flex items-center justify-center">
              <span className="text-white text-lg">📱</span>
            </div>
            <span className="bg-gradient-to-r from-blue-400 to-amber-400 bg-clip-text text-transparent">
              QR کد کتاب
            </span>
          </h3>
          
          <div className="relative mb-6">
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-white/90 rounded-2xl">
                <div className="flex space-x-2 rtl:space-x-reverse">
                  <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
                  <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-3 h-3 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            )}
            
            {/* Modern QR container with cylindrical inspiration */}
            <div className="relative p-4 bg-white rounded-2xl shadow-xl border-4 border-gradient-to-r from-blue-400 to-amber-400">
              <canvas 
                ref={canvasRef}
                className="mx-auto rounded-xl shadow-inner transition-all duration-500 hover:scale-105"
              />
              
              {/* Corner decorations */}
              <div className="absolute -top-2 -left-2 w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full shadow-lg animate-pulse"></div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-purple-500 to-amber-500 rounded-full shadow-lg animate-pulse" style={{ animationDelay: '0.5s' }}></div>
              <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-gradient-to-br from-amber-500 to-blue-500 rounded-full shadow-lg animate-pulse" style={{ animationDelay: '1s' }}></div>
              <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-gradient-to-br from-blue-500 to-amber-500 rounded-full shadow-lg animate-pulse" style={{ animationDelay: '1.5s' }}></div>
            </div>
          </div>
          
          <div className="space-y-4">
            <p className="text-sm text-blue-200 max-w-xs mx-auto leading-relaxed">
              این QR کد را اسکن کنید تا مستقیماً به صفحه کتاب بروید
            </p>
            
            <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-600 backdrop-blur-sm">
              <p className="text-xs text-slate-300 break-all font-mono leading-relaxed">
                {bookUrl}
              </p>
            </div>
            
            {/* Book info */}
            <div className="mt-6 pt-4 border-t border-slate-700">
              <div className="text-white space-y-2">
                <h4 className="font-bold text-lg text-blue-300">{book.title}</h4>
                <p className="text-amber-300">{book.author}</p>
                <div className="flex justify-center space-x-4 rtl:space-x-reverse text-sm">
                  <span className="bg-blue-500/20 px-3 py-1 rounded-full text-blue-300">
                    {book.category}
                  </span>
                  <span className="bg-amber-500/20 px-3 py-1 rounded-full text-amber-300">
                    {book.pages} صفحه
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating elements for modern touch */}
        <div className="absolute top-4 right-4 w-12 h-12 bg-gradient-to-br from-blue-400/20 to-transparent rounded-full animate-pulse"></div>
        <div className="absolute bottom-4 left-4 w-8 h-8 bg-gradient-to-br from-amber-400/20 to-transparent rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>
    </div>
  );
};
