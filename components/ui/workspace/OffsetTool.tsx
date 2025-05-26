import React, { useState, useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import { Line, BufferGeometry, LineBasicMaterial, Vector3 } from 'three';

const OffsetTool: React.FC = () => {
    const { scene } = useThree();
    const [selectedLine, setSelectedLine] = useState<Line | null>(null);
    const [offsetDistance, setOffsetDistance] = useState(10);
    const [snapToGrid, setSnapToGrid] = useState(false);
    const gridSize = 10;

    const handleMouseDown = (event: MouseEvent) => {
        const { clientX, clientY } = event;
        const [x, y] = convertScreenToWorld(clientX, clientY);
        const snappedX = snapToGrid ? snapToGridFunc(x) : x;
        const snappedY = snapToGrid ? snapToGridFunc(y) : y;

        // Implement logic to select a line or curve
        // Example: setSelectedLine(selectedLine);
    };

    const handleMouseUp = () => {
        if (selectedLine) {
            const offsetLine = createOffsetLine(selectedLine, offsetDistance);
            scene.add(offsetLine);
            setSelectedLine(null);
        }
    };

    const createOffsetLine = (line: Line, distance: number) => {
        const points = line.geometry.attributes.position.array as Float32Array;
        const newPoints = points.map((value, index) => {
            if (index % 3 === 0) {
                return value + distance;
            } else if (index % 3 === 1) {
                return value + distance;
            } else {
                return value;
            }
        });
        const vectors: Vector3[] = [];
        for (let i = 0; i < newPoints.length; i += 3) {
            vectors.push(new Vector3(newPoints[i], newPoints[i + 1], newPoints[i + 2]));
        }
        const geometry = new BufferGeometry().setFromPoints(vectors);
        const material = new LineBasicMaterial({ color: 0x0000ff });
        return new Line(geometry, material);
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
    }, [selectedLine]);

    return (
        <div>
            <label>
                Offset Distance:
                <input type="number" value={offsetDistance} onChange={(e) => setOffsetDistance(parseInt(e.target.value))} />
            </label>
            <label>
                Snap to Grid:
                <input type="checkbox" checked={snapToGrid} onChange={(e) => setSnapToGrid(e.target.checked)} />
            </label>
        </div>
    );
};

export default OffsetTool;