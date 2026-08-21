/**
 * Device & Browser Detector Utility for Analytics
 */

// Generate a random UUID string for visitor tracking
const generateVisitorId = () => {
  return `vis_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
};

/**
 * Get or initialize persistent Visitor ID from localStorage
 */
export const getVisitorInfo = () => {
  const STORAGE_KEY = 'portfolio_visitor_id_v2';
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
 * Get complete client snapshot metadata
 */
export const getClientMetadata = () => {
  const { visitorId, isFirstVisit } = getVisitorInfo();
  const deviceType = detectDeviceType();
  const os = detectOS();
  const browser = detectBrowser();
  const screenResolution = `${window.screen.width || 0}x${window.screen.height || 0}`;

  return {
    visitorId,
    isFirstVisit,
    deviceType,
    os,
    browser,
    screenResolution,
  };
};
