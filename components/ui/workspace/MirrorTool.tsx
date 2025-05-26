import React, { useRef, useState, useEffect } from "react";

const MirrorTool = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPoint, setStartPoint] = useState<{ x: number; y: number } | null>(null);
  const [endPoint, setEndPoint] = useState<{ x: number; y: number } | null>(null);
  const [shapes, setShapes] = useState<any[]>([]); // Shapes to be mirrored
  const [mirrorAxis, setMirrorAxis] = useState<string>("vertical"); // Default mirror axis

  useEffect(() => {
    if (canvasRef.current) {
      const canvasContext = canvasRef.current.getContext("2d");
      if (canvasContext) {
        canvasContext.lineWidth = 2;
        canvasContext.strokeStyle = "black";
        setContext(canvasContext);
      }
    }
  }, []);

  useEffect(() => {
    if (context) {
      context.clearRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);
      shapes.forEach((shape) => shape.draw(context));
    }
  }, [shapes, context]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!context || !canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setStartPoint({ x, y });
    setIsDrawing(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDrawing || !context || !startPoint || !canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setEndPoint({ x, y });
    context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    shapes.forEach((shape) => shape.draw(context));
    drawTemporaryAxis(startPoint, { x, y });
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
    if (context && startPoint && endPoint) {
      const mirroredShapes = shapes.map((shape) => shape.mirror(startPoint, endPoint, mirrorAxis));
      setShapes([...shapes, ...mirroredShapes]);
    }
    setStartPoint(null);
    setEndPoint(null);
  };

  const drawTemporaryAxis = (start: { x: number; y: number }, end: { x: number; y: number }) => {
    if (!context) return;
    context.beginPath();
    context.moveTo(start.x, start.y);
    context.lineTo(end.x, end.y);
    context.strokeStyle = "red";
    context.stroke();
  };

  const handleMirrorAxisChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setMirrorAxis(e.target.value);
  };

  const handleClearCanvas = () => {
    if (context && canvasRef.current) {
      context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      setShapes([]);
    }
  };

  return (
    <div className="mirror-tool">
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
          Mirror Axis:
          <select value={mirrorAxis} onChange={handleMirrorAxisChange} style={{ marginLeft: "10px" }}>
            <option value="vertical">Vertical</option>
            <option value="horizontal">Horizontal</option>
          </select>
        </label>
        <button onClick={handleClearCanvas} style={{ marginLeft: "10px", padding: "5px 10px" }}>
          Clear Canvas
        </button>
      </div>
    </div>
  );
};

class Line {
  constructor(public x1: number, public y1: number, public x2: number, public y2: number) {}

  draw(context: CanvasRenderingContext2D) {
    context.beginPath();
    context.moveTo(this.x1, this.y1);
    context.lineTo(this.x2, this.y2);
    context.stroke();
  }

  mirror(start: { x: number; y: number }, end: { x: number; y: number }, axis: string) {
    if (axis === "vertical") {
      return new Line(
        2 * start.x - this.x1,
        this.y1,
        2 * start.x - this.x2,
        this.y2
      );
    } else {
      return new Line(
        this.x1,
        2 * start.y - this.y1,
        this.x2,
        2 * start.y - this.y2
      );
    }
  }
}

class Circle {
  constructor(public x: number, public y: number, public radius: number) {}

  draw(context: CanvasRenderingContext2D) {
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    context.stroke();
  }

  mirror(start: { x: number; y: number }, end: { x: number; y: number }, axis: string) {
    if (axis === "vertical") {
      return new Circle(2 * start.x - this.x, this.y, this.radius);
    } else {
      return new Circle(this.x, 2 * start.y - this.y, this.radius);
    }
  }
}

export default MirrorTool;