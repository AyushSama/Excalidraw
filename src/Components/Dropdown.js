import React from 'react'
import { ReactComponent as List } from '../list.svg';

function Dropdown() {
    return (
        <div class="dropdown">
            <button class="btn btn-outline-success" type="button" data-bs-toggle="dropdown"
                style={{ padding: '0 2px 5px 2px', marginLeft: '15px' }}>
                <List width="35" />
            </button>
            <ul class="dropdown-menu">
                <li style={{padding:'2px 5px 2px 5px '}} ><button style={{width:'200px'}} type="button" class="btn btn-light">Open</button></li>
                <li style={{padding:'2px 5px 2px 5px '}} ><button style={{width:'200px'}} type="button" class="btn btn-light">Save to...</button></li>
                <li style={{padding:'2px 5px 2px 5px '}} ><button style={{width:'200px'}} type="button" class="btn btn-light">Export Image</button></li>
                <li style={{padding:'2px 5px 2px 5px '}} ><button style={{width:'200px'}} type="button" class="btn btn-light">Live Collaboration</button></li>
                <li style={{padding:'2px 5px 2px 5px '}} ><button style={{width:'200px'}} type="button" class="btn btn-light">Help</button></li>
                <li style={{padding:'2px 5px 2px 5px '}} ><button style={{width:'200px'}} type="button" class="btn btn-light">Reset the Canvas</button></li>
                <li style={{padding:'2px 5px 2px 5px '}} ><button style={{width:'200px'}} type="button" class="btn btn-light">Excalidraw+</button></li>
                <li style={{padding:'2px 5px 2px 5px '}} ><button style={{width:'200px'}} type="button" class="btn btn-light">Github</button></li>
                <li style={{padding:'2px 5px 2px 5px '}} ><button style={{width:'200px'}} type="button" class="btn btn-light">Follow us</button></li>
                <li style={{padding:'2px 5px 2px 5px '}} ><button style={{width:'200px'}} type="button" class="btn btn-light">Discord chat</button></li>
                <li style={{padding:'2px 5px 2px 5px '}} ><button style={{width:'200px'}} type="button" class="btn btn-light">Dark mode</button></li>
                <li style={{padding:'2px 5px 2px 5px '}} ><button style={{width:'200px'}} type="button" class="btn btn-light">English</button></li>
                <li style={{padding:'2px 5px 2px 5px '}} ><button style={{width:'200px'}} type="button" class="btn btn-light">Background</button></li>
            </ul>
        </div>
    )
}

export default Dropdown
