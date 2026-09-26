// Prayer App - Data Constants & Libraries

export const CITIES = [
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

export const CALCULATION_METHODS = [
  { id: 'KEMENAG', name: 'Kementerian Agama RI (Indonesian standard)', fajrAngle: 20, ishaAngle: 18 },
  { id: 'MWL', name: 'Muslim World League', fajrAngle: 18, ishaAngle: 17 },
  { id: 'ISNA', name: 'Islamic Society of North America (ISNA)', fajrAngle: 15, ishaAngle: 15 },
  { id: 'EGYPT', name: 'Egyptian General Authority of Survey', fajrAngle: 19.5, ishaAngle: 17.5 },
  { id: 'UMM_AL_QURA', name: 'Umm al-Qura University, Makkah', fajrAngle: 18.5, ishaAngle: 0, ishaInterval: 90 }
];

export const DZIKIR_PRESETS = [
  { name: 'Subhanallah', arabic: 'سُبْحَانَ اللَّهِ', translation: 'Maha Suci Allah', defaultTarget: 33 },
  { name: 'Alhamdulillah', arabic: 'الْحَمْدُ لِلَّهِ', translation: 'Segala puji bagi Allah', defaultTarget: 33 },
  { name: 'Allahu Akbar', arabic: 'اللَّهُ أَكْبَرُ', translation: 'Allah Maha Besar', defaultTarget: 33 },
  { name: 'Astaghfirullah', arabic: 'أَسْتَغْفِرُ اللَّهَ', translation: 'Aku memohon ampun kepada Allah', defaultTarget: 100 },
  { name: 'Laa ilaaha illallah', arabic: 'لَا إِلَٰهَ إِلَّا اللَّهُ', translation: 'Tiada Tuhan selain Allah', defaultTarget: 100 },
  { name: 'Shalawat Nabi', arabic: 'اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ', translation: 'Ya Allah, limpahkan shalawat kepada Nabi Muhammad', defaultTarget: 100 },
  { name: 'Hasbunallah', arabic: 'حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ', translation: 'Cukuplah Allah menjadi Penolong kami', defaultTarget: 70 },
  { name: 'Laa hawla wa laa quwwata', arabic: 'لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ', translation: 'Tiada daya dan upaya kecuali dengan pertolongan Allah', defaultTarget: 33 }
];

export const HADITHS = [
  {
    text: 'Amalan yang paling dicintai oleh Allah adalah amalan yang kontinyu (dikerjakan secara rutin) meskipun sedikit.',
    source: 'HR. Bukhari & Muslim'
  },
  {
    text: 'Shalat tepat pada waktunya adalah amalan yang paling utama.',
    source: 'HR. Bukhari & Muslim'
  },
  {
    text: 'Barangsiapa yang membaca satu huruf dari Kitab Allah (Al-Qur\'an), maka baginya satu kebaikan dan satu kebaikan dilipatgandakan menjadi sepuluh kali lipat.',
    source: 'HR. Tirmidzi'
  },
  {
    text: 'Perumpamaan orang yang berzikir kepada Tuhannya dan orang yang tidak berzikir adalah seperti orang yang hidup dan orang yang mati.',
    source: 'HR. Bukhari'
  },
  {
    text: 'Shalat berjamaah lebih utama daripada shalat sendirian sebanyak 27 derajat.',
    source: 'HR. Bukhari & Muslim'
  },
  {
    text: 'Sebaik-baik kalian adalah orang yang mempelajari Al-Qur\'an dan mengajarkannya.',
    source: 'HR. Bukhari'
  },
  {
    text: 'Doa adalah otaknya ibadah.',
    source: 'HR. Tirmidzi'
  }
];

export const DAILY_DOAS = [
  {
    id: 1,
    title: 'Doa Bangun Tidur',
    category: 'Harian',
    arabic: 'الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ',
    latin: 'Alhamdulillahilladzi ahyana ba\'da ma amatana wa ilaihin nusyur.',
    translation: 'Segala puji bagi Allah yang menghidupkan kami kembali setelah mematikan kami dan hanya kepada-Nya kami dibangkitkan.'
  },
  {
    id: 2,
    title: 'Doa Sebelum Makan',
    category: 'Makan',
    arabic: 'اللَّهُمَّ بَارِكْ لَنَا فِيمَا رَزَقْتَنَا وَقِنَا عَذَابَ النَّارِ',
    latin: 'Allahumma barik lana fi ma razaqtana wa qina \'adzaban nar.',
    translation: 'Ya Allah, berkahilah rezeki yang Engkau berikan kepada kami dan peliharalah kami dari siksa api neraka.'
  },
  {
    id: 3,
    title: 'Doa Setelah Makan',
    category: 'Makan',
    arabic: 'الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنَا وَسَقَانَا وَجَعَلَنَا مُسْلِمِينَ',
    latin: 'Alhamdulillahilladzi ath\'amana wa saqana wa ja\'alana muslimin.',
    translation: 'Segala puji bagi Allah yang memberikan kami makan dan minum serta menjadikan kami orang-orang Muslim.'
  },
  {
    id: 4,
    title: 'Doa Keluar Rumah',
    category: 'Harian',
    arabic: 'بِسْمِ اللَّهِ تَوَكَّلْتُ عَلَى اللَّهِ لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ',
    latin: 'Bismillahi tawakkaltu \'alallah, la haula wa la quwwata illa billah.',
    translation: 'Dengan nama Allah, aku bertawakal kepada Allah. Tiada daya dan upaya kecuali dengan pertolongan Allah.'
  },
  {
    id: 5,
    title: 'Doa Masuk Masjid',
    category: 'Shalat',
    arabic: 'اللَّهُمَّ افْتَحْ لِي أَبْوَابَ رَحْمَتِكَ',
    latin: 'Allahummaftah lii abwaaba rahmatik.',
    translation: 'Ya Allah, bukakanlah untukku pintu-pintu rahmat-Mu.'
  },
  {
    id: 6,
    title: 'Doa Keluar Masjid',
    category: 'Shalat',
    arabic: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ مِنْ فَضْلِكَ',
    latin: 'Allahumma innii as\'aluka min fadlik.',
    translation: 'Ya Allah, sesungguhnya aku memohon keutamaan dari-Mu.'
  },
  {
    id: 7,
    title: 'Doa Sapu Jagad (Kebaikan Dunia & Akhirat)',
    category: 'Utama',
    arabic: 'رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ',
    latin: 'Rabbana atina fid-dunya hasanah wa fil-akhirati hasanah wa qina \'adzaban nar.',
    translation: 'Ya Tuhan kami, berilah kami kebaikan di dunia dan kebaikan di akhirat dan peliharalah kami dari siksa neraka.'
  },
  {
    id: 8,
    title: 'Doa Mohon Ilmu & Rezeki Halal',
    category: 'Utama',
    arabic: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ عِلْمًا نَافِعًا وَرِزْقًا طَيِّبًا وَعَمَلًا مُتَقَبَّلًا',
    latin: 'Allahumma inni as\'aluka \'ilman nafi\'an wa rizqan thayyiban wa \'amalan mutaqabbalan.',
    translation: 'Ya Allah, sesungguhnya aku memohon kepada-Mu ilmu yang bermanfaat, rezeki yang baik, dan amal yang diterima.'
  },
  {
    id: 9,
    title: 'Doa Sebelum Tidur',
    category: 'Harian',
    arabic: 'بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا',
    latin: 'Bismikallahumma amutu wa ahya.',
    translation: 'Dengan nama-Mu ya Allah aku mati dan aku hidup.'
  },
  {
    id: 10,
    title: 'Doa Kedua Orang Tua',
    category: 'Keluarga',
    arabic: 'رَبِّ اغْفِرْ لِي وَلِوَالِدَيَّ وَارْحَمْهُمَا كَمَا رَبَّيَانِي صَغِيرًا',
    latin: 'Rabbighfir lii wa liwaalidayya warhamhuma kamaa rabbayaanii shaghiiraa.',
    translation: 'Ya Rabbku, ampunilah aku dan kedua orang tuaku, dan kasihilah keduanya sebagaimana mereka merawatku di waktu kecil.'
  }
];
