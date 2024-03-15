// ShapeContext.js
import React, { createContext, useState, useContext } from 'react';

const ShapeContext = createContext();

export const useShapeContext = () => useContext(ShapeContext);

export const ShapeProvider = ({ children }) => {
  const [currentShape, setCurrentShape] = useState('Pen');

  const changeShape = (shape) => {
    console.log(shape)
    setCurrentShape(shape);
  };

  return (
    <ShapeContext.Provider value={{ currentShape, changeShape }}>
      {children}
    </ShapeContext.Provider>
  );
};
