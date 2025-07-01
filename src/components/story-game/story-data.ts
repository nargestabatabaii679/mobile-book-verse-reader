import { StoryNode, Achievement, DragDropItem } from '@/types/story-game';

export const dragDropItems: DragDropItem[] = [
  { id: 'sword', name: 'شمشیر', type: 'tool', icon: '⚔️' },
  { id: 'key', name: 'کلید', type: 'tool', icon: '🗝️' },
  { id: 'map', name: 'نقشه', type: 'tool', icon: '🗺️' },
  { id: 'torch', name: 'مشعل', type: 'tool', icon: '🔦' },
  { id: 'rope', name: 'طناب', type: 'tool', icon: '🪢' },
  { id: 'wizard', name: 'جادوگر', type: 'character', icon: '🧙' },
  { id: 'knight', name: 'شوالیه', type: 'character', icon: '🤴' },
  { id: 'thief', name: 'دزد', type: 'character', icon: '🥷' },
];

export const storyNodes: StoryNode[] = [
  {
    id: '1',
    text: `سلام ${localStorage.getItem('storyGameProgress') ? JSON.parse(localStorage.getItem('storyGameProgress')!).gameState.playerName : 'ماجراجو'}! شما در ورودی یک قلعه باستانی ایستاده‌اید. دو مسیر پیش روی شماست. کدام یک را انتخاب می‌کنید؟`,
    backgroundGradient: 'bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900',
    choices: [
      { text: '🚪 از در اصلی وارد شوید', nextNodeId: '2', scoreImpact: 10 },
      { text: '🕳️ از پنجره پهلویی بالا بروید', nextNodeId: '3', scoreImpact: 15 },
      { text: '🔍 ابتدا اطراف قلعه را بررسی کنید', nextNodeId: '4', scoreImpact: 5 }
    ]
  },
  {
    id: '2',
    text: 'شما وارد تالار اصلی شدید. یک جعبه مرموز در وسط تالار قرار دارد که به یک رمز نیاز دارد. رمز عبارت است از نام پادشاه افسانه‌ای که این قلعه را ساخته است.',
    backgroundGradient: 'bg-gradient-to-br from-amber-800 via-yellow-700 to-orange-800',
    requiredInput: {
      type: 'text',
      prompt: 'نام پادشاه افسانه‌ای را وارد کنید:',
      correctAnswer: 'آرتور'
    },
    choices: [
      { text: 'ادامه به طبقه بالا', nextNodeId: '5', scoreImpact: 20 }
    ]
  },
  {
    id: '3',
    text: 'شما از پنجره بالا رفتید و خود را در یک اتاق پر از گنج دیدید! اما ناگهان یک اژدها ظاهر شد. برای فرار باید سه ابزار مناسب را انتخاب کنید.',
    backgroundGradient: 'bg-gradient-to-br from-red-800 via-orange-700 to-yellow-800',
    requiredInput: {
      type: 'dragdrop',
      prompt: 'سه ابزار مناسب برای فرار از اژدها را انتخاب کنید:',
      items: dragDropItems
    },
    choices: [
      { text: 'فرار موفق - ادامه ماجراجویی', nextNodeId: '6', scoreImpact: 25 }
    ]
  },
  {
    id: '4',
    text: 'در حین بررسی اطراف قلعه، یک تونل مخفی پیدا کردید که مستقیماً به خزانه منتهی می‌شود. چه اقدامی انجام می‌دهید؟',
    backgroundGradient: 'bg-gradient-to-br from-green-800 via-emerald-700 to-teal-800',
    choices: [
      { text: '🏃 بلافاصله وارد تونل شوید', nextNodeId: '7', scoreImpact: 20 },
      { text: '🔍 ابتدا تونل را بررسی کنید', nextNodeId: '8', scoreImpact: 15 },
      { text: '🚪 به در اصلی برگردید', nextNodeId: '2', scoreImpact: 5 }
    ]
  },
  {
    id: '5',
    text: 'در طبقه بالا با یک جادوگر مهربان آشنا شدید که به شما گنجی عطا کرد و راز قلعه را فاش کرد!',
    backgroundGradient: 'bg-gradient-to-br from-purple-800 via-indigo-700 to-blue-800',
    isEnd: true,
    scoreImpact: 30,
    choices: []
  },
  {
    id: '6',
    text: 'فرار شما از اژدها موفقیت‌آمیز بود! اژدها از شجاعت شما متاثر شد و گنج بزرگی به شما هدیه داد!',
    backgroundGradient: 'bg-gradient-to-br from-yellow-600 via-amber-500 to-orange-600',
    isEnd: true,
    scoreImpact: 35,
    choices: []
  },
  {
    id: '7',
    text: 'متاسفانه تونل یک تله بود! اما خوشبختانه با هوش خود توانستید فرار کنید.',
    backgroundGradient: 'bg-gradient-to-br from-red-700 via-pink-600 to-purple-700',
    isEnd: true,
    scoreImpact: -10,
    choices: []
  },
  {
    id: '8',
    text: 'بررسی دقیق شما نشان داد که تونل امن است! با احتیاط وارد شدید و گنج را پیدا کردید!',
    backgroundGradient: 'bg-gradient-to-br from-emerald-600 via-green-500 to-teal-600',
    isEnd: true,
    scoreImpact: 40,
    choices: []
  },
  {
    id: 'timeout',
    text: 'وقت شما تمام شد! اما تجربه ارزشمندی کسب کردید.',
    backgroundGradient: 'bg-gradient-to-br from-gray-600 via-slate-500 to-zinc-600',
    isEnd: true,
    scoreImpact: 0,
    choices: []
  }
];

export const achievements: Achievement[] = [
  {
    id: 'quick_explorer',
    name: 'کاوشگر سریع',
    description: 'ماجراجویی را در کمتر از 3 دقیقه تمام کنید',
    icon: '⚡',
    condition: (gameState) => {
      const timeSpent = (Date.now() - gameState.startTime) / 1000;
      return timeSpent < 180 && storyNodes.find(n => n.id === gameState.currentNodeId)?.isEnd || false;
    }
  },
  {
    id: 'wise_choice',
    name: 'انتخاب دانا',
    description: 'همه انتخاب‌های خود را بدون اشتباه انجام دهید',
    icon: '🧠',
    condition: (gameState) => gameState.score >= 50
  },
  {
    id: 'brave_heart',
    name: 'قلب شجاع',
    description: 'مسیر خطرناک را انتخاب کنید',
    icon: '❤️',
    condition: (gameState) => gameState.history.includes('3')
  },
  {
    id: 'treasure_hunter',
    name: 'شکارچی گنج',
    description: 'همه گنج‌ها را پیدا کنید',
    icon: '💎',
    condition: (gameState) => gameState.score >= 75
  },
  {
    id: 'master_explorer',
    name: 'استاد کاوشگری',
    description: 'بیش از 5 انتخاب انجام دهید',
    icon: '🏆',
    condition: (gameState) => gameState.choicesMade >= 5
  }
];