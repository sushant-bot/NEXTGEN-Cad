import React, { useState, useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import { Mesh, BufferGeometry, MeshBasicMaterial, Line, LineBasicMaterial, LineDashedMaterial, Vector3, EllipseCurve } from 'three';

const ArcTool: React.FC = () => {
    const { scene } = useThree();
    const [drawing, setDrawing] = useState(false);
    const [startPoint, setStartPoint] = useState<Vector3 | null>(null);
    const [midPoint, setMidPoint] = useState<Vector3 | null>(null);
    const [endPoint, setEndPoint] = useState<Vector3 | null>(null);
    const [arcs, setArcs] = useState<Line[]>([]);
    const [history, setHistory] = useState<Line[][]>([]);
    const [redoStack, setRedoStack] = useState<Line[][]>([]);
    const [arcColor, setArcColor] = useState(0x000000);
    const [arcThickness, setArcThickness] = useState(1);
    const [arcStyle, setArcStyle] = useState<'solid' | 'dashed'>('solid');
    const [snapToGrid, setSnapToGrid] = useState(false);
    const gridSize = 10;

    const handleMouseDown = (event: MouseEvent) => {
        const { clientX, clientY } = event;
        const [x, y] = convertScreenToWorld(clientX, clientY);
        const snappedX = snapToGrid ? snapToGridFunc(x) : x;
        const snappedY = snapToGrid ? snapToGridFunc(y) : y;

        if (!drawing) {
            setStartPoint(new Vector3(snappedX, snappedY, 0));
            setDrawing(true);
        } else if (!midPoint) {
            setMidPoint(new Vector3(snappedX, snappedY, 0));
        } else {
            const arc = createArc(startPoint!, midPoint!, new Vector3(snappedX, snappedY, 0));
            scene.add(arc);
            setArcs([...arcs, arc]);
            setHistory([...history, [...arcs, arc]]);
            setRedoStack([]);
            reset();
        }
    };

    const handleMouseMove = (event: MouseEvent) => {
        if (drawing && startPoint && !midPoint) {
            const { clientX, clientY } = event;
            const [x, y] = convertScreenToWorld(clientX, clientY);
            const snappedX = snapToGrid ? snapToGridFunc(x) : x;
            const snappedY = snapToGrid ? snapToGridFunc(y) : y;
            setMidPoint(new Vector3(snappedX, snappedY, 0));
        }
    };

    const createArc = (start: Vector3, mid: Vector3, end: Vector3) => {
        const curve = new EllipseCurve(
            (start.x + end.x) / 2, (start.y + end.y) / 2, // ax, aY
            Math.abs(end.x - start.x) / 2, Math.abs(end.y - start.y) / 2, // xRadius, yRadius
            0, Math.PI, // startAngle, endAngle
            false, // clockwise
            0 // rotation
        );

        const points = curve.getPoints(50);
        const geometry = new BufferGeometry().setFromPoints(points);

        const material = arcStyle === 'dashed'
            ? new LineDashedMaterial({ color: arcColor, linewidth: arcThickness, dashSize: 1, gapSize: 1 })
            : new LineBasicMaterial({ color: arcColor, linewidth: arcThickness });

        return new Line(geometry, material);
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
        setStartPoint(null);
        setMidPoint(null);
        setEndPoint(null);
    };

    const undo = () => {
        if (history.length > 0) {
            const newHistory = [...history];
            const lastState = newHistory.pop()!;
            setRedoStack([...redoStack, arcs]);
            setArcs(lastState);
            setHistory(newHistory);
            scene.clear();
            lastState.forEach(arc => scene.add(arc));
        }
    };

    const redo = () => {
        if (redoStack.length > 0) {
            const newRedoStack = [...redoStack];
            const nextState = newRedoStack.pop()!;
            setHistory([...history, nextState]);
            setArcs(nextState);
            setRedoStack(newRedoStack);
            scene.clear();
            nextState.forEach(arc => scene.add(arc));
        }
    };

    useEffect(() => {
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, [drawing, startPoint, midPoint]);

    return (
        <div>
            <button onClick={undo}>Undo</button>
            <button onClick={redo}>Redo</button>
            <label>
                Color:
                <input type="color" value={`#${arcColor.toString(16).padStart(6, '0')}`} onChange={(e) => setArcColor(parseInt(e.target.value.slice(1), 16))} />
            </label>
            <label>
                Thickness:
                <input type="number" value={arcThickness} onChange={(e) => setArcThickness(parseInt(e.target.value))} />
            </label>
            <label>
                Style:
                <select value={arcStyle} onChange={(e) => setArcStyle(e.target.value as 'solid' | 'dashed')}>
                    <option value="solid">Solid</option>
                    <option value="dashed">Dashed</option>
                </select>
            </label>
            <label>
                Snap to Grid:
                <input type="checkbox" checked={snapToGrid} onChange={(e) => setSnapToGrid(e.target.checked)} />
            </label>
        </div>
    );
};

export default ArcTool;