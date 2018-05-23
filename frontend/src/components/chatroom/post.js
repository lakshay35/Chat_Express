import React, { Component } from 'react';
import './post.css';

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: this.props.messages
    }
  }


  render() {
    if (this.state.messages.length === 0) {
      return null;
    } else {
      return (
        this.state.messages.map(message => {
          return (
            <div key={message.key} class="fullpost">
              <p class="post">
              <strong>{message.name}: </strong>{message.message}
              </p>
              <label class="postlabel">{message.time}</label>
            </div>
          )
        })
      );
    }
  }
}

export default Post;
