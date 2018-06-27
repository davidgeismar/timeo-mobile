import React, { Component } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

class Footer extends Component {
  render(){
    const { footerStyle } = styles;
    return (
      <View style={[footerStyle, this.props.customStyle]}>
        {this.props.children}
      </ View>
    );
  }
};

const styles = {
  footerStyle: {
    position: 'absolute',
    width: '100%',
    bottom: 0,
    height: 130,
    backgroundColor: 'white'

  }
};

export default Footer;
