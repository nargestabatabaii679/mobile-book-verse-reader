// Environment-based configuration utility
export interface AppConfig {
    // Supabase
    supabase: {
        url: string;
        anonKey: string;
    };

    // Application
    app: {
        name: string;
        version: string;
        description: string;
        environment: string;
    };

    // API
    api: {
        timeout: number;
        maxRetries: number;
        retryDelay: number;
    };

    // Debug
    debug: {
        enabled: boolean;
        enableLogging: boolean;
        logLevel: 'error' | 'warn' | 'info' | 'debug';
    };

    // Security
    security: {
        enableAnalytics: boolean;
        sentryDsn?: string;
    };

    // Network
    network: {
        timeout: number;
        connectionCheckInterval: number;
    };

    // Cache
    cache: {
        duration: number;
        staleTime: number;
    };
}

// Get configuration from environment variables
export const getConfig = (): AppConfig => {
    return {
        supabase: {
            url: import.meta.env.VITE_SUPABASE_URL || '',
            anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY || '',
        },

        app: {
            name: import.meta.env.VITE_APP_NAME || 'Mobile Book Verse Reader',
            version: import.meta.env.VITE_APP_VERSION || '1.0.0',
            description: import.meta.env.VITE_APP_DESCRIPTION || 'A comprehensive mobile book reading platform',
            environment: import.meta.env.VITE_APP_ENV || 'development',
        },

        api: {
            timeout: parseInt(import.meta.env.VITE_API_TIMEOUT || '30000'),
            maxRetries: parseInt(import.meta.env.VITE_MAX_RETRIES || '3'),
            retryDelay: parseInt(import.meta.env.VITE_RETRY_DELAY || '1000'),
        },

        debug: {
            enabled: import.meta.env.VITE_DEBUG_MODE === 'true',
            enableLogging: import.meta.env.VITE_ENABLE_LOGGING === 'true',
            logLevel: (import.meta.env.VITE_LOG_LEVEL as AppConfig['debug']['logLevel']) || 'info',
        },

        security: {
            enableAnalytics: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
            sentryDsn: import.meta.env.VITE_SENTRY_DSN || undefined,
        },

        network: {
            timeout: parseInt(import.meta.env.VITE_NETWORK_TIMEOUT || '10000'),
            connectionCheckInterval: parseInt(import.meta.env.VITE_CONNECTION_CHECK_INTERVAL || '30000'),
        },

        cache: {
            duration: parseInt(import.meta.env.VITE_CACHE_DURATION || '300000'),
            staleTime: parseInt(import.meta.env.VITE_STALE_TIME || '300000'),
        },
    };
};

// Export the configuration instance
export const config = getConfig();

// Validate required configuration
export const validateConfig = (config: AppConfig): void => {
    const errors: string[] = [];

    if (!config.supabase.url) {
        errors.push('VITE_SUPABASE_URL is required');
    }

    if (!config.supabase.anonKey) {
        errors.push('VITE_SUPABASE_ANON_KEY is required');
    }

    if (!config.supabase.url.startsWith('https://')) {
        errors.push('VITE_SUPABASE_URL must be a valid HTTPS URL');
    }

    if (config.api.timeout < 1000) {
        errors.push('VITE_API_TIMEOUT must be at least 1000ms');
    }

    if (config.api.maxRetries < 0 || config.api.maxRetries > 10) {
        errors.push('VITE_MAX_RETRIES must be between 0 and 10');
    }

    if (errors.length > 0) {
        throw new Error(`Configuration validation failed:\n${errors.join('\n')}`);
    }
};

// Initialize and validate configuration
try {
    validateConfig(config);

    if (config.debug.enabled) {
        console.log('📋 Application Configuration:', {
            environment: config.app.environment,
            supabaseUrl: config.supabase.url,
            apiTimeout: config.api.timeout,
            debugMode: config.debug.enabled,
            logLevel: config.debug.logLevel
        });
    }
} catch (error) {
    console.error('❌ Configuration Error:', error);
    if (config.app.environment === 'development') {
        console.error('💡 Please check your .env file and ensure all required variables are set');
    }
}
