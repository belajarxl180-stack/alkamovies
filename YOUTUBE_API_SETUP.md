# YouTube API Setup - Cara Membuat API Key Baru

## Masalah: Error 403 - API Key Tidak Valid

Jika muncul error 403, kemungkinan:
1. API Key sudah expired atau dibatasi
2. YouTube Data API v3 tidak diaktifkan
3. Quota sudah habis (limit 10,000 units/day untuk free tier)

## Solusi: Buat API Key Baru

### Langkah 1: Buat Project di Google Cloud
1. Buka: https://console.cloud.google.com/
2. Klik dropdown project (atas kiri) → **New Project**
3. Nama: "KARANG JIWO"
4. Klik **Create**

### Langkah 2: Aktifkan YouTube Data API v3
1. Buka: https://console.cloud.google.com/apis/library
2. Search: "YouTube Data API v3"
3. Klik **Enable**

### Langkah 3: Buat API Key
1. Buka: https://console.cloud.google.com/apis/credentials
2. Klik **+ Create Credentials** → **API Key**
3. Copy API Key yang muncul
4. Klik **Edit API Key** (icon pensil)
5. Di "API restrictions":
   - Pilih **"Restrict key"**
   - Centang **"YouTube Data API v3"** saja
6. Klik **Save**

### Langkah 4: Update di Vercel
1. Buka: https://vercel.com/belajarxl180-stack/alkamovies/settings/environment-variables
2. Edit `YOUTUBE_API_KEY`
3. Paste API Key baru
4. Klik **Save**
5. Redeploy: **Deployments** tab → klik ⋯ → **Redeploy**

### Langkah 5: Test
Buka: https://alkamovies-three.vercel.app/api/videos?q=hantu

Jika sukses, akan muncul JSON dengan list video.

## Alternatif: Gunakan API Key yang Baru Dibuat

API Key lama mungkin sudah kena limit. Coba buat yang baru dengan langkah di atas.

## Quota Limits
- Search: 100 units per request
- Daily limit: 10,000 units (gratis)
- Berarti bisa ~100 searches per hari

Jika perlu lebih, bisa upgrade billing di Google Cloud Console.
