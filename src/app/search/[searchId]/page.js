import SearchBar from '../../../components/SearchBar.js'

export default async function Search({ params, searchParams }) {
    const { searchId } = await params;
    const searchType = searchParams.type || "video";

    const res = await fetch(
        `http://localhost:3000/api/search?text=${encodeURIComponent(searchId)}&type=${searchType}`,
        { cache: "no-store"}
    );

    const videos = await res.json()

    return (
    <div className="grid grid-rows-[20px_1fr_20px] gap-8">
        <div className='justify-items-center'>
            <SearchBar />
        </div>
        <div>
        {videos.items?.filter(item => item.id.kind === 'youtube#video' || item.id.kind === 'youtube#playlist').map((item) => {
            if (item.id.kind === "youtube#playlist") {
                return (
                    <a key={item.etag} href={`/playlist/${item.id.playlistId}`} className="flex flex-row gap-4">
                        <img src={item.snippet.thumbnails.medium.url || '../image-load-failed.png'}
                        alt={item.snippet.title}
                        height={160}
                        width={120}
                        />
                        <div>
                            <h2>{item.snippet.title}</h2>
                            <p>{item.snippet.channelTitle}</p>
                        </div>
                    </a>
                );
            } else {
                return (
                    <a key={item.etag} href={`/video/${item.id.videoId}`} className="flex flex-row gap-4 bg-[var(--ui-primary)] p-2 border border-[var(--border-color)] hover:border-[var(--accent-color)]">
                        <img src={item.snippet.thumbnails.medium.url || '../image-load-failed.png'}
                        alt={item.snippet.title}
                        height={160}
                        width={120}/>
                        <div className='flex flex-col'>
                            <h2>{item.snippet.title}</h2>
                            <p className="text-[var(--foreground-secondary)]">{item.snippet.channelTitle}</p>
                        </div>
                    </a>
                );
            }
        })}
        </div>
    </div>
    );
};