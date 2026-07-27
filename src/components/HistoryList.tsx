import React from 'react';
import { History, Trash2, Download } from 'lucide-react';
import { HistoryItem } from '../types';

interface HistoryListProps {
  history: HistoryItem[];
  onSelectHistoryItem: (item: HistoryItem) => void;
  onClearHistory: () => void;
}

export const HistoryList: React.FC<HistoryListProps> = ({
  history,
  onSelectHistoryItem,
  onClearHistory,
}) => {
  if (history.length === 0) return null;

  const recentThree = history.slice(0, 3);

  return (
    <section className="w-full max-w-3xl mx-auto px-4 my-6" id="recent-history">
      <div className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 shadow-lg shadow-indigo-100/50">
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
          <div className="flex items-center gap-2 text-slate-900 font-extrabold text-sm">
            <History className="w-4 h-4 text-indigo-600" />
            <span>Recent Downloads ({recentThree.length})</span>
          </div>

          <button
            type="button"
            onClick={onClearHistory}
            className="text-xs text-slate-400 hover:text-rose-600 font-semibold flex items-center gap-1 transition-colors cursor-pointer"
            id="btn-clear-history"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear History</span>
          </button>
        </div>

        <div className="space-y-2 pr-1">
          {recentThree.map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectHistoryItem(item)}
              className="flex items-center justify-between gap-3 p-2.5 rounded-xl bg-slate-50 hover:bg-indigo-50/60 border border-slate-200/80 hover:border-indigo-200 transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-3 overflow-hidden">
                {item.data.media[0]?.thumbnail ? (
                  <img
                    src={item.data.media[0].thumbnail}
                    alt="Thumbnail"
                    className="w-10 h-10 rounded-lg object-cover shrink-0 border border-slate-200"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shrink-0">
                    <Download className="w-5 h-5" />
                  </div>
                )}

                <div className="overflow-hidden">
                  <p className="text-xs font-bold text-slate-800 truncate group-hover:text-indigo-700 transition-colors">
                    @{item.data.username || 'instagram'} - {item.data.title || 'Instagram Post'}
                  </p>
                  <p className="text-[11px] text-slate-400 font-medium truncate">
                    {new Date(item.timestamp).toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="text-xs font-bold px-3 py-1 rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-100 shrink-0 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                View
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
