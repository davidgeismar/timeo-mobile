import React, {Component} from 'react';
import {View} from 'react-native';

export default class MyLayout extends Component {
  render() {
    return (
      <View style={{
        flex: 1,
        width: 500,
        height: 500,
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
      }}>
        <View style={{
          flex: 1,
          width: 100,
          height: 100,
          alignSelf: 'flex-end',
        }} />
        <View style={{
          flex: 1,
          width: 100,
          height: 100,
          marginHorizontal: 20,
          flexGrow: 0,
        }} />
        <View style={{
          flex: 1,
          width: '100%',
          height: 100,
        }} />
      </View>
    );
  }
};
