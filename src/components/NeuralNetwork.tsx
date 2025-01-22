"use client"

import React, { useEffect, useRef } from 'react';

interface Node {
    x: number;
    y: number;
    speedX: number;
    speedY: number;
    size: number;
}

const NeuralNetwork = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const nodesRef = useRef<Node[]>([]);
    const mouseRef = useRef({ x: 0, y: 0 });
    const animationFrameRef = useRef<number>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            const nodeCount = Math.floor((canvas.width * canvas.height) / 5000);

            nodesRef.current = Array.from({ length: nodeCount }, () => ({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                speedX: (Math.random() - 0.5) * 0.5,
                speedY: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2 + 1
            }));
        };

        const updateNode = (node: Node) => {
            node.x += node.speedX;
            node.y += node.speedY;

            if (node.x < 0 || node.x > canvas.width) node.speedX *= -1;
            if (node.y < 0 || node.y > canvas.height) node.speedY *= -1;

            const d = Math.hypot(node.x - mouseRef.current.x, node.y - mouseRef.current.y);
            if (d < 100) {
                const angle = Math.atan2(node.y - mouseRef.current.y, node.x - mouseRef.current.x);
                node.x += Math.cos(angle) * 1;
                node.y += Math.sin(angle) * 1;
            }
        };

        const draw = () => {
            ctx.fillStyle = 'rgb(255, 255, 255)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            nodesRef.current.forEach((node, i) => {
                updateNode(node);

                const nodeColor = `200, 200, 200`

                nodesRef.current.slice(i + 1).forEach(otherNode => {
                    const d = Math.hypot(node.x - otherNode.x, node.y - otherNode.y);
                    if (d < 150) {
                        ctx.beginPath();
                        ctx.moveTo(node.x, node.y);
                        ctx.lineTo(otherNode.x, otherNode.y);
                        ctx.strokeStyle = `rgba(${nodeColor}, ${1 - d / 150})`;
                        ctx.stroke();
                    }
                });

                const mouseD = Math.hypot(node.x - mouseRef.current.x, node.y - mouseRef.current.y);
                if (mouseD < 150) {
                    ctx.beginPath();
                    ctx.moveTo(node.x, node.y);
                    ctx.lineTo(mouseRef.current.x, mouseRef.current.y);
                    ctx.strokeStyle = `rgba(${nodeColor}, ${1 - mouseD / 150})`;
                    ctx.stroke();
                }

                ctx.beginPath();
                ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgb(${nodeColor})`;
                ctx.fill();
            });

            animationFrameRef.current = requestAnimationFrame(draw);
        };

        const handleMouseMove = (e: MouseEvent) => {
            mouseRef.current = { x: e.clientX, y: e.clientY };
        };

        window.addEventListener('resize', resizeCanvas);
        window.addEventListener('mousemove', handleMouseMove);
        resizeCanvas();
        draw();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            window.removeEventListener('mousemove', handleMouseMove);
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed top-0 left-0 w-full h-full -z-10"
        />
    );
};

export default NeuralNetwork;