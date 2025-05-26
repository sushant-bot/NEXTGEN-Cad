import React, { useState } from 'react';

interface PolygonToolProps {
    canvasRef: React.RefObject<HTMLCanvasElement>;
}

const PolygonTool: React.FC<PolygonToolProps> = ({ canvasRef }) => {
    const [points, setPoints] = useState<{ x: number; y: number }[]>([]);
    const [isDrawing, setIsDrawing] = useState(false);

    const handleMouseDown = (event: React.MouseEvent) => {
        if (!canvasRef.current) return;

        const rect = canvasRef.current.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        setPoints((prevPoints) => [...prevPoints, { x, y }]);
        setIsDrawing(true);
    };

    const handleMouseMove = (event: React.MouseEvent) => {
        if (!isDrawing || !canvasRef.current || points.length === 0) return;

        const rect = canvasRef.current.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const context = canvasRef.current.getContext('2d');
        if (context) {
            // Clear the canvas and redraw the polygon
            context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

            context.beginPath();
            context.moveTo(points[0].x, points[0].y);
            points.forEach((point) => context.lineTo(point.x, point.y));
            context.lineTo(x, y); // Draw a line to the current mouse position
            context.strokeStyle = '#000000';
            context.lineWidth = 2;
            context.stroke();
        }
    };

    const handleMouseUp = () => {
        setIsDrawing(false);
    };

    const handleDoubleClick = () => {
        if (!canvasRef.current || points.length < 3) return;

        const context = canvasRef.current.getContext('2d');
        if (context) {
            // Complete the polygon by connecting the last point to the first
            context.beginPath();
            context.moveTo(points[0].x, points[0].y);
            points.forEach((point) => context.lineTo(point.x, point.y));
            context.closePath();
            context.strokeStyle = '#000000';
            context.lineWidth = 2;
            context.stroke();
        }

        // Reset points after completing the polygon
        setPoints([]);
    };

    return (
        <div
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onDoubleClick={handleDoubleClick}
            style={{ width: '100%', height: '100%' }}
        />
    );
};

export default PolygonTool;