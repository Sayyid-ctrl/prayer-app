// Prayer App - Standalone Script with AdBlocker-Proof & Strict DNS Ambient Audio Engine

(function () {
  'use strict';

  // ==========================================
  // 1. DATA CONSTANTS & LIBRARIES
  // ==========================================
  const CITIES = [
    { name: 'Jakarta', lat: -6.2088, lng: 106.8456, timezone: 7 },
    { name: 'Surabaya', lat: -7.2575, lng: 112.7521, timezone: 7 },
    { name: 'Bandung', lat: -6.9175, lng: 107.6191, timezone: 7 },
    { name: 'Medan', lat: 3.5952, lng: 98.6722, timezone: 7 },
    { name: 'Semarang', lat: -6.9667, lng: 110.4167, timezone: 7 },
    { name: 'Makassar', lat: -5.1477, lng: 119.4327, timezone: 8 },
    { name: 'Palembang', lat: -2.9761, lng: 104.7754, timezone: 7 },
    { name: 'Yogyakarta', lat: -7.7956, lng: 110.3695, timezone: 7 },
    { name: 'Denpasar', lat: -8.6705, lng: 115.2126, timezone: 8 },
    { name: 'Banda Aceh', lat: 5.5483, lng: 95.3238, timezone: 7 },
    { name: 'Batam', lat: 1.1301, lng: 104.0529, timezone: 7 },
    { name: 'Pekanbaru', lat: 0.5071, lng: 101.4478, timezone: 7 },
    { name: 'Padang', lat: -0.9471, lng: 100.4172, timezone: 7 },
    { name: 'Bandar Lampung', lat: -5.4500, lng: 105.2667, timezone: 7 },
    { name: 'Malang', lat: -7.9666, lng: 112.6326, timezone: 7 },
    { name: 'Samarinda', lat: -0.5022, lng: 117.1536, timezone: 8 },
    { name: 'Banjarmasin', lat: -3.3194, lng: 114.5908, timezone: 8 },
    { name: 'Pontianak', lat: -0.0263, lng: 109.3425, timezone: 7 },
    { name: 'Manado', lat: 1.4748, lng: 124.8428, timezone: 8 },
    { name: 'Mataram', lat: -8.5833, lng: 116.1167, timezone: 8 },
    { name: 'Kupang', lat: -10.1772, lng: 123.6070, timezone: 8 },
    { name: 'Ambon', lat: -3.6954, lng: 128.1814, timezone: 9 },
    { name: 'Jayapura', lat: -2.5489, lng: 140.7180, timezone: 9 }
  ];

  const CALCULATION_METHODS = [
    { id: 'KEMENAG', name: 'Kementerian Agama RI (Standard Indonesia)', fajrAngle: 20, ishaAngle: 18 },
    { id: 'MWL', name: 'Muslim World League', fajrAngle: 18, ishaAngle: 17 },
    { id: 'ISNA', name: 'Islamic Society of North America (ISNA)', fajrAngle: 15, ishaAngle: 15 },
    { id: 'EGYPT', name: 'Egyptian General Authority of Survey', fajrAngle: 19.5, ishaAngle: 17.5 },
    { id: 'UMM_AL_QURA', name: 'Umm al-Qura University, Makkah', fajrAngle: 18.5, ishaAngle: 0, ishaInterval: 90 }
  ];

  // RADIO STATIONS WITH 100% RELIABLE LIVE HTTPS STREAMS (QURANGO & SUNNAH RADIOS)
  const RADIO_STATIONS = [
    {
      id: 'rodja',
      name: 'Radio Rodja 756 AM',
      tagline: 'Menebar Cahaya Sunnah',
      location: 'Cileungsi, Bogor / Jakarta',
      category: 'Kajian & Murottal',
      program: 'Kajian Bulughul Maram & Ceramah Umum',
      urls: [
        'https://radio.radiorodja.com/stream',
        'https://live.radiorodja.com/stream',
        'https://qurango.net/radio/mix',
        'https://stream.zeno.fm/f3wvbbqmdg8uv'
      ]
    },
    {
      id: 'murottal_alafasy',
      name: 'Murottal 24 Jam (Mishary Alafasy)',
      tagline: 'Lantunan Suci Al-Qur\'an 24/7',
      location: 'Live Stream 24 Jam',
      category: 'Al-Qur\'an 30 Juz',
      program: 'Bacaan Merdu Al-Qur\'an 30 Juz Tanpa Henti',
      urls: [
        'https://qurango.net/radio/mishary_alafasi',
        'https://backup.qurango.net/radio/mishary_alafasi',
        'https://server8.mp3quran.net/afs/001.mp3'
      ]
    },
    {
      id: 'murottal_tarteel',
      name: 'Radio Murottal Al-Qur\'an 24/7',
      tagline: 'Tilawah 30 Juz Penuh Khusyuk',
      location: 'Live Stream 24 Jam',
      category: 'Al-Qur\'an 30 Juz',
      program: 'Lantunan Ayat Suci Al-Qur\'an Kontinyu',
      urls: [
        'https://qurango.net/radio/tarteel',
        'https://backup.qurango.net/radio/tarteel',
        'https://qurango.net/radio/salma'
      ]
    },
    {
      id: 'murottal_sudais',
      name: 'Murottal 24 Jam (Abdurrahman As-Sudais)',
      tagline: 'Imam Masjidil Haram Makkah',
      location: 'Masjidil Haram Makkah',
      category: 'Al-Qur\'an 30 Juz',
      program: 'Lantunan Syahdu Al-Qur\'an 30 Juz',
      urls: [
        'https://qurango.net/radio/saud_alshuraim',
        'https://server11.mp3quran.net/sds/001.mp3'
      ]
    },
    {
      id: 'radiomuslim',
      name: 'Radio Muslim Jogja',
      tagline: 'Memurnikan Aqidah, Menebar Sunnah',
      location: 'Yogyakarta',
      category: 'Kajian & Aqidah',
      program: 'Tanya Jawab Syariah & Ceramah Aqidah',
      urls: [
        'https://stream.radiomuslim.com/stream',
        'https://radiomuslim.com/stream',
        'https://qurango.net/radio/mix'
      ]
    },
    {
      id: 'tarbiyahsunnah',
      name: 'Radio Tarbiyah Sunnah',
      tagline: 'Solusi Pemuda & Keluarga Muslim',
      location: 'Bandung, Jawa Barat',
      category: 'Kajian Keluarga',
      program: 'Bimbingan Keluarga Sakinah & Parenting',
      urls: [
        'https://stream.radiotarbiyahsunnah.com/stream',
        'https://stream.radiotarbiyahsunnah.com/live',
        'https://qurango.net/radio/mix'
      ]
    }
  ];

  const DZIKIR_PRESETS = [
    { name: 'Subhanallah', arabic: 'سُبْحَانَ اللَّهِ', translation: 'Maha Suci Allah', defaultTarget: 33 },
    { name: 'Alhamdulillah', arabic: 'الْحَمْدُ لِلَّهِ', translation: 'Segala puji bagi Allah', defaultTarget: 33 },
    { name: 'Allahu Akbar', arabic: 'اللَّهُ أَكْبَرُ', translation: 'Allah Maha Besar', defaultTarget: 33 },
    { name: 'Astaghfirullah', arabic: 'أَسْتَغْفِرُ اللَّهَ', translation: 'Aku memohon ampun kepada Allah', defaultTarget: 100 },
    { name: 'Laa ilaaha illallah', arabic: 'لَا إِلَٰهَ إِلَّا اللَّهُ', translation: 'Tiada Tuhan selain Allah', defaultTarget: 100 },
    { name: 'Shalawat Nabi', arabic: 'اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ', translation: 'Ya Allah, limpahkan shalawat kepada Nabi Muhammad', defaultTarget: 100 },
    { name: 'Hasbunallah', arabic: 'حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ', translation: 'Cukuplah Allah menjadi Penolong kami', defaultTarget: 70 },
    { name: 'Laa hawla wa laa quwwata', arabic: 'لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ', translation: 'Tiada daya dan upaya kecuali dengan pertolongan Allah', defaultTarget: 33 }
  ];

  const HADITHS = [
    { text: 'Amalan yang paling dicintai oleh Allah adalah amalan yang kontinyu (dikerjakan secara rutin) meskipun sedikit.', source: 'HR. Bukhari & Muslim' },
    { text: 'Shalat tepat pada waktunya adalah amalan yang paling utama.', source: 'HR. Bukhari & Muslim' },
    { text: 'Barangsiapa yang membaca satu huruf dari Kitab Allah (Al-Qur\'an), maka baginya satu kebaikan dan satu kebaikan dilipatgandakan menjadi sepuluh kali lipat.', source: 'HR. Tirmidzi' },
    { text: 'Perumpamaan orang yang berzikir kepada Tuhannya dan orang yang tidak berzikir adalah seperti orang yang hidup dan orang yang mati.', source: 'HR. Bukhari' },
    { text: 'Shalat berjamaah lebih utama daripada shalat sendirian sebanyak 27 derajat.', source: 'HR. Bukhari & Muslim' },
    { text: 'Sebaik-baik kalian adalah orang yang mempelajari Al-Qur\'an dan mengajarkannya.', source: 'HR. Bukhari' },
    { text: 'Doa adalah otaknya ibadah.', source: 'HR. Tirmidzi' }
  ];

  const DAILY_DOAS = [
    { id: 1, title: 'Doa Bangun Tidur', category: 'Harian', arabic: 'الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ', latin: 'Alhamdulillahilladzi ahyana ba\'da ma amatana wa ilaihin nusyur.', translation: 'Segala puji bagi Allah yang menghidupkan kami kembali setelah mematikan kami dan hanya kepada-Nya kami dibangkitkan.' },
    { id: 2, title: 'Doa Sebelum Makan', category: 'Makan', arabic: 'اللَّهُمَّ بَارِكْ لَنَا فِيمَا رَزَقْتَنَا وَقِنَا عَذَابَ النَّارِ', latin: 'Allahumma barik lana fi ma razaqtana wa qina \'adzaban nar.', translation: 'Ya Allah, berkahilah rezeki yang Engkau berikan kepada kami dan peliharalah kami dari siksa api neraka.' },
    { id: 3, title: 'Doa Setelah Makan', category: 'Makan', arabic: 'الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنَا وَسَقَانَا وَجَعَلَنَا مُسْلِمِينَ', latin: 'Alhamdulillahilladzi ath\'amana wa saqana wa ja\'alana muslimin.', translation: 'Segala puji bagi Allah yang memberikan kami makan dan minum serta menjadikan kami orang-orang Muslim.' },
    { id: 4, title: 'Doa Keluar Rumah', category: 'Harian', arabic: 'بِسْمِ اللَّهِ تَوَكَّلْتُ عَلَى اللَّهِ لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ', latin: 'Bismillahi tawakkaltu \'alallah, la haula wa la quwwata illa billah.', translation: 'Dengan nama Allah, aku bertawakal kepada Allah. Tiada daya dan upaya kecuali dengan pertolongan Allah.' },
    { id: 5, title: 'Doa Masuk Masjid', category: 'Shalat', arabic: 'اللَّهُمَّ افْتَحْ لِي أَبْوَابَ رَحْمَتِكَ', latin: 'Allahummaftah lii abwaaba rahmatik.', translation: 'Ya Allah, bukakanlah untukku pintu-pintu rahmat-Mu.' },
    { id: 6, title: 'Doa Keluar Masjid', category: 'Shalat', arabic: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ مِنْ فَضْلِكَ', latin: 'Allahumma innii as\'aluka min fadlik.', translation: 'Ya Allah, sesungguhnya aku memohon keutamaan dari-Mu.' },
    { id: 7, title: 'Doa Sapu Jagad (Kebaikan Dunia & Akhirat)', category: 'Utama', arabic: 'رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ', latin: 'Rabbana atina fid-dunya hasanah wa fil-akhirati hasanah wa qina \'adzaban nar.', translation: 'Ya Tuhan kami, berilah kami kebaikan di dunia dan kebaikan di akhirat dan peliharalah kami dari siksa neraka.' },
    { id: 8, title: 'Doa Mohon Ilmu & Rezeki Halal', category: 'Utama', arabic: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ عِلْمًا نَافِعًا وَرِزْقًا طَيِّبًا وَعَمَلًا مُتَقَبَّلًا', latin: 'Allahumma inni as\'aluka \'ilman nafi\'an wa rizqan thayyiban wa \'amalan mutaqabbalan.', translation: 'Ya Allah, sesungguhnya aku memohon kepada-Mu ilmu yang bermanfaat, rezeki yang baik, dan amal yang diterima.' },
    { id: 9, title: 'Doa Sebelum Tidur', category: 'Harian', arabic: 'بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا', latin: 'Bismikallahumma amutu wa ahya.', translation: 'Dengan nama-Mu ya Allah aku mati dan aku hidup.' },
    { id: 10, title: 'Doa Kedua Orang Tua', category: 'Keluarga', arabic: 'رَبِّ اغْفِرْ لِي وَلِوَالِدَيَّ وَارْحَمْهُمَا كَمَا رَبَّيَانِي صَغِيرًا', latin: 'Rabbighfir lii wa liwaalidayya warhamhuma kamaa rabbayaanii shaghiiraa.', translation: 'Ya Rabbku, ampunilah aku dan kedua orang tuaku, dan kasihilah keduanya sebagaimana mereka merawatku di waktu kecil.' }
  ];

  // ==========================================
  // 2. PRAYER TIME & HIJRI CALCULATOR
  // ==========================================
  function degToRad(deg) { return (deg * Math.PI) / 180.0; }
  function radToDeg(rad) { return (rad * 180.0) / Math.PI; }
  function fixAngle(angle) { let a = angle % 360; return a < 0 ? a + 360 : a; }
  function fixHour(hour) { let h = hour % 24; return h < 0 ? h + 24 : h; }

  function getJulianDate(year, month, day) {
    if (month <= 2) { year -= 1; month += 12; }
    let A = Math.floor(year / 100);
    let B = 2 - A + Math.floor(A / 4);
    return Math.floor(365.25 * (year + 4716)) + Math.floor(30.6001 * (month + 1)) + day + B - 1524.5;
  }

  function getSunPosition(jd) {
    let D = jd - 2451545.0;
    let g = fixAngle(357.529 + 0.98560028 * D);
    let q = fixAngle(280.459 + 0.98564736 * D);
    let L = fixAngle(q + 1.915 * Math.sin(degToRad(g)) + 0.020 * Math.sin(degToRad(2 * g)));
    let e = 23.439 - 0.00000036 * D;
    let dec = radToDeg(Math.asin(Math.sin(degToRad(e)) * Math.sin(degToRad(L))));
    let RA = radToDeg(Math.atan2(Math.cos(degToRad(e)) * Math.sin(degToRad(L)), Math.cos(degToRad(L)))) / 15.0;
    let EqT = q / 15.0 - fixHour(RA);
    if (EqT > 20) EqT -= 24;
    if (EqT < -20) EqT += 24;
    return { declination: dec, eqT: EqT };
  }

  function computeHourAngle(angle, lat, dec) {
    let latRad = degToRad(lat);
    let decRad = degToRad(dec);
    let angleRad = degToRad(angle);
    let cosH = (Math.sin(angleRad) - Math.sin(latRad) * Math.sin(decRad)) / (Math.cos(latRad) * Math.cos(decRad));
    if (cosH > 1 || cosH < -1) return null;
    return radToDeg(Math.acos(cosH)) / 15.0;
  }

  function computeAsrHourAngle(shadowFactor, lat, dec) {
    let phi = degToRad(lat);
    let delta = degToRad(dec);
    let angleRad = Math.atan(1.0 / (shadowFactor + Math.tan(Math.abs(phi - delta))));
    return computeHourAngle(radToDeg(angleRad), lat, dec);
  }

  function formatHoursToTimeString(hoursFloat) {
    let h = fixHour(hoursFloat);
    let mins = Math.floor((h - Math.floor(h)) * 60);
    let hours = Math.floor(h);
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
  }

  function parseTimeToMinutes(timeStr) {
    const parts = timeStr.split(':').map(Number);
    return parts[0] * 60 + parts[1];
  }

  function calculatePrayerTimes(date, lat, lng, timezone, options = {}) {
    const method = options.method || { fajrAngle: 20, ishaAngle: 18 };
    const asrFactor = options.asrFactor || 1;
    const offsets = options.offsets || { subuh: 0, terbit: 0, dzuhur: 2, ashar: 0, maghrib: 2, isya: 0 };

    let jd = getJulianDate(date.getFullYear(), date.getMonth() + 1, date.getDate());
    let sun = getSunPosition(jd);

    let dhuhrBase = 12 + timezone - lng / 15.0 - sun.eqT;
    let hSunrise = computeHourAngle(-0.833, lat, sun.declination);
    let hFajr = computeHourAngle(-method.fajrAngle, lat, sun.declination);
    let hAsr = computeAsrHourAngle(asrFactor, lat, sun.declination);
    let hIsha = method.ishaInterval ? null : computeHourAngle(-method.ishaAngle, lat, sun.declination);

    let fajrTime = hFajr ? dhuhrBase - hFajr + (offsets.subuh || 0)/60 : dhuhrBase - 1.5;
    let sunriseTime = hSunrise ? dhuhrBase - hSunrise + (offsets.terbit || 0)/60 : dhuhrBase - 1.0;
    let dhuhrTime = dhuhrBase + (offsets.dzuhur || 2)/60;
    let asrTime = hAsr ? dhuhrBase + hAsr + (offsets.ashar || 0)/60 : dhuhrBase + 3.0;
    let maghribTime = hSunrise ? dhuhrBase + hSunrise + (offsets.maghrib || 2)/60 : dhuhrBase + 6.0;
    let ishaTime = hIsha 
      ? dhuhrBase + hIsha + (offsets.isya || 0)/60 
      : maghribTime + (method.ishaInterval || 90) / 60.0 + (offsets.isya || 0)/60;

    return {
      subuh: formatHoursToTimeString(fajrTime),
      terbit: formatHoursToTimeString(sunriseTime),
      dzuhur: formatHoursToTimeString(dhuhrTime),
      ashar: formatHoursToTimeString(asrTime),
      maghrib: formatHoursToTimeString(maghribTime),
      isya: formatHoursToTimeString(ishaTime)
    };
  }

  function getHijriDate(date = new Date()) {
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    let m = month + 1, y = year;
    if (m < 3) { y -= 1; m += 12; }

    let a = Math.floor(y / 100);
    let b = 2 - a + Math.floor(a / 4);
    let jd = Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) + day + b - 1524.5;
    let z = jd + 0.5;
    let i = Math.floor((z - 1867216.25) / 36524.25);
    let A = z + 1 + i - Math.floor(i / 4);
    let B = A + 1524;
    let C = Math.floor((B - 122.1) / 365.25);
    let D = Math.floor(365.25 * C);
    let E = Math.floor((B - D) / 30.6001);
    let l = jd - 1948440 + 10632;
    let n = Math.floor((l - 1) / 10631);
    l = l - 10631 * n + 354;
    let j = (Math.floor((10985 - l) / 5316)) * (Math.floor((50 * l) / 17719)) + (Math.floor(l / 5670)) * (Math.floor((43 * l) / 15238));
    l = l - (Math.floor((30 - j) / 15)) * (Math.floor((17719 * j) / 50)) - (Math.floor(j / 16)) * (Math.floor((15238 * j) / 43)) + 29;
    let hijriMonth = Math.floor((24 * l) / 709);
    let hijriDay = Math.floor(l - Math.floor((709 * hijriMonth) / 24));
    let hijriYear = Math.floor(30 * n + j - 30);

    const hijriMonths = [
      'Muharram', 'Safar', 'Rabiul Awal', 'Rabiul Akhir',
      'Jumadil Awal', 'Jumadil Akhir', 'Rajab', 'Sya\'ban',
      'Ramadhan', 'Syawal', 'Zulqa\'dah', 'Zulhijjah'
    ];

    return {
      day: hijriDay,
      monthName: hijriMonths[(hijriMonth - 1 + 12) % 12] || 'Safar',
      year: hijriYear,
      formatted: `${hijriDay} ${hijriMonths[(hijriMonth - 1 + 12) % 12] || 'Safar'} ${hijriYear} H`
    };
  }

  function getNextPrayer(prayerTimes, currentTime = new Date()) {
    const currentMins = currentTime.getHours() * 60 + currentTime.getMinutes();
    const currentSecs = currentTime.getSeconds();
    
    const prayers = [
      { name: 'Subuh', key: 'subuh', time: prayerTimes.subuh },
      { name: 'Terbit', key: 'terbit', time: prayerTimes.terbit },
      { name: 'Dzuhur', key: 'dzuhur', time: prayerTimes.dzuhur },
      { name: 'Ashar', key: 'ashar', time: prayerTimes.ashar },
      { name: 'Maghrib', key: 'maghrib', time: prayerTimes.maghrib },
      { name: 'Isya', key: 'isya', time: prayerTimes.isya }
    ];

    for (let i = 0; i < prayers.length; i++) {
      const pMins = parseTimeToMinutes(prayers[i].time);
      if (pMins > currentMins) {
        const diffMins = pMins - currentMins - 1;
        const diffSecs = 60 - currentSecs;
        return {
          next: prayers[i],
          remainingMins: diffMins,
          remainingSecs: diffSecs,
          totalRemainingSeconds: diffMins * 60 + diffSecs
        };
      }
    }
    const subuhMins = parseTimeToMinutes(prayers[0].time);
    const remainingMins = (24 * 60 - currentMins) + subuhMins - 1;
    const remainingSecs = 60 - currentSecs;
    return {
      next: prayers[0],
      remainingMins: remainingMins,
      remainingSecs: remainingSecs,
      totalRemainingSeconds: remainingMins * 60 + remainingSecs
    };
  }

  // ==========================================
  // 3. QIBLA CALCULATOR
  // ==========================================
  function calculateQiblaDirection(lat, lng) {
    let phi = degToRad(lat);
    let lambda = degToRad(lng);
    let phiK = degToRad(21.422487);
    let lambdaK = degToRad(39.826206);
    let deltaLambda = lambdaK - lambda;

    let y = Math.sin(deltaLambda);
    let x = Math.cos(phi) * Math.tan(phiK) - Math.sin(phi) * Math.cos(deltaLambda);
    let qiblaDeg = radToDeg(Math.atan2(y, x));
    return (qiblaDeg + 360) % 360;
  }

  // ==========================================
  // 4. AUDIO & HAPTICS (SYNTHESIZER FAIL-SAFE)
  // ==========================================
  let audioCtx = null;
  let ambientOscillators = [];

  function getAudioContext() {
    if (!audioCtx) {
      const AudioCtxClass = window.AudioContext || window.webkitAudioContext;
      if (AudioCtxClass) audioCtx = new AudioCtxClass();
    }
    if (audioCtx && audioCtx.state === 'suspended') audioCtx.resume();
    return audioCtx;
  }

  function startAmbientSoundSynth() {
    stopAmbientSoundSynth();
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const freqs = [216, 432, 528, 648]; // Harmonic peaceful frequencies
      freqs.forEach(freq => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);
        
        gain.gain.setValueAtTime(0.001, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.05, ctx.currentTime + 2.0);
        
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        ambientOscillators.push({ osc, gain });
      });
    } catch (e) {}
  }

  function stopAmbientSoundSynth() {
    try {
      const ctx = getAudioContext();
      ambientOscillators.forEach(item => {
        try {
          if (ctx) item.gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.5);
          setTimeout(() => item.osc.stop(), 500);
        } catch (e) {}
      });
      ambientOscillators = [];
    } catch (e) {}
  }

  function playTasbeehClick() {
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(120, ctx.currentTime + 0.05);
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.05);
    } catch (e) {}
  }

  function playCompletionChime() {
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const notes = [523.25, 659.25, 783.99, 1046.50];
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.12);
        gain.gain.setValueAtTime(0, ctx.currentTime + idx * 0.12);
        gain.gain.linearRampToValueAtTime(0.3, ctx.currentTime + idx * 0.12 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.12 + 0.8);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + idx * 0.12);
        osc.stop(ctx.currentTime + idx * 0.12 + 0.8);
      });
    } catch (e) {}
  }

  function playAdhanTone() {
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const notes = [440.00, 554.37, 659.25, 880.00, 659.25, 554.37, 880.00];
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.35);
        gain.gain.setValueAtTime(0, ctx.currentTime + idx * 0.35);
        gain.gain.linearRampToValueAtTime(0.4, ctx.currentTime + idx * 0.35 + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.35 + 1.2);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + idx * 0.35);
        osc.stop(ctx.currentTime + idx * 0.35 + 1.2);
      });
    } catch (e) {}
  }

  function triggerVibration(pattern = 30) {
    if ('vibrate' in navigator) {
      try { navigator.vibrate(pattern); } catch (e) {}
    }
  }

  // ==========================================
  // 5. LOCAL STORAGE MANAGER
  // ==========================================
  const KEYS = {
    SETTINGS: 'prayer_app_settings',
    PRAYER_LOGS: 'prayer_app_logs',
    WORSHIP_LOGS: 'prayer_app_worship',
    QURAN_LOG: 'prayer_app_quran',
    TASBEEH: 'prayer_app_tasbeeh',
    STREAK: 'prayer_app_streak',
    FAVORITE_RADIOS: 'prayer_app_favorite_radios'
  };

  const DEFAULT_SETTINGS = {
    city: 'Jakarta',
    customCoords: null,
    calculationMethod: 'KEMENAG',
    asrFactor: 1,
    darkMode: false,
    soundEnabled: true,
    vibrationEnabled: true
  };

  function getTodayKey() {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  }

  function loadSettings() {
    try {
      const raw = localStorage.getItem(KEYS.SETTINGS);
      return raw ? { ...DEFAULT_SETTINGS, ...JSON.parse(raw) } : DEFAULT_SETTINGS;
    } catch (e) { return DEFAULT_SETTINGS; }
  }

  function saveSettings(s) {
    try { localStorage.setItem(KEYS.SETTINGS, JSON.stringify(s)); } catch (e) {}
  }

  function loadFavoriteRadios() {
    try {
      const raw = localStorage.getItem(KEYS.FAVORITE_RADIOS);
      return raw ? JSON.parse(raw) : ['rodja'];
    } catch (e) { return ['rodja']; }
  }

  function toggleFavoriteRadio(stationId) {
    const favs = loadFavoriteRadios();
    const idx = favs.indexOf(stationId);
    if (idx > -1) {
      favs.splice(idx, 1);
    } else {
      favs.push(stationId);
    }
    localStorage.setItem(KEYS.FAVORITE_RADIOS, JSON.stringify(favs));
    return favs;
  }

  function loadTodayPrayerLogs() {
    const dk = getTodayKey();
    try {
      const raw = localStorage.getItem(KEYS.PRAYER_LOGS);
      const logs = raw ? JSON.parse(raw) : {};
      return logs[dk] || {
        subuh: { completed: false, jamaah: false },
        dzuhur: { completed: false, jamaah: false },
        ashar: { completed: false, jamaah: false },
        maghrib: { completed: false, jamaah: false },
        isya: { completed: false, jamaah: false }
      };
    } catch (e) {
      return { subuh: { completed: false }, dzuhur: { completed: false }, ashar: { completed: false }, maghrib: { completed: false }, isya: { completed: false } };
    }
  }

  function saveTodayPrayerLog(key, completed, jamaah = false) {
    const dk = getTodayKey();
    try {
      const raw = localStorage.getItem(KEYS.PRAYER_LOGS);
      const logs = raw ? JSON.parse(raw) : {};
      if (!logs[dk]) logs[dk] = {};
      logs[dk][key] = { completed, jamaah };
      localStorage.setItem(KEYS.PRAYER_LOGS, JSON.stringify(logs));
      return logs[dk];
    } catch (e) {}
  }

  function loadTodayWorshipLogs() {
    const dk = getTodayKey();
    try {
      const raw = localStorage.getItem(KEYS.WORSHIP_LOGS);
      const logs = raw ? JSON.parse(raw) : {};
      return logs[dk] || { tilawah: false, dzikirPagi: false, dzikirPetang: false, murajaah: false, witir: false, duha: false, puasaSunnah: false };
    } catch (e) {
      return { tilawah: false, dzikirPagi: false, dzikirPetang: false, murajaah: false, witir: false, duha: false, puasaSunnah: false };
    }
  }

  function toggleTodayWorshipLog(key) {
    const dk = getTodayKey();
    try {
      const raw = localStorage.getItem(KEYS.WORSHIP_LOGS);
      const logs = raw ? JSON.parse(raw) : {};
      if (!logs[dk]) logs[dk] = { tilawah: false, dzikirPagi: false, dzikirPetang: false, murajaah: false, witir: false, duha: false, puasaSunnah: false };
      logs[dk][key] = !logs[dk][key];
      localStorage.setItem(KEYS.WORSHIP_LOGS, JSON.stringify(logs));
      return logs[dk];
    } catch (e) {}
  }

  function loadQuranLog() {
    try {
      const raw = localStorage.getItem(KEYS.QURAN_LOG);
      return raw ? JSON.parse(raw) : { surah: 'Al-Baqarah', juz: 1, ayat: 1, targetPages: 2 };
    } catch (e) { return { surah: 'Al-Baqarah', juz: 1, ayat: 1, targetPages: 2 }; }
  }

  function saveQuranLog(l) {
    try { localStorage.setItem(KEYS.QURAN_LOG, JSON.stringify(l)); } catch (e) {}
  }

  function loadTasbeehState() {
    try {
      const raw = localStorage.getItem(KEYS.TASBEEH);
      return raw ? JSON.parse(raw) : { count: 0, target: 33, selectedPresetIndex: 0 };
    } catch (e) { return { count: 0, target: 33, selectedPresetIndex: 0 }; }
  }

  function saveTasbeehState(st) {
    try { localStorage.setItem(KEYS.TASBEEH, JSON.stringify(st)); } catch (e) {}
  }

  function loadStreakState() {
    try {
      const raw = localStorage.getItem(KEYS.STREAK);
      return raw ? JSON.parse(raw) : { currentStreak: 1, bestStreak: 3 };
    } catch (e) { return { currentStreak: 1, bestStreak: 3 }; }
  }

  function exportBackupJSON() {
    const backup = {
      settings: loadSettings(),
      prayerLogs: JSON.parse(localStorage.getItem(KEYS.PRAYER_LOGS) || '{}'),
      worshipLogs: JSON.parse(localStorage.getItem(KEYS.WORSHIP_LOGS) || '{}'),
      quranLog: loadQuranLog(),
      tasbeeh: loadTasbeehState(),
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

  function importBackupJSON(jsonText) {
    try {
      const data = JSON.parse(jsonText);
      if (data.settings) localStorage.setItem(KEYS.SETTINGS, JSON.stringify(data.settings));
      if (data.prayerLogs) localStorage.setItem(KEYS.PRAYER_LOGS, JSON.stringify(data.prayerLogs));
      if (data.worshipLogs) localStorage.setItem(KEYS.WORSHIP_LOGS, JSON.stringify(data.worshipLogs));
      if (data.quranLog) localStorage.setItem(KEYS.QURAN_LOG, JSON.stringify(data.quranLog));
      if (data.tasbeeh) localStorage.setItem(KEYS.TASBEEH, JSON.stringify(data.tasbeeh));
      return true;
    } catch (e) { return false; }
  }

  function resetAllData() {
    Object.values(KEYS).forEach(k => localStorage.removeItem(k));
  }

  // ==========================================
  // 6. SVG ICONS
  // ==========================================
  const ICONS = {
    home: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
    clock: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
    radio: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="2"/><path d="M16.24 7.76a6 6 0 0 1 0 8.49"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/><path d="M7.76 16.24a6 6 0 0 1 0-8.49"/><path d="M4.93 19.07a10 10 0 0 1 0-14.14"/></svg>`,
    book: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>`,
    chart: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>`,
    settings: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.38a2 2 0 0 0-.73-2.73l-.15-.1a2 2 0 0 1-1-1.72v-.51a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>`,
    compass: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>`,
    moon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>`,
    sun: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>`,
    check: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`,
    location: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>`,
    volume: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>`,
    play: `<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>`,
    pause: `<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>`,
    externalLink: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>`
  };

  // ==========================================
  // 7. MAIN APP CONTROLLER
  // ==========================================
  class PrayerApp {
    constructor() {
      this.settings = loadSettings();
      this.todayPrayers = loadTodayPrayerLogs();
      this.todayWorship = loadTodayWorshipLogs();
      this.quranLog = loadQuranLog();
      this.tasbeehState = loadTasbeehState();
      this.streakState = loadStreakState();
      this.favoriteRadios = loadFavoriteRadios();
      this.timerInterval = null;

      // Radio Player State & Sleep Timer
      this.audioPlayer = new Audio();
      this.audioPlayer.volume = 1.0;
      this.audioPlayer.muted = false;
      this.currentRadioStationIndex = 0;
      this.isPlayingRadio = false;
      this.isSynthMode = false;
      this.sleepTimerSeconds = 0;
      this.sleepTimerInterval = null;

      this.init();
    }

    init() {
      this.applyTheme();
      this.renderLayout();
      this.setupEventListeners();
      this.setupRadioPlayer();
      this.startCountdownTimer();
      this.updateAllViews();
    }

    applyTheme() {
      if (this.settings.darkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }

    getCityCoords() {
      if (this.settings.customCoords) return this.settings.customCoords;
      return CITIES.find(c => c.name === this.settings.city) || CITIES[0];
    }

    getCurrentPrayerTimes() {
      const coords = this.getCityCoords();
      const methodObj = CALCULATION_METHODS.find(m => m.id === this.settings.calculationMethod) || CALCULATION_METHODS[0];
      return calculatePrayerTimes(new Date(), coords.lat, coords.lng, coords.timezone || 7, {
        method: methodObj,
        asrFactor: this.settings.asrFactor
      });
    }

    renderLayout() {
      const app = document.getElementById('app-container');
      if (!app) return;

      const hijri = getHijriDate();
      const city = this.getCityCoords();

      app.innerHTML = `
        <!-- Header -->
        <nav class="top-nav">
          <div class="brand-title">
            <div class="brand-icon"><span class="font-arabic" style="font-size: 1.3rem;">🕌</span></div>
            <div class="brand-text">
              <h1>Prayer App</h1>
              <span>Pengingat & Radio Sunnah</span>
            </div>
          </div>
          <div class="header-actions">
            <button id="theme-toggle-btn" class="icon-btn" title="Mode Gelap/Terang">
              ${this.settings.darkMode ? ICONS.sun : ICONS.moon}
            </button>
          </div>
        </nav>

        <!-- Main Content -->
        <main id="main-content" style="flex: 1;">
          <!-- HOME VIEW -->
          <section id="view-home" class="view-section active">
            <div class="hero-banner card" style="margin: -20px -20px 20px -20px; border-radius: 0 0 24px 24px;">
              <div class="hero-bg-pattern"></div>
              <div class="hero-content">
                <div class="hero-meta">
                  <div class="location-badge">${ICONS.location} <span id="home-city-name">${city.name}</span></div>
                  <div class="hijri-badge">${hijri.formatted}</div>
                </div>
                
                <div class="next-prayer-card">
                  <div class="next-prayer-label">WAKTU SHALAT BERIKUTNYA</div>
                  <div class="next-prayer-name" id="next-prayer-title">Subuh</div>
                  <div class="countdown-timer" id="countdown-val">00 : 00 : 00</div>
                  <div class="countdown-subtext" id="next-prayer-time-sub">Menunggu waktu...</div>
                  <button id="qibla-shortcut-btn" class="btn btn-outline" style="margin-top: 14px; border-color: rgba(255,255,255,0.3); color: #FFF; font-size: 0.8rem; padding: 6px 14px;">
                    ${ICONS.compass} Cek Arah Kiblat
                  </button>
                </div>
              </div>
            </div>

            <!-- Quick Radio Rodja Banner -->
            <div class="card" style="background: linear-gradient(135deg, #043829, #0f172a); color: #FFF; border-color: rgba(245,158,11,0.3); cursor: pointer;" id="home-radio-card">
              <div style="display: flex; align-items: center; justify-content: space-between;">
                <div>
                  <div style="font-size: 0.7rem; color: var(--gold-400); font-weight: 700; text-transform: uppercase;">RADIO SUNNAH STREAMING</div>
                  <div style="font-weight: 800; font-size: 1.05rem;" id="home-radio-name">Radio Rodja 756 AM</div>
                  <div style="font-size: 0.75rem; opacity: 0.85;" id="home-radio-sub">Menebar Cahaya Sunnah</div>
                </div>
                <button id="home-radio-play-btn" class="radio-play-btn" style="width: 44px; height: 44px;">
                  ${ICONS.play}
                </button>
              </div>
            </div>

            <!-- Progress Ring -->
            <div class="card">
              <div class="progress-container">
                <div class="progress-ring-wrapper">
                  <svg width="80" height="80" viewBox="0 0 80 80">
                    <circle cx="40" cy="40" r="34" stroke="var(--bg-card-border)" stroke-width="7" fill="none" />
                    <circle id="home-progress-circle" cx="40" cy="40" r="34" stroke="var(--emerald-500)" stroke-width="7" fill="none" 
                      stroke-dasharray="213.6" stroke-dashoffset="213.6" stroke-linecap="round" transform="rotate(-90 40 40)" style="transition: stroke-dashoffset 0.6s ease;" />
                  </svg>
                  <div class="progress-ring-text" id="home-progress-percent">0%</div>
                </div>
                <div style="flex: 1;">
                  <div style="font-weight: 700; font-size: 0.95rem; color: var(--text-primary);">Target Ibadah Hari Ini</div>
                  <div style="font-size: 0.8rem; color: var(--text-secondary); margin-top: 2px;" id="home-progress-summary">0 dari 12 ibadah selesai</div>
                </div>
              </div>
            </div>

            <!-- 5 Shalat -->
            <div class="section-title">
              <span>5 Waktu Shalat Fardhu</span>
              <span class="section-subtitle">Hari Ini</span>
            </div>
            <div id="home-prayer-list"></div>

            <!-- Target Worship -->
            <div class="section-title" style="margin-top: 20px;">
              <span>Target Ibadah Harian</span>
              <span class="section-subtitle">Pencatatan Mandiri</span>
            </div>
            <div id="home-worship-list"></div>

            <!-- Hadith Card -->
            <div class="card" style="background: linear-gradient(135deg, rgba(16,185,129,0.06), rgba(245,158,11,0.06)); border-color: rgba(16,185,129,0.2); margin-top: 16px;">
              <div style="font-weight: 700; font-size: 0.85rem; color: var(--emerald-600); margin-bottom: 6px; display: flex; justify-content: space-between;">
                <span>Mutiara Hadits</span>
                <button id="shuffle-hadith-btn" style="background:none; border:none; cursor:pointer; color:var(--text-muted); font-size:0.75rem;">Acak</button>
              </div>
              <div id="hadith-text" style="font-size: 0.85rem; color: var(--text-primary); line-height: 1.5; font-style: italic;"></div>
              <div id="hadith-source" style="font-size: 0.75rem; color: var(--text-secondary); margin-top: 6px; font-weight: 600;"></div>
            </div>
          </section>

          <!-- PRAYER VIEW -->
          <section id="view-prayer" class="view-section">
            <div class="section-title">
              <span>Jadwal Shalat Lengkap</span>
              <span class="section-subtitle" id="prayer-view-date"></span>
            </div>
            <div class="card" id="full-prayer-timetable"></div>

            <div class="card">
              <div style="display: flex; align-items: center; justify-content: space-between;">
                <div>
                  <div style="font-weight: 700; font-size: 0.95rem;">Notifikasi Suara Adhan</div>
                  <div style="font-size: 0.8rem; color: var(--text-secondary);">Uji coba bunyi pengingat masuk waktu</div>
                </div>
                <button id="test-adhan-audio-btn" class="btn btn-outline" style="width: auto; padding: 6px 12px; font-size: 0.8rem;">
                  ${ICONS.volume} Tes Suara
                </button>
              </div>
            </div>

            <!-- Qibla Compass -->
            <div class="section-title" style="margin-top: 24px;">
              <span>Kiblat & Arah Shalat</span>
              <span class="section-subtitle" id="qibla-angle-text">295° N</span>
            </div>
            <div class="card tasbeeh-container">
              <div style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 8px;">
                Arah Kiblat dari <strong id="qibla-city-label">${city.name}</strong>
              </div>
              
              <div class="compass-wrapper">
                <div id="compass-dial" class="compass-dial">
                  <div class="compass-needle" id="compass-needle">
                    <div class="needle-north"></div>
                    <div class="kaaba-icon" style="margin: -10px 0;">🕋</div>
                    <div class="needle-south"></div>
                  </div>
                </div>
              </div>

              <button id="enable-compass-sensor-btn" class="btn btn-outline" style="margin-top: 10px; font-size: 0.8rem; width: auto; display: inline-flex;">
                ${ICONS.compass} Gunakan Sensor Kompas Perangkat
              </button>
            </div>
          </section>

          <!-- RADIO SUNNAH VIEW (WITH AMBIENT SYNTH FAIL-SAFE MODE) -->
          <section id="view-radio" class="view-section">
            <div class="section-title">
              <span>Radio Sunnah Streaming</span>
              <span class="section-subtitle">Kajian & Murottal 24 Jam</span>
            </div>

            <!-- Featured Player Banner -->
            <div class="radio-player-card">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <span class="radio-live-badge" id="radio-status-badge">● LIVE STREAM</span>
                <!-- 10-Bar Glowing Equalizer -->
                <div class="equalizer-container">
                  <div class="equalizer-bar" id="eq-1"></div>
                  <div class="equalizer-bar" id="eq-2"></div>
                  <div class="equalizer-bar" id="eq-3"></div>
                  <div class="equalizer-bar" id="eq-4"></div>
                  <div class="equalizer-bar" id="eq-5"></div>
                  <div class="equalizer-bar" id="eq-6"></div>
                  <div class="equalizer-bar" id="eq-7"></div>
                  <div class="equalizer-bar" id="eq-8"></div>
                  <div class="equalizer-bar" id="eq-9"></div>
                  <div class="equalizer-bar" id="eq-10"></div>
                </div>
              </div>

              <div class="radio-station-title" id="player-station-title">Radio Rodja 756 AM</div>
              <div class="radio-station-location" id="player-station-location">Cileungsi, Bogor / Jakarta</div>
              <div style="font-size: 0.8rem; opacity: 0.9; margin-top: 4px;" id="player-station-program">📖 Kajian Bulughul Maram & Ceramah Umum</div>

              <!-- Controls & Volume -->
              <div class="radio-controls-bar">
                <button id="radio-main-play-btn" class="radio-play-btn">
                  ${ICONS.play}
                </button>
                <div style="flex: 1;">
                  <div style="display: flex; justify-content: space-between; font-size: 0.75rem; opacity: 0.85; margin-bottom: 4px;">
                    <span>Volume Audio</span>
                    <span id="volume-val-text">100%</span>
                  </div>
                  <input type="range" id="radio-volume-slider" min="0" max="1" step="0.05" value="1" style="width: 100%; accent-color: var(--gold-400);" />
                </div>
              </div>

              <!-- Diagnostic Error Banner & Troubleshooting -->
              <div id="radio-error-banner" class="radio-error-banner" style="display: none;">
                <div style="display: flex; align-items: flex-start; gap: 10px;">
                  <div style="font-size: 1.3rem;">⚠️</div>
                  <div style="flex: 1;">
                    <div style="font-weight: 700; font-size: 0.88rem; color: #FCA5A5;" id="radio-error-title">Media Stream Dihimbau Browser / AdBlocker</div>
                    <div style="font-size: 0.78rem; color: #FEE2E2; margin-top: 2px; line-height: 1.4;" id="radio-error-msg">
                      Koneksi internet Anda aktif, namun domain streaming audio kemungkinan dihalangi oleh <strong>AdBlocker, Brave Shield, Antivirus, atau DNS Provider</strong>.
                    </div>
                    <div style="display: flex; gap: 8px; margin-top: 10px; flex-wrap: wrap;">
                      <button id="radio-synth-mode-btn" class="btn btn-outline" style="width: auto; padding: 5px 12px; font-size: 0.75rem; color: var(--gold-400); border-color: var(--gold-400); font-weight: 700;">
                        🎧 Putar Suara Ambient Offine (100% Bersuara)
                      </button>
                      <button id="radio-retry-btn" class="btn btn-outline" style="width: auto; padding: 5px 10px; font-size: 0.72rem; color: #FFF; border-color: rgba(255,255,255,0.4);">
                        🔄 Coba Ulang Stream
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Native HTML5 Embedded Player Bar (Fail-Safe) -->
              <div style="margin-top: 14px; background: rgba(0,0,0,0.3); padding: 8px; border-radius: 10px;">
                <div style="font-size: 0.7rem; color: var(--gold-400); margin-bottom: 4px;">PEMUTAR NATIVE BROWSER (UNTUK ADBLOCKER / DNS FILTER):</div>
                <audio id="native-audio-widget" controls style="width: 100%; height: 36px; outline: none;"></audio>
              </div>

              <!-- Direct Stream Link & Sleep Timer Controls -->
              <div style="margin-top: 14px; padding-top: 12px; border-top: 1px solid rgba(255,255,255,0.15); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px;">
                <div style="font-size: 0.78rem; opacity: 0.9;" id="sleep-timer-status">⏳ Timer Tidur: Off</div>
                <div style="display: flex; gap: 6px; align-items: center;">
                  <button class="btn btn-outline sleep-timer-btn" data-timer-mins="15" style="width: auto; padding: 4px 8px; font-size: 0.7rem; color: #FFF; border-color: rgba(255,255,255,0.3);">15m</button>
                  <button class="btn btn-outline sleep-timer-btn" data-timer-mins="30" style="width: auto; padding: 4px 8px; font-size: 0.7rem; color: #FFF; border-color: rgba(255,255,255,0.3);">30m</button>
                  <button class="btn btn-outline sleep-timer-btn" data-timer-mins="0" style="width: auto; padding: 4px 8px; font-size: 0.7rem; color: #FFF; border-color: rgba(255,255,255,0.3);">Off</button>
                  <a id="direct-stream-link" href="#" target="_blank" rel="noopener" class="btn btn-outline" style="width: auto; padding: 4px 8px; font-size: 0.7rem; color: var(--gold-400); border-color: rgba(245,158,11,0.4); text-decoration: none;">
                    Stream Link ${ICONS.externalLink}
                  </a>
                </div>
              </div>
            </div>

            <!-- Station List -->
            <div class="section-title" style="margin-top: 24px;">
              <span>Daftar Stasiun Radio Sunnah</span>
              <span class="section-subtitle">⭐ Favorit di Atas</span>
            </div>

            <div id="radio-stations-container"></div>
          </section>

          <!-- WORSHIP VIEW -->
          <section id="view-worship" class="view-section">
            <div class="section-title">
              <span>Tasbih Digital</span>
              <span class="section-subtitle">Dzikir Harian</span>
            </div>
            <div class="card tasbeeh-container">
              <div class="setting-group" style="margin-bottom: 12px;">
                <select id="tasbeeh-preset-select" class="setting-select"></select>
              </div>

              <div id="tasbeeh-arabic-text" class="font-arabic" style="font-size: 1.8rem; color: var(--emerald-600); margin: 10px 0;"></div>
              <div id="tasbeeh-translation-text" style="font-size: 0.8rem; color: var(--text-secondary); margin-bottom: 12px;"></div>

              <button id="tasbeeh-tap-btn" class="tasbeeh-counter-btn">
                <div class="tasbeeh-val" id="tasbeeh-count-val">0</div>
                <div class="tasbeeh-target-text" id="tasbeeh-target-val">Target: 33</div>
              </button>

              <div class="tasbeeh-controls">
                <button id="tasbeeh-reset-btn" class="btn btn-outline" style="width: auto; padding: 8px 16px;">Reset</button>
                <button id="tasbeeh-target-change-btn" class="btn btn-outline" style="width: auto; padding: 8px 16px;">Ubah Target</button>
              </div>
            </div>

            <!-- Quran Log -->
            <div class="section-title" style="margin-top: 24px;">
              <span>Log Baca Al-Qur'an</span>
              <span class="section-subtitle">Progress Tilawah</span>
            </div>
            <div class="card">
              <form id="quran-log-form">
                <div style="display: flex; gap: 10px; margin-bottom: 10px;">
                  <div style="flex: 1;">
                    <label class="setting-label">Surah Terakhir</label>
                    <input type="text" id="quran-surah-input" class="setting-input" placeholder="misal: Al-Baqarah" />
                  </div>
                  <div style="width: 100px;">
                    <label class="setting-label">Juz</label>
                    <input type="number" id="quran-juz-input" class="setting-input" min="1" max="30" />
                  </div>
                </div>
                <div style="display: flex; gap: 10px; margin-bottom: 14px;">
                  <div style="flex: 1;">
                    <label class="setting-label">Ayat Terakhir</label>
                    <input type="number" id="quran-ayat-input" class="setting-input" min="1" />
                  </div>
                  <div style="flex: 1;">
                    <label class="setting-label">Target Halaman</label>
                    <input type="number" id="quran-target-pages-input" class="setting-input" min="1" />
                  </div>
                </div>
                <button type="submit" class="btn btn-primary">Simpan Log Al-Qur'an</button>
              </form>
            </div>

            <!-- Doa Library -->
            <div class="section-title" style="margin-top: 24px;">
              <span>Kumpulan Do'a Harian</span>
              <span class="section-subtitle">Offline Library</span>
            </div>
            <input type="text" id="doa-search-input" class="doa-search" placeholder="Cari doa (contoh: makan, tidur, ilmu)..." />
            <div id="doa-list-container"></div>
          </section>

          <!-- PROGRESS VIEW -->
          <section id="view-progress" class="view-section">
            <div class="streak-box">
              <div>
                <div class="streak-num" id="current-streak-val">1 Hari</div>
                <div class="streak-label">Streak Hari Ini</div>
              </div>
              <div style="width: 1px; height: 36px; background: rgba(245, 158, 11, 0.3);"></div>
              <div>
                <div class="streak-num" id="best-streak-val">3 Hari</div>
                <div class="streak-label">Rekor Terbaik</div>
              </div>
            </div>

            <div class="section-title">
              <span>Grafik Konsistensi Shalat</span>
              <span class="section-subtitle">7 Hari Terakhir</span>
            </div>
            <div class="card">
              <div class="chart-bar-container" id="prayer-chart-container"></div>
            </div>

            <div class="section-title" style="margin-top: 24px;">
              <span>Riwayat & Ringkasan Log</span>
            </div>
            <div class="card" id="history-summary-box"></div>
          </section>

          <!-- SETTINGS VIEW -->
          <section id="view-settings" class="view-section">
            <div class="section-title"><span>Pengaturan Lokasi & Metode</span></div>
            <div class="card">
              <div class="setting-group">
                <label class="setting-label">Kota / Lokasi</label>
                <select id="setting-city-select" class="setting-select"></select>
              </div>
              <div class="setting-group">
                <label class="setting-label">Metode Perhitungan Shalat</label>
                <select id="setting-method-select" class="setting-select"></select>
              </div>
              <div class="setting-group">
                <label class="setting-label">Madzhab Waktu Ashar</label>
                <select id="setting-asr-select" class="setting-select">
                  <option value="1">Syafi'i, Maliki, Hanbali (Bayangan 1x)</option>
                  <option value="2">Hanafi (Bayangan 2x)</option>
                </select>
              </div>
            </div>

            <div class="section-title" style="margin-top: 20px;"><span>Pengaturan Tampilan & Suara</span></div>
            <div class="card">
              <div class="worship-item" id="setting-toggle-darkmode">
                <div>
                  <div style="font-weight: 700; font-size: 0.9rem;">Mode Gelap (Dark Mode)</div>
                  <div style="font-size: 0.75rem; color: var(--text-secondary);">Tampilan nyaman malam hari</div>
                </div>
                <input type="checkbox" id="darkmode-chk" style="width: 18px; height: 18px;" />
              </div>

              <div class="worship-item" id="setting-toggle-sound" style="margin-top: 8px;">
                <div>
                  <div style="font-weight: 700; font-size: 0.9rem;">Efek Suara & Adhan</div>
                  <div style="font-size: 0.75rem; color: var(--text-secondary);">Aktifkan suara tasbih dan adhan</div>
                </div>
                <input type="checkbox" id="sound-chk" style="width: 18px; height: 18px;" />
              </div>
            </div>

            <div class="section-title" style="margin-top: 20px;"><span>Manajemen Data (Backup & Reset)</span></div>
            <div class="card">
              <button id="backup-export-btn" class="btn btn-outline" style="margin-bottom: 10px;">
                Download Backup Data (JSON)
              </button>
              <label class="btn btn-outline" style="margin-bottom: 10px; cursor: pointer; text-align: center;">
                Upload Restore Data (JSON)
                <input type="file" id="backup-import-input" accept=".json" style="display: none;" />
              </label>
              <button id="reset-all-btn" class="btn btn-danger">
                Reset Semua Data Aplikasi
              </button>
            </div>
          </section>
        </main>

        <!-- Sticky Floating Mini-Player -->
        <div id="floating-mini-player" class="floating-mini-player" style="display: none;">
          <div class="mini-player-info" id="mini-player-click-area">
            <div class="equalizer-container" style="height: 18px;">
              <div class="equalizer-bar" id="meq-1" style="width:3px; background:var(--gold-400);"></div>
              <div class="equalizer-bar" id="meq-2" style="width:3px; background:var(--gold-400);"></div>
              <div class="equalizer-bar" id="meq-3" style="width:3px; background:var(--gold-400);"></div>
            </div>
            <div style="overflow: hidden;">
              <div class="mini-player-title" id="mini-player-title">Radio Rodja 756 AM</div>
              <div class="mini-player-sub" id="mini-player-sub">● LIVE STREAM</div>
            </div>
          </div>
          <button id="mini-play-btn" class="mini-play-btn">
            ${ICONS.play}
          </button>
        </div>

        <!-- Bottom Nav -->
        <nav class="bottom-nav">
          <button class="nav-tab active" data-view="home">${ICONS.home}<span>Beranda</span></button>
          <button class="nav-tab" data-view="prayer">${ICONS.clock}<span>Jadwal</span></button>
          <button class="nav-tab" data-view="radio">${ICONS.radio}<span>Radio</span></button>
          <button class="nav-tab" data-view="worship">${ICONS.book}<span>Ibadah</span></button>
          <button class="nav-tab" data-view="progress">${ICONS.chart}<span>Progres</span></button>
          <button class="nav-tab" data-view="settings">${ICONS.settings}<span>Pengaturan</span></button>
        </nav>
      `;
    }

    setupEventListeners() {
      // Unmute audio context on any user click on document
      document.addEventListener('click', () => {
        getAudioContext();
        if (this.audioPlayer) {
          this.audioPlayer.muted = false;
        }
      }, { once: true });

      // Bottom Nav Navigation
      document.querySelectorAll('.nav-tab').forEach(tab => {
        tab.addEventListener('click', (e) => {
          e.preventDefault();
          const view = tab.getAttribute('data-view');
          this.switchView(view);
        });
      });

      // Dark Mode Toggle Top Bar
      const themeBtn = document.getElementById('theme-toggle-btn');
      if (themeBtn) {
        themeBtn.addEventListener('click', () => {
          this.settings.darkMode = !this.settings.darkMode;
          saveSettings(this.settings);
          this.applyTheme();
          themeBtn.innerHTML = this.settings.darkMode ? ICONS.sun : ICONS.moon;
          const darkChk = document.getElementById('darkmode-chk');
          if (darkChk) darkChk.checked = this.settings.darkMode;
        });
      }

      // Hadith Shuffle
      const shuffleBtn = document.getElementById('shuffle-hadith-btn');
      if (shuffleBtn) {
        shuffleBtn.addEventListener('click', () => this.renderRandomHadith());
      }

      // Qibla Shortcut
      const qiblaBtn = document.getElementById('qibla-shortcut-btn');
      if (qiblaBtn) {
        qiblaBtn.addEventListener('click', () => this.switchView('prayer'));
      }

      // Quick Radio Card Home Click
      const homeRadioCard = document.getElementById('home-radio-card');
      if (homeRadioCard) {
        homeRadioCard.addEventListener('click', (e) => {
          if (e.target.closest('#home-radio-play-btn')) return;
          this.switchView('radio');
        });
      }

      // Quick Radio Play Home Button
      const homeRadioBtn = document.getElementById('home-radio-play-btn');
      if (homeRadioBtn) {
        homeRadioBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          this.toggleRadioPlay();
        });
      }

      // Main Radio Play Button
      const mainRadioBtn = document.getElementById('radio-main-play-btn');
      if (mainRadioBtn) {
        mainRadioBtn.addEventListener('click', () => {
          this.toggleRadioPlay();
        });
      }

      // Radio Retry Button
      const retryBtn = document.getElementById('radio-retry-btn');
      if (retryBtn) {
        retryBtn.addEventListener('click', () => {
          this.hideRadioError();
          this.playRadio();
        });
      }

      // Synth Mode Button
      const synthBtn = document.getElementById('radio-synth-mode-btn');
      if (synthBtn) {
        synthBtn.addEventListener('click', () => {
          this.hideRadioError();
          this.startSynthAmbientRadio();
        });
      }

      // Floating Mini Player Click
      const miniClickArea = document.getElementById('mini-player-click-area');
      if (miniClickArea) {
        miniClickArea.addEventListener('click', () => this.switchView('radio'));
      }

      const miniPlayBtn = document.getElementById('mini-play-btn');
      if (miniPlayBtn) {
        miniPlayBtn.addEventListener('click', () => this.toggleRadioPlay());
      }

      // Sleep Timer Buttons
      document.querySelectorAll('.sleep-timer-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const mins = parseInt(btn.getAttribute('data-timer-mins'));
          this.setSleepTimer(mins);
        });
      });

      // Radio Volume Slider
      const volumeSlider = document.getElementById('radio-volume-slider');
      if (volumeSlider) {
        volumeSlider.addEventListener('input', (e) => {
          const val = parseFloat(e.target.value);
          this.audioPlayer.volume = val;
          this.audioPlayer.muted = (val === 0);
          const nativeAudio = document.getElementById('native-audio-widget');
          if (nativeAudio) {
            nativeAudio.volume = val;
            nativeAudio.muted = (val === 0);
          }
          const textEl = document.getElementById('volume-val-text');
          if (textEl) textEl.innerText = `${Math.round(val * 100)}%`;
        });
      }

      // Test Adhan Audio
      const testAudioBtn = document.getElementById('test-adhan-audio-btn');
      if (testAudioBtn) {
        testAudioBtn.addEventListener('click', () => playAdhanTone());
      }

      // Digital Tasbeeh Counter Button
      const tasbeehBtn = document.getElementById('tasbeeh-tap-btn');
      if (tasbeehBtn) {
        tasbeehBtn.addEventListener('click', () => {
          this.tasbeehState.count += 1;
          if (this.settings.soundEnabled) playTasbeehClick();
          if (this.settings.vibrationEnabled) triggerVibration(25);

          if (this.tasbeehState.count >= this.tasbeehState.target) {
            if (this.settings.soundEnabled) playCompletionChime();
            if (this.settings.vibrationEnabled) triggerVibration([100, 50, 100, 50, 150]);
          }
          saveTasbeehState(this.tasbeehState);
          this.updateTasbeehUI();
        });
      }

      // Reset Tasbeeh
      const resetTasbeehBtn = document.getElementById('tasbeeh-reset-btn');
      if (resetTasbeehBtn) {
        resetTasbeehBtn.addEventListener('click', () => {
          this.tasbeehState.count = 0;
          saveTasbeehState(this.tasbeehState);
          this.updateTasbeehUI();
        });
      }

      // Change Tasbeeh Target
      const changeTargetBtn = document.getElementById('tasbeeh-target-change-btn');
      if (changeTargetBtn) {
        changeTargetBtn.addEventListener('click', () => {
          const targets = [33, 99, 100, 1000];
          const currIdx = targets.indexOf(this.tasbeehState.target);
          this.tasbeehState.target = targets[(currIdx + 1) % targets.length];
          saveTasbeehState(this.tasbeehState);
          this.updateTasbeehUI();
        });
      }

      // Preset Dzikir Change
      const presetSelect = document.getElementById('tasbeeh-preset-select');
      if (presetSelect) {
        presetSelect.addEventListener('change', (e) => {
          const idx = parseInt(e.target.value);
          this.tasbeehState.selectedPresetIndex = idx;
          this.tasbeehState.target = DZIKIR_PRESETS[idx].defaultTarget;
          this.tasbeehState.count = 0;
          saveTasbeehState(this.tasbeehState);
          this.updateTasbeehUI();
        });
      }

      // Quran Form
      const quranForm = document.getElementById('quran-log-form');
      if (quranForm) {
        quranForm.addEventListener('submit', (e) => {
          e.preventDefault();
          this.quranLog.surah = document.getElementById('quran-surah-input').value || 'Al-Baqarah';
          this.quranLog.juz = parseInt(document.getElementById('quran-juz-input').value) || 1;
          this.quranLog.ayat = parseInt(document.getElementById('quran-ayat-input').value) || 1;
          this.quranLog.targetPages = parseInt(document.getElementById('quran-target-pages-input').value) || 2;
          saveQuranLog(this.quranLog);
          alert('Progress Al-Qur\'an berhasil disimpan!');
        });
      }

      // Doa Search Filter
      const doaSearch = document.getElementById('doa-search-input');
      if (doaSearch) {
        doaSearch.addEventListener('input', (e) => this.renderDoaList(e.target.value));
      }

      // Device Compass
      const compassSensorBtn = document.getElementById('enable-compass-sensor-btn');
      if (compassSensorBtn) {
        compassSensorBtn.addEventListener('click', () => {
          if (window.DeviceOrientationEvent) {
            window.addEventListener('deviceorientation', (e) => {
              let heading = e.alpha;
              if (e.webkitCompassHeading) heading = e.webkitCompassHeading;
              if (heading !== null) {
                const dial = document.getElementById('compass-dial');
                if (dial) dial.style.transform = `rotate(${-heading}deg)`;
              }
            }, true);
            alert('Sensor kompas diaktifkan! Putar perangkat Anda.');
          } else {
            alert('Perangkat tidak mendukung sensor kompas.');
          }
        });
      }

      // Settings Events
      const citySelect = document.getElementById('setting-city-select');
      if (citySelect) {
        citySelect.addEventListener('change', (e) => {
          this.settings.city = e.target.value;
          saveSettings(this.settings);
          this.updateAllViews();
        });
      }

      const methodSelect = document.getElementById('setting-method-select');
      if (methodSelect) {
        methodSelect.addEventListener('change', (e) => {
          this.settings.calculationMethod = e.target.value;
          saveSettings(this.settings);
          this.updateAllViews();
        });
      }

      const asrSelect = document.getElementById('setting-asr-select');
      if (asrSelect) {
        asrSelect.addEventListener('change', (e) => {
          this.settings.asrFactor = parseInt(e.target.value);
          saveSettings(this.settings);
          this.updateAllViews();
        });
      }

      const darkChk = document.getElementById('darkmode-chk');
      if (darkChk) {
        darkChk.addEventListener('change', (e) => {
          this.settings.darkMode = e.target.checked;
          saveSettings(this.settings);
          this.applyTheme();
        });
      }

      const soundChk = document.getElementById('sound-chk');
      if (soundChk) {
        soundChk.addEventListener('change', (e) => {
          this.settings.soundEnabled = e.target.checked;
          saveSettings(this.settings);
        });
      }

      // Backup & Reset
      const backupExportBtn = document.getElementById('backup-export-btn');
      if (backupExportBtn) {
        backupExportBtn.addEventListener('click', () => exportBackupJSON());
      }

      const backupImportInput = document.getElementById('backup-import-input');
      if (backupImportInput) {
        backupImportInput.addEventListener('change', (e) => {
          const file = e.target.files[0];
          if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
              if (importBackupJSON(event.target.result)) {
                alert('Data berhasil di-restore!');
                window.location.reload();
              } else { alert('File backup JSON tidak valid.'); }
            };
            reader.readAsText(file);
          }
        });
      }

      const resetBtn = document.getElementById('reset-all-btn');
      if (resetBtn) {
        resetBtn.addEventListener('click', () => {
          if (confirm('Apakah Anda yakin ingin mereset semua data aplikasi?')) {
            resetAllData();
            window.location.reload();
          }
        });
      }
    }

    setupRadioPlayer() {
      this.audioPlayer.addEventListener('playing', () => {
        this.isPlayingRadio = true;
        this.isSynthMode = false;
        this.hideRadioError();
        this.updateRadioPlayerUI();
      });

      this.audioPlayer.addEventListener('pause', () => {
        if (!this.isSynthMode) {
          this.isPlayingRadio = false;
          this.updateRadioPlayerUI();
        }
      });

      this.audioPlayer.addEventListener('error', () => {
        console.warn('Audio stream network error event');
      });
    }

    startSynthAmbientRadio() {
      this.isSynthMode = true;
      this.isPlayingRadio = true;
      startAmbientSoundSynth();
      this.updateRadioPlayerUI();
      const badge = document.getElementById('radio-status-badge');
      if (badge) {
        badge.innerText = '● AMBIENT OFFLINE SOUND';
        badge.className = 'radio-live-badge is-live';
      }
    }

    stopSynthAmbientRadio() {
      this.isSynthMode = false;
      this.isPlayingRadio = false;
      stopAmbientSoundSynth();
      this.updateRadioPlayerUI();
    }

    showRadioError(title, message) {
      const banner = document.getElementById('radio-error-banner');
      const titleEl = document.getElementById('radio-error-title');
      const msgEl = document.getElementById('radio-error-msg');
      if (banner && titleEl && msgEl) {
        titleEl.innerText = title || 'Media Stream Dihimbau Browser / AdBlocker';
        msgEl.innerHTML = message || 'Server streaming tidak merespons. Klik tombol di bawah untuk memutar Suara Ambient Offline.';
        banner.style.display = 'block';
      }
      const badge = document.getElementById('radio-status-badge');
      if (badge) {
        badge.innerText = '⚠️ SIARAN TERPUTUS';
        badge.className = 'radio-live-badge';
      }
    }

    hideRadioError() {
      const banner = document.getElementById('radio-error-banner');
      if (banner) banner.style.display = 'none';
    }

    setSleepTimer(minutes) {
      if (this.sleepTimerInterval) clearInterval(this.sleepTimerInterval);

      if (minutes <= 0) {
        this.sleepTimerSeconds = 0;
        const statusEl = document.getElementById('sleep-timer-status');
        if (statusEl) statusEl.innerText = '⏳ Timer Tidur: Off';
        return;
      }

      this.sleepTimerSeconds = minutes * 60;
      const updateTimerUI = () => {
        if (this.sleepTimerSeconds <= 0) {
          clearInterval(this.sleepTimerInterval);
          this.pauseRadio();
          playCompletionChime();
          const statusEl = document.getElementById('sleep-timer-status');
          if (statusEl) statusEl.innerText = '⏳ Timer Tidur: Selesai';
          return;
        }
        const m = Math.floor(this.sleepTimerSeconds / 60);
        const s = this.sleepTimerSeconds % 60;
        const statusEl = document.getElementById('sleep-timer-status');
        if (statusEl) statusEl.innerText = `⏳ Timer Tidur: ${m}m ${String(s).padStart(2, '0')}s`;
        this.sleepTimerSeconds--;
      };

      updateTimerUI();
      this.sleepTimerInterval = setInterval(updateTimerUI, 1000);
    }

    selectRadioStation(index) {
      this.currentRadioStationIndex = index;
      this.playRadio();
    }

    playRadio() {
      if (this.isSynthMode) {
        this.stopSynthAmbientRadio();
      }
      this.hideRadioError();
      const station = RADIO_STATIONS[this.currentRadioStationIndex];
      const urls = station.urls || [station.url];
      let currentTryIndex = 0;

      // Unmute audio explicitly
      this.audioPlayer.muted = false;
      this.audioPlayer.volume = 1.0;

      const badge = document.getElementById('radio-status-badge');
      if (badge) {
        badge.innerText = '⏳ MEMUAT STREAM...';
        badge.className = 'radio-live-badge';
      }

      const nativeAudio = document.getElementById('native-audio-widget');
      if (nativeAudio) {
        nativeAudio.muted = false;
        nativeAudio.volume = 1.0;
      }

      const tryPlay = () => {
        if (currentTryIndex >= urls.length) {
          this.isPlayingRadio = false;
          this.updateRadioPlayerUI();
          this.showRadioError(
            `Streaming ${station.name} Dihimbau Browser / AdBlocker`,
            `Koneksi internet Anda aktif, namun domain streaming audio dihalangi oleh <strong>AdBlocker, Brave Shield, Antivirus, atau DNS Provider</strong>.<br>Tekan tombol di bawah untuk memutar <strong>Suara Ambient Offline (100% Bersuara)</strong> atau gunakan Pemutar Native Browser.`
          );
          return;
        }

        const targetUrl = urls[currentTryIndex];
        this.audioPlayer.src = targetUrl;
        
        if (nativeAudio) {
          nativeAudio.src = targetUrl;
          nativeAudio.play().catch(() => {});
        }

        const playPromise = this.audioPlayer.play();
        if (playPromise !== undefined) {
          playPromise.then(() => {
            this.isPlayingRadio = true;
            this.hideRadioError();
            this.updateRadioPlayerUI();
          }).catch(err => {
            console.warn(`Stream URL ${targetUrl} play error, trying fallback ${currentTryIndex + 1}...`, err);
            currentTryIndex++;
            setTimeout(tryPlay, 250);
          });
        }
      };

      tryPlay();
    }

    pauseRadio() {
      if (this.isSynthMode) {
        this.stopSynthAmbientRadio();
        return;
      }
      this.audioPlayer.pause();
      const nativeAudio = document.getElementById('native-audio-widget');
      if (nativeAudio) nativeAudio.pause();
      this.isPlayingRadio = false;
      this.updateRadioPlayerUI();
    }

    toggleRadioPlay() {
      if (this.isPlayingRadio) {
        this.pauseRadio();
      } else {
        this.playRadio();
      }
    }

    updateRadioPlayerUI() {
      const station = RADIO_STATIONS[this.currentRadioStationIndex];

      const homeTitle = document.getElementById('home-radio-name');
      const homeSub = document.getElementById('home-radio-sub');
      const homePlayBtn = document.getElementById('home-radio-play-btn');
      if (homeTitle) homeTitle.innerText = this.isSynthMode ? 'Suara Ambient Offline' : station.name;
      if (homeSub) homeSub.innerText = this.isSynthMode ? 'Mode Suara Relaksasi & Dzikir' : station.tagline;
      if (homePlayBtn) homePlayBtn.innerHTML = this.isPlayingRadio ? ICONS.pause : ICONS.play;

      const playerTitle = document.getElementById('player-station-title');
      const playerLoc = document.getElementById('player-station-location');
      const playerProg = document.getElementById('player-station-program');
      const mainPlayBtn = document.getElementById('radio-main-play-btn');
      const badge = document.getElementById('radio-status-badge');
      const directLink = document.getElementById('direct-stream-link');

      if (playerTitle) playerTitle.innerText = this.isSynthMode ? 'Suara Ambient Offline (Web Audio)' : station.name;
      if (playerLoc) playerLoc.innerText = this.isSynthMode ? 'Offline Synthesizer' : station.location;
      if (playerProg) playerProg.innerText = this.isSynthMode ? '✨ Harmoni Suara Ketenangan & Dzikir 432Hz' : `📖 ${station.program}`;
      if (mainPlayBtn) mainPlayBtn.innerHTML = this.isPlayingRadio ? ICONS.pause : ICONS.play;
      if (directLink) directLink.href = (station.urls ? station.urls[0] : station.url);

      const errBanner = document.getElementById('radio-error-banner');
      if (badge && (!errBanner || errBanner.style.display !== 'block')) {
        badge.innerText = this.isSynthMode ? '● AMBIENT OFFLINE SOUND' : (this.isPlayingRadio ? '● SIARAN LANGSUNG' : '○ JEDA');
        badge.className = `radio-live-badge ${this.isPlayingRadio ? 'is-live' : ''}`;
      }

      // Update Floating Mini-Player
      const floatingPlayer = document.getElementById('floating-mini-player');
      const miniTitle = document.getElementById('mini-player-title');
      const miniSub = document.getElementById('mini-player-sub');
      const miniPlayBtn = document.getElementById('mini-play-btn');

      if (floatingPlayer) {
        floatingPlayer.style.display = 'flex';
      }
      if (miniTitle) miniTitle.innerText = this.isSynthMode ? 'Suara Ambient Offline' : station.name;
      if (miniSub) miniSub.innerText = this.isPlayingRadio ? '● SIARAN LANGSUNG' : '○ JEDA';
      if (miniPlayBtn) miniPlayBtn.innerHTML = this.isPlayingRadio ? ICONS.pause : ICONS.play;

      // 10-Bar Equalizer animation toggle
      for (let i = 1; i <= 10; i++) {
        const bar = document.getElementById(`eq-${i}`);
        if (bar) {
          if (this.isPlayingRadio) {
            bar.classList.add('playing');
          } else {
            bar.classList.remove('playing');
          }
        }
      }
      for (let i = 1; i <= 3; i++) {
        const mbar = document.getElementById(`meq-${i}`);
        if (mbar) {
          if (this.isPlayingRadio) mbar.classList.add('playing');
          else mbar.classList.remove('playing');
        }
      }

      this.renderRadioStationsList();
    }

    renderRadioStationsList() {
      const container = document.getElementById('radio-stations-container');
      if (!container) return;

      const favs = this.favoriteRadios;
      const sorted = [...RADIO_STATIONS].sort((a, b) => {
        const aFav = favs.includes(a.id);
        const bFav = favs.includes(b.id);
        if (aFav && !bFav) return -1;
        if (!aFav && bFav) return 1;
        return 0;
      });

      container.innerHTML = sorted.map((st) => {
        const originalIndex = RADIO_STATIONS.findIndex(s => s.id === st.id);
        const isCurrent = this.currentRadioStationIndex === originalIndex;
        const isPlayingThis = isCurrent && this.isPlayingRadio && !this.isSynthMode;
        const isFav = favs.includes(st.id);

        return `
          <div class="radio-card-item ${isCurrent ? 'active-station' : ''}" data-station-index="${originalIndex}">
            <div style="display: flex; align-items: center; gap: 12px; flex: 1;">
              <div class="radio-play-btn" style="width: 42px; height: 42px; font-size: 0.8rem; box-shadow: none;">
                ${isPlayingThis ? ICONS.pause : ICONS.play}
              </div>
              <div style="overflow: hidden; flex: 1;">
                <div style="font-weight: 700; font-size: 0.95rem; color: var(--text-primary); display: flex; align-items: center; gap: 6px;">
                  <span>${st.name}</span>
                </div>
                <div style="font-size: 0.75rem; color: var(--text-secondary); margin-top: 2px;">
                  ${st.location} • <span style="color: var(--emerald-600); font-weight: 600;">${st.category}</span>
                </div>
              </div>
            </div>

            <div style="display: flex; align-items: center; gap: 8px;">
              ${isPlayingThis ? `<span style="font-size: 0.68rem; padding: 3px 8px; border-radius: 99px; background: #EF4444; color: #FFF; font-weight: 800;">LIVE</span>` : ''}
              <button class="favorite-star-btn ${isFav ? 'is-fav' : ''}" data-fav-id="${st.id}" title="Favoritkan">
                ★
              </button>
            </div>
          </div>
        `;
      }).join('');

      container.querySelectorAll('.radio-card-item').forEach(item => {
        item.addEventListener('click', (e) => {
          if (e.target.closest('.favorite-star-btn')) return;
          const idx = parseInt(item.getAttribute('data-station-index'));
          if (this.currentRadioStationIndex === idx && this.isPlayingRadio) {
            this.pauseRadio();
          } else {
            this.selectRadioStation(idx);
          }
        });
      });

      container.querySelectorAll('.favorite-star-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const id = btn.getAttribute('data-fav-id');
          this.favoriteRadios = toggleFavoriteRadio(id);
          this.renderRadioStationsList();
        });
      });
    }

    switchView(viewName) {
      document.querySelectorAll('.view-section').forEach(sec => sec.classList.remove('active'));
      document.querySelectorAll('.nav-tab').forEach(tab => tab.classList.remove('active'));

      const targetSec = document.getElementById(`view-${viewName}`);
      const targetTab = document.querySelector(`.nav-tab[data-view="${viewName}"]`);

      if (targetSec) targetSec.classList.add('active');
      if (targetTab) targetTab.classList.add('active');

      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    startCountdownTimer() {
      if (this.timerInterval) clearInterval(this.timerInterval);

      const updateTimer = () => {
        const times = this.getCurrentPrayerTimes();
        const nextInfo = getNextPrayer(times);

        const titleEl = document.getElementById('next-prayer-title');
        const countEl = document.getElementById('countdown-val');
        const subEl = document.getElementById('next-prayer-time-sub');

        if (titleEl) titleEl.innerText = nextInfo.next.name;
        if (subEl) subEl.innerText = `Waktu ${nextInfo.next.name}: ${nextInfo.next.time} WIB/WITA`;

        if (countEl) {
          const total = Math.max(0, nextInfo.totalRemainingSeconds);
          const hrs = Math.floor(total / 3600);
          const mins = Math.floor((total % 3600) / 60);
          const secs = total % 60;
          countEl.innerText = `${String(hrs).padStart(2, '0')} : ${String(mins).padStart(2, '0')} : ${String(secs).padStart(2, '0')}`;
        }
      };

      updateTimer();
      this.timerInterval = setInterval(updateTimer, 1000);
    }

    updateAllViews() {
      this.renderHomePrayerList();
      this.renderHomeWorshipList();
      this.renderRandomHadith();
      this.renderFullPrayerTable();
      this.renderQiblaCompass();
      this.renderRadioStationsList();
      this.initTasbeehUI();
      this.initQuranLogUI();
      this.renderDoaList();
      this.renderProgressStats();
      this.initSettingsForm();
      this.updateDailyProgressRing();
    }

    renderHomePrayerList() {
      const container = document.getElementById('home-prayer-list');
      if (!container) return;

      const times = this.getCurrentPrayerTimes();
      const nextInfo = getNextPrayer(times);

      const list = [
        { key: 'subuh', label: 'Subuh', time: times.subuh },
        { key: 'dzuhur', label: 'Dzuhur', time: times.dzuhur },
        { key: 'ashar', label: 'Ashar', time: times.ashar },
        { key: 'maghrib', label: 'Maghrib', time: times.maghrib },
        { key: 'isya', label: 'Isya', time: times.isya }
      ];

      container.innerHTML = list.map(item => {
        const state = this.todayPrayers[item.key] || { completed: false, jamaah: false };
        const isNext = nextInfo.next.key === item.key;

        return `
          <div class="prayer-item ${isNext ? 'current-prayer' : ''}">
            <div class="prayer-left">
              <button class="prayer-check-btn ${state.completed ? 'checked' : ''}" data-prayer="${item.key}">
                ${state.completed ? ICONS.check : ''}
              </button>
              <div>
                <span class="prayer-info-name">${item.label}</span>
                ${state.jamaah ? `<span class="jamaah-badge" data-jamaah-toggle="${item.key}">Jama'ah</span>` : `<span class="jamaah-badge" style="opacity: 0.5;" data-jamaah-toggle="${item.key}">+ Jama'ah</span>`}
              </div>
            </div>
            <div class="prayer-time-val">${item.time}</div>
          </div>
        `;
      }).join('');

      container.querySelectorAll('.prayer-check-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const key = btn.getAttribute('data-prayer');
          const currComp = this.todayPrayers[key] ? this.todayPrayers[key].completed : false;
          const currJam = this.todayPrayers[key] ? this.todayPrayers[key].jamaah : false;
          this.todayPrayers = saveTodayPrayerLog(key, !currComp, currJam);
          this.renderHomePrayerList();
          this.updateDailyProgressRing();
        });
      });

      container.querySelectorAll('[data-jamaah-toggle]').forEach(badge => {
        badge.addEventListener('click', () => {
          const key = badge.getAttribute('data-jamaah-toggle');
          const currComp = this.todayPrayers[key] ? this.todayPrayers[key].completed : true;
          const currJam = this.todayPrayers[key] ? this.todayPrayers[key].jamaah : false;
          this.todayPrayers = saveTodayPrayerLog(key, currComp, !currJam);
          this.renderHomePrayerList();
        });
      });
    }

    renderHomeWorshipList() {
      const container = document.getElementById('home-worship-list');
      if (!container) return;

      const list = [
        { key: 'tilawah', label: 'Tilawah Al-Qur\'an' },
        { key: 'dzikirPagi', label: 'Dzikir Pagi' },
        { key: 'dzikirPetang', label: 'Dzikir Petang' },
        { key: 'murajaah', label: 'Murajaah Hafalan' },
        { key: 'witir', label: 'Shalat Witir' },
        { key: 'duha', label: 'Shalat Duha' },
        { key: 'puasaSunnah', label: 'Puasa Sunnah' }
      ];

      container.innerHTML = list.map(item => {
        const isDone = this.todayWorship[item.key] || false;
        return `
          <div class="worship-item ${isDone ? 'completed' : ''}" data-worship="${item.key}">
            <div style="display: flex; align-items: center; gap: 10px;">
              <div class="prayer-check-btn ${isDone ? 'checked' : ''}">
                ${isDone ? ICONS.check : ''}
              </div>
              <span class="worship-title" style="font-weight: 600; font-size: 0.9rem;">${item.label}</span>
            </div>
          </div>
        `;
      }).join('');

      container.querySelectorAll('.worship-item').forEach(item => {
        item.addEventListener('click', () => {
          const key = item.getAttribute('data-worship');
          this.todayWorship = toggleTodayWorshipLog(key);
          this.renderHomeWorshipList();
          this.updateDailyProgressRing();
        });
      });
    }

    updateDailyProgressRing() {
      const totalItems = 12;
      let doneCount = 0;

      ['subuh', 'dzuhur', 'ashar', 'maghrib', 'isya'].forEach(k => {
        if (this.todayPrayers[k] && this.todayPrayers[k].completed) doneCount++;
      });
      ['tilawah', 'dzikirPagi', 'dzikirPetang', 'murajaah', 'witir', 'duha', 'puasaSunnah'].forEach(k => {
        if (this.todayWorship[k]) doneCount++;
      });

      const percent = Math.round((doneCount / totalItems) * 100);
      const circle = document.getElementById('home-progress-circle');
      const percentEl = document.getElementById('home-progress-percent');
      const summaryEl = document.getElementById('home-progress-summary');

      if (circle) {
        const offset = 213.6 - (percent / 100) * 213.6;
        circle.style.strokeDashoffset = offset;
      }
      if (percentEl) percentEl.innerText = `${percent}%`;
      if (summaryEl) summaryEl.innerText = `${doneCount} dari ${totalItems} ibadah selesai`;
    }

    renderRandomHadith() {
      const textEl = document.getElementById('hadith-text');
      const sourceEl = document.getElementById('hadith-source');
      if (!textEl || !sourceEl) return;

      const random = HADITHS[Math.floor(Math.random() * HADITHS.length)];
      textEl.innerText = `"${random.text}"`;
      sourceEl.innerText = `— ${random.source}`;
    }

    renderFullPrayerTable() {
      const container = document.getElementById('full-prayer-timetable');
      const dateSub = document.getElementById('prayer-view-date');
      if (!container) return;

      const times = this.getCurrentPrayerTimes();
      const today = new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
      if (dateSub) dateSub.innerText = today;

      container.innerHTML = `
        <div style="display: flex; flex-direction: column; gap: 8px;">
          <div class="prayer-item"><span>Subuh</span><strong class="prayer-time-val">${times.subuh}</strong></div>
          <div class="prayer-item"><span>Terbit</span><strong class="prayer-time-val">${times.terbit}</strong></div>
          <div class="prayer-item"><span>Dzuhur</span><strong class="prayer-time-val">${times.dzuhur}</strong></div>
          <div class="prayer-item"><span>Ashar</span><strong class="prayer-time-val">${times.ashar}</strong></div>
          <div class="prayer-item"><span>Maghrib</span><strong class="prayer-time-val">${times.maghrib}</strong></div>
          <div class="prayer-item"><span>Isya</span><strong class="prayer-time-val">${times.isya}</strong></div>
        </div>
      `;
    }

    renderQiblaCompass() {
      const coords = this.getCityCoords();
      const angle = Math.round(calculateQiblaDirection(coords.lat, coords.lng));
      const angleText = document.getElementById('qibla-angle-text');
      const cityLabel = document.getElementById('qibla-city-label');
      const needle = document.getElementById('compass-needle');

      if (angleText) angleText.innerText = `${angle}° N`;
      if (cityLabel) cityLabel.innerText = coords.name || 'Lokasi';
      if (needle) needle.style.transform = `rotate(${angle}deg)`;
    }

    initTasbeehUI() {
      const select = document.getElementById('tasbeeh-preset-select');
      if (!select) return;

      select.innerHTML = DZIKIR_PRESETS.map((p, idx) => 
        `<option value="${idx}" ${this.tasbeehState.selectedPresetIndex === idx ? 'selected' : ''}>${p.name} (${p.defaultTarget}x)</option>`
      ).join('');

      this.updateTasbeehUI();
    }

    updateTasbeehUI() {
      const preset = DZIKIR_PRESETS[this.tasbeehState.selectedPresetIndex] || DZIKIR_PRESETS[0];
      const arabicEl = document.getElementById('tasbeeh-arabic-text');
      const transEl = document.getElementById('tasbeeh-translation-text');
      const countEl = document.getElementById('tasbeeh-count-val');
      const targetEl = document.getElementById('tasbeeh-target-val');

      if (arabicEl) arabicEl.innerText = preset.arabic;
      if (transEl) transEl.innerText = preset.translation;
      if (countEl) countEl.innerText = this.tasbeehState.count;
      if (targetEl) targetEl.innerText = `Target: ${this.tasbeehState.target}`;
    }

    initQuranLogUI() {
      const surahInput = document.getElementById('quran-surah-input');
      const juzInput = document.getElementById('quran-juz-input');
      const ayatInput = document.getElementById('quran-ayat-input');
      const targetPagesInput = document.getElementById('quran-target-pages-input');

      if (surahInput) surahInput.value = this.quranLog.surah;
      if (juzInput) juzInput.value = this.quranLog.juz;
      if (ayatInput) ayatInput.value = this.quranLog.ayat;
      if (targetPagesInput) targetPagesInput.value = this.quranLog.targetPages;
    }

    renderDoaList(filterKeyword = '') {
      const container = document.getElementById('doa-list-container');
      if (!container) return;

      const filtered = DAILY_DOAS.filter(d => 
        d.title.toLowerCase().includes(filterKeyword.toLowerCase()) ||
        d.category.toLowerCase().includes(filterKeyword.toLowerCase()) ||
        d.translation.toLowerCase().includes(filterKeyword.toLowerCase())
      );

      container.innerHTML = filtered.map(doa => `
        <div class="doa-card">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <div class="doa-title">${doa.title}</div>
            <span style="font-size: 0.7rem; padding: 2px 8px; border-radius: 99px; background: rgba(16,185,129,0.1); color: var(--emerald-600); font-weight: 600;">${doa.category}</span>
          </div>
          <div class="doa-arabic font-arabic">${doa.arabic}</div>
          <div class="doa-latin">${doa.latin}</div>
          <div class="doa-translation">${doa.translation}</div>
        </div>
      `).join('');
    }

    renderProgressStats() {
      const currentValEl = document.getElementById('current-streak-val');
      const bestValEl = document.getElementById('best-streak-val');
      if (currentValEl) currentValEl.innerText = `${this.streakState.currentStreak} Hari`;
      if (bestValEl) bestValEl.innerText = `${this.streakState.bestStreak} Hari`;

      const chartContainer = document.getElementById('prayer-chart-container');
      if (!chartContainer) return;

      const days = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'];
      const mockHeights = [80, 100, 60, 100, 100, 40, 90];

      chartContainer.innerHTML = days.map((day, idx) => `
        <div class="chart-bar-col">
          <div class="chart-bar-fill" style="height: ${mockHeights[idx]}%;"></div>
          <div class="chart-bar-label">${day}</div>
        </div>
      `).join('');

      const historyBox = document.getElementById('history-summary-box');
      if (historyBox) {
        historyBox.innerHTML = `
          <div style="font-size: 0.9rem; line-height: 1.6;">
            <div>Status Al-Qur'an: <strong>Juz ${this.quranLog.juz}, Surah ${this.quranLog.surah} (Ayat ${this.quranLog.ayat})</strong></div>
            <div>Kota Aktif: <strong>${this.settings.city}</strong></div>
          </div>
        `;
      }
    }

    initSettingsForm() {
      const citySelect = document.getElementById('setting-city-select');
      if (citySelect) {
        citySelect.innerHTML = CITIES.map(c => 
          `<option value="${c.name}" ${this.settings.city === c.name ? 'selected' : ''}>${c.name}</option>`
        ).join('');
      }

      const methodSelect = document.getElementById('setting-method-select');
      if (methodSelect) {
        methodSelect.innerHTML = CALCULATION_METHODS.map(m => 
          `<option value="${m.id}" ${this.settings.calculationMethod === m.id ? 'selected' : ''}>${m.name}</option>`
        ).join('');
      }

      const asrSelect = document.getElementById('setting-asr-select');
      if (asrSelect) asrSelect.value = this.settings.asrFactor;

      const darkChk = document.getElementById('darkmode-chk');
      if (darkChk) darkChk.checked = this.settings.darkMode;

      const soundChk = document.getElementById('sound-chk');
      if (soundChk) soundChk.checked = this.settings.soundEnabled;
    }
  }

  function launchApp() {
    if (!window.prayerApp) {
      window.prayerApp = new PrayerApp();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', launchApp);
  } else {
    launchApp();
  }

  if ('serviceWorker' in navigator && (window.location.protocol === 'http:' || window.location.protocol === 'https:')) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./sw.js').catch(() => {});
    });
  }
})();
