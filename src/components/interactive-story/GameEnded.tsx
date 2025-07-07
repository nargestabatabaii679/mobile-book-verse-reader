import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trophy, Play, ArrowLeft } from 'lucide-react';
import { TypewriterText } from './TypewriterText';

interface StoryNode {
  content: string;
}

interface GameEndedProps {
  currentNode: StoryNode;
  score: number;
  choicesMade: string[];
  inventoryLength: number;
  onRestart: () => void;
  onGoBack: () => void;
}

export const GameEnded: React.FC<GameEndedProps> = ({
  currentNode,
  score,
  choicesMade,
  inventoryLength,
  onRestart,
  onGoBack
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
    >
      <Card className="bg-gradient-to-r from-green-600/20 to-blue-600/20 backdrop-blur-sm border-green-300/30 story-glow">
        <CardContent className="p-8 text-center">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 0.6, repeat: 3 }}
          >
            <Trophy className="w-16 h-16 mx-auto mb-4 text-yellow-400" />
          </motion.div>
          <h2 className="text-3xl font-bold text-white mb-4 story-float">پایان داستان</h2>
          
          <motion.div 
            className="text-gray-200 text-lg mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <TypewriterText 
              text={currentNode.content}
              speed={40}
              className="text-white"
            />
          </motion.div>

          <motion.div 
            className="flex justify-center items-center gap-8 mb-6 text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="text-center bg-yellow-500/20 p-4 rounded-lg">
              <motion.div 
                className="text-3xl font-bold text-yellow-400"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                {score}
              </motion.div>
              <div className="text-sm">امتیاز نهایی</div>
            </div>
            <div className="text-center bg-purple-500/20 p-4 rounded-lg">
              <div className="text-3xl font-bold text-purple-400">{choicesMade.length}</div>
              <div className="text-sm">انتخاب‌های انجام شده</div>
            </div>
            <div className="text-center bg-blue-500/20 p-4 rounded-lg">
              <div className="text-3xl font-bold text-blue-400">{inventoryLength}</div>
              <div className="text-sm">اقلام جمع‌آوری شده</div>
            </div>
          </motion.div>

          <motion.div 
            className="flex gap-4 justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <Button 
              onClick={onRestart} 
              className="bg-purple-600 hover:bg-purple-700 story-pulse"
            >
              <Play className="w-4 h-4 mr-2" />
              بازی دوباره
            </Button>
            <Button 
              onClick={onGoBack} 
              variant="outline" 
              className="text-white border-white/30 hover:bg-white/10"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              بازگشت به خانه
            </Button>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};