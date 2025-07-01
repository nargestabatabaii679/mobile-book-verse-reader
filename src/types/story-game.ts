// Story Game Types
export interface StoryNode {
  id: string;
  text: string;
  choices: StoryChoice[];
  isEnd?: boolean;
  scoreImpact?: number;
  backgroundGradient?: string;
  soundEffect?: string;
  requiredInput?: {
    type: 'text' | 'dragdrop';
    prompt: string;
    correctAnswer?: string;
    items?: DragDropItem[];
  };
}

export interface StoryChoice {
  text: string;
  nextNodeId: string;
  scoreImpact?: number;
  soundEffect?: string;
}

export interface DragDropItem {
  id: string;
  name: string;
  type: 'tool' | 'character' | 'object';
  icon: string;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  condition: (gameState: GameState) => boolean;
  unlocked?: boolean;
}

export interface GameState {
  currentNodeId: string;
  score: number;
  choicesMade: number;
  startTime: number;
  timeLeft: number;
  history: string[];
  achievements: Achievement[];
  playerName?: string;
}

export interface SavedProgress {
  gameState: GameState;
  timestamp: number;
}