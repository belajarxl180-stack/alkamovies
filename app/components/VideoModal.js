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
      className="fixed inset-0 z-50 flex items-start sm:items-center justify-center bg-black/95 
      p-0 sm:p-4 animate-fadeIn overflow-y-auto"
      onClick={onClose}
    >
      {/* Modal Container */}
      <div
        className="relative w-full max-w-5xl bg-[#1a1a1a] 
        sm:rounded-lg overflow-hidden shadow-2xl animate-scaleIn my-0 sm:my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 z-20 w-10 h-10 rounded-full 
          bg-black/70 hover:bg-[#ff4d4d] transition-all duration-200 flex items-center
          justify-center text-white text-2xl backdrop-blur-sm"
          aria-label="Close"
        >
          ×
        </button>

        {/* Video Player - Perfect 16:9 Aspect Ratio */}
        <div className="relative w-full bg-black" style={{paddingTop: '56.25%'}}>
          <iframe
            src={`https://www.youtube.com/embed/${video.id.videoId}?autoplay=1&rel=0`}
            className="absolute top-0 left-0 w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={video.snippet.title}
          ></iframe>
        </div>

        {/* Video Info */}
        <div className="p-4 sm:p-5 bg-[#1a1a1a]">
          <h2 className="text-base sm:text-lg font-semibold text-white mb-2 leading-snug line-clamp-2">
            {video.snippet.title}
          </h2>
          <p className="text-[#ff4d4d] text-sm font-medium mb-2">
            {video.snippet.channelTitle}
          </p>
          {video.snippet.description && (
            <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">
              {video.snippet.description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
