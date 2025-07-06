import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useInteractiveStories, useAddInteractiveStory, useUpdateInteractiveStory, useDeleteInteractiveStory } from '@/hooks/useInteractiveStories';
import { toast } from 'sonner';
import { Plus, Edit, Trash2, Eye, Clock, Star, Users } from 'lucide-react';

export const InteractiveStoriesManagement = () => {
  const { data: stories = [], isLoading } = useInteractiveStories();
  const addStoryMutation = useAddInteractiveStory();
  const updateStoryMutation = useUpdateInteractiveStory();
  const deleteStoryMutation = useDeleteInteractiveStory();

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingStory, setEditingStory] = useState<any>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'ماجراجویی',
    difficulty_level: 'متوسط',
    estimated_time: 15,
    age_range: '',
    cover_url: '',
    is_active: true
  });

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      category: 'ماجراجویی', 
      difficulty_level: 'متوسط',
      estimated_time: 15,
      age_range: '',
      cover_url: '',
      is_active: true
    });
  };

  const handleAdd = async () => {
    if (!formData.title.trim()) {
      toast.error('عنوان داستان الزامی است');
      return;
    }

    try {
      await addStoryMutation.mutateAsync(formData);
      setIsAddDialogOpen(false);
      resetForm();
    } catch (error) {
      console.error('Error adding story:', error);
    }
  };

  const handleEdit = (story: any) => {
    setEditingStory(story);
    setFormData({
      title: story.title,
      description: story.description || '',
      category: story.category,
      difficulty_level: story.difficulty_level,
      estimated_time: story.estimated_time,
      age_range: story.age_range || '',
      cover_url: story.cover_url || '',
      is_active: story.is_active
    });
    setIsEditDialogOpen(true);
  };

  const handleUpdate = async () => {
    if (!formData.title.trim()) {
      toast.error('عنوان داستان الزامی است');
      return;
    }

    try {
      await updateStoryMutation.mutateAsync({
        id: editingStory.id,
        ...formData
      });
      setIsEditDialogOpen(false);
      setEditingStory(null);
      resetForm();
    } catch (error) {
      console.error('Error updating story:', error);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (window.confirm(`آیا از حذف داستان "${title}" اطمینان دارید؟`)) {
      try {
        await deleteStoryMutation.mutateAsync(id);
      } catch (error) {
        console.error('Error deleting story:', error);
      }
    }
  };

  const getDifficultyColor = (level: string) => {
    switch (level) {
      case 'آسان': return 'bg-green-100 text-green-800';
      case 'متوسط': return 'bg-yellow-100 text-yellow-800';
      case 'سخت': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const CategoryOptions = [
    'ماجراجویی', 'ترسناک', 'فانتزی', 'علمی-تخیلی', 'جنایی', 'کمدی', 'درام', 'تاریخی'
  ];

  if (isLoading) {
    return <div className="text-center py-8 text-white">در حال بارگذاری...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white">مدیریت داستان‌های تعاملی</h2>
          <p className="text-gray-300">افزودن، ویرایش و مدیریت داستان‌های تعاملی</p>
        </div>
        
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
              <Plus className="w-4 h-4 mr-2" />
              افزودن داستان جدید
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>افزودن داستان تعاملی جدید</DialogTitle>
              <DialogDescription>
                اطلاعات داستان جدید را وارد کنید
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="add-title">عنوان</Label>
                <Input
                  id="add-title"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="عنوان داستان"
                />
              </div>
              <div>
                <Label htmlFor="add-description">توضیحات</Label>
                <Textarea
                  id="add-description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="توضیحات داستان"
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="add-category">دسته‌بندی</Label>
                  <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {CategoryOptions.map(category => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="add-difficulty">سطح سختی</Label>
                  <Select value={formData.difficulty_level} onValueChange={(value) => setFormData(prev => ({ ...prev, difficulty_level: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="آسان">آسان</SelectItem>
                      <SelectItem value="متوسط">متوسط</SelectItem>
                      <SelectItem value="سخت">سخت</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="add-time">زمان تقریبی (دقیقه)</Label>
                  <Input
                    id="add-time"
                    type="number"
                    value={formData.estimated_time}
                    onChange={(e) => setFormData(prev => ({ ...prev, estimated_time: parseInt(e.target.value) || 15 }))}
                    placeholder="15"
                  />
                </div>
                <div>
                  <Label htmlFor="add-age">رده سنی</Label>
                  <Input
                    id="add-age"
                    value={formData.age_range}
                    onChange={(e) => setFormData(prev => ({ ...prev, age_range: e.target.value }))}
                    placeholder="مثال: 12+ سال"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="add-cover">تصویر جلد (URL)</Label>
                <Input
                  id="add-cover"
                  value={formData.cover_url}
                  onChange={(e) => setFormData(prev => ({ ...prev, cover_url: e.target.value }))}
                  placeholder="https://example.com/cover.jpg"
                />
              </div>
              <div className="flex gap-2 pt-4">
                <Button onClick={handleAdd} disabled={addStoryMutation.isPending} className="flex-1">
                  {addStoryMutation.isPending ? 'در حال افزودن...' : 'افزودن'}
                </Button>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  انصراف
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-300">کل داستان‌ها</p>
                <p className="text-2xl font-bold text-white">{stories.length}</p>
              </div>
              <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
                <Eye className="w-5 h-5 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-300">آسان</p>
                <p className="text-2xl font-bold text-white">
                  {stories.filter(s => s.difficulty_level === 'آسان').length}
                </p>
              </div>
              <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                <Star className="w-5 h-5 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-300">متوسط</p>
                <p className="text-2xl font-bold text-white">
                  {stories.filter(s => s.difficulty_level === 'متوسط').length}
                </p>
              </div>
              <div className="w-10 h-10 bg-yellow-600 rounded-lg flex items-center justify-center">
                <Star className="w-5 h-5 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-300">سخت</p>
                <p className="text-2xl font-bold text-white">
                  {stories.filter(s => s.difficulty_level === 'سخت').length}
                </p>
              </div>
              <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
                <Star className="w-5 h-5 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Stories Table */}
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardHeader>
          <CardTitle className="text-white">لیست داستان‌های تعاملی</CardTitle>
          <CardDescription className="text-gray-300">
            مدیریت و ویرایش داستان‌های موجود
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-white/20">
                <TableHead className="text-white">عنوان</TableHead>
                <TableHead className="text-white">دسته‌بندی</TableHead>
                <TableHead className="text-white">سطح سختی</TableHead>
                <TableHead className="text-white">زمان</TableHead>
                <TableHead className="text-white">رده سنی</TableHead>
                <TableHead className="text-white">عملیات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {stories.map((story) => (
                <TableRow key={story.id} className="border-white/10">
                  <TableCell className="text-white font-medium">
                    {story.title}
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                      {story.category}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getDifficultyColor(story.difficulty_level)}>
                      {story.difficulty_level}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-gray-300">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {story.estimated_time} دقیقه
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-300">
                    {story.age_range || '-'}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(story)}
                        className="border-white/30 text-white hover:bg-white/10"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(story.id, story.title)}
                        disabled={deleteStoryMutation.isPending}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          {stories.length === 0 && (
            <div className="text-center py-8 text-gray-300">
              هیچ داستان تعاملی یافت نشد
            </div>
          )}
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>ویرایش داستان تعاملی</DialogTitle>
            <DialogDescription>
              اطلاعات داستان را ویرایش کنید
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="edit-title">عنوان</Label>
              <Input
                id="edit-title"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="عنوان داستان"
              />
            </div>
            <div>
              <Label htmlFor="edit-description">توضیحات</Label>
              <Textarea
                id="edit-description" 
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="توضیحات داستان"
                rows={3}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-category">دسته‌بندی</Label>
                <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {CategoryOptions.map(category => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="edit-difficulty">سطح سختی</Label>
                <Select value={formData.difficulty_level} onValueChange={(value) => setFormData(prev => ({ ...prev, difficulty_level: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="آسان">آسان</SelectItem>
                    <SelectItem value="متوسط">متوسط</SelectItem>
                    <SelectItem value="سخت">سخت</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-time">زمان تقریبی (دقیقه)</Label>
                <Input
                  id="edit-time"
                  type="number"
                  value={formData.estimated_time}
                  onChange={(e) => setFormData(prev => ({ ...prev, estimated_time: parseInt(e.target.value) || 15 }))}
                  placeholder="15"
                />
              </div>
              <div>
                <Label htmlFor="edit-age">رده سنی</Label>
                <Input
                  id="edit-age"
                  value={formData.age_range}
                  onChange={(e) => setFormData(prev => ({ ...prev, age_range: e.target.value }))}
                  placeholder="مثال: 12+ سال"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="edit-cover">تصویر جلد (URL)</Label>
              <Input
                id="edit-cover"
                value={formData.cover_url}
                onChange={(e) => setFormData(prev => ({ ...prev, cover_url: e.target.value }))}
                placeholder="https://example.com/cover.jpg"
              />
            </div>
            <div className="flex gap-2 pt-4">
              <Button onClick={handleUpdate} disabled={updateStoryMutation.isPending} className="flex-1">
                {updateStoryMutation.isPending ? 'در حال به‌روزرسانی...' : 'به‌روزرسانی'}
              </Button>
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                انصراف
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};