import React, { Component } from 'react';
import ChatUser from './chat.user';

class ChatUsersList extends Component {
  render(){
    const users = this.props.userList.map((val, i) => {
      return <ChatUser
        key = { i }
        displayName={ val.displayName }
        photoURL = { val.photoURL }
        email = { val.email }
        network = { val.network }
        logged = { val.logged }
      />
    })
    return(
      <div className="col-md-2 col-xs-3 user-list-container">
        <div className="user-list">
          { users }
        </div>
      </div>
    );
  }
}

ChatUsersList.defaultProps = {
  userList: []
};

export default ChatUsersList;