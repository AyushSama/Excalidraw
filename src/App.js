import logo from './logo.svg';
import './App.css';
import Canvas from './Components/Canvas';
import { ActionProvider } from './Context/ActionContext';
import { ToolboxProvider } from './Context/ToolboxContext';

function App() {
  return (
    <ActionProvider>
      <ToolboxProvider>
        <div className="App">
          <Canvas />
        </div>
      </ToolboxProvider>
    </ActionProvider>
  );
}

export default App;
