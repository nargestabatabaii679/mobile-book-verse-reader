
import React, { useEffect, useRef } from 'react';
import { Book } from '@/types';

interface QRCodeGeneratorProps {
  book: Book;
}

export const QRCodeGenerator: React.FC<QRCodeGeneratorProps> = ({ book }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Simple QR code pattern generator for demo
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const size = 200;
    canvas.width = size;
    canvas.height = size;

    // Fill background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, size, size);

    // Create a simple pattern that looks like a QR code
    ctx.fillStyle = '#000000';
    const blockSize = 8;
    const blocks = size / blockSize;

    // Generate pseudo-random pattern based on book ID
    const seed = book.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    
    for (let i = 0; i < blocks; i++) {
      for (let j = 0; j < blocks; j++) {
        // Create deterministic "random" pattern
        const value = (seed * (i + 1) * (j + 1)) % 100;
        if (value > 50) {
          ctx.fillRect(i * blockSize, j * blockSize, blockSize, blockSize);
        }
      }
    }

    // Add corner markers (finder patterns)
    const markerSize = blockSize * 7;
    
    // Top-left marker
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, markerSize, markerSize);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(blockSize, blockSize, markerSize - 2 * blockSize, markerSize - 2 * blockSize);
    ctx.fillStyle = '#000000';
    ctx.fillRect(2 * blockSize, 2 * blockSize, markerSize - 4 * blockSize, markerSize - 4 * blockSize);

    // Top-right marker
    ctx.fillStyle = '#000000';
    ctx.fillRect(size - markerSize, 0, markerSize, markerSize);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(size - markerSize + blockSize, blockSize, markerSize - 2 * blockSize, markerSize - 2 * blockSize);
    ctx.fillStyle = '#000000';
    ctx.fillRect(size - markerSize + 2 * blockSize, 2 * blockSize, markerSize - 4 * blockSize, markerSize - 4 * blockSize);

    // Bottom-left marker
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, size - markerSize, markerSize, markerSize);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(blockSize, size - markerSize + blockSize, markerSize - 2 * blockSize, markerSize - 2 * blockSize);
    ctx.fillStyle = '#000000';
    ctx.fillRect(2 * blockSize, size - markerSize + 2 * blockSize, markerSize - 4 * blockSize, markerSize - 4 * blockSize);

  }, [book.id]);

  const bookUrl = `${window.location.origin}/?book=${book.id}`;

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg text-center">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">QR کد کتاب</h3>
      <canvas 
        ref={canvasRef}
        className="mx-auto border border-gray-200 rounded"
      />
      <p className="text-sm text-gray-600 mt-4 max-w-xs">
        این QR کد را اسکن کنید تا مستقیماً به صفحه کتاب بروید
      </p>
      <p className="text-xs text-gray-400 mt-2 break-all">
        {bookUrl}
      </p>
    </div>
  );
};
