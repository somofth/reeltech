import { create } from 'zustand';

export interface Coupon {
  id: string;
  productName: string;
  category: string;
  image: string;
  purchaseDate: string;
  expiryDate: string;
  isUsed: boolean;
}

interface AppState {
  isSplashVisible: boolean;
  setSplashVisible: (visible: boolean) => void;
  isAuthenticated: boolean;
  setAuthenticated: (auth: boolean) => void;
  
  // Video & Campaign State
  activeVideoId: string | null;
  setActiveVideoId: (id: string | null) => void;
  currentCampaignId: string | null;
  setCurrentCampaignId: (id: string | null) => void;
  isVideoPlaying: boolean;
  setVideoPlaying: (playing: boolean) => void;
  isEvaluationOpen: boolean;
  setEvaluationOpen: (open: boolean) => void;
  isAttendanceOpen: boolean;
  setAttendanceOpen: (open: boolean) => void;

  // Global Navigation & Points
  currentView: 'home' | 'store' | 'mygift';
  setCurrentView: (view: 'home' | 'store' | 'mygift') => void;
  userPoints: number;
  addPoints: (amount: number) => void;
  deductPoints: (amount: number) => void;
  
  myCoupons: Coupon[];
  addCoupon: (coupon: Coupon) => void;
}

export const useAppStore = create<AppState>((set) => ({
  isSplashVisible: true,
  setSplashVisible: (visible) => set({ isSplashVisible: visible }),
  isAuthenticated: false,
  setAuthenticated: (auth) => set({ isAuthenticated: auth }),
  
  activeVideoId: null,
  setActiveVideoId: (id) => set({ activeVideoId: id }),
  currentCampaignId: null,
  setCurrentCampaignId: (id) => set({ currentCampaignId: id }),
  isVideoPlaying: false,
  setVideoPlaying: (playing) => set({ isVideoPlaying: playing }),
  isEvaluationOpen: false,
  setEvaluationOpen: (open) => set({ isEvaluationOpen: open }),
  isAttendanceOpen: false,
  setAttendanceOpen: (open) => set({ isAttendanceOpen: open }),

  currentView: 'home',
  setCurrentView: (view) => set({ currentView: view }),
  userPoints: 3500,
  addPoints: (amount) => set((state) => ({ userPoints: state.userPoints + amount })),
  deductPoints: (amount) => set((state) => ({ userPoints: Math.max(0, state.userPoints - amount) })),
  
  myCoupons: [
    {
      id: 'mock_c1',
      productName: '아이스 아메리카노',
      category: 'coffee',
      image: 'https://picsum.photos/seed/coffee/200/200',
      purchaseDate: '2025. 12. 20',
      expiryDate: '2026. 01. 19',
      isUsed: false,
    },
    {
      id: 'mock_c2',
      productName: '문화상품권 5천원',
      category: 'voucher',
      image: 'https://picsum.photos/seed/voucher/200/200',
      purchaseDate: '2025. 12. 21',
      expiryDate: '2026. 01. 20',
      isUsed: false,
    }
  ],
  addCoupon: (coupon) => set((state) => ({ myCoupons: [coupon, ...state.myCoupons] })),
}));
