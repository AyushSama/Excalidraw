import React from 'react';
import { useToolboxContext } from '../Context/ToolboxContext';

function Toolbox() {
    const { strokeColor , fillColor , setStrokeWidth, setStrokeColor, setFillColor } = useToolboxContext();

    const handleStrokeColor = (color) => {
        setStrokeColor(color);
    };

    const handleFillColor = (color) => {
        setFillColor(color);
    };

    const handleStokeColorChange = (event) => {
        setStrokeColor(event.target.value);
    };

    const handleFillColorChange = (event) => {
        console.log(event.target.value);
        setFillColor(event.target.value);
    };

    const handleStrokeWidth = (value) => {
        if (value === 'Slim')
            setStrokeWidth(2);
        else if (value === 'Bold')
            setStrokeWidth(4);
        else
            setStrokeWidth(6);
    };

    return (
        <div style={{ position: 'absolute', margin: '150px 0 0 15px', border: '2px solid grey', borderRadius: '10px', width: '220px', float: 'right', zIndex: '1' }} >
            <div style={{ textAlign: 'left', padding: '10px 0 5px 5px' }}>Stoke</div>
            <div className="d-flex justify-content-around">
                <button onClick={() => handleStrokeColor('#264653')} className='strokeColor' style={{ borderRadius: '8px', borderColor: "grey", background: '#264653' }} ><span>&nbsp;&nbsp;</span></button>
                <button onClick={() => handleStrokeColor('#2a9d8f')} className='strokeColor' style={{ borderRadius: '8px', borderColor: "grey", background: '#2a9d8f' }} ><span>&nbsp;&nbsp;</span></button>
                <button onClick={() => handleStrokeColor('#e9c46a')} className='strokeColor' style={{ borderRadius: '8px', borderColor: "grey", background: '#e9c46a' }} ><span>&nbsp;&nbsp;</span></button>
                <button onClick={() => handleStrokeColor('#f4a261')} className='strokeColor' style={{ borderRadius: '8px', borderColor: "grey", background: '#f4a261' }} ><span>&nbsp;&nbsp;</span></button>
                <button onClick={() => handleStrokeColor('#f4a261')} className='strokeColor' style={{ borderRadius: '8px', borderColor: "grey", background: '#f4a261' }} ><span>&nbsp;&nbsp;</span></button>
                <input onChange={handleStokeColorChange} type="color" id="strokeColorPicker" name="colorPicker" value={strokeColor}></input>
            </div>
            <hr />
            <div style={{ textAlign: 'left', padding: '5px 0 5px 5px' }}>Background</div>
            <div className="d-flex justify-content-around">
                <button onClick={() => handleFillColor('#3d5a80')} className='fillColor' style={{ borderRadius: '8px', borderColor: "grey", background: '#3d5a80' }} ><span>&nbsp;&nbsp;</span></button>
                <button onClick={() => handleFillColor('#98c1d9')} className='fillColor' style={{ borderRadius: '8px', borderColor: "grey", background: '#98c1d9' }} ><span>&nbsp;&nbsp;</span></button>
                <button onClick={() => handleFillColor('#e0fbfc')} className='fillColor' style={{ borderRadius: '8px', borderColor: "grey", background: '#e0fbfc' }} ><span>&nbsp;&nbsp;</span></button>
                <button onClick={() => handleFillColor('#ee6c4d')} className='fillColor' style={{ borderRadius: '8px', borderColor: "grey", background: '#ee6c4d' }} ><span>&nbsp;&nbsp;</span></button>
                <button onClick={() => handleFillColor('#293241')} className='fillColor' style={{ borderRadius: '8px', borderColor: "grey", background: '#293241' }} ><span>&nbsp;&nbsp;</span></button>
                <input onChange={handleFillColorChange} type="color" id="fillCcolorPicker" name="colorPicker" value={fillColor}></input>
            </div>
            <hr />
            <div style={{ textAlign: 'left', padding: '5px 0 5px 5px' }}>Stoke Width</div>
            <div className="d-flex justify-content-around">
                <button onClick={() => handleStrokeWidth('Slim')} style={{ borderRadius: '8px', borderColor: "grey", marginBottom: '15px' }}>Slim</button>
                <button onClick={() => handleStrokeWidth('Bold')} style={{ borderRadius: '8px', borderColor: "grey", marginBottom: '15px' }}>Bold</button>
                <button onClick={() => handleStrokeWidth('Thick')} style={{ borderRadius: '8px', borderColor: "grey", marginBottom: '15px' }}>Thick</button>
            </div>
        </div>
    );
}

export default Toolbox;
