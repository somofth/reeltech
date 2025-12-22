import { useEffect } from 'react';

// 외부에서 import 하지 않도록 내부 정의 (export 제거)
interface VideoData {
  id: string;
  color: string;
  title: string;
  creator: string;
  likes: number;
}

interface VideoItemProps {
  data: VideoData;
  isActive: boolean;
}

const VideoItem = ({ data, isActive }: VideoItemProps) => {
  useEffect(() => {
    if (isActive) {
      console.log(`Playing video: ${data.id}`);
    } else {
      console.log(`Pausing video: ${data.id}`);
    }
  }, [isActive, data.id]);

  return (
    <div 
      className="w-full h-full relative snap-start shrink-0 flex items-center justify-center"
      style={{ backgroundColor: data.color }}
    >
      <div className="text-white text-center">
        <h2 className="text-4xl font-bold mb-2">{data.title}</h2>
        <p className="opacity-80">
          {isActive ? "▶ Playing..." : "❚❚ Paused"}
        </p>
      </div>

      <div className="absolute right-4 bottom-24 flex flex-col gap-6 items-center z-20 text-white">
         <div className="flex flex-col items-center gap-1">
            <div className="w-10 h-10 bg-gray-800/50 rounded-full flex items-center justify-center backdrop-blur-sm">
               ❤️
            </div>
            <span className="text-xs font-bold shadow-black drop-shadow-md">{data.likes}</span>
         </div>
         <div className="flex flex-col items-center gap-1">
            <div className="w-10 h-10 bg-gray-800/50 rounded-full flex items-center justify-center backdrop-blur-sm">
               💬
            </div>
            <span className="text-xs font-bold shadow-black drop-shadow-md">12</span>
         </div>
      </div>

      <div className="absolute left-0 bottom-0 w-full p-4 pb-24 bg-gradient-to-t from-black/60 to-transparent z-10 text-white">
        <h3 className="font-bold text-lg mb-1">@{data.creator}</h3>
        <p className="text-sm opacity-90 line-clamp-2">
          이 영상은 #릴테크 #앱테크 예시 영상입니다. 재미있게 봐주세요! 
        </p>
      </div>
    </div>
  );
};

export default VideoItem;
