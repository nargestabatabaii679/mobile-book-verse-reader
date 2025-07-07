import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Trophy, Star } from 'lucide-react';

interface StoryHeaderProps {
  onGoBack: () => void;
  score: number;
  choicesMade: string[];
}

export const StoryHeader: React.FC<StoryHeaderProps> = ({
  onGoBack,
  score,
  choicesMade
}) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <Button
        onClick={onGoBack}
        variant="outline"
        className="text-white border-white/30 hover:bg-white/10"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        بازگشت
      </Button>
      
      <div className="flex items-center gap-4 text-white">
        <div className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-yellow-400" />
          <span>امتیاز: {score}</span>
        </div>
        <div className="flex items-center gap-2">
          <Star className="w-5 h-5 text-purple-400" />
          <span>انتخاب‌ها: {choicesMade.length}</span>
        </div>
      </div>
    </div>
  );
};