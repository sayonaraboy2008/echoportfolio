import React from 'react';
import { useData } from '../../context/DataContext';
import { Users, Eye, BarChart3, Activity, RefreshCw, Layers, Sparkles, CheckCircle2 } from 'lucide-react';

export const AnalyticsManager = () => {
  const { analytics, pushToRemoteEndpoint, isPushing, lastSyncTime } = useData();

  const totalVisitors = analytics?.totalVisitors || 0;
  const uniqueSessions = analytics?.uniqueSessions || 0;
  const sectionViews = analytics?.sectionViews || {};
  const projectClicks = analytics?.projectClicks || {};
  const recentLogs = analytics?.recentLogs || [];

  // Calculate section popularity percentages
  const maxSectionView = Math.max(...Object.values(sectionViews), 1);

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/60 p-4 sm:p-5 rounded-2xl border border-slate-800/80">
        <div>
          <h3 className="text-base sm:text-lg font-heading font-bold text-white flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-accent-cyan" />
            <span>Tashriflar Statistika & Jonli Harakatlar Logi</span>
          </h3>
          <p className="text-xs font-mono text-slate-400 mt-1">
            Foydalanuvchilar harakatlari va bo'limlar faolligi real vaqt rejimida kuzatib boriladi.
          </p>
        </div>

        <button
          onClick={pushToRemoteEndpoint}
          disabled={isPushing}
          className="px-4 py-2.5 rounded-xl font-mono text-xs font-bold bg-accent-cyan text-slate-950 hover:bg-[#50c8ff] disabled:opacity-50 transition-all shadow-md shadow-accent-cyan/20 flex items-center gap-2 shrink-0 cursor-pointer"
        >
          <RefreshCw className={`w-4 h-4 ${isPushing ? 'animate-spin' : ''}`} />
          <span>{isPushing ? 'Sinxronlanmoqda...' : 'Mokky Dev ga saqlash'}</span>
        </button>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-xl flex items-center gap-3.5">
          <div className="p-3 rounded-xl bg-accent-cyan/10 text-accent-cyan border border-accent-cyan/20">
            <Eye className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">Jami Tashriflar</p>
            <h4 className="text-2xl font-bold font-heading text-white">{totalVisitors.toLocaleString()}</h4>
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-xl flex items-center gap-3.5">
          <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">Unikal Seanslar</p>
            <h4 className="text-2xl font-bold font-heading text-white">{uniqueSessions.toLocaleString()}</h4>
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-xl flex items-center gap-3.5">
          <div className="p-3 rounded-xl bg-accent-violet/10 text-accent-violet border border-accent-violet/20">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">Bo'limlar Ko'rilishi</p>
            <h4 className="text-2xl font-bold font-heading text-white">
              {Object.values(sectionViews).reduce((a, b) => a + b, 0).toLocaleString()}
            </h4>
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-xl flex items-center gap-3.5">
          <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">So'nggi Harakatlar</p>
            <h4 className="text-2xl font-bold font-heading text-white">{recentLogs.length}</h4>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Section View Popularity */}
        <div className="bg-slate-900/60 border border-slate-800 p-5 rounded-2xl space-y-4">
          <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider flex items-center gap-2">
            <Layers className="w-4 h-4 text-accent-cyan" />
            <span>Eng Ko'p Ko'rilgan Bo'limlar</span>
          </h4>

          <div className="space-y-3">
            {Object.entries(sectionViews).map(([section, count]) => {
              const pct = Math.round((count / maxSectionView) * 100);
              return (
                <div key={section} className="space-y-1">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="capitalize text-slate-200 font-semibold">{section}</span>
                    <span className="text-slate-400">{count} marta ({pct}%)</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-accent-cyan to-accent-violet rounded-full transition-all duration-500"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Project Clicks */}
        <div className="bg-slate-900/60 border border-slate-800 p-5 rounded-2xl space-y-4">
          <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-accent-mint" />
            <span>Eng Mashhur Loyihalar</span>
          </h4>

          {Object.keys(projectClicks).length === 0 ? (
            <div className="p-6 text-center text-xs font-mono text-slate-500">
              Hali loyihalar bo'yicha maxsus bosilish statistikasi yo'q.
            </div>
          ) : (
            <div className="space-y-2.5">
              {Object.entries(projectClicks).map(([proj, count]) => (
                <div
                  key={proj}
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono"
                >
                  <span className="text-slate-200 font-medium truncate max-w-[220px]">{proj}</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-accent-mint/10 text-accent-mint border border-accent-mint/20 font-bold">
                    {count} bosildi
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Live Activity Logs Feed */}
      <div className="bg-slate-900/60 border border-slate-800 p-5 rounded-2xl space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider flex items-center gap-2">
            <Activity className="w-4 h-4 text-emerald-400" />
            <span>Foydalanuvchilar Harakatlari Logi (Live Activity)</span>
          </h4>

          <span className="text-[11px] font-mono text-slate-500">
            Avtomatik yangilanadi (JSON + Mokky Dev)
          </span>
        </div>

        <div className="max-h-64 overflow-y-auto custom-scrollbar space-y-2">
          {recentLogs.map((log) => (
            <div
              key={log.id}
              className="flex items-start justify-between gap-3 p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs font-mono"
            >
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-slate-200 font-semibold">{log.action}</p>
                  {log.detail && <p className="text-[11px] text-slate-400 mt-0.5">{log.detail}</p>}
                </div>
              </div>

              <span className="text-[10px] text-slate-500 shrink-0">{log.timestamp}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
