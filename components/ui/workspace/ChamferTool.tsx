import React, { useRef, useState, useEffect } from "react";

const ChamferTool = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPoint, setStartPoint] = useState<{ x: number; y: number } | null>(null);
  const [endPoint, setEndPoint] = useState<{ x: number; y: number } | null>(null);
  const [chamferDistance, setChamferDistance] = useState<number>(10); // Default chamfer distance
  const [lines, setLines] = useState<any[]>([]); // Store drawn lines for persistence

  useEffect(() => {
    if (canvasRef.current) {
      const canvasContext = canvasRef.current.getContext("2d");
      setContext(canvasContext);
    }
  }, []);

  useEffect(() => {
    if (context) {
      context.clearRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);
      lines.forEach((line) => drawLine(line.start, line.end));
    }
  }, [lines, context]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!context) return;
    const rect = canvasRef.current?.getBoundingClientRect();
    const x = e.clientX - (rect?.left || 0);
    const y = e.clientY - (rect?.top || 0);
    setStartPoint({ x, y });
    setIsDrawing(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDrawing || !context || !startPoint) return;
    const rect = canvasRef.current?.getBoundingClientRect();
    const x = e.clientX - (rect?.left || 0);
    const y = e.clientY - (rect?.top || 0);

    setEndPoint({ x, y });
    drawPreviewChamfer(startPoint, { x, y });
  };

  const handleMouseUp = () => {
    if (!context || !startPoint || !endPoint) return;
    setIsDrawing(false);
    applyChamfer(startPoint, endPoint);
    setStartPoint(null);
    setEndPoint(null);
  };

  const drawPreviewChamfer = (start: { x: number; y: number }, end: { x: number; y: number }) => {
    if (!context || !canvasRef.current) return;
    context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    lines.forEach((line) => drawLine(line.start, line.end)); // Redraw existing lines

    context.beginPath();

    // Calculate chamfer points
    const chamferStart = calculateChamferPoint(start, end, chamferDistance, true);
    const chamferEnd = calculateChamferPoint(start, end, chamferDistance, false);

    // Draw the chamfer preview
    context.moveTo(start.x, start.y);
    context.lineTo(chamferStart.x, chamferStart.y);
    context.lineTo(chamferEnd.x, chamferEnd.y);
    context.lineTo(end.x, end.y);
    context.strokeStyle = "blue";
    context.stroke();
  };

  const applyChamfer = (start: { x: number; y: number }, end: { x: number; y: number }) => {
    if (!context || !canvasRef.current) return;

    // Calculate chamfer points
    const chamferStart = calculateChamferPoint(start, end, chamferDistance, true);
    const chamferEnd = calculateChamferPoint(start, end, chamferDistance, false);

    // Draw the chamfer
    drawLine(start, chamferStart);
    drawLine(chamferStart, chamferEnd);
    drawLine(chamferEnd, end);

    // Save the lines
    setLines([
      ...lines,
      { start, end: chamferStart },
      { start: chamferStart, end: chamferEnd },
      { start: chamferEnd, end },
    ]);
  };

  const calculateChamferPoint = (
    start: { x: number; y: number },
    end: { x: number; y: number },
    distance: number,
    isStart: boolean
  ) => {
    const dx = end.x - start.x;
    const dy = end.y - start.y;
    const length = Math.sqrt(dx * dx + dy * dy);
    const ratio = distance / length;

    if (isStart) {
      return { x: start.x + dx * ratio, y: start.y + dy * ratio };
    } else {
      return { x: end.x - dx * ratio, y: end.y - dy * ratio };
    }
  };

  const drawLine = (start: { x: number; y: number }, end: { x: number; y: number }) => {
    if (!context) return;
    context.beginPath();
    context.moveTo(start.x, start.y);
    context.lineTo(end.x, end.y);
    context.strokeStyle = "black";
    context.stroke();
  };

  const handleClearCanvas = () => {
    if (context && canvasRef.current) {
      context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      setLines([]);
    }
  };

  return (
    <div className="chamfer-tool">
      <canvas
        ref={canvasRef}
        width={800}
        height={600}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        style={{ border: "1px solid black", marginBottom: "10px" }}
      />
      <div>
        <label>
          Chamfer Distance:
          <input
            type="number"
            value={chamferDistance}
            onChange={(e) => {
              const value = parseInt(e.target.value);
              setChamferDistance(isNaN(value) || value <= 0 ? 10 : value); // Validate input
            }}
            style={{ marginLeft: "10px", marginRight: "10px" }}
          />
        </label>
        <button onClick={handleClearCanvas} style={{ padding: "5px 10px" }}>
          Clear Canvas
        </button>
      </div>
    </div>
  );
};

export default ChamferTool;