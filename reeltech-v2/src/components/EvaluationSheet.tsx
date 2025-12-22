import { motion, AnimatePresence } from 'framer-motion';
import { Star, X } from 'lucide-react';
import { useState } from 'react';

interface EvaluationSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

const EvaluationSheet = ({ isOpen, onClose, onSubmit }: EvaluationSheetProps) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  
  const [metrics, setMetrics] = useState({
    fun: 0,
    informative: 0,
    hook: 0
  });

  const handleSubmit = () => {
    onSubmit({ rating, metrics, comment });
    // 초기화
    setRating(0);
    setComment('');
    setMetrics({ fun: 0, informative: 0, hook: 0 });
  };

  const isFormValid = rating > 0 && comment.length >= 20;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
          />

          {/* Bottom Sheet */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-3xl max-w-[480px] mx-auto overflow-hidden flex flex-col max-h-[90vh]"
          >
            {/* Header */}
            <div className="flex justify-between items-center p-4 border-b border-gray-100">
              <h3 className="text-lg font-bold">영상 평가하기</h3>
              <button onClick={onClose} className="p-2 text-gray-400">
                <X size={24} />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="p-6 overflow-y-auto space-y-6 pb-safe">
              {/* 1. 종합 별점 */}
              <div className="text-center">
                <label className="block text-sm font-medium text-gray-500 mb-2">종합 평점</label>
                <div className="flex justify-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setRating(star)}
                      className="focus:outline-none transition-transform active:scale-90"
                    >
                      <Star
                        size={32}
                        fill={star <= rating ? "#FF003C" : "transparent"}
                        className={star <= rating ? "text-primary" : "text-gray-300"}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. 세부 지표 */}
              <div className="space-y-4 bg-gray-50 p-4 rounded-xl">
                <MetricSlider 
                  label="재미있나요?" 
                  value={metrics.fun} 
                  onChange={(v) => setMetrics({...metrics, fun: v})} 
                />
                <MetricSlider 
                  label="유익했나요?" 
                  value={metrics.informative} 
                  onChange={(v) => setMetrics({...metrics, informative: v})} 
                />
                <MetricSlider 
                  label="몰입도가 높나요?" 
                  value={metrics.hook} 
                  onChange={(v) => setMetrics({...metrics, hook: v})} 
                />
              </div>

              {/* 3. 한줄평 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  한줄평 ({comment.length}/20자)
                </label>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="최소 20자 이상 솔직한 평가를 남겨주세요."
                  className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent resize-none text-sm min-h-[100px]"
                />
              </div>

              {/* Submit Button */}
              <button
                disabled={!isFormValid}
                onClick={handleSubmit}
                className={`w-full py-4 rounded-xl font-bold text-white shadow-lg transition-all
                  ${isFormValid 
                    ? 'bg-primary shadow-primary/30 active:scale-[0.98]' 
                    : 'bg-gray-300 cursor-not-allowed shadow-none'
                  }`}
              >
                제출하고 포인트 받기
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const MetricSlider = ({ label, value, onChange }: { label: string, value: number, onChange: (v: number) => void }) => (
  <div>
    <div className="flex justify-between text-xs text-gray-500 mb-1">
      <span>{label}</span>
      <span className="font-bold text-primary">{value}점</span>
    </div>
    <input
      type="range"
      min="1"
      max="5"
      step="1"
      value={value === 0 ? 3 : value} // 초기값 3으로 시각적 처리
      onChange={(e) => onChange(Number(e.target.value))}
      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
    />
    <div className="flex justify-between text-[10px] text-gray-400 mt-1 px-1">
      <span>별로예요</span>
      <span>최고예요</span>
    </div>
  </div>
);

export default EvaluationSheet;
