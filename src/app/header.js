import React, { Component } from 'react';
import ChatUser from './chat.user';

class ChatHeader extends Component{
  constructor(props){
    super(props);
    this.state = {
      displayName: props.displayName || '',
      photoURL: props.photoURL || '',
      email: props.email || '',
    };
  }
  render() {
    return(
      <nav className="navbar navbar-default navbar-static-top chat-header">
       <div className="col-md-2 col-xs-3 user-info">
        <ChatUser
          displayName={ this.state.displayName }
          photoURL = { this.state.photoURL }
          email = { this.state.email }
        />
       </div>
       <div className="col-md-10 col-xs-9 header">
          <h1>rFireChat  <small> <i className="fa fa-fire"> </i>< /small></h1>
       </div>
      </nav>
    );
  }
}

export default ChatHeader;