
import React from 'react';
import { View, Text, TouchableWithoutFeedback, TouchableOpacity, ImageBackground, Image, TextInput, Platform, ScrollView} from 'react-native'
import { shallow, mount } from 'enzyme';
import Spinner from '../LoginForm.js';
import Root from '../../Root.js'



it('shows a login form', () => {
  const wrapped = shallow(<Root><Spinner size="large" /></Root>);
  console.log(wrapped)
  const componentInstance = wrapped.instance();
  console.log(componentInstance);
})
