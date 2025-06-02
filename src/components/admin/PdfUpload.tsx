
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { Upload, X, FileText } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface PdfUploadProps {
  onUploadSuccess: (url: string) => void;
  currentUrl?: string;
  onClearUrl: () => void;
}

export const PdfUpload: React.FC<PdfUploadProps> = ({ onUploadSuccess, currentUrl, onClearUrl }) => {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Check if file is PDF
    if (file.type !== 'application/pdf') {
      toast.error('لطفاً فقط فایل PDF انتخاب کنید');
      return;
    }

    // Check file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast.error('حجم فایل نباید از 10 مگابایت بیشتر باشد');
      return;
    }

    setIsUploading(true);

    try {
      // Generate unique filename
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;

      // Upload file to Supabase storage
      const { data, error } = await supabase.storage
        .from('book-pdfs')
        .upload(fileName, file);

      if (error) {
        console.error('Upload error:', error);
        toast.error('خطا در آپلود فایل');
        return;
      }

      // Get public URL
      const { data: publicUrlData } = supabase.storage
        .from('book-pdfs')
        .getPublicUrl(fileName);

      const publicUrl = publicUrlData.publicUrl;
      
      onUploadSuccess(publicUrl);
      toast.success('فایل PDF با موفقیت آپلود شد');
      
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('خطا در آپلود فایل');
    } finally {
      setIsUploading(false);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700">
        آپلود فایل PDF کتاب
      </label>
      
      <div className="flex items-start gap-4">
        <div className="flex-1">
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,application/pdf"
            onChange={handleFileUpload}
            className="hidden"
          />
          
          <Button
            type="button"
            variant="outline"
            onClick={handleUploadClick}
            disabled={isUploading}
            className="w-full h-24 border-2 border-dashed border-gray-300 hover:border-blue-400 transition-colors"
          >
            <div className="flex flex-col items-center">
              <Upload className="w-6 h-6 mb-2 text-gray-400" />
              <span className="text-sm text-gray-500">
                {isUploading ? 'در حال آپلود...' : 'انتخاب فایل PDF'}
              </span>
            </div>
          </Button>
          
          <p className="text-xs text-gray-500 mt-2">
            حداکثر حجم: 10 مگابایت | فرمت: PDF
          </p>
        </div>
        
        {currentUrl && (
          <div className="relative">
            <div className="w-20 h-24 bg-green-100 rounded border flex flex-col items-center justify-center">
              <FileText className="w-8 h-8 text-green-600 mb-1" />
              <span className="text-xs text-green-600 text-center">PDF آپلود شده</span>
            </div>
            <Button
              type="button"
              variant="destructive"
              size="sm"
              onClick={onClearUrl}
              className="absolute -top-2 -right-2 w-6 h-6 rounded-full p-0"
            >
              <X className="w-3 h-3" />
            </Button>
          </div>
        )}
      </div>
      
      {currentUrl && (
        <div className="p-3 bg-green-50 rounded-md">
          <p className="text-sm text-green-700 mb-2">فایل PDF آپلود شده:</p>
          <a
            href={currentUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-blue-600 hover:underline break-all"
          >
            {currentUrl}
          </a>
        </div>
      )}
    </div>
  );
};
