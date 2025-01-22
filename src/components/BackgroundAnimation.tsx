'use client';

import { useEffect, useRef } from 'react';
import { useCanvas } from '@/components/useCanvas';

const BackgroundAnimation = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (!canvasRef.current) return;
        const { startAnimation, cleanup } = useCanvas(canvasRef.current);
        startAnimation();
        return cleanup;
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed top-0 left-0 w-full h-full -z-10"
        />
    );
};

export default BackgroundAnimation;