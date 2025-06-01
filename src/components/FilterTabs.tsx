
import React from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown } from 'lucide-react';
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
  maxPages,
}) => {
  const pageRanges = [
    { value: 'all', label: 'همه تعداد صفحات' },
    { value: '0-100', label: 'کمتر از 100 صفحه' },
    { value: '100-200', label: '100-200 صفحه' },
    { value: '200-300', label: '200-300 صفحه' },
    { value: '300+', label: 'بیش از 300 صفحه' },
  ];

  const handleCategoryChange = (category: string) => {
    const newCategories = category === 'all' ? [] : [category];
    onFilterChange({
      ...currentFilters,
      categories: newCategories,
    });
  };

  const handlePagesChange = (pages: string) => {
    let newMinPages = minPages;
    let newMaxPages = maxPages;
    
    if (pages === '0-100') {
      newMinPages = 0;
      newMaxPages = 100;
    } else if (pages === '100-200') {
      newMinPages = 100;
      newMaxPages = 200;
    } else if (pages === '200-300') {
      newMinPages = 200;
      newMaxPages = 300;
    } else if (pages === '300+') {
      newMinPages = 300;
      newMaxPages = 1000;
    } else {
      newMinPages = 0;
      newMaxPages = 1000;
    }
    
    onFilterChange({
      ...currentFilters,
      minPages: newMinPages,
      maxPages: newMaxPages,
    });
  };

  const getCategoryLabel = () => {
    if (currentFilters.categories.length === 0) return 'همه دسته‌ها';
    return currentFilters.categories[0];
  };

  const getPagesLabel = () => {
    if (currentFilters.minPages === 0 && currentFilters.maxPages === 1000) return 'همه تعداد صفحات';
    if (currentFilters.minPages === 0 && currentFilters.maxPages === 100) return 'کمتر از 100 صفحه';
    if (currentFilters.minPages === 100 && currentFilters.maxPages === 200) return '100-200 صفحه';
    if (currentFilters.minPages === 200 && currentFilters.maxPages === 300) return '200-300 صفحه';
    if (currentFilters.minPages === 300) return 'بیش از 300 صفحه';
    return 'همه تعداد صفحات';
  };

  const allCategories = [
    { value: 'all', label: 'همه دسته‌ها' },
    ...categories.map(cat => ({ value: cat, label: cat }))
  ];

  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 mb-6">
      <div className="flex flex-wrap gap-4 items-center justify-center">
        {/* Category Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="outline" 
              className="bg-white/20 border-white/30 text-white hover:bg-white/30 hover:text-white transition-all duration-200 min-w-[180px] justify-between"
            >
              {getCategoryLabel()}
              <ChevronDown className="h-4 w-4 ml-2" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-white border border-gray-200 shadow-lg min-w-[180px] z-50">
            {allCategories.map((category) => (
              <DropdownMenuItem
                key={category.value}
                onClick={() => handleCategoryChange(category.value)}
                className="text-gray-900 hover:bg-gray-100 cursor-pointer"
              >
                {category.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Pages Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="outline" 
              className="bg-white/20 border-white/30 text-white hover:bg-white/30 hover:text-white transition-all duration-200 min-w-[180px] justify-between"
            >
              {getPagesLabel()}
              <ChevronDown className="h-4 w-4 ml-2" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-white border border-gray-200 shadow-lg min-w-[180px] z-50">
            {pageRanges.map((range) => (
              <DropdownMenuItem
                key={range.value}
                onClick={() => handlePagesChange(range.value)}
                className="text-gray-900 hover:bg-gray-100 cursor-pointer"
              >
                {range.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {activeFiltersCount > 0 && (
          <div className="text-white/80 text-sm">
            فیلترهای فعال: {activeFiltersCount}
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterTabs;
