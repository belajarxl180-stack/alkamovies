export default function VideoCard({ video, onClick }) {
  const id = video.id.videoId;
  const thumb = `https://img.youtube.com/vi/${id}/mqdefault.jpg`;

  return (
    <div
      onClick={() => onClick(video)}
      className="relative rounded-xl overflow-hidden bg-horror-dark border border-white/5 shadow-xl 
      hover:shadow-horror-glow hover:scale-[1.03] hover:border-horror-orange/30 
      transition-all duration-500 cursor-pointer group"
    >
      {/* Thumbnail Image */}
      <div className="relative overflow-hidden">
        <img
          src={thumb}
          alt={video.snippet.title}
          className="w-full h-48 object-cover opacity-90 group-hover:opacity-40 
          group-hover:scale-110 transition-all duration-500"
        />
        
        {/* Play Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center 
        opacity-0 group-hover:opacity-100 transition-all duration-300">
          <div className="w-16 h-16 rounded-full bg-horror-orange/90 flex items-center justify-center
          shadow-horror-glow animate-pulse">
            <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </div>
        </div>
      </div>

      {/* Gradient Overlay with Info */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent 
      opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-4">
        <h3 className="text-white font-bold text-base leading-tight mb-2 drop-shadow-lg
        line-clamp-2">
          {video.snippet.title}
        </h3>
        <p className="text-horror-orange text-sm font-medium drop-shadow-md">
          {video.snippet.channelTitle}
        </p>
      </div>

      {/* Bottom Info Bar (Always Visible) */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/95 to-transparent 
      p-3 group-hover:opacity-0 transition-opacity duration-300">
        <h3 className="text-white text-sm font-semibold line-clamp-2 leading-tight">
          {video.snippet.title}
        </h3>
      </div>

      {/* Glow Effect Border */}
      <div className="absolute inset-0 rounded-xl border-2 border-horror-orange/0 
      group-hover:border-horror-orange/50 transition-all duration-500 pointer-events-none"></div>
    </div>
  );
}
