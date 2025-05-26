import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import fabric from 'fabric'; // Corrected import
import { Draft } from 'immer';

// Common properties for all shapes
interface BaseShape {
  id: string;
  type: string;
  left: number;
  top: number;
  width: number;
  height: number;
  angle: number;
  scaleX: number;
  scaleY: number;
  opacity: number;
  stroke: string | null;
  strokeWidth: number;
  shadow: {
    color: string;
    blur: number;
    offsetX: number;
    offsetY: number;
  } | null;
}

// 2D Shape interface
interface Shape extends BaseShape {
  fill: string;
  radius?: number;
  points?: { x: number; y: number }[];
  path?: string;
  text?: string;
  gradientFill?: {
    type: 'linear' | 'radial';
    colorStops: Array<{ offset: number; color: string }>;
  };
}

// 3D Shape interface with additional properties
type Shape3D =
  | {
      id: string;
      type: "cube";
      depth: number;
      width: number;
      height: number;
      color: string;
      wireframe: boolean;
      metalness: number;
      roughness: number;
      texture?: string;
      position: {
        x: number;
        y: number;
        z: number;
      };
      rotation: {
        x: number;
        y: number;
        z: number;
      };
    }
  | {
      id: string;
      type: "sphere";
      radius: number;
      widthSegments: number;
      heightSegments: number;
      color: string;
      wireframe: boolean;
      metalness: number;
      roughness: number;
      texture?: string;
      position: {
        x: number;
        y: number;
        z: number;
      };
      rotation: {
        x: number;
        y: number;
        z: number;
      };
    };

// Drawing settings interface
interface DrawingSettings {
  mode: 'select' | 'draw' | 'erase' | 'shape';
  brushSize: number;
  brushColor: string;
  opacity: number;
  enableSnapping: boolean;
  snapToGrid: boolean;
  gridSize: number;
}

// History state for undo/redo
interface HistoryState {
  past: WorkspaceState[];
  future: WorkspaceState[];
}

// Workspace state interface
interface WorkspaceState {
  canvas: fabric.Canvas | null;
  shapes: Shape[];
  shapes3D: Shape3D[];
  selectedShape: Shape | null;
  selectedShape3D: Shape3D | null;
  drawingSettings: DrawingSettings;
  history: HistoryState;
  zoom: number;
  pan: { x: number; y: number };
  viewMode: '2d' | '3d' | 'split';
  isLoading: boolean;
  error: string | null;
}

// Initial state
const initialState: WorkspaceState = {
  canvas: null,
  shapes: [],
  shapes3D: [],
  selectedShape: null,
  selectedShape3D: null,
  drawingSettings: {
    mode: 'select',
    brushSize: 5,
    brushColor: '#000000',
    opacity: 1,
    enableSnapping: true,
    snapToGrid: false,
    gridSize: 20,
  },
  history: {
    past: [],
    future: [],
  },
  zoom: 1,
  pan: { x: 0, y: 0 },
  viewMode: '2d',
  isLoading: false,
  error: null,
};

const workspaceSlice = createSlice({
  name: 'workspace',
  initialState,
  reducers: {
    setCanvas(state, action: PayloadAction<fabric.Canvas>) {
      // Fix for TypeScript error by casting to unknown first
      state.canvas = action.payload as unknown as Draft<fabric.Canvas>;
    },
    addShape(state, action: PayloadAction<Shape>) {
      state.shapes.push(action.payload);
      state.history.past.push({ ...state });
      state.history.future = [];
    },
    updateShape(state, action: PayloadAction<Shape>) {
      const index = state.shapes.findIndex(shape => shape.id === action.payload.id);
      if (index !== -1) {
        state.shapes[index] = action.payload;
        state.history.past.push({ ...state });
        state.history.future = [];
      }
    },
    deleteShape(state, action: PayloadAction<string>) {
      state.shapes = state.shapes.filter(shape => shape.id !== action.payload);
      state.history.past.push({ ...state });
      state.history.future = [];
    },
    addShape3D(state, action: PayloadAction<Shape3D>) {
      state.shapes3D.push(action.payload);
      state.history.past.push({ ...state });
      state.history.future = [];
    },
    updateShape3D(state, action: PayloadAction<Shape3D>) {
      const index = state.shapes3D.findIndex(shape => shape.id === action.payload.id);
      if (index !== -1) {
        state.shapes3D[index] = action.payload;
        state.history.past.push({ ...state });
        state.history.future = [];
      }
    },
    deleteShape3D(state, action: PayloadAction<string>) {
      state.shapes3D = state.shapes3D.filter(shape => shape.id !== action.payload);
      state.history.past.push({ ...state });
      state.history.future = [];
    },
    setSelectedShape(state, action: PayloadAction<Shape | null>) {
      state.selectedShape = action.payload;
      state.selectedShape3D = null;
    },
    setSelectedShape3D(state, action: PayloadAction<Shape3D | null>) {
      state.selectedShape3D = action.payload;
      state.selectedShape = null;
    },
    updateDrawingSettings(state, action: PayloadAction<Partial<DrawingSettings>>) {
      state.drawingSettings = { ...state.drawingSettings, ...action.payload };
    },
    undo(state) {
      if (state.history.past.length > 0) {
        const previous = state.history.past.pop()!;
        state.history.future.push({ ...state });
        return previous;
      }
    },
    redo(state) {
      if (state.history.future.length > 0) {
        const next = state.history.future.pop()!;
        state.history.past.push({ ...state });
        return next;
      }
    },
    setZoom(state, action: PayloadAction<number>) {
      state.zoom = action.payload;
    },
    setPan(state, action: PayloadAction<{ x: number; y: number }>) {
      state.pan = action.payload;
    },
    setViewMode(state, action: PayloadAction<'2d' | '3d' | 'split'>) {
      state.viewMode = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    clearCanvas(state) {
      state.shapes = [];
      state.shapes3D = [];
      state.selectedShape = null;
      state.selectedShape3D = null;
      state.history.past.push({ ...state });
      state.history.future = [];
    },
  },
});

export const {
  setCanvas,
  addShape,
  updateShape,
  deleteShape,
  addShape3D,
  updateShape3D,
  deleteShape3D,
  setSelectedShape,
  setSelectedShape3D,
  updateDrawingSettings,
  undo,
  redo,
  setZoom,
  setPan,
  setViewMode,
  setLoading,
  setError,
  clearCanvas,
} = workspaceSlice.actions;

export default workspaceSlice.reducer;