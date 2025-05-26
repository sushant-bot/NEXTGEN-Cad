import React, { useState, useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import { Mesh, BufferGeometry, MeshBasicMaterial, Line, LineBasicMaterial, LineDashedMaterial, Vector3, DoubleSide } from 'three';

const PolygonTool: React.FC = () => {
    const { scene } = useThree();
    const [drawing, setDrawing] = useState(false);
    const [points, setPoints] = useState<Vector3[]>([]);
    const [polygons, setPolygons] = useState<Mesh[]>([]);
    const [history, setHistory] = useState<Mesh[][]>([]);
    const [redoStack, setRedoStack] = useState<Mesh[][]>([]);
    const [polygonColor, setPolygonColor] = useState(0x000000);
    const [polygonFill, setPolygonFill] = useState(false);
    const [polygonThickness, setPolygonThickness] = useState(1);
    const [polygonStyle, setPolygonStyle] = useState<'solid' | 'dashed'>('solid');
    const [snapToGrid, setSnapToGrid] = useState(false);
    const gridSize = 10;

    const handleMouseDown = (event: MouseEvent) => {
        const { clientX, clientY } = event;
        const [x, y] = convertScreenToWorld(clientX, clientY);
        const snappedX = snapToGrid ? snapToGridFunc(x) : x;
        const snappedY = snapToGrid ? snapToGridFunc(y) : y;

        setPoints([...points, new Vector3(snappedX, snappedY, 0)]);
        setDrawing(true);
    };

    const handleMouseMove = (event: MouseEvent) => {
        if (drawing && points.length > 0) {
            const { clientX, clientY } = event;
            const [x, y] = convertScreenToWorld(clientX, clientY);
            const snappedX = snapToGrid ? snapToGridFunc(x) : x;
            const snappedY = snapToGrid ? snapToGridFunc(y) : y;
            setPoints([...points.slice(0, -1), new Vector3(snappedX, snappedY, 0)]);
        }
    };

    const handleMouseDoubleClick = () => {
        if (points.length > 2) {
            const polygon = createPolygon(points);
            scene.add(polygon);
            setPolygons([...polygons, polygon]);
            setHistory([...history, [...polygons, polygon]]);
            setRedoStack([]);
            reset();
        }
    };

    const createPolygon = (points: Vector3[]) => {
        const geometry = new BufferGeometry().setFromPoints(points);
        let material;
        if (polygonStyle === 'dashed') {
            material = new LineDashedMaterial({ color: polygonColor, linewidth: polygonThickness, dashSize: 1, gapSize: 1 });
        } else {
            material = new LineBasicMaterial({ color: polygonColor, linewidth: polygonThickness });
        }

        if (polygonFill) {
            const fillMaterial = new MeshBasicMaterial({
                color: polygonColor,
                side: DoubleSide,
            });
            const fillGeometry = new BufferGeometry().setFromPoints([...points, points[0]]);
            return new Mesh(fillGeometry, fillMaterial);
        }

        const line = new Line(geometry, material);
        const mesh = new Mesh();
        mesh.add(line);
        return mesh;
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
        setPoints([]);
    };

    const undo = () => {
        if (history.length > 0) {
            const newHistory = [...history];
            const lastState = newHistory.pop()!;
            setRedoStack([...redoStack, polygons]);
            setPolygons(lastState);
            setHistory(newHistory);
            scene.clear();
            lastState.forEach(polygon => scene.add(polygon));
        }
    };

    const redo = () => {
        if (redoStack.length > 0) {
            const newRedoStack = [...redoStack];
            const nextState = newRedoStack.pop()!;
            setHistory([...history, nextState]);
            setPolygons(nextState);
            setRedoStack(newRedoStack);
            scene.clear();
            nextState.forEach(polygon => scene.add(polygon));
        }
    };

    useEffect(() => {
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('dblclick', handleMouseDoubleClick);

        return () => {
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('dblclick', handleMouseDoubleClick);
        };
    }, [drawing, points]);

    return (
        <div>
            <button onClick={undo}>Undo</button>
            <button onClick={redo}>Redo</button>
            <label>
                Color:
                <input type="color" value={`#${polygonColor.toString(16).padStart(6, '0')}`} onChange={(e) => setPolygonColor(parseInt(e.target.value.slice(1), 16))} />
            </label>
            <label>
                Thickness:
                <input type="number" value={polygonThickness} onChange={(e) => setPolygonThickness(parseInt(e.target.value))} />
            </label>
            <label>
                Style:
                <select value={polygonStyle} onChange={(e) => setPolygonStyle(e.target.value as 'solid' | 'dashed')}>
                    <option value="solid">Solid</option>
                    <option value="dashed">Dashed</option>
                </select>
            </label>
            <label>
                Fill:
                <input type="checkbox" checked={polygonFill} onChange={(e) => setPolygonFill(e.target.checked)} />
            </label>
            <label>
                Snap to Grid:
                <input type="checkbox" checked={snapToGrid} onChange={(e) => setSnapToGrid(e.target.checked)} />
            </label>
        </div>
    );
};

export default PolygonTool;