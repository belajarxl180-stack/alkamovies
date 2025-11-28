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
      className="fixed inset-0 z-50 bg-black animate-fadeIn flex items-center justify-center p-0 sm:p-4"
      onClick={onClose}
    >
      {/* Modal Container - Better Spacing */}
      <div
        className="relative w-full max-w-full sm:max-w-6xl bg-black sm:rounded-lg 
        overflow-hidden shadow-2xl animate-scaleIn flex flex-col"
        style={{
          marginTop: 'env(safe-area-inset-top, 40px)',
          maxHeight: 'calc(100vh - 80px)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 z-20 w-10 h-10 rounded-full 
          bg-black/90 hover:bg-[#ff4d4d] transition-all duration-200 flex items-center
          justify-center text-white text-2xl backdrop-blur-sm shadow-xl"
          aria-label="Close"
        >
          ×
        </button>

        {/* Video Player - Centered 16:9 */}
        <div className="relative w-full bg-black" 
          style={{
            paddingTop: '56.25%'
          }}>
          <iframe
            src={`https://www.youtube.com/embed/${video.id.videoId}?autoplay=1&rel=0&modestbranding=1`}
            className="absolute top-0 left-0 w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
            allowFullScreen
            title={video.snippet.title}
          ></iframe>
        </div>

        {/* Video Info - Readable Caption */}
        <div className="px-4 py-3 bg-[#0a0a0a] landscape:hidden">
          <h2 className="text-sm sm:text-base text-white font-semibold line-clamp-2 leading-snug">
            {video.snippet.title}
          </h2>
        </div>
      </div>
    </div>
  );
}
