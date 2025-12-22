import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, ThumbsUp } from 'lucide-react';

interface EvaluationSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
}

export const EvaluationSheet: React.FC<EvaluationSheetProps> = ({ isOpen, onClose, onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [metrics, setMetrics] = useState({ fun: 0, informative: 0, hook: 0 });
  const [comment, setComment] = useState('');

  const isValid = rating > 0 && comment.length >= 20;

  const handleSubmit = () => {
    if (!isValid) return;
    onSubmit();
    // Reset form
    setRating(0);
    setMetrics({ fun: 0, informative: 0, hook: 0 });
    setComment('');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Sheet - No Backdrop, fixed height */}
          <motion.div
            className="absolute bottom-0 left-0 w-full bg-white rounded-t-3xl z-50 p-6 shadow-2xl overflow-y-auto h-[60vh]"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-800">영상 평가</h3>
              <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
                <X size={24} className="text-gray-500" />
              </button>
            </div>

            {/* Overall Rating */}
            <div className="mb-6 flex flex-col items-center">
              <label className="text-sm font-semibold text-gray-500 mb-2">종합 평점</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setRating(star)}
                    className="focus:outline-none transition-transform active:scale-90"
                  >
                    <Star 
                      size={32} 
                      className={`${star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Detailed Metrics */}
            <div className="space-y-4 mb-6">
              {[
                { label: '재미', key: 'fun' },
                { label: '유익함', key: 'informative' },
                { label: '몰입도', key: 'hook' },
              ].map((metric) => (
                <div key={metric.key} className="flex flex-col">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">{metric.label}</span>
                    <span className="text-xs text-primary font-bold">{metrics[metric.key as keyof typeof metrics]} / 5</span>
                  </div>
                  <div className="flex justify-between bg-gray-100 p-2 rounded-lg">
                    {[1, 2, 3, 4, 5].map((val) => (
                       <button
                         key={val}
                         onClick={() => setMetrics(prev => ({ ...prev, [metric.key]: val }))}
                         className={`w-8 h-8 rounded-full text-sm font-bold transition-colors ${
                            metrics[metric.key as keyof typeof metrics] === val 
                            ? 'bg-primary text-white shadow-md' 
                            : 'bg-white text-gray-400 hover:bg-gray-200'
                         }`}
                       >
                         {val}
                       </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Comment */}
            <div className="mb-6">
              <label className="text-sm font-semibold text-gray-500 mb-2 block">
                한줄평 <span className="text-xs font-normal text-gray-400">({comment.length}/20자 이상)</span>
              </label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="영상에 대한 솔직한 평가를 남겨주세요 (20자 이상)..."
                className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none h-24"
              />
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={!isValid}
              className={`w-full py-4 rounded-xl font-bold text-white shadow-lg transition-all flex items-center justify-center gap-2 ${
                isValid ? 'bg-primary hover:bg-red-600 active:scale-95' : 'bg-gray-300 cursor-not-allowed'
              }`}
            >
              <ThumbsUp size={20} />
              평가 제출하기
            </button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
