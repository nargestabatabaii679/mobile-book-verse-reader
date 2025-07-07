import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import { useInteractiveStories, useStoryNodes } from '@/hooks/useInteractiveStories';
import { toast } from 'sonner';
import { ParticleEffect } from './ParticleEffect';
import { MiniGame } from './MiniGame';
import { InventorySystem, InventoryItem } from './InventorySystem';
import { StoryHeader } from './StoryHeader';
import { StoryInfo } from './StoryInfo';
import { GameContent } from './GameContent';
import { GameEnded } from './GameEnded';
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
      
      <div className="container mx-auto px-4 py-6">
        <StoryHeader 
          onGoBack={handleGoBack}
          score={score}
          choicesMade={choicesMade}
        />

        <StoryInfo story={story} />

        {gameState === 'playing' && currentNode && (
          <GameContent
            currentNode={currentNode}
            availableChoices={availableChoices}
            textCompleted={textCompleted}
            onTextComplete={() => setTextCompleted(true)}
            onChoice={handleChoice}
          />
        )}

        {gameState === 'ended' && currentNode && (
          <GameEnded
            currentNode={currentNode}
            score={score}
            choicesMade={choicesMade}
            inventoryLength={inventory.length}
            onRestart={handleRestart}
            onGoBack={handleGoBack}
          />
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