export default function VideoCard({ video, onClick }) {
  const id = video.id.videoId;
  const thumb = `https://img.youtube.com/vi/${id}/mqdefault.jpg`;

  return (
    <div
      onClick={() => onClick(video)}
      className="relative rounded overflow-hidden bg-black cursor-pointer group"
    >
      {/* Thumbnail - MAKSIMAL */}
      <div className="relative overflow-hidden aspect-video">
        <img
          src={thumb}
          alt={video.snippet.title}
          className="w-full h-full object-cover"
        />
        
        {/* Play Button */}
        <div className="absolute inset-0 flex items-center justify-center 
        opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
          <div className="w-12 h-12 rounded-full bg-[#ff4d4d] flex items-center justify-center">
            <svg className="w-5 h-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </div>
        </div>
      </div>

      {/* Caption MINI - Putih Saja */}
      <div className="px-1.5 py-1 bg-black">
        <p className="text-white text-[9px] leading-tight line-clamp-1 opacity-80">
          {video.snippet.title}
        </p>
      </div>
    </div>
  );
}
