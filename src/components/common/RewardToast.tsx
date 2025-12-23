import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift } from 'lucide-react';

interface RewardToastProps {
  isVisible: boolean;
}

export const RewardToast: React.FC<RewardToastProps> = ({ isVisible }) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1.1 }}
          exit={{ opacity: 0, y: -20, scale: 0.9 }}
          transition={{ type: 'spring', damping: 15, stiffness: 200 }}
          className="fixed bottom-24 left-0 right-0 z-[100] flex justify-center pointer-events-none"
        >
          <div className="bg-primary px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 border-2 border-white/20 backdrop-blur-sm">
            <Gift className="text-white w-6 h-6 animate-bounce" />
            <span className="text-white font-extrabold text-lg tracking-wide drop-shadow-md">
              100포인트 획득!
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
