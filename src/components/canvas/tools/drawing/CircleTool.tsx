import React, { useRef, useState } from 'react';

interface CircleToolProps {
    canvasRef: React.RefObject<HTMLCanvasElement>;
}

const CircleTool: React.FC<CircleToolProps> = ({ canvasRef }) => {
    const [isDrawing, setIsDrawing] = useState(false);
    const [startPoint, setStartPoint] = useState<{ x: number; y: number } | null>(null);

    const handleMouseDown = (event: React.MouseEvent) => {
        if (!canvasRef.current) return;

        const rect = canvasRef.current.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        setStartPoint({ x, y });
        setIsDrawing(true);
    };

    const handleMouseMove = (event: React.MouseEvent) => {
        if (!isDrawing || !canvasRef.current || !startPoint) return;

        const rect = canvasRef.current.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const context = canvasRef.current.getContext('2d');
        if (context) {
            // Clear the canvas and redraw the circle
            context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

            const radius = Math.sqrt(
                Math.pow(x - startPoint.x, 2) + Math.pow(y - startPoint.y, 2)
            );

            context.beginPath();
            context.arc(startPoint.x, startPoint.y, radius, 0, 2 * Math.PI);
            context.strokeStyle = '#000000';
            context.lineWidth = 2;
            context.stroke();
        }
    };

    const handleMouseUp = () => {
        setIsDrawing(false);
        setStartPoint(null);
    };

    return (
        <div
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            style={{ width: '100%', height: '100%' }}
        />
    );
};

export default CircleTool;