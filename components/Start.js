import React from 'react';
import { StyleSheet, View, Text, TextInput, ImageBackground, Image, TouchableOpacity, Pressable } from 'react-native';

const image = require('../assets/background-image.png');
const icon = require('../assets/icon.png');

export default class Start extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      bgColor: ''
    };
  }

  // updates background color chosen by user
  changeBgColor = (newColor) => {
    this.setState({
      bgColor: newColor
    });
  }

  // colors to choose from
  colors = {
    black: '#202426',
    green: '#25474d',
    blue: '#bdcbdb',
    pink: '#cbb6d1'
  }

  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>
        <ImageBackground source={image} resizeMode="cover" style={styles.image}>
          <Text style={styles.title}>HelloChat</Text>

          <View style={styles.box}>
            <View style={styles.inputBox}>
              <Image source={icon} style={styles.icon} />
              <TextInput
                style={[styles.text, styles.input]}
                onChangeText={(name) => this.setState({ name })}
                value={this.state.name}
                placeholder="Your Name"
                accessible={true}
                accessibilityLabel="your name"
                accessibilityHint="Type the name you want to use in the chat session."
              />
            </View>

            <View style={styles.chooseBgColorBox}>
              <Text style={[styles.text, styles.chooseBgText]}>Choose Background Color:</Text>

              <View style={styles.bgColorsBox}>
                <TouchableOpacity
                  style={[styles.bgColors, styles.bgBlack]}
                  activeOpacity={0.8}
                  onPress={() => this.changeBgColor(this.colors.black)}
                  accessible={true}
                  accessibilityRole="button"
                  accessibilityLabel="black background color"
                  accessibilityHint="Adds a black background color to the chat screen."
                />
                <TouchableOpacity
                  style={[styles.bgColors, styles.bgGreen]}
                  activeOpacity={0.8}
                  onPress={() => this.changeBgColor(this.colors.green)}
                  accessible={true}
                  accessibilityRole="button"
                  accessibilityLabel="purple background color"
                  accessibilityHint="Adds a purple background color to the chat screen."
                />
                <TouchableOpacity
                  style={[styles.bgColors, styles.bgBlue]}
                  activeOpacity={0.8}
                  onPress={() => this.changeBgColor(this.colors.blue)}
                  accessible={true}
                  accessibilityRole="button"
                  accessibilityLabel="blue background color"
                  accessibilityHint="Adds a blue background color to the chat screen."
                />
                <TouchableOpacity
                  style={[styles.bgColors, styles.bgPink]}
                  activeOpacity={0.8}
                  onPress={() => this.changeBgColor(this.colors.pink)}
                  accessible={true}
                  accessibilityRole="button"
                  accessibilityLabel="green background color"
                  accessibilityHint="Adds a green background color to the chat screen."
                />
              </View>
            </View>

            <Pressable
              style={styles.button}
              title="Start Chatting"
              onPress={() => navigate('Chat', { name: this.state.name, bgColor: this.state.bgColor })}
              accessible={true}
              accessibilityRole="button"
              accessibilityLabel="start chatting"
              accessibilityHint="Click this button to enter the chat screen."
            >
              <Text style={styles.buttonText}>Start Chatting</Text>
            </Pressable>
          </View>

        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  title: {
    fontSize: 45,
    fontWeight: '600',
    color: '#ededed',
    marginTop: 50
  },
  box: {
    height: '44%',
    width: '88%',
    height: 260,
    minHeight: 260,
    maxHeight: 300,
    backgroundColor: '#ededed',
    borderRadius: 3,
    flexGrow: 1,
    flexShrink: 0,
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: 30
  },
  text: {
    fontSize: 16,
    fontWeight: '300',
    color: '#3e6d8a'
  },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '88%',
    opacity: 0.5,
    borderColor: '#3e6d8a',
    borderWidth: 2,
    borderRadius: 3,
    padding: 10,
    marginVertical: 15
  },
  input: {
    width: '100%'
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 10,
    alignItems: 'center',
  },
  chooseBgColorBox: {
    width: '88%'
  },
  chooseBgText: {
    marginBottom: 10
  },
  bgColorsBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%'
  },
  bgColors: {
    width: 45,
    height: 45,
    borderRadius: 25
  },
  bgBlack: {
    backgroundColor: '#202426'
  },
  bgGreen: {
    backgroundColor: '#25474d'
  },
  bgBlue: {
    backgroundColor: '#bdcbdb'
  },
  bgPink: {
    backgroundColor: '#cbb6d1'
  },
  button: {
    width: '88%',
    backgroundColor: '#3e6d8a',
    borderRadius: 3,
    padding: 15,
    marginVertical: 15
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    color: '#ededed'
  }
});
