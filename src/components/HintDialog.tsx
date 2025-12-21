import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

interface HintDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    image: string;
    timeLeft: number;
}

export const HintDialog: React.FC<HintDialogProps> = ({
    open,
    onOpenChange,
    image,
    timeLeft
}) => {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-lg bg-zinc-900 border-zinc-800 text-white" onInteractOutside={(e) => e.preventDefault()}>
                <DialogHeader>
                    <DialogTitle className="text-center text-xl font-bold">Hint</DialogTitle>
                    <DialogDescription className="text-center text-zinc-400">
                        10초 동안 완성된 결혼 사진을 확인할 수 있습니다.
                    </DialogDescription>
                </DialogHeader>
                <div className="relative w-full flex justify-center mt-2 bg-zinc-950 rounded-lg overflow-hidden">
                    <img
                        src={image}
                        alt="Original Puzzle"
                        className="w-auto h-auto max-w-full max-h-[60vh] object-contain"
                    />
                    <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
                        <span className="text-2xl font-bold font-mono text-yellow-400">
                            {(timeLeft / 1000).toFixed(2)}s
                        </span>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};
