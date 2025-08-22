'use client';
import { useState, useEffect} from 'react';
import { useParams } from 'next/navigation'
import SearchBar from '../../../components/SearchBar.js'

export default function Video() {
    const { videoId } = useParams();
    const [videoData, setVideoData] = useState(null);

    useEffect(() => {
        async function getVideoData() {
            const response = await fetch(`/api/video?videoId=${videoId}`);
            const videoData = await response.json()
            setVideoData(videoData);
        }
        getVideoData();
    }, [videoId]);

    if (!videoData || !videoData.items) {
                return <div>Loading...</div>
            }

    return (
        <div>
            <div>
                <SearchBar />
            </div>
            <div>
                <iframe 
                width="1250" 
                height="540" 
                src={`https://www.youtube.com/embed/${videoId}`}
                title="YouTube video player" 
                allowFullScreen></iframe>
            </div>
            <div>
                <h2>{videoData.items[0].snippet.title}</h2>
                <p>{videoData.items[0].snippet.channelTitle}</p>
                <p>{videoData.items[0].snippet.description}</p>
                <p>Views: {videoData.items[0].statistics.viewCount}</p>
                <p>Likes: {videoData.items[0].statistics.likeCount}</p>
            </div>
        </div>
    );
};