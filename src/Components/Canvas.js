import React, { useRef, useState } from 'react'
import { Stage, Layer, Line, Circle, Arrow, Rect, Transformer, RegularPolygon } from 'react-konva';
import { useActionContext } from '../Context/ActionContext'
import { v4 as uuidv4 } from 'uuid';
import Menu from './Menu';
import userEvent from '@testing-library/user-event';

export default function Canvas() {

    const currentAction = useActionContext();  // Get the current Action
    const stageRef = useRef();   // Reference for the Stage
    const [points, setPenPoints] = useState([]);

    const [rectangles, setRectangles] = useState([]);
    const [circles, setCircles] = useState([]);
    const [arrows, setArrows] = useState([]);
    const [diamonds, setDiamonds] = useState([]);
    const [line, setLine] = useState([]);
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

        switch (currentAction) {
            case 'rect':
                setRectangles((rectangles) => [...rectangles, {
                    id,
                    x,
                    y,
                    height: 50,
                    width: 50
                }]);
                break;
            case 'circle':
                setCircles((circles) => [...circles, {
                    id,
                    x,
                    y,
                    radius: 10,
                }])
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
            case 'circle':
                setCircles((circles) =>
                    circles.map((circle) => {
                        if (circle.id === currentShapeId.current) {
                            return {
                                ...circle,
                                radius: ((y - circle.y) ** 2 + (x - circle.x) ** 2) ** 0.5,
                            };
                        }
                        return circle;
                    })
                );
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
                </Layer>
            </Stage>
        </>
    )
}
