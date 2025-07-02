'use client';
import { useState, useEffect} from 'react';
import { useParams } from 'next/navigation'

export default function Video() {
    const { videoId } = useParams();
    const [videoData, setVideoData] = useState("");

    useEffect(() => {
        async function getVideoData() {
            const response = await fetch(`/api/video?videoId=${videoId}`);
            const videoData = await response.json()
            setVideoData(videoData);
        }
        getVideoData();
    }, [videoId]);

    return (
        <div>
            <iframe 
            width="960" 
            height="540" 
            src={`https://www.youtube.com/embed/${videoId}`}
            title="YouTube video player" 
            allowFullScreen></iframe>
            <p>{videoId}</p>
        </div>
    );
};