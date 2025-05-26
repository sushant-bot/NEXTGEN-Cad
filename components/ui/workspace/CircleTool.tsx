import React, { useState, useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import { Mesh, CircleGeometry, MeshBasicMaterial, Vector3, DoubleSide } from 'three';

const CircleTool: React.FC = () => {
    const { scene } = useThree();
    const [drawing, setDrawing] = useState(false);
    const [centerPoint, setCenterPoint] = useState<Vector3 | null>(null);
    const [radiusPoint, setRadiusPoint] = useState<Vector3 | null>(null);
    const [circles, setCircles] = useState<Mesh[]>([]);
    const [history, setHistory] = useState<Mesh[][]>([]);
    const [redoStack, setRedoStack] = useState<Mesh[][]>([]);
    const [circleColor, setCircleColor] = useState(0x000000);
    const [circleFill, setCircleFill] = useState(false);
    const [circleThickness, setCircleThickness] = useState(1);
    const [circleStyle, setCircleStyle] = useState<'solid' | 'dashed'>('solid');
    const [snapToGrid, setSnapToGrid] = useState(false);
    const gridSize = 10;

    const handleMouseDown = (event: MouseEvent) => {
        const { clientX, clientY } = event;
        const [x, y] = convertScreenToWorld(clientX, clientY);
        const snappedX = snapToGrid ? snapToGridFunc(x) : x;
        const snappedY = snapToGrid ? snapToGridFunc(y) : y;

        if (!drawing) {
            setCenterPoint(new Vector3(snappedX, snappedY, 0));
            setDrawing(true);
        } else {
            const circle = createCircle(centerPoint!, new Vector3(snappedX, snappedY, 0));
            scene.add(circle);
            setCircles([...circles, circle]);
            setHistory([...history, [...circles, circle]]);
            setRedoStack([]);
            reset();
        }
    };

    const handleMouseMove = (event: MouseEvent) => {
        if (drawing && centerPoint) {
            const { clientX, clientY } = event;
            const [x, y] = convertScreenToWorld(clientX, clientY);
            const snappedX = snapToGrid ? snapToGridFunc(x) : x;
            const snappedY = snapToGrid ? snapToGridFunc(y) : y;
            setRadiusPoint(new Vector3(snappedX, snappedY, 0));
        }
    };

    const createCircle = (center: Vector3, radiusPoint: Vector3) => {
        const radius = center.distanceTo(radiusPoint);
        const geometry = new CircleGeometry(radius, 32); // 32 segments for smoother circle
        const material = new MeshBasicMaterial({ 
            color: circleColor, 
            side: DoubleSide, 
            wireframe: !circleFill 
        });
        const circle = new Mesh(geometry, material);
        circle.position.set(center.x, center.y, 0);

        if (circleStyle === 'dashed') {
            material.wireframeLinewidth = circleThickness;
            console.warn('Dashed style is not supported with MeshBasicMaterial wireframe.');
        } else {
            material.wireframeLinewidth = circleThickness;
        }

        return circle;
    };

    const convertScreenToWorld = (x: number, y: number): [number, number] => {
        // Implement the logic to convert screen coordinates to world coordinates
        return [x, y];
    };

    const snapToGridFunc = (value: number) => {
        return Math.round(value / gridSize) * gridSize;
    };

    const reset = () => {
        setDrawing(false);
        setCenterPoint(null);
        setRadiusPoint(null);
    };

    const undo = () => {
        if (history.length > 0) {
            const newHistory = [...history];
            const lastState = newHistory.pop()!;
            setRedoStack([...redoStack, circles]);
            setCircles(lastState);
            setHistory(newHistory);
            scene.clear();
            lastState.forEach(circle => scene.add(circle));
        }
    };

    const redo = () => {
        if (redoStack.length > 0) {
            const newRedoStack = [...redoStack];
            const nextState = newRedoStack.pop()!;
            setHistory([...history, nextState]);
            setCircles(nextState);
            setRedoStack(newRedoStack);
            scene.clear();
            nextState.forEach(circle => scene.add(circle));
        }
    };

    useEffect(() => {
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, [drawing, centerPoint]);

    return (
        <div>
            <button onClick={undo}>Undo</button>
            <button onClick={redo}>Redo</button>
            <label>
                Color:
                <input type="color" value={`#${circleColor.toString(16).padStart(6, '0')}`} onChange={(e) => setCircleColor(parseInt(e.target.value.slice(1), 16))} />
            </label>
            <label>
                Thickness:
                <input type="number" value={circleThickness} onChange={(e) => setCircleThickness(parseInt(e.target.value))} />
            </label>
            <label>
                Style:
                <select value={circleStyle} onChange={(e) => setCircleStyle(e.target.value as 'solid' | 'dashed')}>
                    <option value="solid">Solid</option>
                    <option value="dashed">Dashed</option>
                </select>
            </label>
            <label>
                Fill:
                <input type="checkbox" checked={circleFill} onChange={(e) => setCircleFill(e.target.checked)} />
            </label>
            <label>
                Snap to Grid:
                <input type="checkbox" checked={snapToGrid} onChange={(e) => setSnapToGrid(e.target.checked)} />
            </label>
        </div>
    );
};

export default CircleTool;