import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';

export const SplashScreen: React.FC = () => {
  const { isSplashVisible, setSplashVisible } = useAppStore();

  useEffect(() => {
    // Simulate auth check and splash delay
    const timer = setTimeout(() => {
      setSplashVisible(false);
    }, 2000); // 1.5-2s

    return () => clearTimeout(timer);
  }, [setSplashVisible]);

  return (
    <AnimatePresence>
      {isSplashVisible && (
        <motion.div
          className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-primary text-white"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex flex-col items-center"
          >
            <div className="bg-white p-4 rounded-full mb-4 shadow-lg">
              <Play className="w-12 h-12 text-primary fill-primary" />
            </div>
            <h1 className="text-3xl font-bold tracking-wider">ReelTech</h1>
            <p className="mt-2 text-sm opacity-80">숏폼 보고 돈 버는 앱, 릴테크</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
