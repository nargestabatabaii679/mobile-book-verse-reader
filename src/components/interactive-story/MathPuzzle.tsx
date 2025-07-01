import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface MathPuzzleProps {
  onSolved: () => void;
  onPlaySound: (sound: string) => void;
}

export const MathPuzzle: React.FC<MathPuzzleProps> = ({ onSolved, onPlaySound }) => {
  const [mathAnswer, setMathAnswer] = useState('');
  const [currentMathAnswer, setCurrentMathAnswer] = useState(0);
  const [mathQuestion, setMathQuestion] = useState('');

  useEffect(() => {
    generateMathProblem();
  }, []);

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
      onPlaySound('victory');
      onSolved();
    } else {
      onPlaySound('error');
      setMathAnswer('');
    }
  };

  return (
    <Card className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900 dark:to-indigo-900 border-2 border-blue-300 dark:border-blue-700 story-glow animate-bounce-in">
      <CardContent className="p-6">
        <div className="text-center mb-4">
          <div className="text-4xl mb-2 animate-pulse">🧮</div>
          <h3 className="font-bold text-lg mb-2 text-blue-800 dark:text-blue-200">
            حل معادله جادویی برای ادامه!
          </h3>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-lg p-4 mb-4 border-2 border-dashed border-blue-300 dark:border-blue-600">
          <p className="text-center text-2xl font-bold text-blue-900 dark:text-blue-100 story-float">
            {mathQuestion}
          </p>
        </div>
        <div className="flex justify-center items-center gap-3">
          <Input
            type="number"
            placeholder="پاسخ شما"
            value={mathAnswer}
            onChange={(e) => setMathAnswer(e.target.value)}
            className="w-32 text-center text-lg border-2 border-blue-300 focus:border-blue-500 bg-white dark:bg-slate-800"
            onKeyPress={(e) => e.key === 'Enter' && checkMathAnswer()}
          />
          <Button 
            onClick={checkMathAnswer}
            className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-6 py-2 transition-all duration-300 hover:scale-105"
          >
            ✨ تأیید ✨
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};