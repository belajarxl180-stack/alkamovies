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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm
      animate-fadeIn"
      onClick={onClose}
    >
      {/* Modal Container */}
      <div
        className="relative w-full max-w-5xl mx-4 bg-horror-dark rounded-2xl overflow-hidden
        shadow-2xl border-2 border-horror-orange/30 animate-scaleIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-horror-orange/20
          hover:bg-horror-orange hover:rotate-90 transition-all duration-300 flex items-center
          justify-center text-white text-2xl font-bold group"
          aria-label="Close"
        >
          <span className="group-hover:scale-110 transition-transform">×</span>
        </button>

        {/* Video Player */}
        <div className="relative w-full pt-[56.25%]">
          <iframe
            src={`https://www.youtube.com/embed/${video.id.videoId}?autoplay=1&rel=0`}
            className="absolute inset-0 w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={video.snippet.title}
          ></iframe>
        </div>

        {/* Video Info */}
        <div className="p-6 bg-gradient-to-t from-horror-black to-horror-dark">
          <h2 className="text-2xl font-bold text-white mb-3 leading-tight">
            {video.snippet.title}
          </h2>
          <p className="text-horror-orange font-semibold mb-3">
            {video.snippet.channelTitle}
          </p>
          <p className="text-white/60 text-sm leading-relaxed">
            {video.snippet.description || "Tidak ada deskripsi"}
          </p>
        </div>
      </div>
    </div>
  );
}
