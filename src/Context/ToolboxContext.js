import React, { createContext, useState, useContext } from 'react';

const ToolboxContext = createContext();

export const useToolboxContext = () => useContext(ToolboxContext);

export const ToolboxProvider = ({ children }) => {

    const [strokeColor, setStrokeColor] = useState('#000000');
    const [fillColor, setFillColor] = useState('#ffffff');
    const [strokeWidth, setStrokeWidth] = useState(2);

    return (
        <ToolboxContext.Provider value={{ strokeColor, setStrokeColor, fillColor, setFillColor, strokeWidth, setStrokeWidth }}>
            {children}
        </ToolboxContext.Provider>
    );
};
