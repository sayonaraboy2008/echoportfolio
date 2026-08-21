import React, { useEffect } from 'react';
import { Modal } from '../ui/Modal';
import { ShieldAlert, Timer, Sparkles, Smile } from 'lucide-react';

export const FloodModal = ({ isOpen, onClose, remainingSeconds }) => {
  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="🐢 Flood Protection — Cooldown Active" maxWidth="max-w-md">
      <div className="flex flex-col items-center text-center p-2 sm:p-4 space-y-4">
        {/* Animated Badge */}
        <div className="relative">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500 animate-pulse">
            <Timer className="w-8 h-8" />
          </div>
          <span className="absolute -top-1 -right-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-500 text-slate-950">
            {remainingSeconds}s
          </span>
        </div>

        {/* Humorous Title */}
        <h3 className="text-xl font-heading font-extrabold text-slate-900 dark:text-white">
          Shoshmang, tezkor poygachi! 🏎️💨
        </h3>

        {/* Humorous Body Text */}
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
          Siz hozirgina xabar yubordingiz. Serverimiz biroz salqinlanib va xabaringizni qayta ishlab olishi uchun yana <span className="font-mono font-bold text-amber-500 underline">{remainingSeconds} soniya</span> kutib turing! 😉
        </p>

        {/* Funny quote box */}
        <div className="w-full bg-slate-100 dark:bg-[#0c1017] border border-slate-200 dark:border-slate-800 rounded-xl p-3 text-left text-xs font-mono text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-1.5 text-accent-cyan font-semibold mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Tizim maslahati:</span>
          </div>
          <p className="text-[11px] leading-normal italic text-slate-600 dark:text-slate-400">
            "Sabr qilgan kishi eng mazali qahvani ichadi hamda barcha spam-filtrlardan muvaffaqiyatli o'tadi."
          </p>
        </div>

        {/* Action Button */}
        <button
          onClick={onClose}
          className="w-full py-2.5 rounded-xl font-heading font-bold text-xs sm:text-sm bg-amber-500 hover:bg-amber-400 text-slate-950 transition-all shadow-md active:scale-95 cursor-pointer flex items-center justify-center gap-2"
        >
          <Smile className="w-4 h-4" />
          <span>Tushundim, {remainingSeconds}s kutib turaman!</span>
        </button>
      </div>
    </Modal>
  );
};
