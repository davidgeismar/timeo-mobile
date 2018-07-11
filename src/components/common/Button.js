import React, { Component } from 'react';
import { Text, TouchableOpacity } from 'react-native';

class Button extends Component {
  render(){
    const { buttonStyle, textStyle, disabledButtonStyle } = styles;
    return (
      <TouchableOpacity onPress={this.props.onPress}  style={[this.props.disabled ? disabledButtonStyle : buttonStyle, this.props.customStyle]} disabled={this.props.disabled}>
        <Text style={[textStyle, this.props.disabled ? {color: "#00AFFA", opacity: 0.4, borderColor: '#FCFCFC' } : {color: '#8CCDF8'}]}>
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
    borderColor: '#00AFFA',
    marginLeft: 5,
    marginRight: 5
  },
  disabledButtonStyle: {
    padding: 20,
    backgroundColor: '#FCFCFC',
    borderWidth: 1,
    borderColor: '#8CCDF8',
    marginLeft: 5,
    marginRight: 5
  }
};

export default Button;
