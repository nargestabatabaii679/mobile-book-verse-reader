
export interface Book {
  id: string;
  title: string;
  author: string;
  translator?: string;
  category: string;
  pages: number;
  coverUrl: string;
  cover?: string; // Add cover field for backward compatibility
  description: string;
  publishYear: number;
  rating: number;
  isbn: string;
  ageRange?: string;
  pagesContent?: string[];
  downloadUrl?: string;
}

export interface FilterOptions {
  search: string;
  authorSearch: string;
  categories: string[];
  sortBy: string;
  minPages: number;
  maxPages: number;
  ageRange: string;
}
