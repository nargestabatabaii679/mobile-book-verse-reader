import React, { useRef, useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface DrawingCanvasProps {
  onSubmit: () => void;
  onPlaySound: (sound: string) => void;
}

export const DrawingCanvas: React.FC<DrawingCanvasProps> = ({ onSubmit, onPlaySound }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    setupCanvas();
  }, []);

  const setupCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#000';
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;
    
    const rect = canvas.getBoundingClientRect();
    ctx.beginPath();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;
    
    const rect = canvas.getBoundingClientRect();
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.stroke();
  };

  const submitDrawing = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const hasDrawing = imageData.data.some(channel => channel !== 0);
    
    if (hasDrawing) {
      onPlaySound('victory');
      onSubmit();
    }
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  return (
    <Card className="bg-gradient-to-br from-purple-50 to-pink-100 dark:from-purple-900 dark:to-pink-900 border-2 border-purple-300 dark:border-purple-700 story-glow animate-bounce-in">
      <CardContent className="p-6">
        <div className="text-center mb-4">
          <div className="text-4xl mb-2 animate-pulse">🎨</div>
          <h3 className="font-bold text-lg mb-2 text-purple-800 dark:text-purple-200">
            نقشه خانه جادویی را بکشید!
          </h3>
          <p className="text-center text-sm text-purple-600 dark:text-purple-300 mb-4">
            با انگشت یا ماوس نقشه‌ای از خانه بکشید تا راز آن کشف شود
          </p>
        </div>
        <div className="flex justify-center mb-4">
          <div className="relative">
            <canvas
              ref={canvasRef}
              width={400}
              height={200}
              className="border-2 border-purple-400 dark:border-purple-600 rounded-lg cursor-crosshair bg-white dark:bg-slate-800 shadow-lg story-glow"
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={() => setIsDrawing(false)}
              onMouseLeave={() => setIsDrawing(false)}
            />
            <div className="absolute -top-2 -right-2 text-2xl animate-bounce">🖌️</div>
          </div>
        </div>
        <div className="flex justify-center gap-3">
          <Button 
            variant="destructive" 
            size="sm" 
            onClick={clearCanvas}
            className="bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 transition-all duration-300 hover:scale-105"
          >
            🗑️ پاک کردن
          </Button>
          <Button 
            variant="default" 
            size="sm" 
            onClick={submitDrawing}
            className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white transition-all duration-300 hover:scale-105"
          >
            ✅ تأیید نقشه
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};