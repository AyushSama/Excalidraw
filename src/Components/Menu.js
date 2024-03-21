import React from 'react'
import Dropdown from './Dropdown'
import Navbar from './Navbar'
import Library from './Library'
import './Menu.css'

function Menu(props) {
    return (
        <nav className='navbar' style={{marginTop: '17px', marginBottom: '3px' }} >
            <Dropdown stageRef={props.stageRef} />
            <Navbar />
            <Library />
        </nav>
    )
}

export default Menu
