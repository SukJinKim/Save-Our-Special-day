import React from 'react';
import { Hero } from '@/components/Hero';

export const Home: React.FC = () => {
    return (
        <main className="w-full flex-1 flex flex-col">
            <Hero />
        </main>
    );
};
