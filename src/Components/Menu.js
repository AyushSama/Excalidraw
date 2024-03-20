import React from 'react'
import Dropdown from './Dropdown'
import Navbar from './Navbar'
import Library from './Library'

function Menu(props) {
    return (
        <div className="d-flex justify-content-between" style={{ marginTop: '17px' }}>
        <Dropdown stageRef={props.stageRef}/>
        <Navbar/>
        <Library/>
        </div>
    )
}

export default Menu
