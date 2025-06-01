
import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header: React.FC = () => {
  return (
    <header className="bg-white/10 backdrop-blur-xl border-b border-white/10 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2 rtl:space-x-reverse">
            <BookOpen className="h-8 w-8 text-white" />
            <span className="text-xl font-bold text-white">کتابخانه دیجیتال فارسی</span>
          </Link>
          
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            <Link to="/admin">
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                <Settings className="w-4 h-4 ml-2" />
                پنل مدیریت
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
