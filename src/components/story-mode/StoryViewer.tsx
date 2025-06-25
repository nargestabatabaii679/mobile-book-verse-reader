
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Story, Branch, StoryProgress } from '@/types';
import { stories } from '@/data/stories';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, BookOpen, Trophy, Heart, Meh } from 'lucide-react';

const StoryViewer: React.FC = () => {
  const { storyId } = useParams<{ storyId: string }>();
  const navigate = useNavigate();
  const [story, setStory] = useState<Story | null>(null);
  const [currentBranch, setCurrentBranch] = useState<Branch | null>(null);
  const [progress, setProgress] = useState<StoryProgress | null>(null);

  useEffect(() => {
    if (storyId) {
      const foundStory = stories.find(s => s.id === storyId);
      if (foundStory) {
        setStory(foundStory);
        // Load progress from localStorage
        const savedProgress = localStorage.getItem(`story-progress-${storyId}`);
        if (savedProgress) {
          const parsedProgress = JSON.parse(savedProgress);
          setProgress(parsedProgress);
          const branch = foundStory.branches.find(b => b.id === parsedProgress.currentBranchId);
          setCurrentBranch(branch || foundStory.branches.find(b => b.id === foundStory.startBranchId)!);
        } else {
          // Start new story
          const startBranch = foundStory.branches.find(b => b.id === foundStory.startBranchId)!;
          setCurrentBranch(startBranch);
          const newProgress: StoryProgress = {
            storyId: storyId,
            currentBranchId: startBranch.id,
            choicesMade: []
          };
          setProgress(newProgress);
        }
      } else {
        navigate('/');
      }
    }
  }, [storyId, navigate]);

  const handleChoice = (optionId: string, nextBranchId: string | null) => {
    if (!story || !progress) return;

    const newChoicesMade = [...progress.choicesMade, optionId];
    
    if (nextBranchId) {
      const nextBranch = story.branches.find(b => b.id === nextBranchId);
      if (nextBranch) {
        setCurrentBranch(nextBranch);
        const newProgress: StoryProgress = {
          ...progress,
          currentBranchId: nextBranchId,
          choicesMade: newChoicesMade
        };
        setProgress(newProgress);
        localStorage.setItem(`story-progress-${storyId}`, JSON.stringify(newProgress));
      }
    } else {
      // This is an ending
      const newProgress: StoryProgress = {
        ...progress,
        choicesMade: newChoicesMade,
        completedAt: new Date()
      };
      setProgress(newProgress);
      localStorage.setItem(`story-progress-${storyId}`, JSON.stringify(newProgress));
    }
  };

  const resetStory = () => {
    if (!story) return;
    localStorage.removeItem(`story-progress-${storyId}`);
    const startBranch = story.branches.find(b => b.id === story.startBranchId)!;
    setCurrentBranch(startBranch);
    const newProgress: StoryProgress = {
      storyId: storyId!,
      currentBranchId: startBranch.id,
      choicesMade: []
    };
    setProgress(newProgress);
  };

  const getEndingIcon = (endingType?: string) => {
    switch (endingType) {
      case 'happy': return <Heart className="w-6 h-6 text-green-500" />;
      case 'sad': return <Meh className="w-6 h-6 text-red-500" />;
      default: return <Trophy className="w-6 h-6 text-yellow-500" />;
    }
  };

  if (!story || !currentBranch) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-white text-center">
          <BookOpen className="w-16 h-16 mx-auto mb-4" />
          <p className="text-xl">در حال بارگیری داستان...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Button
            onClick={() => navigate('/')}
            variant="outline"
            className="text-white border-white/30 hover:bg-white/20"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            بازگشت به کتابخانه
          </Button>
          
          <div className="text-center">
            <h1 className="text-2xl font-bold text-white">{story.title}</h1>
            <p className="text-gray-300 text-sm">{story.description}</p>
          </div>

          <div className="flex gap-2">
            <Badge variant="outline" className="text-white border-white/30">
              {progress?.choicesMade.length || 0} انتخاب
            </Badge>
            <Button
              onClick={resetStory}
              variant="outline"
              size="sm"
              className="text-white border-white/30 hover:bg-white/20"
            >
              شروع مجدد
            </Button>
          </div>
        </div>

        {/* Story Content */}
        <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {currentBranch.isEnding && getEndingIcon(currentBranch.endingType)}
              {currentBranch.title}
              {currentBranch.isEnding && (
                <Badge className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white">
                  پایان داستان
                </Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-lg leading-relaxed text-gray-100">
              {currentBranch.content}
            </div>

            {/* Options */}
            {currentBranch.options.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-white">انتخاب کنید:</h3>
                {currentBranch.options.map((option) => (
                  <Button
                    key={option.id}
                    onClick={() => handleChoice(option.id, option.nextBranchId)}
                    className="w-full text-right justify-start bg-white/20 hover:bg-white/30 text-white border border-white/30 p-4 h-auto"
                    variant="outline"
                  >
                    {option.text}
                  </Button>
                ))}
              </div>
            )}

            {/* Ending Actions */}
            {currentBranch.isEnding && (
              <div className="flex gap-4 pt-4 border-t border-white/20">
                <Button
                  onClick={resetStory}
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white"
                >
                  شروع مجدد داستان
                </Button>
                <Button
                  onClick={() => navigate('/')}
                  variant="outline"
                  className="text-white border-white/30 hover:bg-white/20"
                >
                  بازگشت به کتابخانه
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StoryViewer;
