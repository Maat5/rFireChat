import React, { Component } from 'react';
import ChatMessage from './chat.message';
import firebase from 'firebase';

class ChatMessages extends Component {

  constructor(props){
    super(props);
    this.state = {
      messages: [],
      user: props.user
    };
  }

  componentDidUpdate() {
    const objDiv = document.getElementById('message-list');
    objDiv.scrollTop = objDiv.scrollHeight;
  }

  componentDidMount() {
    // get all messages
    firebase.database()
      .ref('messages')
      .on('child_added', reference => {
        this.setState({
          messages: this.state.messages.concat(reference.val())
        });
      });
  }

  render() {
    const messages = this.state.messages.map((message, i) =>{
      return <ChatMessage
        key = {i}
        username = { message.username }
        message = { message.message }
        fromMe = { message.username === this.state.user.email ? true : false }
      />
    });

    return (
      <div className = "chat-messsages-container" id="message-list">
        { messages }
      </div>
    );
  }
}

export default ChatMessages;
