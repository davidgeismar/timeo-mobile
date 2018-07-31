import React, { Component } from 'react';
import { TouchableOpacity, View } from 'react-native';
import Pause from './assets/Pause';

class ResumeChronoButton extends Component {

  componentWillMount(){
    // A setState used in this function is “free” and will not trigger a re-render.
    this.setState({visible: true})
  }
  componentDidUpdate(){
    setTimeout(() =>this.setState({visible: !this.state.visible}), 1000)
  }

  // componentWillUnmount(){
  //   clearInterval(this.interval)
  // }
  render(){
    const { textStyle } = styles;
    if (this.state.visible){
      return (
              <TouchableOpacity onPress={this.props.onPress}>
                <Pause style={{height: 50, width: 50}}/>
              </TouchableOpacity>
      );
    }
    else {
      return (
        <View style={{height: 50, width: 50}}>
        </View>
      )
    }
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
