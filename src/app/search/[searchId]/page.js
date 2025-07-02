import SearchBar from '../../components/SearchBar.js'

export default function Search() {

    return (
    <div className="grid grid-rows-[20px_1fr_20px] gap-8">
        <div className='justify-items-center'>
            <SearchBar />
        </div>
       <div>
        <a className="flex flex-row gap-4" href="/video">
            <img 
            src="https://i.ytimg.com/vi/abc123/mqdefault.jpg" 
            alt="Youtube Video"
            height={160}
            width={120}
            />
            <div>
                <h2>Google’s new CLI tool hits different…</h2>
                <p>Google has finally put Gemini in the command line, allowing you to hand total control of your machine over to AI. But how is their solution different from all the other similar tools out there?</p>
            </div>
        </a>
       </div>
       <div>
        <a className="flex flex-row gap-4" href="/video">
            <img 
            src="https://i.ytimg.com/vi/abc123/mqdefault.jpg" 
            alt="Youtube Video" 
            height={160} 
            width={120}/>
            <div>
                <h2>What Your IT Career Says About You</h2>
                <p>Get a description of yourself based on what your IT Career is</p>
            </div>
        </a>
       </div>
    </div>
    );
};