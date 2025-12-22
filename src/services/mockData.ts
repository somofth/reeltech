export interface Campaign {
  id: string;
  platform: 'youtube' | 'instagram';
  videoId: string;
  title: string;
  creator: string;
  requiredWatchTime: number; // seconds
  clientQuestion: string; // One-line question from the client
}

export const MOCK_CAMPAIGNS: Campaign[] = [
  {
    id: 'c1',
    platform: 'youtube',
    videoId: 'qC_wF7_F9jI', // Example ID (Shorts)
    title: '키네틱 샌드 ASMR 모음',
    creator: '샌드_아티스트',
    requiredWatchTime: 10,
    clientQuestion: '소리가 너무 자극적이지 않나요?',
  },
  {
    id: 'c2',
    platform: 'youtube',
    videoId: 'WJ3-F02-F_Y', // Example ID
    title: '고양이의 하루 브이로그',
    creator: '냐옹튜브',
    requiredWatchTime: 15,
    clientQuestion: '자막 속도가 읽기 적당한가요?',
  },
  {
    id: 'c3',
    platform: 'youtube',
    videoId: 'tMwVmC1a1j8', // Example ID
    title: '집에서 만드는 초밥 레시피',
    creator: '요리왕_K',
    requiredWatchTime: 12,
    clientQuestion: '레시피 설명이 이해하기 쉬운가요?',
  },
];
