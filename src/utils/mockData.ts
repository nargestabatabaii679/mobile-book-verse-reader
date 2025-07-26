// Offline/Mock data provider for when Supabase is not available
import type { InteractiveStory, StoryNode, StoryChoice } from '@/hooks/useInteractiveStories';

// Mock data for testing without Supabase connection
export const mockInteractiveStories: InteractiveStory[] = [
    {
        id: '1',
        title: 'ماجراجویی در غار اسرارآمیز',
        description: 'داستانی هیجان‌انگیز در دل کوه‌های مرموز',
        cover_url: '/placeholder.svg',
        difficulty_level: 'متوسط',
        estimated_time: 15,
        category: 'ماجراجویی',
        age_range: '12+',
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    },
    {
        id: '2',
        title: 'راز کاروانسرای قدیمی',
        description: 'رمز و رازهای پنهان در کاروانسرای تاریخی',
        cover_url: '/placeholder.svg',
        difficulty_level: 'آسان',
        estimated_time: 10,
        category: 'معمایی',
        age_range: '8+',
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    },
    {
        id: '3',
        title: 'سفر به ستارگان',
        description: 'ماجراجویی فضایی در کهکشان‌های دور',
        cover_url: '/placeholder.svg',
        difficulty_level: 'سخت',
        estimated_time: 25,
        category: 'علمی-تخیلی',
        age_range: '14+',
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    }
];

export const mockStoryNodes: Record<string, StoryNode[]> = {
    '1': [
        {
            id: 'node_1_1',
            story_id: '1',
            node_id: 'start',
            title: 'آغاز ماجراجویی',
            content: 'شما در مقابل دهانه غار اسرارآمیز ایستاده‌اید. باد سردی از عمق غار می‌وزد...',
            background_image: '/story-bg-1.jpg',
            is_ending: false,
            score_impact: 0,
        },
        {
            id: 'node_1_2',
            story_id: '1',
            node_id: 'cave_entrance',
            title: 'ورود به غار',
            content: 'با احتیاط وارد غار می‌شوید. صدای قطره‌های آب از سقف غار می‌آید...',
            background_image: '/story-bg-2.jpg',
            is_ending: false,
            score_impact: 10,
        }
    ]
};

export const mockStoryChoices: Record<string, StoryChoice[]> = {
    '1': [
        {
            id: 'choice_1_1',
            node_id: 'node_1_1',
            choice_text: 'با جرأت وارد غار شوید',
            next_node_id: 'node_1_2',
            score_impact: 10,
            order_index: 1,
        },
        {
            id: 'choice_1_2',
            node_id: 'node_1_1',
            choice_text: 'ابتدا اطراف غار را بررسی کنید',
            next_node_id: 'node_1_2',
            score_impact: 5,
            order_index: 2,
        }
    ]
};

// Check if we're in offline mode
export const isOfflineMode = (): boolean => {
    return !navigator.onLine || localStorage.getItem('forceOfflineMode') === 'true';
};

// Store data in localStorage for offline use
export const storeOfflineData = (key: string, data: unknown): void => {
    try {
        localStorage.setItem(`offline_${key}`, JSON.stringify(data));
    } catch (error) {
        console.warn('Failed to store offline data:', error);
    }
};

// Retrieve data from localStorage
export const getOfflineData = (key: string): unknown => {
    try {
        const data = localStorage.getItem(`offline_${key}`);
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.warn('Failed to retrieve offline data:', error);
        return null;
    }
};

// Simulate network delay for mock data
export const simulateNetworkDelay = (ms: number = 500): Promise<void> => {
    return new Promise(resolve => setTimeout(resolve, ms));
};

// Mock implementation of Supabase operations
export class MockSupabaseClient {
    async from(table: string) {
        await simulateNetworkDelay();

        switch (table) {
            case 'interactive_stories':
                return {
                    select: () => ({
                        eq: () => ({
                            order: () => ({
                                data: mockInteractiveStories,
                                error: null
                            })
                        })
                    }),
                    insert: (data: Partial<InteractiveStory>[]) => ({
                        select: () => ({
                            single: () => ({
                                data: { ...data[0], id: Date.now().toString() },
                                error: null
                            })
                        })
                    }),
                    update: (data: Partial<InteractiveStory>) => ({
                        eq: () => ({
                            select: () => ({
                                single: () => ({
                                    data: { ...data, id: '1' },
                                    error: null
                                })
                            })
                        })
                    }),
                    delete: () => ({
                        eq: () => ({
                            error: null
                        })
                    })
                };

            case 'story_nodes':
                return {
                    select: () => ({
                        eq: (field: string, value: string) => ({
                            data: mockStoryNodes[value] || [],
                            error: null
                        })
                    })
                };

            case 'story_choices':
                return {
                    select: () => ({
                        in: () => ({
                            order: () => ({
                                data: mockStoryChoices['1'] || [],
                                error: null
                            })
                        })
                    })
                };

            default:
                return {
                    select: () => ({
                        data: [],
                        error: null
                    })
                };
        }
    }
}

export const mockSupabase = new MockSupabaseClient();
