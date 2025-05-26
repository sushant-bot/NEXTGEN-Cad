"use client";

import React, { useState, useRef, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";

const LineToolComponent: React.FC = () => {
  const [drawing, setDrawing] = useState(false);
  const [startPoint, setStartPoint] = useState<THREE.Vector3 | null>(null);
  const [lines, setLines] = useState<THREE.Line[]>([]);
  const sceneRef = useRef<THREE.Scene | null>(null);

  const handleMouseDown = (event: MouseEvent) => {
    const [x, y] = convertScreenToWorld(event.clientX, event.clientY);

    if (!drawing) {
      setStartPoint(new THREE.Vector3(x, y, 0));
      setDrawing(true);
    } else {
      const endPoint = new THREE.Vector3(x, y, 0);
      if (startPoint) {
        const line = createLine(startPoint, endPoint);
        setLines((prevLines) => [...prevLines, line]);
        sceneRef.current?.add(line);
      }
      setStartPoint(null);
      setDrawing(false);
    }
  };

  const convertScreenToWorld = (x: number, y: number): [number, number] => {
    const rect = document.body.getBoundingClientRect();
    const normalizedX = (x / rect.width) * 2 - 1;
    const normalizedY = -(y / rect.height) * 2 + 1;
    return [normalizedX, normalizedY];
  };

  const createLine = (start: THREE.Vector3, end: THREE.Vector3): THREE.Line => {
    const points = [start, end];
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({ color: 0x000000 });
    return new THREE.Line(geometry, material);
  };

  const clearLines = () => {
    lines.forEach((line) => {
      sceneRef.current?.remove(line);
      line.geometry.dispose();
      (line.material as THREE.Material).dispose();
    });
    setLines([]);
  };

  useEffect(() => {
    window.addEventListener("mousedown", handleMouseDown);
    return () => {
      window.removeEventListener("mousedown", handleMouseDown);
    };
  }, [drawing, startPoint, lines]);

  return (
    <>
      <button
        style={{
          position: "absolute",
          top: "10px",
          left: "10px",
          zIndex: 1,
        }}
        onClick={clearLines}
      >
        Clear Lines
      </button>
      <Canvas
        style={{
          width: "100vw",
          height: "100vh",
        }}
      >
        <scene ref={sceneRef} />
      </Canvas>
    </>
  );
};

const LineTool: React.FC = () => {
  return <LineToolComponent />;
};

export default LineTool;