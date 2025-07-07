import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Play, Trophy, Clock, Star, Package, Zap, Target } from 'lucide-react';
import { useInteractiveStories, useStoryNodes } from '@/hooks/useInteractiveStories';
import { toast } from 'sonner';
import { TypewriterText } from './TypewriterText';
import { ParticleEffect } from './ParticleEffect';
import { MiniGame } from './MiniGame';
import { InventorySystem, InventoryItem } from './InventorySystem';
import storyBg1 from '@/assets/story-bg-1.jpg';
import storyBg2 from '@/assets/story-bg-2.jpg';
import storyBg3 from '@/assets/story-bg-3.jpg';

const InteractiveStoryPlayer = () => {
  const { storyId } = useParams<{ storyId: string }>();
  const navigate = useNavigate();
  const [currentNodeId, setCurrentNodeId] = useState<string>('start');
  const [score, setScore] = useState(0);
  const [choicesMade, setChoicesMade] = useState<string[]>([]);
  const [gameState, setGameState] = useState<'loading' | 'playing' | 'ended'>('loading');
  const [showParticles, setShowParticles] = useState(false);
  const [showMiniGame, setShowMiniGame] = useState(false);
  const [miniGameType, setMiniGameType] = useState<'memory' | 'riddle'>('memory');
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [achievements, setAchievements] = useState<string[]>([]);
  const [textCompleted, setTextCompleted] = useState(false);

  const { data: stories = [], isLoading: storiesLoading } = useInteractiveStories();
  const { data: storyData, isLoading: nodesLoading } = useStoryNodes(storyId || '');

  const story = stories.find(s => s.id === storyId);
  const currentNode = storyData?.nodes?.find(n => n.node_id === currentNodeId);
  const availableChoices = storyData?.choices?.filter(c => c.node_id === currentNode?.id) || [];

  useEffect(() => {
    if (!storiesLoading && !nodesLoading && storyData?.nodes?.length) {
      setGameState('playing');
    }
  }, [storiesLoading, nodesLoading, storyData]);

  const handleChoice = (choice: any) => {
    const newChoices = [...choicesMade, choice.id];
    setChoicesMade(newChoices);
    
    // Trigger particles for positive choices
    if (choice.score_impact && choice.score_impact > 0) {
      setShowParticles(true);
      setTimeout(() => setShowParticles(false), 100);
    }
    
    if (choice.score_impact) {
      setScore(prev => prev + choice.score_impact);
    }

    // Random chance for mini-game
    if (Math.random() < 0.3 && !showMiniGame) {
      setMiniGameType(Math.random() < 0.5 ? 'memory' : 'riddle');
      setShowMiniGame(true);
      return;
    }

    // Add items to inventory occasionally
    if (Math.random() < 0.2) {
      addRandomItem();
    }

    setCurrentNodeId(choice.next_node_id);
    setTextCompleted(false);

    // Check if this is an ending node
    const nextNode = storyData?.nodes?.find(n => n.node_id === choice.next_node_id);
    if (nextNode?.is_ending) {
      setGameState('ended');
      toast.success('داستان به پایان رسید!');
    }
  };

  const addRandomItem = () => {
    const items: InventoryItem[] = [
      { id: 'key1', name: 'کلید طلایی', emoji: '🗝️', description: 'کلیدی که درهای مرموز را باز می‌کند', rarity: 'rare' },
      { id: 'potion1', name: 'معجون قدرت', emoji: '🧪', description: 'به شما قدرت اضافی می‌دهد', rarity: 'common' },
      { id: 'crystal1', name: 'کریستال جادویی', emoji: '💎', description: 'نیروی جادویی قدرتمند', rarity: 'legendary' },
      { id: 'scroll1', name: 'طومار حکمت', emoji: '📜', description: 'دانش باستانی را در خود دارد', rarity: 'rare' },
      { id: 'coin1', name: 'سکه شانس', emoji: '🪙', description: 'شانس شما را افزایش می‌دهد', rarity: 'common' }
    ];
    
    const randomItem = items[Math.floor(Math.random() * items.length)];
    if (!inventory.find(item => item.id === randomItem.id)) {
      setInventory(prev => [...prev, randomItem]);
      toast.success(`${randomItem.name} به کیف شما اضافه شد!`);
    }
  };

  const handleMiniGameComplete = (success: boolean, gameScore: number) => {
    setShowMiniGame(false);
    if (success) {
      setScore(prev => prev + gameScore);
      toast.success(`عالی! ${gameScore} امتیاز کسب کردید!`);
      setShowParticles(true);
      setTimeout(() => setShowParticles(false), 100);
    } else {
      toast.error('متأسفانه موفق نشدید!');
    }
    
    // Continue with the original choice
    const lastChoice = choicesMade[choicesMade.length - 1];
    if (lastChoice) {
      setCurrentNodeId(lastChoice);
      setTextCompleted(false);
    }
  };

  const handleItemUse = (itemId: string) => {
    const item = inventory.find(i => i.id === itemId);
    if (item) {
      setScore(prev => prev + 10);
      toast.success(`${item.name} استفاده شد!`);
      setInventory(prev => prev.filter(i => i.id !== itemId));
    }
  };

  const handleItemCombine = (item1Id: string, item2Id: string) => {
    const combinations = {
      'key1_potion1': { name: 'کلید جادویی', emoji: '🗝️✨', description: 'کلیدی با قدرت جادویی', rarity: 'legendary' as const },
      'crystal1_scroll1': { name: 'طلسم قدرت', emoji: '💎📜', description: 'طلسمی با قدرت بی‌نظیر', rarity: 'legendary' as const }
    };
    
    const comboKey = `${item1Id}_${item2Id}` as keyof typeof combinations;
    const reverseComboKey = `${item2Id}_${item1Id}` as keyof typeof combinations;
    
    const result = combinations[comboKey] || combinations[reverseComboKey];
    
    if (result) {
      setInventory(prev => {
        const filtered = prev.filter(i => i.id !== item1Id && i.id !== item2Id);
        const newItem: InventoryItem = {
          id: `combo_${Date.now()}`,
          ...result
        };
        return [...filtered, newItem];
      });
      setScore(prev => prev + 25);
      toast.success(`${result.name} ساخته شد!`);
    } else {
      toast.error('این اقلام قابل ترکیب نیستند!');
    }
  };

  const getBackgroundImage = () => {
    const backgrounds = [storyBg1, storyBg2, storyBg3];
    const hash = currentNodeId.split('').reduce((a, b) => a + b.charCodeAt(0), 0);
    return backgrounds[hash % backgrounds.length];
  };

  const handleRestart = () => {
    setCurrentNodeId('start');
    setScore(0);
    setChoicesMade([]);
    setGameState('playing');
  };

  const handleGoBack = () => {
    navigate('/');
  };

  if (storiesLoading || nodesLoading || gameState === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-white text-lg">در حال بارگذاری داستان...</div>
      </div>
    );
  }

  if (!story || !storyData?.nodes?.length) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center">
            <h2 className="text-xl font-bold mb-4">داستان یافت نشد</h2>
            <p className="text-gray-600 mb-4">متأسفانه این داستان وجود ندارد یا هنوز آماده نشده است.</p>
            <Button onClick={handleGoBack} className="w-full">
              <ArrowLeft className="w-4 h-4 mr-2" />
              بازگشت به صفحه اصلی
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen relative"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.8)), url(${getBackgroundImage()})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <ParticleEffect trigger={showParticles} />
      <InventorySystem 
        items={inventory}
        onItemUse={handleItemUse}
        onItemCombine={handleItemCombine}
      />
      
      {/* Header */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <Button
            onClick={handleGoBack}
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

        {/* Story Info */}
        <Card className="mb-6 bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-sm border-purple-300/30">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              {story.cover_url && (
                <img
                  src={story.cover_url}
                  alt={story.title}
                  className="w-20 h-20 object-cover rounded-lg"
                />
              )}
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-white mb-2">{story.title}</h1>
                <p className="text-gray-300 mb-3">{story.description}</p>
                <div className="flex items-center gap-4 text-sm">
                  <Badge variant="secondary" className="bg-purple-600/20 text-purple-200">
                    {story.difficulty_level}
                  </Badge>
                  <div className="flex items-center gap-1 text-gray-300">
                    <Clock className="w-4 h-4" />
                    {story.estimated_time} دقیقه
                  </div>
                  {story.age_range && (
                    <Badge variant="outline" className="text-gray-300 border-gray-300/30">
                      {story.age_range}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Game Content */}
        {gameState === 'playing' && currentNode && (
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
                    onComplete={() => setTextCompleted(true)}
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
                            onClick={() => handleChoice(choice)}
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
        )}

        {/* Game Ended */}
        {gameState === 'ended' && currentNode && (
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
                    <div className="text-3xl font-bold text-blue-400">{inventory.length}</div>
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
                    onClick={handleRestart} 
                    className="bg-purple-600 hover:bg-purple-700 story-pulse"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    بازی دوباره
                  </Button>
                  <Button 
                    onClick={handleGoBack} 
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
        )}
      </div>
      
      {/* Mini Game Modal */}
      <AnimatePresence>
        {showMiniGame && (
          <MiniGame
            type={miniGameType}
            onComplete={handleMiniGameComplete}
            onSkip={() => {
              setShowMiniGame(false);
              setScore(prev => Math.max(0, prev - 10));
              toast.info('مینی گیم رد شد (-10 امتیاز)');
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default InteractiveStoryPlayer;