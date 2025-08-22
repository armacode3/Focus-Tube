export async function GET(request) {
    // Get parameters for request
    const { searchParams } = new URL(request.url);
    const searchText = searchParams.get("text");
    const searchType = searchParams.get("type")

    // Build URL to call to the API
    const url = new URL("https://www.googleapis.com/youtube/v3/search");
    url.searchParams.set("part", "snippet");
    url.searchParams.set("maxResults", 45)
    url.searchParams.set("q", searchText);
    url.searchParams.set("type", searchType);
    url.searchParams.set("key", process.env.API_KEY);

    try {
        const response = await fetch(url.toString());

        if (!response.ok) {
            const errorText = response.text();
            console.error("Youtube API Error:", errorText);
            throw new Error("Failed to fetch search details");
        }

        // String and convert to JSON object to parse
        const data = await response.json();
        
        return new Response(JSON.stringify(data), {
            status:200,
            headers: { 'Content-Type' : 'application/json'}
        });
    } catch (error) {
        // Return status 500 if API does not work
        return new Response(JSON.stringify({ error: error.message }), {
            status:500,
            headers: { 'Content-Type' : 'application/json'}
        });
    }
}