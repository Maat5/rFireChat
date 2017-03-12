import React, { Component } from 'react';

class ChatMessage extends Component {
  constructor(props){
    super(props);
    this.state = {
      username: props.username,
      message: props.message,
      fromMe: props.fromMe
    }
  }
  render(){
    const fromMe = this.props.fromMe ? 'from-me' : '';

    return (
      <div className={`message ${fromMe}`}>
        <div className='username'>
          { this.state.username } :
        </div>
        <div className='message-body'>
          { this.state.message }
        </div>
      </div>
    );
  }
}

export default ChatMessage;