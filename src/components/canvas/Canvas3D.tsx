import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const Canvas3D: React.FC = () => {
    const canvasRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const canvasContainer = canvasRef.current;
        if (canvasContainer) {
            // Set up the scene, camera, and renderer
            const scene = new THREE.Scene();
            const camera = new THREE.PerspectiveCamera(
                75,
                canvasContainer.clientWidth / canvasContainer.clientHeight,
                0.1,
                1000
            );
            const renderer = new THREE.WebGLRenderer();
            renderer.setSize(canvasContainer.clientWidth, canvasContainer.clientHeight);
            canvasContainer.appendChild(renderer.domElement);

            // Add a simple cube
            const geometry = new THREE.BoxGeometry();
            const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
            const cube = new THREE.Mesh(geometry, material);
            scene.add(cube);

            // Position the camera
            camera.position.z = 5;

            // Animation loop
            const animate = () => {
                requestAnimationFrame(animate);

                // Rotate the cube
                cube.rotation.x += 0.01;
                cube.rotation.y += 0.01;

                renderer.render(scene, camera);
            };
            animate();

            // Cleanup on component unmount
            return () => {
                canvasContainer.removeChild(renderer.domElement);
            };
        }
    }, []);

    return (
        <div
            ref={canvasRef}
            style={{
                width: '800px',
                height: '600px',
                border: '1px solid #ccc',
            }}
        />
    );
};

export default Canvas3D;