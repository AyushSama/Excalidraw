import './App.css';
import Canvas from './Components/Canvas';
import { ActionProvider } from './Context/ActionContext';
import { ToolboxProvider } from './Context/ToolboxContext';
import { ShapesProvider } from './Context/ShapesContext';

function App() {
  return (
    <ActionProvider>
      <ToolboxProvider>
        <ShapesProvider>
        <div className="App">
          <Canvas />
        </div>
        </ShapesProvider>
      </ToolboxProvider>
    </ActionProvider>
  );
}

export default App;
