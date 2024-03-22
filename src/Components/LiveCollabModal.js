import React, { useState } from 'react'
import './LiveCollabModal.css'
import { ReactComponent as Collab } from '../Logo/Dropdown/people-fill.svg';
import { useSocketContext } from '../Context/SocketContext';

function LiveCollabModal() {
  const {socket , sessionCode , setSessionCode} = useSocketContext();

  const handleCreateSession = () => {
    // Send the create session request to the server
    if (socket) {
      socket.emit('createSession', sessionCode);
      console.log(sessionCode)
    }
    else
      console.log('Socket is Undefined')
  };

  const handleJoinSession = () => {
    // Send the join session request to the server
    if (socket) {
      socket.emit('joinSession', sessionCode);
      console.log(sessionCode)
    }
    else
      console.log('Socket is Undefined')
  };


  return (
    <div>
      <button style={{ display: 'none' }} id='LiveCollabModal' data-bs-toggle="modal" data-bs-target="#LiveCollaboration" type="button" className="btn btn-light"><Collab style={{ marginRight: '10px' }} />Live Collaboration</button>
      <div className="modal fade" id="LiveCollaboration" tabIndex="-1" aria-labelledby="LiveCollaborationLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <section className="live-collaboration">
              <h2 className="live-collaboration-title">Live Collaboration</h2>
              <div className="live-collaboration-content">
                <p className="live-collaboration-description">
                  Invite people to collaborate on your drawing.<br /><br />
                  Don't worry, the session is end-to-end encrypted, and fully private. Not even our server can see what you draw.
                </p>
                <div className="live-collaboration-actions">
                  <button className="join-session-button" onClick={handleJoinSession}>Join Session</button>
                  <input type="text" onChange={(e) => setSessionCode(e.target.value)} className="join-session-input" placeholder="code here..." aria-label="Enter join session code" />
                </div>
                <div className="live-collaboration-actions">
                  <button className="create-session-button" onClick={handleCreateSession}>Create Session</button>
                  <input type="text" onChange={(e) => setSessionCode(e.target.value)} className="create-session-input" placeholder="code here..." aria-label="Enter create session code" />
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LiveCollabModal
