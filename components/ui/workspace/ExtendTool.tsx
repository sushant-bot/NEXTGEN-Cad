import React, { useState, useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import { Line, BufferGeometry, LineBasicMaterial, Vector3 } from 'three';

const ExtendTool: React.FC = () => {
    const { scene } = useThree();
    const [selectedLine, setSelectedLine] = useState<Line | null>(null);
    const [targetEntity, setTargetEntity] = useState<Vector3 | null>(null);
    const [snapToGrid, setSnapToGrid] = useState(false);
    const gridSize = 10;

    const handleMouseDown = (event: MouseEvent) => {
        const { clientX, clientY } = event;
        const [x, y] = convertScreenToWorld(clientX, clientY);
        const snappedX = snapToGrid ? snapToGridFunc(x) : x;
        const snappedY = snapToGrid ? snapToGridFunc(y) : y;

        if (!selectedLine) {
            // Implement logic to select a line or curve
            // Example: setSelectedLine(selectedLine);
        } else if (!targetEntity) {
            setTargetEntity(new Vector3(snappedX, snappedY, 0));
        }
    };

    const handleMouseUp = () => {
        if (selectedLine && targetEntity) {
            // Implement logic to extend the line or curve to the target entity
            extendLineToTarget(selectedLine, targetEntity);
            setSelectedLine(null);
            setTargetEntity(null);
        }
    };

    const extendLineToTarget = (line: Line, target: Vector3) => {
        // Logic to extend the line or curve to meet the target entity
        const points = line.geometry.attributes.position.array as Float32Array;
        const newPoints = [...Array.from(points).slice(0, -3), target.x, target.y, target.z];
        line.geometry.setFromPoints(newPoints.map((value, index) => new Vector3(value, newPoints[index + 1], newPoints[index + 2])));
    };

    const convertScreenToWorld = (x: number, y: number): [number, number] => {
        // Implement the logic to convert screen coordinates to world coordinates
        return [x, y];
    };

    const snapToGridFunc = (value: number) => {
        return Math.round(value / gridSize) * gridSize;
    };

    useEffect(() => {
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);

        return () => {
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [selectedLine, targetEntity]);

    return (
        <div>
            <label>
                Snap to Grid:
                <input type="checkbox" checked={snapToGrid} onChange={(e) => setSnapToGrid(e.target.checked)} />
            </label>
        </div>
    );
};

export default ExtendTool;