import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Howl } from 'howler';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { StoryNode, GameState, Achievement } from '@/types/story-game';
import { GameCelebration } from './GameCelebration';
import { DragDropArea } from './DragDropArea';
import { AchievementPanel } from './AchievementPanel';
import { storyNodes, achievements } from './story-data';
import { Trophy, Clock, Star, RotateCcw, Home } from 'lucide-react';

interface StoryGameProps {
  onComplete?: (score: number) => void;
  gameCompleted?: boolean;
  onBackToMenu?: () => void;
}

export const StoryGame: React.FC<StoryGameProps> = ({ 
  onComplete, 
  gameCompleted, 
  onBackToMenu 
}) => {
  const [gameState, setGameState] = useState<GameState>({
    currentNodeId: '1',
    score: 0,
    choicesMade: 0,
    startTime: Date.now(),
    timeLeft: 300, // 5 minutes
    history: [],
    achievements: achievements.map(a => ({ ...a, unlocked: false })),
    playerName: ''
  });

  const [textInput, setTextInput] = useState('');
  const [showCelebration, setShowCelebration] = useState(false);
  const [showAchievements, setShowAchievements] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [sounds] = useState({
    success: new Howl({ src: ['/sounds/success.mp3'], volume: 0.5 }),
    choice: new Howl({ src: ['/sounds/click.mp3'], volume: 0.3 }),
    achievement: new Howl({ src: ['/sounds/achievement.mp3'], volume: 0.6 }),
    gameOver: new Howl({ src: ['/sounds/gameover.mp3'], volume: 0.4 })
  });

  const currentNode = storyNodes.find(node => node.id === gameState.currentNodeId);

  // Timer countdown
  useEffect(() => {
    if (!gameStarted || gameState.timeLeft <= 0 || currentNode?.isEnd) return;

    const timer = setInterval(() => {
      setGameState(prev => {
        const newTimeLeft = prev.timeLeft - 1;
        if (newTimeLeft <= 0) {
          // Time's up - force game end
          sounds.gameOver.play();
          return { ...prev, timeLeft: 0, currentNodeId: 'timeout' };
        }
        return { ...prev, timeLeft: newTimeLeft };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameStarted, gameState.timeLeft, currentNode?.isEnd, sounds.gameOver]);

  // Save progress to localStorage
  useEffect(() => {
    if (gameStarted) {
      localStorage.setItem('storyGameProgress', JSON.stringify({
        gameState,
        timestamp: Date.now()
      }));
    }
  }, [gameState, gameStarted]);

  // Load saved progress
  useEffect(() => {
    const saved = localStorage.getItem('storyGameProgress');
    if (saved) {
      const { gameState: savedState, timestamp } = JSON.parse(saved);
      // Only load if saved within last 24 hours
      if (Date.now() - timestamp < 24 * 60 * 60 * 1000) {
        setGameState(savedState);
      }
    }
  }, []);

  // Check achievements
  const checkAchievements = useCallback((newGameState: GameState) => {
    const newAchievements = newGameState.achievements.map(achievement => {
      if (!achievement.unlocked && achievement.condition(newGameState)) {
        sounds.achievement.play();
        return { ...achievement, unlocked: true };
      }
      return achievement;
    });

    return { ...newGameState, achievements: newAchievements };
  }, [sounds.achievement]);

  const startGame = () => {
    setGameStarted(true);
    setGameState(prev => ({ ...prev, startTime: Date.now() }));
  };

  const handleChoice = (choice: any) => {
    sounds.choice.play();
    
    const newGameState = {
      ...gameState,
      currentNodeId: choice.nextNodeId,
      score: gameState.score + (choice.scoreImpact || 0),
      choicesMade: gameState.choicesMade + 1,
      history: [...gameState.history, gameState.currentNodeId]
    };

    const updatedGameState = checkAchievements(newGameState);
    setGameState(updatedGameState);

    const nextNode = storyNodes.find(node => node.id === choice.nextNodeId);
    if (nextNode?.isEnd) {
      setTimeout(() => {
        if (choice.scoreImpact && choice.scoreImpact > 0) {
          sounds.success.play();
          setShowCelebration(true);
        } else {
          sounds.gameOver.play();
        }
        onComplete?.(updatedGameState.score);
      }, 1000);
    }
  };

  const handleTextInput = () => {
    if (!currentNode?.requiredInput?.correctAnswer) return;
    
    const isCorrect = textInput.toLowerCase().trim() === 
      currentNode.requiredInput.correctAnswer.toLowerCase().trim();
    
    if (isCorrect) {
      sounds.success.play();
      const nextNodeId = currentNode.choices[0]?.nextNodeId || '1';
      const newGameState = {
        ...gameState,
        currentNodeId: nextNodeId,
        score: gameState.score + 20,
        choicesMade: gameState.choicesMade + 1
      };
      setGameState(checkAchievements(newGameState));
      setTextInput('');
    } else {
      sounds.gameOver.play();
      // Wrong answer - small penalty
      setGameState(prev => ({ ...prev, score: Math.max(0, prev.score - 5) }));
    }
  };

  const handleDragDropSuccess = (items: any[]) => {
    sounds.success.play();
    const nextNodeId = currentNode?.choices[0]?.nextNodeId || '1';
    const newGameState = {
      ...gameState,
      currentNodeId: nextNodeId,
      score: gameState.score + 25,
      choicesMade: gameState.choicesMade + 1
    };
    setGameState(checkAchievements(newGameState));
  };

  const resetGame = () => {
    setGameState({
      currentNodeId: '1',
      score: 0,
      choicesMade: 0,
      startTime: Date.now(),
      timeLeft: 300,
      history: [],
      achievements: achievements.map(a => ({ ...a, unlocked: false })),
      playerName: gameState.playerName
    });
    setTextInput('');
    setShowCelebration(false);
    setGameStarted(true);
    localStorage.removeItem('storyGameProgress');
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!gameStarted) {
    return (
      <DndProvider backend={HTML5Backend}>
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="max-w-2xl mx-auto bg-white/10 backdrop-blur-lg border-white/20 text-white">
              <CardContent className="p-8 text-center">
                <motion.div
                  initial={{ y: -20 }}
                  animate={{ y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">
                    🌟 ماجراجویی افسانه‌ای 🌟
                  </h1>
                </motion.div>
                
                <p className="text-lg mb-8 text-gray-200 leading-relaxed">
                  در این داستان تعاملی، شما نقش یک جستجوگر گنج هستید که وارد یک دنیای پر از راز و رمز می‌شوید.
                  انتخاب‌های شما سرنوشت ماجراجویی را تعیین می‌کند!
                </p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 text-sm">
                  <div className="bg-white/20 rounded-lg p-3">
                    <Trophy className="w-6 h-6 mx-auto mb-2 text-yellow-400" />
                    <div>امتیازدهی</div>
                  </div>
                  <div className="bg-white/20 rounded-lg p-3">
                    <Clock className="w-6 h-6 mx-auto mb-2 text-blue-400" />
                    <div>تایمر چالش</div>
                  </div>
                  <div className="bg-white/20 rounded-lg p-3">
                    <Star className="w-6 h-6 mx-auto mb-2 text-purple-400" />
                    <div>دستاوردها</div>
                  </div>
                  <div className="bg-white/20 rounded-lg p-3">
                    <div className="text-2xl mb-2">🎯</div>
                    <div>تعامل چندگانه</div>
                  </div>
                </div>

                <div className="mb-6">
                  <Input
                    placeholder="نام خود را وارد کنید..."
                    value={gameState.playerName}
                    onChange={(e) => setGameState(prev => ({ ...prev, playerName: e.target.value }))}
                    className="bg-white/20 border-white/30 text-white placeholder-gray-300"
                  />
                </div>

                <Button 
                  onClick={startGame}
                  disabled={!gameState.playerName.trim()}
                  size="lg" 
                  className="text-lg px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-300"
                >
                  ✨ شروع ماجراجویی ✨
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </DndProvider>
    );
  }

  if (!currentNode) {
    return <div>خطا در بارگیری داستان</div>;
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className={`min-h-screen p-4 ${currentNode.backgroundGradient || 'bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800'}`}>
        <div className="max-w-4xl mx-auto">
          {/* Header with stats */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex gap-4">
              <Badge className="bg-yellow-500 text-black px-4 py-2">
                <Trophy className="w-4 h-4 mr-1" />
                امتیاز: {gameState.score}
              </Badge>
              <Badge className={`px-4 py-2 ${gameState.timeLeft < 60 ? 'bg-red-500' : 'bg-blue-500'}`}>
                <Clock className="w-4 h-4 mr-1" />
                {formatTime(gameState.timeLeft)}
              </Badge>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowAchievements(true)}
                className="text-white border-white/30"
              >
                <Star className="w-4 h-4 mr-1" />
                دستاوردها ({gameState.achievements.filter(a => a.unlocked).length})
              </Button>
            </div>
            
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={resetGame}
                className="text-white border-white/30"
              >
                <RotateCcw className="w-4 h-4 mr-1" />
                شروع مجدد
              </Button>
              {onBackToMenu && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onBackToMenu}
                  className="text-white border-white/30"
                >
                  <Home className="w-4 h-4 mr-1" />
                  منوی اصلی
                </Button>
              )}
            </div>
          </div>

          {/* Progress bar */}
          <div className="mb-6">
            <Progress 
              value={(gameState.choicesMade / 10) * 100} 
              className="h-2 bg-white/20"
            />
            <p className="text-white/70 text-sm mt-1">
              پیشرفت: {gameState.choicesMade} انتخاب از 10
            </p>
          </div>

          {/* Main story content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={gameState.currentNodeId}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="bg-white/10 backdrop-blur-lg border-white/20 text-white mb-6">
                <CardContent className="p-8">
                  <motion.p 
                    className="text-xl leading-relaxed mb-8 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    {currentNode.text}
                  </motion.p>

                  {/* Text input requirement */}
                  {currentNode.requiredInput?.type === 'text' && (
                    <motion.div 
                      className="mb-6"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      <p className="text-lg mb-4 text-yellow-300">
                        {currentNode.requiredInput.prompt}
                      </p>
                      <div className="flex gap-4">
                        <Input
                          value={textInput}
                          onChange={(e) => setTextInput(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && handleTextInput()}
                          placeholder="پاسخ خود را وارد کنید..."
                          className="bg-white/20 border-white/30 text-white placeholder-gray-300"
                        />
                        <Button
                          onClick={handleTextInput}
                          disabled={!textInput.trim()}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          تایید
                        </Button>
                      </div>
                    </motion.div>
                  )}

                  {/* Drag and drop requirement */}
                  {currentNode.requiredInput?.type === 'dragdrop' && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      <DragDropArea
                        prompt={currentNode.requiredInput.prompt}
                        items={currentNode.requiredInput.items || []}
                        onSuccess={handleDragDropSuccess}
                      />
                    </motion.div>
                  )}

                  {/* Story choices */}
                  {!currentNode.requiredInput && currentNode.choices.length > 0 && (
                    <motion.div 
                      className="space-y-4"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                    >
                      {currentNode.choices.map((choice, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.6 + index * 0.1 }}
                        >
                          <Button
                            onClick={() => handleChoice(choice)}
                            className="w-full text-right justify-start bg-gradient-to-r from-purple-600/50 to-pink-600/50 hover:from-purple-600 hover:to-pink-600 text-white border border-white/30 p-4 h-auto transform hover:scale-105 transition-all duration-300"
                            variant="outline"
                          >
                            {choice.text}
                            {choice.scoreImpact && (
                              <Badge className="ml-2 bg-yellow-500 text-black">
                                +{choice.scoreImpact}
                              </Badge>
                            )}
                          </Button>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}

                  {/* Game end */}
                  {currentNode.isEnd && (
                    <motion.div 
                      className="text-center mt-8"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      <div className="text-6xl mb-4">
                        {gameState.score >= 50 ? '🏆' : gameState.score >= 25 ? '🥈' : '🥉'}
                      </div>
                      <h2 className="text-3xl font-bold mb-4 text-yellow-400">
                        {gameState.score >= 50 ? 'عالی!' : gameState.score >= 25 ? 'خوب!' : 'تلاش کنید!'}
                      </h2>
                      <p className="text-xl mb-6">
                        امتیاز نهایی: {gameState.score} از 100
                      </p>
                      <div className="flex gap-4 justify-center">
                        <Button
                          onClick={resetGame}
                          className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                        >
                          بازی مجدد
                        </Button>
                        {onBackToMenu && (
                          <Button
                            onClick={onBackToMenu}
                            variant="outline"
                            className="text-white border-white/30"
                          >
                            بازگشت به منو
                          </Button>
                        )}
                      </div>
                    </motion.div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Celebration */}
        <AnimatePresence>
          {showCelebration && (
            <GameCelebration 
              onComplete={() => setShowCelebration(false)}
              score={gameState.score}
            />
          )}
        </AnimatePresence>

        {/* Achievements Panel */}
        <AchievementPanel
          achievements={gameState.achievements}
          isOpen={showAchievements}
          onClose={() => setShowAchievements(false)}
        />
      </div>
    </DndProvider>
  );
};