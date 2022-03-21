import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

export default class CustomActions extends React.Component {

  // when onActionPress is called, an ActionSheet that displays a set of defined actions is created
  onActionPress = () => {
    // strings to be displayed in the ActionSheet
    const options = [
      'Choose from Library',
      'Take Picture',
      'Send Location',
      'Cancel'
    ];
    // determine position of cancel button in ActionSheet, which closes the view
    const cancelButtonIndex = options.length - 1;
console.log(this.context);
    // used to hand down data (the options to display) to the ActionSheet component
    this.context.actionSheet().showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex
      },
      async (buttonIndex) => {
        switch(buttonIndex) {
          case 0:
            console.log('user wants to pick an image');
            return;
          case 1:
            console.log('user wants to take a photo');
            return;
          case 2:
            console.log('user wants to get their location');
            return;
        }
      }
    );
  }

  render() {
    return (
      <TouchableOpacity
        style={[styles.container]}
        onPress={this.onActionPress}
        accessbile={true}
        accessibilityLabel="More options"
        accessibilityHint="Lets you choose to send an image or your geolocation."
      >
        <View style={[styles.wrapper, this.props.wrapperStyle]}>
          <Text style={[styles.iconText, this.props.iconTextStyle]}>+</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: 26,
    height: 26,
    marginLeft: 10,
    marginBottom: 10
  },
  wrapper: {
    borderRadius: 13,
    borderColor: '#b2b2b2',
    borderWidth: 2,
    flex: 1
  },
  iconText: {
    color: '#b2b2b2',
    fontWeight: 'bold',
    fontSize: 16,
    backgroundColor: 'transparent',
    textAlign: 'center'
  }
});

/**
 * Before you can use this.context, you have to create an object to define this context type.
 * Gifted Chat expects actionSheet to be a function.
 * With PropTypes you can define actionSheet as a function so you can use
 * this.context.actionSheet().showActionSheetWithOptions in your onActionPress function.
 */
CustomActions.contextTypes = {
  actionSheet: PropTypes.func
};
