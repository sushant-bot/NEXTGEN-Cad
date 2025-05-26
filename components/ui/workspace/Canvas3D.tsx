"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/stores";
import { addShape3D } from "@/stores/workspaceslice";

const Canvas3D = () => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const shapes3D = useSelector((state: RootState) => state.workspace.shapes3D);
  const dispatch = useDispatch();

  const [showGrid, setShowGrid] = useState(true);
  const [ambientLightEnabled, setAmbientLightEnabled] = useState(true);
  const [directionalLightEnabled, setDirectionalLightEnabled] = useState(true);

  useEffect(() => {
    // Initialize scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    canvasRef.current?.appendChild(renderer.domElement);

    // Add orbit controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    // Add grid helper
    const gridHelper = new THREE.GridHelper(20, 20);
    scene.add(gridHelper);

    // Add lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // Add 3D shapes to the scene
    const meshes: THREE.Mesh[] = [];
    shapes3D.forEach((shape) => {
      let geometry: THREE.BufferGeometry;

      if (shape.type === "cube") {
        geometry = new THREE.BoxGeometry(shape.width, shape.height, shape.depth);
      } else if (shape.type === "sphere") {
        geometry = new THREE.SphereGeometry(
          shape.radius,
          shape.widthSegments,
          shape.heightSegments
        );
      } else {
        return; // Skip unknown shapes
      }

      const material = new THREE.MeshStandardMaterial({
        color: shape.color,
        wireframe: shape.wireframe,
        metalness: shape.metalness,
        roughness: shape.roughness,
      });

      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(shape.position.x, shape.position.y, shape.position.z);
      mesh.rotation.set(shape.rotation.x, shape.rotation.y, shape.rotation.z);
      scene.add(mesh);
      meshes.push(mesh);
    });

    // Set initial camera position
    camera.position.set(5, 5, 5);
    controls.update();

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    // Toggle grid visibility
    const toggleGrid = () => {
      gridHelper.visible = showGrid;
    };
    toggleGrid();

    // Cleanup on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
      meshes.forEach((mesh) => {
        scene.remove(mesh);
        mesh.geometry.dispose();
        if (Array.isArray(mesh.material)) {
          mesh.material.forEach((mat) => mat.dispose());
        } else {
          mesh.material.dispose();
        }
      });
      scene.clear();
      renderer.dispose();
      controls.dispose();
    };
  }, [shapes3D, showGrid]);

  const handleAddCube = () => {
    dispatch(
      addShape3D({
        id: `cube-${Date.now()}`,
        type: "cube",
        width: 1,
        height: 1,
        depth: 1,
        color: "#00ff00", // Hexadecimal color as a string
        position: { x: 0, y: 0.5, z: 0 },
        wireframe: false,
        metalness: 0.5,
        roughness: 0.5,
        rotation: { x: 0, y: 0, z: 0 },
      })
    );
  };

  const handleAddSphere = () => {
    dispatch(
      addShape3D({
        id: `sphere-${Date.now()}`,
        type: "sphere",
        radius: 0.5,
        widthSegments: 32,
        heightSegments: 32,
        color: "#ff0000", // CSS color string
        position: { x: 0, y: 0.5, z: 0 },
        wireframe: false,
        metalness: 0.5,
        roughness: 0.5,
        rotation: { x: 0, y: 0, z: 0 },
      })
    );
  };

  return (
    <div>
      <div className="toolbar">
        <button onClick={handleAddCube}>Add Cube</button>
        <button onClick={handleAddSphere}>Add Sphere</button>
        <button onClick={() => setShowGrid(!showGrid)}>
          {showGrid ? "Hide Grid" : "Show Grid"}
        </button>
        <button onClick={() => setAmbientLightEnabled(!ambientLightEnabled)}>
          {ambientLightEnabled ? "Disable Ambient Light" : "Enable Ambient Light"}
        </button>
        <button onClick={() => setDirectionalLightEnabled(!directionalLightEnabled)}>
          {directionalLightEnabled ? "Disable Directional Light" : "Enable Directional Light"}
        </button>
      </div>
      <div ref={canvasRef} style={{ width: "100%", height: "100%" }} />
    </div>
  );
};

export default Canvas3D;