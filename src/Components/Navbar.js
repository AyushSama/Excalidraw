import React, { useEffect } from 'react'
import { useActionContext } from '../Context/ActionContext'
import { ReactComponent as Lock } from '../Logo/Navbar/lock.svg'
import { ReactComponent as Unlock } from '../Logo/Navbar/unlock.svg'
import { ReactComponent as Pan } from '../Logo/Navbar/hand-index.svg'
import { ReactComponent as Cursor } from '../Logo/Navbar/cursor.svg'
import { ReactComponent as Rectangle } from '../Logo/Navbar/square.svg'
import { ReactComponent as Diamond } from '../Logo/Navbar/diamond.svg'
import { ReactComponent as Circle } from '../Logo/Navbar/circle.svg'
import { ReactComponent as Arrow } from '../Logo/Navbar/arrow-right.svg'
import { ReactComponent as Line } from '../Logo/Navbar/dash.svg'
import { ReactComponent as Pen } from '../Logo/Navbar/pencil.svg'
import { ReactComponent as Text } from '../Logo/Navbar/fonts.svg'
import { ReactComponent as InsertImage } from '../Logo/Navbar/card-image.svg'
import { ReactComponent as Eraser } from '../Logo/Navbar/eraser.svg'
import { ReactComponent as Tools } from '../Logo/Navbar/gear.svg'

function Navbar() {
  
  const { currentAction, changeAction, enableTools, setEnableTools } = useActionContext();

  useEffect(() => {
    const navButtons = document.querySelectorAll('.nav-button');
    navButtons.forEach(button => {
      button.classList.remove('selected');
      if (button.id === currentAction) {
        button.classList.add('selected');
      }
    });
  }, [currentAction]);

  return (
    <div className="nav-buttons">
      {enableTools && <button id='lock' onClick={() => { setEnableTools(prev => !prev) ; changeAction('lock') }} type="button" className="nav-button"><Lock /></button>}
      {!enableTools && <button id='unlock' onClick={() => { setEnableTools(prev => !prev) ; changeAction('unlock') }} type="button" className="nav-button"><Unlock /></button>}
      <button id='pan' onClick={() => changeAction('pan')} type="button" className="nav-button"><Pan /></button>
      <button id='cursor' onClick={() => changeAction('cursor')} type="button" className="nav-button selected"><Cursor /></button>
      <div className="divider"></div>
      <button id='rect' onClick={() => changeAction('rect')} type="button" className="nav-button"><Rectangle /></button>
      <button id='diamond' onClick={() => changeAction('diamond')} type="button" className="nav-button"><Diamond /></button>
      <button id='circle' onClick={() => changeAction('circle')} type="button" className="nav-button"><Circle /></button>
      <button id='arrow' onClick={() => changeAction('arrow')} type="button" className="nav-button"><Arrow /></button>
      <button id='line' onClick={() => changeAction('line')} type="button" className="nav-button"><Line /></button>
      <button id='pen' onClick={() => changeAction('pen')} type="button" className="nav-button"><Pen /></button>
      <button id='text' onClick={() => changeAction('text')} type="button" className="nav-button"><Text /></button>
      <button id='image' onClick={() => changeAction('image')} type="button" className="nav-button"><InsertImage /></button>
      <button id='eraser' onClick={() => changeAction('eraser')} type="button" className="nav-button"><Eraser /></button>
      <div className="divider"></div>
      <button id='laser' onClick={() => changeAction('laser')} type="button" className="nav-button"><Tools /></button>
    </div>
  )
}

export default Navbar
