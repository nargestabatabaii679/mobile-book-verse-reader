import { useState, useEffect, useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { config } from '@/config';
import {
    isOnline,
    createNetworkStatusListener,
    testSupabaseConnectivity,
    isNetworkError
} from '@/utils/networkUtils'; interface ErrorState {
    hasError: boolean;
    errorType: 'network' | 'server' | 'auth' | 'unknown';
    errorMessage: string;
    lastError?: unknown;
    retryCount: number;
    isRecovering: boolean;
}

export const useErrorRecovery = () => {
    const queryClient = useQueryClient();
    const [errorState, setErrorState] = useState<ErrorState>({
        hasError: false,
        errorType: 'unknown',
        errorMessage: '',
        retryCount: 0,
        isRecovering: false,
    });

    const [isNetworkOnline, setIsNetworkOnline] = useState(isOnline());

    // Clear error state
    const clearError = useCallback(() => {
        setErrorState({
            hasError: false,
            errorType: 'unknown',
            errorMessage: '',
            retryCount: 0,
            isRecovering: false,
        });
    }, []);

    // Determine error type from error object
    const getErrorType = useCallback((error: unknown): ErrorState['errorType'] => {
        const err = error as { code?: string; status?: number; message?: string };

        if (err?.code === 'PGRST301' || err?.status === 401 || err?.status === 403) {
            return 'auth';
        }

        if (isNetworkError(error) || !isOnline()) {
            return 'network';
        }

        if (err?.status && err.status >= 500) {
            return 'server';
        }

        return 'unknown';
    }, []);

    // Handle error occurrence
    const handleError = useCallback((error: unknown, context?: string) => {
        const errorType = getErrorType(error);
        const err = error as { message?: string };

        let errorMessage = 'خطای نامشخص رخ داده است';

        switch (errorType) {
            case 'network':
                errorMessage = 'خطا در اتصال به شبکه';
                break;
            case 'server':
                errorMessage = 'خطا در سرور';
                break;
            case 'auth':
                errorMessage = 'خطا در احراز هویت';
                break;
            default:
                errorMessage = err?.message || 'خطای نامشخص';
        }

        if (context) {
            console.error(`Error in ${context}:`, error);
        }

        setErrorState(prev => ({
            hasError: true,
            errorType,
            errorMessage,
            lastError: error,
            retryCount: prev.retryCount + 1,
            isRecovering: false,
        }));

        // Don't show toast for network errors when offline
        if (!(errorType === 'network' && !isOnline())) {
            toast.error(errorMessage);
        }
    }, [getErrorType]);

    // Attempt recovery
    const attemptRecovery = useCallback(async () => {
        setErrorState(prev => ({ ...prev, isRecovering: true }));

        try {
            // Check network connectivity
            if (!isOnline()) {
                throw new Error('No internet connection');
            }

            // Test Supabase connectivity
            const isSupabaseHealthy = await testSupabaseConnectivity();
            if (!isSupabaseHealthy) {
                throw new Error('Supabase server unreachable');
            }

            // If we get here, connection is restored
            clearError();

            // Invalidate and refetch all queries
            await queryClient.invalidateQueries();

            toast.success('اتصال برقرار شد و داده‌ها به‌روزرسانی شدند');

        } catch (recoveryError) {
            console.error('Recovery failed:', recoveryError);
            setErrorState(prev => ({
                ...prev,
                isRecovering: false,
                retryCount: prev.retryCount + 1
            }));

            // Show different message based on error type
            if (!isOnline()) {
                toast.error('هنوز اتصال اینترنت موجود نیست');
            } else {
                toast.error('عدم موفقیت در برقراری اتصال');
            }
        }
    }, [queryClient, clearError]);

    // Auto-recovery when network comes back online
    useEffect(() => {
        const cleanup = createNetworkStatusListener(
            async () => {
                setIsNetworkOnline(true);
                if (errorState.hasError && errorState.errorType === 'network') {
                    // Wait a moment for connection to stabilize
                    setTimeout(attemptRecovery, 1000);
                }
            },
            () => {
                setIsNetworkOnline(false);
                if (!errorState.hasError) {
                    handleError(new Error('Network offline'), 'Network status change');
                }
            }
        );

        return cleanup;
    }, [errorState.hasError, errorState.errorType, attemptRecovery, handleError]);

    // Auto-retry for temporary errors
    useEffect(() => {
        if (errorState.hasError && !errorState.isRecovering && errorState.retryCount < config.api.maxRetries) {
            const delay = Math.min(config.api.retryDelay * Math.pow(2, errorState.retryCount), 10000);
            const timeout = setTimeout(() => {
                if (errorState.errorType !== 'auth') {
                    attemptRecovery();
                }
            }, delay);

            return () => clearTimeout(timeout);
        }
    }, [errorState, attemptRecovery]); return {
        errorState,
        isNetworkOnline,
        handleError,
        clearError,
        attemptRecovery,
    };
};

export default useErrorRecovery;
