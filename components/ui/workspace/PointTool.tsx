import React, { useState, useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import { Mesh, SphereGeometry, MeshBasicMaterial, Vector3, DoubleSide } from 'three';

const PointTool: React.FC = () => {
    const { scene } = useThree();
    const [points, setPoints] = useState<Vector3[]>([]);
    const [meshes, setMeshes] = useState<Mesh[]>([]);
    const [history, setHistory] = useState<Mesh[][]>([]);
    const [redoStack, setRedoStack] = useState<Mesh[][]>([]);
    const [pointColor, setPointColor] = useState(0x000000);
    const [pointSize, setPointSize] = useState(1);
    const [snapToGrid, setSnapToGrid] = useState(false);
    const gridSize = 10;

    const handleMouseDown = (event: MouseEvent) => {
        const { clientX, clientY } = event;
        const [x, y] = convertScreenToWorld(clientX, clientY);
        const snappedX = snapToGrid ? snapToGridFunc(x) : x;
        const snappedY = snapToGrid ? snapToGridFunc(y) : y;

        const point = new Vector3(snappedX, snappedY, 0);
        setPoints([...points, point]);
        const mesh = createPoint(point);
        scene.add(mesh);
        setMeshes([...meshes, mesh]);
        setHistory([...history, [...meshes, mesh]]);
        setRedoStack([]);
    };

    const createPoint = (position: Vector3) => {
        const geometry = new SphereGeometry(pointSize, 32, 32);
        const material = new MeshBasicMaterial({ color: pointColor, side: DoubleSide });
        const sphere = new Mesh(geometry, material);
        sphere.position.set(position.x, position.y, position.z);
        return sphere;
    };

    const convertScreenToWorld = (x: number, y: number): [number, number] => {
        // Implement the logic to convert screen coordinates to world coordinates
        return [x, y];
    };

    const snapToGridFunc = (value: number) => {
        return Math.round(value / gridSize) * gridSize;
    };

    const undo = () => {
        if (history.length > 0) {
            const newHistory = [...history];
            const lastState = newHistory.pop()!;
            setRedoStack([...redoStack, meshes]);
            setMeshes(lastState);
            setHistory(newHistory);
            scene.clear();
            lastState.forEach(mesh => scene.add(mesh));
        }
    };

    const redo = () => {
        if (redoStack.length > 0) {
            const newRedoStack = [...redoStack];
            const nextState = newRedoStack.pop()!;
            setHistory([...history, nextState]);
            setMeshes(nextState);
            setRedoStack(newRedoStack);
            scene.clear();
            nextState.forEach(mesh => scene.add(mesh));
        }
    };

    useEffect(() => {
        window.addEventListener('mousedown', handleMouseDown);

        return () => {
            window.removeEventListener('mousedown', handleMouseDown);
        };
    }, [points]);

    return (
        <div>
            <button onClick={undo}>Undo</button>
            <button onClick={redo}>Redo</button>
            <label>
                Color:
                <input type="color" value={`#${pointColor.toString(16).padStart(6, '0')}`} onChange={(e) => setPointColor(parseInt(e.target.value.slice(1), 16))} />
            </label>
            <label>
                Size:
                <input type="number" value={pointSize} onChange={(e) => setPointSize(parseInt(e.target.value))} />
            </label>
            <label>
                Snap to Grid:
                <input type="checkbox" checked={snapToGrid} onChange={(e) => setSnapToGrid(e.target.checked)} />
            </label>
        </div>
    );
};

export default PointTool;