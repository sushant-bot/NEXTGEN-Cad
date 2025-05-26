export const getMousePosition = (
    canvas: HTMLCanvasElement,
    event: MouseEvent | React.MouseEvent
): { x: number; y: number } => {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    return { x, y };
};

export const clearCanvas = (canvas: HTMLCanvasElement) => {
    const context = canvas.getContext('2d');
    if (context) {
        context.clearRect(0, 0, canvas.width, canvas.height);
    }
};

export const drawCircle = (
    context: CanvasRenderingContext2D,
    x: number,
    y: number,
    radius: number,
    color: string = '#000000'
) => {
    context.beginPath();
    context.arc(x, y, radius, 0, 2 * Math.PI);
    context.fillStyle = color;
    context.fill();
};

export const drawLine = (
    context: CanvasRenderingContext2D,
    startX: number,
    startY: number,
    endX: number,
    endY: number,
    color: string = '#000000',
    lineWidth: number = 2
) => {
    context.beginPath();
    context.moveTo(startX, startY);
    context.lineTo(endX, endY);
    context.strokeStyle = color;
    context.lineWidth = lineWidth;
    context.stroke();
};

export const calculateDistance = (
    x1: number,
    y1: number,
    x2: number,
    y2: number
): number => {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
};