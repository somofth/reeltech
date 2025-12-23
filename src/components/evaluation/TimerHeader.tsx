import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { MOCK_CAMPAIGNS } from '../../services/mockData';

interface TimerHeaderProps {
  onOpenEvaluation: () => void;
}

export const TimerHeader: React.FC<TimerHeaderProps> = ({ onOpenEvaluation }) => {
  const { activeVideoId, isVideoPlaying, currentCampaignId } = useAppStore();
  const [timeLeft, setTimeLeft] = useState(15);
  const [canEvaluate, setCanEvaluate] = useState(false);

  // Get current campaign required time
  const campaign = MOCK_CAMPAIGNS.find(c => c.id === currentCampaignId);
  const requiredTime = campaign?.requiredWatchTime || 15;

  useEffect(() => {
    // Reset timer when video changes
    setTimeLeft(requiredTime);
    setCanEvaluate(false);
  }, [activeVideoId, requiredTime]);

  useEffect(() => {
    let interval: any;
    if (isVideoPlaying && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setCanEvaluate(true);
            onOpenEvaluation(); // Auto-open when time is up
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isVideoPlaying, timeLeft, onOpenEvaluation]); // Added onOpenEvaluation to deps

  // Calculate progress percentage
  const progress = Math.max(0, Math.min(100, ((requiredTime - timeLeft) / requiredTime) * 100));

  const { isEvaluationOpen } = useAppStore();
  if (isEvaluationOpen) return null;

  return (
    <>
      <div className="absolute top-0 left-0 w-full z-20 p-6 pointer-events-none flex justify-end">
        {/* Pointer events auto for button */}
        <div className="pointer-events-auto">
          {!canEvaluate ? (
            <div className="relative overflow-hidden group">
              <div className="absolute inset-0 bg-white/20 backdrop-blur-md rounded-full" />
              <div className="relative px-5 py-2.5 rounded-full border border-white/20 flex items-center gap-2">
                 {/* Loader Ring */}
                 <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin"></div>
                 <span className="font-bold text-white text-sm tracking-wide tabular-nums">
                   {timeLeft < 10 ? `00:0${timeLeft}` : `00:${timeLeft}`} 후 평가
                 </span>
              </div>
            </div>
          ) : (
            <motion.button
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onOpenEvaluation}
              className="bg-primary text-white px-6 py-2 rounded-full font-bold shadow-lg flex items-center gap-2 animate-pulse"
            >
              <Star className="w-4 h-4 fill-white" />
              평가하기
            </motion.button>
          )}
        </div>
      </div>

      {/* Bottom Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full z-20 pointer-events-none">
        <div className="h-1.5 w-full bg-gray-800/30 backdrop-blur-sm">
          <motion.div 
            className="h-full bg-primary shadow-[0_0_10px_rgba(255,23,68,0.7)]"
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: "linear", duration: 0.5 }} // Smooth transition
          />
        </div>
      </div>
    </>
  );
};
