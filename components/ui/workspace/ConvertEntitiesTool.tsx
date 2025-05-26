import React, { useState, useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import { Object3D, Line, BufferGeometry, LineBasicMaterial, Vector3, Mesh, MeshBasicMaterial, CircleGeometry, ShapeGeometry } from 'three';

const ConvertEntitiesTool: React.FC = () => {
    const { scene } = useThree();
    const [selectedObjects, setSelectedObjects] = useState<Object3D[]>([]);
    const [newSketch, setNewSketch] = useState<Object3D | null>(null);
    const [offsetDistance, setOffsetDistance] = useState(0);
    const [snapToGrid, setSnapToGrid] = useState(false);
    const gridSize = 10;

    const handleMouseDown = (event: MouseEvent) => {
        const { clientX, clientY } = event;
        const [x, y] = convertScreenToWorld(clientX, clientY);

        // Implement logic to select multiple objects
        // Example: const selectedObj = getObjectUnderMouse(clientX, clientY);
        // if (selectedObj && !selectedObjects.includes(selectedObj)) setSelectedObjects([...selectedObjects, selectedObj]);
    };

    const handleMouseUp = () => {
        if (selectedObjects.length > 0) {
            const projectedEntities = convertEntities(selectedObjects, offsetDistance);
            if (newSketch) {
                newSketch.add(...projectedEntities);
            } else {
                const sketch = new Object3D();
                sketch.add(...projectedEntities);
                setNewSketch(sketch);
                scene.add(sketch);
            }
            setSelectedObjects([]);
        }
    };

    const convertEntities = (objects: Object3D[], offset: number) => {
        const entities: Object3D[] = [];
        objects.forEach(object => {
            object.traverse((child) => {
                if (child instanceof Line) {
                    const points = (child.geometry as BufferGeometry).attributes.position.array as Float32Array;
                    const newPoints = points.map((value, index) => {
                        if (index % 3 === 0) return value + offset; // x
                        if (index % 3 === 1) return value + offset; // y
                        return 0; // z
                    });
                    const geometry = new BufferGeometry().setFromPoints(
                        Array.from({ length: newPoints.length / 3 }, (_, i) => 
                            new Vector3(newPoints[i * 3], newPoints[i * 3 + 1], newPoints[i * 3 + 2] || 0)
                        )
                    );
                    const material = new LineBasicMaterial({ color: 0x0000ff });
                    entities.push(new Line(geometry, material));
                } else if (child instanceof Mesh) {
                    if (child.geometry instanceof CircleGeometry) {
                        const geometry = new CircleGeometry(child.geometry.parameters.radius + offset, 32);
                        const material = new MeshBasicMaterial({ color: 0x0000ff });
                        entities.push(new Mesh(geometry, material));
                    } else if (child.geometry instanceof ShapeGeometry) {
                        const geometry = new ShapeGeometry(child.geometry.parameters.shapes);
                        const material = new MeshBasicMaterial({ color: 0x0000ff });
                        entities.push(new Mesh(geometry, material));
                    }
                }
            });
        });
        return entities;
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
    }, [selectedObjects, offsetDistance]);

    return (
        <div>
            <label>
                Offset Distance:
                <input type="number" value={offsetDistance} onChange={(e) => setOffsetDistance(parseFloat(e.target.value))} />
            </label>
            <label>
                Snap to Grid:
                <input type="checkbox" checked={snapToGrid} onChange={(e) => setSnapToGrid(e.target.checked)} />
            </label>
            <button onClick={() => setNewSketch(null)}>Start New Sketch</button>
        </div>
    );
};

export default ConvertEntitiesTool;