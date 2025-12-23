import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, X } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';

export const AttendanceModal: React.FC = () => {
  const { isSplashVisible, isAttendanceOpen, setAttendanceOpen } = useAppStore();
  const [checkedIn, setCheckedIn] = useState(false);

  useEffect(() => {
    if (!isSplashVisible) {
      const lastDate = localStorage.getItem('lastAttendanceDate');
      const today = new Date().toDateString();

      if (lastDate !== today) {
        // Delay slightly for effect
        const timer = setTimeout(() => setAttendanceOpen(true), 500);
        return () => clearTimeout(timer);
      }
    }
  }, [isSplashVisible, setAttendanceOpen]);

  const handleClose = () => {
    const today = new Date().toDateString();
    localStorage.setItem('lastAttendanceDate', today);
    setAttendanceOpen(false);
  };

  const handleClaim = () => {
    setCheckedIn(true);
    // Wait for animation then close
    setTimeout(() => {
      handleClose();
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isAttendanceOpen && (
        <motion.div
          className="absolute inset-0 z-40 flex items-center justify-center bg-black/70 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="w-4/5 max-w-sm bg-white rounded-2xl p-6 flex flex-col items-center shadow-2xl relative overflow-hidden"
            initial={{ scale: 0.8, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.8, y: 50 }}
          >
             {/* Decorative Background Removed */}

            <h2 className="text-2xl font-bold text-gray-800 mb-2 relative z-10">매일매일 출석체크!</h2>
            <p className="text-gray-500 mb-6 text-center text-sm relative z-10">오늘도 출석하고 포인트를 받아보세요.</p>

            <div className="relative mb-6">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center border-4 border-dashed border-gray-300">
                {!checkedIn ? (
                   <span className="text-3xl font-bold text-gray-400">?</span>
                ) : (
                  <motion.div
                    initial={{ scale: 2, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  >
                    <CheckCircle className="w-16 h-16 text-green-500" />
                  </motion.div>
                )}
              </div>
            </div>

            {!checkedIn ? (
              <button
                onClick={handleClaim}
                className="w-full py-3 bg-primary text-white rounded-xl font-bold shadow-lg hover:bg-red-600 transition-colors relative z-10"
              >
                100P 받기
              </button>
            ) : (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-green-600 font-bold text-lg"
              >
                지급 완료!
              </motion.div>
            )}

            <button
               onClick={handleClose}
               className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X size={20} />
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
