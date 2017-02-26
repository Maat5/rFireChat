import React , { Component } from 'react';
import firebase from 'firebase';

class AppLogin extends Component {

  constructor(props) {
    super(props);

    this.state = { user: null, logged: false };
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin(event) {
    event.preventDefault();
    let type = event.target.getAttribute('data-name');
    let provider = type === 'google' ?
      new firebase.auth.GoogleAuthProvider() :
      new firebase.auth.FacebookAuthProvider();

    firebase.auth().signInWithPopup(provider)
      .then(response => {
        if (!response || !response.user) return;
        let db = firebase.database().ref('users');
        db.orderByChild('email').equalTo(response.user.email).once('value', existingUser => {
          if(!existingUser.val()){
            let insert = db.push();
            insert.set({
                displayName: response.user.displayName,
                photoURL: response.user.photoURL,
                email: response.user.email,
                refreshToken: response.user.refreshToken,
                network: type,
              });
          }
        });
      })
      .catch(error => {
        console.error(`Error ${error.code}: ${error.message}`);
      });
  }

  render(){
    return(
      <div id="app">
        <div className="app-login">
          <div className="app-login-container">
            <div className="app-login-header">
              <h1>rFireChat  <small> <i className="fa fa-fire"> </i>< /small></h1>
            </div>
            <h4> Login with social network </h4>
            <div className="app-login-social">
              <a className="btn btn-danger" onClick={this.handleLogin} data-name="google">
               <i className="fa fa-google" data-name="google" > </i>
              </a>
              <a className="btn btn-primary" onClick={this.handleLogin} data-name="facebook">
               <i className="fa fa-facebook" data-name="facebook"> </i>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AppLogin;