import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';

export default class Chat extends React.Component {
  render() {
    const { bgColor } = this.props.route.params;

    return (
      <View style={[styles.container, { backgroundColor: bgColor ? bgColor : '#fff' }]}>
        <Text style={{ color: '#fff'}}>Hello? Yes, this is Dog.</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
