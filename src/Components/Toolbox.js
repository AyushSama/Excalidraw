import React from 'react'

function Toolbox() {
    return (
        <div style={{ position: 'absolute', margin: '150px 0 0 15px', border: '2px solid grey', borderRadius:'10px', width: '220px', float: 'right', zIndex: '1' }} >
            <div style={{ textAlign: 'left', padding: '10px 0 5px 5px' }}>Stoke</div>
            <div class="d-flex justify-content-around">
                <button style={{ borderRadius: '8px', borderColor: "grey", background: '#264653' }} ><span>&nbsp;&nbsp;</span></button>
                <button style={{ borderRadius: '8px', borderColor: "grey", background: '#2a9d8f' }} ><span>&nbsp;&nbsp;</span></button>
                <button style={{ borderRadius: '8px', borderColor: "grey", background: '#e9c46a' }} ><span>&nbsp;&nbsp;</span></button>
                <button style={{ borderRadius: '8px', borderColor: "grey", background: '#f4a261' }} ><span>&nbsp;&nbsp;</span></button>
                <button style={{ borderRadius: '8px', borderColor: "grey", background: '#f4a261' }} ><span>&nbsp;&nbsp;</span></button>
                <input type="color" id="colorPicker" name="colorPicker" value="#fff3b0"></input>
            </div>
            <hr/>
            <div style={{ textAlign: 'left', padding: '5px 0 5px 5px' }}>Background</div>
            <div class="d-flex justify-content-around">
                <button style={{ borderRadius: '8px', borderColor: "grey", background: '#3d5a80' }} ><span>&nbsp;&nbsp;</span></button>
                <button style={{ borderRadius: '8px', borderColor: "grey", background: '#98c1d9' }} ><span>&nbsp;&nbsp;</span></button>
                <button style={{ borderRadius: '8px', borderColor: "grey", background: '#e0fbfc' }} ><span>&nbsp;&nbsp;</span></button>
                <button style={{ borderRadius: '8px', borderColor: "grey", background: '#ee6c4d' }} ><span>&nbsp;&nbsp;</span></button>
                <button style={{ borderRadius: '8px', borderColor: "grey", background: '#293241' }} ><span>&nbsp;&nbsp;</span></button>
                <input type="color" id="colorPicker" name="colorPicker" value="#fff3b0"></input>
            </div>
            <hr />
            <div style={{ textAlign: 'left', padding: '5px 0 5px 5px' }}>Stoke Width</div>
            <div class="d-flex justify-content-around">
                <button style={{ borderRadius: '8px', borderColor: "grey" , marginBottom:'15px'}}>Slim</button>
                <button style={{ borderRadius: '8px', borderColor: "grey" , marginBottom:'15px'}}>Bold</button>
                <button style={{ borderRadius: '8px', borderColor: "grey" , marginBottom:'15px'}}>Thick</button>
            </div>
        </div>
    )
}

export default Toolbox
