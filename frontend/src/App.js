import React, { Component } from 'react';
import './App.css';
import Chatroom from './components/chatroom/chatroom';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Chatroom/>
      </div>
    );
  }
}

export default App;
