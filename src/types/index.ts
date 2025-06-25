
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
  interactiveStoryId?: string; // New field for interactive stories
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

// Interactive Story Types
export interface BranchOption {
  id: string;
  text: string;
  nextBranchId: string | null; // null means ending
}

export interface Branch {
  id: string;
  title: string;
  content: string;
  options: BranchOption[];
  isEnding?: boolean;
  endingType?: 'happy' | 'sad' | 'neutral';
}

export interface Story {
  id: string;
  title: string;
  description: string;
  startBranchId: string;
  branches: Branch[];
}

export interface StoryProgress {
  storyId: string;
  currentBranchId: string;
  choicesMade: string[];
  completedAt?: Date;
}
