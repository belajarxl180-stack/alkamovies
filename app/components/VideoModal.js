"use client";
import { useEffect } from "react";

export default function VideoModal({ video, onClose }) {
  // Close modal on ESC key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  if (!video) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black animate-fadeIn overflow-y-auto"
      onClick={onClose}
    >
      {/* Modal Container - Fullscreen on Mobile, Centered on Desktop */}
      <div
        className="relative w-full h-full sm:h-auto sm:max-w-6xl sm:mx-auto sm:my-8 
        bg-black sm:bg-[#1a1a1a] sm:rounded-lg overflow-hidden shadow-2xl animate-scaleIn
        flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-20 w-10 h-10 rounded-full 
          bg-black/80 hover:bg-[#ff4d4d] transition-all duration-200 flex items-center
          justify-center text-white text-2xl backdrop-blur-sm shadow-lg"
          aria-label="Close"
        >
          ×
        </button>

        {/* Video Player - Fullscreen 16:9 with Landscape Support */}
        <div className="relative w-full bg-black" 
          style={{
            paddingTop: '56.25%',
            maxHeight: '100vh'
          }}>
          <iframe
            src={`https://www.youtube.com/embed/${video.id.videoId}?autoplay=1&rel=0&modestbranding=1`}
            className="absolute top-0 left-0 w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
            allowFullScreen
            title={video.snippet.title}
          ></iframe>
        </div>

        {/* Video Info - Hidden in landscape mode on mobile */}
        <div className="p-4 sm:p-6 bg-[#1a1a1a] flex-1 overflow-y-auto
          portrait:block landscape:hidden sm:block">
          <h2 className="text-base sm:text-lg md:text-xl font-semibold text-white mb-2 leading-snug">
            {video.snippet.title}
          </h2>
          <p className="text-[#ff4d4d] text-sm sm:text-base font-medium mb-3">
            {video.snippet.channelTitle}
          </p>
          {video.snippet.description && (
            <p className="text-gray-400 text-sm sm:text-base leading-relaxed line-clamp-4">
              {video.snippet.description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
