
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
    <div className="bg-white/8 backdrop-blur-xl rounded-3xl p-6 border border-white/15 shadow-2xl mb-6">
      {/* Tab Header */}
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
        <Filter className="w-5 h-5 text-white/70" />
        <h3 className="text-lg font-medium text-white/90">{t('filters')}</h3>
        {activeFiltersCount > 0 && (
          <Badge variant="secondary" className="bg-gradient-to-r from-blue-500/30 to-purple-500/30 text-white border-white/20 rounded-full px-2 py-1 text-xs">
            {activeFiltersCount}
          </Badge>
        )}
      </div>

      {/* Search Bar */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-4 h-4" />
        <Input
          type="text"
          placeholder={t('search_placeholder')}
          value={currentFilters.search}
          onChange={handleSearchChange}
          className="pl-10 h-10 bg-white/8 border-white/15 rounded-2xl text-white placeholder:text-white/50 focus:bg-white/12 focus:border-white/30 transition-all duration-300 text-sm"
        />
      </div>

      {/* Filter Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        {/* Category Filter */}
        <div>
          <label className="block text-xs font-medium text-white/70 mb-2">
            {t('filter_by_category')}
          </label>
          <div className="flex flex-wrap gap-1.5">
            {categories.map(category => (
              <Button
                key={category}
                variant={currentFilters.categories.includes(category) ? "default" : "outline"}
                size="sm"
                onClick={() => handleCategoryChange(category)}
                className={`text-xs rounded-full px-3 py-1.5 h-7 transition-all duration-200 ${
                  currentFilters.categories.includes(category)
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md'
                    : 'bg-white/8 border-white/15 text-white/70 hover:bg-white/15 hover:border-white/30 hover:text-white/90'
                }`}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Sort By */}
        <div>
          <label className="block text-xs font-medium text-white/70 mb-2">
            {t('sort_by')}
          </label>
          <Select value={currentFilters.sortBy} onValueChange={handleSortChange}>
            <SelectTrigger className="bg-white/8 border-white/15 rounded-xl text-white h-8 focus:bg-white/12 focus:border-white/30 transition-all duration-300 text-sm">
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
          <label className="block text-xs font-medium text-white/70 mb-2">
            {t('page_range')}: {currentFilters.minPages}-{currentFilters.maxPages}
          </label>
          <div className="px-1 mt-2">
            <Slider
              value={[currentFilters.minPages, currentFilters.maxPages]}
              onValueChange={handlePageRangeChange}
              max={maxPages}
              min={minPages}
              step={10}
              className="mt-1"
            />
          </div>
        </div>

        {/* Age Range */}
        <div>
          <label className="block text-xs font-medium text-white/70 mb-2">
            {t('age_range')}
          </label>
          <Select value={currentFilters.ageRange} onValueChange={handleAgeRangeChange}>
            <SelectTrigger className="bg-white/8 border-white/15 rounded-xl text-white h-8 focus:bg-white/12 focus:border-white/30 transition-all duration-300 text-sm">
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

      {/* Clear Filters Button */}
      {activeFiltersCount > 0 && (
        <div className="flex justify-end pt-3 border-t border-white/8">
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="text-white/60 hover:bg-white/8 rounded-xl px-3 py-1.5 h-7 transition-all duration-200 text-xs"
          >
            <X className="w-3 h-3 mr-1.5" />
            {t('clear_filters')}
          </Button>
        </div>
      )}
    </div>
  );
};

export default FilterTabs;
