import React, { createContext, useState, useContext } from 'react';

const ShapesContext = createContext();

export const useShapesContext = () => useContext(ShapesContext);

export const ShapesProvider = ({ children }) => {

    const [rectangles, setRectangles] = useState([]);
    const [circles, setCircles] = useState([]);
    const [arrows, setArrows] = useState([]);
    const [diamonds, setDiamonds] = useState([]);
    const [lines, setLines] = useState([]);
    const [scribbles, setScribbles] = useState([]);
    const [images, setImages] = useState([]);
    const [lasers, setLasers] = useState([]);
    const [texts, setTexts] = useState([]);

  return (
    <ShapesContext.Provider value={{rectangles ,setRectangles,circles,setCircles,arrows,setArrows,diamonds,setDiamonds,lines,setLines,scribbles,setScribbles,images,setImages,lasers,setLasers,texts,setTexts}}>
      {children}
    </ShapesContext.Provider>
  );
};
