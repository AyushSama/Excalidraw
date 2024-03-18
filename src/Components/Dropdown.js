import React from 'react'
import { useShapesContext } from '../Context/ShapesContext';
import { ReactComponent as List } from '../list.svg';
import { ReactComponent as Open } from '../Logo/Dropdown/folder.svg';
import { ReactComponent as Save } from '../Logo/Dropdown/download.svg';
import { ReactComponent as Export } from '../Logo/Dropdown/card-image.svg';
import { ReactComponent as Collab } from '../Logo/Dropdown/people-fill.svg';
import { ReactComponent as Help } from '../Logo/Dropdown/question-circle.svg';
import { ReactComponent as Reset } from '../Logo/Dropdown/trash3.svg';
import { ReactComponent as Plus } from '../Logo/Dropdown/gift.svg';
import { ReactComponent as Github } from '../Logo/Dropdown/github.svg';
import { ReactComponent as Twitter } from '../Logo/Dropdown/twitter-x.svg';
import { ReactComponent as Discord } from '../Logo/Dropdown/discord.svg';
import { ReactComponent as DarkMode } from '../Logo/Dropdown/moon.svg';

function Dropdown(props) {

    const exportImage = () => {
        const stage = props.stageRef.current.getStage();
        const dataURL = stage.toDataURL();
        const link = document.createElement('a');
        link.href = dataURL;
        link.download = 'drawing.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
    
    const {rectangles ,setRectangles,circles,setCircles,arrows,setArrows,diamonds,setDiamonds,lines,setLines,scribbles,setScribbles,images,setImages,lasers,setLasers} = useShapesContext();
    const resetCanvas = ()=> {
        alert('Do you really want to reset your masterpiece?');
        setRectangles([]);
        setCircles([]);
        setArrows([]);
        setDiamonds([]);
        setLines([]);
        setScribbles([]);
        setImages([]);
        setLasers([]);
        props.stageRef.current.clear();
    }

    return (
        <div class="dropdown">
            <button class="btn btn-outline-success" type="button" data-bs-toggle="dropdown"
                style={{ padding: '0 2px 5px 2px', marginLeft: '15px' }}>
                <List width="35" />
            </button>
            <ul class="dropdown-menu">
                <li style={{ padding: '2px 5px 2px 5px ' }} ><button style={{ width: '200px', textAlign: 'left' }} type="button" class="btn btn-light"><Open style={{ marginRight: '10px' }} />Open</button></li>
                <li style={{ padding: '2px 5px 2px 5px ' }} ><button style={{ width: '200px', textAlign: 'left' }} type="button" class="btn btn-light"><Save style={{ marginRight: '10px' }} />Save to...</button></li>
                <li style={{ padding: '2px 5px 2px 5px ' }} ><button style={{ width: '200px', textAlign: 'left' }} type="button" class="btn btn-light" onClick={()=>exportImage()}><Export style={{ marginRight: '10px' }} />Export Image</button></li>
                <li style={{ padding: '2px 5px 2px 5px ' }} ><button style={{ width: '200px', textAlign: 'left' }} type="button" class="btn btn-light"><Collab style={{ marginRight: '10px' }} />Live Collaboration</button></li>
                <li style={{ padding: '2px 5px 2px 5px ' }} ><button style={{ width: '200px', textAlign: 'left' }} type="button" class="btn btn-light"><Help style={{ marginRight: '10px' }} />Help</button></li>
                <li style={{ padding: '2px 5px 2px 5px ' }} ><button style={{ width: '200px', textAlign: 'left' }} type="button" class="btn btn-light" onClick={()=>resetCanvas()}><Reset style={{ marginRight: '10px' }} />Reset the Canvas</button></li>
                <hr />
                <li style={{ padding: '2px 5px 2px 5px ' }} ><button style={{ width: '200px', textAlign: 'left' }} type="button" class="btn btn-light"><Plus style={{ marginRight: '10px' }} />Excalidraw+</button></li>
                <li style={{ padding: '2px 5px 2px 5px ' }} ><button style={{ width: '200px', textAlign: 'left' }} type="button" class="btn btn-light"><Github style={{ marginRight: '10px' }} />Github</button></li>
                <li style={{ padding: '2px 5px 2px 5px ' }} ><button style={{ width: '200px', textAlign: 'left' }} type="button" class="btn btn-light"><Twitter style={{ marginRight: '10px' }} />Follow us</button></li>
                <li style={{ padding: '2px 5px 2px 5px ' }} ><button style={{ width: '200px', textAlign: 'left' }} type="button" class="btn btn-light"><Discord style={{ marginRight: '10px' }} />Discord chat</button></li>
                <hr />
                <li style={{ padding: '2px 5px 2px 5px ' }} ><button style={{ width: '200px', textAlign: 'left' }} type="button" class="btn btn-light"><DarkMode style={{ marginRight: '10px' }} />Dark mode</button></li>
                <li style={{ padding: '2px 5px 2px 5px ' }} ><button style={{ width: '200px', textAlign: 'left' }} type="button" class="btn btn-light">English</button></li>
                <li style={{ padding: '2px 5px 2px 5px ' }} ><button style={{ width: '200px', textAlign: 'left' }} type="button" class="btn btn-light">Background</button></li>
            </ul>
        </div>
    )
}

export default Dropdown
