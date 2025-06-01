
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown, Search } from 'lucide-react';
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

  const ageRanges = [
    { value: '', label: 'همه گروه‌های سنی' },
    { value: '0-6', label: '۰-۶ سال (کودکان)' },
    { value: '7-12', label: '۷-۱۲ سال (نوجوانان)' },
    { value: '13-17', label: '۱۳-۱۷ سال (نوجوانان بزرگ)' },
    { value: '18+', label: '۱۸+ سال (بزرگسالان)' },
  ];

  const handleSearchChange = (value: string) => {
    onFilterChange({
      ...currentFilters,
      search: value,
    });
  };

  const handleAuthorSearchChange = (value: string) => {
    onFilterChange({
      ...currentFilters,
      authorSearch: value,
    });
  };

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

  const handleAgeRangeChange = (ageRange: string) => {
    onFilterChange({
      ...currentFilters,
      ageRange: ageRange,
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

  const getAgeRangeLabel = () => {
    if (!currentFilters.ageRange) return 'همه گروه‌های سنی';
    const range = ageRanges.find(r => r.value === currentFilters.ageRange);
    return range ? range.label : 'همه گروه‌های سنی';
  };

  const allCategories = [
    { value: 'all', label: 'همه دسته‌ها' },
    ...categories.map(cat => ({ value: cat, label: cat }))
  ];

  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-3 mb-4">
      <div className="flex flex-wrap gap-3 items-center justify-center">
        {/* Search for Book Title - Made more compact */}
        <div className="relative min-w-[180px]">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 h-4 w-4" />
          <Input
            type="text"
            placeholder="جستجو در عنوان..."
            value={currentFilters.search || ''}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="bg-white/20 border-white/30 text-white placeholder:text-white/60 hover:bg-white/30 focus:bg-white/30 pl-10 h-8 text-sm"
          />
        </div>

        {/* Search for Author - Made more compact */}
        <div className="relative min-w-[180px]">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 h-4 w-4" />
          <Input
            type="text"
            placeholder="جستجو نویسنده..."
            value={currentFilters.authorSearch || ''}
            onChange={(e) => handleAuthorSearchChange(e.target.value)}
            className="bg-white/20 border-white/30 text-white placeholder:text-white/60 hover:bg-white/30 focus:bg-white/30 pl-10 h-8 text-sm"
          />
        </div>

        {/* Category Dropdown - Made more compact */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="outline" 
              size="sm"
              className="bg-white/20 border-white/30 text-white hover:bg-white/30 hover:text-white transition-all duration-200 min-w-[140px] justify-between h-8 text-sm"
            >
              {getCategoryLabel()}
              <ChevronDown className="h-3 w-3 ml-1" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-white border border-gray-200 shadow-lg min-w-[140px] z-50">
            {allCategories.map((category) => (
              <DropdownMenuItem
                key={category.value}
                onClick={() => handleCategoryChange(category.value)}
                className="text-gray-900 hover:bg-gray-100 cursor-pointer text-sm"
              >
                {category.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Pages Dropdown - Made more compact */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="outline" 
              size="sm"
              className="bg-white/20 border-white/30 text-white hover:bg-white/30 hover:text-white transition-all duration-200 min-w-[140px] justify-between h-8 text-sm"
            >
              {getPagesLabel()}
              <ChevronDown className="h-3 w-3 ml-1" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-white border border-gray-200 shadow-lg min-w-[140px] z-50">
            {pageRanges.map((range) => (
              <DropdownMenuItem
                key={range.value}
                onClick={() => handlePagesChange(range.value)}
                className="text-gray-900 hover:bg-gray-100 cursor-pointer text-sm"
              >
                {range.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Age Range Dropdown - Made more compact */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="outline" 
              size="sm"
              className="bg-white/20 border-white/30 text-white hover:bg-white/30 hover:text-white transition-all duration-200 min-w-[140px] justify-between h-8 text-sm"
            >
              {getAgeRangeLabel()}
              <ChevronDown className="h-3 w-3 ml-1" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-white border border-gray-200 shadow-lg min-w-[140px] z-50">
            {ageRanges.map((range) => (
              <DropdownMenuItem
                key={range.value}
                onClick={() => handleAgeRangeChange(range.value)}
                className="text-gray-900 hover:bg-gray-100 cursor-pointer text-sm"
              >
                {range.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {activeFiltersCount > 0 && (
          <div className="text-white/80 text-xs bg-blue-500/30 px-2 py-1 rounded-full">
            فیلتر: {activeFiltersCount}
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterTabs;
