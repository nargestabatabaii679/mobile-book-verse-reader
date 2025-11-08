import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useFavorites } from '@/hooks/useFavorites';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Heart, Loader2, Trash2 } from 'lucide-react';
import Header from '@/components/layout/Header';

const Favorites: React.FC = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const { favorites, isLoading, removeFavorite } = useFavorites();

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
          <Heart className="w-8 h-8 fill-current" />
          علاقه‌مندی‌ها
        </h1>

        {!favorites || favorites.length === 0 ? (
          <Card className="bg-white/10 backdrop-blur-xl border-white/20">
            <CardContent className="py-12 text-center">
              <Heart className="w-16 h-16 text-white/50 mx-auto mb-4" />
              <p className="text-white/70 text-lg">
                هنوز کتابی به علاقه‌مندی‌ها اضافه نکرده‌اید
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {favorites.map((item: any) => (
              <Card
                key={item.id}
                className="bg-white/10 backdrop-blur-xl border-white/20 hover:bg-white/15 transition-all group"
              >
                <CardContent className="p-4">
                  <div className="relative mb-3">
                    {item.books?.cover_url && (
                      <img
                        src={item.books.cover_url}
                        alt={item.books.title}
                        className="w-full h-48 object-cover rounded-lg"
                      />
                    )}
                    <Button
                      onClick={() => removeFavorite(item.book_id)}
                      className="absolute top-2 left-2 bg-red-500/80 hover:bg-red-600 text-white p-2 h-auto opacity-0 group-hover:opacity-100 transition-opacity"
                      size="sm"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>

                  <h3 className="text-white font-semibold text-sm mb-1 line-clamp-2">
                    {item.books?.title}
                  </h3>
                  <p className="text-white/70 text-xs mb-3">
                    {item.books?.author}
                  </p>

                  {item.notes && (
                    <p className="text-white/60 text-xs italic line-clamp-2 mb-3">
                      {item.notes}
                    </p>
                  )}

                  <Button
                    onClick={() => navigate(`/`)}
                    className="w-full bg-white/20 hover:bg-white/30 text-white"
                    size="sm"
                  >
                    مشاهده کتاب
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;
