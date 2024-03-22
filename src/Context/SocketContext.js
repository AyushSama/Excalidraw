import React, { createContext, useContext, useRef , useState } from 'react';
import { io } from 'socket.io-client';

export const SocketContext = createContext();

export const useSocketContext = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
    
    const [sessionCode, setSessionCode] = useState('');
    const socketRef = useRef(null);
    const socket = io('http://localhost:5000/');
    console.log('Connection Successfull!')
    socketRef.current = socket;

    return (
        <SocketContext.Provider value={{socket: socketRef.current , sessionCode, setSessionCode}}>
            {children}
        </SocketContext.Provider>
    );
};
