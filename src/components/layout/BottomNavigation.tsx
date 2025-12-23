import React from 'react';
import { Home, ShoppingBag, TicketPercent } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';

export const BottomNavigation: React.FC = () => {
  const { currentView, setCurrentView } = useAppStore();

  const navItems = [
    { id: 'home' as const, label: '홈', icon: Home },
    { id: 'store' as const, label: '스토어', icon: ShoppingBag },
    { id: 'mygift' as const, label: '마이기프트', icon: TicketPercent },
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-black border-t border-gray-800 pb-safe z-40">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setCurrentView(item.id)}
            className={`flex flex-col items-center justify-center w-full h-full gap-1 ${
              currentView === item.id ? 'text-white' : 'text-gray-500 hover:text-gray-300'
            }`}
          >
            <item.icon size={24} strokeWidth={currentView === item.id ? 2.5 : 2} />
            <span className="text-[10px] font-medium">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};
