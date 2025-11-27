export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q") || "penampakan hantu";
  const pageToken = searchParams.get("pageToken") || "";
  const maxResults = searchParams.get("maxResults") || "12";

  const apiKey = process.env.YOUTUBE_API_KEY;
  let url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=${maxResults}&q=${query}&key=${apiKey}`;
  
  if (pageToken) {
    url += `&pageToken=${pageToken}`;
  }

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
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
