import React, { createContext, useContext, useRef } from 'react';
import { io } from 'socket.io-client';

export const SocketContext = createContext();

export const useSocketContext = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
    const socketRef = useRef(null);
    const socket = io('http://localhost:5000/');
    socketRef.current = socket;

    return (
        <SocketContext.Provider value={socketRef.current}>
            {children}
        </SocketContext.Provider>
    );
};
