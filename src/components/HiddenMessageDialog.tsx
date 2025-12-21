import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { PartyPopper } from 'lucide-react';
import { Typewriter } from './ui/Typewriter';
import { getHiddenMessages } from '@/lib/game';

interface HiddenMessageDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export const HiddenMessageDialog: React.FC<HiddenMessageDialogProps> = ({ open, onOpenChange }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [messages, setMessages] = useState<string[]>([]);

    // Fetch messages on mount or open
    useEffect(() => {
        if (open && messages.length === 0) {
            getHiddenMessages()
                .then(data => setMessages(data.messages))
                .catch(err => console.error("Failed to fetch hidden messages", err));
        }
    }, [open, messages.length]);

    // Reset step when dialog opens
    useEffect(() => {
        if (open) {
            setCurrentStep(0);
        }
    }, [open]);

    const handleComplete = (index: number) => {
        if (index === currentStep) {
            setCurrentStep(prev => prev + 1);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="bg-zinc-900 border-zinc-800 text-white max-w-sm rounded-xl">
                <DialogHeader>
                    <div className="mx-auto bg-yellow-400/10 p-3 rounded-full w-fit mb-4">
                        <PartyPopper className="w-8 h-8 text-yellow-400" />
                    </div>
                    <DialogTitle className="text-xl text-center font-bold">
                        축하합니다! 1등이시군요!
                    </DialogTitle>
                    <DialogDescription className="text-center text-zinc-400 pt-2">
                        오직 1등에게만 보이는 비밀 메시지입니다.
                    </DialogDescription>
                </DialogHeader>

                <div className="bg-white/5 p-6 rounded-lg border border-white/10 mt-2 min-h-[300px]">
                    <div className="text-left space-y-4 font-medium leading-relaxed text-zinc-100">
                        <p>
                            <Typewriter
                                text="안녕하세요, 1등 플레이어님. 오늘의 신랑이자 SOS 개발자, 김석진입니다."
                                start={open && currentStep >= 0}
                                onComplete={() => handleComplete(0)}
                                speed={30}
                            />
                        </p>
                        {currentStep >= 1 && (
                            <p>
                                <Typewriter
                                    text="저는 상상을 현실로 만들어내는 '개발자'라는 제 직업을 누구보다 사랑하고 행복해하는 사람입니다. 평생 이 일을 하며 살고 싶을 만큼요."
                                    start={true}
                                    onComplete={() => handleComplete(1)}
                                    speed={30}
                                />
                            </p>
                        )}
                        {currentStep >= 2 && (
                            <p>
                                <Typewriter
                                    text="하지만 오늘부터는 달라지려 합니다. 저의 모든 상상력과 열정, 이제 오직 한 여자를 위해 쓰겠습니다."
                                    start={true}
                                    onComplete={() => handleComplete(2)}
                                    speed={30}
                                />
                            </p>
                        )}
                        {currentStep >= 3 && (
                            <p className="font-bold">
                                <Typewriter
                                    text="저희의 새로운 시작을 지켜봐 주세요. 플레이해 주셔서 감사합니다."
                                    start={true}
                                    speed={50}
                                />
                            </p>
                        )}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};
