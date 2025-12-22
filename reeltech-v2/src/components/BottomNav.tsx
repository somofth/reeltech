import { Home, ShoppingBag, User } from 'lucide-react';

interface BottomNavProps {
  activeTab: 'home' | 'store' | 'mypage';
  onTabChange: (tab: 'home' | 'store' | 'mypage') => void;
}

const BottomNav = ({ activeTab, onTabChange }: BottomNavProps) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 bg-black text-white border-t border-gray-800 pb-safe">
      <div className="flex justify-around items-center h-16 max-w-[480px] mx-auto">
        <button 
          onClick={() => onTabChange('home')}
          className={`flex flex-col items-center gap-1 p-2 ${activeTab === 'home' ? 'text-white' : 'text-gray-500'}`}
        >
          <Home size={24} strokeWidth={activeTab === 'home' ? 3 : 2} />
          <span className="text-[10px] font-medium">홈</span>
        </button>

        <button 
          onClick={() => onTabChange('store')}
          className={`flex flex-col items-center gap-1 p-2 ${activeTab === 'store' ? 'text-white' : 'text-gray-500'}`}
        >
          <ShoppingBag size={24} strokeWidth={activeTab === 'store' ? 3 : 2} />
          <span className="text-[10px] font-medium">상점</span>
        </button>

        <button 
          onClick={() => onTabChange('mypage')}
          className={`flex flex-col items-center gap-1 p-2 ${activeTab === 'mypage' ? 'text-white' : 'text-gray-500'}`}
        >
          <User size={24} strokeWidth={activeTab === 'mypage' ? 3 : 2} />
          <span className="text-[10px] font-medium">마이</span>
        </button>
      </div>
    </div>
  );
};

export default BottomNav;
