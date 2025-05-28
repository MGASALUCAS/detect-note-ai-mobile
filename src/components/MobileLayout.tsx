
import React from 'react';
import { cn } from '@/lib/utils';

interface MobileLayoutProps {
  children: React.ReactNode;
  className?: string;
  showHeader?: boolean;
  title?: string;
  onBack?: () => void;
}

const MobileLayout = ({ children, className, showHeader = false, title, onBack }: MobileLayoutProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {showHeader && (
        <div className="bg-white shadow-sm px-4 py-3 flex items-center gap-3">
          {onBack && (
            <button onClick={onBack} className="p-2 rounded-full hover:bg-gray-100">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}
          <h1 className="text-xl font-semibold text-gray-800">{title}</h1>
        </div>
      )}
      <div className={cn("p-4", className)}>
        {children}
      </div>
    </div>
  );
};

export default MobileLayout;
