import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';
import { motion } from 'framer-motion';

export const NotFound: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] text-center p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="relative mb-8"
            >
                <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full" />
                <h1 className="relative text-9xl font-bold text-white/90 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                    404
                </h1>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
            >
                <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4">
                    이런! 잘못된 경로로 접근하셨군요.
                </h2>

                <p className="text-white/60 max-w-md mb-8 mx-auto break-keep">
                    찾으시는 페이지가 삭제되었거나, 이름이 변경되었거나, 일시적으로 사용할 수 없습니다.
                </p>

                <div className="flex gap-4 justify-center">
                    <Button
                        onClick={() => navigate('/')}
                        className="gap-2"
                        size="lg"
                    >
                        <Home className="w-4 h-4" />
                        홈으로 돌아가기
                    </Button>
                </div>
            </motion.div>
        </div>
    );
};
