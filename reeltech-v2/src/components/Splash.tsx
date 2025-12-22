import { motion } from 'framer-motion';

interface SplashProps {
  onComplete: () => void;
}

const Splash = ({ onComplete }: SplashProps) => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.5, delay: 1.5 }}
      onAnimationComplete={onComplete}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center"
      >
        <div className="w-24 h-24 bg-primary rounded-3xl flex items-center justify-center shadow-lg mb-4">
          <span className="text-white text-4xl font-bold italic">R</span>
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
          Reel<span className="text-primary">Tech</span>
        </h1>
        <p className="mt-2 text-gray-400 font-medium">Watch & Earn</p>
      </motion.div>
    </motion.div>
  );
};

export default Splash;
