import React, { type ReactNode } from 'react';

interface MobileLayoutProps {
  children: ReactNode;
}

export const MobileLayout: React.FC<MobileLayoutProps> = ({ children }) => {
  return (
    <div className="w-full h-full flex justify-center bg-gray-900">
      <div className="w-full max-w-[480px] h-full bg-black relative overflow-hidden shadow-2xl">
        {children}
      </div>
    </div>
  );
};
