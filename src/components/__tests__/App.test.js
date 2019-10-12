
import React from 'react';
import { View, Text, TouchableWithoutFeedback, TouchableOpacity, ImageBackground, Image, TextInput, Platform, ScrollView} from 'react-native'
import { shallow, mount } from 'enzyme';
import App from '../../App.js';
import Root from '../../Root.js'
import StylishInput from '../common/StylishInput';


it('renders without errors', () => {
  const wrapped = shallow(<App/>);
  console.log(wrapped)
  const componentInstance = wrapped.instance();
  componentInstance.componentWillMount();
  expect(wrapped.find(StylishInput).length).toEqual(2);
  expect(wrapped.find(TextInput).length).toEqual(2);
})
