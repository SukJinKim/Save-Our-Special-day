import React from 'react';
import { Link } from 'react-router-dom';
import { SOSLogo } from '@/components/SOSLogo';

import { Trophy } from 'lucide-react';

export const Header: React.FC = () => {
    return (
        <header className="w-full flex items-center justify-center p-6 pb-0">
            <div className="flex items-center justify-between w-full max-w-4xl px-6 py-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full shadow-lg">
                <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                    <SOSLogo />
                    <span className="text-xl font-bold tracking-tight text-white">SOS</span>
                </Link>
                <nav className="flex items-center gap-6">
                    <Link to="/ranking" className="text-white/90 hover:text-white transition-colors" aria-label="실시간 랭킹">
                        <Trophy className="w-5 h-5" />
                    </Link>
                </nav>
            </div>
        </header>
    );
};
