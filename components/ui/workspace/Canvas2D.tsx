import React, { useRef, useState, useEffect } from "react";

const Canvas2D = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  const [startPoint, setStartPoint] = useState<{ x: number; y: number } | null>(null);
  const [currentTool, setCurrentTool] = useState<string>("select");
  const [shapes, setShapes] = useState<any[]>([]);
  const [selectedShape, setSelectedShape] = useState<any>(null);
  const [snapToGrid, setSnapToGrid] = useState(false);
  const [undoStack, setUndoStack] = useState<any[]>([]);
  const [redoStack, setRedoStack] = useState<any[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);

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

  const snap = (value: number, gridSize: number) => {
    return snapToGrid ? Math.round(value / gridSize) * gridSize : value;
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!context) return;
    const rect = canvasRef.current?.getBoundingClientRect();
    const x = snap(e.clientX - (rect?.left || 0), 10);
    const y = snap(e.clientY - (rect?.top || 0), 10);
    setStartPoint({ x, y });

    switch (currentTool) {
      case "line":
      case "rectangle":
      case "circle":
        setIsDrawing(true);
        break;
      case "select":
        const shape = shapes.find((s) => s.contains(x, y));
        setSelectedShape(shape);
        break;
      default:
        break;
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDrawing || !context || !startPoint) return;
    const rect = canvasRef.current?.getBoundingClientRect();
    const x = snap(e.clientX - (rect?.left || 0), 10);
    const y = snap(e.clientY - (rect?.top || 0), 10);

    context.clearRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);
    shapes.forEach((shape) => shape.draw(context));

    switch (currentTool) {
      case "line":
        context.beginPath();
        context.moveTo(startPoint.x, startPoint.y);
        context.lineTo(x, y);
        context.stroke();
        break;
      case "rectangle":
        context.strokeRect(startPoint.x, startPoint.y, x - startPoint.x, y - startPoint.y);
        break;
      case "circle":
        const radius = Math.sqrt(Math.pow(x - startPoint.x, 2) + Math.pow(y - startPoint.y, 2));
        context.beginPath();
        context.arc(startPoint.x, startPoint.y, radius, 0, Math.PI * 2);
        context.stroke();
        break;
      default:
        break;
    }
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (!context || !startPoint) return;
    const rect = canvasRef.current?.getBoundingClientRect();
    const x = snap(e.clientX - (rect?.left || 0), 10);
    const y = snap(e.clientY - (rect?.top || 0), 10);
    setIsDrawing(false);

    let newShape;
    switch (currentTool) {
      case "line":
        newShape = new Line(startPoint.x, startPoint.y, x, y);
        break;
      case "rectangle":
        newShape = new Rectangle(startPoint.x, startPoint.y, x - startPoint.x, y - startPoint.y);
        break;
      case "circle":
        const radius = Math.sqrt(Math.pow(x - startPoint.x, 2) + Math.pow(y - startPoint.y, 2));
        newShape = new Circle(startPoint.x, startPoint.y, radius);
        break;
      default:
        break;
    }

    if (newShape) {
      setUndoStack([...undoStack, shapes]);
      setShapes([...shapes, newShape]);
      setRedoStack([]);
    }

    setStartPoint(null);
  };

  const handleClearCanvas = () => {
    if (context && canvasRef.current) {
      setUndoStack([...undoStack, shapes]);
      context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      setShapes([]);
    }
  };

  const handleUndo = () => {
    if (undoStack.length > 0) {
      const previousState = undoStack.pop();
      setRedoStack([shapes, ...redoStack]);
      setShapes(previousState || []);
    }
  };

  const handleRedo = () => {
    if (redoStack.length > 0) {
      const nextState = redoStack.shift();
      setUndoStack([...undoStack, shapes]);
      setShapes(nextState || []);
    }
  };

  return (
    <div className="canvas-2d-container">
      <div className="tools">
        <button onClick={() => setCurrentTool("select")}>Select</button>
        <button onClick={() => setCurrentTool("line")}>Line</button>
        <button onClick={() => setCurrentTool("rectangle")}>Rectangle</button>
        <button onClick={() => setCurrentTool("circle")}>Circle</button>
        <button onClick={() => setSnapToGrid(!snapToGrid)}>
          {snapToGrid ? "Disable Snap" : "Enable Snap"}
        </button>
        <button onClick={handleUndo} disabled={undoStack.length === 0}>
          Undo
        </button>
        <button onClick={handleRedo} disabled={redoStack.length === 0}>
          Redo
        </button>
        <button onClick={handleClearCanvas}>Clear Canvas</button>
      </div>
      <canvas
        ref={canvasRef}
        width={800}
        height={600}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        style={{ border: "1px solid black" }}
      />
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

  contains(x: number, y: number): boolean {
    return false; // Implement selection logic
  }
}

class Rectangle {
  constructor(public x: number, public y: number, public width: number, public height: number) {}

  draw(context: CanvasRenderingContext2D) {
    context.strokeRect(this.x, this.y, this.width, this.height);
  }

  contains(x: number, y: number): boolean {
    return (
      x > this.x &&
      x < this.x + this.width &&
      y > this.y &&
      y < this.y + this.height
    );
  }
}

class Circle {
  constructor(public x: number, public y: number, public radius: number) {}

  draw(context: CanvasRenderingContext2D) {
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    context.stroke();
  }

  contains(x: number, y: number): boolean {
    const dx = x - this.x;
    const dy = y - this.y;
    return Math.sqrt(dx * dx + dy * dy) <= this.radius;
  }
}

export default Canvas2D;