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
    black: '#090C08',
    purple: '#474056',
    blue: '#8a95a5',
    green: '#b9c6ae'
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
              />
            </View>

            <View style={styles.chooseBgColorBox}>
              <Text style={[styles.text, styles.chooseBgText]}>Choose Background Color:</Text>

              <View style={styles.bgColorsBox}>
                <TouchableOpacity
                  style={[styles.bgColors, styles.bgBlack]}
                  activeOpacity={0.8}
                  onPress={() => this.changeBgColor(this.colors.black)}
                />
                <TouchableOpacity
                  style={[styles.bgColors, styles.bgPurple]}
                  activeOpacity={0.8}
                  onPress={() => this.changeBgColor(this.colors.purple)}
                />
                <TouchableOpacity
                  style={[styles.bgColors, styles.bgBlue]}
                  activeOpacity={0.8}
                  onPress={() => this.changeBgColor(this.colors.blue)}
                />
                <TouchableOpacity
                  style={[styles.bgColors, styles.bgGreen]}
                  activeOpacity={0.8}
                  onPress={() => this.changeBgColor(this.colors.green)}
                />
              </View>
            </View>

            <Pressable
              style={styles.button}
              title="Start Chatting"
              onPress={() => navigate('Chat', { name: this.state.name, bgColor: this.state.bgColor })}
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
    color: '#fff',
    marginTop: 50
  },
  box: {
    height: '44%',
    width: '88%',
    height: 260,
    minHeight: 260,
    maxHeight: 300,
    backgroundColor: '#fff',
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
    color: '#757083'
  },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '88%',
    opacity: 0.5,
    borderColor: '#757083',
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
    backgroundColor: '#090C08'
  },
  bgPurple: {
    backgroundColor: '#474056'
  },
  bgBlue: {
    backgroundColor: '#8a95a5'
  },
  bgGreen: {
    backgroundColor: '#b9c6ae'
  },
  button: {
    width: '88%',
    backgroundColor: '#757083',
    borderRadius: 3,
    padding: 15,
    marginVertical: 15
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    color: '#fff'
  }
});
