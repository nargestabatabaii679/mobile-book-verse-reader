import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

interface GameCelebrationProps {
  onComplete: () => void;
  score: number;
}

export const GameCelebration: React.FC<GameCelebrationProps> = ({ onComplete, score }) => {
  useEffect(() => {
    const timer = setTimeout(onComplete, 3000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  const getEmoji = () => {
    if (score >= 75) return '🏆';
    if (score >= 50) return '🥇';
    if (score >= 25) return '🥈';
    return '🥉';
  };

  const getMessage = () => {
    if (score >= 75) return 'عالی! شما یک استاد هستید!';
    if (score >= 50) return 'بسیار خوب! کار عالی!';
    if (score >= 25) return 'خوب بود! ادامه دهید!';
    return 'تلاش خوبی بود!';
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
    >
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ 
          type: "spring",
          stiffness: 260,
          damping: 20,
          duration: 0.8
        }}
        className="bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 p-8 rounded-2xl text-center shadow-2xl"
      >
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 10, -10, 0]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse"
          }}
          className="text-8xl mb-4"
        >
          {getEmoji()}
        </motion.div>
        
        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-3xl font-bold text-white mb-2"
        >
          {getMessage()}
        </motion.h2>
        
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-xl text-white/90"
        >
          امتیاز شما: {score}
        </motion.p>

        {/* Confetti effect */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ 
                x: "50%", 
                y: "50%", 
                opacity: 1,
                scale: 0
              }}
              animate={{ 
                x: `${Math.random() * 100}%`,
                y: `${Math.random() * 100}%`,
                opacity: 0,
                scale: 1
              }}
              transition={{ 
                duration: 2,
                delay: Math.random() * 0.5,
                ease: "easeOut"
              }}
              className="absolute w-2 h-2 bg-yellow-300 rounded-full"
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};