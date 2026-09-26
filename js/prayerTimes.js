// Prayer App - Astronomical Prayer Time Calculation & Hijri Calendar Engine

function degToRad(deg) { return (deg * Math.PI) / 180.0; }
function radToDeg(rad) { return (rad * 180.0) / Math.PI; }
function fixAngle(angle) {
  let a = angle % 360;
  return a < 0 ? a + 360 : a;
}
function fixHour(hour) {
  let h = hour % 24;
  return h < 0 ? h + 24 : h;
}

// Calculate Julian Date
function getJulianDate(year, month, day) {
  if (month <= 2) {
    year -= 1;
    month += 12;
  }
  let A = Math.floor(year / 100);
  let B = 2 - A + Math.floor(A / 4);
  return Math.floor(365.25 * (year + 4716)) + Math.floor(30.6001 * (month + 1)) + day + B - 1524.5;
}

// Solar position (Declination & Equation of Time)
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

// Compute Hour Angle for a given solar altitude angle
function computeHourAngle(angle, lat, dec) {
  let latRad = degToRad(lat);
  let decRad = degToRad(dec);
  let angleRad = degToRad(angle);

  let cosH = (Math.sin(angleRad) - Math.sin(latRad) * Math.sin(decRad)) / (Math.cos(latRad) * Math.cos(decRad));
  if (cosH > 1) return null; // Sun never reaches this angle (e.g. polar regions)
  if (cosH < -1) return null;
  return radToDeg(Math.acos(cosH)) / 15.0;
}

// Compute Asr Hour Angle
function computeAsrHourAngle(shadowFactor, lat, dec) {
  let phi = degToRad(lat);
  let delta = degToRad(dec);
  let angleRad = Math.atan(1.0 / (shadowFactor + Math.tan(Math.abs(phi - delta))));
  let angle = radToDeg(angleRad);
  return computeHourAngle(angle, lat, dec);
}

export function calculatePrayerTimes(date, lat, lng, timezone, options = {}) {
  const method = options.method || { fajrAngle: 20, ishaAngle: 18 };
  const asrFactor = options.asrFactor || 1; // 1 = Shafi'i, 2 = Hanafi
  const offsets = options.offsets || { fajr: 0, sunrise: 0, dhuhr: 2, asr: 0, maghrib: 2, isha: 0 }; // KEMENAG 2-min safety padding on Dhuhr/Maghrib

  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();

  let jd = getJulianDate(year, month, day);
  let sun = getSunPosition(jd);

  // Dhuhr (Midday)
  let dhuhrBase = 12 + timezone - lng / 15.0 - sun.eqT;

  // Sunrise / Sunset (-0.833 degrees for atmospheric refraction & solar disk size)
  let hSunrise = computeHourAngle(-0.833, lat, sun.declination);

  // Fajr (-fajrAngle degrees)
  let hFajr = computeHourAngle(-method.fajrAngle, lat, sun.declination);

  // Asr
  let hAsr = computeAsrHourAngle(asrFactor, lat, sun.declination);

  // Isha (-ishaAngle degrees or offset from Maghrib)
  let hIsha = method.ishaInterval ? null : computeHourAngle(-method.ishaAngle, lat, sun.declination);

  let fajrTime = hFajr ? dhuhrBase - hFajr + (offsets.fajr || 0)/60 : dhuhrBase - 1.5;
  let sunriseTime = hSunrise ? dhuhrBase - hSunrise + (offsets.sunrise || 0)/60 : dhuhrBase - 1.0;
  let dhuhrTime = dhuhrBase + (offsets.dhuhr || 2)/60;
  let asrTime = hAsr ? dhuhrBase + hAsr + (offsets.asr || 0)/60 : dhuhrBase + 3.0;
  let maghribTime = hSunrise ? dhuhrBase + hSunrise + (offsets.maghrib || 2)/60 : dhuhrBase + 6.0;
  let ishaTime = hIsha 
    ? dhuhrBase + hIsha + (offsets.isha || 0)/60 
    : maghribTime + (method.ishaInterval || 90) / 60.0 + (offsets.isha || 0)/60;

  return {
    subuh: formatHoursToTimeString(fajrTime),
    terbit: formatHoursToTimeString(sunriseTime),
    dzuhur: formatHoursToTimeString(dhuhrTime),
    ashar: formatHoursToTimeString(asrTime),
    maghrib: formatHoursToTimeString(maghribTime),
    isya: formatHoursToTimeString(ishaTime),
    rawTimes: {
      subuh: fajrTime,
      terbit: sunriseTime,
      dzuhur: dhuhrTime,
      ashar: asrTime,
      maghrib: maghribTime,
      isya: ishaTime
    }
  };
}

export function formatHoursToTimeString(hoursFloat) {
  let h = fixHour(hoursFloat);
  let mins = Math.floor((h - Math.floor(h)) * 60);
  let hours = Math.floor(h);
  let formattedH = hours.toString().padStart(2, '0');
  let formattedM = mins.toString().padStart(2, '0');
  return `${formattedH}:${formattedM}`;
}

export function parseTimeToMinutes(timeStr) {
  const [h, m] = timeStr.split(':').map(Number);
  return h * 60 + m;
}

// Get Hijri Date offline calculation
export function getHijriDate(date = new Date()) {
  const day = date.getDate();
  const month = date.getMonth(); // 0-indexed
  const year = date.getFullYear();

  let m = month + 1;
  let y = year;

  if (m < 3) {
    y -= 1;
    m += 12;
  }

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

  let dayOfMonth = Math.floor(B - D - Math.floor(30.6001 * E));

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

export function getNextPrayer(prayerTimes, currentTime = new Date()) {
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
        current: prayers[(i - 1 + prayers.length) % prayers.length],
        remainingMins: diffMins,
        remainingSecs: diffSecs,
        totalRemainingSeconds: diffMins * 60 + diffSecs
      };
    }
  }

  // If past Isya, next prayer is Subuh tomorrow
  const subuhMins = parseTimeToMinutes(prayers[0].time);
  const remainingMins = (24 * 60 - currentMins) + subuhMins - 1;
  const remainingSecs = 60 - currentSecs;
  return {
    next: prayers[0],
    current: prayers[5], // Isya
    remainingMins: remainingMins,
    remainingSecs: remainingSecs,
    totalRemainingSeconds: remainingMins * 60 + remainingSecs
  };
}
