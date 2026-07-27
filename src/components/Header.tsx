import React from 'react';
import { Instagram } from 'lucide-react';

interface HeaderProps {
  onReset?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onReset }) => {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 text-slate-900 transition-colors py-2">
      <div className="max-w-6xl mx-auto px-3 sm:px-4 h-14 sm:h-16 flex items-center justify-between">
        {/* Logo and Brand Title in One Line */}
        <button
          onClick={onReset}
          className="flex items-center gap-2.5 sm:gap-3 text-left group transition-transform active:scale-95 cursor-pointer overflow-hidden"
          id="btn-header-logo"
        >
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-200 group-hover:bg-indigo-700 shrink-0">
            <Instagram className="w-5 h-5 text-white" />
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2 font-black text-lg sm:text-2xl tracking-tight text-slate-900 whitespace-nowrap">
            <span>SnapInsta</span>
            <span className="text-indigo-600 font-extrabold text-base sm:text-xl">Reels Downloader</span>
          </div>
        </button>
      </div>
    </header>
  );
};

