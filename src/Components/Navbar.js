import React from 'react'
import {ReactComponent as Lock }  from '../Logo/Navbar/lock.svg'
import {ReactComponent as Unlock }  from '../Logo/Navbar/unlock.svg'
import {ReactComponent as Pan }  from '../Logo/Navbar/hand-index.svg'
import {ReactComponent as Cursor }  from '../Logo/Navbar/cursor.svg'
import {ReactComponent as Rectangle }  from '../Logo/Navbar/square.svg'
import {ReactComponent as Diamond }  from '../Logo/Navbar/diamond.svg'
import {ReactComponent as Circle }  from '../Logo/Navbar/circle.svg'
import {ReactComponent as Arrow }  from '../Logo/Navbar/arrow-right.svg'
import {ReactComponent as Line }  from '../Logo/Navbar/dash.svg'
import {ReactComponent as Pen }  from '../Logo/Navbar/pencil.svg'
import {ReactComponent as Text }  from '../Logo/Navbar/fonts.svg'
import {ReactComponent as InsertImage }  from '../Logo/Navbar/card-image.svg'
import {ReactComponent as Eraser }  from '../Logo/Navbar/eraser.svg'
import {ReactComponent as Tools }  from '../Logo/Navbar/gear.svg'

function Navbar() {
  return (
    <div class="d-flex justify-content-center">
        <button type="button" class="btn btn-light"><Lock  style={{margin:'3px'}}/></button>
        <button type="button" class="btn btn-light"><Pan  style={{margin:'3px'}}/></button>
        <button type="button" class="btn btn-light"><Cursor  style={{margin:'3px'}}/></button>
        <button type="button" class="btn btn-light"><Rectangle  style={{margin:'3px'}}/></button>
        <button type="button" class="btn btn-light"><Diamond  style={{margin:'3px'}}/></button>
        <button type="button" class="btn btn-light"><Circle  style={{margin:'3px'}}/></button>
        <button type="button" class="btn btn-light"><Arrow  style={{margin:'3px'}}/></button>
        <button type="button" class="btn btn-light"><Line  style={{margin:'3px'}}/></button>
        <button type="button" class="btn btn-light"><Pen  style={{margin:'3px'}}/></button>
        <button type="button" class="btn btn-light"><Text  style={{margin:'3px'}}/></button>
        <button type="button" class="btn btn-light"><InsertImage  style={{margin:'3px'}}/></button>
        <button type="button" class="btn btn-light"><Eraser  style={{margin:'3px'}}/></button>
        <button type="button" class="btn btn-light"><Tools  style={{margin:'3px'}}/></button>
    </div>
  )
}

export default Navbar
