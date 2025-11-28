export default function VideoCard({ video, onClick }) {
  const id = video.id.videoId;
  const thumb = `https://img.youtube.com/vi/${id}/mqdefault.jpg`;

  return (
    <div
      onClick={() => onClick(video)}
      className="relative rounded-lg overflow-hidden bg-black shadow-lg 
      hover:shadow-horror-glow hover:scale-[1.02] transition-all duration-300 cursor-pointer group"
    >
      {/* Thumbnail Image - Larger */}
      <div className="relative overflow-hidden aspect-video">
        <img
          src={thumb}
          alt={video.snippet.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Play Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center 
        opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/30">
          <div className="w-14 h-14 rounded-full bg-[#ff4d4d] flex items-center justify-center
          shadow-lg">
            <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </div>
        </div>
      </div>

      {/* Title Only - Bold & Compact - 1 Line on Mobile */}
      <div className="px-2 py-1.5 bg-[#1a1a1a]">
        <h3 className="text-white text-[10px] sm:text-xs font-bold line-clamp-1 sm:line-clamp-2 leading-tight">
          {video.snippet.title}
        </h3>
      </div>
    </div>
  );
}
