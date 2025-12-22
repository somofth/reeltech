import React, { useEffect } from 'react';
import { type Campaign } from '../../services/mockData';
import { useAppStore } from '../../store/useAppStore';

interface VideoPlayerProps {
  campaign: Campaign;
  isActive: boolean;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ campaign, isActive }) => {
  const { setVideoPlaying } = useAppStore();

  useEffect(() => {
    if (isActive) {
      // Simulate video loading/starting
      setVideoPlaying(true);
    } else {
      setVideoPlaying(false);
    }
  }, [isActive, setVideoPlaying]);

  return (
    <div className="w-full h-full relative bg-gray-900 flex items-center justify-center snap-center shrink-0 overflow-hidden">
      {/* 1. Background Image (Mock Video) */}
      <img 
        src={`https://picsum.photos/seed/${campaign.videoId}/480/854`} 
        alt="Video Thumbnail"
        className="absolute inset-0 w-full h-full object-cover opacity-80"
      />

      {/* 2. Gradient Overlays for Readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/80 pointer-events-none" />

      {/* 3. Simulated Play Button / Status (Optional aesthetic) */}
      {!isActive && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 z-10">
             {/* Icon placeholder if needed */}
        </div>
      )}

       {/* 4. Content Overlay (Title, Creator) */}
       <div className="absolute bottom-24 left-4 z-20 text-white pointer-events-none">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-400 to-primary flex items-center justify-center font-bold text-xs shadow-md">
              {campaign.creator[0]}
            </div>
            <p className="font-semibold text-sm drop-shadow-md">@{campaign.creator}</p>
          </div>
          <h3 className="text-xl font-bold leading-tight shadow-black drop-shadow-lg max-w-[80%]">
            {campaign.title}
          </h3>
          <p className="text-xs text-gray-200 mt-1 opacity-80 line-clamp-2">
            #shorts #reeltech #apptech #trend
          </p>
       </div>

       {/* 5. Sidebar Actions (Mock) */}
       <div className="absolute bottom-24 right-2 z-20 flex flex-col gap-4 items-center">
          <div className="flex flex-col items-center gap-1">
             <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center">
               <span className="text-xl">❤️</span>
             </div>
             <span className="text-xs font-bold text-white">1.2k</span>
          </div>
          <div className="flex flex-col items-center gap-1">
             <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center">
               <span className="text-xl">💬</span>
             </div>
             <span className="text-xs font-bold text-white">342</span>
          </div>
          <div className="flex flex-col items-center gap-1">
             <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center">
               <span className="text-xl">🔗</span>
             </div>
             <span className="text-xs font-bold text-white">Share</span>
          </div>
       </div>
    </div>
  );
};
