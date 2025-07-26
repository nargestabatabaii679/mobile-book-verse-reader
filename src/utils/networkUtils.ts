// Network utility functions for connection monitoring and error handling
import { config } from '@/config';

export interface NetworkStatus {
    isOnline: boolean;
    effectiveType?: string;
    downlink?: number;
    rtt?: number;
}// Check if browser is online
export const isOnline = (): boolean => {
    return typeof navigator !== 'undefined' ? navigator.onLine : true;
};

// Get network information (if available)
export const getNetworkInfo = (): NetworkStatus => {
    const status: NetworkStatus = {
        isOnline: isOnline(),
    };

    // Check if Network Information API is available
    if (typeof navigator !== 'undefined' && 'connection' in navigator) {
        const connection = (navigator as Navigator & { connection?: { effectiveType?: string; downlink?: number; rtt?: number } }).connection;
        if (connection) {
            status.effectiveType = connection.effectiveType;
            status.downlink = connection.downlink;
            status.rtt = connection.rtt;
        }
    }

    return status;
};

// Check if error is network-related
export const isNetworkError = (error: unknown): boolean => {
    const err = error as { message?: string; code?: string; name?: string };

    if (!err) return false;

    const networkErrorPatterns = [
        'fetch',
        'network',
        'timeout',
        'offline',
        'connection',
        'failed to fetch',
        'networkerror',
        'aborted',
        'cors',
    ];

    const errorMessage = (err.message || '').toLowerCase();
    const errorCode = (err.code || '').toLowerCase();
    const errorName = (err.name || '').toLowerCase();

    return networkErrorPatterns.some(pattern =>
        errorMessage.includes(pattern) ||
        errorCode.includes(pattern) ||
        errorName.includes(pattern)
    );
};

// Create network status listener
export const createNetworkStatusListener = (
    onOnline: () => void,
    onOffline: () => void
): (() => void) => {
    if (typeof window === 'undefined') {
        return () => { }; // No-op for SSR
    }

    const handleOnline = () => {
        console.log('Network: Online');
        onOnline();
    };

    const handleOffline = () => {
        console.log('Network: Offline');
        onOffline();
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Return cleanup function
    return () => {
        window.removeEventListener('online', handleOnline);
        window.removeEventListener('offline', handleOffline);
    };
};

// Enhanced ping function to test connectivity
export const pingServer = async (url: string = 'https://www.google.com', timeout: number = config.network.timeout): Promise<boolean> => {
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), timeout);

        const response = await fetch(url, {
            method: 'HEAD',
            mode: 'no-cors',
            signal: controller.signal,
        });

        clearTimeout(timeoutId);
        return true;
    } catch (error) {
        if (config.debug.enabled) {
            console.log('Ping failed:', error);
        }
        return false;
    }
};

// Test Supabase connectivity specifically
export const testSupabaseConnectivity = async (): Promise<boolean> => {
    try {
        const response = await fetch(`${config.supabase.url}/rest/v1/`, {
            method: 'HEAD',
            headers: {
                'apikey': config.supabase.anonKey
            }
        });

        return response.ok || response.status === 400; // 400 is normal for HEAD request without proper endpoint
    } catch (error) {
        if (config.debug.enabled) {
            console.log('Supabase connectivity test failed:', error);
        }
        return false;
    }
};// Retry with exponential backoff
export const retryWithBackoff = async <T>(
    fn: () => Promise<T>,
    maxRetries: number = 3,
    initialDelay: number = 1000
): Promise<T> => {
    let lastError: unknown;

    for (let attempt = 0; attempt <= maxRetries; attempt++) {
        try {
            return await fn();
        } catch (error) {
            lastError = error;

            if (attempt === maxRetries) {
                break;
            }

            // Don't retry for authentication errors
            const err = error as { code?: string; status?: number };
            if (err?.code === 'PGRST301' || err?.status === 401 || err?.status === 403) {
                break;
            }

            const delay = initialDelay * Math.pow(2, attempt);
            console.log(`Attempt ${attempt + 1} failed, retrying in ${delay}ms...`);
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }

    throw lastError;
};
