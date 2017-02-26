import React, { Component } from 'react';
import firebase from 'firebase';

import AppLogin from './app.login';
import AppChat from './app.chat';

class App extends Component {

  constructor(){
    super();
    this.state = {user: null, logged: false};
  }

  // when start to load the component
  componentWillMount() {
    firebase.auth().onAuthStateChanged(user => {

      if(!user) return;

      let logged = true;
      this.setState({ user, logged });
    });
  }

  render() {
    if(!this.state.logged){
      return (
        <AppLogin />
      );
    }
    return(
      <AppChat />
    );
  }
}

export default App;