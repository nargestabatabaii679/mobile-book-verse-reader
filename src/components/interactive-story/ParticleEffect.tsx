import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Particle {
  id: number;
  x: number;
  y: number;
  emoji: string;
}

interface ParticleEffectProps {
  trigger?: boolean;
  emoji?: string[];
  duration?: number;
  count?: number;
}

export const ParticleEffect: React.FC<ParticleEffectProps> = ({
  trigger = false,
  emoji = ['✨', '⭐', '🌟', '💫'],
  duration = 2000,
  count = 12
}) => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    if (trigger) {
      const newParticles: Particle[] = [];
      for (let i = 0; i < count; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          emoji: emoji[Math.floor(Math.random() * emoji.length)]
        });
      }
      setParticles(newParticles);

      const timer = setTimeout(() => {
        setParticles([]);
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [trigger, emoji, duration, count]);

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      <AnimatePresence>
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute text-2xl"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
            }}
            initial={{
              opacity: 0,
              scale: 0,
              y: 0,
              rotate: 0
            }}
            animate={{
              opacity: [0, 1, 1, 0],
              scale: [0, 1.2, 1, 0.8],
              y: [-20, -60, -100],
              rotate: [0, 180, 360]
            }}
            exit={{
              opacity: 0,
              scale: 0
            }}
            transition={{
              duration: duration / 1000,
              ease: "easeOut"
            }}
          >
            {particle.emoji}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};