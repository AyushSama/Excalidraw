import React from 'react'
import {ReactComponent as Book }  from '../Logo/Library/book.svg'

function Library() {
  return (
    <div className='user-actions'>
      <button type="button" className="btn btn-primary user-icon" style={{marginRight:'10px'}}>Share</button>
      <button type="button" className="btn btn-secondary cart-icon"><Book style={{marginRight:'7px'}}/>Library</button>
    </div>
  )
}

export default Library
