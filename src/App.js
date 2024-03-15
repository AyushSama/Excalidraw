import logo from './logo.svg';
import './App.css';
import Canvas from './Components/Canvas';
import { ShapeProvider } from './Context/ShapeContext';

function App() {
  return (
    <ShapeProvider>
    <div className="App">
      <Canvas/>
    </div>
    </ShapeProvider>
  );
}

export default App;
