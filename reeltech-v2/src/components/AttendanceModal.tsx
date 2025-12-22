import { motion, AnimatePresence } from 'framer-motion';
import { X, Check } from 'lucide-react';

interface AttendanceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AttendanceModal = ({ isOpen, onClose }: AttendanceModalProps) => {
  // MVP용 가상 데이터: 5일 코스 중 3일차 출석
  const totalDays = 5;
  const currentDay = 3;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-40 flex items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-xs bg-white rounded-3xl overflow-hidden shadow-2xl"
          >
            <button 
              onClick={onClose}
              className="absolute top-3 right-3 p-2 text-gray-400 hover:text-gray-600 transition-colors z-10"
            >
              <X size={20} />
            </button>

            <div className="p-6 flex flex-col items-center text-center">
              <h2 className="text-xl font-bold text-gray-900 mb-1">
                {currentDay}일차 출석!
              </h2>
              <p className="text-sm text-gray-500 mb-6">
                매일 출석하고 포인트 받아가세요.
              </p>

              {/* 스탬프 섹션 */}
              <div className="w-full flex justify-between items-center mb-6 px-2">
                {Array.from({ length: totalDays }).map((_, i) => {
                  const day = i + 1;
                  const isPast = day < currentDay;
                  const isToday = day === currentDay;

                  return (
                    <div key={day} className="flex flex-col items-center gap-1">
                      <div className="relative w-10 h-10 rounded-full flex items-center justify-center bg-gray-100 overflow-hidden">
                        {/* 과거 출석: 이미 찍혀있음 */}
                        {isPast && (
                          <div className="w-full h-full bg-primary/20 flex items-center justify-center">
                            <Check size={20} className="text-primary" strokeWidth={3} />
                          </div>
                        )}

                        {/* 오늘 출석: 쾅 찍히는 애니메이션 */}
                        {isToday && (
                          <motion.div
                            initial={{ scale: 2, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ 
                              type: "spring", 
                              stiffness: 400, 
                              damping: 15, 
                              delay: 0.3 
                            }}
                            className="w-full h-full bg-primary flex items-center justify-center shadow-inner"
                          >
                            <Check size={20} className="text-white" strokeWidth={3} />
                          </motion.div>
                        )}
                        
                        {/* 미래 출석: 빈칸 */}
                        {!isPast && !isToday && (
                          <span className="text-xs font-bold text-gray-300">{day}일</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* 지급 포인트 정보 (아래로 이동) */}
              <div className="w-full bg-gray-50 rounded-xl p-3 mb-4 flex justify-between items-center border border-gray-100">
                <span className="text-sm font-medium text-gray-500">오늘의 보상</span>
                <span className="text-lg font-bold text-primary">+100 P</span>
              </div>

              <button
                onClick={onClose}
                className="w-full py-3.5 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/30 active:scale-[0.98] transition-transform text-sm"
              >
                포인트 받기
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AttendanceModal;