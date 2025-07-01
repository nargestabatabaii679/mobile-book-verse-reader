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
    <Card className="bg-gray-50 border-gray-300">
      <CardContent className="p-4">
        <h3 className="font-bold mb-2 text-center">نقشه خانه را بکشید!</h3>
        <p className="text-center text-sm text-gray-600 mb-2">
          با انگشت یا ماوس نقشه‌ای از خانه بکشید
        </p>
        <div className="flex justify-center mb-2">
          <canvas
            ref={canvasRef}
            width={400}
            height={200}
            className="border border-gray-400 rounded cursor-crosshair bg-white"
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={() => setIsDrawing(false)}
            onMouseLeave={() => setIsDrawing(false)}
          />
        </div>
        <div className="flex justify-center gap-2">
          <Button variant="destructive" size="sm" onClick={clearCanvas}>
            پاک کردن
          </Button>
          <Button variant="default" size="sm" onClick={submitDrawing}>
            تأیید نقشه
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};