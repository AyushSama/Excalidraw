import React from 'react'
import LiveCollabModal from './LiveCollabModal';
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

    const { rectangles, setRectangles, circles, setCircles, arrows, setArrows, diamonds, setDiamonds, lines, setLines, scribbles, setScribbles, images, setImages, lasers, setLasers } = useShapesContext();
    const resetCanvas = () => {
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

    const saveDrawing = () => {
        const drawingName = window.prompt("Enter a name for your drawing:");
        const serializedData = {
            rectangles,
            circles,
            arrows,
            diamonds,
            lines,
            scribbles,
            images,
            lasers
        };
        const serializedJSON = JSON.stringify(serializedData);
        localStorage.setItem(drawingName, serializedJSON);
        console.log(serializedData);
    }

    const openDrawing = () => {
        const keys = Object.keys(localStorage);
        const selectedDrawingName = window.prompt("Enter the name of the drawing you want to open:", keys[0]);

        if (selectedDrawingName) {
            const serializedData = localStorage.getItem(selectedDrawingName);

            if (serializedData) {
                const parsedData = JSON.parse(serializedData);

                // Set the shapes context states with the parsed data
                setRectangles(parsedData.rectangles);
                setCircles(parsedData.circles);
                setArrows(parsedData.arrows);
                setDiamonds(parsedData.diamonds);
                setLines(parsedData.lines);
                setScribbles(parsedData.scribbles);
                setImages(parsedData.images);
                setLasers(parsedData.lasers);

                console.log(`Drawing "${selectedDrawingName}" opened from localStorage.`);
            } else {
                alert(`Drawing "${selectedDrawingName}" not found in localStorage.`);
            }
        } else {
            console.log("User canceled the open operation."); // Optional: Log message if user cancels
        }
    }

    return (
        <div className="dropdown">
            <button className="btn btn-outline-success" type="button" data-bs-toggle="dropdown"
                style={{ padding: '0 2px 5px 2px', marginLeft: '15px' }}>
                <List width="35" />
            </button>
            <div>
            <ul className="dropdown-menu">
                <li style={{ padding: '2px 5px 2px 5px ' }} ><button style={{ width: '200px', textAlign: 'left' }} type="button" className="btn btn-light" onClick={() => openDrawing()}><Open style={{ marginRight: '10px' }} />Open</button></li>
                <li style={{ padding: '2px 5px 2px 5px ' }} ><button style={{ width: '200px', textAlign: 'left' }} type="button" className="btn btn-light" onClick={() => saveDrawing()}><Save style={{ marginRight: '10px' }} />Save to...</button></li>
                <li style={{ padding: '2px 5px 2px 5px ' }} ><button style={{ width: '200px', textAlign: 'left' }} type="button" className="btn btn-light" onClick={() => exportImage()}><Export style={{ marginRight: '10px' }} />Export Image</button></li>
                <li style={{ padding: '2px 5px 2px 5px ' }} ><button style={{ width: '200px', textAlign: 'left' }} type="button" class="btn btn-light" onClick={()=>(document.getElementById('LiveCollabModal').click())}><Collab style={{ marginRight: '10px' }} />Live Collaboration</button></li>
                <li style={{ padding: '2px 5px 2px 5px ' }} ><button style={{ width: '200px', textAlign: 'left' }} type="button" className="btn btn-light"><Help style={{ marginRight: '10px' }} />Help</button></li>
                <li style={{ padding: '2px 5px 2px 5px ' }} ><button style={{ width: '200px', textAlign: 'left' }} type="button" className="btn btn-light" onClick={() => resetCanvas()}><Reset style={{ marginRight: '10px' }} />Reset the Canvas</button></li>
                <hr />
                <li style={{ padding: '2px 5px 2px 5px ' }} ><button style={{ width: '200px', textAlign: 'left' }} type="button" className="btn btn-light"><Plus style={{ marginRight: '10px' }} />Excalidraw+</button></li>
                <li style={{ padding: '2px 5px 2px 5px ' }} ><button style={{ width: '200px', textAlign: 'left' }} type="button" className="btn btn-light"><Github style={{ marginRight: '10px' }} />Github</button></li>
                <li style={{ padding: '2px 5px 2px 5px ' }} ><button style={{ width: '200px', textAlign: 'left' }} type="button" className="btn btn-light"><Twitter style={{ marginRight: '10px' }} />Follow us</button></li>
                <li style={{ padding: '2px 5px 2px 5px ' }} ><button style={{ width: '200px', textAlign: 'left' }} type="button" className="btn btn-light"><Discord style={{ marginRight: '10px' }} />Discord chat</button></li>
                <hr />
                <li style={{ padding: '2px 5px 2px 5px ' }} ><button style={{ width: '200px', textAlign: 'left' }} type="button" className="btn btn-light"><DarkMode style={{ marginRight: '10px' }} />Dark mode</button></li>
                <li style={{ padding: '2px 5px 2px 5px ' }} ><button style={{ width: '200px', textAlign: 'left' }} type="button" className="btn btn-light">English</button></li>
                <li style={{ padding: '2px 5px 2px 5px ' }} ><button style={{ width: '200px', textAlign: 'left' }} type="button" className="btn btn-light">Background</button></li>
            </ul>
            <LiveCollabModal/>
            </div>
        </div>
    )
}

export default Dropdown
