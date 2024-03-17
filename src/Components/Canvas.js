import React, { useRef, useState } from 'react'
import { Stage, Layer, Line, Circle, Arrow, Rect, Transformer, RegularPolygon } from 'react-konva';
import { useActionContext } from '../Context/ActionContext'
import { v4 as uuidv4 } from 'uuid';
import Menu from './Menu';

export default function Canvas() {

    const { currentAction } = useActionContext();  // Get the current Action
    const stageRef = useRef();   // Reference for the Stage
    const [points, setPenPoints] = useState([]);

    const [rectangles, setRectangles] = useState([]);
    const [circles, setCircles] = useState([]);
    const [arrows, setArrows] = useState([]);
    const [diamonds, setDiamonds] = useState([]);
    const [lines, setLines] = useState([]);
    const [scribbles, setScribbles] = useState([]);

    const isDraggable = currentAction === 'select';
    const currentShapeId = useRef();
    const isDrawing = useRef();

    const handleMouseDown = (e) => {

        if (currentAction === 'select')
            return;
        const stage = stageRef.current;
        const { x, y } = stage.getPointerPosition();
        const id = uuidv4();

        currentShapeId.current = id;
        isDrawing.current = true;

        console.log(currentShapeId.current)

        switch (currentAction) {
            case 'rect':
                setRectangles((rectangles) => [...rectangles, {
                    id,
                    x,
                    y,
                    height: 0,
                    width: 0
                }]);
                break;
            case 'circle':
                setCircles((circles) => [...circles, {
                    id,
                    x,
                    y,
                    radius: 0,
                }]);
                break;
            case 'arrow':
                setArrows((arrows) => [...arrows, {
                    id,
                    points: [x, y, x + 20, y + 20]
                }]);
                break;
            case 'pen':
                setScribbles((scribbles) => [...scribbles, {
                    id,
                    points: [x, y]
                }]);
                break;
            case 'line':
                setLines((lines) => [...lines, {
                    id,
                    points: [x, y, x, y]
                }]);
                break;
            case 'diamond': 
                setDiamonds((diamonds) => [...diamonds, {
                    id,
                    x,
                    y,
                    radius: 0
                }]);
                break;
        }

    }

    const handleMouseMove = (e) => {

        if (currentAction === 'select' || !isDrawing.current)
            return;

        const stage = stageRef.current;
        const { x, y } = stage.getPointerPosition();

        console.log(currentAction + "  " + currentShapeId.current)

        switch (currentAction) {
            case 'rect':
                setRectangles((rectangles) =>
                    rectangles.map((rectangle) => {
                        if (rectangle.id === currentShapeId.current) {
                            return {
                                ...rectangle,
                                width: x - rectangle.x,
                                height: y - rectangle.y
                            };
                        }
                        return rectangle;
                    })
                );
                break;
            case "circle":
                setCircles((circles) =>
                    circles.map((circle) => {
                        if (circle.id === currentShapeId.current) {
                            return {
                                ...circle,
                                radius: Math.sqrt((y - circle.y) ** 2 + (x - circle.x) ** 2),
                            };
                        }
                        return circle;
                    })
                );
                break;
            case 'arrow':
                setArrows((arrows) =>
                    arrows.map((arrow) => {
                        if (arrow.id === currentShapeId.current) {
                            return {
                                ...arrow,
                                points: [arrow.points[0], arrow.points[1], x, y],
                            }
                        }
                        return arrow;
                    })
                );
                break;
            case 'pen':
                setScribbles((scribbles) =>
                    scribbles.map((scribble) => {
                        if (scribble.id === currentShapeId.current) {
                            return {
                                ...scribble,
                                points: [...scribble.points, x, y],
                            }
                        }
                        return scribble;
                    })
                );
                break;
            case 'line':
                setLines((lines) =>
                    lines.map((line) => {
                        if (line.id === currentShapeId.current) {
                            return {
                                ...line,
                                points: [line.points[0], line.points[1], x, y]
                            }
                        }
                        return line;
                    })
                );
                break;
            case 'diamond': 
                    diamonds.map((diamond) => {
                        if (diamond.id === currentShapeId.current) {
                            return { ...diamond, radius: Math.max(Math.abs(x - diamond.x), Math.abs(y - diamond.y)) };
                        }
                        return diamond;
                    })
                );
                break;
            default:
                return null;
        }

    }

    const handleMouseUp = () => {
        isDrawing.current = false;
    }



    return (
        <>
            <Menu stageRef={stageRef} />
            <Stage ref={stageRef}
                width={window.innerWidth}
                height={window.innerHeight}
                onMouseMove={handleMouseMove}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}>
                <Layer>
                    <Rect
                        x={0}
                        y={0}
                        height={window.innerHeight}
                        width={window.innerWidth}
                        fill="#ffffff"
                        id="bg"
                    />
                    {rectangles.map((rectangle) => (
                        <Rect
                            key={rectangle.id}
                            x={rectangle.x}
                            y={rectangle.y}
                            height={rectangle.height}
                            width={rectangle.width}
                            stroke="black"
                            fill='red'
                            strokeWidth={2}
                            draggable={isDraggable}
                        />
                    ))}

                    {circles.map((circle) => (
                        <Circle
                            key={circle.id}
                            radius={circle.radius}
                            x={circle.x}
                            y={circle.y}
                            stroke="black"
                            strokeWidth={2}
                            draggable={isDraggable}
                        />
                    ))}
                    {arrows.map((arrow) => (
                        <Arrow
                            key={arrow.id}
                            points={arrow.points}
                            stroke="black"
                            strokeWidth={2}
                            draggable={isDraggable}
                        />
                    ))}
                    {scribbles.map((scribble) => (
                        <Line
                            key={scribble.id}
                            lineCap="round"
                            lineJoin="round"
                            points={scribble.points}
                            stroke="black"
                            strokeWidth={2}
                            draggable={isDraggable}
                        />
                    ))}
                    {lines.map((line) => (
                        <Line
                            key={line.id}
                            points={line.points}
                            stroke="black"
                            strokeWidth={2}
                            draggable={isDraggable}
                        />
                    ))}
                    {diamonds.map((diamond) => (
                        <RegularPolygon
                            key={diamond.id}
                            sides={4} 
                            radius={diamond.radius}
                            x={diamond.x}
                            y={diamond.y}
                            stroke="black"
                            strokeWidth={2}
                            draggable={isDraggable}
                        />
                    ))}
                </Layer>
            </Stage>
        </>
    )
}
