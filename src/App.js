import logo from './logo.svg';
import './App.css';
import Canvas from './Components/Canvas';
import { ActionProvider } from './Context/ActionContext';

function App() {
  return (
    <ActionProvider>
    <div className="App">
      <Canvas/>
    </div>
    </ActionProvider>
  );
}

export default App;
