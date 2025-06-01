
import React from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown } from 'lucide-react';

interface FilterTabsProps {
  selectedCategory: string;
  selectedPages: string;
  onCategoryChange: (category: string) => void;
  onPagesChange: (pages: string) => void;
}

const FilterTabs: React.FC<FilterTabsProps> = ({
  selectedCategory,
  selectedPages,
  onCategoryChange,
  onPagesChange,
}) => {
  const categories = [
    { value: 'all', label: 'همه دسته‌ها' },
    { value: 'ادبیات', label: 'ادبیات' },
    { value: 'تاریخ', label: 'تاریخ' },
    { value: 'علوم', label: 'علوم' },
    { value: 'فلسفه', label: 'فلسفه' },
    { value: 'کودک و نوجوان', label: 'کودک و نوجوان' },
    { value: 'روانشناسی', label: 'روانشناسی' },
    { value: 'اقتصاد', label: 'اقتصاد' },
    { value: 'هنر', label: 'هنر' },
  ];

  const pageRanges = [
    { value: 'all', label: 'همه تعداد صفحات' },
    { value: '0-100', label: 'کمتر از 100 صفحه' },
    { value: '100-200', label: '100-200 صفحه' },
    { value: '200-300', label: '200-300 صفحه' },
    { value: '300+', label: 'بیش از 300 صفحه' },
  ];

  const getCategoryLabel = (value: string) => {
    return categories.find(cat => cat.value === value)?.label || 'همه دسته‌ها';
  };

  const getPagesLabel = (value: string) => {
    return pageRanges.find(range => range.value === value)?.label || 'همه تعداد صفحات';
  };

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
              {getCategoryLabel(selectedCategory)}
              <ChevronDown className="h-4 w-4 ml-2" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-white border border-gray-200 shadow-lg min-w-[180px] z-50">
            {categories.map((category) => (
              <DropdownMenuItem
                key={category.value}
                onClick={() => onCategoryChange(category.value)}
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
              {getPagesLabel(selectedPages)}
              <ChevronDown className="h-4 w-4 ml-2" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-white border border-gray-200 shadow-lg min-w-[180px] z-50">
            {pageRanges.map((range) => (
              <DropdownMenuItem
                key={range.value}
                onClick={() => onPagesChange(range.value)}
                className="text-gray-900 hover:bg-gray-100 cursor-pointer"
              >
                {range.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default FilterTabs;
