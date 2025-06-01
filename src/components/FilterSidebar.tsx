
import React from 'react';
import { Book, FilterOptions } from '@/types';

interface FilterSidebarProps {
  books: Book[];
  onFilter: (filtered: Book[]) => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({ books, onFilter }) => {
  // This is a placeholder component for compatibility
  // The actual filtering is now handled by FilterTabs
  return null;
};

export default FilterSidebar;
