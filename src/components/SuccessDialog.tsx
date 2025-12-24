import React, { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Skeleton } from "@/components/ui/skeleton";
import gameSuccess from '@/assets/images/game_success.webp';
import { RotateCcw, Trophy, Mail } from 'lucide-react';
import { HiddenMessageDialog } from '@/components/HiddenMessageDialog';
import { motion } from 'framer-motion';

const SuccessDialogImage = () => {
    const [isLoading, setIsLoading] = useState(true);

    return (
        <div className="relative w-full aspect-video rounded-lg overflow-hidden">
            {isLoading && (
                <Skeleton className="w-full h-full absolute inset-0" />
            )}
            <img
                src={gameSuccess}
                alt="Celebration"
                className={`object-cover w-full h-full transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
                onLoad={() => setIsLoading(false)}
            />
        </div>
    );
};

interface SuccessDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    record: string;
    rank?: number;
    isRankLoading?: boolean;
    onNavigateRanking: () => void;
    onRetry: () => void;
}

export const SuccessDialog: React.FC<SuccessDialogProps> = ({
    open,
    onOpenChange,
    record,
    rank,
    isRankLoading,
    onNavigateRanking,
    onRetry
}) => {
    const [showHiddenDialog, setShowHiddenDialog] = useState(false);

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent
                className="sm:max-w-md bg-zinc-900 border-zinc-800 text-white"
                onInteractOutside={(e) => e.preventDefault()}
                onPointerDownOutside={(e) => e.preventDefault()}
                onEscapeKeyDown={(e) => e.preventDefault()}
                showCloseButton={false}
            >
                <DialogHeader>
                    <DialogTitle className="text-center text-2xl font-bold">결혼식을 구해줘서 고마워!</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col items-center space-y-4 py-4">
                    <SuccessDialogImage />
                    <DialogDescription className="text-center text-zinc-300 text-base">
                        덕분에 엉망이 될 뻔한 결혼 사진을 되살렸어!<br />
                        우리의 소중한 추억을 지켜줘서 정말 고마워.
                    </DialogDescription>
                    <div className="bg-zinc-800/50 rounded-lg border border-zinc-700 w-full flex flex-row divide-x divide-zinc-700">
                        {isRankLoading ? (
                            <div className="flex-1 py-4 flex flex-col items-center justify-center">
                                <Skeleton className="h-4 w-16 mb-2" />
                                <Skeleton className="h-9 w-24" />
                            </div>
                        ) : rank && (
                            <div className="flex-1 py-4 flex flex-col items-center justify-center">
                                <p className="text-zinc-400 text-sm mb-1">현재 순위</p>
                                <p className="text-3xl font-black text-yellow-400 drop-shadow-lg">{rank}위</p>
                            </div>
                        )}
                        <div className="flex-1 py-4 flex flex-col items-center justify-center">
                            <p className="text-zinc-400 text-sm mb-1">기록</p>
                            <p className="text-2xl font-bold text-green-400 font-mono">{record}초</p>
                        </div>
                    </div>
                </div>
                <DialogFooter className="flex flex-col gap-3 sm:justify-center">
                    <div className="flex flex-row gap-3 w-full">
                        <Button
                            onClick={() => {
                                onRetry();
                                onOpenChange(false);
                            }}
                            className="flex-1 bg-zinc-800 text-white hover:bg-zinc-700 gap-2 font-bold py-6"
                        >
                            <RotateCcw className="w-4 h-4" />
                            재도전하기
                        </Button>
                        <Button
                            onClick={onNavigateRanking}
                            className="flex-1 bg-white text-black hover:bg-zinc-200 gap-2 font-bold py-6"
                        >
                            <Trophy className="w-4 h-4" />
                            명예의 전당 확인하기
                        </Button>
                    </div>
                    {rank === 1 && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.5 }}
                            className="w-full mt-2"
                        >
                            <div
                                onClick={() => setShowHiddenDialog(true)}
                                className="group relative w-full bg-yellow-400/10 hover:bg-yellow-400/20 border-2 border-dashed border-yellow-400/50 hover:border-yellow-400 rounded-xl p-4 cursor-pointer transition-all duration-300 flex items-center justify-between gap-4 overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-yellow-400/5 group-hover:bg-yellow-400/10 transition-colors" />
                                <div className="flex items-center gap-4 relative z-10">
                                    <div className="bg-yellow-400 rounded-full p-2 text-black group-hover:scale-110 transition-transform duration-300">
                                        <Mail className="w-5 h-5" />
                                    </div>
                                    <div className="text-left">
                                        <p className="text-yellow-400 font-bold text-sm">새로운 메시지가 도착했습니다</p>
                                        <p className="text-zinc-400 text-xs">클릭하여 주인공의 편지 확인하기</p>
                                    </div>
                                </div>
                                <motion.div
                                    className="relative z-10 bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded shadow-lg"
                                    animate={{ y: [0, -4, 0] }}
                                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                                >
                                    OPEN
                                </motion.div>
                            </div>
                        </motion.div>
                    )}
                </DialogFooter>
                <HiddenMessageDialog
                    open={showHiddenDialog}
                    onOpenChange={setShowHiddenDialog}
                    onRetry={onRetry}
                    onNavigateRanking={onNavigateRanking}
                />
            </DialogContent>
        </Dialog>
    );
};
