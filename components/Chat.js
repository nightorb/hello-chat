import React from 'react';
import { View, Platform, KeyboardAvoidingView } from 'react-native';

// import the Gifted Chat library
import { Bubble, Day, GiftedChat, SystemMessage } from 'react-native-gifted-chat';

export default class Chat extends React.Component {
  constructor() {
    super();
    // initialize state with an empty array in messages
    this.state = {
      messages: []
    };
  }

  componentDidMount() {
    let { name } = this.props.route.params;

    this.setState({
      // messages must follow a certain format to work with Gifted Chat
      messages: [
        {
          _id: 1,
          text: 'Hello?',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any'
          }
        },
        {
          _id: 2,
          text: `${name} has entered the chat`,
          createdAt: new Date(),
          system: true
        }
      ]
    });
  }

  // function for when user sends a message
  onSend(messages = []) {
    // previousState is a reference to the component's state at the time the change is applied
    this.setState(previousState => ({
      // the message a user has sent gets appended to the state messages so that it can be displayed in the chat
      messages: GiftedChat.append(previousState.messages, messages)
    }));
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

    return (
      <View style={{ flex: 1, backgroundColor: bgColor ? bgColor : '#fff' }}>
        <GiftedChat
          renderBubble={this.renderBubble.bind(this)}
          renderSystemMessage={this.renderSystemMessage.bind(this)}
          renderDay={this.renderDay.bind(this)}
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          user={{ _id: 1 }}
        />
        { Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null }
      </View>
    );
  }
}
