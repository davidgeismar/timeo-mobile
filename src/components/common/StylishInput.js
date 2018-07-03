import React, { Component } from 'react';
import { TextInput } from 'react-native';

class StylishInput extends Component {

  componentWillMount(){
    this.setState({
      active: false
    })
  }
  activate(status){
    console.log('in activate stylish input')
    console.log(status)
    this.setState({
      active: status
    })
  }
  render(){
    const borderBottomColor = this.state.active ? '#00AFFA' : 'grey'
    const placeholderTextColor = this.state.active ? '#00AFFA' : 'grey'
    return (
      <TextInput
        style={[this.props.style, {borderBottomColor: borderBottomColor, placeholderTextColor: placeholderTextColor}]}
        placeholder={this.props.placeholder}
        onChangeText={this.props.onChangeText}
        onFocus={()=>this.activate(true)}
        onBlur={()=>this.activate(false)}
        value={this.props.value}
      />
    );
  }
};

const styles = {
};

export default StylishInput;
