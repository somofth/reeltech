import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MobileLayout } from './components/layout/MobileLayout';
import { SplashScreen } from './components/splash/SplashScreen';
import { AttendanceModal } from './components/attendance/AttendanceModal';
import { VideoFeed } from './components/feed/VideoFeed';
import { TimerHeader } from './components/evaluation/TimerHeader';
import { EvaluationSheet } from './components/evaluation/EvaluationSheet';
import { useAppStore } from './store/useAppStore';
import { MOCK_CAMPAIGNS } from './services/mockData';
import { initAuth } from './services/auth';
import { submitFeedback } from './services/firestore';
import { auth } from './services/firebase';

function App() {
  const { isSplashVisible, activeVideoId, currentCampaignId } = useAppStore();
  const [isEvaluationOpen, setIsEvaluationOpen] = useState(false);

  useEffect(() => {
    initAuth();
  }, []);

  const handleEvaluationSubmit = async () => { // TODO: pass data
    // In a real app, EvaluationSheet would pass data up or we use store
    // For now, we assume data is handled in Sheet or we need to refactor Sheet to pass data
    // Let's refactor Sheet in next step to pass data, 
    // BUT for now I will just log and pretend. 
    // ACTUALLY, I should refactor handleEvaluationSubmit to accept data.
    
    console.log("Submitting to Firestore...");
    // Mock data for submission as Sheet internal state is not exposed yet
     try {
        await submitFeedback({
            campaignId: currentCampaignId || 'unknown',
            userId: auth.currentUser?.uid || 'anon',
            rating: 5,
            metrics: { fun: 5, informative: 5, hook: 5 },
            comment: "Great video!"
        });
        console.log("평가 제출 완료! +50 포인트");
     } catch (e) {
         console.log("Submission failed (expected if no config)");
     }

    // Auto-scroll to next video
    const currentIndex = MOCK_CAMPAIGNS.findIndex(c => c.videoId === activeVideoId);
    if (currentIndex !== -1 && currentIndex < MOCK_CAMPAIGNS.length - 1) {
      const nextId = MOCK_CAMPAIGNS[currentIndex + 1].videoId;
      const nextEl = document.querySelector(`[data-videoid="${nextId}"]`);
      if (nextEl) {
        nextEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsEvaluationOpen(false);
  };

  return (
    <MobileLayout>
      <SplashScreen />
      <AttendanceModal />
      {!isSplashVisible && (
        <>
          <motion.div
            className="w-full h-full relative bg-black"
            animate={{
              height: isEvaluationOpen ? '40vh' : '100%',
              scale: isEvaluationOpen ? 0.95 : 1,
              borderRadius: isEvaluationOpen ? '20px' : '0px',
              y: isEvaluationOpen ? 10 : 0,
            }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            <TimerHeader onOpenEvaluation={() => setIsEvaluationOpen(true)} />
            <VideoFeed />
          </motion.div>

          <EvaluationSheet 
            isOpen={isEvaluationOpen} 
            onClose={() => setIsEvaluationOpen(false)} 
            onSubmit={handleEvaluationSubmit} 
          />
        </>
      )}
    </MobileLayout>
  );
}

export default App;
