import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

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
  const [mathAnswer, setMathAnswer] = useState('');
  const [currentMathAnswer, setCurrentMathAnswer] = useState(0);
  const [mathQuestion, setMathQuestion] = useState('');
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const backgroundMusicRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const node = storyNodes[state.currentNode];
    
    if (node.sound) {
      setTimeout(() => playStorySound(node.sound!), 500);
    }
    
    if (node.special === 'math') {
      generateMathProblem();
      setShowMath(true);
    } else if (node.special === 'drawing') {
      setShowDrawing(true);
      setTimeout(setupCanvas, 100);
    } else {
      setShowMath(false);
      setShowDrawing(false);
    }
  }, [state.currentNode]);

  const startGame = () => {
    setState(prev => ({ ...prev, gameStarted: true }));
    playBackgroundMusic();
  };

  const playBackgroundMusic = () => {
    if (backgroundMusicRef.current) {
      backgroundMusicRef.current.volume = 0.2;
      backgroundMusicRef.current.play().catch(e => console.log('Background music failed:', e));
    }
  };

  const playStorySound = (soundType: string) => {
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      let frequency = 440;
      let duration = 0.3;
      
      const soundMap: Record<string, { freq: number; dur: number }> = {
        footsteps: { freq: 200, dur: 0.5 },
        'door-creak': { freq: 150, dur: 1.0 },
        mystery: { freq: 660, dur: 0.8 },
        echo: { freq: 330, dur: 1.2 },
        'page-flip': { freq: 880, dur: 0.2 },
        'chest-open': { freq: 550, dur: 0.6 },
        victory: { freq: 1200, dur: 1.0 },
        escape: { freq: 400, dur: 0.7 }
      };
      
      if (soundMap[soundType]) {
        frequency = soundMap[soundType].freq;
        duration = soundMap[soundType].dur;
      }
      
      oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
      if (['door-creak', 'echo'].includes(soundType)) {
        oscillator.frequency.exponentialRampToValueAtTime(frequency * 0.7, audioContext.currentTime + duration);
      }
      
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + duration);
    } catch (e) {
      console.log('Story sound failed:', e);
    }
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

  const generateMathProblem = () => {
    const operations = ['+', '-', '*'];
    const operation = operations[Math.floor(Math.random() * operations.length)];
    let num1: number, num2: number, answer: number;
    
    switch(operation) {
      case '+':
        num1 = Math.floor(Math.random() * 20) + 1;
        num2 = Math.floor(Math.random() * 20) + 1;
        answer = num1 + num2;
        break;
      case '-':
        num1 = Math.floor(Math.random() * 30) + 10;
        num2 = Math.floor(Math.random() * num1);
        answer = num1 - num2;
        break;
      case '*':
        num1 = Math.floor(Math.random() * 10) + 1;
        num2 = Math.floor(Math.random() * 10) + 1;
        answer = num1 * num2;
        break;
      default:
        num1 = 1; num2 = 1; answer = 2;
    }
    
    setMathQuestion(`${num1} ${operation} ${num2} = ؟`);
    setCurrentMathAnswer(answer);
    setMathAnswer('');
  };

  const checkMathAnswer = () => {
    const userAnswer = parseInt(mathAnswer);
    
    if (userAnswer === currentMathAnswer) {
      playStorySound('victory');
      setState(prev => ({
        ...prev,
        score: prev.score + 15,
        currentNode: 'mathSolved'
      }));
    } else {
      playStorySound('error');
      setMathAnswer('');
    }
  };

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
      playStorySound('victory');
      setState(prev => ({
        ...prev,
        score: prev.score + 20,
        currentNode: 'drawingDone'
      }));
    }
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
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
            <source src="data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjmS1vLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjmS1vLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjmS1vLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjmS1vLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjmS1vLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjmS1vLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjmS1vLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjmS1vLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjmS1vLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjmS1vLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjmS1vLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjmS1vLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjmS1vLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjmS1vLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjmS1vLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjmS1vLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjmS1vLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjmS1vLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjmS1vLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjmS1vLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjmS1vLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjmS1vLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjmS1vLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjmS1vLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjmS1vLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjmS1vLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjmS1vLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjmS1vLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjmS1vLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjmS1vLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjmS1vLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjmS1vLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjmS1vLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjmS1vLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjmS1vLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjmS1vLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjmS1vLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjmS1vLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjmS1vLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBj" type="audio/wav">
          </audio>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-2xl mx-auto animate-fade-in">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">خانه تسخیرشده</h1>
          <Badge variant="secondary" className="text-lg">
            امتیاز: {state.score}
          </Badge>
        </div>
        
        <div className="space-y-6">
          <p className="text-lg text-justify leading-relaxed">
            {currentStoryNode.text}
          </p>
          
          {showMath && (
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-4">
                <h3 className="font-bold mb-2 text-center">حل معادله برای ادامه!</h3>
                <p className="text-center mb-4 text-xl">{mathQuestion}</p>
                <div className="flex justify-center items-center gap-2">
                  <Input
                    type="number"
                    placeholder="پاسخ"
                    value={mathAnswer}
                    onChange={(e) => setMathAnswer(e.target.value)}
                    className="w-24 text-center"
                    onKeyPress={(e) => e.key === 'Enter' && checkMathAnswer()}
                  />
                  <Button onClick={checkMathAnswer}>تأیید</Button>
                </div>
              </CardContent>
            </Card>
          )}
          
          {showDrawing && (
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
          )}
          
          {!showMath && !showDrawing && (
            <div className="space-y-3">
              {currentStoryNode.choices.map((choice, index) => (
                <Button
                  key={index}
                  onClick={() => handleChoice(choice)}
                  className="w-full py-3 text-lg transition-transform hover:scale-105"
                  variant="default"
                >
                  {choice.text}
                </Button>
              ))}
            </div>
          )}
          
          {currentStoryNode.end && (
            <div className="text-center">
              <Button onClick={restartGame} className="mt-4" size="lg">
                شروع دوباره
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};