import React from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Info, ExternalLink, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SupabaseSetupWarningProps {
    isVisible?: boolean;
}

export const SupabaseSetupWarning: React.FC<SupabaseSetupWarningProps> = ({
    isVisible = true
}) => {
    const [isDismissed, setIsDismissed] = React.useState(false);

    // Check if we're using demo/mock configuration
    const isUsingDemo = import.meta.env.VITE_SUPABASE_URL === 'https://demo-project.supabase.co' ||
        import.meta.env.VITE_FORCE_OFFLINE === 'true';

    React.useEffect(() => {
        const dismissed = localStorage.getItem('supabase-warning-dismissed');
        if (dismissed === 'true') {
            setIsDismissed(true);
        }
    }, []);

    const handleSetupGuide = () => {
        window.open('https://supabase.com/docs/guides/getting-started', '_blank');
    };

    const handleDismiss = () => {
        setIsDismissed(true);
        localStorage.setItem('supabase-warning-dismissed', 'true');
    };

    if (!isVisible || isDismissed || !isUsingDemo) {
        return null;
    }

    return (
        <Alert className="border-orange-200 bg-orange-50 text-orange-800 mb-4">
            <Info className="h-4 w-4" />
            <AlertDescription>
                <div className="flex flex-col gap-3">
                    <div>
                        <h4 className="font-medium text-orange-900 mb-1">
                            🧪 حالت Demo - تنظیم Supabase مورد نیاز است
                        </h4>
                        <p className="text-sm">
                            در حال حاضر از داده‌های نمونه استفاده می‌شود. برای استفاده کامل از برنامه،
                            لطفاً پروژه Supabase خود را تنظیم کنید.
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        <Button
                            size="sm"
                            variant="outline"
                            onClick={handleSetupGuide}
                            className="h-8 text-xs"
                        >
                            <ExternalLink className="h-3 w-3 mr-1" />
                            راهنمای تنظیم Supabase
                        </Button>

                        <Button
                            size="sm"
                            variant="outline"
                            onClick={() => window.location.href = '/diagnostics'}
                            className="h-8 text-xs"
                        >
                            <Settings className="h-3 w-3 mr-1" />
                            تست اتصالات
                        </Button>

                        <Button
                            size="sm"
                            variant="ghost"
                            onClick={handleDismiss}
                            className="h-8 text-xs text-orange-600 hover:text-orange-800"
                        >
                            متوجه شدم
                        </Button>
                    </div>

                    <div className="text-xs text-orange-600 border-t border-orange-200 pt-2">
                        <strong>برای تنظیم:</strong>
                        <ol className="list-decimal list-inside mt-1 space-y-1">
                            <li>پروژه جدید در <a href="https://supabase.com" target="_blank" className="underline">Supabase.com</a> ایجاد کنید</li>
                            <li>URL و API Key پروژه را کپی کنید</li>
                            <li>در فایل <code className="bg-orange-100 px-1 rounded">.env</code> قرار دهید</li>
                        </ol>
                    </div>
                </div>
            </AlertDescription>
        </Alert>
    );
};

export default SupabaseSetupWarning;
