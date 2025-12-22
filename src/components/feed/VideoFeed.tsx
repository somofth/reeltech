import React, { useEffect, useRef } from 'react';
import { VideoPlayer } from './VideoPlayer';
import { MOCK_CAMPAIGNS } from '../../services/mockData';
import { useAppStore } from '../../store/useAppStore';

export const VideoFeed: React.FC = () => {
  const { activeVideoId, setActiveVideoId, setCurrentCampaignId } = useAppStore();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Set initial active video
    if (MOCK_CAMPAIGNS.length > 0 && !activeVideoId) {
      setActiveVideoId(MOCK_CAMPAIGNS[0].videoId);
      setCurrentCampaignId(MOCK_CAMPAIGNS[0].id);
    }
  }, [setActiveVideoId, setCurrentCampaignId, activeVideoId]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const videoId = entry.target.getAttribute('data-videoid');
            const campaignId = entry.target.getAttribute('data-campaignid');
            if (videoId && campaignId) {
              setActiveVideoId(videoId);
              setCurrentCampaignId(campaignId);
            }
          }
        });
      },
      {
        root: containerRef.current,
        threshold: 0.6, // Trigger when 60% visible
      }
    );

    const elements = containerRef.current?.querySelectorAll('.video-container');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [setActiveVideoId, setCurrentCampaignId]);

  return (
    <div 
      ref={containerRef}
      className="w-full h-full overflow-y-scroll snap-y snap-mandatory no-scrollbar bg-black"
    >
      {MOCK_CAMPAIGNS.map((campaign) => (
        <div 
          key={campaign.id} 
          className="video-container w-full h-full snap-start snap-always"
          data-videoid={campaign.videoId}
          data-campaignid={campaign.id}
        >
          <VideoPlayer 
            campaign={campaign} 
            isActive={activeVideoId === campaign.videoId} 
          />
        </div>
      ))}
    </div>
  );
};
