import React, { useEffect, useState } from 'react';
import { Stage, Layer, Line, Group } from 'react-konva';
import Menu from './Menu';
import { useShapeContext } from '../Context/ShapeContext';

function Canvas() {

  const {currentShape} = useShapeContext();

  const [lines, setLines] = useState([]);
  const [isDrawing, setIsDrawing] = useState(false);

  const handleMouseDown = (event) => {
    setIsDrawing(true);
    const { x, y } = event.target.getStage().getPointerPosition();
    setLines([...lines, { points: [x, y] }]);
  };

  const handleMouseMove = (event) => {
    if (!isDrawing) return;
    const { x, y } = event.target.getStage().getPointerPosition();
    let lastLine = lines[lines.length - 1];
    lastLine.points = lastLine.points.concat([x, y]);
    setLines([...lines.slice(0, lines.length - 1), lastLine]);
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  useEffect(()=>{
    console.log(currentShape)
  },[currentShape])

  return (
    <>
    <Menu/>
    <Stage
      width={window.innerWidth}
      height={window.innerHeight}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <Layer>
        {lines.map((line, i) => (
          <Group key={i} draggable>
            <Line
              points={line.points}
              stroke="black" // Add color here
              strokeWidth={5} 
              tension={0.5} 
              lineCap="round"
              globalCompositeOperation="source-over"
            />
          </Group>
        ))}
      </Layer>
    </Stage>
    </>
  );
}

export default Canvas;
