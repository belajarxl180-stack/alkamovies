// Cache for 1 hour to save quota
export const revalidate = 3600; // 1 hour in seconds

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q") || "penampakan hantu";
  const pageToken = searchParams.get("pageToken") || "";
  const maxResults = searchParams.get("maxResults") || "12";

  const apiKey = process.env.YOUTUBE_API_KEY;
  
  if (!apiKey) {
    return Response.json(
      { error: "YOUTUBE_API_KEY not configured", details: "Please set environment variable in Vercel" },
      { status: 500 }
    );
  }

  // Simplified URL - remove videoDuration parameter that might cause issues
  let url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=${maxResults}&q=${encodeURIComponent(query)}&key=${apiKey}`;
  
  if (pageToken) {
    url += `&pageToken=${pageToken}`;
  }

  try {
    const response = await fetch(url);
    const data = await response.json();

    // Log untuk debugging
    console.log('YouTube API Status:', response.status);
    console.log('YouTube API Response:', data);

    if (!response.ok) {
      // Detailed error untuk 403
      if (response.status === 403) {
        return Response.json(
          { 
            error: "YouTube API Access Denied (403)", 
            details: data.error?.message || "API Key mungkin tidak valid atau quota habis",
            suggestion: "1. Cek API Key di Google Cloud Console\n2. Pastikan YouTube Data API v3 enabled\n3. Cek quota di https://console.cloud.google.com/apis/api/youtube.googleapis.com/quotas"
          },
          { status: 403 }
        );
      }
      
      return Response.json(
        { error: "Failed to fetch videos", details: data },
        { status: response.status }
      );
    }

    return Response.json(data);
  } catch (error) {
    return Response.json(
      { error: "Internal server error", message: error.message },
      { status: 500 }
    );
  }
}
