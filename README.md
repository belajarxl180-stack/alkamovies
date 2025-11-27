# 👁️ ALKAMOVIES - Portal Video Penampakan & Misteri

Website agregator video YouTube dengan tema **Horror Premium** untuk konten penampakan, misteri, dan urban legend.

## 🎨 Design Features

### ✨ Ornament & Styling
- **Deep Black Theme** (#0B0B0D) - Tema gelap yang elegan
- **Horror Orange Accent** (#FF6A00) - Aksen orange yang menakutkan
- **Glooming Cards** - Card dengan shadow dan glow effect
- **Creepy Hover Effects** - Efek hover yang misterius
- **Horror Fonts** - Font Creepster, Eater, Nosifer untuk judul
- **Animated Background** - Background dengan particle glow yang bergerak
- **YouTube Thumbnails** - Menggunakan thumbnail (lebih cepat dari iframe)

### 🔥 Main Features
- **6 Kategori Horror**: Penampakan, Mistis, Urban Legend, Paranormal, Pocong & Kuntilanak, Caught on Camera
- **Advanced Search Bar** - Cari video dengan keyword custom
- **Infinite Scroll** - Auto-load video saat scroll ke bawah
- **Responsive Grid Layout** - Tampilan optimal di semua device
- **Play Button Overlay** - Tombol play muncul saat hover
- **Smooth Animations** - Transisi dan animasi yang halus
- **Direct YouTube Link** - Klik card langsung ke YouTube

## 🚀 Cara Menjalankan

1. **Install dependencies:**
```bash
npm install
```

2. **Jalankan development server:**
```bash
npm run dev
```

3. **Buka browser di:** 
```
http://localhost:3000
```

## 🛠️ Tech Stack

- **Next.js 14** (App Router)
- **React 18**
- **Tailwind CSS 3.4** (Utility-first CSS)
- **YouTube Data API v3**
- **Google Fonts** (Creepster, Eater, Nosifer)

## 📁 Struktur Proyek

```
AlkaMovies/
├── app/
│   ├── api/videos/route.js    # YouTube API handler
│   ├── components/
│   │   └── VideoCard.js       # Horror-themed video card
│   ├── page.js                # Main homepage
│   ├── layout.js              # Root layout dengan fonts
│   └── globals.css            # Tailwind + custom styles
├── tailwind.config.js         # Tailwind configuration
├── postcss.config.js          # PostCSS configuration
├── .env.local                 # YouTube API key
└── package.json               # Dependencies

```

## 🎨 Custom Tailwind Classes

- `bg-horror-black` - Deep black background
- `bg-horror-dark` - Dark card background
- `text-horror-orange` - Orange accent color
- `shadow-horror` - Horror shadow effect
- `shadow-horror-glow` - Orange glow shadow
- `font-creepster` - Creepster font family
- `font-eater` - Eater font family
- `font-nosifer` - Nosifer font family

## 🔑 Environment Variables

Create `.env.local` file:
```
YOUTUBE_API_KEY=your_api_key_here
```

## 📱 Responsive Design

- **Mobile**: Grid 2 columns
- **Tablet**: Grid 3 columns
- **Desktop**: Grid 4-5 columns
- **Smooth scrolling** di semua device

## 🎭 Design Philosophy

Website ini dirancang dengan filosofi **"Elegant Horror"** - menggabungkan estetika mewah dengan nuansa horor yang mencekam. Setiap elemen dari typography, color scheme, hingga animasi dipilih untuk menciptakan pengalaman browsing yang immersive dan menakutkan.

---

**© 2025 ALKAMOVIES** - Portal Video Misteri & Penampakan 🔥
