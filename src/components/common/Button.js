import React, { Component } from 'react';
import { Text, TouchableOpacity } from 'react-native';

class Button extends Component {
  render(){
    const { buttonStyle, textStyle } = styles;
    return (
      <TouchableOpacity onPress={this.props.onPress}  style={[buttonStyle, this.props.customStyle]} disabled={this.props.disabled}>
        <Text style={textStyle}>
          {this.props.children}
        </Text>
      </TouchableOpacity>
    );
  }
};

const styles = {
  textStyle: {
    alignSelf: 'center',
    color: '#8CCDF8',
    fontSize: 16,
    fontWeight: '600',
  },
  buttonStyle: {
    padding: 20,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#8CCDF8',
    marginLeft: 5,
    marginRight: 5
  }
};

export default Button;
