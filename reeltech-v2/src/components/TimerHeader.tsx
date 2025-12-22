import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface TimerHeaderProps {
  duration: number; // 목표 시간 (초)
  isActive: boolean;
  onComplete: () => void;
  onReset: () => void;
}

const TimerHeader = ({ duration, isActive, onComplete, onReset }: TimerHeaderProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isActive && progress < 100) {
      const step = 100 / (duration * 10); // 0.1초마다 업데이트
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev + step >= 100) {
            clearInterval(interval);
            onComplete();
            return 100;
          }
          return prev + step;
        });
      }, 100);
    } else if (!isActive) {
      setProgress(0);
      onReset();
    }

    return () => clearInterval(interval);
  }, [isActive, duration]); // onComplete, onReset을 의존성 배열에서 제외하여 무한 루프 방지

  // isActive가 false가 되어 리셋될 때 외부에서 상태를 초기화할 수 있도록 처리
  useEffect(() => {
    if (!isActive) {
      setProgress(0);
    }
  }, [isActive]);

  return (
    <div className="fixed top-0 left-0 right-0 z-30 pt-safe px-4 pointer-events-none">
      <div className="flex justify-between items-center h-14 max-w-[480px] mx-auto">
        {/* 왼쪽: 로고 또는 현재 상태 */}
        <span className="font-bold text-white drop-shadow-md">ReelTech</span>

        {/* 오른쪽: 타이머 UI */}
        <div className="relative w-10 h-10 flex items-center justify-center">
          {/* 배경 원 */}
          <svg className="absolute w-full h-full transform -rotate-90">
            <circle
              cx="20"
              cy="20"
              r="16"
              stroke="rgba(255,255,255,0.3)"
              strokeWidth="4"
              fill="transparent"
            />
            {/* 진행 원 */}
            <circle
              cx="20"
              cy="20"
              r="16"
              stroke="#FF003C"
              strokeWidth="4"
              fill="transparent"
              strokeDasharray={100}
              strokeDashoffset={100 - progress}
              strokeLinecap="round"
              className="transition-all duration-100 ease-linear"
            />
          </svg>
          <span className="text-[10px] font-bold text-white">
             {Math.ceil(duration - (duration * progress) / 100)}s
          </span>
        </div>
      </div>
    </div>
  );
};

export default TimerHeader;
