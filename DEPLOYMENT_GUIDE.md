# 🚀 PANDUAN DEPLOY ALKAMOVIES KE ONLINE

## 🎯 Cara Paling Mudah: Deploy ke Vercel (GRATIS)

Vercel adalah platform hosting terbaik untuk Next.js (dibuat oleh pembuat Next.js sendiri).

### 📋 Langkah-Langkah:

#### 1️⃣ Persiapan Git Repository

```powershell
# Di folder AlkaMovies, jalankan:
git init
git add .
git commit -m "Initial commit - AlkaMovies Horror Premium"
```

#### 2️⃣ Upload ke GitHub

1. Buka https://github.com/new
2. Buat repository baru dengan nama: `alkamovies`
3. **JANGAN** centang "Add README" atau file apapun
4. Copy dan jalankan command yang diberikan GitHub:

```powershell
git remote add origin https://github.com/USERNAME/alkamovies.git
git branch -M main
git push -u origin main
```

#### 3️⃣ Deploy ke Vercel

**Opsi A: Via Website (Termudah)**

1. Buka https://vercel.com/signup
2. Sign up dengan akun GitHub Anda
3. Klik "Add New Project"
4. Pilih repository `alkamovies`
5. **PENTING**: Tambahkan Environment Variable:
   - Key: `YOUTUBE_API_KEY`
   - Value: `AIzaSyBZL7dc2iZrjcbcj_XwIXfqcFqpnyz0yLU`
6. Klik "Deploy"
7. Tunggu 2-3 menit
8. ✅ Website Anda LIVE! 

**Opsi B: Via Command Line**

```powershell
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel

# Ikuti prompt:
# - Set up and deploy? YES
# - Which scope? (pilih akun Anda)
# - Link to existing project? NO
# - Project name? alkamovies
# - Directory? ./ (enter)
# - Override settings? NO

# Tambahkan Environment Variable
vercel env add YOUTUBE_API_KEY
# Paste API key saat diminta

# Deploy production
vercel --prod
```

---

## 🌐 Alternatif Platform Hosting Lainnya

### 2️⃣ Netlify (GRATIS)
```powershell
npm install -g netlify-cli
netlify login
netlify deploy --prod
```

### 3️⃣ Railway (GRATIS $5 credit/bulan)
1. Buka https://railway.app
2. Sign up dengan GitHub
3. New Project → Deploy from GitHub
4. Pilih repository `alkamovies`
5. Tambahkan environment variable
6. Deploy!

### 4️⃣ Render (GRATIS)
1. Buka https://render.com
2. Sign up
3. New Web Service
4. Connect GitHub repository
5. Build Command: `npm run build`
6. Start Command: `npm start`
7. Tambahkan environment variable

---

## ⚙️ File yang Perlu Ditambahkan Sebelum Deploy

Buat file `.gitignore` agar file sensitif tidak ter-upload:

```gitignore
# dependencies
/node_modules
/.pnp
.pnp.js

# testing
/coverage

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# local env files (PENTING!)
.env*.local
.env

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts
```

---

## 🔑 Keamanan API Key

**JANGAN** commit file `.env.local` ke GitHub!

Setelah deploy:
- API key ada di environment variable platform hosting
- Tidak terlihat di source code
- Aman dari pencurian

---

## 🎉 Setelah Deploy Berhasil

Website Anda akan punya URL seperti:
- Vercel: `alkamovies.vercel.app`
- Netlify: `alkamovies.netlify.app`
- Railway: `alkamovies.up.railway.app`

### 🌟 Custom Domain (Opsional)

Jika punya domain sendiri (misal: `alkamovies.com`):
1. Beli domain di Namecheap, GoDaddy, dll
2. Di dashboard Vercel/Netlify:
   - Settings → Domains
   - Add Custom Domain
   - Ikuti instruksi DNS setting

---

## 📊 Monitoring & Analytics

Tambahkan Google Analytics atau Vercel Analytics untuk track pengunjung:

```javascript
// app/layout.js
import Script from 'next/script'

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <head>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XXXXXXXXXX');
          `}
        </Script>
      </head>
      <body>{children}</body>
    </html>
  )
}
```

---

## 🚀 Tips Optimasi Setelah Online

1. **Performance**: Website sudah optimal dengan Tailwind & Next.js
2. **SEO**: Tambahkan meta tags untuk social media
3. **PWA**: Tambahkan service worker untuk offline access
4. **CDN**: Vercel otomatis pakai CDN global (cepat di semua negara)

---

## ❓ Troubleshooting

**Build Error?**
- Pastikan semua dependencies terinstall
- Cek file `package.json` lengkap
- Jalankan `npm run build` di lokal dulu

**API Key tidak kerja?**
- Cek environment variable sudah benar
- Pastikan key name: `YOUTUBE_API_KEY`
- Redeploy setelah tambah env variable

**Website lambat?**
- Vercel otomatis optimize
- Gunakan Vercel Analytics untuk monitoring
- Check di lighthouse: https://pagespeed.web.dev/

---

## 🎯 Rekomendasi Terbaik

**VERCEL** adalah pilihan terbaik karena:
✅ Gratis unlimited
✅ Deploy otomatis setiap git push
✅ CDN global super cepat
✅ SSL certificate otomatis
✅ Built-in analytics
✅ Zero configuration untuk Next.js

Mulai dari Vercel, nanti bisa upgrade atau pindah kapan saja!

---

📱 **Share Link**: Setelah online, share link website Anda ke social media!

🔥 **ALKAMOVIES SIAP MENDUNIA!** 👁️✨
