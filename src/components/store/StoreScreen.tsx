import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShoppingBag, CheckCircle } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { MOCK_PRODUCTS, type Product } from '../../services/mockData';

export const StoreScreen: React.FC = () => {
  const { userPoints, deductPoints, addCoupon } = useAppStore();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  const [purchaseSuccess, setPurchaseSuccess] = useState(false);

  // ... (categories and filteredProducts are unchanged)

  const categories = [
    { id: 'all', label: '전체' },
    { id: 'coffee', label: '커피/음료' },
    { id: 'convenience', label: '편의점' },
    { id: 'bakery', label: '베이커리' },
    { id: 'voucher', label: '상품권' },
  ];

  const filteredProducts = MOCK_PRODUCTS.filter(p => {
    const matchCategory = selectedCategory === 'all' || p.category === selectedCategory;
    const matchSearch = p.name.includes(searchQuery);
    return matchCategory && matchSearch;
  });

  const handlePurchase = () => {
    if (!selectedProduct) return;
    if (userPoints >= selectedProduct.price) {
      deductPoints(selectedProduct.price);
      
      // Add Coupon
      const today = new Date();
      const expiry = new Date();
      expiry.setDate(today.getDate() + 30); // 30 days validity

      addCoupon({
        id: `coupon_${Date.now()}`,
        productName: selectedProduct.name,
        category: selectedProduct.category,
        image: selectedProduct.image,
        purchaseDate: today.toLocaleDateString(),
        expiryDate: expiry.toLocaleDateString(),
        isUsed: false,
      });

      setPurchaseSuccess(true);
      setTimeout(() => {
        setPurchaseSuccess(false);
        setSelectedProduct(null);
      }, 2000); // Close after 2s
    } else {
        alert("포인트가 부족합니다!");
    }
  };

  return (
    <div className="w-full h-full bg-gray-50 flex flex-col pt-12 pb-20"> {/* Padding around */}
      {/* Header */}
      <div className="px-6 mb-2">
        <AnimatePresence>
          {!isScrolled && (
            <motion.div
              initial={{ height: 'auto', opacity: 1 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <ShoppingBag className="text-primary" />
                포인트 스토어
              </h1>
              <p className="text-gray-500 text-sm mt-1 mb-4">모은 포인트로 쇼핑하세요!</p>
            </motion.div>
          )}
        </AnimatePresence>
        
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex justify-between items-center transition-all duration-300">
             <span className="text-gray-600 font-medium">내 보유 포인트</span>
             <span className="text-xl font-bold text-primary">{userPoints.toLocaleString()} P</span>
        </div>
      </div>

      {/* Search */}
      <div className="px-6 mb-4">
        {/* ... existing search ... */}
         <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
                type="text" 
                placeholder="어떤 상품을 찾으세요?" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
        </div>
      </div>

      {/* Categories */}
      <div className="w-full overflow-x-auto no-scrollbar pl-6 mb-6 shrink-0">
        <div className="flex gap-2 w-max pr-6">
            {categories.map(cat => (
                <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                        selectedCategory === cat.id 
                        ? 'bg-primary text-white shadow-md' 
                        : 'bg-white text-gray-500 border border-gray-100'
                    }`}
                >
                    {cat.label}
                </button>
            ))}
        </div>
      </div>

      {/* Product Grid */}
      <div 
        className="flex-1 overflow-y-auto px-6"
        onScroll={(e) => setIsScrolled(e.currentTarget.scrollTop > 20)}
      >
         <div className="grid grid-cols-2 gap-4 pb-4">
            {filteredProducts.map(product => (
                <motion.div 
                    key={product.id}
                    layoutId={product.id}
                    onClick={() => setSelectedProduct(product)}
                    className="bg-white p-3 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-3 active:scale-95 transition-transform"
                >
                    <div className="aspect-square rounded-xl overflow-hidden bg-gray-100 relative">
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                        <div className="absolute top-2 right-2 bg-black/60 text-white text-[10px] px-2 py-0.5 rounded-full font-bold">
                            {(product.category === 'convenience' ? '편의점' : product.category === 'coffee' ? '카페' : '기타')}
                        </div>
                    </div>
                    <div>
                        <h3 className="font-bold text-gray-800 text-sm truncate">{product.name}</h3>
                        <p className="text-primary font-bold text-sm mt-0.5">{product.price.toLocaleString()} P</p>
                    </div>
                </motion.div>
            ))}
         </div>
      </div>

      {/* Purchase Modal */}
      <AnimatePresence>
         {selectedProduct && (
             <motion.div 
                className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 p-6 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
             >
                <motion.div 
                    className="w-full max-w-xs bg-white rounded-3xl p-6 relative overflow-hidden"
                    initial={{ scale: 0.8, y: 50 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.8, y: 50 }}
                >
                    {!purchaseSuccess ? (
                        <>
                            <div className="aspect-video bg-gray-100 rounded-xl mb-4 overflow-hidden">
                                <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-full object-cover" />
                            </div>
                            <h2 className="text-xl font-bold text-gray-900 mb-1">{selectedProduct.name}</h2>
                            <p className="text-primary font-bold text-lg mb-6">{selectedProduct.price.toLocaleString()} P</p>
                            
                            <div className="flex gap-2">
                                <button 
                                    onClick={() => setSelectedProduct(null)}
                                    className="flex-1 py-3 bg-gray-100 text-gray-600 rounded-xl font-bold"
                                >취소</button>
                                <button 
                                    onClick={handlePurchase}
                                    className={`flex-1 py-3 rounded-xl font-bold text-white shadow-lg ${
                                        userPoints >= selectedProduct.price 
                                        ? 'bg-primary hover:bg-red-600' 
                                        : 'bg-gray-300 cursor-not-allowed'
                                    }`}
                                    disabled={userPoints < selectedProduct.price}
                                >
                                    구매하기
                                </button>
                            </div>
                            {userPoints < selectedProduct.price && (
                                <p className="text-xs text-red-500 text-center mt-3">포인트가 {selectedProduct.price - userPoints}P 부족합니다.</p>
                            )}
                        </>
                    ) : (
                        <div className="flex flex-col items-center py-6">
                            <motion.div 
                                initial={{ scale: 2, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4 text-green-500"
                            >
                                <CheckCircle size={40} strokeWidth={3} />
                            </motion.div>
                            <h2 className="text-xl font-bold text-gray-800 mb-2">구매 완료!</h2>
                            <p className="text-gray-500 text-center text-sm">보관함에서 쿠폰을 확인하세요.</p>
                        </div>
                    )}
                </motion.div>
             </motion.div>
         )}
      </AnimatePresence>
    </div>
  );
};
