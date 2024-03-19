import './App.css';
import Canvas from './Components/Canvas';
import { ActionProvider } from './Context/ActionContext';
import { ToolboxProvider } from './Context/ToolboxContext';
import { ShapesProvider } from './Context/ShapesContext';
import { SocketProvider } from './Context/SocketContext';

function App() {
  return (
    <ActionProvider>
      <ToolboxProvider>
        <ShapesProvider>
          <SocketProvider>
            <div className="App">
              <Canvas />
            </div>
          </SocketProvider>
        </ShapesProvider>
      </ToolboxProvider>
    </ActionProvider>
  );
}

export default App;
