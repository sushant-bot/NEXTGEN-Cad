import React, { useRef, useEffect } from 'react';

const Canvas2D: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas) {
            const context = canvas.getContext('2d');
            if (context) {
                // Set up the canvas
                context.fillStyle = '#ffffff';
                context.fillRect(0, 0, canvas.width, canvas.height);

                // Example: Draw a sample line
                context.strokeStyle = '#000000';
                context.lineWidth = 2;
                context.beginPath();
                context.moveTo(50, 50);
                context.lineTo(200, 200);
                context.stroke();
            }
        }
    }, []);

    return (
        <div style={{ border: '1px solid #ccc', display: 'inline-block' }}>
            <canvas
                ref={canvasRef}
                width={800}
                height={600}
                style={{ cursor: 'crosshair' }}
            />
        </div>
    );
};

export default Canvas2D;