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
      <div className="relative z-10 pt-12 pb-8 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="font-creepster text-6xl md:text-7xl lg:text-8xl text-center mb-4
          bg-gradient-to-r from-horror-orange via-red-600 to-horror-orange bg-clip-text text-transparent
          drop-shadow-[0_0_30px_rgba(255,106,0,0.5)] animate-pulse">
            ALKAMOVIES
          </h1>
          <p className="text-center text-white/60 text-lg md:text-xl font-light tracking-widest">
            👁️ PORTAL MISTERI & PENAMPAKAN 👁️
          </p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative z-10 px-6 mb-8">
        <div className="max-w-3xl mx-auto">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="🔍 Cari penampakan, misteri, urban legend..."
              className="w-full px-6 py-4 bg-horror-dark/80 backdrop-blur-sm border-2 border-white/10 
              rounded-xl text-white placeholder-white/40 focus:border-horror-orange focus:outline-none
              focus:shadow-horror-glow transition-all duration-300"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2 bg-horror-orange 
              rounded-lg font-semibold hover:bg-horror-orange/80 hover:shadow-horror-glow
              transition-all duration-300"
            >
              CARI
            </button>
          </form>
        </div>
      </div>

      {/* Categories */}
      <div className="relative z-10 px-6 mb-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
            {CATEGORIES.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryClick(category)}
                className={`px-6 py-3 rounded-full font-semibold whitespace-nowrap transition-all duration-300
                ${selectedCategory.id === category.id
                  ? 'bg-horror-orange text-white shadow-horror-glow scale-105'
                  : 'bg-horror-dark/60 text-white/70 hover:bg-horror-dark hover:text-white border border-white/10'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Section Title */}
      <div className="relative z-10 px-6 mb-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-eater text-3xl md:text-4xl text-horror-orange drop-shadow-[0_0_20px_rgba(255,106,0,0.4)]">
            {searchQuery ? `📹 Hasil: "${searchQuery}"` : `🔥 ${selectedCategory.name}`}
          </h2>
          <div className="h-1 w-32 bg-gradient-to-r from-horror-orange to-transparent mt-3 rounded-full"></div>
        </div>
      </div>

      {/* Videos Grid */}
      <div className="relative z-10 px-6 pb-20">
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
          <p className="text-white/60 mb-2">© 2025 ALKAMOVIES - Portal Video Misteri & Penampakan</p>
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
