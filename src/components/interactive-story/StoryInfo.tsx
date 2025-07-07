import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock } from 'lucide-react';

interface Story {
  id: string;
  title: string;
  description: string;
  cover_url?: string;
  difficulty_level?: string;
  estimated_time?: number;
  age_range?: string;
}

interface StoryInfoProps {
  story: Story;
}

export const StoryInfo: React.FC<StoryInfoProps> = ({ story }) => {
  return (
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
              {story.difficulty_level && (
                <Badge variant="secondary" className="bg-purple-600/20 text-purple-200">
                  {story.difficulty_level}
                </Badge>
              )}
              {story.estimated_time && (
                <div className="flex items-center gap-1 text-gray-300">
                  <Clock className="w-4 h-4" />
                  {story.estimated_time} دقیقه
                </div>
              )}
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
  );
};