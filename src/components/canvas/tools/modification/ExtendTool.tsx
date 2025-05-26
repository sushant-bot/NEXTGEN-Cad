import React, { useState } from 'react';

interface ExtendToolProps {
    canvasRef: React.RefObject<HTMLCanvasElement>;
}

const ExtendTool: React.FC<ExtendToolProps> = ({ canvasRef }) => {
    const [isExtending, setIsExtending] = useState(false);
    const [startPoint, setStartPoint] = useState<{ x: number; y: number } | null>(null);

    const handleMouseDown = (event: React.MouseEvent) => {
        if (!canvasRef.current) return;

        const rect = canvasRef.current.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        setStartPoint({ x, y });
        setIsExtending(true);
    };

    const handleMouseMove = (event: React.MouseEvent) => {
        if (!isExtending || !canvasRef.current || !startPoint) return;

        const rect = canvasRef.current.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const context = canvasRef.current.getContext('2d');
        if (context) {
            // Clear the canvas and redraw the extended line
            context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

            context.beginPath();
            context.moveTo(startPoint.x, startPoint.y);
            context.lineTo(x, y);
            context.strokeStyle = '#000000';
            context.lineWidth = 2;
            context.stroke();
        }
    };

    const handleMouseUp = () => {
        setIsExtending(false);
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

export default ExtendTool;