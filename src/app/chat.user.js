import React, { Component } from 'react';

class ChatUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // key: props.key,
      displayName: props.displayName,
      photoURL: props.photoURL ,
      email: props.email ,
      network: props.network,
      logged: props.logged || false
    };

    this.handleUserClick = this.handleUserClick.bind(this);
  }

  handleUserClick(event) {
    window.location.hash = '#' + this.state.displayName.split(' ').join('');
  }

  render(){
    return (
      <div className='user'>
        <div onClick={this.handleUserClick}  className="user-picture-status">
          <img className="picture" src={ this.state.photoURL } alt={ this.state.displayName }/>
          <span className="status"></span>
        </div>
        <a href={`#${this.state.displayName ? this.state.displayName.split(' ').join('') : ''}`}> { this.state.email } </a>
      </div>
    );
  }
}

export default ChatUser;
