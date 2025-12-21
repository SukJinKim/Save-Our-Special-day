import React, { useState, useEffect } from 'react';

interface TypewriterProps {
    text: string;
    speed?: number;
    delay?: number;
    className?: string;
    onComplete?: () => void;
    start?: boolean;
}

export const Typewriter: React.FC<TypewriterProps> = ({
    text,
    speed = 50,
    delay = 0,
    className = "",
    onComplete,
    start = true
}) => {
    const [displayedText, setDisplayedText] = useState("");
    const [currentIndex, setCurrentIndex] = useState(0);
    const [hasStarted, setHasStarted] = useState(false);

    useEffect(() => {
        if (!start) return;

        const startTimeout = setTimeout(() => {
            setHasStarted(true);
        }, delay);

        return () => clearTimeout(startTimeout);
    }, [start, delay]);

    const [isCompleted, setIsCompleted] = useState(false);

    useEffect(() => {
        if (!hasStarted) return;

        if (currentIndex < text.length) {
            const timeout = setTimeout(() => {
                setDisplayedText(prev => prev + text[currentIndex]);
                setCurrentIndex(prev => prev + 1);
            }, speed);

            return () => clearTimeout(timeout);
        } else if (onComplete && !isCompleted) {
            setIsCompleted(true);
            onComplete();
        }
    }, [currentIndex, hasStarted, text, speed, onComplete, isCompleted]);

    return (
        <span className={className}>
            {displayedText}
        </span>
    );
};
