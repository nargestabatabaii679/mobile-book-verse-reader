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
  );
};