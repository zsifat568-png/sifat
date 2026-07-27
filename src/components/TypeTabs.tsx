import React from 'react';
import { Video, Image, Film, Tv, History } from 'lucide-react';
import { ContentCategory } from '../types';

interface TypeTabsProps {
  activeTab: ContentCategory;
  onSelectTab: (category: ContentCategory) => void;
}

export const TypeTabs: React.FC<TypeTabsProps> = ({ activeTab, onSelectTab }) => {
  const tabs = [
    { id: 'video' as ContentCategory, label: 'Video', icon: Video },
    { id: 'reel' as ContentCategory, label: 'Reels', icon: Film },
    { id: 'photo' as ContentCategory, label: 'Photos', icon: Image },
    { id: 'story' as ContentCategory, label: 'Stories', icon: Tv },
    { id: 'igtv' as ContentCategory, label: 'IGTV', icon: History },
  ];

  return (
    <div className="flex items-center justify-center gap-1.5 sm:gap-2.5 overflow-x-auto pb-2 scrollbar-none max-w-full my-6">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onSelectTab(tab.id)}
            id={`tab-category-${tab.id}`}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer border ${
              isActive
                ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-200'
                : 'bg-white/80 text-slate-600 border-slate-200 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-500'}`} />
            <span>{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
};
