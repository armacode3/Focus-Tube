'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'

export default function SearchBar() {
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchType, setSearchType] = useState("");
  const [userText, setUserText] = useState("");
  const [recommendations, setRecommendations] = useState([]);

  const router = useRouter();

  const buttonTypes = [{id: "video", label: "Video Search"},
                       {id: "playlist", label: "Playlist Search"},
                       {id: "videoId", label: "Video ID"},
                       {id: "playlistId", label: "Playlist ID"}];

  useEffect(() => {
    if (userText.length > 0){
      const timerId = setTimeout(() => {setRecommendations(['first suggestion', 'second suggestion', 'Third', 'fourth', 'fifth', 'sixth', 'seventh', 'eigth'])}, 3000);
      return () => clearTimeout(timerId);
    } else {
      setRecommendations([]);
    }
  }, [userText]);

  return (
    <div>
        <form onSubmit={(event) => {
          event.preventDefault()
          if (searchType === "video") {
            if (userText.length !== 0) {
              router.push(`/search/${userText}?type=video`)
            }
          } else if (searchType === "playlist") {
            if (userText.length !== 0) {
              router.push(`search/${userText}?type=playlist`)
            }
          } else if (searchType === "videoId") {
            if (userText.length !== 0) {
              router.push(`/video/${userText}`)
            }
          } else if (searchType === "playlistId") {
            if (userText.length !== 0) {
              router.push(`/playlist/${userText}`)
            }
          }
        }}>
          <div className="flex gap-4 items-center flex-col">
            <div className="flex flex-row gap-2">
              <h1>Search</h1>
              <input 
              className='bg-[#505081]' 
              type='search' 
              onFocus={() => {setIsSearchActive(true)}} 
              onChange={(e) => {setUserText(e.target.value)}}
              ></input>
            </div>
            <div className="flex flex-col gap-4">
              {isSearchActive ? 
              <>
                <div className="flex gap-4 flex-row">
                  {buttonTypes.map(({ id, label }) => {
                    return <button className={searchType === id ? "bg-[#8686AC]" : "bg-[#505081]"} key={id} onClick={() => {setSearchType(id)}}>{label}</button>
                  })}
                </div>
                <div className="flex gap-2 flex-col max-h-60 overflow-y-auto bg-[#505081]">
                  {userText.length > 0 && recommendations.map((rec) => {
                    return <h1 key={rec}>{rec}</h1>
                  })}
                </div>
              </>
              : <p>Not Active</p>}
            </div>
          </div>
        </form>
    </div>
  );
}
