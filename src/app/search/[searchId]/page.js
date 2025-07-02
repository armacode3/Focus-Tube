import SearchBar from '../../../components/SearchBar'

export default async function Search({ params }) {
    const { searchId } = params

    const res = await fetch(
        `http://localhost:3000/api/search?text=${encodeURIComponent(searchId)}&type=video`,
        { cache: "no-store"}
    );

    const videos = await res.json()

    return (
    <div className="grid grid-rows-[20px_1fr_20px] gap-8">
        <div className='justify-items-center'>
            <SearchBar />
        </div>
        <div>
        {videos.items?.map((vid) => {
            return (<a key={vid} className="flex flex-row gap-4" href={`/video/${vid.id.videoId}`}>
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
            </a>);
        })
        }
        </div>
    </div>
    );
};