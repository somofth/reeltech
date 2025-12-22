export interface Campaign {
  id: string;
  platform: 'youtube' | 'instagram';
  videoId: string;
  title: string;
  creator: string;
  requiredWatchTime: number; // seconds
}

export const MOCK_CAMPAIGNS: Campaign[] = [
  {
    id: 'c1',
    platform: 'youtube',
    videoId: 'qC_wF7_F9jI', // Example ID (Shorts)
    title: 'Satisfying Kinetic Sand',
    creator: 'ASMR King',
    requiredWatchTime: 10,
  },
  {
    id: 'c2',
    platform: 'youtube',
    videoId: 'WJ3-F02-F_Y', // Example ID
    title: 'Cat Fails 2024',
    creator: 'MeowTube',
    requiredWatchTime: 15,
  },
  {
    id: 'c3',
    platform: 'youtube',
    videoId: 'tMwVmC1a1j8', // Example ID
    title: 'How to make Sushi',
    creator: 'Chef K',
    requiredWatchTime: 12,
  },
];
