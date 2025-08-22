export async function GET(request) {
    const { searchParams } = new URL(request.url)
    const searchText = searchParams.get("text")
    const url = new URL("http://suggestqueries.google.com/complete/search?client=firefox&ds=yt")
    url.searchParams.set("q", searchText)


    try {
        const response = await fetch(url.toString())

        if (!response.ok) {
            const errorText = response.text()
            console.error("Youtube API Error:", errorText)
            throw new Error("Failed to fetch search details")
        }

        const data = await response.text();
        const suggestion = JSON.parse(data)[1];

        return new Response(JSON.stringify(suggestion), {
            status:200,
            headers: { 'Content-Type' : 'application/json' }
        });
    } catch(error) {
        return new Response(JSON.stringify({error: error.message }), {
            status: 500,
            headers: { 'Content-Type' : 'application/json'}
        });
    }
}