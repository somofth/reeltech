import React from 'react';
import { motion } from 'framer-motion';
import { TicketPercent, Clock } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';

export const MyGiftScreen: React.FC = () => {
  const { myCoupons } = useAppStore();

  return (
    <div className="w-full h-full bg-gray-50 flex flex-col pt-12 pb-20">
      {/* Header */}
      <div className="px-6 mb-6">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <TicketPercent className="text-primary" />
          마이 기프트
        </h1>
        <p className="text-gray-500 text-sm mt-1">구매한 쿠폰을 확인하세요.</p>
      </div>

      {/* Coupon List */}
      <div className="flex-1 overflow-y-auto px-6">
        {myCoupons.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-gray-400">
             <TicketPercent size={48} className="mb-4 opacity-20" />
             <p>보유한 쿠폰이 없습니다.</p>
             <p className="text-xs mt-1">스토어에서 상품을 구매해보세요!</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4 pb-4">
            {myCoupons.map((coupon) => (
              <motion.div 
                key={coupon.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex gap-4"
              >
                 <div className="w-20 h-20 bg-gray-100 rounded-xl shrink-0 overflow-hidden">
                    <img src={coupon.image} alt={coupon.productName} className="w-full h-full object-cover" />
                 </div>
                 <div className="flex-1 flex flex-col justify-center">
                    <div className="flex justify-between items-start mb-1">
                       <span className="text-[10px] font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                         {coupon.category === 'convenience' ? '편의점' : coupon.category === 'coffee' ? '카페' : '기타'}
                       </span>
                    </div>
                    <h3 className="font-bold text-gray-800 text-sm mb-2">{coupon.productName}</h3>
                    <div className="flex items-center gap-1.5 text-xs text-primary font-medium">
                        <Clock size={12} />
                        <span>{coupon.expiryDate} 까지</span>
                    </div>
                 </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
