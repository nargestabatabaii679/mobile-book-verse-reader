
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Sparkles, BookOpen, Plus } from 'lucide-react';
import { Book } from '@/types';
import { useAddBook } from '@/hooks/useBooks';
import { toast } from '@/components/ui/use-toast';

interface AddBookFormProps {
  onBookAdded: () => void;
}

export const AddBookForm: React.FC<AddBookFormProps> = ({ onBookAdded }) => {
  const { mutate: addBook, isLoading } = useAddBook();
  const [isInteractive, setIsInteractive] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    translator: '',
    category: '',
    pages: '',
    coverUrl: '',
    description: '',
    publishYear: '',
    rating: '',
    isbn: '',
    ageRange: '',
    interactiveStoryId: ''
  });

  const categories = [
    'ادبیات کودک',
    'علمی',
    'تاریخی', 
    'ماجراجویی',
    'آموزشی',
    'داستان تعاملی'
  ];

  const ageRanges = [
    '3-6 سال',
    '7-10 سال', 
    '11-14 سال',
    '15+ سال'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.author || !formData.category) {
      toast({
        title: "خطا",
        description: "لطفاً فیلدهای اجباری را پر کنید",
        variant: "destructive"
      });
      return;
    }

    if (isInteractive && !formData.interactiveStoryId) {
      toast({
        title: "خطا", 
        description: "برای داستان تعاملی، شناسه داستان الزامی است",
        variant: "destructive"
      });
      return;
    }

    const newBook: Omit<Book, 'id'> = {
      title: formData.title,
      author: formData.author,
      translator: formData.translator || undefined,
      category: isInteractive ? 'داستان تعاملی' : formData.category,
      pages: parseInt(formData.pages) || 100,
      coverUrl: formData.coverUrl || '/placeholder.svg',
      description: formData.description,
      publishYear: parseInt(formData.publishYear) || new Date().getFullYear(),
      rating: parseFloat(formData.rating) || 0,
      isbn: formData.isbn,
      ageRange: formData.ageRange,
      interactiveStoryId: isInteractive ? formData.interactiveStoryId : undefined
    };

    addBook(newBook as Book, {
      onSuccess: () => {
        toast({
          title: "موفقیت",
          description: `کتاب ${isInteractive ? 'تعاملی' : ''} با موفقیت اضافه شد`
        });
        setFormData({
          title: '',
          author: '',
          translator: '',
          category: '',
          pages: '',
          coverUrl: '',
          description: '',
          publishYear: '',
          rating: '',
          isbn: '',
          ageRange: '',
          interactiveStoryId: ''
        });
        setIsInteractive(false);
        onBookAdded();
      },
      onError: (error) => {
        toast({
          title: "خطا",
          description: "خطا در افزودن کتاب",
          variant: "destructive"
        });
      }
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plus className="w-5 h-5" />
          افزودن کتاب جدید
          {isInteractive && (
            <Badge className="bg-purple-600 text-white">
              <Sparkles className="w-3 h-3 mr-1" />
              داستان تعاملی
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Interactive Toggle */}
          <div className="flex items-center space-x-2 rtl:space-x-reverse p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border">
            <Switch
              id="interactive-mode"
              checked={isInteractive}
              onCheckedChange={setIsInteractive}
            />
            <Label htmlFor="interactive-mode" className="flex items-center gap-2 cursor-pointer">
              {isInteractive ? (
                <>
                  <Sparkles className="w-4 h-4 text-purple-600" />
                  داستان تعاملی
                </>
              ) : (
                <>
                  <BookOpen className="w-4 h-4 text-gray-600" />
                  کتاب معمولی
                </>
              )}
            </Label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="title">عنوان کتاب *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="عنوان کتاب را وارد کنید"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="author">نویسنده *</Label>
              <Input
                id="author"
                value={formData.author}
                onChange={(e) => handleInputChange('author', e.target.value)}
                placeholder="نام نویسنده"
                required
              />
            </div>

            <div>
              <Label htmlFor="translator">مترجم</Label>
              <Input
                id="translator"
                value={formData.translator}
                onChange={(e) => handleInputChange('translator', e.target.value)}
                placeholder="نام مترجم (اختیاری)"
              />
            </div>

            {!isInteractive && (
              <div>
                <Label htmlFor="category">دسته‌بندی *</Label>
                <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="انتخاب دسته‌بندی" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.filter(cat => cat !== 'داستان تعاملی').map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            <div>
              <Label htmlFor="pages">تعداد صفحات</Label>
              <Input
                id="pages"
                type="number"
                value={formData.pages}
                onChange={(e) => handleInputChange('pages', e.target.value)}
                placeholder="100"
                min="1"
              />
            </div>

            <div>
              <Label htmlFor="publishYear">سال انتشار</Label>
              <Input
                id="publishYear"
                type="number"
                value={formData.publishYear}
                onChange={(e) => handleInputChange('publishYear', e.target.value)}
                placeholder="1402"
                min="1300"
                max={new Date().getFullYear()}
              />
            </div>

            <div>
              <Label htmlFor="rating">امتیاز (از 5)</Label>
              <Input
                id="rating"
                type="number"
                step="0.1"
                min="0"
                max="5"
                value={formData.rating}
                onChange={(e) => handleInputChange('rating', e.target.value)}
                placeholder="4.5"
              />
            </div>

            <div>
              <Label htmlFor="ageRange">گروه سنی</Label>
              <Select value={formData.ageRange} onValueChange={(value) => handleInputChange('ageRange', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="انتخاب گروه سنی" />
                </SelectTrigger>
                <SelectContent>
                  {ageRanges.map((range) => (
                    <SelectItem key={range} value={range}>
                      {range}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="isbn">شابک (ISBN)</Label>
              <Input
                id="isbn"
                value={formData.isbn}
                onChange={(e) => handleInputChange('isbn', e.target.value)}
                placeholder="978-600-xxx-xxx-x"
              />
            </div>

            <div>
              <Label htmlFor="coverUrl">آدرس تصویر جلد</Label>
              <Input
                id="coverUrl"
                value={formData.coverUrl}
                onChange={(e) => handleInputChange('coverUrl', e.target.value)}
                placeholder="https://example.com/cover.jpg"
              />
            </div>

            {/* Interactive Story ID field */}
            {isInteractive && (
              <div className="md:col-span-2">
                <Label htmlFor="interactiveStoryId" className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-purple-600" />
                  شناسه داستان تعاملی *
                </Label>
                <Input
                  id="interactiveStoryId"
                  value={formData.interactiveStoryId}
                  onChange={(e) => handleInputChange('interactiveStoryId', e.target.value)}
                  placeholder="story-1, magical-forest, ..."
                  required={isInteractive}
                  className="border-purple-300 focus:border-purple-500"
                />
                <p className="text-sm text-gray-600 mt-1">
                  این شناسه باید با یکی از داستان‌های موجود در سیستم تطبیق داشته باشد
                </p>
              </div>
            )}
          </div>

          <div>
            <Label htmlFor="description">توضیحات</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="توضیح مختصری از کتاب..."
              rows={3}
            />
          </div>

          <Button 
            type="submit" 
            disabled={isLoading}
            className={`w-full ${isInteractive 
              ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700' 
              : ''
            }`}
          >
            {isLoading ? 'در حال افزودن...' : (
              <>
                <Plus className="w-4 h-4 mr-2" />
                افزودن {isInteractive ? 'داستان تعاملی' : 'کتاب'}
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
