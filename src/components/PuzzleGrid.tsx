import React from 'react';
import { Skeleton } from "@/components/ui/skeleton";

interface PuzzleItem {
    id: string;
    pos: string;
}

interface PuzzleGridProps {
    items: PuzzleItem[];
    isLoading: boolean;
    isImageLoaded: boolean;
    aspectRatio: number;
    isGlowing: boolean;
    isGameOver: boolean;
    isWon: boolean;
    selectedIndex: number | null;
    image: string;
    onTileClick: (index: number) => void;
}

export const PuzzleGrid: React.FC<PuzzleGridProps> = React.memo(({
    items,
    isLoading,
    isImageLoaded,
    aspectRatio,
    isGlowing,
    isGameOver,
    isWon,
    selectedIndex,
    image,
    onTileClick
}) => {
    if (isLoading || !isImageLoaded) {
        return (
            <div className="grid grid-cols-4 gap-0.5 w-full bg-zinc-950 p-1 rounded-lg border border-zinc-800 mb-4 md:mb-6" style={{ aspectRatio: aspectRatio }}>
                {Array.from({ length: 16 }).map((_, i) => (
                    <Skeleton key={i} className="w-full h-full rounded-sm" />
                ))}
            </div>
        );
    }

    return (
        <div
            className={`grid grid-cols-4 gap-0.5 w-full bg-zinc-950 p-1 rounded-lg border border-zinc-800 mb-4 md:mb-6 relative transition-all duration-1000 ${isGlowing ? 'shadow-[0_0_50px_20px_rgba(255,255,255,0.5)] z-20 scale-105 border-white' : ''
                }`}
            style={{ aspectRatio: aspectRatio }}
        >
            {isGameOver && !isWon && !isGlowing && (
                <div className="absolute inset-0 z-10 bg-black/70 flex flex-col items-center justify-center rounded-lg backdrop-blur-sm">
                    <h2 className="text-2xl md:text-3xl font-bold text-red-500 mb-2">Game Over</h2>
                    <p className="text-zinc-300 text-sm md:text-base">시간이 초과되었습니다.</p>
                </div>
            )}

            {items.map((item, index) => (
                <div
                    key={index}
                    className={`w-full h-full rounded-sm overflow-hidden relative cursor-pointer transition-all duration-200 ${selectedIndex === index
                        ? 'ring-1 ring-yellow-400 ring-offset-1 ring-offset-zinc-900 z-10 scale-105'
                        : 'hover:brightness-110'
                        } ${isGlowing ? 'ring-0' : ''}`}
                    onClick={() => onTileClick(index)}
                >
                    <div
                        className="w-full h-full"
                        style={{
                            backgroundImage: `url("${image}")`,
                            backgroundSize: '400% 400%',
                            backgroundPosition: item.pos
                        }}
                    />
                </div>
            ))}
        </div>
    );
});
