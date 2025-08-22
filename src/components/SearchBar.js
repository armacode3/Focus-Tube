'use client';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation'

export default function SearchBar() {
  const formRef = useRef(null)

  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchType, setSearchType] = useState("video");
  const [userText, setUserText] = useState("");
  const [recommendations, setRecommendations] = useState([]);

  const router = useRouter();

  const buttonTypes = [{id: "video", label: "Video Search"},
                       {id: "playlist", label: "Playlist Search"},
                       {id: "videoId", label: "Video ID"},
                       {id: "playlistId", label: "Playlist ID"}];

  useEffect(() => {
    if (userText.length > 0){
      const timerId = setTimeout(async () => {
        const response = await fetch (
          `http://localhost:3000/api/suggestions?text=${userText}`,
          { cache: 'no-store'}
        );

        const suggestions = await response.json();
        setRecommendations(suggestions)}, 500);
      return () => clearTimeout(timerId);
    } else {
      setRecommendations([]);
    }
  }, [userText]);
  
  useEffect(() => {
    console.log(userText);
  }, [userText]);

  const handleSearch = (textToSearch) => {
    console.log(textToSearch);
    console.log(searchType)
    if (!textToSearch || textToSearch.length === 0) return;

    if (searchType === "video") {
      router.push(`/search/${textToSearch}?type=video`);
    } 
    else if (searchType === "playlist") {
      router.push(`/search/${textToSearch}?type=playlist`);
    }
    else if (searchType === "videoId") {
      router.push(`/video/${textToSearch}`);
    }
    else if (searchType === "playlistId") {
      router.push(`/playlist/${textToSearch}}`)
    }
  };

  return (
    <div className="relative">
        <form ref={formRef} onSubmit={(event) => {
          event.preventDefault();
          handleSearch(userText);
        }}>
          <div className="flex gap-4 items-center flex-col">
            <div className="flex flex-row gap-2">
              <h1>Search</h1>
              <input 
              className='bg-[var(--ui-primary)] border border-[var(--border-color)] focus:outline-none focus:border-[var(--accent-color)] rounded-full px-5 py-1' 
              type='search' 
              value={userText}
              onFocus={() => {setIsSearchActive(true)}} 
              onChange={(e) => {setUserText(e.target.value)}}
              ></input>
            </div>
            <div className="flex flex-col gap-4">
              {isSearchActive ? 
              <>
                <div className="flex gap-4 flex-row">
                  {buttonTypes.map(({ id, label }) => {
                    return <button type="button" className={`mb-4 ${searchType === id ? 'bg-[var(--accent-color)]' : 'bg-[var(--ui-primary)]'} hover:bg-[var(--accent-color)] px-3 py-1  rounded-full`} key={id} onClick={() => {setSearchType(id)}}>{label}</button>
                  })}
                </div>
                <div className="flex absolute top-full w-full z-10 gap-2 flex-col max-h-60 overflow-y-auto bg-[var(--ui-primary)]]">
                  {userText.length > 0 && recommendations.map((rec) => {
                    return <button type="button" key={rec} className="bg-[var(--ui-primary)] hover:bg-[var(--accent-color)]" onClick={() => {
                      setUserText(rec);
                      handleSearch(rec);
                    }}>{rec}</button>
                  })}
                </div>
              </>
              : <p></p>}
            </div>
          </div>
        </form>
    </div>
  );
}
