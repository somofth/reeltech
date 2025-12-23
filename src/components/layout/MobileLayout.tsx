import React, { type ReactNode } from 'react';
import { BottomNavigation } from './BottomNavigation';

interface MobileLayoutProps {
  children: ReactNode;
}

export const MobileLayout: React.FC<MobileLayoutProps> = ({ children }) => {
  return (
    <div className="w-full h-full flex justify-center bg-gray-900">
      <div className="w-full max-w-[480px] h-full bg-black relative overflow-hidden shadow-2xl flex flex-col">
        <main className="flex-1 relative overflow-hidden">
          {children}
        </main>
        <BottomNavigation />
      </div>
    </div>
  );
};
