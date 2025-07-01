import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Choice {
  text: string;
  next: string;
  score: number;
  sound?: string;
}

interface StoryDisplayProps {
  title: string;
  text: string;
  score: number;
  choices: Choice[];
  isEnd: boolean;
  onChoice: (choice: Choice) => void;
  onRestart: () => void;
}

export const StoryDisplay: React.FC<StoryDisplayProps> = ({
  title,
  text,
  score,
  choices,
  isEnd,
  onChoice,
  onRestart
}) => {
  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold story-magical-gradient bg-clip-text text-transparent story-float">
          {title}
        </h1>
        <Badge variant="secondary" className="text-lg story-glow animate-glow-pulse bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0">
          ⭐ امتیاز: {score}
        </Badge>
      </div>
      
      <div className="space-y-6">
        <div className="relative p-6 rounded-lg bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 border border-purple-200 dark:border-purple-800">
          <div className="absolute top-2 right-2 text-2xl animate-pulse">👻</div>
          <p className="text-lg text-justify leading-relaxed pr-8">
            {text}
          </p>
        </div>
        
        {choices.length > 0 && (
          <div className="space-y-3">
            {choices.map((choice, index) => (
              <Button
                key={index}
                onClick={() => onChoice(choice)}
                className="w-full py-4 text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white border-0 relative overflow-hidden group"
                variant="default"
              >
                <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <span className="text-xl">🎭</span>
                  {choice.text}
                </span>
              </Button>
            ))}
          </div>
        )}
        
        {isEnd && (
          <div className="text-center animate-bounce-in">
            <div className="mb-4 text-6xl animate-pulse">🎉</div>
            <Button 
              onClick={onRestart} 
              className="mt-4 story-magical-gradient hover:scale-110 transition-all duration-300 story-pulse text-white border-0" 
              size="lg"
            >
              ✨ شروع دوباره ✨
            </Button>
          </div>
        )}
      </div>
    </>
  );
};