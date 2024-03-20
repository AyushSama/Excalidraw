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
            <section class="color-palette">
                <h2 class="section-title">Stroke</h2>
                <div class="color-grid">
                    <div onClick={() => handleStrokeColor('#264653')} class="color-swatch blue"></div>
                    <div onClick={() => handleStrokeColor('#2a9d8f')} class="color-swatch teal"></div>
                    <div onClick={() => handleStrokeColor('#e9c46a')} class="color-swatch yellow"></div>
                    <div onClick={() => handleStrokeColor('#f4a261')} class="color-swatch orange"></div>
                    <div onClick={() => handleStrokeColor('#af4848')} class="color-swatch red"></div>
                    <div class="color-separator"></div>
                    <input class="color-swatch red" onChange={handleStokeColorChange} type="color" id="strokeColorPicker" name="colorPicker" value={strokeColor}></input>
                </div>
                <hr />
                <h2 class="section-title">Background</h2>
                <div class="color-grid">
                    <div onClick={() => handleFillColor('#0d1321')} class="color-swatch dark-blue"></div>
                    <div onClick={() => handleFillColor('#1d2d44')} class="color-swatch navy"></div>
                    <div onClick={() => handleFillColor('#3e5c76')} class="color-swatch gray"></div>
                    <div onClick={() => handleFillColor('#748cab')} class="color-swatch light-gray"></div>
                    <div onClick={() => handleFillColor('#f0ebd8')} class="color-swatch off-white"></div>
                    <div class="color-separator"></div>
                    <input class="color-swatch peach" onChange={handleFillColorChange} type="color" id="fillCcolorPicker" name="colorPicker" value={fillColor}></input>
                </div>
                <hr />
                <h2 class="section-title">Stroke Width</h2>
                <div class="stroke-options">
                    <div onClick={() => handleStrokeWidth('Slim')}  class="stroke-option regular">Regular</div>
                    <div onClick={() => handleStrokeWidth('Bold')}  class="stroke-option bold">Bold</div>
                    <div onClick={() => handleStrokeWidth('Thick')} class="stroke-option extra-bold">Extra Bold</div>
                </div>                
            </section>
        </div>
    );
}

export default Toolbox;
