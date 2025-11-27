"use client";
import { useEffect, useState } from "react";

export default function HeroBanner() {
  const [featuredVideo, setFeaturedVideo] = useState(null);

  useEffect(() => {
    fetch("/api/videos?q=penampakan+misterius&maxResults=1")
      .then(res => res.json())
      .then(data => {
        if (data.items && data.items.length > 0) {
          setFeaturedVideo(data.items[0]);
        }
      });
  }, []);

  if (!featuredVideo) {
    return (
      <div className="hero-banner skeleton">
        <div className="hero-loading">Loading...</div>
      </div>
    );
  }

  return (
    <div className="hero-banner">
      <div className="hero-background">
        <img
          src={featuredVideo.snippet.thumbnails.high.url}
          alt={featuredVideo.snippet.title}
        />
        <div className="hero-overlay"></div>
      </div>
      <div className="hero-content">
        <h1 className="hero-title">{featuredVideo.snippet.title}</h1>
        <p className="hero-description">
          {featuredVideo.snippet.description || "Konten misteri dan penampakan terbaik"}
        </p>
        <div className="hero-buttons">
          <a
            href={`https://www.youtube.com/watch?v=${featuredVideo.id.videoId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            ▶ Tonton Sekarang
          </a>
          <button className="btn btn-secondary">ℹ Info Lebih Lanjut</button>
        </div>
      </div>
    </div>
  );
}
