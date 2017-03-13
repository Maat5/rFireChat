import React, { Component } from 'react';
import firebase from 'firebase';
import ChatUsersList from './chat.userList';
import ChatHeader from './header';
import ChatInput from './chat.input';
import ChatMessages from './chat.messages';

class AppChat extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: props.user,
      users: []
    };
  }

  componentDidMount() {
    // get all users
    firebase.database()
    .ref('users')
    .on('child_added', reference => {
      if(reference.val().email !== this.state.user.email)
        this.setState({
          users: this.state.users.concat(reference.val())
        });
    });
  }

  render() {
    return (
      <div id="app" >
         <ChatHeader
            displayName={ this.state.user.displayName }
            photoURL = { this.state.user.photoURL }
            email = { this.state.user.email }
         />
         <div className="container-fluid app-content">
           <ChatUsersList userList={ this.state.users } />
           <div className="chat-container">
             <ChatMessages user= { this.state.user } />
              <ChatInput user= { this.state.user } />
           </div>
         </div>
      </div>
    );
  }
}

export default AppChat;
