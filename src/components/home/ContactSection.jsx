import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useData } from '../../context/DataContext';
import { SectionHeading } from '../ui/SectionHeading';
import { SocialIcon } from '../ui/SocialIcon';
import { sendTelegramMessage } from '../../utils/telegram';
import { Send, Mail, MapPin, CheckCircle, AlertCircle, AtSign } from 'lucide-react';
import confetti from 'canvas-confetti';

export const ContactSection = () => {
  const { t, lang } = useLanguage();
  const { data, addToast } = useData();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [emailError, setEmailError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState(null); // 'success' | 'error' | null

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
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
      <SectionHeading
        eyebrow="$ ./contact.sh --direct"
        title={t('contact.title')}
        subtitle={t('contact.subtitle')}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Direct Info & Social Channels */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="bg-[#121721]/90 border border-slate-800 rounded-2xl p-6 sm:p-8 backdrop-blur-md shadow-xl">
            <h3 className="text-xl font-heading font-bold text-white mb-4">
              Let's build something remarkable
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed mb-6">
              Have a project, mentorship inquiry, or tech collaboration in mind? Drop me a message or connect through any of my social profiles.
            </p>

            <div className="space-y-4">
              {data.email && (
                <a
                  href={`mailto:${data.email}`}
                  className="flex items-center gap-3 text-sm font-mono text-slate-300 hover:text-accent-mint transition-colors p-3 rounded-xl bg-slate-900/60 border border-slate-800"
                >
                  <Mail className="w-4 h-4 text-accent-mint" />
                  <span>{data.email}</span>
                </a>
              )}

              {data.location && (
                <div className="flex items-center gap-3 text-sm font-mono text-slate-300 p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                  <MapPin className="w-4 h-4 text-accent-coral" />
                  <span>{data.location}</span>
                </div>
              )}
            </div>

            {/* Social Grid */}
            <div className="mt-8 pt-6 border-t border-slate-800/80">
              <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-4">
                Social Channels
              </h4>
              <div className="flex flex-wrap gap-2.5">
                {activeSocials.map((soc) => (
                  <a
                    key={soc.id || soc.name}
                    href={soc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300 hover:text-white hover:border-accent-mint/50 transition-all hover:scale-105"
                  >
                    <SocialIcon name={soc.icon || soc.name} className="w-4 h-4 text-accent-mint" />
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
            className="bg-[#121721]/90 border border-slate-800 rounded-2xl p-6 sm:p-8 backdrop-blur-md shadow-xl flex flex-col gap-5"
          >
            {status === 'success' && (
              <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-800/80 text-emerald-300 text-sm flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>{t('contact.successMsg')}</span>
              </div>
            )}

            {status === 'error' && (
              <div className="p-4 rounded-xl bg-rose-950/60 border border-rose-800/80 text-rose-300 text-sm flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
                <span>{t('contact.errorMsg')}</span>
              </div>
            )}

            {/* Name */}
            <div>
              <label className="block text-xs font-mono text-slate-300 mb-2 font-medium">
                {t('contact.name')} *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder={t('contact.namePlaceholder')}
                className="w-full bg-[#0d1117] border border-slate-800 focus:border-accent-mint rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none transition-colors"
              />
            </div>

            {/* Email or Telegram Username with Live Validation */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-mono text-slate-300 font-medium">
                  {t('contact.email')} *
                </label>
                <span className="text-[11px] font-mono text-slate-500">
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
                  className={`w-full bg-[#0d1117] border rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none transition-colors ${
                    emailError
                      ? 'border-rose-500/80 focus:border-rose-500'
                      : 'border-slate-800 focus:border-accent-mint'
                  }`}
                />
                {formData.email.startsWith('@') && (
                  <AtSign className="w-4 h-4 text-accent-mint absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                )}
              </div>

              {emailError && (
                <p className="mt-1.5 text-xs font-mono text-rose-400 flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{emailError}</span>
                </p>
              )}
            </div>

            {/* Message */}
            <div>
              <label className="block text-xs font-mono text-slate-300 mb-2 font-medium">
                {t('contact.message')} *
              </label>
              <textarea
                rows={5}
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder={t('contact.messagePlaceholder')}
                className="w-full bg-[#0d1117] border border-slate-800 focus:border-accent-mint rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none transition-colors resize-none"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-2 w-full py-3.5 px-6 rounded-xl font-heading font-bold text-sm bg-accent-mint text-slate-950 hover:bg-[#72ffe0] disabled:opacity-50 transition-all shadow-lg shadow-accent-mint/20 hover:shadow-accent-mint/40 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                  <span>{t('contact.sending')}</span>
                </>
              ) : (
                <>
                  <span>{t('contact.send')}</span>
                  <Send className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
