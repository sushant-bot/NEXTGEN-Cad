import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/stores';
import Button from '@/components/ui/Button1';
import fabric from 'fabric'; // Correct import for fabric

const CanvasControls = () => {
    const dispatch = useDispatch();
    const canvas = useSelector((state: RootState) => state.workspace.canvas);

    const [undoStack, setUndoStack] = useState<any[]>([]);
    const [redoStack, setRedoStack] = useState<any[]>([]);

    const handleZoomIn = () => {
        if (canvas) {
            canvas.setZoom(canvas.getZoom() * 1.1);
        }
    };

    const handleZoomOut = () => {
        if (canvas) {
            canvas.setZoom(canvas.getZoom() / 1.1);
        }
    };

    const handlePan = (direction: 'left' | 'right' | 'up' | 'down') => {
        if (canvas) {
            const delta = 50; // Adjust pan distance
            switch (direction) {
                case 'left':
                    canvas.relativePan(new fabric.Point(-delta, 0));
                    break;
                case 'right':
                    canvas.relativePan(new fabric.Point(delta, 0));
                    break;
                case 'up':
                    canvas.relativePan(new fabric.Point(0, -delta));
                    break;
                case 'down':
                    canvas.relativePan(new fabric.Point(0, delta));
                    break;
                default:
                    break;
            }
        }
    };

    const handleUndo = () => {
        if (canvas && canvas._objects.length > 0) {
            const lastObject = canvas._objects.pop();
            if (lastObject) {
                setUndoStack([...undoStack, lastObject]);
                canvas.remove(lastObject);
                canvas.renderAll();
            }
        }
    };

    const handleRedo = () => {
        if (canvas && redoStack.length > 0) {
            const lastRedoObject = redoStack.pop();
            if (lastRedoObject) {
                setUndoStack([...undoStack, lastRedoObject]);
                canvas.add(lastRedoObject);
                canvas.renderAll();
            }
        }
    };

    const handleClearCanvas = () => {
        if (canvas) {
            const confirmClear = window.confirm('Are you sure you want to clear the canvas?');
            if (confirmClear) {
                setUndoStack([...undoStack, ...canvas._objects]);
                canvas.clear();
                canvas.renderAll();
            }
        }
    };

    return (
        <div className="canvas-controls">
            <Button label="Zoom In" onClick={handleZoomIn} />
            <Button label="Zoom Out" onClick={handleZoomOut} />
            <Button label="Pan Left" onClick={() => handlePan('left')} />
            <Button label="Pan Right" onClick={() => handlePan('right')} />
            <Button label="Pan Up" onClick={() => handlePan('up')} />
            <Button label="Pan Down" onClick={() => handlePan('down')} />
            <Button label="Undo" onClick={handleUndo} disabled={canvas?._objects.length === 0} />
            <Button label="Redo" onClick={handleRedo} disabled={redoStack.length === 0} />
            <Button label="Clear Canvas" onClick={handleClearCanvas} />
        </div>
    );
};

export default CanvasControls;