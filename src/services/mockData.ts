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

export interface Product {
  id: string;
  name: string;
  category: 'convenience' | 'bakery' | 'coffee' | 'voucher';
  price: number;
  image: string;
}

export const MOCK_PRODUCTS: Product[] = [
  { id: 'p1', name: '아이스 아메리카노', category: 'coffee', price: 4500, image: 'https://picsum.photos/seed/coffee/200/200' },
  { id: 'p2', name: '카페 라떼', category: 'coffee', price: 5000, image: 'https://picsum.photos/seed/latte/200/200' },
  { id: 'p3', name: '편의점 3천원권', category: 'convenience', price: 3000, image: 'https://picsum.photos/seed/cu/200/200' },
  { id: 'p4', name: '단팥빵', category: 'bakery', price: 1500, image: 'https://picsum.photos/seed/bread/200/200' },
  { id: 'p5', name: '문화상품권 5천원', category: 'voucher', price: 5000, image: 'https://picsum.photos/seed/voucher/200/200' },
  { id: 'p6', name: '조각 케이크', category: 'bakery', price: 6500, image: 'https://picsum.photos/seed/cake/200/200' },
  { id: 'p7', name: '초코 우유 200ml', category: 'convenience', price: 1200, image: 'https://picsum.photos/seed/chocomilk/200/200' },
  { id: 'p8', name: '햄치즈 샌드위치', category: 'bakery', price: 4800, image: 'https://picsum.photos/seed/sandwich/200/200' },
  { id: 'p9', name: '백화점 상품권 1만원', category: 'voucher', price: 10000, image: 'https://picsum.photos/seed/giftcard/200/200' },
  { id: 'p10', name: '딸기 요거트 스무디', category: 'coffee', price: 5800, image: 'https://picsum.photos/seed/strawberry/200/200' },
];
