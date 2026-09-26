// Prayer App - LocalStorage State Manager & JSON Backup/Restore

const STORAGE_KEYS = {
  SETTINGS: 'prayer_app_settings',
  PRAYER_LOGS: 'prayer_app_logs',
  WORSHIP_LOGS: 'prayer_app_worship',
  QURAN_LOG: 'prayer_app_quran',
  TASBEEH_STATE: 'prayer_app_tasbeeh',
  STREAK_STATE: 'prayer_app_streak'
};

const DEFAULT_SETTINGS = {
  city: 'Jakarta',
  customCoords: null, // { lat: -6.2088, lng: 106.8456 }
  calculationMethod: 'KEMENAG',
  asrFactor: 1, // 1 = Shafi'i, 2 = Hanafi
  offsets: { subuh: 0, terbit: 0, dzuhur: 2, ashar: 0, maghrib: 2, isya: 0 },
  darkMode: false,
  soundEnabled: true,
  vibrationEnabled: true,
  adhanAlerts: { subuh: true, dzuhur: true, ashar: true, maghrib: true, isya: true }
};

export function getTodayKey() {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function loadSettings() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    return raw ? { ...DEFAULT_SETTINGS, ...JSON.parse(raw) } : DEFAULT_SETTINGS;
  } catch (e) {
    return DEFAULT_SETTINGS;
  }
}

export function saveSettings(settings) {
  try {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  } catch (e) {
    console.error('Failed to save settings', e);
  }
}

export function loadTodayPrayerLogs() {
  const dateKey = getTodayKey();
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.PRAYER_LOGS);
    const logs = raw ? JSON.parse(raw) : {};
    return logs[dateKey] || {
      subuh: { completed: false, jamaah: false, time: null },
      dzuhur: { completed: false, jamaah: false, time: null },
      ashar: { completed: false, jamaah: false, time: null },
      maghrib: { completed: false, jamaah: false, time: null },
      isya: { completed: false, jamaah: false, time: null }
    };
  } catch (e) {
    return {
      subuh: { completed: false, jamaah: false, time: null },
      dzuhur: { completed: false, jamaah: false, time: null },
      ashar: { completed: false, jamaah: false, time: null },
      maghrib: { completed: false, jamaah: false, time: null },
      isya: { completed: false, jamaah: false, time: null }
    };
  }
}

export function saveTodayPrayerLog(prayerKey, completed, jamaah = false) {
  const dateKey = getTodayKey();
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.PRAYER_LOGS);
    const logs = raw ? JSON.parse(raw) : {};
    if (!logs[dateKey]) {
      logs[dateKey] = {
        subuh: { completed: false, jamaah: false, time: null },
        dzuhur: { completed: false, jamaah: false, time: null },
        ashar: { completed: false, jamaah: false, time: null },
        maghrib: { completed: false, jamaah: false, time: null },
        isya: { completed: false, jamaah: false, time: null }
      };
    }
    logs[dateKey][prayerKey] = {
      completed,
      jamaah,
      time: completed ? new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) : null
    };
    localStorage.setItem(STORAGE_KEYS.PRAYER_LOGS, JSON.stringify(logs));
    updateStreak();
    return logs[dateKey];
  } catch (e) {
    console.error('Failed to save prayer log', e);
  }
}

export function loadTodayWorshipLogs() {
  const dateKey = getTodayKey();
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.WORSHIP_LOGS);
    const logs = raw ? JSON.parse(raw) : {};
    return logs[dateKey] || {
      tilawah: false,
      dzikirPagi: false,
      dzikirPetang: false,
      murajaah: false,
      witir: false,
      duha: false,
      puasaSunnah: false
    };
  } catch (e) {
    return {
      tilawah: false,
      dzikirPagi: false,
      dzikirPetang: false,
      murajaah: false,
      witir: false,
      duha: false,
      puasaSunnah: false
    };
  }
}

export function toggleTodayWorshipLog(worshipKey) {
  const dateKey = getTodayKey();
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.WORSHIP_LOGS);
    const logs = raw ? JSON.parse(raw) : {};
    if (!logs[dateKey]) {
      logs[dateKey] = {
        tilawah: false,
        dzikirPagi: false,
        dzikirPetang: false,
        murajaah: false,
        witir: false,
        duha: false,
        puasaSunnah: false
      };
    }
    logs[dateKey][worshipKey] = !logs[dateKey][worshipKey];
    localStorage.setItem(STORAGE_KEYS.WORSHIP_LOGS, JSON.stringify(logs));
    return logs[dateKey];
  } catch (e) {
    console.error('Failed to toggle worship log', e);
  }
}

export function loadQuranLog() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.QURAN_LOG);
    return raw ? JSON.parse(raw) : { surah: 'Al-Baqarah', juz: 1, ayat: 1, targetPages: 2, pagesToday: 0, history: [] };
  } catch (e) {
    return { surah: 'Al-Baqarah', juz: 1, ayat: 1, targetPages: 2, pagesToday: 0, history: [] };
  }
}

export function saveQuranLog(log) {
  try {
    localStorage.setItem(STORAGE_KEYS.QURAN_LOG, JSON.stringify(log));
  } catch (e) {
    console.error('Failed to save Quran log', e);
  }
}

export function loadTasbeehState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.TASBEEH_STATE);
    return raw ? JSON.parse(raw) : { count: 0, target: 33, selectedPresetIndex: 0 };
  } catch (e) {
    return { count: 0, target: 33, selectedPresetIndex: 0 };
  }
}

export function saveTasbeehState(state) {
  try {
    localStorage.setItem(STORAGE_KEYS.TASBEEH_STATE, JSON.stringify(state));
  } catch (e) {
    console.error('Failed to save Tasbeeh state', e);
  }
}

export function loadStreakState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.STREAK_STATE);
    return raw ? JSON.parse(raw) : { currentStreak: 0, bestStreak: 0, lastActiveDate: null };
  } catch (e) {
    return { currentStreak: 0, bestStreak: 0, lastActiveDate: null };
  }
}

function updateStreak() {
  const today = getTodayKey();
  const streak = loadStreakState();
  if (streak.lastActiveDate === today) return;

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yKey = `${yesterday.getFullYear()}-${String(yesterday.getMonth()+1).padStart(2,'0')}-${String(yesterday.getDate()).padStart(2,'0')}`;

  if (streak.lastActiveDate === yKey) {
    streak.currentStreak += 1;
  } else if (streak.lastActiveDate !== today) {
    streak.currentStreak = 1;
  }
  if (streak.currentStreak > streak.bestStreak) {
    streak.bestStreak = streak.currentStreak;
  }
  streak.lastActiveDate = today;
  localStorage.setItem(STORAGE_KEYS.STREAK_STATE, JSON.stringify(streak));
}

export function getAllLogsForHistory() {
  try {
    const pRaw = localStorage.getItem(STORAGE_KEYS.PRAYER_LOGS);
    const wRaw = localStorage.getItem(STORAGE_KEYS.WORSHIP_LOGS);
    const pLogs = pRaw ? JSON.parse(pRaw) : {};
    const wLogs = wRaw ? JSON.parse(wRaw) : {};
    return { prayerLogs: pLogs, worshipLogs: wLogs };
  } catch (e) {
    return { prayerLogs: {}, worshipLogs: {} };
  }
}

export function exportBackupJSON() {
  const backup = {
    settings: loadSettings(),
    prayerLogs: JSON.parse(localStorage.getItem(STORAGE_KEYS.PRAYER_LOGS) || '{}'),
    worshipLogs: JSON.parse(localStorage.getItem(STORAGE_KEYS.WORSHIP_LOGS) || '{}'),
    quranLog: loadQuranLog(),
    tasbeeh: loadTasbeehState(),
    streak: loadStreakState(),
    exportDate: new Date().toISOString()
  };
  const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `prayer_app_backup_${getTodayKey()}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

export function importBackupJSON(jsonContent) {
  try {
    const data = typeof jsonContent === 'string' ? JSON.parse(jsonContent) : jsonContent;
    if (data.settings) localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(data.settings));
    if (data.prayerLogs) localStorage.setItem(STORAGE_KEYS.PRAYER_LOGS, JSON.stringify(data.prayerLogs));
    if (data.worshipLogs) localStorage.setItem(STORAGE_KEYS.WORSHIP_LOGS, JSON.stringify(data.worshipLogs));
    if (data.quranLog) localStorage.setItem(STORAGE_KEYS.QURAN_LOG, JSON.stringify(data.quranLog));
    if (data.tasbeeh) localStorage.setItem(STORAGE_KEYS.TASBEEH_STATE, JSON.stringify(data.tasbeeh));
    if (data.streak) localStorage.setItem(STORAGE_KEYS.STREAK_STATE, JSON.stringify(data.streak));
    return true;
  } catch (e) {
    console.error('Invalid backup JSON', e);
    return false;
  }
}

export function resetAllData() {
  Object.values(STORAGE_KEYS).forEach(key => localStorage.removeItem(key));
}
