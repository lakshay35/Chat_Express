import React, { Component } from 'react';
import './chatroom.css';
import io from 'socket.io-client';


class Chatroom extends Component {

  constructor() {
      super();
      this.state = {
        socket: io('http://localhost:3000')
      }

      // Binding this keyword to the compnent functions due to ES6
      this.sendPressed = this.sendPressed.bind(this);
      this.messageKeyPressed = this.messageKeyPressed.bind(this);
      this.componentDidMount = this.componentDidMount.bind(this);
  }

  /* When user clicks the send button */
  sendPressed() {
    console.log('pressed send');
    this.state.socket.emit('chat', {
      message: document.getElementById('message').value,
      handle: document.getElementById('handle').value
    });
  }

  /* When users start typing this function informs server that the user is typing */
  messageKeyPressed() {
    this.state.socket.emit('typing', document.getElementById('handle').value,);
    console.log(document.getElementById('handle').value);
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
      var div = document.createElement('div');
      var node = document.createElement('p');
      var strong = document.createElement('strong');
      var handle = document.createTextNode(data.handle + ': ');
      strong.appendChild(handle);
      node.appendChild(strong);
      var message = document.createTextNode(data.message);
      node.appendChild(message)
      node.classList.add('post');
      div.appendChild(node);
      var date = new Date();
      var label = document.createElement('label');
      var d = document.createTextNode(`${date.getHours()}:${date.getMinutes()}`);
      label.appendChild(d);
      label.classList.add('postlabel');
      div.appendChild(node);
      div.appendChild(label);
      div.classList.add('fullpost');
      document.getElementById('output').appendChild(div);
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
