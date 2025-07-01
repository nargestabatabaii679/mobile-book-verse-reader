import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MathPuzzle } from './MathPuzzle';
import { DrawingCanvas } from './DrawingCanvas';
import { StoryDisplay } from './StoryDisplay';
import { useAudio } from './useAudio';

interface StoryNode {
  text: string;
  choices: Array<{
    text: string;
    next: string;
    score: number;
    sound?: string;
  }>;
  special?: 'math' | 'drawing';
  sound?: string;
  end?: boolean;
}

interface StoryState {
  currentNode: string;
  score: number;
  gameStarted: boolean;
}

const storyNodes: Record<string, StoryNode> = {
  start: {
    text: "تو وارد یک خانه تسخیرشده شده‌ای. صدایی عجیب از طبقه بالا می‌شنوی و دری در زیرزمین باز است. به کجا می‌روی؟",
    choices: [
      { text: "طبقه بالا", next: "upstairs", score: 10, sound: "footsteps" },
      { text: "زیرزمین", next: "basement", score: 5, sound: "door-creak" }
    ]
  },
  upstairs: {
    text: "یک کتاب جادویی پیدا می‌کنی. کتاب قفل دارد و باید رمز ریاضی آن را حل کنی!",
    choices: [],
    special: "math",
    sound: "mystery"
  },
  basement: {
    text: "یک صندوق قفل‌شده می‌بینی. برای بازکردن آن، باید نقشه‌ای از خانه بکشی تا راه مخفی را پیدا کنی.",
    choices: [],
    special: "drawing",
    sound: "echo"
  },
  mathSolved: {
    text: "کتاب باز شد! آیا آن را می‌خوانی یا به دنبال صاحبش می‌گردی؟",
    choices: [
      { text: "خواندن کتاب", next: "book", score: 15, sound: "page-flip" },
      { text: "جست‌وجوی صاحب", next: "escape", score: 5, sound: "footsteps" }
    ]
  },
  drawingDone: {
    text: "نقشه تو راه مخفی را نشان داد! حالا می‌توانی صندوق را باز کنی یا به بالا بازگردی.",
    choices: [
      { text: "بازکردن صندوق", next: "chest", score: 20, sound: "chest-open" },
      { text: "بازگشت به بالا", next: "escape", score: 10, sound: "footsteps" }
    ]
  },
  book: {
    text: "کتاب نفرین را آزاد کرد، اما راز خانه را کشف کردی! برنده شدی!",
    choices: [],
    end: true,
    sound: "victory"
  },
  chest: {
    text: "صندوق حاوی مدارک قدیمی بود که راز خانه را فاش کرد! برنده شدی!",
    choices: [],
    end: true,
    sound: "victory"
  },
  escape: {
    text: "از خانه فرار کردی، اما راز آن را کشف نکردی. پایان داستان.",
    choices: [],
    end: true,
    sound: "escape"
  }
};

export const HauntedHouseStory: React.FC = () => {
  const [state, setState] = useState<StoryState>({
    currentNode: 'start',
    score: 0,
    gameStarted: false
  });
  
  const [showMath, setShowMath] = useState(false);
  const [showDrawing, setShowDrawing] = useState(false);
  
  const { backgroundMusicRef, playBackgroundMusic, playStorySound } = useAudio();

  useEffect(() => {
    const node = storyNodes[state.currentNode];
    
    if (node.sound) {
      setTimeout(() => playStorySound(node.sound!), 500);
    }
    
    if (node.special === 'math') {
      setShowMath(true);
      setShowDrawing(false);
    } else if (node.special === 'drawing') {
      setShowDrawing(true);
      setShowMath(false);
    } else {
      setShowMath(false);
      setShowDrawing(false);
    }
  }, [state.currentNode]);

  const startGame = () => {
    setState(prev => ({ ...prev, gameStarted: true }));
    playBackgroundMusic();
  };

  const handleChoice = (choice: any) => {
    if (choice.sound) {
      playStorySound(choice.sound);
    }
    
    setState(prev => ({
      ...prev,
      score: prev.score + choice.score,
      currentNode: choice.next
    }));
  };

  const handleMathSolved = () => {
    setState(prev => ({
      ...prev,
      score: prev.score + 15,
      currentNode: 'mathSolved'
    }));
  };

  const handleDrawingSubmitted = () => {
    setState(prev => ({
      ...prev,
      score: prev.score + 20,
      currentNode: 'drawingDone'
    }));
  };

  const restartGame = () => {
    setState({
      currentNode: 'start',
      score: 0,
      gameStarted: true
    });
    setShowMath(false);
    setShowDrawing(false);
  };

  const currentStoryNode = storyNodes[state.currentNode];

  if (!state.gameStarted) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardContent className="p-8 text-center">
          <h1 className="text-3xl font-bold mb-4">خانه تسخیرشده</h1>
          <p className="text-lg mb-6">یک ماجراجویی تعاملی با پازل‌های ریاضی و نقاشی</p>
          <Button onClick={startGame} size="lg" className="text-lg px-8 py-4">
            شروع داستان
          </Button>
          <audio ref={backgroundMusicRef} loop>
            <source src="data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjmS1vLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjmS1vLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjmS1vLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjmS1vLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjmS1vLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjmS1vLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjmS1vLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjmS1vLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjmS1vLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjmS1vLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjmS1vLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjmS1vLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjmS1vLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjmS1vLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjmS1vLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjmS1vLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjmS1vLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjmS1vLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjmS1vLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjmS1vLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjmS1vLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjmS1vLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjmS1vLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjmS1vLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjmS1vLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjmS1vLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjmS1vLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjmS1vLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjmS1vLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjmS1vLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjmS1vLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjmS1vLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjmS1vLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjmS1vLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjmS1vLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjmS1vLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjmS1vLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjmS1vLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjmS1vLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjmS1vLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjmS1vLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBj" type="audio/wav" />
          </audio>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-2xl mx-auto animate-fade-in">
      <CardContent className="p-6">
        {showMath && (
          <MathPuzzle onSolved={handleMathSolved} onPlaySound={playStorySound} />
        )}
        
        {showDrawing && (
          <DrawingCanvas onSubmit={handleDrawingSubmitted} onPlaySound={playStorySound} />
        )}
        
        {!showMath && !showDrawing && (
          <StoryDisplay
            title="خانه تسخیرشده"
            text={currentStoryNode.text}
            score={state.score}
            choices={currentStoryNode.choices}
            isEnd={!!currentStoryNode.end}
            onChoice={handleChoice}
            onRestart={restartGame}
          />
        )}
      </CardContent>
    </Card>
  );
};