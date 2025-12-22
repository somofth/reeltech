import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, X } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';

export const AttendanceModal: React.FC = () => {
  const { isSplashVisible } = useAppStore();
  const [isVisible, setIsVisible] = useState(false);
  const [checkedIn, setCheckedIn] = useState(false);

  useEffect(() => {
    if (!isSplashVisible) {
      const lastDate = localStorage.getItem('lastAttendanceDate');
      const today = new Date().toDateString();

      if (lastDate !== today) {
        // Delay slightly for effect
        const timer = setTimeout(() => setIsVisible(true), 500);
        return () => clearTimeout(timer);
      }
    }
  }, [isSplashVisible]);

  const handleClose = () => {
    const today = new Date().toDateString();
    localStorage.setItem('lastAttendanceDate', today);
    setIsVisible(false);
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
      {isVisible && (
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
             {/* Decorative Background */}
             <div className="absolute -top-10 -right-10 w-32 h-32 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
             <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-primary rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>

            <h2 className="text-2xl font-bold text-gray-800 mb-2 relative z-10">Daily Check-in!</h2>
            <p className="text-gray-500 mb-6 text-center text-sm relative z-10">Get your daily points to boost your earnings.</p>

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
                Claim +100 Pts
              </button>
            ) : (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-green-600 font-bold text-lg"
              >
                Success!
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
