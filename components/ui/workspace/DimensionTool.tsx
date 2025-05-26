import React, { useRef, useState, useEffect } from "react";

const DimensionTool = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  const [isMeasuring, setIsMeasuring] = useState(false);
  const [startPoint, setStartPoint] = useState<{ x: number; y: number } | null>(null);
  const [endPoint, setEndPoint] = useState<{ x: number; y: number } | null>(null);
  const [dimensions, setDimensions] = useState<
    { start: { x: number; y: number }; end: { x: number; y: number }; length: number }[]
  >([]);

  useEffect(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      if (ctx) {
        ctx.lineWidth = 2;
        ctx.strokeStyle = "black";
        ctx.font = "14px Arial";
        setContext(ctx);
      }
    }
  }, []);

  useEffect(() => {
    if (!context || !canvasRef.current) return;

    context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

    dimensions.forEach((dimension) => drawDimension(dimension));
  }, [dimensions, context]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!canvasRef.current || !context) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setStartPoint({ x, y });
    setIsMeasuring(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isMeasuring || !context || !startPoint || !canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setEndPoint({ x, y });

    context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    dimensions.forEach((dimension) => drawDimension(dimension));

    drawTemporaryDimension(startPoint, { x, y });
  };

  const handleMouseUp = () => {
    setIsMeasuring(false);
    if (!context || !startPoint || !endPoint) return;

    const newDimension = {
      start: startPoint,
      end: endPoint,
      length: calculateDistance(startPoint, endPoint),
    };

    setDimensions((prev) => [...prev, newDimension]);
    setStartPoint(null);
    setEndPoint(null);
  };

  const drawTemporaryDimension = (start: { x: number; y: number }, end: { x: number; y: number }) => {
    if (!context) return;

    context.beginPath();
    context.moveTo(start.x, start.y);
    context.lineTo(end.x, end.y);
    context.stroke();
    drawDimensionLength(start, end);
  };

  const drawDimension = (dimension: { start: { x: number; y: number }; end: { x: number; y: number }; length: number }) => {
    if (!context) return;

    context.beginPath();
    context.moveTo(dimension.start.x, dimension.start.y);
    context.lineTo(dimension.end.x, dimension.end.y);
    context.stroke();

    drawDimensionLength(dimension.start, dimension.end, dimension.length);
  };

  const drawDimensionLength = (
    start: { x: number; y: number },
    end: { x: number; y: number },
    length?: number
  ) => {
    if (!context) return;

    const midPoint = {
      x: (start.x + end.x) / 2,
      y: (start.y + end.y) / 2,
    };

    context.fillStyle = "black";
    context.fillText(length ? length.toFixed(2) : calculateDistance(start, end).toFixed(2), midPoint.x, midPoint.y);
  };

  const calculateDistance = (start: { x: number; y: number }, end: { x: number; y: number }): number => {
    return Math.sqrt(Math.pow(end.x - start.x, 2) + Math.pow(end.y - start.y, 2));
  };

  const handleClearCanvas = () => {
    if (context && canvasRef.current) {
      context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      setDimensions([]);
    }
  };

  return (
    <div className="dimension-tool">
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
      <button onClick={handleClearCanvas} style={{ padding: "5px 10px" }}>
        Clear Canvas
      </button>
    </div>
  );
};

export default DimensionTool;
