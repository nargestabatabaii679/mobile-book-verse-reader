import React, { useState, useEffect } from 'react';
import { AlertCircle, Wifi, WifiOff, CheckCircle2 } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
    createNetworkStatusListener,
    getNetworkInfo,
    testSupabaseConnectivity,
    isOnline
} from '@/utils/networkUtils';

interface ConnectionStatusProps {
    className?: string;
    showWhenOnline?: boolean;
}

export const ConnectionStatus: React.FC<ConnectionStatusProps> = ({
    className = '',
    showWhenOnline = false
}) => {
    const [isNetworkOnline, setIsNetworkOnline] = useState(isOnline());
    const [isSupabaseOnline, setIsSupabaseOnline] = useState(true);
    const [lastChecked, setLastChecked] = useState<Date | null>(null);

    const checkConnectivity = async () => {
        const networkOnline = isOnline();
        setIsNetworkOnline(networkOnline);

        if (networkOnline) {
            const supabaseOnline = await testSupabaseConnectivity();
            setIsSupabaseOnline(supabaseOnline);
        } else {
            setIsSupabaseOnline(false);
        }

        setLastChecked(new Date());
    };

    useEffect(() => {
        // Initial check
        checkConnectivity();

        // Set up network listeners
        const cleanup = createNetworkStatusListener(
            () => {
                setIsNetworkOnline(true);
                checkConnectivity();
            },
            () => {
                setIsNetworkOnline(false);
                setIsSupabaseOnline(false);
                setLastChecked(new Date());
            }
        );

        // Periodic connectivity check
        const interval = setInterval(checkConnectivity, 30000); // Check every 30 seconds

        return () => {
            cleanup();
            clearInterval(interval);
        };
    }, []);

    // Don't show anything if online and showWhenOnline is false
    if (!showWhenOnline && isNetworkOnline && isSupabaseOnline) {
        return null;
    }

    const getStatusInfo = () => {
        if (!isNetworkOnline) {
            return {
                icon: WifiOff,
                variant: 'destructive' as const,
                message: 'اتصال اینترنت موجود نیست',
                description: 'لطفاً اتصال اینترنت خود را بررسی کنید'
            };
        }

        if (!isSupabaseOnline) {
            return {
                icon: AlertCircle,
                variant: 'destructive' as const,
                message: 'خطا در اتصال به سرور',
                description: 'در حال تلاش برای اتصال مجدد...'
            };
        }

        return {
            icon: CheckCircle2,
            variant: 'default' as const,
            message: 'اتصال برقرار است',
            description: lastChecked ? `آخرین بررسی: ${lastChecked.toLocaleTimeString('fa-IR')}` : ''
        };
    };

    const { icon: Icon, variant, message, description } = getStatusInfo();

    return (
        <Alert variant={variant} className={className}>
            <Icon className="h-4 w-4" />
            <AlertDescription>
                <div className="flex flex-col gap-1">
                    <span className="font-medium">{message}</span>
                    {description && <span className="text-sm opacity-80">{description}</span>}
                </div>
            </AlertDescription>
        </Alert>
    );
};

export default ConnectionStatus;
