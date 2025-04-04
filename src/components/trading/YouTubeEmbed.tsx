
import { useState, useEffect } from 'react';

interface YouTubeEmbedProps {
  url: string;
  title: string;
}

const YouTubeEmbed = ({ url, title }: YouTubeEmbedProps) => {
  const [videoId, setVideoId] = useState<string | null>(null);
  
  useEffect(() => {
    if (!url) return;
    
    try {
      // Extract video ID from YouTube URL
      let extractedId = null;
      
      // Handle youtube.com/watch?v=VIDEO_ID
      if (url.includes('youtube.com/watch')) {
        const urlParams = new URLSearchParams(new URL(url).search);
        extractedId = urlParams.get('v');
      } 
      // Handle youtu.be/VIDEO_ID
      else if (url.includes('youtu.be/')) {
        extractedId = url.split('youtu.be/')[1].split('?')[0];
      }
      // Handle youtube.com/embed/VIDEO_ID
      else if (url.includes('youtube.com/embed/')) {
        extractedId = url.split('youtube.com/embed/')[1].split('?')[0];
      }
      
      setVideoId(extractedId);
    } catch (error) {
      console.error('Error parsing YouTube URL:', error);
      setVideoId(null);
    }
  }, [url]);
  
  if (!videoId) return null;
  
  return (
    <div className="aspect-video w-full mb-6 rounded-md overflow-hidden">
      <iframe
        src={`https://www.youtube.com/embed/${videoId}`}
        title={title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="w-full h-full"
      ></iframe>
    </div>
  );
};

export default YouTubeEmbed;
