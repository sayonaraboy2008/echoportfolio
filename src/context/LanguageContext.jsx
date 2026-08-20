import React, { createContext, useContext, useState, useEffect } from 'react';

const TRANSLATIONS = {
  nav: {
    home: { en: "Home", uz: "Asosiy" },
    about: { en: "About", uz: "Men haqimda" },
    skills: { en: "Skills", uz: "Ko'nikmalar" },
    projects: { en: "Projects", uz: "Loyihalar" },
    experience: { en: "Experience", uz: "Tajriba" },
    terminal: { en: "Terminal", uz: "Terminal" },
    contact: { en: "Contact", uz: "Bog'lanish" },
    admin: { en: "Admin", uz: "Admin" },
  },
  hero: {
    greeting: { en: "Hi, my name is", uz: "Salom, mening ismim" },
    ctaProjects: { en: "Explore Projects", uz: "Loyihalarni ko'rish" },
    ctaContact: { en: "Get In Touch", uz: "Bog'lanish" },
    scroll: { en: "Scroll Down", uz: "Pastga aylantiring" },
    openToWork: { en: "Available for projects & mentorship", uz: "Loyihalar va mentorlik uchun ochiq" },
  },
  about: {
    title: { en: "About Me", uz: "Men Haqimda" },
    statYears: { en: "Years Experience", uz: "Yillik Tajriba" },
    statProjects: { en: "Projects Completed", uz: "Tugallangan Loyihalar" },
    statTech: { en: "Technologies", uz: "Texnologiyalar" },
  },
  skills: {
    title: { en: "Skills & Tech Stack", uz: "Ko'nikmalar & Texnologiyalar" },
    subtitle: { en: "Technologies and tools I work with daily", uz: "Har kuni ishlatadigan zamonaviy vositalarim" },
    frontend: { en: "Frontend Development", uz: "Frontend Dasturlash" },
    backend: { en: "APIs & Ecosystem", uz: "API & Backend Tizimlari" },
    tools: { en: "Tools & Workflow", uz: "Asboblar & Muhit" },
  },
  projects: {
    title: { en: "Featured Projects", uz: "Tanlangan Loyihalar" },
    subtitle: { en: "Selected works and applications I've built", uz: "Men yaratgan va hamkorlikda bitkazilgan ishlar" },
    all: { en: "All Projects", uz: "Barcha Loyihalar" },
    featuredOnly: { en: "Featured", uz: "Asosiylari" },
    liveDemo: { en: "Live Demo", uz: "Jonli Ko'rish" },
    sourceCode: { en: "Source Code", uz: "Kodlar (GitHub)" },
    searchPlaceholder: { en: "Search projects by name or technology...", uz: "Nomi yoki texnologiyasi bo'yicha qidiring..." },
    viewDetails: { en: "View Details", uz: "Batafsil" },
    noProjects: { en: "No projects found matching your search.", uz: "Qidiruvga mos loyihalar topilmadi." },
  },
  experience: {
    title: { en: "Work & Mentorship", uz: "Ish & Mentorlik Faoliyati" },
    subtitle: { en: "My professional journey and tech career path", uz: "Professional faoliyatim va bosib o'tgan yo'lim" },
  },
  terminal: {
    title: { en: "Interactive Terminal", uz: "Interaktiv Terminal" },
    subtitle: { en: "Type CLI commands to explore my profile and stack", uz: "Buyruqlarni kiritib ma'lumotlarni o'rganing" },
    intro: { en: "Type 'help' to view all available commands.", uz: "Barcha buyruqlarni ko'rish uchun 'help' deb yozing." },
  },
  contact: {
    title: { en: "Get In Touch", uz: "Bog'lanish" },
    subtitle: { en: "Whether you have a project idea, question, or just want to connect, feel free to reach out!", uz: "Loyiha taklifi, savollaringiz yoki hamkorlik uchun bemalol xabar qoldiring!" },
    name: { en: "Your Name", uz: "Ismingiz" },
    namePlaceholder: { en: "Barkamol", uz: "Ismingizni kiriting" },
    email: { en: "Your Email or Telegram", uz: "Email yoki Telegram manzilingiz" },
    emailPlaceholder: { en: "example@gmail.com / @username", uz: "example@gmail.com / @foydalanuvchi" },
    message: { en: "Your Message", uz: "Xabaringiz" },
    messagePlaceholder: { en: "Hello Barkamol, I have a project idea...", uz: "Salom Barkamol, menda ajoyib loyiha g'oyasi bor..." },
    send: { en: "Send Message", uz: "Xabarni Yuborish" },
    sending: { en: "Sending...", uz: "Yuborilmoqda..." },
    successMsg: { en: "Thank you! Your message has been sent successfully.", uz: "Rahmat! Xabaringiz muvaffaqiyatli yuborildi." },
    errorMsg: { en: "Oops! Something went wrong. Please reach out via Telegram.", uz: "Xatolik yuz berdi. Iltimos Telegram orqali bog'laning." },
  },
  footer: {
    text: { en: "Crafted with passion, modern web standards & clean code.", uz: "Zamonaviy veb standartlari, React va toza kod bilan yaratilgan." },
    rights: { en: "All rights reserved.", uz: "Barcha huquqlar himoyalangan." },
  },
  admin: {
    modalTitle: { en: "Portfolio Admin Control", uz: "Portfolio Boshqaruv Paneli" },
    enterPin: { en: "Enter Admin PIN to continue", uz: "Davom etish uchun Admin PIN kiriting" },
    pinPlaceholder: { en: "Default: admin123", uz: "Standart: admin123" },
    unlockBtn: { en: "Unlock Panel", uz: "Panelga Kirish" },
    invalidPin: { en: "Incorrect PIN code!", uz: "Noto'g'ri PIN kod!" },
    tabGeneral: { en: "General & Bio", uz: "Umumiy & Bio" },
    tabProjects: { en: "Projects", uz: "Loyihalar" },
    tabSocials: { en: "Social Links", uz: "Ijtimoiy Tarmoqlar" },
    tabSkills: { en: "Skills", uz: "Ko'nikmalar" },
    tabExperience: { en: "Experience", uz: "Tajriba" },
    tabJson: { en: "JSON Data & Sync", uz: "JSON Manzil & Sinxronlash" },
    saveChanges: { en: "Save Changes", uz: "O'zgarishlarni Saqlash" },
    savedSuccessfully: { en: "Data updated successfully!", uz: "Ma'lumotlar muvaffaqiyatli saqlandi!" },
  }
};

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(() => {
    const saved = localStorage.getItem('portfolio_lang');
    return saved === 'uz' ? 'uz' : 'en';
  });

  useEffect(() => {
    localStorage.setItem('portfolio_lang', lang);
    document.documentElement.setAttribute('lang', lang);
  }, [lang]);

  const toggleLanguage = () => {
    setLang(prev => (prev === 'en' ? 'uz' : 'en'));
  };

  const t = (path) => {
    const keys = path.split('.');
    let current = TRANSLATIONS;
    for (const key of keys) {
      if (!current[key]) return path;
      current = current[key];
    }
    if (current && typeof current === 'object' && current[lang]) {
      return current[lang];
    }
    return typeof current === 'string' ? current : path;
  };

  const getText = (val) => {
    if (!val) return '';
    if (typeof val === 'string') return val;
    if (typeof val === 'object') {
      return val[lang] || val.en || val.uz || '';
    }
    return String(val);
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLanguage, t, getText }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
