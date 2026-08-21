import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import {
  Users,
  Eye,
  BarChart3,
  Activity,
  RefreshCw,
  Layers,
  Sparkles,
  CheckCircle2,
  Smartphone,
  Laptop,
  Monitor,
  Trash2,
  Search,
  Globe,
  Info,
  ShieldCheck,
} from 'lucide-react';

export const AnalyticsManager = () => {
  const {
    analytics,
    pushToRemoteEndpoint,
    fetchFromJsonUrl,
    isPushing,
    lastSyncTime,
    resetAnalytics,
  } = useData();

  const [activeFilter, setActiveFilter] = useState('all'); // 'all' | 'mobile' | 'desktop' | 'first'
  const [searchQuery, setSearchQuery] = useState('');
  const [showConfirmReset, setShowConfirmReset] = useState(false);

  const totalVisitors = analytics?.totalVisitors || 0;
  const uniqueVisitors = analytics?.uniqueVisitors || 0;
  const firstVisits = analytics?.firstVisits || 0;
  const repeatVisits = analytics?.repeatVisits || 0;

  const devices = analytics?.devices || { Mobile: 0, Desktop: 0, Tablet: 0 };
  const osData = analytics?.os || {};
  const browserData = analytics?.browsers || {};
  const sectionViews = analytics?.sectionViews || {};
  const projectClicks = analytics?.projectClicks || {};
  const recentLogs = analytics?.recentLogs || [];

  // Percentages & Device Calculations
  const mobileCount = devices.Mobile || 0;
  const desktopCount = devices.Desktop || 0;
  const tabletCount = devices.Tablet || 0;
  const totalDevicesRecorded = Math.max(mobileCount + desktopCount + tabletCount, 1);

  const mobilePct = Math.round((mobileCount / totalDevicesRecorded) * 100);
  const desktopPct = Math.round((desktopCount / totalDevicesRecorded) * 100);
  const tabletPct = Math.round((tabletCount / totalDevicesRecorded) * 100);

  // Section Popularity
  const maxSectionView = Math.max(...Object.values(sectionViews), 1);

  // Filtered Logs
  const filteredLogs = recentLogs.filter((log) => {
    // Device filter
    if (activeFilter === 'mobile' && log.deviceType !== 'Mobile') return false;
    if (activeFilter === 'desktop' && log.deviceType !== 'Desktop') return false;
    if (activeFilter === 'first' && !log.isFirstVisit) return false;

    // Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchAction = (log.action || '').toLowerCase().includes(q);
      const matchDetail = (log.detail || '').toLowerCase().includes(q);
      const matchOS = (log.os || '').toLowerCase().includes(q);
      const matchBrowser = (log.browser || '').toLowerCase().includes(q);
      const matchVisitorId = (log.visitorId || '').toLowerCase().includes(q);
      return matchAction || matchDetail || matchOS || matchBrowser || matchVisitorId;
    }

    return true;
  });

  const handleReset = async () => {
    if (resetAnalytics) {
      await resetAnalytics();
    }
    setShowConfirmReset(false);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/80 p-5 rounded-2xl border border-slate-800 shadow-lg">
        <div>
          <h3 className="text-lg font-heading font-bold text-white flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-accent-cyan" />
            <span>Tashriflar Statistika & Jonli Qurilmalar Logi</span>
          </h3>
          <p className="text-xs font-mono text-slate-400 mt-1">
            Har bir yangi va qayta tashriflar qurilmisi (Mobile/Desktop), OS hamda brauzeri bilan real vaqtda saqlanadi.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={fetchFromJsonUrl}
            disabled={isPushing}
            className="px-3 py-2 rounded-xl font-mono text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all flex items-center gap-1.5 cursor-pointer"
            title="Mokky dev dan yangilash"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isPushing ? 'animate-spin' : ''}`} />
            <span>Yangilash</span>
          </button>

          <button
            onClick={pushToRemoteEndpoint}
            disabled={isPushing}
            className="px-4 py-2 rounded-xl font-mono text-xs font-bold bg-accent-cyan text-slate-950 hover:bg-[#50c8ff] disabled:opacity-50 transition-all shadow-md shadow-accent-cyan/20 flex items-center gap-2 cursor-pointer"
          >
            <RefreshCw className={`w-4 h-4 ${isPushing ? 'animate-spin' : ''}`} />
            <span>{isPushing ? 'Sinxronlanmoqda...' : 'Mokky Bazaga Saqlash'}</span>
          </button>

          <button
            onClick={() => setShowConfirmReset(true)}
            className="p-2.5 rounded-xl bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 border border-rose-500/20 transition-all cursor-pointer"
            title="Statistikani tozalash"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Confirm Reset Modal */}
      {showConfirmReset && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl max-w-md w-full space-y-4 shadow-2xl">
            <h4 className="text-base font-heading font-bold text-white flex items-center gap-2">
              <Trash2 className="w-5 h-5 text-rose-500" />
              <span>Statistikani tozalashni tasdiqlang</span>
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed font-mono">
              Barcha to'plangan tashriflar soni, qurilmalar statistikasi va harakatlar logi tozalanadi. Mokky dev bazasi ham nollashtiriladi.
            </p>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setShowConfirmReset(false)}
                className="px-4 py-2 rounded-xl text-xs font-mono bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
              >
                Bekor qilish
              </button>
              <button
                onClick={handleReset}
                className="px-4 py-2 rounded-xl text-xs font-mono font-bold bg-rose-600 hover:bg-rose-500 text-white transition-colors cursor-pointer"
              >
                Ha, tozala
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Overview Cards (4 Grid) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Visitors */}
        <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-xl flex items-center gap-3.5 shadow-sm">
          <div className="p-3 rounded-xl bg-accent-cyan/10 text-accent-cyan border border-accent-cyan/20">
            <Eye className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">Jami Tashriflar</p>
            <h4 className="text-2xl font-bold font-heading text-white">{totalVisitors.toLocaleString()}</h4>
            <p className="text-[10px] font-mono text-emerald-400 mt-0.5">Global baza sinxronlangan</p>
          </div>
        </div>

        {/* Unique Visitors */}
        <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-xl flex items-center gap-3.5 shadow-sm">
          <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">Unikal Qurilmalar</p>
            <h4 className="text-2xl font-bold font-heading text-white">{uniqueVisitors.toLocaleString()}</h4>
            <p className="text-[10px] font-mono text-slate-400 mt-0.5">
              {firstVisits} yangi | {repeatVisits} qayta
            </p>
          </div>
        </div>

        {/* Mobile vs Desktop Ratio */}
        <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-xl flex items-center gap-3.5 shadow-sm">
          <div className="p-3 rounded-xl bg-accent-violet/10 text-accent-violet border border-accent-violet/20">
            <Smartphone className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">Mobil vs Desktop</p>
            <h4 className="text-2xl font-bold font-heading text-white">{mobilePct}% / {desktopPct}%</h4>
            <p className="text-[10px] font-mono text-slate-400 mt-0.5">
              📱 {mobileCount} mobil | 💻 {desktopCount} pc
            </p>
          </div>
        </div>

        {/* Total Activity Logs */}
        <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-xl flex items-center gap-3.5 shadow-sm">
          <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">Harakatlar Logi</p>
            <h4 className="text-2xl font-bold font-heading text-white">{recentLogs.length}</h4>
            <p className="text-[10px] font-mono text-amber-400 mt-0.5">Real-time monitoring</p>
          </div>
        </div>
      </div>

      {/* Device & OS & Browser Analytics (3 Columns) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Device Distribution */}
        <div className="bg-slate-900/60 border border-slate-800 p-5 rounded-2xl space-y-4">
          <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider flex items-center gap-2">
            <Smartphone className="w-4 h-4 text-accent-cyan" />
            <span>Qurilmalar Ulushi</span>
          </h4>

          <div className="space-y-3 pt-1">
            <div>
              <div className="flex justify-between text-xs font-mono mb-1">
                <span className="text-slate-300 flex items-center gap-1.5">
                  <Smartphone className="w-3.5 h-3.5 text-accent-cyan" /> Mobil Qurilmalar
                </span>
                <span className="text-slate-400 font-bold">{mobileCount} marta ({mobilePct}%)</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                <div className="h-full bg-accent-cyan rounded-full transition-all duration-500" style={{ width: `${mobilePct}%` }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-mono mb-1">
                <span className="text-slate-300 flex items-center gap-1.5">
                  <Laptop className="w-3.5 h-3.5 text-accent-violet" /> Desktop (Kompyuter)
                </span>
                <span className="text-slate-400 font-bold">{desktopCount} marta ({desktopPct}%)</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                <div className="h-full bg-accent-violet rounded-full transition-all duration-500" style={{ width: `${desktopPct}%` }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-mono mb-1">
                <span className="text-slate-300 flex items-center gap-1.5">
                  <Monitor className="w-3.5 h-3.5 text-emerald-400" /> Planshetlar (Tablet)
                </span>
                <span className="text-slate-400 font-bold">{tabletCount} marta ({tabletPct}%)</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                <div className="h-full bg-emerald-400 rounded-full transition-all duration-500" style={{ width: `${tabletPct}%` }} />
              </div>
            </div>
          </div>
        </div>

        {/* Operating Systems */}
        <div className="bg-slate-900/60 border border-slate-800 p-5 rounded-2xl space-y-4">
          <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider flex items-center gap-2">
            <Globe className="w-4 h-4 text-emerald-400" />
            <span>Operatsion Tizimlar (OS)</span>
          </h4>

          <div className="space-y-2.5">
            {Object.keys(osData).length === 0 ? (
              <p className="text-xs font-mono text-slate-500 py-4 text-center">Hali OS bo'yicha ma'lumot yo'q.</p>
            ) : (
              Object.entries(osData).map(([osName, count]) => {
                const pct = Math.round((count / Math.max(totalVisitors, 1)) * 100);
                return (
                  <div key={osName} className="space-y-1">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-slate-200 font-semibold">{osName}</span>
                      <span className="text-slate-400">{count} marta ({pct}%)</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                      <div className="h-full bg-emerald-400 rounded-full" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Browsers */}
        <div className="bg-slate-900/60 border border-slate-800 p-5 rounded-2xl space-y-4">
          <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider flex items-center gap-2">
            <Globe className="w-4 h-4 text-amber-400" />
            <span>Brauzerlar</span>
          </h4>

          <div className="space-y-2.5">
            {Object.keys(browserData).length === 0 ? (
              <p className="text-xs font-mono text-slate-500 py-4 text-center">Hali brauzer statistikasi yo'q.</p>
            ) : (
              Object.entries(browserData).map(([browserName, count]) => {
                const pct = Math.round((count / Math.max(totalVisitors, 1)) * 100);
                return (
                  <div key={browserName} className="space-y-1">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-slate-200 font-semibold">{browserName}</span>
                      <span className="text-slate-400">{count} marta ({pct}%)</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                      <div className="h-full bg-amber-400 rounded-full" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* UI/UX Engagement (Section Views & Project Clicks) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Section Popularity */}
        <div className="bg-slate-900/60 border border-slate-800 p-5 rounded-2xl space-y-4">
          <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider flex items-center gap-2">
            <Layers className="w-4 h-4 text-accent-cyan" />
            <span>UI/UX: Bo'limlar Mashhurligi</span>
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
            <span>UI/UX: Loyihalar Bosilishi (Qiziqishlar)</span>
          </h4>

          {Object.keys(projectClicks).length === 0 ? (
            <div className="p-6 text-center text-xs font-mono text-slate-500">
              Hali loyihalar bo'yicha bosilish statistikasi yig'ilmadi.
            </div>
          ) : (
            <div className="space-y-2.5">
              {Object.entries(projectClicks).map(([proj, count]) => (
                <div
                  key={proj}
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono"
                >
                  <span className="text-slate-200 font-medium truncate max-w-[240px]">{proj}</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-accent-mint/10 text-accent-mint border border-accent-mint/20 font-bold">
                    {count} marta bosildi
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Live Activity & Device Logs Feed */}
      <div className="bg-slate-900/60 border border-slate-800 p-5 rounded-2xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider flex items-center gap-2">
            <Activity className="w-4 h-4 text-emerald-400" />
            <span>Foydalanuvchilar Qurilmalari va Harakatlari Logi ({filteredLogs.length})</span>
          </h4>

          {/* Filters & Search */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Qidiruv..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 pr-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-200 focus:outline-none focus:border-accent-cyan w-36 sm:w-44"
              />
            </div>

            <div className="flex rounded-xl bg-slate-950 p-1 border border-slate-800 text-[11px] font-mono">
              <button
                onClick={() => setActiveFilter('all')}
                className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                  activeFilter === 'all' ? 'bg-accent-cyan text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                Barchasi
              </button>
              <button
                onClick={() => setActiveFilter('mobile')}
                className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                  activeFilter === 'mobile' ? 'bg-accent-cyan text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                📱 Mobil
              </button>
              <button
                onClick={() => setActiveFilter('desktop')}
                className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                  activeFilter === 'desktop' ? 'bg-accent-cyan text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                💻 Desktop
              </button>
              <button
                onClick={() => setActiveFilter('first')}
                className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                  activeFilter === 'first' ? 'bg-accent-cyan text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                ✨ Yangi
              </button>
            </div>
          </div>
        </div>

        {/* Log Entries List */}
        <div className="max-h-80 overflow-y-auto custom-scrollbar space-y-2">
          {filteredLogs.length === 0 ? (
            <div className="p-8 text-center text-xs font-mono text-slate-500">
              Hech qanday log topilmadi.
            </div>
          ) : (
            filteredLogs.map((log) => {
              const isMobile = log.deviceType === 'Mobile';
              const isDesktop = log.deviceType === 'Desktop';

              return (
                <div
                  key={log.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3.5 rounded-xl bg-slate-950/90 border border-slate-800 text-xs font-mono hover:border-slate-700 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`p-2 rounded-xl shrink-0 mt-0.5 ${
                        isMobile
                          ? 'bg-sky-500/10 text-sky-400 border border-sky-500/20'
                          : isDesktop
                          ? 'bg-accent-violet/10 text-accent-violet border border-accent-violet/20'
                          : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                      }`}
                    >
                      {isMobile ? <Smartphone className="w-4 h-4" /> : isDesktop ? <Laptop className="w-4 h-4" /> : <Monitor className="w-4 h-4" />}
                    </div>

                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="text-slate-100 font-bold">{log.action}</p>
                        {log.isFirstVisit ? (
                          <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-bold">
                            ✨ Ilk Tashrif
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 text-[10px]">
                            🔄 Qayta Kirish
                          </span>
                        )}
                        {log.ip && (
                          <span className="px-2 py-0.5 rounded-full bg-accent-cyan/10 text-accent-cyan border border-accent-cyan/20 text-[10px] font-bold">
                            📍 IP: {log.ip}
                          </span>
                        )}
                      </div>

                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-slate-400 mt-1">
                        {log.deviceName && <span className="text-slate-300 font-semibold">{log.deviceName}</span>}
                        {log.detail && <span>{log.detail}</span>}
                        {log.visitorId && <span className="text-slate-500">ID: {log.visitorId.slice(0, 14)}...</span>}
                      </div>
                    </div>
                  </div>

                  <span className="text-[10px] text-slate-500 shrink-0 self-end sm:self-auto font-mono">
                    {log.timestamp}
                  </span>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
