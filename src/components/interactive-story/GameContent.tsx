import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Play, Target } from 'lucide-react';
import { TypewriterText } from './TypewriterText';

interface StoryNode {
  id: string;
  node_id: string;
  title?: string;
  content: string;
  is_ending?: boolean;
}

interface Choice {
  id: string;
  choice_text: string;
  next_node_id: string;
  score_impact?: number;
  order_index?: number;
}

interface GameContentProps {
  currentNode: StoryNode;
  availableChoices: Choice[];
  textCompleted: boolean;
  onTextComplete: () => void;
  onChoice: (choice: Choice) => void;
}

export const GameContent: React.FC<GameContentProps> = ({
  currentNode,
  availableChoices,
  textCompleted,
  onTextComplete,
  onChoice
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Card className="bg-white/5 backdrop-blur-sm border-white/10 story-glow">
        <CardContent className="p-8">
          <AnimatePresence mode="wait">
            {currentNode.title && (
              <motion.h2 
                className="text-2xl font-bold text-white mb-4 story-float"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {currentNode.title}
              </motion.h2>
            )}
          </AnimatePresence>
          
          <motion.div
            className="text-gray-200 text-lg leading-relaxed mb-8 bg-black/30 backdrop-blur-sm p-6 rounded-lg border border-white/10"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
          >
            <TypewriterText 
              text={currentNode.content}
              speed={30}
              onComplete={onTextComplete}
              className="text-white"
            />
          </motion.div>

          <AnimatePresence>
            {textCompleted && availableChoices.length > 0 && (
              <motion.div 
                className="space-y-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  انتخاب کنید:
                </h3>
                {availableChoices
                  .sort((a, b) => (a.order_index || 0) - (b.order_index || 0))
                  .map((choice, index) => (
                    <motion.div
                      key={choice.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Button
                        onClick={() => onChoice(choice)}
                        className="w-full p-4 h-auto text-right justify-start bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-300/30 hover:from-purple-600/40 hover:to-pink-600/40 text-white transform hover:scale-[1.02] transition-all duration-300 story-glow"
                        variant="outline"
                      >
                        <Play className="w-4 h-4 ml-2 flex-shrink-0" />
                        <span className="flex-1">{choice.choice_text}</span>
                        {choice.score_impact && choice.score_impact !== 0 && (
                          <Badge 
                            variant={choice.score_impact > 0 ? "default" : "destructive"}
                            className="ml-2 story-sparkle"
                          >
                            {choice.score_impact > 0 ? '+' : ''}{choice.score_impact}
                          </Badge>
                        )}
                      </Button>
                    </motion.div>
                  ))}
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </motion.div>
  );
};