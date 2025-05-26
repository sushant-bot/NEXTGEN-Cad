import React, { useState } from 'react';
import Canvas2D from './Canvas2D';
import Canvas3D from './Canvas3D';

const CanvasControls: React.FC = () => {
    const [mode, setMode] = useState<'2D' | '3D'>('2D');

    return (
        <div>
            {/* Control Buttons */}
            <div style={{ marginBottom: '10px' }}>
                <button
                    onClick={() => setMode('2D')}
                    style={{
                        marginRight: '10px',
                        padding: '10px',
                        backgroundColor: mode === '2D' ? '#007bff' : '#ccc',
                        color: '#fff',
                        border: 'none',
                        cursor: 'pointer',
                    }}
                >
                    2D Mode
                </button>
                <button
                    onClick={() => setMode('3D')}
                    style={{
                        padding: '10px',
                        backgroundColor: mode === '3D' ? '#007bff' : '#ccc',
                        color: '#fff',
                        border: 'none',
                        cursor: 'pointer',
                    }}
                >
                    3D Mode
                </button>
            </div>

            {/* Render Canvas Based on Mode */}
            <div>
                {mode === '2D' && <Canvas2D />}
                {mode === '3D' && <Canvas3D />}
            </div>
        </div>
    );
};

export default CanvasControls;