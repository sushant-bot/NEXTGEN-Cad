import React, { useState } from 'react';

interface MeasureToolProps {
    canvasRef: React.RefObject<HTMLCanvasElement>;
}

const MeasureTool: React.FC<MeasureToolProps> = ({ canvasRef }) => {
    const [isMeasuring, setIsMeasuring] = useState(false);
    const [startPoint, setStartPoint] = useState<{ x: number; y: number } | null>(null);
    const [distance, setDistance] = useState<number | null>(null);

    const handleMouseDown = (event: React.MouseEvent) => {
        if (!canvasRef.current) return;

        const rect = canvasRef.current.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        setStartPoint({ x, y });
        setIsMeasuring(true);
    };

    const handleMouseMove = (event: React.MouseEvent) => {
        if (!isMeasuring || !canvasRef.current || !startPoint) return;

        const rect = canvasRef.current.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const context = canvasRef.current.getContext('2d');
        if (context) {
            // Clear the canvas and redraw the measurement line
            context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

            context.beginPath();
            context.moveTo(startPoint.x, startPoint.y);
            context.lineTo(x, y);
            context.strokeStyle = '#000000';
            context.lineWidth = 1;
            context.stroke();

            // Calculate the distance
            const dx = x - startPoint.x;
            const dy = y - startPoint.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            setDistance(dist);

            // Display the distance
            context.font = '12px Arial';
            context.fillStyle = '#000000';
            context.fillText(`Distance: ${dist.toFixed(2)} px`, x + 5, y - 5);
        }
    };

    const handleMouseUp = () => {
        setIsMeasuring(false);
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

export default MeasureTool;