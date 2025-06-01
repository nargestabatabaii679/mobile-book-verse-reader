
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, X } from 'lucide-react';
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
  const { t } = useTranslation();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({ ...currentFilters, search: e.target.value });
  };

  const handleCategoryChange = (category: string) => {
    const newCategories = currentFilters.categories.includes(category)
      ? currentFilters.categories.filter(c => c !== category)
      : [...currentFilters.categories, category];
    
    onFilterChange({ ...currentFilters, categories: newCategories });
  };

  const handleSortChange = (value: string) => {
    onFilterChange({ ...currentFilters, sortBy: value });
  };

  const handlePageRangeChange = (value: number[]) => {
    onFilterChange({ 
      ...currentFilters, 
      minPages: value[0], 
      maxPages: value[1] 
    });
  };

  const handleAgeRangeChange = (value: string) => {
    onFilterChange({ ...currentFilters, ageRange: value });
  };

  const clearFilters = () => {
    onFilterChange({
      search: '',
      categories: [],
      sortBy: '',
      minPages: minPages,
      maxPages: maxPages,
      ageRange: ''
    });
  };

  return (
    <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10 shadow-xl">
      {/* Search Bar */}
      <div className="relative mb-8">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
        <Input
          type="text"
          placeholder={t('search_placeholder')}
          value={currentFilters.search}
          onChange={handleSearchChange}
          className="pl-12 h-12 bg-white/10 border-white/20 rounded-xl text-white placeholder:text-white/60 focus:bg-white/15 focus:border-white/40 transition-all duration-300"
        />
      </div>

      {/* Filter Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {/* Category Filter */}
        <div>
          <label className="block text-sm font-medium text-white/90 mb-3">
            {t('filter_by_category')}
          </label>
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <Button
                key={category}
                variant={currentFilters.categories.includes(category) ? "default" : "outline"}
                size="sm"
                onClick={() => handleCategoryChange(category)}
                className={`text-xs rounded-full px-4 py-2 transition-all duration-200 ${
                  currentFilters.categories.includes(category)
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                    : 'bg-white/10 border-white/20 text-white/80 hover:bg-white/20 hover:border-white/40'
                }`}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Sort By */}
        <div>
          <label className="block text-sm font-medium text-white/90 mb-3">
            {t('sort_by')}
          </label>
          <Select value={currentFilters.sortBy} onValueChange={handleSortChange}>
            <SelectTrigger className="bg-white/10 border-white/20 rounded-xl text-white h-10 focus:bg-white/15 focus:border-white/40 transition-all duration-300">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-gray-900 border-gray-700 rounded-xl">
              <SelectItem value="title-asc" className="text-white hover:bg-white/10">{t('title_asc')}</SelectItem>
              <SelectItem value="title-desc" className="text-white hover:bg-white/10">{t('title_desc')}</SelectItem>
              <SelectItem value="pages-asc" className="text-white hover:bg-white/10">{t('pages_asc')}</SelectItem>
              <SelectItem value="pages-desc" className="text-white hover:bg-white/10">{t('pages_desc')}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Page Range */}
        <div>
          <label className="block text-sm font-medium text-white/90 mb-3">
            {t('page_range')}: {currentFilters.minPages}-{currentFilters.maxPages}
          </label>
          <div className="px-2">
            <Slider
              value={[currentFilters.minPages, currentFilters.maxPages]}
              onValueChange={handlePageRangeChange}
              max={maxPages}
              min={minPages}
              step={10}
              className="mt-3"
            />
          </div>
        </div>

        {/* Age Range */}
        <div>
          <label className="block text-sm font-medium text-white/90 mb-3">
            {t('age_range')}
          </label>
          <Select value={currentFilters.ageRange} onValueChange={handleAgeRangeChange}>
            <SelectTrigger className="bg-white/10 border-white/20 rounded-xl text-white h-10 focus:bg-white/15 focus:border-white/40 transition-all duration-300">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-gray-900 border-gray-700 rounded-xl">
              <SelectItem value="0-6" className="text-white hover:bg-white/10">{t('0-6')}</SelectItem>
              <SelectItem value="7-12" className="text-white hover:bg-white/10">{t('7-12')}</SelectItem>
              <SelectItem value="13-17" className="text-white hover:bg-white/10">{t('13-17')}</SelectItem>
              <SelectItem value="18+" className="text-white hover:bg-white/10">{t('18+')}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Active Filters & Clear Button */}
      {activeFiltersCount > 0 && (
        <div className="flex items-center justify-between pt-6 border-t border-white/10">
          <div className="flex items-center gap-3">
            <Filter className="w-4 h-4 text-white/70" />
            <Badge variant="secondary" className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-white border-white/20 rounded-full px-3 py-1">
              {activeFiltersCount} {t('active_filters')}
            </Badge>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="text-white/80 hover:bg-white/10 rounded-xl px-4 py-2 transition-all duration-200"
          >
            <X className="w-4 h-4 mr-2" />
            {t('clear_filters')}
          </Button>
        </div>
      )}
    </div>
  );
};

export default FilterTabs;
