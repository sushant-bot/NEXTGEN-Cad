import React, { useState, useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import { Line, BufferGeometry, LineBasicMaterial, Vector3, CircleGeometry, MeshBasicMaterial, Mesh } from 'three';

const FilletTool: React.FC = () => {
    const { scene } = useThree();
    const [selectedLines, setSelectedLines] = useState<Line[]>([]);
    const [filletRadius, setFilletRadius] = useState(10);
    const [snapToGrid, setSnapToGrid] = useState(false);
    const gridSize = 10;

    const handleMouseDown = (event: MouseEvent) => {
        const { clientX, clientY } = event;
        const [x, y] = convertScreenToWorld(clientX, clientY);
        const snappedX = snapToGrid ? snapToGridFunc(x) : x;
        const snappedY = snapToGrid ? snapToGridFunc(y) : y;

        // Implement logic to select lines or curves
        // Example: setSelectedLines([...selectedLines, selectedLine]);
    };

    const handleMouseUp = () => {
        if (selectedLines.length === 2) {
            const fillet = createFillet(selectedLines, filletRadius);
            scene.add(fillet);
            setSelectedLines([]);
        }
    };

    const createFillet = (lines: Line[], radius: number) => {
        // Logic to create a fillet between the two selected lines
        const [line1, line2] = lines;
        const points1 = line1.geometry.attributes.position.array as Float32Array;
        const points2 = line2.geometry.attributes.position.array as Float32Array;

        // Calculate the intersection point and create the fillet arc
        const intersectionPoint = new Vector3((points1[0] + points2[0]) / 2, (points1[1] + points2[1]) / 2, 0);
        const filletGeometry = new CircleGeometry(radius, 32);
        const filletMaterial = new MeshBasicMaterial({ color: 0xff0000 });
        const fillet = new Mesh(filletGeometry, filletMaterial);
        fillet.position.copy(intersectionPoint);

        return fillet;
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
    }, [selectedLines]);

    return (
        <div>
            <label>
                Fillet Radius:
                <input type="number" value={filletRadius} onChange={(e) => setFilletRadius(parseInt(e.target.value))} />
            </label>
            <label>
                Snap to Grid:
                <input type="checkbox" checked={snapToGrid} onChange={(e) => setSnapToGrid(e.target.checked)} />
            </label>
        </div>
    );
};

export default FilletTool;