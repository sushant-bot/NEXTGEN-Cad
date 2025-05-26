import React, { useState, useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import { Mesh, EllipseCurve, BufferGeometry, MeshBasicMaterial, Line, LineBasicMaterial, LineDashedMaterial, Vector3, DoubleSide } from 'three';

const EllipseTool: React.FC = () => {
    const { scene } = useThree();
    const [drawing, setDrawing] = useState(false);
    const [startPoint, setStartPoint] = useState<Vector3 | null>(null);
    const [endPoint, setEndPoint] = useState<Vector3 | null>(null);
    const [ellipses, setEllipses] = useState<Mesh[]>([]);
    const [history, setHistory] = useState<Mesh[][]>([]);
    const [redoStack, setRedoStack] = useState<Mesh[][]>([]);
    const [ellipseColor, setEllipseColor] = useState(0x000000);
    const [ellipseFill, setEllipseFill] = useState(false);
    const [ellipseThickness, setEllipseThickness] = useState(1);
    const [ellipseStyle, setEllipseStyle] = useState<'solid' | 'dashed'>('solid');
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
        } else {
            const ellipse = createEllipse(startPoint!, new Vector3(snappedX, snappedY, 0));
            scene.add(ellipse);
            setEllipses([...ellipses, ellipse]);
            setHistory([...history, [...ellipses, ellipse]]);
            setRedoStack([]);
            reset();
        }
    };

    const handleMouseMove = (event: MouseEvent) => {
        if (drawing && startPoint) {
            const { clientX, clientY } = event;
            const [x, y] = convertScreenToWorld(clientX, clientY);
            const snappedX = snapToGrid ? snapToGridFunc(x) : x;
            const snappedY = snapToGrid ? snapToGridFunc(y) : y;
            setEndPoint(new Vector3(snappedX, snappedY, 0));
        }
    };

    const createEllipse = (start: Vector3, end: Vector3) => {
        const xRadius = Math.abs(end.x - start.x) / 2;
        const yRadius = Math.abs(end.y - start.y) / 2;
        const centerX = (start.x + end.x) / 2;
        const centerY = (start.y + end.y) / 2;

        const curve = new EllipseCurve(
            centerX, centerY,
            xRadius, yRadius,
            0, 2 * Math.PI,
            false,
            0
        );

        const points = curve.getPoints(50);
        const geometry = new BufferGeometry().setFromPoints(points);

        let material;
        if (ellipseStyle === 'dashed') {
            material = new LineDashedMaterial({ color: ellipseColor, linewidth: ellipseThickness, dashSize: 1, gapSize: 1 });
        } else {
            material = new LineBasicMaterial({ color: ellipseColor, linewidth: ellipseThickness });
        }

        if (ellipseFill) {
            const fillMaterial = new MeshBasicMaterial({
                color: ellipseColor,
                side: DoubleSide,
            });
            const fillGeometry = new BufferGeometry().setFromPoints([...points, points[0]]);
            return new Mesh(fillGeometry, fillMaterial);
        } else {
            const materialArray = [material];
            const meshGeometry = new BufferGeometry().setFromPoints([...points, points[0]]);
            return new Mesh(meshGeometry, materialArray);
        }
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
        setEndPoint(null);
    };

    const undo = () => {
        if (history.length > 0) {
            const newHistory = [...history];
            const lastState = newHistory.pop()!;
            setRedoStack([...redoStack, ellipses]);
            setEllipses(lastState);
            setHistory(newHistory);
            scene.clear();
            lastState.forEach(ellipse => scene.add(ellipse));
        }
    };

    const redo = () => {
        if (redoStack.length > 0) {
            const newRedoStack = [...redoStack];
            const nextState = newRedoStack.pop()!;
            setHistory([...history, nextState]);
            setEllipses(nextState);
            setRedoStack(newRedoStack);
            scene.clear();
            nextState.forEach(ellipse => scene.add(ellipse));
        }
    };

    useEffect(() => {
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, [drawing, startPoint]);

    return (
        <div>
            <button onClick={undo}>Undo</button>
            <button onClick={redo}>Redo</button>
            <label>
                Color:
                <input type="color" value={`#${ellipseColor.toString(16).padStart(6, '0')}`} onChange={(e) => setEllipseColor(parseInt(e.target.value.slice(1), 16))} />
            </label>
            <label>
                Thickness:
                <input type="number" value={ellipseThickness} onChange={(e) => setEllipseThickness(parseInt(e.target.value))} />
            </label>
            <label>
                Style:
                <select value={ellipseStyle} onChange={(e) => setEllipseStyle(e.target.value as 'solid' | 'dashed')}>
                    <option value="solid">Solid</option>
                    <option value="dashed">Dashed</option>
                </select>
            </label>
            <label>
                Fill:
                <input type="checkbox" checked={ellipseFill} onChange={(e) => setEllipseFill(e.target.checked)} />
            </label>
            <label>
                Snap to Grid:
                <input type="checkbox" checked={snapToGrid} onChange={(e) => setSnapToGrid(e.target.checked)} />
            </label>
        </div>
    );
};

export default EllipseTool;