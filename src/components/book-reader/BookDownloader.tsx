
import React from 'react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { Book } from '@/types';

interface BookDownloaderProps {
  book: Book;
}

const BookDownloader: React.FC<BookDownloaderProps> = ({ book }) => {
  const downloadBookWithIcon = async () => {
    try {
      // Create a zip file containing both the book content and icon
      const JSZip = await import('jszip');
      const zip = new JSZip.default();
      
      // Add book content
      const bookContent = JSON.stringify(book, null, 2);
      zip.file(`${book.title}.json`, bookContent);
      
      // Add book cover/icon if available
      if (book.coverUrl) {
        try {
          // Fetch the image
          const response = await fetch(book.coverUrl);
          if (response.ok) {
            const imageBlob = await response.blob();
            const extension = book.coverUrl.split('.').pop() || 'png';
            zip.file(`${book.title}_icon.${extension}`, imageBlob);
          }
        } catch (error) {
          console.log('Could not download book icon:', error);
        }
      }
      
      // Add a readme file with book info
      const readmeContent = `
کتاب: ${book.title}
نویسنده: ${book.author}
دسته‌بندی: ${book.category}
تعداد صفحات: ${book.pages}
توضیحات: ${book.description}

این فایل شامل اطلاعات کتاب و آیکون آن می‌باشد.
برای مطالعه کتاب، فایل JSON را در برنامه دیجی‌کتاب باز کنید.
      `;
      
      zip.file('README.txt', readmeContent);
      
      // Generate and download the zip file
      const zipBlob = await zip.generateAsync({ type: 'blob' });
      
      // Create download link
      const url = URL.createObjectURL(zipBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${book.title}_با_آیکون.zip`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
    } catch (error) {
      console.error('Error downloading book with icon:', error);
      // Fallback to simple download
      downloadSimpleBook();
    }
  };

  const downloadSimpleBook = () => {
    const bookData = JSON.stringify(book, null, 2);
    const blob = new Blob([bookData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `${book.title}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <Button 
      onClick={downloadBookWithIcon}
      className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2"
    >
      <Download className="h-4 w-4" />
      دانلود با آیکون
    </Button>
  );
};

export default BookDownloader;
