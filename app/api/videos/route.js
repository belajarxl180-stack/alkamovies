// Cache for 1 hour to save quota
export const revalidate = 3600; // 1 hour in seconds

// Fallback data when quota is exhausted
const FALLBACK_VIDEOS = {
  items: [
    {
      id: { videoId: "dQw4w9WgXcQ" },
      snippet: {
        title: "Penampakan Hantu di Rumah Tua",
        description: "Video penampakan hantu menyeramkan di rumah tua yang ditinggalkan",
        thumbnails: { medium: { url: "https://i.ytimg.com/vi/dQw4w9WgXcQ/mqdefault.jpg" } },
        channelTitle: "Horror Channel"
      }
    },
    {
      id: { videoId: "jNQXAC9IVRw" },
      snippet: {
        title: "Kuntilanak Muncul di Hutan",
        description: "Penampakan kuntilanak yang mengerikan di tengah hutan malam hari",
        thumbnails: { medium: { url: "https://i.ytimg.com/vi/jNQXAC9IVRw/mqdefault.jpg" } },
        channelTitle: "Misteri Indonesia"
      }
    },
    {
      id: { videoId: "9bZkp7q19f0" },
      snippet: {
        title: "Pocong Terekam CCTV",
        description: "Rekaman CCTV menangkap sosok pocong berjalan di malam hari",
        thumbnails: { medium: { url: "https://i.ytimg.com/vi/9bZkp7q19f0/mqdefault.jpg" } },
        channelTitle: "Dunia Gaib"
      }
    },
    {
      id: { videoId: "kJQP7kiw5Fk" },
      snippet: {
        title: "Suara Aneh di Kuburan",
        description: "Suara misterius terdengar dari dalam kuburan tengah malam",
        thumbnails: { medium: { url: "https://i.ytimg.com/vi/kJQP7kiw5Fk/mqdefault.jpg" } },
        channelTitle: "Paranormal Activity"
      }
    },
    {
      id: { videoId: "djV11Xbc914" },
      snippet: {
        title: "Genderuwo di Kampung",
        description: "Penampakan genderuwo yang menggemparkan warga kampung",
        thumbnails: { medium: { url: "https://i.ytimg.com/vi/djV11Xbc914/mqdefault.jpg" } },
        channelTitle: "Horor Nusantara"
      }
    },
    {
      id: { videoId: "L_jWHffIx5E" },
      snippet: {
        title: "Hantu di Sekolah Malam",
        description: "Video menyeramkan hantu berkeliaran di sekolah saat malam hari",
        thumbnails: { medium: { url: "https://i.ytimg.com/vi/L_jWHffIx5E/mqdefault.jpg" } },
        channelTitle: "Scary Moments"
      }
    },
    {
      id: { videoId: "fJ9rUzIMcZQ" },
      snippet: {
        title: "Tuyul Tertangkap Kamera",
        description: "Penampakan tuyul yang tertangkap kamera di rumah warga",
        thumbnails: { medium: { url: "https://i.ytimg.com/vi/fJ9rUzIMcZQ/mqdefault.jpg" } },
        channelTitle: "Mistis Channel"
      }
    },
    {
      id: { videoId: "ZZ5LpwO-An4" },
      snippet: {
        title: "Jeritan Menyeramkan Malam Hari",
        description: "Jeritan misterius yang terdengar setiap malam di desa terpencil",
        thumbnails: { medium: { url: "https://i.ytimg.com/vi/ZZ5LpwO-An4/mqdefault.jpg" } },
        channelTitle: "Horror Stories"
      }
    },
    {
      id: { videoId: "eh7lp9umG2I" },
      snippet: {
        title: "Wewe Gombel di Jembatan",
        description: "Sosok wewe gombel terlihat di jembatan tua setiap tengah malam",
        thumbnails: { medium: { url: "https://i.ytimg.com/vi/eh7lp9umG2I/mqdefault.jpg" } },
        channelTitle: "Legenda Urban"
      }
    },
    {
      id: { videoId: "YQHsXMglC9A" },
      snippet: {
        title: "Arwah Penasaran di Rumah Sakit",
        description: "Penampakan arwah penasaran yang menghantui rumah sakit lama",
        thumbnails: { medium: { url: "https://i.ytimg.com/vi/YQHsXMglC9A/mqdefault.jpg" } },
        channelTitle: "Ghost Hunter"
      }
    },
    {
      id: { videoId: "dPmZqsQNzGA" },
      snippet: {
        title: "Sunyi Senyap di Hutan Angker",
        description: "Suasana mencekam di hutan angker yang penuh misteri",
        thumbnails: { medium: { url: "https://i.ytimg.com/vi/dPmZqsQNzGA/mqdefault.jpg" } },
        channelTitle: "Ekspedisi Horor"
      }
    },
    {
      id: { videoId: "Eo-KmOd3i7s" },
      snippet: {
        title: "Penampakan di Terowongan Tua",
        description: "Video penampakan sosok misterius di terowongan tua yang ditinggalkan",
        thumbnails: { medium: { url: "https://i.ytimg.com/vi/Eo-KmOd3i7s/mqdefault.jpg" } },
        channelTitle: "Urban Explorer"
      }
    }
  ],
  pageInfo: { totalResults: 12, resultsPerPage: 12 }
};

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q") || "penampakan hantu";
  const pageToken = searchParams.get("pageToken") || "";
  const maxResults = searchParams.get("maxResults") || "12";

  const apiKey = process.env.YOUTUBE_API_KEY;
  
  if (!apiKey) {
    console.warn("⚠️ No API key, using fallback data");
    return Response.json(FALLBACK_VIDEOS);
  }

  // Build YouTube API URL with region code for Indonesian content
  let url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=${maxResults}&q=${encodeURIComponent(query)}&regionCode=ID&relevanceLanguage=id&safeSearch=none&key=${apiKey}`;
  
  if (pageToken) {
    url += `&pageToken=${pageToken}`;
  }

  try {
    const response = await fetch(url);
    const data = await response.json();

    // Log untuk debugging
    console.log('YouTube API Status:', response.status);

    if (!response.ok) {
      // Use fallback data when quota exhausted
      if (response.status === 403) {
        console.warn("⚠️ YouTube API quota exhausted, using fallback data");
        return Response.json(FALLBACK_VIDEOS);
      }
      
      // For other errors, still try fallback
      console.error("YouTube API Error:", response.status, data);
      return Response.json(FALLBACK_VIDEOS);
    }

    return Response.json(data);
  } catch (error) {
    console.error("⚠️ Fetch error, using fallback data:", error.message);
    return Response.json(FALLBACK_VIDEOS);
  }
}
