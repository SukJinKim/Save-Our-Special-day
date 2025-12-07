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
import gameSuccess from '@/assets/images/game_success.png';

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
    onNavigateRanking: () => void;
}

export const SuccessDialog: React.FC<SuccessDialogProps> = ({
    open,
    onOpenChange,
    record,
    onNavigateRanking
}) => {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent
                className="sm:max-w-md bg-zinc-900 border-zinc-800 text-white"
                onInteractOutside={(e) => e.preventDefault()}
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
                    <div className="bg-zinc-800/50 px-6 py-3 rounded-lg border border-zinc-700">
                        <p className="text-zinc-400 text-sm mb-1">기록</p>
                        <p className="text-2xl font-bold text-green-400 font-mono">{record}초</p>
                    </div>
                </div>
                <DialogFooter className="sm:justify-center">
                    <Button
                        onClick={onNavigateRanking}
                        className="w-full bg-white text-black hover:bg-zinc-200 font-bold py-6"
                    >
                        명예의 전당 확인하기
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
