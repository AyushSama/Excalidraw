import './App.css';
import Canvas from './Components/Canvas';
import { ActionProvider } from './Context/ActionContext';
import { ToolboxProvider } from './Context/ToolboxContext';
import { ShapesProvider } from './Context/ShapesContext';
import { SocketProvider } from './Context/SocketContext';

function App() {
  return (
    <SocketProvider>
      <ActionProvider>
        <ToolboxProvider>
          <ShapesProvider>
            <div className="App">
              <Canvas />
            </div>
          </ShapesProvider>
        </ToolboxProvider>
      </ActionProvider>
    </SocketProvider>
  );
}

export default App;
