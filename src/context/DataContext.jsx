import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import defaultPortfolioData from '../../public/data/portfolio.json';

export const MOKKY_ENDPOINT = 'https://2e531a260b0c7ba6.mokky.dev/all';
const STORAGE_KEY = 'portfolio_mokky_cache_v3';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  // Initial state from cache or default portfolio.json
  const [data, setData] = useState(() => {
    try {
      const cached = localStorage.getItem(STORAGE_KEY);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (parsed && Array.isArray(parsed.projects) && parsed.projects.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Failed to parse cached data:', e);
    }
    return defaultPortfolioData;
  });

  const [recordId, setRecordId] = useState(() => {
    return localStorage.getItem('portfolio_mokky_record_id') || null;
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isPushing, setIsPushing] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState(null);
  const [toasts, setToasts] = useState([]);

  // Toast notification dispatcher
  const addToast = useCallback((message, type = 'success') => {
    const id = Date.now() + Math.random().toString();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Fetch directly from https://2e531a260b0c7ba6.mokky.dev/all with fallback to defaultPortfolioData
  const fetchFromMokky = useCallback(async (showNotification = false) => {
    setIsLoading(true);
    try {
      const response = await fetch(MOKKY_ENDPOINT, { cache: 'no-store' });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const json = await response.json();

      let targetItem = null;
      if (Array.isArray(json) && json.length > 0) {
        targetItem = json[json.length - 1];
      } else if (json && typeof json === 'object') {
        targetItem = json;
      }

      if (
        targetItem &&
        (targetItem.brand || targetItem.fullName) &&
        Array.isArray(targetItem.projects) &&
        targetItem.projects.length > 0
      ) {
        setData(targetItem);
        if (targetItem.id) {
          setRecordId(targetItem.id);
          localStorage.setItem('portfolio_mokky_record_id', String(targetItem.id));
        }
        localStorage.setItem(STORAGE_KEY, JSON.stringify(targetItem));
        setLastSyncTime(new Date().toLocaleTimeString());
        if (showNotification) {
          addToast('Ma\'lumotlar mokky.dev dan muvaffaqiyatli yuklandi!', 'success');
        }
        setIsLoading(false);
        return true;
      }
    } catch (err) {
      console.warn('Failed to load from mokky.dev, using fallback data:', err);
      if (showNotification) {
        addToast(`mokky.dev yuklashda xatolik: ${err.message}`, 'error');
      }
    }

    // Fallback: If current state has empty projects, fill with defaultPortfolioData
    setData((prev) => {
      if (!prev || !Array.isArray(prev.projects) || prev.projects.length === 0) {
        return defaultPortfolioData;
      }
      return prev;
    });
    setIsLoading(false);
    return false;
  }, [addToast]);

  // Initial load on startup
  useEffect(() => {
    fetchFromMokky(false);
  }, [fetchFromMokky]);

  // Save to mokky.dev via PATCH or POST
  const saveToMokky = async (newData, showNotification = true) => {
    setIsPushing(true);
    try {
      const currentId = newData.id || recordId;
      let url = currentId ? `${MOKKY_ENDPOINT}/${currentId}` : MOKKY_ENDPOINT;
      let method = currentId ? 'PATCH' : 'POST';

      let response = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newData),
      });

      if (!response.ok && (response.status === 404 || response.status === 405)) {
        // Fallback: create via POST
        response = await fetch(MOKKY_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newData),
        });
      }

      if (!response.ok) {
        throw new Error(`Mokky server error ${response.status}`);
      }

      const resJson = await response.json();
      if (resJson && resJson.id) {
        setRecordId(resJson.id);
        localStorage.setItem('portfolio_mokky_record_id', String(resJson.id));
      }

      setLastSyncTime(new Date().toLocaleTimeString());
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));

      if (showNotification) {
        addToast('Barcha o\'zgarishlar https://2e531a260b0c7ba6.mokky.dev/all manziliga saqlandi!', 'success');
      }
      setIsPushing(false);
      return true;
    } catch (err) {
      console.error('Failed to save to mokky.dev:', err);
      if (showNotification) {
        addToast(`mokky.dev ga saqlashda xatolik: ${err.message}`, 'error');
      }
      setIsPushing(false);
      return false;
    }
  };

  // Helper to commit state and push to mokky.dev
  const commitAndSave = (updatedData, toastMessage) => {
    setData(updatedData);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedData));
    if (toastMessage) {
      addToast(toastMessage, 'success');
    }
    saveToMokky(updatedData, false);
  };

  // Profile update
  const updateProfile = (profileFields) => {
    const updated = { ...data, ...profileFields };
    commitAndSave(updated, 'Profil ma\'lumotlari yangilandi va mokky.dev ga saqlandi!');
  };

  // Socials update
  const updateSocials = (socialsList) => {
    const updated = { ...data, socials: socialsList };
    commitAndSave(updated, 'Ijtimoiy tarmoqlar saqlandi va saytda yangilandi!');
  };

  const addSocial = (social) => {
    const newSocial = {
      ...social,
      id: social.id || `soc-${Date.now()}`,
      enabled: social.enabled !== false,
    };
    const updated = { ...data, socials: [...(data.socials || []), newSocial] };
    commitAndSave(updated, `"${newSocial.name}" qo'shildi va mokky.dev ga saqlandi!`);
  };

  const deleteSocial = (id) => {
    const updated = { ...data, socials: (data.socials || []).filter((s) => s.id !== id) };
    commitAndSave(updated, 'Ijtimoiy tarmoq o\'chirildi va mokky.dev dan yangilandi!');
  };

  // Projects update
  const addProject = (newProj) => {
    const projectWithId = {
      ...newProj,
      id: newProj.id || `proj-${Date.now()}`,
    };
    const updated = { ...data, projects: [projectWithId, ...(data.projects || [])] };
    commitAndSave(updated, `"${newProj.title}" loyihasi qo'shildi va mokky.dev ga saqlandi!`);
  };

  const updateProject = (id, updatedFields) => {
    const updated = {
      ...data,
      projects: (data.projects || []).map((p) => (p.id === id ? { ...p, ...updatedFields } : p)),
    };
    commitAndSave(updated, 'Loyiha tahrirlandi va mokky.dev ga saqlandi!');
  };

  const deleteProject = (id) => {
    const updated = { ...data, projects: (data.projects || []).filter((p) => p.id !== id) };
    commitAndSave(updated, 'Loyiha o\'chirildi va mokky.dev ga saqlandi!');
  };

  // Skills update
  const updateSkills = (newSkills) => {
    const updated = { ...data, skills: newSkills };
    commitAndSave(updated, 'Ko\'nikmalar saqlandi va mokky.dev da yangilandi!');
  };

  // Experience update
  const updateExperience = (expList) => {
    const updated = { ...data, experience: expList };
    commitAndSave(updated, 'Ish tajribalari saqlandi va mokky.dev da yangilandi!');
  };

  const addExperience = (expItem) => {
    const newExp = { ...expItem, id: expItem.id || `exp-${Date.now()}` };
    const updated = { ...data, experience: [newExp, ...(data.experience || [])] };
    commitAndSave(updated, 'Tajriba qo\'shildi va mokky.dev ga saqlandi!');
  };

  const deleteExperience = (id) => {
    const updated = { ...data, experience: (data.experience || []).filter((e) => e.id !== id) };
    commitAndSave(updated, 'Tajriba o\'chirildi va mokky.dev da yangilandi!');
  };

  // Admin PIN update
  const updateAdminPin = (newPin) => {
    const updated = { ...data, adminPin: newPin };
    commitAndSave(updated, 'Admin PIN o\'zgartirildi va mokky.dev da saqlandi!');
  };

  // Export JSON
  const exportJson = () => {
    try {
      const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(data, null, 2));
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute('href', dataStr);
      downloadAnchor.setAttribute('download', `portfolio-mokky-backup-${new Date().toISOString().slice(0, 10)}.json`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
      addToast('JSON zaxira fayli yuklab olindi!', 'success');
    } catch (e) {
      addToast('Eksportda xatolik', 'error');
    }
  };

  // Import JSON
  const importJson = (jsonData) => {
    try {
      if (jsonData && typeof jsonData === 'object') {
        const item = Array.isArray(jsonData) ? jsonData[jsonData.length - 1] : jsonData;
        setData(item);
        saveToMokky(item, true);
        return true;
      }
      throw new Error('Noto\'g\'ri format');
    } catch (e) {
      addToast(`Import xatosi: ${e.message}`, 'error');
      return false;
    }
  };

  // Reset / Refresh to default portfolio.json
  const resetToDefault = () => {
    setData(defaultPortfolioData);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultPortfolioData));
    addToast('Ma\'lumotlar sukut bo\'yicha (portfolio.json) holatiga keltirildi!', 'success');
  };

  return (
    <DataContext.Provider
      value={{
        data,
        setData,
        mokkyUrl: MOKKY_ENDPOINT,
        isLoading,
        isPushing,
        lastSyncTime,
        fetchFromJsonUrl: () => fetchFromMokky(true),
        pushToRemoteEndpoint: () => saveToMokky(data, true),
        saveToMokky,
        updateProfile,
        addProject,
        updateProject,
        deleteProject,
        updateSocials,
        addSocial,
        deleteSocial,
        updateSkills,
        updateExperience,
        addExperience,
        deleteExperience,
        updateAdminPin,
        exportJson,
        importJson,
        resetToDefault,
        toasts,
        addToast,
        removeToast,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
