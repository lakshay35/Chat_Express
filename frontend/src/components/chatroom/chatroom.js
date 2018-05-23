import React, { Component } from 'react';
import './chatroom.css';
import io from 'socket.io-client';
import Post from './post'

class Chatroom extends Component {

  constructor() {
      super();

      // Initializing state
      this.state = {
        socket: io(),
        msglist: [],
        index: 0
      }
  }

  /* When user clicks the send button */
  sendPressed = () => {
    this.state.socket.emit('chat', {
      message: document.getElementById('message').value,
      handle: document.getElementById('handle').value
    });
  }

  /* When users start typing this function informs server that the user is typing */
  messageKeyPressed = () => {
    this.state.socket.emit('typing', document.getElementById('handle').value,);
  }

  componentDidMount() {

    //Connecting to server socket
    this.state.socket.connect();


    // User has joined
    this.state.socket.on('joined', data => {
      document.getElementById('feedback').innerHTML = `<p><em>${data}</em></p>`;
      setTimeout(() => {
        document.getElementById('feedback').innerHTML = '';
      }, 2000);
    })

    // User has received a chat message
    this.state.socket.on('chat', data => {

      document.getElementById('feedback').innerHTML = '';
      var date = new Date();

      var msg = {
        name: data.handle,
        message: data.message,
        time: date.getHours() + ':' + date.getMinutes(),
        key: this.state.index
      };

      let newlist = this.state.msglist;
      newlist.push(msg);
      this.setState({
        msglist: newlist,
        index: this.state.index + 1
      });

    });

    // Notification from server that a user is typing
    this.state.socket.on('typing', data => {
      document.getElementById('feedback').innerHTML = `<p><em>${data} is typing</em></p>`;
    });
  }

  /* Renders chatroom*/
  render() {
    return (
        <div id='main'>
          <div id='chat-window'>
            <div id='output'>
              <Post key="0" messages={this.state.msglist} />
              <div id='feedback'>
              </div>
            </div>
            <div id='bottomnav'>
              <input id='handle' type='text' placeholder='Name'/>
              <input id='message' type='text' onKeyPress={this.messageKeyPressed} placeholder='Message'/>
              <button id='send' onClick={this.sendPressed}>Send</button>
            </div>
          </div>
        </div>
    );
  }
}

export default Chatroom;
