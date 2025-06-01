
export interface Book {
  id: string;
  title: string;
  author: string;
  category: string;
  pages: number;
  coverUrl: string;
  description: string;
  publishYear: number;
  rating: number;
  isbn: string;
  ageRange?: string;
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
