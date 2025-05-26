import React, { useState } from 'react';

interface SnapToolProps {
    canvasRef: React.RefObject<HTMLCanvasElement>;
    snapPoints: { x: number; y: number }[]; // Array of points to snap to
}

const SnapTool: React.FC<SnapToolProps> = ({ canvasRef, snapPoints }) => {
    const [isSnapping, setIsSnapping] = useState(false);
    const [currentPoint, setCurrentPoint] = useState<{ x: number; y: number } | null>(null);

    const findClosestSnapPoint = (x: number, y: number) => {
        let closestPoint: { x: number; y: number } | null = null as { x: number; y: number } | null;
        let minDistance = Infinity;

        snapPoints.forEach((point) => {
            const distance = Math.sqrt(Math.pow(point.x - x, 2) + Math.pow(point.y - y, 2));
            if (distance < minDistance) {
                minDistance = distance;
                closestPoint = point;
            }
        });

        return closestPoint && minDistance < 10 ? closestPoint : null; // Snap if within 10px
    };

    const handleMouseMove = (event: React.MouseEvent) => {
        if (!canvasRef.current) return;

        const rect = canvasRef.current.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const closestPoint = findClosestSnapPoint(x, y);
        setCurrentPoint(closestPoint || { x, y });

        const context = canvasRef.current.getContext('2d');
        if (context) {
            // Clear the canvas and draw the snapping indicator
            context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

            if (closestPoint) {
                // Draw snapping point
                context.beginPath();
                context.arc(closestPoint.x, closestPoint.y, 5, 0, 2 * Math.PI);
                context.fillStyle = 'red';
                context.fill();
            }

            // Draw the current mouse position
            context.beginPath();
            context.arc(x, y, 3, 0, 2 * Math.PI);
            context.fillStyle = 'blue';
            context.fill();
        }
    };

    const handleMouseDown = () => {
        setIsSnapping(true);
    };

    const handleMouseUp = () => {
        setIsSnapping(false);
    };

    return (
        <div
            onMouseMove={handleMouseMove}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            style={{ width: '100%', height: '100%' }}
        />
    );
};

export default SnapTool;