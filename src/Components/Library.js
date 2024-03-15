import React from 'react'
import {ReactComponent as Book }  from '../Logo/Library/book.svg'

function Library() {
  return (
    <div>
      <button type="button" class="btn btn-primary" style={{marginRight:'10px'}}>Share</button>
      <button type="button" class="btn btn-secondary"><Book style={{marginRight:'7px'}}/>Library</button>
    </div>
  )
}

export default Library
