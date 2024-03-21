// ActionContext.js
import React, { createContext, useState, useContext, useRef } from 'react';

const ActionContext = createContext();

export const useActionContext = () => useContext(ActionContext);

export const ActionProvider = ({ children }) => {
  const [currentAction, setCurrentAction] = useState('cursor');
  const [enableTools, setEnableTools] = useState(false);

  const changeAction = (Action) => {
    setCurrentAction(Action);
  };

  return (
    <ActionContext.Provider value={{ currentAction, changeAction , enableTools ,setEnableTools }}>
      {children}
    </ActionContext.Provider>
  );
};
