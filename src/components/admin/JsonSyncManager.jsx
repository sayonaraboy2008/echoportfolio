import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import {
  Download,
  Upload,
  RefreshCw,
  Send,
  Cloud,
  Check,
  AlertCircle,
  FileJson,
  Code,
  KeyRound,
  RotateCcw,
  ExternalLink,
} from 'lucide-react';

export const JsonSyncManager = () => {
  const {
    data,
    mokkyUrl,
    fetchFromJsonUrl,
    pushToRemoteEndpoint,
    isLoading,
    isPushing,
    lastSyncTime,
    exportJson,
    importJson,
    resetToDefault,
    updateAdminPin,
  } = useData();

  const [rawJsonText, setRawJsonText] = useState(() => JSON.stringify(data, null, 2));
  const [jsonError, setJsonError] = useState(null);
  const [newPin, setNewPin] = useState('');

  const handlePull = async () => {
    await fetchFromJsonUrl();
    setRawJsonText(JSON.stringify(data, null, 2));
  };

  const handlePush = async () => {
    await pushToRemoteEndpoint();
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result);
        const success = importJson(parsed);
        if (success) {
          setRawJsonText(JSON.stringify(parsed, null, 2));
        }
      } catch (err) {
        alert('Invalid JSON file: ' + err.message);
      }
    };
    reader.readAsText(file);
  };

  const handleApplyRawJson = () => {
    try {
      const parsed = JSON.parse(rawJsonText);
      importJson(parsed);
      setJsonError(null);
    } catch (err) {
      setJsonError(err.message);
    }
  };

  const handlePinUpdate = (e) => {
    e.preventDefault();
    if (!newPin.trim()) return;
    updateAdminPin(newPin.trim());
    setNewPin('');
  };

  return (
    <div className="space-y-8">
      {/* 1. Primary mokky.dev Cloud Source */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 space-y-4 shadow-lg">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
          <div className="flex items-center gap-2 text-accent-mint font-heading font-bold text-base">
            <Cloud className="w-5 h-5" />
            <span>Asosiy Ma'lumotlar Bazasi (mokky.dev)</span>
          </div>
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-emerald-950 text-emerald-400 border border-emerald-800 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Ulangan</span>
          </span>
        </div>

        <p className="text-xs text-slate-400 leading-relaxed font-sans">
          Barcha ma'lumotlar avtomatik ravishda <strong className="text-accent-mint">{mokkyUrl}</strong> manzilidan yuklanadi va Admin panelda qilingan har bir o'zgarish shu manzilga saqlanadi.
        </p>

        <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800 flex items-center justify-between gap-3 text-xs font-mono text-slate-300">
          <div className="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap">
            <span className="text-accent-mint font-bold">API:</span>
            <a
              href={mokkyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-300 hover:text-white underline flex items-center gap-1 overflow-hidden text-ellipsis"
            >
              <span>{mokkyUrl}</span>
              <ExternalLink className="w-3.5 h-3.5 shrink-0" />
            </a>
          </div>

          {lastSyncTime && (
            <span className="text-[11px] text-slate-500 shrink-0">
              Oxirgi yangilanish: {lastSyncTime}
            </span>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-3 pt-1">
          <button
            type="button"
            onClick={handlePull}
            disabled={isLoading}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-mono text-xs font-bold bg-accent-mint text-slate-950 hover:bg-[#72ffe0] disabled:opacity-50 transition-all shadow-md"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
            <span>mokky.dev dan qayta yuklash (GET)</span>
          </button>

          <button
            type="button"
            onClick={handlePush}
            disabled={isPushing}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-mono text-xs font-bold bg-slate-800 hover:bg-slate-700 text-white disabled:opacity-50 transition-all border border-slate-700"
          >
            <Send className={`w-3.5 h-3.5 text-accent-mint ${isPushing ? 'animate-pulse' : ''}`} />
            <span>Hozirgi holatni mokky.dev ga yuborish</span>
          </button>
        </div>
      </div>

      {/* 2. File Import / Export */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 space-y-4">
        <div className="flex items-center gap-2 text-accent-coral font-heading font-bold text-base pb-2 border-b border-slate-800">
          <FileJson className="w-5 h-5" />
          <span>JSON Fayl Zaxirasi (Export &amp; Import)</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Export */}
          <div className="bg-slate-950/60 border border-slate-800/80 p-4 rounded-xl flex flex-col justify-between gap-3">
            <div>
              <h5 className="text-sm font-heading font-bold text-white">JSON faylni yuklab olish</h5>
              <p className="text-xs text-slate-400 mt-1">
                Barcha ma'lumotlarni kompyuterga `.json` zaxira fayl sifatida ko'chirib olish.
              </p>
            </div>
            <button
              onClick={exportJson}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-mono text-xs font-semibold bg-slate-850 hover:bg-slate-800 text-white border border-slate-700 transition-all"
            >
              <Download className="w-4 h-4 text-accent-mint" />
              <span>Export JSON File</span>
            </button>
          </div>

          {/* Import */}
          <div className="bg-slate-950/60 border border-slate-800/80 p-4 rounded-xl flex flex-col justify-between gap-3">
            <div>
              <h5 className="text-sm font-heading font-bold text-white">JSON fayldan yuklash</h5>
              <p className="text-xs text-slate-400 mt-1">
                Kompyuteringizdagi `.json` faylni yuklab barcha ma'lumotlarni yangilash.
              </p>
            </div>
            <label className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-mono text-xs font-semibold bg-slate-850 hover:bg-slate-800 text-white border border-slate-700 cursor-pointer transition-all">
              <Upload className="w-4 h-4 text-accent-coral" />
              <span>Faylni tanlash (.json)</span>
              <input type="file" accept=".json" onChange={handleFileUpload} className="hidden" />
            </label>
          </div>
        </div>
      </div>

      {/* 3. Direct Raw JSON Editor */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
          <div className="flex items-center gap-2 text-accent-amber font-heading font-bold text-base">
            <Code className="w-5 h-5" />
            <span>To'g'ridan-to'g'ri JSON Kod Muharriri</span>
          </div>
          <button
            onClick={() => setRawJsonText(JSON.stringify(data, null, 2))}
            className="text-xs font-mono text-slate-400 hover:text-white"
          >
            Yangilash
          </button>
        </div>

        {jsonError && (
          <div className="p-3 bg-rose-950/60 border border-rose-800 rounded-xl text-xs font-mono text-rose-300 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            <span>JSON Xatosi: {jsonError}</span>
          </div>
        )}

        <textarea
          rows={9}
          value={rawJsonText}
          onChange={(e) => setRawJsonText(e.target.value)}
          className="w-full bg-[#0d1117] border border-slate-800 rounded-xl p-4 font-mono text-xs text-emerald-400 focus:outline-none focus:border-accent-mint custom-scrollbar"
        />

        <div className="flex justify-end">
          <button
            onClick={handleApplyRawJson}
            className="flex items-center gap-2 px-5 py-2 rounded-xl font-mono text-xs font-bold bg-accent-amber text-slate-950 hover:bg-[#ffc272] transition-all shadow-md"
          >
            <Check className="w-4 h-4" />
            <span>JSON Kodni Qo'llash va Saqlash</span>
          </button>
        </div>
      </div>

      {/* 4. PIN Change & Reset */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Change Admin PIN */}
        <form onSubmit={handlePinUpdate} className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 space-y-3">
          <div className="flex items-center gap-2 text-white font-heading font-bold text-sm">
            <KeyRound className="w-4 h-4 text-accent-mint" />
            <span>Admin PIN Kodni O'zgartirish</span>
          </div>
          <p className="text-xs text-slate-400 font-mono">Yangi maxfiy PIN kod kiriting</p>
          <div className="flex gap-2">
            <input
              type="password"
              required
              value={newPin}
              onChange={(e) => setNewPin(e.target.value)}
              placeholder="Yangi PIN"
              className="flex-1 bg-[#0d1117] border border-slate-700 rounded-lg px-3 py-1.5 text-xs font-mono text-white focus:outline-none focus:border-accent-mint"
            />
            <button
              type="submit"
              className="px-4 py-1.5 rounded-lg text-xs font-mono font-bold bg-slate-800 hover:bg-slate-700 text-white"
            >
              Saqlash
            </button>
          </div>
        </form>

        {/* Refresh from server */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 flex flex-col justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 text-slate-300 font-heading font-bold text-sm">
              <RotateCcw className="w-4 h-4 text-accent-mint" />
              <span>mokky.dev dan Qayta Yuklash</span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Brauzerdagi vaqtinchalik xotirani tozalab, mokky.dev dagi eng so'nggi holatni yuklash.
            </p>
          </div>
          <button
            onClick={() => {
              resetToDefault();
              setRawJsonText(JSON.stringify(data, null, 2));
            }}
            className="px-4 py-2 rounded-xl text-xs font-mono font-semibold bg-slate-850 hover:bg-slate-800 text-slate-300 border border-slate-700 transition-all text-center"
          >
            Sinxronlash
          </button>
        </div>
      </div>
    </div>
  );
};
