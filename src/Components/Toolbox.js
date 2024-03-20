import React from 'react';
import { useToolboxContext } from '../Context/ToolboxContext';
import './Toolbox.css'

function Toolbox() {
    const { strokeColor, fillColor, setStrokeWidth, setStrokeColor, setFillColor } = useToolboxContext();

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
        <div style={{ position: 'absolute', margin: '150px 0 0 15px', borderRadius: '10px', zIndex: '1' }} >
            <section className="color-palette">
                <h2 className="section-title">Stroke</h2>
                <div className="color-grid">
                    <div onClick={() => handleStrokeColor('#264653')} className="color-swatch blue"></div>
                    <div onClick={() => handleStrokeColor('#2a9d8f')} className="color-swatch teal"></div>
                    <div onClick={() => handleStrokeColor('#e9c46a')} className="color-swatch yellow"></div>
                    <div onClick={() => handleStrokeColor('#f4a261')} className="color-swatch orange"></div>
                    <div onClick={() => handleStrokeColor('#af4848')} className="color-swatch red"></div>
                    <div className="color-separator"></div>
                    <input className="color-swatch red" onChange={handleStokeColorChange} type="color" id="strokeColorPicker" name="colorPicker" value={strokeColor}></input>
                </div>
                <hr />
                <h2 className="section-title">Background</h2>
                <div className="color-grid">
                    <div onClick={() => handleFillColor('#0d1321')} className="color-swatch dark-blue"></div>
                    <div onClick={() => handleFillColor('#1d2d44')} className="color-swatch navy"></div>
                    <div onClick={() => handleFillColor('#3e5c76')} className="color-swatch gray"></div>
                    <div onClick={() => handleFillColor('#748cab')} className="color-swatch light-gray"></div>
                    <div onClick={() => handleFillColor('#f0ebd8')} className="color-swatch off-white"></div>
                    <div className="color-separator"></div>
                    <input className="color-swatch peach" onChange={handleFillColorChange} type="color" id="fillCcolorPicker" name="colorPicker" value={fillColor}></input>
                </div>
                <hr />
                <h2 className="section-title">Stroke Width</h2>
                <div className="stroke-options">
                    <div onClick={() => handleStrokeWidth('Slim')}  className="stroke-option regular">Regular</div>
                    <div onClick={() => handleStrokeWidth('Bold')}  className="stroke-option bold">Bold</div>
                    <div onClick={() => handleStrokeWidth('Thick')} className="stroke-option extra-bold">Extra Bold</div>
                </div>                
            </section>
        </div>
    );
}

export default Toolbox;
