"use client";
import { useEffect, useState, useRef, useCallback } from "react";
import VideoCard from "./components/VideoCard";
import VideoModal from "./components/VideoModal";

const CATEGORIES = [
  { id: "penampakan", name: "👻 Penampakan", query: "penampakan hantu nyata indonesia seram" },
  { id: "mistis", name: "🏚️ Mistis", query: "tempat angker mistis indonesia horor" },
  { id: "urban", name: "🌃 Urban Legend", query: "urban legend seram indonesia horor" },
  { id: "paranormal", name: "🔮 Paranormal", query: "paranormal indonesia misteri horor" },
  { id: "pocong", name: "👤 Pocong & Kuntilanak", query: "pocong kuntilanak indonesia seram" },
  { id: "true", name: "📹 Caught on Camera", query: "hantu terekam kamera indonesia nyata" },
];

// Fallback videos jika API gagal
const FALLBACK_VIDEOS = [
  {
    id: { videoId: "dQw4w9WgXcQ" },
    snippet: {
      title: "Penampakan Hantu di Rumah Tua",
      description: "Video penampakan hantu menyeramkan",
      thumbnails: { medium: { url: "https://i.ytimg.com/vi/dQw4w9WgXcQ/mqdefault.jpg" } },
      channelTitle: "Horror Channel"
    }
  },
  {
    id: { videoId: "jNQXAC9IVRw" },
    snippet: {
      title: "Kuntilanak Muncul di Hutan",
      description: "Penampakan kuntilanak mengerikan",
      thumbnails: { medium: { url: "https://i.ytimg.com/vi/jNQXAC9IVRw/mqdefault.jpg" } },
      channelTitle: "Misteri Indonesia"
    }
  },
  {
    id: { videoId: "9bZkp7q19f0" },
    snippet: {
      title: "Pocong Terekam CCTV",
      description: "Rekaman CCTV sosok pocong",
      thumbnails: { medium: { url: "https://i.ytimg.com/vi/9bZkp7q19f0/mqdefault.jpg" } },
      channelTitle: "Dunia Gaib"
    }
  },
  {
    id: { videoId: "kJQP7kiw5Fk" },
    snippet: {
      title: "Suara Aneh di Kuburan",
      description: "Suara misterius di kuburan",
      thumbnails: { medium: { url: "https://i.ytimg.com/vi/kJQP7kiw5Fk/mqdefault.jpg" } },
      channelTitle: "Paranormal Activity"
    }
  },
  {
    id: { videoId: "djV11Xbc914" },
    snippet: {
      title: "Genderuwo di Kampung",
      description: "Penampakan genderuwo menggemparkan",
      thumbnails: { medium: { url: "https://i.ytimg.com/vi/djV11Xbc914/mqdefault.jpg" } },
      channelTitle: "Horor Nusantara"
    }
  },
  {
    id: { videoId: "L_jWHffIx5E" },
    snippet: {
      title: "Hantu di Sekolah Malam",
      description: "Hantu berkeliaran di sekolah",
      thumbnails: { medium: { url: "https://i.ytimg.com/vi/L_jWHffIx5E/mqdefault.jpg" } },
      channelTitle: "Scary Moments"
    }
  },
  {
    id: { videoId: "fJ9rUzIMcZQ" },
    snippet: {
      title: "Tuyul Tertangkap Kamera",
      description: "Penampakan tuyul di rumah",
      thumbnails: { medium: { url: "https://i.ytimg.com/vi/fJ9rUzIMcZQ/mqdefault.jpg" } },
      channelTitle: "Mistis Channel"
    }
  },
  {
    id: { videoId: "ZZ5LpwO-An4" },
    snippet: {
      title: "Jeritan Menyeramkan",
      description: "Jeritan misterius malam hari",
      thumbnails: { medium: { url: "https://i.ytimg.com/vi/ZZ5LpwO-An4/mqdefault.jpg" } },
      channelTitle: "Horror Stories"
    }
  },
  {
    id: { videoId: "eh7lp9umG2I" },
    snippet: {
      title: "Wewe Gombel di Jembatan",
      description: "Sosok wewe gombel di jembatan",
      thumbnails: { medium: { url: "https://i.ytimg.com/vi/eh7lp9umG2I/mqdefault.jpg" } },
      channelTitle: "Legenda Urban"
    }
  },
  {
    id: { videoId: "YQHsXMglC9A" },
    snippet: {
      title: "Arwah Penasaran",
      description: "Arwah penghuni rumah sakit",
      thumbnails: { medium: { url: "https://i.ytimg.com/vi/YQHsXMglC9A/mqdefault.jpg" } },
      channelTitle: "Ghost Hunter"
    }
  },
  {
    id: { videoId: "dPmZqsQNzGA" },
    snippet: {
      title: "Hutan Angker",
      description: "Suasana mencekam hutan angker",
      thumbnails: { medium: { url: "https://i.ytimg.com/vi/dPmZqsQNzGA/mqdefault.jpg" } },
      channelTitle: "Ekspedisi Horor"
    }
  },
  {
    id: { videoId: "Eo-KmOd3i7s" },
    snippet: {
      title: "Penampakan di Terowongan",
      description: "Sosok misterius di terowongan",
      thumbnails: { medium: { url: "https://i.ytimg.com/vi/Eo-KmOd3i7s/mqdefault.jpg" } },
      channelTitle: "Urban Explorer"
    }
  }
];

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState(CATEGORIES[0]);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [nextPageToken, setNextPageToken] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallBanner, setShowInstallBanner] = useState(false);
  
  const observer = useRef();
  const lastVideoRef = useCallback(node => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        loadMoreVideos();
      }
    });
    if (node) observer.current.observe(node);
  }, [loading, hasMore]);

  const fetchVideos = (query, pageToken = null, append = false) => {
    setLoading(true);
    let url = `/api/videos?q=${encodeURIComponent(query)}`;
    if (pageToken) {
      url += `&pageToken=${pageToken}`;
    }

    fetch(url)
      .then(res => res.json())
      .then(data => {
        console.log('API Response:', data);
        
        // Jika tidak ada items, gunakan fallback
        const videoItems = data.items && data.items.length > 0 ? data.items : FALLBACK_VIDEOS;
        
        if (append) {
          setVideos(prev => [...prev, ...videoItems]);
        } else {
          setVideos(videoItems);
        }
        setNextPageToken(data.nextPageToken || null);
        setHasMore(!!data.nextPageToken);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching videos:", err);
        // Jika ada error network, gunakan fallback
        setVideos(FALLBACK_VIDEOS);
        setLoading(false);
      });
  };

  const loadMoreVideos = () => {
    if (nextPageToken && !loading) {
      const query = searchQuery || selectedCategory.query;
      fetchVideos(query, nextPageToken, true);
    }
  };

  useEffect(() => {
    fetchVideos(selectedCategory.query);
    
    // Register service worker for PWA
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then((registration) => console.log('SW registered:', registration))
        .catch((error) => console.log('SW registration failed:', error));
    }

    // PWA Install Prompt
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallBanner(true);
      console.log('Install prompt ready!');
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`User response: ${outcome}`);
    
    setDeferredPrompt(null);
    setShowInstallBanner(false);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setSearchQuery("");
    setNextPageToken(null);
    fetchVideos(category.query);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setNextPageToken(null);
      fetchVideos(searchQuery);
    }
  };

  return (
    <div className="min-h-screen bg-horror-black text-white" style={{ width: '100%', overflowX: 'hidden' }}>
      
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-horror-orange/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-horror-orange/5 rounded-full blur-3xl animate-pulse delay-700"></div>
      </div>

      {/* PWA Install Banner */}
      {showInstallBanner && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-[#8B0000] to-[#DC143C] 
          text-white p-3 shadow-lg animate-fadeIn">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 flex-1">
              <span className="text-2xl">📱</span>
              <div>
                <p className="font-semibold text-sm">Install Aplikasi KARANG JIWO</p>
                <p className="text-xs opacity-90">Akses lebih cepat tanpa browser!</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleInstallClick}
                className="px-4 py-2 bg-white text-[#8B0000] rounded-lg font-semibold 
                text-sm hover:bg-gray-100 transition-all"
              >
                Install
              </button>
              <button
                onClick={() => setShowInstallBanner(false)}
                className="px-3 py-2 bg-black/30 rounded-lg text-sm hover:bg-black/50 transition-all"
              >
                ✕
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header with Horror Title - With Background */}
      <div className="relative z-10 pt-8 sm:pt-12 pb-8 px-3 sm:px-4 overflow-hidden">
        {/* Horror Pattern Background */}
        <div className="absolute inset-0 opacity-30" 
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 50%, rgba(139, 0, 0, 0.3) 0%, transparent 50%),
              radial-gradient(circle at 80% 80%, rgba(220, 20, 60, 0.2) 0%, transparent 50%),
              linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 0.8) 100%)
            `,
            backgroundSize: 'cover'
          }}>
        </div>
        
        {/* Creepy Vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60"></div>
        <div className="absolute inset-0" style={{
          boxShadow: 'inset 0 0 100px rgba(0, 0, 0, 0.8), inset 0 0 50px rgba(139, 0, 0, 0.3)'
        }}></div>
        
        <div className="relative w-full max-w-7xl mx-auto text-center">
          {/* THE - Small text above */}
          <div className="font-serif text-lg sm:text-2xl md:text-3xl mb-1 tracking-widest"
            style={{
              color: '#DC143C',
              textShadow: '0 0 10px rgba(220, 20, 60, 0.8), 2px 2px 4px rgba(0, 0, 0, 0.9)',
              fontWeight: '300',
              letterSpacing: '0.3em'
            }}>
            THE
          </div>
          
          {/* KARANG JIWO - Main title */}
          <h1 className="font-nosifer text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-2"
            style={{
              color: '#DC143C',
              letterSpacing: '0.08em',
              textShadow: `
                0 0 10px rgba(220, 20, 60, 0.8),
                0 0 20px rgba(220, 20, 60, 0.6),
                0 0 30px rgba(255, 0, 0, 0.4),
                0 0 40px rgba(139, 0, 0, 0.3),
                2px 2px 4px rgba(0, 0, 0, 0.9),
                0 -2px 8px rgba(220, 20, 60, 0.5)
              `,
              filter: 'drop-shadow(0 2px 10px rgba(220, 20, 60, 0.5))',
              WebkitTextStroke: '1px rgba(139, 0, 0, 0.3)'
            }}>
            KARANG JIWO
          </h1>
          
          <p className="text-gray-400 text-xs sm:text-sm font-light tracking-wide">
            Portal Misteri & Penampakan
          </p>
        </div>
      </div>

      {/* Search Bar - Mobile Optimized */}
      <div className="relative z-10 px-3 sm:px-4 mb-4">
        <div className="w-full max-w-2xl mx-auto">
          <form onSubmit={handleSearch} className="flex gap-2">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari video..."
              className="flex-1 px-3 py-2.5 bg-[#1a1a1a]/90 backdrop-blur-sm border border-[#333] 
              rounded-lg text-white text-sm placeholder-gray-400 
              focus:border-[#DC143C] focus:outline-none
              transition-all duration-200"
            />
            <button
              type="submit"
              className="px-5 py-2.5 bg-gradient-to-r from-[#DC143C] to-[#8B0000] 
              rounded-lg font-semibold text-sm whitespace-nowrap
              active:scale-95 transition-transform duration-200"
            >
              CARI
            </button>
          </form>
        </div>
      </div>

      {/* Categories - Mobile Scroll */}
      <div className="relative z-10 px-3 sm:px-4 mb-4">
        <div className="w-full max-w-7xl mx-auto overflow-hidden">
          <div className="flex gap-2 overflow-x-auto pb-3 scrollbar-hide">
            {CATEGORIES.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryClick(category)}
                className={`px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap 
                transition-all duration-200 border flex-shrink-0
                ${selectedCategory.id === category.id
                  ? 'bg-gradient-to-r from-[#DC143C] to-[#8B0000] text-white border-[#DC143C] shadow-md'
                  : 'bg-[#1a1a1a]/80 text-gray-300 border-[#333] active:bg-[#2a2a2a]'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Section Title */}
      <div className="relative z-10 px-3 sm:px-4 mb-4">
        <div className="w-full max-w-7xl mx-auto">
          <h2 className="font-semibold text-lg sm:text-xl md:text-2xl text-[#ff4d4d] drop-shadow-md">
            {searchQuery ? `📹 Hasil: "${searchQuery}"` : `${selectedCategory.name}`}
          </h2>
          <div className="h-0.5 w-16 bg-gradient-to-r from-[#ff4d4d] to-transparent mt-2 rounded-full"></div>
        </div>
      </div>

      {/* Videos Grid */}
      <div className="relative z-10 px-2 sm:px-4 pb-16">
        <div className="w-full max-w-7xl mx-auto">
          {videos.length === 0 && !loading ? (
            <div className="text-center py-20">
              <p className="text-4xl mb-4">👻</p>
              <p className="text-xl text-white/60">Tidak ada penampakan ditemukan...</p>
              <p className="text-white/40 mt-2">Coba kata kunci lain</p>
            </div>
          ) : (
            <div className="grid gap-2 sm:gap-4 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {videos.map((video, index) => {
                if (videos.length === index + 1) {
                  return (
                    <div ref={lastVideoRef} key={`${video.id.videoId}-${index}`}>
                      <VideoCard video={video} onClick={setSelectedVideo} />
                    </div>
                  );
                } else {
                  return <VideoCard key={`${video.id.videoId}-${index}`} video={video} onClick={setSelectedVideo} />;
                }
              })}
            </div>
          )}

          {loading && (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="w-16 h-16 border-4 border-horror-orange/30 border-t-horror-orange 
              rounded-full animate-spin mb-4"></div>
              <p className="text-white/60 text-lg animate-pulse">Memuat penampakan...</p>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 bg-horror-dark/50 backdrop-blur-sm py-8">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-white/60 mb-2">© 2025 KARANG JIWO - Portal Video Misteri & Penampakan</p>
          <p className="text-white/40 text-sm">Powered by YouTube Data API v3 🔥</p>
        </div>
      </footer>

      {/* Video Modal */}
      {selectedVideo && (
        <VideoModal video={selectedVideo} onClose={() => setSelectedVideo(null)} />
      )}

    </div>
  );
}
