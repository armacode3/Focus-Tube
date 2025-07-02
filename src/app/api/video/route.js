export async function GET(request) {
    // Get parameters for request
    const { searchParams } = new URL(request.url);
    const videoId = searchParams.get("videoId");

    // Build URL to call to the API
    const url = new URL("https://www.googleapis.com/youtube/v3/videos");
    url.searchParams.set("part", "snippet,contentDetails,statistics");
    url.searchParams.set("id", videoId);
    url.searchParams.set("key", process.env.API_KEY);

    // Attempt to call API
    try {
        const response = await fetch(url.toString());

        // Check if successful
        if (!response.ok) {
            const errorText = response.text();
            console.error("Youtube API Error:", errorText);
            throw new Error("Failed to fetch video details");
        }

        // String and convert to JSON object to parse
        const data = await response.json();

        return new Response(JSON.stringify(data), {
            status:200,
            headers: { 'Content-Type' : 'application/json'}
        });
    } catch(error) {
        // Return status 500 if API does not work
        return new Response(JSON.stringify({ error: error.message}), {
            status:500,
            headers: { 'Content-Type' : 'application/json'}
        });
    }
}