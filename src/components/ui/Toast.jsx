import React from 'react';
import { useData } from '../../context/DataContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const Toast = () => {
  const { toasts, removeToast } = useData();

  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 pointer-events-none max-w-sm w-full px-4">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`pointer-events-auto flex items-center justify-between p-4 rounded-xl shadow-2xl border backdrop-blur-md transition-all duration-300 transform translate-y-0 ${
            toast.type === 'error'
              ? 'bg-red-950/90 text-red-200 border-red-800/80 shadow-red-950/50'
              : toast.type === 'info'
              ? 'bg-blue-950/90 text-blue-200 border-blue-800/80 shadow-blue-950/50'
              : 'bg-emerald-950/90 text-emerald-200 border-emerald-800/80 shadow-emerald-950/50'
          }`}
        >
          <div className="flex items-center gap-3">
            {toast.type === 'error' ? (
              <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
            ) : toast.type === 'info' ? (
              <Info className="w-5 h-5 text-blue-400 shrink-0" />
            ) : (
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            )}
            <p className="text-sm font-medium">{toast.message}</p>
          </div>
          <button
            onClick={() => removeToast(toast.id)}
            className="p-1 hover:bg-white/10 rounded-lg transition-colors ml-2"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};
