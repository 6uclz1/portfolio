"use client"

import React, { useEffect, useRef, useState } from 'react';

const ProcessingAnimation = () => {
    const canvasRef = useRef(null);
    const requestIdRef = useRef(null);

    // Animation parameters
    const formResolution = 10;
    const stepSize = 3;
    const initRadius = 60;
    const state = useRef({
        centerX: 0,
        centerY: 0,
        x: new Array(formResolution).fill(0),
        y: new Array(formResolution).fill(0),
        filled: false
    });

    const initializeCanvas = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        // Set canvas size based on the window size
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // Initialize the form
        state.current.centerX = canvas.width / 2;
        state.current.centerY = canvas.height / 2;

        const angle = (2 * Math.PI) / formResolution;
        for (let i = 0; i < formResolution; i++) {
            state.current.x[i] = Math.cos(angle * i) * initRadius * 2;
            state.current.y[i] = Math.sin(angle * i) * initRadius * 2; // Elliptical shape
        }

        ctx.strokeStyle = 'rgba(220, 220, 220, 0.2)';
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // // Draw initial state with steps progressed
        // for (let step = 0; step < 150; step++) {
        //     advanceState();
        // }
        draw();
    };

    const advanceState = () => {
        const { x, y } = state.current;

        // Scale points
        for (let i = 0; i < formResolution; i++) {
            x[i] = x[i] * 1.003 + (Math.random() - 0.5) * 4;
            y[i] = y[i] * 1.003 + (Math.random() - 0.5) * 4;
        }

        // Add random movement
        for (let i = 0; i < formResolution; i++) {
            x[i] += (Math.random() - 0.5) * 2 * stepSize;
            y[i] += (Math.random() - 0.5) * 2 * stepSize;
        }
    };

    const draw = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const { centerX, centerY, x, y } = state.current;

        // Move center slightly to create dynamic motion
        state.current.centerX += (Math.random() - 0.5) * stepSize;
        state.current.centerY += (Math.random() - 0.5) * stepSize;

        // Advance state
        advanceState();

        // Draw the shape
        ctx.beginPath();
        ctx.lineWidth = 0.75;

        // Create curve through points
        const points = [];
        points.push({ x: x[formResolution - 1] + centerX, y: y[formResolution - 1] + centerY });
        for (let i = 0; i < formResolution; i++) {
            points.push({ x: x[i] + centerX, y: y[i] + centerY });
        }
        points.push({ x: x[0] + centerX, y: y[0] + centerY });
        points.push({ x: x[1] + centerX, y: y[1] + centerY });

        // Draw curved line through points
        ctx.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length - 2; i++) {
            const xc = (points[i].x + points[i + 1].x) / 2;
            const yc = (points[i].y + points[i + 1].y) / 2;
            ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc);
        }
        ctx.stroke();

        requestIdRef.current = requestAnimationFrame(draw);
    };

    useEffect(() => {
        initializeCanvas();

        const handleResize = () => {
            initializeCanvas();
        };

        window.addEventListener('resize', handleResize);

        return () => {
            if (requestIdRef.current) {
                cancelAnimationFrame(requestIdRef.current);
            }
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed top-0 left-0 w-full h-full -z-10"
        />
    );
};

export default ProcessingAnimation;

