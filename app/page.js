"use client";
import { useEffect, useState, useRef, useCallback } from "react";
import VideoCard from "./components/VideoCard";
import VideoModal from "./components/VideoModal";

const CATEGORIES = [
  { id: "penampakan", name: "�️ Penampakan", query: "penampakan hantu nyata" },
  { id: "mistis", name: "�️ Mistis", query: "tempat angker indonesia" },
  { id: "urban", name: "� Urban Legend", query: "urban legend seram" },
  { id: "paranormal", name: "🔮 Paranormal", query: "paranormal indonesia" },
  { id: "pocong", name: "� Pocong & Kuntilanak", query: "pocong kuntilanak" },
  { id: "true", name: "📹 Caught on Camera", query: "ghost caught on camera" },
];

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState(CATEGORIES[0]);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [nextPageToken, setNextPageToken] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState(null);
  
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
        if (append) {
          setVideos(prev => [...prev, ...(data.items || [])]);
        } else {
          setVideos(data.items || []);
        }
        setNextPageToken(data.nextPageToken || null);
        setHasMore(!!data.nextPageToken);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching videos:", err);
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
  }, []);

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
    <div className="min-h-screen bg-horror-black text-white">
      
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-horror-orange/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-horror-orange/5 rounded-full blur-3xl animate-pulse delay-700"></div>
      </div>

      {/* Header with Horror Title */}
      <div className="relative z-10 pt-6 pb-4 px-4">
        <div className="max-w-7xl mx-auto text-center">
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

      {/* Search Bar */}
      <div className="relative z-10 px-4 mb-6">
        <div className="max-w-3xl mx-auto">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2 w-full">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="🔍 Cari video..."
              className="flex-1 px-3 h-10 bg-[#2c2c2c] border border-[#444] 
              rounded-lg text-white text-sm placeholder-gray-500 focus:border-[#ff4d4d] focus:outline-none
              transition-all duration-200"
            />
            <button
              type="submit"
              className="w-full sm:w-auto px-4 sm:px-6 h-10 bg-[#ff4d4d] text-sm sm:text-base
              rounded-lg font-semibold hover:bg-[#ff3333]
              transition-all duration-200"
            >
              CARI
            </button>
          </form>
        </div>
      </div>

      {/* Categories */}
      <div className="relative z-10 px-4 mb-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex gap-2 overflow-x-auto pb-3 scrollbar-hide">
            {CATEGORIES.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryClick(category)}
                className={`px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-200
                ${selectedCategory.id === category.id
                  ? 'bg-[#ff4d4d] text-white'
                  : 'bg-[#2c2c2c] text-gray-300 hover:bg-[#3c3c3c] border border-[#444]'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Section Title */}
      <div className="relative z-10 px-4 mb-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-semibold text-lg sm:text-xl md:text-2xl text-[#ff4d4d] drop-shadow-md">
            {searchQuery ? `📹 Hasil: "${searchQuery}"` : `${selectedCategory.name}`}
          </h2>
          <div className="h-0.5 w-16 bg-gradient-to-r from-[#ff4d4d] to-transparent mt-2 rounded-full"></div>
        </div>
      </div>

      {/* Videos Grid */}
      <div className="relative z-10 px-4 pb-16">
        <div className="max-w-7xl mx-auto">
          {videos.length === 0 && !loading ? (
            <div className="text-center py-20">
              <p className="text-4xl mb-4">👻</p>
              <p className="text-xl text-white/60">Tidak ada penampakan ditemukan...</p>
              <p className="text-white/40 mt-2">Coba kata kunci lain</p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
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
