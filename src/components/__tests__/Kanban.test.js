import React from 'react';
import { shallow } from 'enzyme';
import KanbanList from '../KanbanList.js';
import Root from '../../Root.js'


it('shows kanbans', () => {
  const wrapped = shallow(<Root><KanbanList></Root>);
  console.log(wrapped)
  expect(wrapped.find(Text).length).toEqual(2);
})
