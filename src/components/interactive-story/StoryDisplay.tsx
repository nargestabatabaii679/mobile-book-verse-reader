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
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">{title}</h1>
        <Badge variant="secondary" className="text-lg">
          امتیاز: {score}
        </Badge>
      </div>
      
      <div className="space-y-6">
        <p className="text-lg text-justify leading-relaxed">
          {text}
        </p>
        
        {choices.length > 0 && (
          <div className="space-y-3">
            {choices.map((choice, index) => (
              <Button
                key={index}
                onClick={() => onChoice(choice)}
                className="w-full py-3 text-lg transition-transform hover:scale-105"
                variant="default"
              >
                {choice.text}
              </Button>
            ))}
          </div>
        )}
        
        {isEnd && (
          <div className="text-center">
            <Button onClick={onRestart} className="mt-4" size="lg">
              شروع دوباره
            </Button>
          </div>
        )}
      </div>
    </>
  );
};