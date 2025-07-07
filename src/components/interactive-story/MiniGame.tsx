import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Shuffle, Target, Zap } from 'lucide-react';

type GameType = 'memory' | 'riddle' | 'pattern' | 'word-guess';

interface MiniGameProps {
  type: GameType;
  onComplete: (success: boolean, score: number) => void;
  onSkip?: () => void;
}

const MemoryGame: React.FC<{ onComplete: (success: boolean, score: number) => void }> = ({ onComplete }) => {
  const [sequence, setSequence] = useState<number[]>([]);
  const [playerSequence, setPlayerSequence] = useState<number[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [showSequence, setShowSequence] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  const colors = ['bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500'];
  const emojis = ['🔥', '💧', '🌱', '⚡'];

  useEffect(() => {
    if (!gameStarted) {
      const newSequence = Array(4).fill(0).map(() => Math.floor(Math.random() * 4));
      setSequence(newSequence);
    }
  }, [gameStarted]);

  const startGame = () => {
    setGameStarted(true);
    setShowSequence(true);
    setTimeout(() => setShowSequence(false), 2500);
  };

  const handleColorClick = (colorIndex: number) => {
    if (showSequence) return;
    
    const newPlayerSequence = [...playerSequence, colorIndex];
    setPlayerSequence(newPlayerSequence);

    if (newPlayerSequence[currentStep] !== sequence[currentStep]) {
      onComplete(false, 0);
      return;
    }

    if (newPlayerSequence.length === sequence.length) {
      onComplete(true, 25);
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  return (
    <div className="text-center">
      <h3 className="text-lg font-bold mb-4 text-primary">🧠 بازی حافظه</h3>
      <p className="text-sm text-muted-foreground mb-4">
        {!gameStarted ? 'دنباله رنگ‌ها را به خاطر بسپارید!' : 
         showSequence ? 'دنباله را یاد بگیرید...' : 'دنباله را تکرار کنید!'}
      </p>
      
      {!gameStarted ? (
        <Button onClick={startGame} className="mb-4">شروع بازی</Button>
      ) : (
        <div className="grid grid-cols-2 gap-3 mb-4">
          {colors.map((color, index) => (
            <motion.button
              key={index}
              className={`w-16 h-16 rounded-lg ${color} flex items-center justify-center text-2xl ${
                showSequence && sequence.includes(index) ? 'ring-4 ring-white' : ''
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleColorClick(index)}
              animate={showSequence && sequence[Math.floor((Date.now() / 500) % sequence.length)] === index ? 
                { scale: [1, 1.1, 1] } : {}}
              transition={{ duration: 0.5 }}
            >
              {emojis[index]}
            </motion.button>
          ))}
        </div>
      )}
    </div>
  );
};

const RiddleGame: React.FC<{ onComplete: (success: boolean, score: number) => void }> = ({ onComplete }) => {
  const [answer, setAnswer] = useState('');
  const riddles = [
    { question: 'چیزی که همیشه جلو روی تو است اما نمی‌توانی آن را ببینی؟', answer: 'آینده' },
    { question: 'چیزی که هرچه بیشتر از آن بگیری، بزرگتر می‌شود؟', answer: 'چاله' },
    { question: 'چیزی که آب دارد اما نمی‌تواند بنوشد؟', answer: 'رودخانه' }
  ];
  const [currentRiddle] = useState(riddles[Math.floor(Math.random() * riddles.length)]);

  const checkAnswer = () => {
    const isCorrect = answer.trim().toLowerCase() === currentRiddle.answer.toLowerCase();
    onComplete(isCorrect, isCorrect ? 30 : 0);
  };

  return (
    <div className="text-center">
      <h3 className="text-lg font-bold mb-4 text-primary">🧩 معما</h3>
      <div className="bg-secondary/50 p-4 rounded-lg mb-4">
        <p className="text-sm">{currentRiddle.question}</p>
      </div>
      <div className="flex gap-2">
        <Input
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="پاسخ شما..."
          onKeyPress={(e) => e.key === 'Enter' && checkAnswer()}
        />
        <Button onClick={checkAnswer}>تایید</Button>
      </div>
    </div>
  );
};

export const MiniGame: React.FC<MiniGameProps> = ({ type, onComplete, onSkip }) => {
  const [timeLeft, setTimeLeft] = useState(60);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          onComplete(false, 0);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onComplete]);

  const renderGame = () => {
    switch (type) {
      case 'memory':
        return <MemoryGame onComplete={onComplete} />;
      case 'riddle':
        return <RiddleGame onComplete={onComplete} />;
      default:
        return <div>بازی در حال بارگیری...</div>;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
    >
      <Card className="w-full max-w-md mx-4 bg-card/95 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-4">
            <Badge variant="secondary" className="flex items-center gap-1">
              <Target className="w-3 h-3" />
              مینی گیم
            </Badge>
            <Badge variant={timeLeft > 30 ? 'default' : 'destructive'}>
              ⏰ {timeLeft}s
            </Badge>
          </div>
          
          {renderGame()}
          
          {onSkip && (
            <div className="mt-4 pt-4 border-t">
              <Button variant="outline" onClick={onSkip} className="w-full">
                رد کردن (-10 امتیاز)
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};