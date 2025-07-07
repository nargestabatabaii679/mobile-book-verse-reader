import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Play, Trophy, Clock, Star } from 'lucide-react';
import { useInteractiveStories, useStoryNodes } from '@/hooks/useInteractiveStories';
import { toast } from 'sonner';

const InteractiveStoryPlayer = () => {
  const { storyId } = useParams<{ storyId: string }>();
  const navigate = useNavigate();
  const [currentNodeId, setCurrentNodeId] = useState<string>('start');
  const [score, setScore] = useState(0);
  const [choicesMade, setChoicesMade] = useState<string[]>([]);
  const [gameState, setGameState] = useState<'loading' | 'playing' | 'ended'>('loading');

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
    
    if (choice.score_impact) {
      setScore(prev => prev + choice.score_impact);
    }

    setCurrentNodeId(choice.next_node_id);

    // Check if this is an ending node
    const nextNode = storyData?.nodes?.find(n => n.node_id === choice.next_node_id);
    if (nextNode?.is_ending) {
      setGameState('ended');
      toast.success('داستان به پایان رسید!');
    }
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
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
          <Card className="bg-white/5 backdrop-blur-sm border-white/10">
            <CardContent className="p-8">
              {currentNode.title && (
                <h2 className="text-2xl font-bold text-white mb-4">{currentNode.title}</h2>
              )}
              
              <div
                className="text-gray-200 text-lg leading-relaxed mb-8"
                style={{
                  background: currentNode.background_gradient || undefined,
                  backgroundImage: currentNode.background_image ? `url(${currentNode.background_image})` : undefined,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  padding: currentNode.background_image || currentNode.background_gradient ? '2rem' : undefined,
                  borderRadius: currentNode.background_image || currentNode.background_gradient ? '0.5rem' : undefined,
                }}
              >
                <div className={currentNode.background_image ? 'bg-black/50 backdrop-blur-sm p-4 rounded' : ''}>
                  {currentNode.content}
                </div>
              </div>

              {availableChoices.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-white mb-4">انتخاب کنید:</h3>
                  {availableChoices
                    .sort((a, b) => (a.order_index || 0) - (b.order_index || 0))
                    .map((choice) => (
                      <Button
                        key={choice.id}
                        onClick={() => handleChoice(choice)}
                        className="w-full p-4 h-auto text-right justify-start bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-300/30 hover:from-purple-600/30 hover:to-pink-600/30 text-white"
                        variant="outline"
                      >
                        <Play className="w-4 h-4 ml-2 flex-shrink-0" />
                        <span className="flex-1">{choice.choice_text}</span>
                        {choice.score_impact && choice.score_impact !== 0 && (
                          <Badge 
                            variant={choice.score_impact > 0 ? "default" : "destructive"}
                            className="ml-2"
                          >
                            {choice.score_impact > 0 ? '+' : ''}{choice.score_impact}
                          </Badge>
                        )}
                      </Button>
                    ))}
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Game Ended */}
        {gameState === 'ended' && currentNode && (
          <Card className="bg-gradient-to-r from-green-600/20 to-blue-600/20 backdrop-blur-sm border-green-300/30">
            <CardContent className="p-8 text-center">
              <Trophy className="w-16 h-16 mx-auto mb-4 text-yellow-400" />
              <h2 className="text-3xl font-bold text-white mb-4">پایان داستان</h2>
              
              <div className="text-gray-200 text-lg mb-6">
                {currentNode.content}
              </div>

              <div className="flex justify-center items-center gap-8 mb-6 text-white">
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-400">{score}</div>
                  <div className="text-sm">امتیاز نهایی</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-400">{choicesMade.length}</div>
                  <div className="text-sm">انتخاب‌های انجام شده</div>
                </div>
              </div>

              <div className="flex gap-4 justify-center">
                <Button onClick={handleRestart} className="bg-purple-600 hover:bg-purple-700">
                  <Play className="w-4 h-4 mr-2" />
                  بازی دوباره
                </Button>
                <Button onClick={handleGoBack} variant="outline" className="text-white border-white/30">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  بازگشت به خانه
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default InteractiveStoryPlayer;