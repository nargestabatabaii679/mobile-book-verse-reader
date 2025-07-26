import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { RefreshCw, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';
import { checkSupabaseConnection } from '@/integrations/supabase/client';
import { testSupabaseConnectivity, getNetworkInfo, isOnline } from '@/utils/networkUtils';

interface DiagnosticResult {
    name: string;
    status: 'success' | 'error' | 'warning' | 'pending';
    message: string;
    details?: string;
}

export const DiagnosticsPage: React.FC = () => {
    const [results, setResults] = useState<DiagnosticResult[]>([]);
    const [isRunning, setIsRunning] = useState(false);

    const runDiagnostics = async () => {
        setIsRunning(true);
        const newResults: DiagnosticResult[] = [];

        // Test 1: Network connectivity
        try {
            const networkInfo = getNetworkInfo();
            const online = isOnline();

            newResults.push({
                name: 'اتصال به شبکه',
                status: online ? 'success' : 'error',
                message: online ? 'متصل به اینترنت' : 'قطع اتصال اینترنت',
                details: `نوع اتصال: ${networkInfo.effectiveType || 'نامشخص'}, سرعت: ${networkInfo.downlink || 'نامشخص'} Mbps`
            });
        } catch (error) {
            newResults.push({
                name: 'اتصال به شبکه',
                status: 'error',
                message: 'خطا در بررسی شبکه',
                details: String(error)
            });
        }

        // Test 2: Supabase URL connectivity
        try {
            const isSupabaseReachable = await testSupabaseConnectivity();
            newResults.push({
                name: 'دسترسی به Supabase',
                status: isSupabaseReachable ? 'success' : 'error',
                message: isSupabaseReachable ? 'سرور Supabase در دسترس' : 'سرور Supabase در دسترس نیست',
                details: 'https://awiphzyrlorpexpfclze.supabase.co'
            });
        } catch (error) {
            newResults.push({
                name: 'دسترسی به Supabase',
                status: 'error',
                message: 'خطا در اتصال به Supabase',
                details: String(error)
            });
        }

        // Test 3: Supabase client health
        try {
            const isHealthy = await checkSupabaseConnection();
            newResults.push({
                name: 'سلامت کلاینت Supabase',
                status: isHealthy ? 'success' : 'error',
                message: isHealthy ? 'کلاینت Supabase سالم' : 'مشکل در کلاینت Supabase',
                details: 'بررسی اتصال به جدول interactive_stories'
            });
        } catch (error) {
            newResults.push({
                name: 'سلامت کلاینت Supabase',
                status: 'error',
                message: 'خطا در بررسی کلاینت',
                details: String(error)
            });
        }

        // Test 4: DNS resolution
        try {
            const start = Date.now();
            await fetch('https://8.8.8.8', { method: 'HEAD', mode: 'no-cors' });
            const dnsTime = Date.now() - start;

            newResults.push({
                name: 'رفع نام DNS',
                status: dnsTime < 1000 ? 'success' : 'warning',
                message: dnsTime < 1000 ? 'DNS سریع' : 'DNS کند',
                details: `زمان پاسخ: ${dnsTime}ms`
            });
        } catch (error) {
            newResults.push({
                name: 'رفع نام DNS',
                status: 'error',
                message: 'مشکل در DNS',
                details: String(error)
            });
        }

        // Test 5: CORS and browser capabilities
        try {
            const hasLocalStorage = typeof localStorage !== 'undefined';
            const hasSessionStorage = typeof sessionStorage !== 'undefined';
            const hasFetch = typeof fetch !== 'undefined';

            newResults.push({
                name: 'قابلیت‌های مرورگر',
                status: hasLocalStorage && hasSessionStorage && hasFetch ? 'success' : 'warning',
                message: 'مرورگر از ویژگی‌های مورد نیاز پشتیبانی می‌کند',
                details: `localStorage: ${hasLocalStorage}, sessionStorage: ${hasSessionStorage}, fetch: ${hasFetch}`
            });
        } catch (error) {
            newResults.push({
                name: 'قابلیت‌های مرورگر',
                status: 'error',
                message: 'مشکل در قابلیت‌های مرورگر',
                details: String(error)
            });
        }

        setResults(newResults);
        setIsRunning(false);
    };

    useEffect(() => {
        runDiagnostics();
    }, []);

    const getStatusIcon = (status: DiagnosticResult['status']) => {
        switch (status) {
            case 'success':
                return <CheckCircle2 className="h-5 w-5 text-green-500" />;
            case 'error':
                return <XCircle className="h-5 w-5 text-red-500" />;
            case 'warning':
                return <AlertCircle className="h-5 w-5 text-yellow-500" />;
            default:
                return <RefreshCw className="h-5 w-5 text-gray-500 animate-spin" />;
        }
    };

    const getStatusBadge = (status: DiagnosticResult['status']) => {
        const variants = {
            success: 'default',
            error: 'destructive',
            warning: 'secondary',
            pending: 'outline'
        } as const;

        const labels = {
            success: 'موفق',
            error: 'خطا',
            warning: 'هشدار',
            pending: 'در حال بررسی'
        } as const;

        return <Badge variant={variants[status]}>{labels[status]}</Badge>;
    };

    return (
        <div className="container mx-auto p-6 max-w-4xl">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <RefreshCw className="h-6 w-6" />
                        تشخیص مشکلات اتصال
                    </CardTitle>
                    <CardDescription>
                        بررسی سلامت اتصالات شبکه و سرور برای تشخیص مشکلات
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                        <h3 className="text-lg font-semibold">نتایج تست‌ها</h3>
                        <Button
                            onClick={runDiagnostics}
                            disabled={isRunning}
                            variant="outline"
                            size="sm"
                        >
                            {isRunning ? (
                                <>
                                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                                    در حال بررسی...
                                </>
                            ) : (
                                <>
                                    <RefreshCw className="h-4 w-4 mr-2" />
                                    اجرای مجدد
                                </>
                            )}
                        </Button>
                    </div>

                    <Separator />

                    <div className="space-y-3">
                        {results.map((result, index) => (
                            <div key={index} className="flex items-start gap-3 p-3 border rounded-lg">
                                {getStatusIcon(result.status)}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                        <h4 className="font-medium">{result.name}</h4>
                                        {getStatusBadge(result.status)}
                                    </div>
                                    <p className="text-sm text-gray-600 mb-1">{result.message}</p>
                                    {result.details && (
                                        <p className="text-xs text-gray-500 font-mono">{result.details}</p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    {results.length === 0 && !isRunning && (
                        <div className="text-center py-8 text-gray-500">
                            هیچ تستی اجرا نشده است
                        </div>
                    )}

                    <Separator />

                    <div className="text-sm text-gray-600">
                        <h4 className="font-medium mb-2">راهنمای رفع مشکل:</h4>
                        <ul className="space-y-1 text-xs">
                            <li>• اگر اتصال شبکه قطع است، اتصال اینترنت خود را بررسی کنید</li>
                            <li>• اگر Supabase در دسترس نیست، مشکل موقتی سرور ممکن است</li>
                            <li>• اگر DNS کند است، تنظیمات DNS خود را بررسی کنید</li>
                            <li>• در صورت مشکل مرورگر، مرورگر خود را به‌روزرسانی کنید</li>
                        </ul>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default DiagnosticsPage;
