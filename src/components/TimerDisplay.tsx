import React from 'react';
import { Skeleton } from "@/components/ui/skeleton";

interface TimerDisplayProps {
    timeLeft: number;
    isLoading: boolean;
    isImageLoaded: boolean;
}

const formatTime = (ms: number) => {
    if (ms >= 60000) return "01:00";
    const seconds = Math.floor(ms / 1000);
    const centiseconds = Math.floor((ms % 1000) / 10);
    return `${seconds.toString().padStart(2, '0')}.${centiseconds.toString().padStart(2, '0')}`;
};

export const TimerDisplay: React.FC<TimerDisplayProps> = React.memo(({ timeLeft, isLoading, isImageLoaded }) => {
    return (
        <div className="mb-3 md:mb-4 w-full">
            <div className="flex justify-between items-center mb-1">
                <span className="text-xs font-medium text-zinc-400">남은 시간</span>
                {isLoading || !isImageLoaded ? (
                    <Skeleton className="h-5 w-16" />
                ) : (
                    <span className={`text-sm font-bold font-mono ${timeLeft <= 10000 ? 'text-red-500 animate-pulse' : 'text-white'}`}>
                        {formatTime(timeLeft)}
                    </span>
                )}
            </div>
            <div className="w-full bg-zinc-800 rounded-full h-2 md:h-2.5 overflow-hidden">
                <div
                    className={`h-2 md:h-2.5 rounded-full ${timeLeft <= 10000 ? 'bg-red-500' : 'bg-white'} w-full origin-left`}
                    style={{ transform: `scaleX(${timeLeft / 60000})` }}
                ></div>
            </div>
        </div>
    );
});
