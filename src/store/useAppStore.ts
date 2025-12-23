import { create } from 'zustand';

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
}));
