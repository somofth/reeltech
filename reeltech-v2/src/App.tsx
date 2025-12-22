import { useState, useRef, useEffect } from 'react';
import Splash from './components/Splash';
import AttendanceModal from './components/AttendanceModal';
import BottomNav from './components/BottomNav';
import VideoItem from './components/VideoItem'; // VideoItem만 가져옴
import TimerHeader from './components/TimerHeader';
import EvaluationSheet from './components/EvaluationSheet';
import { AnimatePresence, motion } from 'framer-motion';
import { Edit3 } from 'lucide-react';

// App.tsx 내부에서 사용할 인터페이스 정의
interface VideoData {
  id: string;
  color: string;
  title: string;
  creator: string;
  likes: number;
}

const MOCK_VIDEOS: VideoData[] = [
  { id: '1', color: '#FF5733', title: 'Video 1', creator: 'user_01', likes: 120 },
  { id: '2', color: '#33C1FF', title: 'Video 2', creator: 'creative_kim', likes: 85 },
  { id: '3', color: '#8E44AD', title: 'Video 3', creator: 'dancer_lee', likes: 1200 },
  { id: '4', color: '#27AE60', title: 'Video 4', creator: 'foodie_park', likes: 450 },
  { id: '5', color: '#F1C40F', title: 'Video 5', creator: 'traveler_choi', likes: 320 },
];

function App() {
  const [isSplashing, setIsSplashing] = useState(true);
  const [showAttendance, setShowAttendance] = useState(false);
  const [activeTab, setActiveTab] = useState<'home' | 'store' | 'mypage'>('home');
  const [currentVideoId, setCurrentVideoId] = useState<string>(MOCK_VIDEOS[0].id);

  const [isTimerActive, setIsTimerActive] = useState(false);
  const [canEvaluate, setCanEvaluate] = useState(false);
  const [showEvaluation, setShowEvaluation] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('data-id');
            if (id && id !== currentVideoId) {
              setCurrentVideoId(id);
              setCanEvaluate(false);
              setIsTimerActive(false);
              setTimeout(() => setIsTimerActive(true), 100);
            }
          }
        });
      },
      { threshold: 0.7 } 
    );

    const videoElements = container.querySelectorAll('.video-item');
    videoElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [currentVideoId, isSplashing]);

  useEffect(() => {
    if (!isSplashing && !showAttendance) {
      setIsTimerActive(true);
    }
  }, [isSplashing, showAttendance]);

  const handleSplashComplete = () => {
    setIsSplashing(false);
    const lastCheck = localStorage.getItem('lastAttendance');
    const today = new Date().toDateString();
    if (lastCheck !== today) {
      setShowAttendance(true);
      localStorage.setItem('lastAttendance', today);
    } else {
       setIsTimerActive(true);
    }
  };

  const handleTimerComplete = () => {
    setCanEvaluate(true);
    setIsTimerActive(false);
  };

  const handleEvaluationSubmit = (data: any) => {
    console.log("Evaluation Submitted:", data);
    setShowEvaluation(false);
    alert(`평가가 완료되었습니다! (+${data.rating * 10}P 지급)`);
  };

  if (isSplashing) {
    return <Splash onComplete={handleSplashComplete} />;
  }

  return (
    <div className="relative h-screen bg-black overflow-hidden flex flex-col font-sans">
      
      {activeTab === 'home' && (
        <TimerHeader 
          duration={5}
          isActive={isTimerActive}
          onComplete={handleTimerComplete}
          onReset={() => setCanEvaluate(false)}
        />
      )}

      <div className="flex-1 relative h-full">
        {activeTab === 'home' && (
          <>
             <div 
               ref={containerRef}
               className="h-full overflow-y-scroll snap-y snap-mandatory scrollbar-hide"
               style={{ scrollBehavior: 'smooth' }}
             >
               {MOCK_VIDEOS.map((video) => (
                 <div key={video.id} data-id={video.id} className="video-item h-full snap-start w-full">
                   <VideoItem 
                     data={video as any} // 타입 충돌 방지를 위해 any 처리 (구조는 동일함)
                     isActive={currentVideoId === video.id} 
                   />
                 </div>
               ))}
             </div>

             <AnimatePresence>
               {canEvaluate && !showEvaluation && (
                 <motion.button
                   initial={{ scale: 0, opacity: 0 }}
                   animate={{ scale: 1, opacity: 1 }}
                   exit={{ scale: 0, opacity: 0 }}
                   whileHover={{ scale: 1.1 }}
                   whileTap={{ scale: 0.9 }}
                   onClick={() => setShowEvaluation(true)}
                   className="absolute bottom-6 right-6 z-20 bg-primary text-white p-4 rounded-full shadow-lg shadow-primary/40 flex items-center gap-2 pr-6"
                 >
                   <Edit3 size={24} />
                   <span className="font-bold">평가하기</span>
                 </motion.button>
               )}
             </AnimatePresence>
           </>
        )}

        {activeTab === 'store' && (
          <div className="h-full flex items-center justify-center bg-gray-50 text-gray-400">
            상점 페이지 준비 중...
          </div>
        )}

        {activeTab === 'mypage' && (
          <div className="h-full flex items-center justify-center bg-gray-50 text-gray-400">
            마이 페이지 준비 중...
          </div>
        )}
      </div>

      {!showEvaluation && (
        <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
      )}

      <AttendanceModal 
        isOpen={showAttendance} 
        onClose={() => {
           setShowAttendance(false);
           setIsTimerActive(true);
        }} 
      />

      <EvaluationSheet 
        isOpen={showEvaluation} 
        onClose={() => setShowEvaluation(false)} 
        onSubmit={handleEvaluationSubmit}
      />
    </div>
  );
}

export default App;