import React, { useRef, useEffect } from 'react';
import { Color, Vector3, Line, LineBasicMaterial, BufferGeometry, Group } from 'three';
import { useThree } from '@react-three/fiber';

const Axis: React.FC = () => {
    const { scene } = useThree();
    const axisRef = useRef<Group | null>(null);

    useEffect(() => {
        const group = new Group();

        const createAxis = (color: string, start: Vector3, end: Vector3) => {
            const material = new LineBasicMaterial({ color: new Color(color) });
            const points = [];
            points.push(start);
            points.push(end);

            const geometry = new BufferGeometry().setFromPoints(points);
            const line = new Line(geometry, material);
            group.add(line);
        };

        const initializeAxes = () => {
            // Create X axis (red)
            createAxis('red', new Vector3(-10, 0, 0), new Vector3(10, 0, 0));

            // Create Y axis (green)
            createAxis('green', new Vector3(0, -10, 0), new Vector3(0, 10, 0));

            // Create Z axis (blue)
            createAxis('blue', new Vector3(0, 0, -10), new Vector3(0, 0, 10));
        };

        const addAxesToScene = () => {
            axisRef.current = group;
            scene.add(group);
        };

        const removeAxesFromScene = () => {
            if (axisRef.current) {
                scene.remove(axisRef.current);
            }
        };

        const updateAxisLength = (length: number) => {
            if (axisRef.current) {
                axisRef.current.children.forEach((child, index) => {
                    const line = child as Line;
                    const start = line.geometry.attributes.position.array.slice(0, 3);
                    const end = line.geometry.attributes.position.array.slice(3, 6);

                    if (index === 0) {
                        // X axis
                        line.geometry.setFromPoints([new Vector3(start[0], start[1], start[2]), new Vector3(length, 0, 0)]);
                    } else if (index === 1) {
                        // Y axis
                        line.geometry.setFromPoints([new Vector3(start[0], start[1], start[2]), new Vector3(0, length, 0)]);
                    } else if (index === 2) {
                        // Z axis
                        line.geometry.setFromPoints([new Vector3(start[0], start[1], start[2]), new Vector3(0, 0, length)]);
                    }
                });
            }
        };

        const changeAxisColor = (axis: 'x' | 'y' | 'z', color: string) => {
            if (axisRef.current) {
                const line = axisRef.current.children[axis === 'x' ? 0 : axis === 'y' ? 1 : 2] as Line;
                (line.material as LineBasicMaterial).color.set(color);
            }
        };

        initializeAxes();
        addAxesToScene();

        return () => {
            removeAxesFromScene();
        };
    }, [scene]);

    return null;
};

export default Axis;