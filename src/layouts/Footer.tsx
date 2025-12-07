import React from 'react';

function getYear() {
    const date = new Date();
    return date.getFullYear();
}

export const Footer: React.FC = () => {
    return (
        <footer className="w-full py-6 text-center text-zinc-500 text-xs md:text-sm">
            <p>Copyright {getYear()}. Seokjin & Seungju. All rights reserved.</p>
            <p className="mt-1">Made with His Love.</p>
        </footer>
    );
};
