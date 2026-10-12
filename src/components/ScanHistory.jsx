import React from 'react';
import { History, Trash2, ArrowUpRight } from 'lucide-react';

export default function ScanHistory({ history, onSelectScan, onClearHistory }) {
  if (!history || history.length === 0) return null;

  return (
    <div className="mt-8 bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm">
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
        <div className="flex items-center space-x-2">
          <History className="w-4 h-4 text-emerald-600" />
          <h3 className="font-bold text-slate-900 text-sm">
            Recent Scans in this Session ({history.length})
          </h3>
        </div>
        <button
          onClick={onClearHistory}
          className="text-xs text-slate-400 hover:text-rose-600 flex items-center space-x-1 transition-colors"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Clear History</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {history.map((item, idx) => {
          const isFresh = item.condition === 'FRESH';
          const isMedium = item.condition === 'MEDIUM';

          return (
            <div
              key={item.id || idx}
              onClick={() => onSelectScan(item)}
              className="group p-3 rounded-2xl border border-slate-200 hover:border-emerald-400 hover:bg-emerald-50/20 cursor-pointer transition-all flex items-center space-x-3 bg-slate-50/50"
            >
              {item.previewUrl && (
                <img
                  src={item.previewUrl}
                  alt="Scanned thumbnail"
                  className="w-12 h-12 rounded-xl object-cover border border-slate-200"
                />
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-1.5">
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      isFresh
                        ? 'bg-emerald-100 text-emerald-800'
                        : isMedium
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-rose-100 text-rose-800'
                    }`}
                  >
                    {item.condition}
                  </span>
                  <span className="text-[11px] font-semibold text-slate-700">
                    {item.freshnessScore}%
                  </span>
                </div>
                <p className="text-xs font-medium text-slate-800 truncate mt-0.5 group-hover:text-emerald-700">
                  {item.diseaseName ? item.diseaseName : item.fileName || 'Guava Scan'}
                </p>
                <span className="text-[10px] text-slate-400 block truncate">
                  {item.timestamp}
                </span>
              </div>
              <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 transition-colors" />
            </div>
          );
        })}
      </div>
    </div>
  );
}
