import React, { useState } from 'react';
import { Stage, Layer, Line, Rect, Circle, Arrow, RegularPolygon } from 'react-konva';
import Menu from './Menu';
import { useShapeContext } from '../Context/ShapeContext';

function Canvas() {
  const { currentShape } = useShapeContext();

  const [lines, setLines] = useState([]);
  const [penPoints, setPenPoints] = useState([]);
  const [isDrawing, setIsDrawing] = useState(false);

  const handleMouseDown = (event) => {
    setIsDrawing(true);
    const { x, y } = event.target.getStage().getPointerPosition();
    if (currentShape === 'pen') {
      setPenPoints([...penPoints, { x, y }]);
    } else {
      setLines([...lines, { type: currentShape, points: [x, y] }]);
    }
  };

  const handleMouseMove = (event) => {
    if (!isDrawing) return;
    const { x, y } = event.target.getStage().getPointerPosition();
    if (currentShape === 'pen') {
      setPenPoints([...penPoints, { x, y }]);
    } else {
      const updatedLines = [...lines];
      const lastLine = updatedLines[updatedLines.length - 1];
      lastLine.points = [lastLine.points[0], lastLine.points[1], x, y];
      setLines(updatedLines);
    }
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
    if (currentShape === 'pen') {
      setLines([...lines, { type: 'pen', points: penPoints.map((point) => [point.x, point.y]).flat() }]);
      setPenPoints([]);
    }
  };

  return (
    <>
      <Menu />
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        <Layer>
          {lines.map((shape, i) => {
            switch (shape.type) {
              case 'line':
                return (
                  <Line
                    key={i}
                    points={shape.points}
                    stroke="black"
                    strokeWidth={5}
                    tension={0.5}
                    lineCap="round"
                    globalCompositeOperation="source-over"
                  />
                );
              case 'rect':
                return (
                  <Rect
                    key={i}
                    x={shape.points[0]}
                    y={shape.points[1]}
                    width={shape.points[2] - shape.points[0]}
                    height={shape.points[3] - shape.points[1]}
                    stroke="black"
                    strokeWidth={5}
                  />
                );
              case 'circle':
                const [x1, y1, x2, y2] = shape.points;
                const radius = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
                return (
                  <Circle
                    key={i}
                    x={x1}
                    y={y1}
                    radius={radius}
                    stroke="black"
                    strokeWidth={5}
                  />
                );
              case 'arrow':
                return (
                  <Arrow
                    key={i}
                    points={shape.points}
                    stroke="black"
                    strokeWidth={5}
                    tension={0.5}
                    pointerWidth={10}
                    pointerLength={10}
                  />
                );
              case 'diamond':
                return (
                  <RegularPolygon
                    key={i}
                    x={(shape.points[0] + shape.points[2]) / 2}
                    y={(shape.points[1] + shape.points[3]) / 2}
                    sides={4}
                    radius={Math.sqrt(Math.pow(shape.points[2] - shape.points[0], 2) + Math.pow(shape.points[3] - shape.points[1], 2)) / 2}
                    stroke="black"
                    strokeWidth={5}
                  />
                );
              default:
                return null;
            }
          })}
        </Layer>
        <Layer>
          <Line
            points={penPoints.map((point) => [point.x, point.y]).flat()}
            stroke="black"
            strokeWidth={5}
            tension={0.5}
            lineCap="round"
            globalCompositeOperation="source-over"
          />
        </Layer>
      </Stage>
    </>
  );
}

export default Canvas;
