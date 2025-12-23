import React, { useEffect } from 'react';
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
import { StoreScreen } from './components/store/StoreScreen';
import { MyGiftScreen } from './components/profile/MyGiftScreen';

function App() {
  const { isSplashVisible, activeVideoId, currentCampaignId, isEvaluationOpen, setEvaluationOpen, currentView } = useAppStore();

  useEffect(() => {
    initAuth();

    // Trigger for testing: Shift + X
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.shiftKey && (e.key === 'X' || e.key === 'x')) {
        console.log("Debug Trigger: Opening Evaluation Sheet");
        setEvaluationOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setEvaluationOpen]);

  const handleEvaluationSubmit = async () => {
    // 1. Optimistic UI Update: Close modal immediately for responsiveness
    setEvaluationOpen(false);

    // 2. Schedule Auto-scroll (wait for exit animation)
    setTimeout(() => {
      // Use getState() to ensure we have the latest activeVideoId
      const freshActiveId = useAppStore.getState().activeVideoId;
      const currentIndex = MOCK_CAMPAIGNS.findIndex(c => c.videoId === freshActiveId);
      
      if (currentIndex !== -1 && currentIndex < MOCK_CAMPAIGNS.length - 1) {
        const nextId = MOCK_CAMPAIGNS[currentIndex + 1].videoId;
        const nextEl = document.querySelector(`[data-videoid="${nextId}"]`);
        
        if (nextEl) {
          nextEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    }, 500);

    // 3. Process Background Submission
    console.log("Submitting to Firestore...");
     try {
        await submitFeedback({
            campaignId: currentCampaignId || 'unknown',
            userId: auth.currentUser?.uid || 'anon',
            rating: 5, // TODO: Receive actual data from sheet
            metrics: { fun: 5, informative: 5, hook: 5 },
            comment: "Great video!" 
        });
        console.log("평가 제출 완료! +50 포인트");
     } catch (e) {
         console.log("Submission failed (expected if no config)");
     }
  };

  return (
    <MobileLayout>
      <SplashScreen />
      <AttendanceModal />
      {!isSplashVisible && (
        <>
          {currentView === 'home' && (
            <>
              <motion.div
                className="relative bg-black mx-auto overflow-hidden shadow-2xl"
                animate={{
                  height: isEvaluationOpen ? '40vh' : '100%',
                  width: isEvaluationOpen ? '56%' : '100%', // Approx 9:16 aspect ratio width relative to screen
                  borderRadius: isEvaluationOpen ? '20px' : '0px',
                  y: isEvaluationOpen ? 16 : 0,
                }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              >
                <TimerHeader onOpenEvaluation={() => setEvaluationOpen(true)} />
                <VideoFeed />
              </motion.div>

              <EvaluationSheet 
                isOpen={isEvaluationOpen} 
                onClose={() => setEvaluationOpen(false)} 
                onSubmit={handleEvaluationSubmit} 
              />
            </>
          )}

          {currentView === 'store' && <StoreScreen />}
          
          {currentView === 'mygift' && <MyGiftScreen />}
        </>
      )}
    </MobileLayout>
  );
}

export default App;
