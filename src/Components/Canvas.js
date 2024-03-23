import React, { useRef, useEffect, useState } from 'react'
import { Stage, Layer, Line, Circle, Arrow, Rect, Transformer, RegularPolygon, Image, Text } from 'react-konva';
import { useActionContext } from '../Context/ActionContext'
import { useToolboxContext } from '../Context/ToolboxContext';
import { v4 as uuidv4 } from 'uuid';
import Menu from './Menu';
import Konva from 'konva';
import Toolbox from './Toolbox';
import { useShapesContext } from '../Context/ShapesContext';
import { useSocketContext } from '../Context/SocketContext';

export default function Canvas() {

    const { currentAction , changeAction, enableTools } = useActionContext();  // Get the current Action
    const { strokeColor, fillColor, strokeWidth , backgroundColor } = useToolboxContext();
    const stageRef = useRef();   // Reference for the Stage
    const textareaRef = useRef();
    const {socket , sessionCode , disconnect} = useSocketContext();

    const { rectangles, setRectangles, circles, setCircles, arrows, setArrows, diamonds, setDiamonds, lines, setLines, scribbles, setScribbles, images, setImages, lasers, setLasers, texts, setTexts } = useShapesContext();

    const [write, setWrite] = useState(false);
    const [textPosition, setTextPosition] = useState({ x: 0, y: 0 });
    const [textValue, setTextValue] = useState('');
    const isDraggable = currentAction === 'cursor';
    const excludedActions = ['cursor', 'laser', 'pan', 'lock' , 'unlock', 'eraser', 'image', 'text'];
    const toolBox = !excludedActions.includes(currentAction);
    const currentShapeId = useRef();
    const isDrawing = useRef();
    const transformerRef = useRef();

    const laserRef = useRef();

    const handleDrawShape = (shapeType, shapeData) => {
        // Emit shape draw event to the server
        socket.emit('drawShape', sessionCode, shapeType, shapeData);
    };

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
                    strokeWidth,
                    strokeColor,
                    fillColor,
                    x,
                    y,
                    height: 0,
                    width: 0
                }]);
                handleDrawShape('rect', {
                    id,
                    strokeWidth,
                    strokeColor,
                    fillColor,
                    x,
                    y,
                    height: 0,
                    width: 0
                });
                break;
            case 'circle':
                setCircles((circles) => [...circles, {
                    id,
                    strokeWidth,
                    strokeColor,
                    fillColor,
                    x,
                    y,
                    radius: 0,
                }]);
                handleDrawShape('circle', {
                    id,
                    strokeWidth,
                    strokeColor,
                    fillColor,
                    x,
                    y,
                    radius: 0,
                });
                break;
            case 'arrow':
                setArrows((arrows) => [...arrows, {
                    id,
                    strokeWidth,
                    strokeColor,
                    points: [x, y, x + 20, y + 20]
                }]);
                handleDrawShape('arrow', {
                    id,
                    strokeWidth,
                    strokeColor,
                    points: [x, y, x + 20, y + 20]
                });
                break;
            case 'pen':
                setScribbles((scribbles) => [...scribbles, {
                    id,
                    strokeWidth,
                    strokeColor,
                    points: [x, y]
                }]);
                handleDrawShape('pen', {
                    id,
                    strokeWidth,
                    strokeColor,
                    points: [x, y]
                });
                break;
            case 'line':
                setLines((lines) => [...lines, {
                    id,
                    strokeWidth,
                    strokeColor,
                    points: [x, y, x, y]
                }]);
                handleDrawShape('line', {
                    id,
                    strokeWidth,
                    strokeColor,
                    points: [x, y]
                });
                break;
            case 'diamond':
                setDiamonds((diamonds) => [...diamonds, {
                    id,
                    strokeWidth,
                    strokeColor,
                    fillColor,
                    x,
                    y,
                    radius: 0
                }]);
                handleDrawShape('diamond', {
                    id,
                    strokeWidth,
                    strokeColor,
                    fillColor,
                    x,
                    y,
                    radius: 0
                });
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
                handleDrawShape('laser', {
                    id,
                    points: [x, y]
                });
                break;
            case 'text':
                setWrite(true);
                setTextPosition({ x, y })
                break;
            default:
                return null;
        }

    }

    const handleText = (e) => {
        setTextValue(e.target.value);
    }

    const handleTextChange = (value, x, y, height, width, size) => {
        const id = uuidv4(); // Generate unique ID for the text element
        const newText = {
            id,
            text: value, // Initial text content
            x,
            y,
            fontSize: size, // Set initial font family (adjust as needed)
            fill: '#000000',
            height,
            width // Set initial text color (adjust as needed)
        };
        setTexts((prevTexts) => [...prevTexts, newText]); // Add the new text element to state
        setWrite(false);
        setTextValue('');
        // Emit shape draw event to the server
        socket.emit('drawShape', sessionCode, 'text', newText);
    };


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

        switch (currentAction) {
            case 'rect':
                setRectangles((rectangles) =>
                    rectangles.map((rectangle) => {
                        if (rectangle.id === currentShapeId.current) {
                            const updatedShapeData = {
                                ...rectangle,
                                width: x - rectangle.x,
                                height: y - rectangle.y
                            };
                            socket.emit('updateShape',sessionCode, 'rect', updatedShapeData);
                            return updatedShapeData;
                        }
                        return rectangle;
                    })
                );
                break;
            case "circle":
                setCircles((circles) =>
                    circles.map((circle) => {
                        if (circle.id === currentShapeId.current) {
                            const updatedShapeData = {
                                ...circle,
                                radius: Math.sqrt((y - circle.y) ** 2 + (x - circle.x) ** 2),
                            };
                            socket.emit('updateShape',sessionCode, 'circle', updatedShapeData);
                            return updatedShapeData;
                        }
                        return circle;
                    })
                );
                break;
            case 'arrow':
                setArrows((arrows) =>
                    arrows.map((arrow) => {
                        if (arrow.id === currentShapeId.current) {
                            const updatedShapeData = {
                                ...arrow,
                                points: [arrow.points[0], arrow.points[1], x, y],
                            };
                            socket.emit('updateShape',sessionCode, 'arrow', updatedShapeData);
                            return updatedShapeData;
                        }
                        return arrow;
                    })
                );
                break;
            case 'pen':
                setScribbles((scribbles) =>
                    scribbles.map((scribble) => {
                        if (scribble.id === currentShapeId.current) {
                            const updatedShapeData = {
                                ...scribble,
                                points: [...scribble.points, x, y],
                            };
                            socket.emit('updateShape',sessionCode, 'pen', updatedShapeData);
                            return updatedShapeData;
                        }
                        return scribble;
                    })
                );
                break;
            case 'line':
                setLines((lines) =>
                    lines.map((line) => {
                        if (line.id === currentShapeId.current) {
                            const updatedShapeData = {
                                ...line,
                                points: [line.points[0], line.points[1], x, y],
                            };
                            socket.emit('updateShape',sessionCode, 'line', updatedShapeData);
                            return updatedShapeData;
                        }
                        return line;
                    })
                );
                break;
            case 'diamond':
                setDiamonds((diamonds) =>
                    diamonds.map((diamond) => {
                        if (diamond.id === currentShapeId.current) {
                            const updatedShapeData = {
                                ...diamond,
                                radius: Math.max(Math.abs(x - diamond.x), Math.abs(y - diamond.y)),
                            };
                            socket.emit('updateShape',sessionCode, 'diamond', updatedShapeData);
                            return updatedShapeData;
                        }
                        return diamond;
                    })
                );
                break;
            case 'eraser':
                handleEraser(x, y);
                socket.emit('eraseShapes', sessionCode, x, y);
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
        changeAction('cursor')
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
            // Calculate the rightmost and bottom coordinates
            const rightX = x + width;
            const bottomY = y + height;
            // Check if the mouse coordinates are within the bounds of the shape
            const minX = Math.min(x, rightX); // Get the leftmost x coordinate
            const maxX = Math.max(x, rightX); // Get the rightmost x coordinate
            const minY = Math.min(y, bottomY); // Get the topmost y coordinate
            const maxY = Math.max(y, bottomY); // Get the bottommost y coordinate
            if (mouseX >= minX && mouseX <= maxX && mouseY >= minY && mouseY <= maxY) {
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

        const updatedTexts = texts.filter((text) => {
            const { x, y, width, height } = text;
            // Check if the mouse coordinates are within the bounds of the text
            if (mouseX >= x && mouseX <= x + width && mouseY >= y && mouseY <= y + height) {
                return false; // Remove the text
            }
            return true; // Keep the text
        });

        setTexts(updatedTexts);

    };

    // Event listener for erasing shapes
    socket.on('eraseShapes', (mouseX, mouseY) => {
        // Call the existing handleEraser function with the received mouse coordinates
        handleEraser(mouseX, mouseY);
    });


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

    useEffect(() => {
        const lineNode = laserRef.current;
        if (lineNode) { // Check if the reference to the laser shape is valid
            const tween = new Konva.Tween({
                node: lineNode,
                opacity: 0, // End opacity value (fully transparent)
                duration: 0.5, // Duration of the tween animation in seconds
            });

            // Start the tween animation when the component mounts
            tween.play();

            // Clean up the tween when the component unmounts
            return () => {
                tween.destroy();
            };
        }
    }, [lasers]);

    // Set up event listener for 'drawShape' inside the useEffect
    // console.log(socket)
    // Event listener for updateShape event
    socket.on('updateShape', (shapeType, updatedShapeData) => {
        switch (shapeType) {
            case 'rect':
                setRectangles((rectangles) =>
                    rectangles.map((rectangle) => (1 ? { ...rectangle, ...updatedShapeData } : rectangle))
                );
                break;
            case 'circle':
                setCircles((circles) =>
                    circles.map((circle) => (1 ? { ...circle, ...updatedShapeData } : circle))
                );
                break;
            case 'arrow':
                setArrows((arrows) =>
                    arrows.map((arrow) => (1 ? { ...arrow, ...updatedShapeData } : arrow))
                );
                break;
            case 'pen':
                setScribbles((scribbles) =>
                    scribbles.map((scribble) => (1 ? { ...scribble, ...updatedShapeData } : scribble))
                );
                break;
            case 'line':
                setLines((lines) =>
                    lines.map((line) => (1 ? { ...line, ...updatedShapeData } : line))
                );
                break;
            case 'diamond':
                setDiamonds((diamonds) =>
                    diamonds.map((diamond) => (1 ? { ...diamond, ...updatedShapeData } : diamond))
                );
                break;
            case 'laser':
                setLasers((lasers) =>
                    lasers.map((laser) => (1 ? { ...laser, ...updatedShapeData } : laser))
                );
                break;
            default:
                break;
        }
    });

    socket.on('drawShape', (shapeType, shapeData) => {
        // Add the new shape to the canvas on the client side
        switch (shapeType) {
            case 'rect':
                setRectangles((rectangles) => [...rectangles, shapeData]);
                break;
            case 'circle':
                setCircles((circles) => [...circles, shapeData]);
                break;
            case 'arrow':
                setArrows((arrows) => [...arrows, shapeData]);
                break;
            case 'pen':
                setScribbles((scribbles) => [...scribbles, shapeData]);
                break;
            case 'line':
                setLines((lines) => [...lines, shapeData]);
                break;
            case 'diamond':
                setDiamonds((diamonds) => [...diamonds, shapeData]);
                break;
            case 'laser':
                setLasers((lasers) => [...lasers, shapeData]);
                break;
            case 'text':
                setTexts((texts) => [...texts, shapeData]);
                break;
            default:
                break;
        }
    });

    const disconnectSocket = ()=>{
        socket.disconnect();
        // window.location.reload();
        disconnect.current = false;
    }

    return (
        <div >
            <Menu stageRef={stageRef} />
            {write && <button style={{ marginTop: '10px' , marginRight:'10px' }} className='btn btn-outline-success' onClick={() => handleTextChange(textValue, textPosition.x, textPosition.y, textareaRef.current.offsetHeight, textareaRef.current.offsetWidth, 40)}>Add Text</button>}            
            {disconnect.current && <button style={{ marginTop: '10px' }} className='btn btn-outline-danger' onClick={()=>disconnectSocket()}>Disconnect Live Collab</button>}            
            {enableTools && toolBox && <Toolbox />}
            {write && (
                <textarea ref={textareaRef}
                    style={{
                        position: 'absolute',
                        top: textPosition.y,
                        left: textPosition.x,
                        zIndex: 9999,
                        fontSize: '40px',
                        fontFamily: 'Dawning of a New Day',
                        resize: 'both', // Allow resizing both horizontally and vertically
                        overflow: 'auto', // Set minimum height
                        maxWidth: 'none', // Disable maximum width
                        maxHeight: 'none', // Add border for visual clarity
                        padding: '5px', // Add padding for content spacing
                    }}
                    value={textValue}
                    onChange={(e) => handleText(e)}
                />
            )}
            <Stage ref={stageRef}
                height={window.innerHeight}
                width={window.innerWidth}
                onMouseMove={handleMouseMove}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}>
                <Layer>
                    <Rect
                        x={0}
                        y={0}
                        height={window.innerHeight}
                        width={window.innerWidth}
                        fill={backgroundColor}
                        id="bg"
                        onClick={() => {
                            transformerRef.current.nodes([]);
                            setWrite(false);
                        }}
                    />
                    {rectangles.map((rectangle) => (
                        <Rect
                            key={rectangle.id}
                            x={rectangle.x}
                            y={rectangle.y}
                            height={rectangle.height}
                            width={rectangle.width}
                            stroke={rectangle.strokeColor}
                            strokeWidth={rectangle.strokeWidth}
                            fill={rectangle.fillColor}
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
                            stroke={circle.strokeColor}
                            strokeWidth={circle.strokeWidth}
                            fill={circle.fillColor}
                            draggable={isDraggable}
                            onClick={handleClick}
                        />
                    ))}
                    {arrows.map((arrow) => (
                        <Arrow
                            key={arrow.id}
                            points={arrow.points}
                            stroke={arrow.strokeColor}
                            strokeWidth={arrow.strokeWidth}
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
                            stroke={scribble.strokeColor}
                            strokeWidth={scribble.strokeWidth}
                            draggable={isDraggable}
                            onClick={handleClick}
                        />
                    ))}
                    {lines.map((line) => (
                        <Line
                            key={line.id}
                            points={line.points}
                            stroke={line.strokeColor}
                            strokeWidth={line.strokeWidth}
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
                            fill={diamond.fillColor}
                            stroke={diamond.strokeColor}
                            strokeWidth={diamond.strokeWidth}
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
                            ref={laserRef}
                            key={laser.id}
                            lineCap="round"
                            lineJoin="round"
                            points={laser.points}
                            stroke='red'
                            strokeWidth={5}
                        />
                    ))}
                    {texts.map((text) => (
                        <Text
                            key={text.id}
                            text={text.text}
                            x={text.x}
                            y={text.y}
                            draggable={isDraggable}
                            onClick={handleClick}
                            height={text.height}
                            width={text.width}
                            fontSize={text.fontSize}
                            fontFamily="Dawning of a New Day"
                        />
                    ))}
                    <Transformer ref={transformerRef} />
                </Layer>
            </Stage>
        </div>
    )
}