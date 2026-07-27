import React from 'react';
import { Instagram, Heart, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-slate-900 border-t border-slate-800 text-slate-400 py-12 mt-20 text-xs sm:text-sm">
      <div className="max-w-6xl mx-auto px-4 flex flex-col items-center text-center gap-6">
        {/* Brand */}
        <div className="flex items-center gap-2.5 font-extrabold text-xl text-white">
          <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-900/50">
            <Instagram className="w-5 h-5 text-white" />
          </div>
          <span className="tracking-tight">SnapInsta</span>
        </div>

        {/* Quick Links */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-slate-300 font-semibold text-xs sm:text-sm">
          <a href="#downloader-input" className="hover:text-indigo-400 transition-colors">
            Video Downloader
          </a>
          <a href="#how-to-guide" className="hover:text-indigo-400 transition-colors">
            How to Use
          </a>
        </div>

        {/* Disclaimer */}
        <p className="max-w-2xl text-slate-400 text-xs leading-relaxed font-medium">
          <strong className="text-slate-300">Disclaimer:</strong> SnapInsta is an independent web tool designed for downloading public Instagram media files. SnapInsta is not hosted by, affiliated with, endorsed, or certified by Instagram or Meta Platforms, Inc. All Instagram™ trademarks belong to Meta Platforms, Inc. Please respect copyright laws and download content for personal use only.
        </p>

        {/* Copyright */}
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-6 border-t border-slate-800/80 w-full max-w-2xl justify-between text-xs text-slate-400 font-medium">
          <p>© {new Date().getFullYear()} SnapInsta. All rights reserved.</p>
          <p className="flex items-center gap-1.5 font-bold text-slate-200">
            <span>created by</span>
            <span className="text-indigo-400 font-black tracking-widest text-sm uppercase">NEXA</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
