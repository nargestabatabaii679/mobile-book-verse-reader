
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Filter, X, Sparkles, BookOpen, Users } from 'lucide-react';
import { FilterOptions } from '@/types';

interface FilterTabsProps {
  categories: string[];
  onFilterChange: (filters: FilterOptions) => void;
  activeFiltersCount: number;
  currentFilters: FilterOptions;
  minPages: number;
  maxPages: number;
}

const FilterTabs: React.FC<FilterTabsProps> = ({
  categories,
  onFilterChange,
  activeFiltersCount,
  currentFilters,
  minPages,
  maxPages
}) => {
  const [localFilters, setLocalFilters] = useState<FilterOptions>(currentFilters);
  const [showInteractiveOnly, setShowInteractiveOnly] = useState(false);

  const updateFilter = (key: keyof FilterOptions, value: any) => {
    const newFilters = { ...localFilters, [key]: value };
    setLocalFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearAllFilters = () => {
    const clearedFilters: FilterOptions = {
      search: '',
      authorSearch: '',
      categories: [],
      sortBy: '',
      minPages: minPages,
      maxPages: maxPages,
      ageRange: ''
    };
    setLocalFilters(clearedFilters);
    setShowInteractiveOnly(false);
    onFilterChange(clearedFilters);
  };

  const toggleInteractiveFilter = () => {
    const newShowInteractive = !showInteractiveOnly;
    setShowInteractiveOnly(newShowInteractive);
    
    if (newShowInteractive) {
      const interactiveFilters = {
        ...localFilters,
        categories: ['داستان تعاملی']
      };
      setLocalFilters(interactiveFilters);
      onFilterChange(interactiveFilters);
    } else {
      const allFilters = {
        ...localFilters,
        categories: []
      };
      setLocalFilters(allFilters);
      onFilterChange(allFilters);
    }
  };

  const toggleCategory = (category: string) => {
    const newCategories = localFilters.categories.includes(category)
      ? localFilters.categories.filter(c => c !== category)
      : [...localFilters.categories, category];
    updateFilter('categories', newCategories);
  };

  const sortOptions = [
    { value: 'title-asc', label: 'عنوان (الف-ی)' },
    { value: 'title-desc', label: 'عنوان (ی-الف)' },
    { value: 'author-asc', label: 'نویسنده (الف-ی)' },
    { value: 'rating-desc', label: 'بالاترین امتیاز' },
    { value: 'pages-asc', label: 'کمترین صفحات' },
    { value: 'pages-desc', label: 'بیشترین صفحات' },
    { value: 'year-desc', label: 'جدیدترین' }
  ];

  const ageRanges = ['3-6 سال', '7-10 سال', '11-14 سال', '15+ سال'];

  return (
    <Card className="mb-6 bg-white/10 backdrop-blur-sm border-white/20">
      <CardContent className="p-6">
        <Tabs defaultValue="search" className="w-full">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
            <TabsList className="grid w-full grid-cols-4 lg:w-auto bg-white/20">
              <TabsTrigger value="search" className="flex items-center gap-2 text-white data-[state=active]:bg-white/30">
                <Search className="w-4 h-4" />
                جستجو
              </TabsTrigger>
              <TabsTrigger value="category" className="flex items-center gap-2 text-white data-[state=active]:bg-white/30">
                <Filter className="w-4 h-4" />
                دسته‌بندی
              </TabsTrigger>
              <TabsTrigger value="details" className="flex items-center gap-2 text-white data-[state=active]:bg-white/30">
                <BookOpen className="w-4 h-4" />
                جزئیات
              </TabsTrigger>
              <TabsTrigger value="sort" className="flex items-center gap-2 text-white data-[state=active]:bg-white/30">
                <Users className="w-4 h-4" />
                مرتب‌سازی
              </TabsTrigger>
            </TabsList>

            <div className="flex items-center gap-2">
              {/* Interactive Books Filter Toggle */}
              <Button
                onClick={toggleInteractiveFilter}
                variant={showInteractiveOnly ? "default" : "outline"}
                className={`flex items-center gap-2 ${
                  showInteractiveOnly 
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white' 
                    : 'bg-white/20 border-white/30 text-white hover:bg-white/30'
                }`}
              >
                <Sparkles className="w-4 h-4" />
                {showInteractiveOnly ? 'همه کتاب‌ها' : 'فقط تعاملی'}
              </Button>

              {activeFiltersCount > 0 && (
                <Button
                  onClick={clearAllFilters}
                  variant="outline"
                  size="sm"
                  className="bg-white/20 border-white/30 text-white hover:bg-white/30"
                >
                  <X className="w-4 h-4 mr-2" />
                  پاک کردن ({activeFiltersCount})
                </Button>
              )}
            </div>
          </div>

          <TabsContent value="search" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-white">جستجو در عنوان</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    type="text"
                    placeholder="نام کتاب را وارد کنید..."
                    value={localFilters.search}
                    onChange={(e) => updateFilter('search', e.target.value)}
                    className="pl-10 bg-white/20 border-white/30 text-white placeholder:text-gray-300"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-white">جستجو در نویسنده</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    type="text"
                    placeholder="نام نویسنده را وارد کنید..."
                    value={localFilters.authorSearch}
                    onChange={(e) => updateFilter('authorSearch', e.target.value)}
                    className="pl-10 bg-white/20 border-white/30 text-white placeholder:text-gray-300"
                  />
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="category" className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-white">دسته‌بندی‌ها</label>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Badge
                    key={category}
                    variant={localFilters.categories.includes(category) ? "default" : "outline"}
                    className={`cursor-pointer transition-colors ${
                      localFilters.categories.includes(category)
                        ? category === 'داستان تعاملی'
                          ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700'
                          : 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'bg-white/20 border-white/30 text-white hover:bg-white/30'
                    }`}
                    onClick={() => toggleCategory(category)}
                  >
                    {category === 'داستان تعاملی' && <Sparkles className="w-3 h-3 mr-1" />}
                    {category}
                  </Badge>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="details" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-white">گروه سنی</label>
                <Select value={localFilters.ageRange} onValueChange={(value) => updateFilter('ageRange', value)}>
                  <SelectTrigger className="bg-white/20 border-white/30 text-white">
                    <SelectValue placeholder="انتخاب گروه سنی" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">همه گروه‌های سنی</SelectItem>
                    {ageRanges.map((range) => (
                      <SelectItem key={range} value={range}>
                        {range}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-3">
                <label className="text-sm font-medium text-white">
                  تعداد صفحات: {localFilters.minPages} - {localFilters.maxPages}
                </label>
                <Slider
                  value={[localFilters.minPages, localFilters.maxPages]}
                  onValueChange={([min, max]) => {
                    updateFilter('minPages', min);
                    updateFilter('maxPages', max);
                  }}
                  max={maxPages}
                  min={minPages}
                  step={10}
                  className="w-full"
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="sort" className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-white">مرتب‌سازی بر اساس</label>
              <Select value={localFilters.sortBy} onValueChange={(value) => updateFilter('sortBy', value)}>
                <SelectTrigger className="bg-white/20 border-white/30 text-white">
                  <SelectValue placeholder="انتخاب نوع مرتب‌سازی" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">بدون مرتب‌سازی</SelectItem>
                  {sortOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default FilterTabs;
