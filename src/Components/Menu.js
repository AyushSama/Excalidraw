import React from 'react'
import Dropdown from './Dropdown'
import Navbar from './Navbar'
import Library from './Library'

function Menu() {
    return (
        <div class="d-flex justify-content-between" style={{ marginTop: '17px' }}>
        <Dropdown/>
        <Navbar/>
        <Library/>
        </div>
    )
}

export default Menu
