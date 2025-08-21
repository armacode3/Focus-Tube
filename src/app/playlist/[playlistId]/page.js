import SearchBar from '../../../components/SearchBar.js'

export default async function Playlist({ params }) {
    const { playlistId } = await params;

    const resPlaylist = await fetch(
        `http://localhost:3000/api/playlist?playlistId=${encodeURIComponent(playlistId)}`,
        { cache: 'no-store' }
    );

    const resVideos = await fetch(
        `http://localhost:3000/api/playlist-item?playlistId=${encodeURIComponent(playlistId)}`,
        { cach: 'no-store' }
    );

    const playlistData = await resPlaylist.json();

    const playlistVideos = await resVideos.json();

    return (
        <div className='grid grid-rows-[20px_1fr_20px] gap-8'>
            <div className='justify-items-center'>
                <SearchBar />
            </div>
            <div>
                <h2>{playlistData.items[0].snippet.title}</h2>
                <p>{playlistData.items[0].snippet.description}</p>
                <div>
                    {playlistVideos.items?.map((vid) => {
                        return (<a key={vid.snippet.resourceId.videoId} className="flex flex-row gap-4" href={`/video/${vid.snippet.resourceId.videoId}`}>
                            <img
                            src={vid.snippet.thumbnails.medium.url}
                            alt={vid.snippet.title}
                            height={160}
                            width={120}
                            />
                            <div>
                                <h2>{vid.snippet.title}</h2>
                                <p>{vid.snippet.description}</p>
                            </div>
                        </a>)
                    })}
                </div>
            </div>
        </div>
    );
};