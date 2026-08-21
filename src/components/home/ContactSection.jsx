import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useData } from '../../context/DataContext';
import { SectionHeading } from '../ui/SectionHeading';
import { SocialIcon } from '../ui/SocialIcon';
import { FloodModal } from './FloodModal';
import { sendTelegramMessage } from '../../utils/telegram';
import { Send, Mail, MapPin, CheckCircle, AlertCircle, AtSign } from 'lucide-react';
import confetti from 'canvas-confetti';

const COOLDOWN_SECONDS = 30;
const LAST_SUBMIT_KEY = 'portfolio_contact_last_submit';

export const ContactSection = () => {
  const { t, lang } = useLanguage();
  const { data, addToast, trackAction } = useData();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [emailError, setEmailError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState(null); // 'success' | 'error' | null
  const [showFloodModal, setShowFloodModal] = useState(false);
  const [remainingCooldown, setRemainingCooldown] = useState(0);

  const activeSocials = (data.socials || []).filter((s) => s.enabled !== false);

  // Validation helper
  const validateContactInput = (val) => {
    const trimmed = val.trim();
    if (!trimmed) return '';

    const isEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(trimmed);
    const isTelegram = /^@[a-zA-Z0-9_]{3,32}$/.test(trimmed);

    if (trimmed.startsWith('@')) {
      if (!isTelegram) {
        return lang === 'uz'
          ? "Telegram username '@' bilan boshlanishi va kamida 3 ta belgi bo'lishi kerak (masalan: @foydalanuvchi)"
          : "Telegram username must start with '@' and have at least 3 characters (e.g. @username)";
      }
      return '';
    }

    if (!isEmail) {
      return lang === 'uz'
        ? "To'g'ri email kiriting (masalan: misol@gmail.com) yoki @ bilan Telegram username (@username)"
        : "Please enter a valid email (e.g. example@gmail.com) or Telegram username with @ (e.g. @username)";
    }

    return '';
  };

  const handleContactChange = (e) => {
    const val = e.target.value;
    setFormData({ ...formData, email: val });
    if (emailError) {
      setEmailError(validateContactInput(val));
    }
  };

  const handleContactBlur = () => {
    if (formData.email.trim()) {
      setEmailError(validateContactInput(formData.email));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. Anti-flood Cooldown check (30 seconds)
    const lastSubmitTime = parseInt(localStorage.getItem(LAST_SUBMIT_KEY) || '0', 10);
    const now = Date.now();
    const elapsedSeconds = Math.floor((now - lastSubmitTime) / 1000);

    if (elapsedSeconds < COOLDOWN_SECONDS) {
      const remaining = COOLDOWN_SECONDS - elapsedSeconds;
      setRemainingCooldown(remaining);
      setShowFloodModal(true);
      if (trackAction) {
        trackAction('Flood Protection Triggered', `${remaining}s cooldown remaining`);
      }
      return;
    }

    const contactVal = formData.email.trim();
    const validationError = validateContactInput(contactVal);

    if (validationError) {
      setEmailError(validationError);
      addToast(validationError, 'error');
      return;
    }

    if (!formData.name.trim() || !contactVal || !formData.message.trim()) {
      addToast(
        lang === 'uz' ? 'Iltimos barcha maydonlarni to\'ldiring.' : 'Please fill out all fields.',
        'error'
      );
      return;
    }

    setIsSubmitting(true);
    setStatus(null);

    try {
      if (data.telegramBot && data.telegramBot.enabled && data.telegramBot.token && data.telegramBot.chatId) {
        await sendTelegramMessage(data.telegramBot, formData);
      } else {
        // Fallback delay
        await new Promise((res) => setTimeout(res, 800));
      }

      // Record successful submit timestamp
      localStorage.setItem(LAST_SUBMIT_KEY, String(Date.now()));

      // Log action in analytics
      if (trackAction) {
        trackAction('Contact Message Sent', `From: ${formData.name} (${contactVal})`);
      }

      // Success
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setEmailError('');
      addToast(t('contact.successMsg'), 'success');

      // Trigger Confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#64ffda', '#ffb454', '#ff8383'],
        });
      } catch (err) {}
    } catch (error) {
      console.error('Contact submit error:', error);
      setStatus('error');
      addToast(t('contact.errorMsg'), 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
      <SectionHeading
        eyebrow="[ GET IN TOUCH ]"
        title={t('contact.title')}
        subtitle={t('contact.subtitle')}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 sm:gap-8 items-start">
        {/* Left Column: Direct Info & Social Channels */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="bg-white/90 dark:bg-[#0c1017]/90 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-7 backdrop-blur-md shadow-lg dark:shadow-xl">
            <h3 className="text-xl font-heading font-bold text-slate-900 dark:text-white mb-3">
              Let's build something remarkable
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
              Have a project, mentorship inquiry, or tech collaboration in mind? Drop me a message or connect through any of my social profiles.
            </p>

            <div className="space-y-3.5">
              {data.email && (
                <a
                  href={`mailto:${data.email}`}
                  className="flex items-center gap-3 text-xs sm:text-sm font-mono text-slate-700 dark:text-slate-300 hover:text-accent-cyan transition-colors p-3 rounded-xl bg-slate-100 dark:bg-[#05070c] border border-slate-200 dark:border-slate-800"
                >
                  <Mail className="w-4 h-4 text-accent-cyan" />
                  <span>{data.email}</span>
                </a>
              )}

              {data.location && (
                <div className="flex items-center gap-3 text-xs sm:text-sm font-mono text-slate-700 dark:text-slate-300 p-3 rounded-xl bg-slate-100 dark:bg-[#05070c] border border-slate-200 dark:border-slate-800">
                  <MapPin className="w-4 h-4 text-accent-violet" />
                  <span>{data.location}</span>
                </div>
              )}
            </div>

            {/* Social Grid */}
            <div className="mt-7 pt-5 border-t border-slate-200 dark:border-slate-800/80">
              <h4 className="text-[11px] font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">
                Social Channels
              </h4>
              <div className="flex flex-wrap gap-2">
                {activeSocials.map((soc) => (
                  <a
                    key={soc.id || soc.name}
                    href={soc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-[#05070c] border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-800 dark:text-slate-200 hover:text-sky-600 dark:hover:text-accent-cyan hover:border-sky-300 dark:hover:border-accent-cyan/50 transition-all hover:scale-105 active:scale-95 cursor-pointer"
                  >
                    <SocialIcon name={soc.icon || soc.name} className="w-4 h-4 text-sky-600 dark:text-accent-cyan" />
                    <span>{soc.name}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Contact Form */}
        <div className="lg:col-span-7">
          <form
            onSubmit={handleSubmit}
            className="bg-white/90 dark:bg-[#0c1017]/90 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-7 backdrop-blur-md shadow-lg dark:shadow-xl flex flex-col gap-4.5"
          >
            {status === 'success' && (
              <div className="p-3.5 rounded-xl bg-emerald-500/10 dark:bg-emerald-950/60 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-xs sm:text-sm flex items-center gap-2.5">
                <CheckCircle className="w-4.5 h-4.5 text-emerald-500 shrink-0" />
                <span>{t('contact.successMsg')}</span>
              </div>
            )}

            {status === 'error' && (
              <div className="p-3.5 rounded-xl bg-rose-500/10 dark:bg-rose-950/60 border border-rose-500/30 text-rose-700 dark:text-rose-300 text-xs sm:text-sm flex items-center gap-2.5">
                <AlertCircle className="w-4.5 h-4.5 text-rose-500 shrink-0" />
                <span>{t('contact.errorMsg')}</span>
              </div>
            )}

            {/* Name */}
            <div>
              <label className="block text-xs font-mono text-slate-700 dark:text-slate-300 mb-1.5 font-semibold">
                {t('contact.name')} *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder={t('contact.namePlaceholder')}
                className="w-full bg-slate-100 dark:bg-[#05070c] border border-slate-200 dark:border-slate-800 focus:border-accent-cyan rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none transition-colors"
              />
            </div>

            {/* Email or Telegram Username with Live Validation */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-mono text-slate-700 dark:text-slate-300 font-semibold">
                  {t('contact.email')} *
                </label>
                <span className="text-[10px] font-mono text-slate-400">
                  email@domain.com yoki @username
                </span>
              </div>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={formData.email}
                  onChange={handleContactChange}
                  onBlur={handleContactBlur}
                  placeholder={t('contact.emailPlaceholder')}
                  className={`w-full bg-slate-100 dark:bg-[#05070c] border rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none transition-colors ${
                    emailError
                      ? 'border-rose-500/80 focus:border-rose-500'
                      : 'border-slate-200 dark:border-slate-800 focus:border-accent-cyan'
                  }`}
                />
                {formData.email.startsWith('@') && (
                  <AtSign className="w-3.5 h-3.5 text-accent-cyan absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                )}
              </div>

              {emailError && (
                <p className="mt-1 text-xs font-mono text-rose-500 flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{emailError}</span>
                </p>
              )}
            </div>

            {/* Message */}
            <div>
              <label className="block text-xs font-mono text-slate-700 dark:text-slate-300 mb-1.5 font-semibold">
                {t('contact.message')} *
              </label>
              <textarea
                rows={4}
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder={t('contact.messagePlaceholder')}
                className="w-full bg-slate-100 dark:bg-[#05070c] border border-slate-200 dark:border-slate-800 focus:border-accent-cyan rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none transition-colors resize-none"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-1 w-full py-3 px-6 rounded-xl font-heading font-bold text-xs sm:text-sm bg-accent-cyan text-slate-950 hover:bg-[#50c8ff] disabled:opacity-50 transition-all shadow-lg shadow-accent-cyan/20 hover:shadow-accent-cyan/40 hover:-translate-y-0.5 active:scale-95 cursor-pointer flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                  <span>{t('contact.sending')}</span>
                </>
              ) : (
                <>
                  <span>{t('contact.send')}</span>
                  <Send className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Humor Anti-Flood Cooldown Modal */}
      <FloodModal
        isOpen={showFloodModal}
        onClose={() => setShowFloodModal(false)}
        remainingSeconds={remainingCooldown}
      />
    </section>
  );
};
