import React from 'react';
import { View, Text, TouchableWithoutFeedback, TouchableOpacity, ImageBackground, Image, TextInput, Platform, ScrollView} from 'react-native'
import { shallow } from 'enzyme';
import LoginForm from '../LoginForm.js';
import Root from '../../Root.js'
import StylishInput from '../common/StylishInput';


it('shows a login form', () => {
  const wrapped = shallow(<Root><LoginForm /></Root>);
  console.log(wrapped)
  debugger
  expect(wrapped.find(TextInput).length).toEqual(2);
})
