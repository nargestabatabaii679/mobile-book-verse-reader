import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useReadingHistory } from '@/hooks/useReadingHistory';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, BookOpen, Clock, Trash2, Loader2 } from 'lucide-react';
import Header from '@/components/layout/Header';

const ReadingHistory: React.FC = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const { history, isLoading, deleteHistory } = useReadingHistory();

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    }
  }, [user, authLoading, navigate]);

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
        <Header />
        <div className="flex items-center justify-center h-[calc(100vh-64px)]">
          <Loader2 className="h-8 w-8 animate-spin text-white" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <Header />
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        <Button
          onClick={() => navigate('/')}
          variant="ghost"
          className="text-white hover:bg-white/10 mb-6"
        >
          <ArrowLeft className="w-4 h-4 ml-2" />
          بازگشت
        </Button>

        <h1 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
          <BookOpen className="w-8 h-8" />
          تاریخچه مطالعه
        </h1>

        {!history || history.length === 0 ? (
          <Card className="bg-white/10 backdrop-blur-xl border-white/20">
            <CardContent className="py-12 text-center">
              <BookOpen className="w-16 h-16 text-white/50 mx-auto mb-4" />
              <p className="text-white/70 text-lg">
                هنوز کتابی نخوانده‌اید
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {history.map((item: any) => (
              <Card
                key={item.id}
                className="bg-white/10 backdrop-blur-xl border-white/20 hover:bg-white/15 transition-all"
              >
                <CardContent className="p-6">
                  <div className="flex gap-4 mb-4">
                    {item.books?.cover_url && (
                      <img
                        src={item.books.cover_url}
                        alt={item.books.title}
                        className="w-20 h-28 object-cover rounded-lg"
                      />
                    )}
                    <div className="flex-1">
                      <h3 className="text-white font-semibold mb-1 line-clamp-2">
                        {item.books?.title}
                      </h3>
                      <p className="text-white/70 text-sm">
                        {item.books?.author}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm text-white/70 mb-2">
                        <span>صفحه {item.current_page} از {item.total_pages}</span>
                        <span>%{Math.round(item.progress_percentage)}</span>
                      </div>
                      <Progress value={item.progress_percentage} className="h-2" />
                    </div>

                    {item.reading_time_minutes > 0 && (
                      <div className="flex items-center gap-2 text-white/70 text-sm">
                        <Clock className="w-4 h-4" />
                        <span>{item.reading_time_minutes} دقیقه</span>
                      </div>
                    )}

                    {item.completed_at && (
                      <div className="bg-green-500/20 text-green-300 px-3 py-1 rounded-full text-sm text-center">
                        خوانده شده
                      </div>
                    )}

                    <div className="flex gap-2 pt-2">
                      <Button
                        onClick={() => navigate(`/`)}
                        className="flex-1 bg-white/20 hover:bg-white/30 text-white"
                        size="sm"
                      >
                        ادامه مطالعه
                      </Button>
                      <Button
                        onClick={() => deleteHistory(item.book_id)}
                        variant="ghost"
                        className="text-red-300 hover:bg-red-500/20"
                        size="sm"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReadingHistory;
