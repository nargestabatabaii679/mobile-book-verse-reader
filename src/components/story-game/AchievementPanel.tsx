import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Achievement } from '@/types/story-game';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Star, Lock } from 'lucide-react';

interface AchievementPanelProps {
  achievements: Achievement[];
  isOpen: boolean;
  onClose: () => void;
}

export const AchievementPanel: React.FC<AchievementPanelProps> = ({ 
  achievements, 
  isOpen, 
  onClose 
}) => {
  const unlockedCount = achievements.filter(a => a.unlocked).length;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-gradient-to-br from-purple-900 to-indigo-900 border-purple-500/50 text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center flex items-center justify-center gap-2">
            <Star className="w-8 h-8 text-yellow-400" />
            دستاوردها
            <Badge className="bg-yellow-500 text-black">
              {unlockedCount}/{achievements.length}
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
          <AnimatePresence>
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`p-4 rounded-lg border-2 transition-all ${
                  achievement.unlocked
                    ? 'bg-gradient-to-br from-yellow-600/30 to-orange-600/30 border-yellow-400/50'
                    : 'bg-white/10 border-gray-500/30'
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className={`text-3xl ${achievement.unlocked ? '' : 'grayscale opacity-50'}`}>
                    {achievement.unlocked ? achievement.icon : <Lock className="w-8 h-8" />}
                  </div>
                  <div>
                    <h3 className={`font-bold ${achievement.unlocked ? 'text-yellow-400' : 'text-gray-400'}`}>
                      {achievement.name}
                    </h3>
                    {achievement.unlocked && (
                      <Badge className="bg-green-500 text-white text-xs">
                        ✓ باز شده
                      </Badge>
                    )}
                  </div>
                </div>
                <p className={`text-sm ${achievement.unlocked ? 'text-white/90' : 'text-gray-500'}`}>
                  {achievement.description}
                </p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {unlockedCount === achievements.length && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center mt-4 p-4 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-lg border border-yellow-400/50"
          >
            <div className="text-4xl mb-2">🏆</div>
            <h3 className="text-xl font-bold text-yellow-400 mb-1">تبریک!</h3>
            <p className="text-white/90">شما همه دستاوردها را باز کردید!</p>
          </motion.div>
        )}
      </DialogContent>
    </Dialog>
  );
};