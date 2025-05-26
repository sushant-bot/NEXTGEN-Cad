import React, { useRef, useState, useEffect } from "react";

const MeasurementTool = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  const [isMeasuring, setIsMeasuring] = useState(false);
  const [startPoint, setStartPoint] = useState<{ x: number; y: number } | null>(null);
  const [endPoint, setEndPoint] = useState<{ x: number; y: number } | null>(null);
  const [measurements, setMeasurements] = useState<any[]>([]);
  const [snapToGrid, setSnapToGrid] = useState(false);

  useEffect(() => {
    if (canvasRef.current) {
      const canvasContext = canvasRef.current.getContext("2d");
      if (canvasContext) {
        canvasContext.lineWidth = 2;
        canvasContext.strokeStyle = "black";
        canvasContext.font = "14px Arial";
        setContext(canvasContext);
      }
    }
  }, []);

  useEffect(() => {
    if (context) {
      context.clearRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);
      measurements.forEach((measurement) => drawMeasurement(measurement));
    }
  }, [measurements, context]);

  const snap = (value: number, gridSize: number) => {
    return snapToGrid ? Math.round(value / gridSize) * gridSize : value;
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!context || !canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = snap(e.clientX - rect.left, 10);
    const y = snap(e.clientY - rect.top, 10);
    setStartPoint({ x, y });
    setIsMeasuring(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isMeasuring || !context || !startPoint || !canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = snap(e.clientX - rect.left, 10);
    const y = snap(e.clientY - rect.top, 10);

    setEndPoint({ x, y });
    context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    measurements.forEach((measurement) => drawMeasurement(measurement));
    drawTemporaryMeasurement(startPoint, { x, y });
  };

  const handleMouseUp = () => {
    setIsMeasuring(false);
    if (context && startPoint && endPoint) {
      const newMeasurement = {
        start: startPoint,
        end: endPoint,
        length: calculateDistance(startPoint, endPoint),
      };
      setMeasurements([...measurements, newMeasurement]);
    }
    setStartPoint(null);
    setEndPoint(null);
  };

  const drawTemporaryMeasurement = (start: { x: number; y: number }, end: { x: number; y: number }) => {
    if (!context) return;
    context.beginPath();
    context.moveTo(start.x, start.y);
    context.lineTo(end.x, end.y);
    context.stroke();
    drawMeasurementLength(start, end);
  };

  const drawMeasurement = (measurement: any) => {
    if (!context) return;
    context.beginPath();
    context.moveTo(measurement.start.x, measurement.start.y);
    context.lineTo(measurement.end.x, measurement.end.y);
    context.stroke();
    drawMeasurementLength(measurement.start, measurement.end, measurement.length);
  };

  const drawMeasurementLength = (start: { x: number; y: number }, end: { x: number; y: number }, length?: number) => {
    if (!context) return;
    const midPoint = {
      x: (start.x + end.x) / 2,
      y: (start.y + end.y) / 2,
    };
    context.fillText(length ? length.toFixed(2) : calculateDistance(start, end).toFixed(2), midPoint.x, midPoint.y);
  };

  const calculateDistance = (start: { x: number; y: number }, end: { x: number; y: number }): number => {
    return Math.sqrt(Math.pow(end.x - start.x, 2) + Math.pow(end.y - start.y, 2));
  };

  const handleClearCanvas = () => {
    if (context && canvasRef.current) {
      context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      setMeasurements([]);
    }
  };

  return (
    <div className="measurement-tool">
      <canvas
        ref={canvasRef}
        width={800}
        height={600}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        style={{ border: "1px solid black", cursor: "crosshair", marginBottom: "10px" }}
      />
      <div>
        <label>
          <input
            type="checkbox"
            checked={snapToGrid}
            onChange={() => setSnapToGrid(!snapToGrid)}
          />
          Snap to Grid
        </label>
        <button onClick={handleClearCanvas} style={{ marginLeft: "10px", padding: "5px 10px" }}>
          Clear Canvas
        </button>
      </div>
    </div>
  );
};

export default MeasurementTool;