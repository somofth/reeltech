import React, { useEffect } from 'react';
import { type Campaign } from '../../services/mockData';
import { useAppStore } from '../../store/useAppStore';
import { CircleHelp, ThumbsUp, ThumbsDown } from 'lucide-react';

interface VideoPlayerProps {
  campaign: Campaign;
  isActive: boolean;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ campaign, isActive }) => {
  const { setVideoPlaying, isEvaluationOpen, isAttendanceOpen } = useAppStore();

  useEffect(() => {
    if (isActive && !isAttendanceOpen) {
      // Simulate video loading/starting
      setVideoPlaying(true);
    } else {
      setVideoPlaying(false);
    }
  }, [isActive, setVideoPlaying, isAttendanceOpen]);

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

      {/* Hide UI when evaluation is open */}
      {!isEvaluationOpen && (
        <>
           {/* 4. Content Overlay (Title, Client Question) - Profile removed from here */}
           <div className="absolute bottom-24 left-4 z-20 text-white pointer-events-none">
              <h3 className="text-base font-bold leading-tight shadow-black drop-shadow-lg max-w-[90%]">
                {campaign.title}
              </h3>
              <div className="mt-2 text-sm text-primary-300 font-semibold bg-black/50 px-3 py-2 rounded-lg backdrop-blur-md border border-white/10 flex items-center gap-2 w-fit max-w-[80vw]">
                <CircleHelp className="w-5 h-5 shrink-0" />
                <span className="truncate">{campaign.clientQuestion}</span>
              </div>
           </div>
    
           {/* 5. Sidebar Actions (Mock) + Profile Icon moved here */}
           <div className="absolute bottom-24 right-4 z-20 flex flex-col gap-4 items-center">
              <div className="flex flex-col items-center gap-4">
                 <div className="flex flex-col items-center gap-1">
                    <div className="w-10 h-10 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20">
                      <ThumbsUp className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-[10px] font-bold text-white drop-shadow-md">좋아요</span>
                 </div>
                 <div className="flex flex-col items-center gap-1">
                    <div className="w-10 h-10 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20">
                      <ThumbsDown className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-[10px] font-bold text-white drop-shadow-md">지루해요</span>
                 </div>
              </div>
              
              {/* Profile Icon (Moved from left content) */}
              <div className="flex flex-col items-center gap-1 mt-2">
                 <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-yellow-400 to-primary flex items-center justify-center font-bold text-xs shadow-md border-2 border-white text-white">
                   {campaign.creator[0]}
                 </div>
              </div>
           </div>
        </>
      )}
    </div>
  );
};
