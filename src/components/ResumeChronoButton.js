import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import Pause from './assets/Pause';

class ResumeChronoButton extends Component {
  render(){
    const { textStyle } = styles;
    return (
      <TouchableOpacity onPress={this.props.onPress}>
        <Pause style={{height: 50, width: 50}}/>
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
};

export default ResumeChronoButton;
