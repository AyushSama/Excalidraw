import React from 'react'
import { useActionContext } from '../Context/ActionContext'
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

  const navButtons = document.querySelectorAll('.nav-button');

  navButtons.forEach(button => {
    button.addEventListener('click', () => {
      navButtons.forEach(btn => btn.classList.remove('selected'));
      button.classList.add('selected');
    });
  });

  const {changeAction , enableTools , setEnableTools} = useActionContext();

  return (
    <div className="nav-buttons">
        {enableTools && <button onClick={() => {setEnableTools(prev => !prev)}} type="button" className="nav-button"><Lock  /></button>}
        {!enableTools && <button onClick={() => {setEnableTools(prev => !prev)} } type="button" className="nav-button"><Unlock  /></button>}
        <button onClick={() => changeAction('pan')} type="button" className="nav-button"><Pan  /></button>
        <button onClick={() => changeAction('cursor')} type="button" className="nav-button selected"><Cursor  /></button>
        <div class="divider"></div>
        <button onClick={() => changeAction('rect')} type="button" className="nav-button"><Rectangle  /></button>
        <button onClick={() => changeAction('diamond')} type="button" className="nav-button"><Diamond  /></button>
        <button onClick={() => changeAction('circle')} type="button" className="nav-button"><Circle  /></button>
        <button onClick={() => changeAction('arrow')} type="button" className="nav-button"><Arrow  /></button>
        <button onClick={() => changeAction('line')} type="button" className="nav-button"><Line  /></button>
        <button onClick={() => changeAction('pen')} type="button" className="nav-button"><Pen  /></button>
        <button onClick={() => changeAction('text')} type="button" className="nav-button"><Text  /></button>
        <button onClick={() => changeAction('image')} type="button" className="nav-button"><InsertImage  /></button>
        <button onClick={() => changeAction('eraser')} type="button" className="nav-button"><Eraser  /></button>
        <div class="divider"></div>
        <button onClick={() => changeAction('laser')} type="button" className="nav-button"><Tools  /></button>
    </div>
  )
}

export default Navbar
