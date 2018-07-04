import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import UpdateTime from './assets/UpdateTime';

class SelectChronoButton extends Component {
  render(){
    const { buttonStyle, textStyle } = styles;
    return (
      <TouchableOpacity onPress={this.props.onPress}>
        <UpdateTime style={{height: 50, width: 50}}/>
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
  }
};

export default SelectChronoButton;
