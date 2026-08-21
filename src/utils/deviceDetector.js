/**
 * Enhanced Device & Browser Detector Utility for Analytics
 */

// Generate a persistent UUID string for visitor tracking
const generateVisitorId = () => {
  return `vis_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
};

/**
 * Get or initialize persistent Visitor ID from localStorage
 */
export const getVisitorInfo = () => {
  const STORAGE_KEY = 'portfolio_visitor_id_v3';
  let visitorId = localStorage.getItem(STORAGE_KEY);
  let isFirstVisit = false;

  if (!visitorId) {
    visitorId = generateVisitorId();
    localStorage.setItem(STORAGE_KEY, visitorId);
    isFirstVisit = true;
  }

  return {
    visitorId,
    isFirstVisit,
  };
};

/**
 * Detect Device Type (Mobile, Tablet, Desktop)
 */
export const detectDeviceType = () => {
  const ua = navigator.userAgent || navigator.vendor || window.opera || '';
  const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth || 1024;

  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    return 'Tablet';
  }
  if (/Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua) || width < 768) {
    return 'Mobile';
  }
  return 'Desktop';
};

/**
 * Detect Specific Device Name (iPhone, Samsung/Android, Windows PC, Mac, iPad, etc.)
 */
export const detectDeviceName = () => {
  const ua = navigator.userAgent || '';
  if (/iPhone/.test(ua)) return 'Apple iPhone';
  if (/iPad/.test(ua)) return 'Apple iPad';
  if (/Android/.test(ua)) {
    if (/Mobile/.test(ua)) return 'Android Smartphone';
    return 'Android Tablet';
  }
  if (/Macintosh|MacIntel|MacPPC|Mac68K/.test(ua)) return 'Mac / macOS';
  if (/Windows/.test(ua)) return 'Windows PC';
  if (/Linux/.test(ua)) return 'Linux PC';
  return 'Boshqa Qurilma';
};

/**
 * Detect Operating System (iOS, Android, Windows, macOS, Linux, Other)
 */
export const detectOS = () => {
  const ua = navigator.userAgent || '';
  if (/iPad|iPhone|iPod/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)) {
    return 'iOS';
  }
  if (/Android/.test(ua)) {
    return 'Android';
  }
  if (/Win/.test(ua)) {
    return 'Windows';
  }
  if (/Mac/.test(ua)) {
    return 'macOS';
  }
  if (/Linux/.test(ua)) {
    return 'Linux';
  }
  return 'Boshqa OS';
};

/**
 * Detect Browser (Chrome, Safari, Telegram, Firefox, Edge, Opera, Other)
 */
export const detectBrowser = () => {
  const ua = navigator.userAgent || '';
  if (/Telegram/i.test(ua)) {
    return 'Telegram App';
  }
  if (/Edg/i.test(ua)) {
    return 'Edge';
  }
  if (/OPR|Opera/i.test(ua)) {
    return 'Opera';
  }
  if (/Chrome/i.test(ua) && !/Edg|OPR|CriOS/i.test(ua)) {
    return 'Chrome';
  }
  if (/CriOS/i.test(ua)) {
    return 'Chrome (iOS)';
  }
  if (/Safari/i.test(ua) && !/Chrome|Edg|OPR|CriOS/i.test(ua)) {
    return 'Safari';
  }
  if (/Firefox|FxiOS/i.test(ua)) {
    return 'Firefox';
  }
  return 'Boshqa Brauzer';
};

/**
 * Fetch Public IP Address asynchronously
 */
export const fetchUserIP = async () => {
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 600);
    const res = await fetch('https://api.ipify.org?format=json', { signal: controller.signal });
    clearTimeout(timer);
    if (res.ok) {
      const data = await res.json();
      if (data && data.ip) return data.ip;
    }
  } catch (e) {}
  return 'Foydalanuvchi IP (Faqat tarmoq)';
};

/**
 * Get complete client snapshot metadata
 */
export const getClientMetadata = async () => {
  const { visitorId, isFirstVisit } = getVisitorInfo();
  const deviceType = detectDeviceType();
  const deviceName = detectDeviceName();
  const os = detectOS();
  const browser = detectBrowser();
  const screenResolution = `${window.screen.width || 0}x${window.screen.height || 0}`;
  const ip = await fetchUserIP();

  return {
    visitorId,
    isFirstVisit,
    deviceType,
    deviceName,
    os,
    browser,
    screenResolution,
    ip,
  };
};
