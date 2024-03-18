// ActionContext.js
import React, { createContext, useState, useContext } from 'react';

const ActionContext = createContext();

export const useActionContext = () => useContext(ActionContext);

export const ActionProvider = ({ children }) => {
  const [currentAction, setCurrentAction] = useState('cursor');

  const changeAction = (Action) => {
    setCurrentAction(Action);
  };

  return (
    <ActionContext.Provider value={{ currentAction, changeAction }}>
      {children}
    </ActionContext.Provider>
  );
};
