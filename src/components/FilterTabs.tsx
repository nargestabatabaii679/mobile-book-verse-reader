
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
    <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
      {/* Search Bar */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          type="text"
          placeholder={t('search_placeholder')}
          value={currentFilters.search}
          onChange={handleSearchChange}
          className="pl-10 bg-white/20 border-white/30 text-white placeholder:text-gray-300"
        />
      </div>

      {/* Filter Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        {/* Category Filter */}
        <div>
          <label className="block text-sm font-medium text-white mb-2">
            {t('filter_by_category')}
          </label>
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <Button
                key={category}
                variant={currentFilters.categories.includes(category) ? "default" : "outline"}
                size="sm"
                onClick={() => handleCategoryChange(category)}
                className={`text-xs ${
                  currentFilters.categories.includes(category)
                    ? 'bg-blue-500 text-white'
                    : 'bg-white/20 border-white/30 text-white hover:bg-white/30'
                }`}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Sort By */}
        <div>
          <label className="block text-sm font-medium text-white mb-2">
            {t('sort_by')}
          </label>
          <Select value={currentFilters.sortBy} onValueChange={handleSortChange}>
            <SelectTrigger className="bg-white/20 border-white/30 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="title-asc">{t('title_asc')}</SelectItem>
              <SelectItem value="title-desc">{t('title_desc')}</SelectItem>
              <SelectItem value="pages-asc">{t('pages_asc')}</SelectItem>
              <SelectItem value="pages-desc">{t('pages_desc')}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Page Range */}
        <div>
          <label className="block text-sm font-medium text-white mb-2">
            {t('page_range')}: {currentFilters.minPages}-{currentFilters.maxPages}
          </label>
          <Slider
            value={[currentFilters.minPages, currentFilters.maxPages]}
            onValueChange={handlePageRangeChange}
            max={maxPages}
            min={minPages}
            step={10}
            className="mt-2"
          />
        </div>

        {/* Age Range */}
        <div>
          <label className="block text-sm font-medium text-white mb-2">
            {t('age_range')}
          </label>
          <Select value={currentFilters.ageRange} onValueChange={handleAgeRangeChange}>
            <SelectTrigger className="bg-white/20 border-white/30 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0-6">{t('0-6')}</SelectItem>
              <SelectItem value="7-12">{t('7-12')}</SelectItem>
              <SelectItem value="13-17">{t('13-17')}</SelectItem>
              <SelectItem value="18+">{t('18+')}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Active Filters & Clear Button */}
      {activeFiltersCount > 0 && (
        <div className="flex items-center justify-between pt-4 border-t border-white/20">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-white" />
            <Badge variant="secondary" className="bg-blue-500/20 text-white">
              {activeFiltersCount} {t('active_filters')}
            </Badge>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="text-white hover:bg-white/20"
          >
            <X className="w-4 h-4 mr-1" />
            {t('clear_filters')}
          </Button>
        </div>
      )}
    </div>
  );
};

export default FilterTabs;
