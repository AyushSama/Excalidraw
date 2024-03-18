import React, { useRef, useState } from 'react'
import { Stage, Layer, Line, Circle, Arrow, Rect, Transformer, RegularPolygon, Image } from 'react-konva';
import { useActionContext } from '../Context/ActionContext'
import { v4 as uuidv4 } from 'uuid';
import Menu from './Menu';

export default function Canvas() {

    const { currentAction } = useActionContext();  // Get the current Action
    const stageRef = useRef();   // Reference for the Stage

    const [rectangles, setRectangles] = useState([]);
    const [circles, setCircles] = useState([]);
    const [arrows, setArrows] = useState([]);
    const [diamonds, setDiamonds] = useState([]);
    const [lines, setLines] = useState([]);
    const [scribbles, setScribbles] = useState([]);
    const [images, setImages] = useState([]);
    const [lasers, setLasers] = useState([]);

    const isDraggable = currentAction === 'cursor';
    const currentShapeId = useRef();
    const isDrawing = useRef();
    const transformerRef = useRef();

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
            case 'image':
                const input = document.createElement('input');
                input.type = 'file';
                input.accept = 'image/*';
                input.addEventListener('change', () => {
                    handleImageUpload(input.files[0], x, y, id);
                    input.remove();
                });
                input.click();
                break;
            case 'laser':
                setLasers((lasers) => [...lasers, {
                    id,
                    points: [x, y]
                }]);
                break;
            default:
                return null;
        }

    }

    const handleImageUpload = (file, x, y, id) => {
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                const imageDataUrl = reader.result;
                const image = new window.Image();
                image.src = imageDataUrl;
                image.onload = () => {
                    const newImage = {
                        id,
                        image: image,
                        x,
                        y,
                        width: 200,
                        height: 200,
                    };
                    setImages((prevImages) => [...prevImages, newImage]);
                };
            };
        }
    };

    const handleMouseMove = (e) => {

        if (currentAction === 'cursor' || !isDrawing.current)
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
                setDiamonds((diamonds) =>
                    diamonds.map((diamond) => {
                        if (diamond.id === currentShapeId.current) {
                            return { ...diamond, radius: Math.max(Math.abs(x - diamond.x), Math.abs(y - diamond.y)) };
                        }
                        return diamond;
                    })
                );
                break;
            case 'eraser':
                handleEraser(x, y);
                break;
            case 'laser':
                setLasers((lasers) =>
                    lasers.map((laser) => {
                        if (laser.id === currentShapeId.current) {
                            return {
                                ...laser,
                                points: [...laser.points, x, y],
                            }
                        }
                        return laser;
                    })
                );
                break;
            default:
                return null;
        }

    }

    const handleMouseUp = () => {
        isDrawing.current = false;
        setLasers([]);
    }

    const handleClick = (e) => {
        if (currentAction !== 'cursor')
            return;
        const target = e.currentTarget;
        transformerRef.current.nodes([target]);
    }

    const handleEraser = (mouseX, mouseY) => {
        // Iterate over each shape and check if the mouse is over it
        const updatedRectangles = rectangles.filter((rectangle) => {
            const { x, y, width, height } = rectangle;
            // Check if the mouse coordinates are within the bounds of the shape
            if (mouseX >= x && mouseX <= x + width && mouseY >= y && mouseY <= y + height) {
                return false; // Remove the rectangle
            }
            return true; // Keep the rectangle
        });

        // Update the state with the filtered rectangles
        setRectangles(updatedRectangles);

        const updatedCircles = circles.filter((circle) => {
            const { x, y, radius } = circle;
            // Check if the mouse coordinates are within the bounds of the shape
            const distance = Math.sqrt((mouseX - x) ** 2 + (mouseY - y) ** 2);
            if (distance <= radius) {
                return false; // Remove the circle
            }
            return true; // Keep the circle
        });

        setCircles(updatedCircles);

        const updatedScribbles = scribbles.filter((scribble) => {
            // Assuming scribble has properties points
            const { points } = scribble;
            // Check if the mouse coordinates are near any point of the scribble
            for (let i = 0; i < points.length; i += 2) {
                const x = points[i];
                const y = points[i + 1];
                const distance = Math.sqrt((mouseX - x) ** 2 + (mouseY - y) ** 2);
                if (distance <= 10) {
                    return false; // Remove the scribble
                }
            }
            return true; // Keep the scribble
        });

        setScribbles(updatedScribbles);

        // Remove lines (assuming the lines are represented as arrays of points)
        const updatedLines = lines.filter((line) => {
            // Assuming line has properties points
            const { points } = line;
            const [x1, y1, x2, y2] = points;
            // Check if the mouse coordinates are near the line
            const distance = pointToLineDistance(mouseX, mouseY, x1, y1, x2, y2);
            if (distance <= 20) {
                return false; // Remove the line
            }
            return true; // Keep the line
        });

        setLines(updatedLines);

        const updatedArrows = arrows.filter((arrow) => {
            // Assuming arrow has properties points
            const { points } = arrow;
            const [x1, y1, x2, y2] = points;
            // Check if the mouse coordinates are near the arrow
            const distance = pointToLineDistance(mouseX, mouseY, x1, y1, x2, y2);
            if (distance <= 20) {
                return false; // Remove the arrow
            }
            return true; // Keep the arrow
        });

        setArrows(updatedArrows);

        const updatedDiamonds = diamonds.filter((diamond) => {
            // Assuming diamond has properties x, y, radius
            const { x, y, radius } = diamond;
            // Check if the mouse coordinates are within the bounds of the shape
            if (isMouseOverDiamond(mouseX, mouseY, x, y, radius)) {
                return false; // Remove the diamond
            }
            return true; // Keep the diamond
        });

        setDiamonds(updatedDiamonds);

        const updatedImages = images.filter((image) => {
            const { x, y, width, height } = image;
            // Check if the mouse coordinates are within the bounds of the image
            if (mouseX >= x && mouseX <= x + width && mouseY >= y && mouseY <= y + height) {
                return false; // Remove the image
            }
            return true; // Keep the image
        });

        setImages(updatedImages);

    };    

    const isMouseOverDiamond = (mouseX, mouseY, diamondX, diamondY, diamondRadius) => {
        // Calculate the distances from the mouse coordinates to the center of the diamond
        const dx = Math.abs(mouseX - diamondX);
        const dy = Math.abs(mouseY - diamondY);
    
        // Check if the mouse coordinates are within the diamond's bounds
        if (dx + dy < diamondRadius) {
            // If the sum of the distances is less than the radius, the mouse is inside the diamond
            return true;
        } else if (dx < diamondRadius && dy < diamondRadius) {
            // If the mouse is within the bounding box but outside the circle, check the corners
            if (dx * dx + dy * dy < diamondRadius * diamondRadius) {
                return true;
            }
        }
        // Mouse is outside the diamond
        return false;
    };
    

    const pointToLineDistance = (x, y, x1, y1, x2, y2) => {
        const A = x - x1;
        const B = y - y1;
        const C = x2 - x1;
        const D = y2 - y1;
    
        const dot = A * C + B * D;
        const len_sq = C * C + D * D;
        let param = -1;
        if (len_sq !== 0) {
            param = dot / len_sq;
        }
    
        let xx, yy;
    
        if (param < 0) {
            xx = x1;
            yy = y1;
        } else if (param > 1) {
            xx = x2;
            yy = y2;
        } else {
            xx = x1 + param * C;
            yy = y1 + param * D;
        }
    
        const dx = x - xx;
        const dy = y - yy;
        return Math.sqrt(dx * dx + dy * dy);
    };    

    return (
        <>
            <Menu stageRef={stageRef} />
            <div style={{ height: '500px', position: 'absolute', border: '1px solid red', width: '100px', float: 'right', zIndex: '1' }}>Here</div>
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
                        onClick={() => {
                            transformerRef.current.nodes([]);
                        }}
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
                            onClick={handleClick}
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
                            onClick={handleClick}
                        />
                    ))}
                    {arrows.map((arrow) => (
                        <Arrow
                            key={arrow.id}
                            points={arrow.points}
                            stroke="black"
                            strokeWidth={2}
                            draggable={isDraggable}
                            onClick={handleClick}
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
                            onClick={handleClick}
                        />
                    ))}
                    {lines.map((line) => (
                        <Line
                            key={line.id}
                            points={line.points}
                            stroke="black"
                            strokeWidth={2}
                            draggable={isDraggable}
                            onClick={handleClick}
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
                            onClick={handleClick}
                        />
                    ))}
                    {images.map((img) => (
                        <Image
                            key={img.id}
                            image={img.image}
                            x={img.x}
                            y={img.y}
                            width={img.width}
                            height={img.height}
                            draggable={isDraggable}
                            onClick={handleClick}
                        />
                    ))}
                    {lasers.map((laser) => (
                        <Line
                            key={laser.id}
                            lineCap="round"
                            lineJoin="round"
                            points={laser.points}
                            stroke='red'
                            strokeWidth={2}
                        />
                    ))}
                    <Transformer ref={transformerRef} />
                </Layer>
            </Stage>
        </>
    )
}