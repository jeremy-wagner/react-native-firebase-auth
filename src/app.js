import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Header, Button, Spinner } from './components/common';
import firebase from 'firebase';
import LoginForm from './components/LoginForm';

class App extends Component {
  state = { loggedIn: false }

  componentWillMount(){
    firebase.initializeApp({
      apiKey: 'AIzaSyAiCTkZsvF-W2x8nps-qNs5ZgnT5gZgE8s',
      authDomain: 'authentication-e2b13.firebaseapp.com',
      databaseURL: 'https://authentication-e2b13.firebaseio.com',
      projectId: 'authentication-e2b13',
      storageBucket: 'authentication-e2b13.appspot.com',
      messagingSenderId: '565477359418'
    });

    firebase.auth().onAuthStateChanged((user) => {
      if(user){
        this.setState({ loggedIn: true })
      } else {
        this.setState({ loggedIn: false })
      }
    });
  }

  renderContent() {
    switch (this.state.loggedIn){
      case true:
        return (
          <Button onPress={() => firebase.auth().signOut()}>
            Log Out
          </Button>
        );
      case false:
        return <LoginForm />;
      default:
        return <Spinner size="large" />;
    }
  }

  render() {
    return (
      <View>
        <Header headerText="Authentication" />
        {this.renderContent()}
      </View>
    );
  }
}

export default App;
