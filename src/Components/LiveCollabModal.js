import React from 'react'
import './LiveCollabModal.css'
import { ReactComponent as Collab } from '../Logo/Dropdown/people-fill.svg';

function LiveCollabModal() { 

  return (
    <div>
      <button style={{display:'none'}} id='LiveCollabModal' data-bs-toggle="modal" data-bs-target="#LiveCollaboration" type="button" className="btn btn-light"><Collab style={{ marginRight: '10px' }} />Live Collaboration</button>
      <div class="modal fade" id="LiveCollaboration" tabindex="-1" aria-labelledby="LiveCollaborationLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <section class="live-collaboration">
              <h2 class="live-collaboration-title">Live Collaboration</h2>
              <div class="live-collaboration-content">
                <p class="live-collaboration-description">
                  Invite people to collaborate on your drawing.<br /><br />
                  Don't worry, the session is end-to-end encrypted, and fully private. Not even our server can see what you draw.
                </p>
                <div class="live-collaboration-actions">
                  <button class="join-session-button">Join Session</button>
                  <input type="text" class="join-session-input" placeholder="code here..." aria-label="Enter join session code" />
                </div>
                <div class="live-collaboration-actions">
                  <button class="create-session-button">Create Session</button>
                  <input type="text" class="create-session-input" placeholder="code here..." aria-label="Enter create session code" />
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
