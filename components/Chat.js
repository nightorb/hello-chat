import React from 'react';
import { View, Platform, KeyboardAvoidingView, LogBox } from 'react-native';

// import the Gifted Chat library
import { Bubble, Day, GiftedChat, InputToolbar, SystemMessage } from 'react-native-gifted-chat';

// import firebase which is needed to establish a connection to Firestore database
import * as firebase from 'firebase';
import 'firebase/firestore';

// import asyncStorage which allows to save data locally
import AsyncStorage from '@react-native-async-storage/async-storage';

// import NetInfo which allows to find out if a user is online or not
import NetInfo from '@react-native-community/netinfo';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAJ6Tb0EjKvR9GQUhyQMyGN6F6AY9XP5Zs",
  authDomain: "nightorbs-hellochat.firebaseapp.com",
  projectId: "nightorbs-hellochat",
  storageBucket: "nightorbs-hellochat.appspot.com",
  messagingSenderId: "300935556436",
  appId: "1:300935556436:web:21482ff0bd5b6af3a1ecc1"
};

export default class Chat extends React.Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      uid: 0,
      user: {
        _id: '',
        name: '',
        avatar: ''
      },
      isConnected: false
    };

    // initialize firebase
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }

    // create a reference to the "messages" collection
    this.referenceChatMessages = firebase.firestore().collection('messages');
    this.refMsgsUser = null;

    // to remove warning messages in the console
    LogBox.ignoreLogs([
      'Setting a timer',
      'Warning: ...',
      'undefined',
      'Animated.event now requires a second argument for options',
      'AsyncStorage'
    ]);
  }

  // save messages to asyncStorage
  async saveMessages() {
    try {
      // convert messages to string to store them, saves messages with setItem method
      await AsyncStorage.setItem('messages', JSON.stringify(this.state.messages));
    } catch (err) {
      console.log(err.message);
    }
  }

  // get messages from asyncStorage
  async getMessages() {
    let messages = '';
    try {
      // use getItem method to read messages in storage
      messages = await AsyncStorage.getItem('messages') || [];
      // asyncStorage can only store strings, so messages need to be converted back to objects with JSON.parse
      this.setState({
        messages: JSON.parse(messages)
      });
    } catch (err) {
      console.log(err);
    }
  }

  // to delete test messages during development
  async deleteMessages() {
    try {
      await AsyncStorage.removeItem('messages');
      this.setState({
        messages: []
      });
    } catch (err) {
      console.log(err.message);
    }
  }

  componentDidMount() {
    // set name to the name selected on the start page
    let { name } = this.props.route.params;

    // to find out the user's connection status
    NetInfo.fetch().then(connection => {
      // if user is online, fetch data from server
      if (connection.isConnected) {
        this.setState({
          isConnected: true
        });

        // listen to authentication events
        this.authUnsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
          // when no user is signed in, create new user by signing in anonymously (a temporary account)
          if (!user) {
            await firebase.auth().signInAnonymously();
          }

          // update user state with currently active user data
          this.setState({
            uid: user.uid,
            messages: [],
            user: {
              _id: user.uid,
              name: name,
              avatar: 'https://placeimg.com/140/140/any'
            }
          });

          // listens for updates in the collection
          this.unsubscribe = this.referenceChatMessages
            .orderBy('createdAt', 'desc')
            .onSnapshot(this.onCollectionUpdate);
        });

        // save messages when online
        this.saveMessages();

        console.log('online');
      } else {
        this.setState({
          isConnected: false
        });
        // loads messages from asyncStorage
        this.getMessages();
        console.log('offline');
      }
    });


    // this.setState({
    //   messages: [
    //     {
    //       _id: 2,
    //       text: `${name} has entered the chat`,
    //       createdAt: new Date(),
    //       system: true
    //     }
    //   ]
    // });
  }

  componentWillUnmount() {
    if (this.state.isConnected) {
      // stop listening to authentication
      this.authUnsubscribe();
      // stop listening for changes
      this.unsubscribe();
    }
  }

  // add a new message to the collection
  addMessage() {
    const message = this.state.messages[0];
    // add a new message to the collection
    this.referenceChatMessages.add({
      _id: message._id,
      text: message.text || '',
      createdAt: message.createdAt,
      user: this.state.user
    });
  }

  onCollectionUpdate = (querySnapshot) => {
    const messages = [];
    // go through each document
    querySnapshot.forEach((doc) => {
      // get the queryDocumentSnapshot's data
      var data = doc.data();
      // each field within each doc is saved into the messages object
      messages.push({
        _id: data._id,
        text: data.text,
        createdAt: data.createdAt.toDate(),
        user: {
          _id: data.user._id,
          name: data.user.name,
          avatar: data.user.avatar
        }
      });
    });
    // renders messages object in the app
    this.setState({
      messages: messages
    });
    this.saveMessages();
  }

  // function for when user sends a message
  onSend(messages = []) {
    // previousState is a reference to the component's state at the time the change is applied
    this.setState(previousState => ({
      // the message a user has sent gets appended to the state messages so that it can be displayed in the chat
      messages: GiftedChat.append(previousState.messages, messages)
    }), () => {
      this.addMessage();
      this.saveMessages();
    });
  }

  // function for changing speech bubble color
  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#8F3A79'
          }
        }}
      />
    );
  }

  // render InputToolbar only when user is online
  renderInputToolbar(props) {
    if (this.state.isConnected == false) {
    } else {
      return (
        <InputToolbar {...props} />
      );
    }
  }

  // change color of system message
  renderSystemMessage(props) {
    return (
      <SystemMessage
        {...props}
        textStyle={{
          color: '#fff'
        }}
      />
    );
  }

  // change color of date text
  renderDay(props) {
    return (
      <Day
        {...props}
        textStyle={{
          color: '#fff'
        }}
      />
    );
  }

  render() {
    const { bgColor } = this.props.route.params;
    const { user } = this.state;

    return (
      <View style={{ flex: 1, backgroundColor: bgColor ? bgColor : '#fff' }}>
        <GiftedChat
          renderBubble={this.renderBubble.bind(this)}
          renderInputToolbar={this.renderInputToolbar.bind(this)}
          renderSystemMessage={this.renderSystemMessage.bind(this)}
          renderDay={this.renderDay.bind(this)}
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          user={{
            _id: user._id,
            name: user.name,
            avatar: user.avatar
          }}
        />
        { Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null }
      </View>
    );
  }
}
