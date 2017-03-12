import React, { Component } from 'react';
import firebase from 'firebase';

class ChatInput extends Component{
  constructor(props) {
    super(props);

    this.state = {
      chatInput: '',
      user: props.user
    };

    this.submitHandler = this.submitHandler.bind(this);
    this.textChangeHandler = this.textChangeHandler.bind(this);
  }

  submitHandler(event) {
    event.preventDefault();
    let db = firebase.database().ref('messages');
    let insert = db.push();
    insert.set({
      username: this.state.user.email,
      message: this.state.chatInput
    });
    this.setState({ chatInput: '' });
  }

  textChangeHandler(event)  {
    this.setState({ chatInput: event.target.value });
  }

  render() {
    return (
      <form className="chat-input" onSubmit={this.submitHandler}>
        <input type="text"
          onChange={this.textChangeHandler}
          value={this.state.chatInput}
          placeholder="Write a message..."
          required />
      </form>
    );
  }
}

export default ChatInput;
