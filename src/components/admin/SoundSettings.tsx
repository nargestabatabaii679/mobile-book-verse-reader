
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Volume2, VolumeX, TestTube } from 'lucide-react';
import { audioManager } from '@/utils/audioUtils';

const SoundSettings = () => {
  const [soundEnabled, setSoundEnabled] = useState(() => {
    const saved = localStorage.getItem('soundEnabled');
    return saved !== null ? JSON.parse(saved) : true;
  });

  useEffect(() => {
    localStorage.setItem('soundEnabled', JSON.stringify(soundEnabled));
    audioManager.setSoundEnabled(soundEnabled);
  }, [soundEnabled]);

  const testPageFlip = () => {
    audioManager.playPageFlipSound();
  };

  const testBookOpen = () => {
    audioManager.playBookOpenSound();
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {soundEnabled ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
          تنظیمات صدا
        </CardTitle>
        <CardDescription>
          تنظیم صداهای سیستم کتابخانه
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <div className="text-base font-medium">فعال‌سازی صدا</div>
            <div className="text-sm text-muted-foreground">
              صداهای ورق زدن صفحه و باز کردن کتاب
            </div>
          </div>
          <Switch
            checked={soundEnabled}
            onCheckedChange={setSoundEnabled}
          />
        </div>

        {soundEnabled && (
          <div className="space-y-4 pt-4 border-t">
            <div className="text-sm font-medium">تست صداها:</div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={testPageFlip}
                className="flex items-center gap-2"
              >
                <TestTube className="h-4 w-4" />
                تست ورق زدن
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={testBookOpen}
                className="flex items-center gap-2"
              >
                <TestTube className="h-4 w-4" />
                تست باز کردن کتاب
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SoundSettings;
