# 🕌 Prayer App (PWA) - Online & GitHub Pages Ready

Aplikasi Pengingat & Log Ibadah Harian Offline-First berbasis Progressive Web App (PWA).

---

## 🚀 Panduan Upload & Online di GitHub Pages

Aplikasi ini sudah **100% siap di-onlinekan di GitHub Pages** tanpa perlu konfigurasi build/server tambahan.

### Cara 1: Upload Langsung via Web GitHub (Paling Mudah)

1. Buka situs [GitHub](https://github.com/) dan buat Repositori baru (misal: `prayer-app`).
2. Pilih opsi **Public**.
3. Di halaman repositori baru, klik tombol **"uploading an existing file"**.
4. Drag & Drop seluruh isi folder ini (`index.html`, `manifest.json`, `sw.js`, folder `css`, folder `js`, folder `icons`) ke halaman GitHub.
5. Klik tombol **Commit changes**.
6. Masuk ke tab **Settings** di repositori GitHub Anda.
7. Pilih menu **Pages** di bilah navigasi kiri.
8. Pada bagian **Build and deployment**:
   - Source: **Deploy from a branch**
   - Branch: pilih **`main`** (atau `master`) / folder **`/(root)`**
   - Klik **Save**.
9. Tunggu 1–2 menit, link situs PWA Anda akan aktif di:
   `https://USERNAME_ANDA.github.io/prayer-app/`

---

### Cara 2: Menggunakan Git Command Line

```bash
# 1. Inisialisasi Git di folder proyek
git init
git add .
git commit -m "Initial commit Prayer App PWA"

# 2. Hubungkan ke repositori GitHub Anda
git branch -M main
git remote add origin https://github.com/USERNAME_ANDA/prayer-app.git
git push -u origin main
```

Setelah dipush, buka **Settings > Pages** di repositori GitHub Anda dan pilih branch `main`.

---

## 📱 Fitur PWA (Installable)
Setelah web online di GitHub Pages:
- Di Android/Chrome: Akan muncul pop-up **"Add Prayer App to Home Screen"** / **"Install App"**.
- Di iPhone/Safari: Klik tombol **Share (Bagikan)** > **"Add to Home Screen"**.
- Aplikasi dapat dibuka secara **full-screen layaknya aplikasi native** dan dapat digunakan **100% tanpa jaringan internet (offline)**.
