import React from 'react'
import { TouchableWithoutFeedback } from 'react-native'
import { shallow } from 'enzyme'
import Card, { UnconnectedCard } from '../Card'
import { makeMockStore } from '../../../mocks/mockStore'


const setup = (initialState = {}, canBeActivated, activationKey) => {
  const store = makeMockStore(initialState);
  const wrapper = shallow(
    <Card
    canBeActivated={canBeActivated}
    activationKey={activationKey}
    store={store}/>).dive()
  return wrapper
}
const initialState = {
  cards: {
    selectedCard: {
      id: 'xyz'
    }
  }
}

describe('it renders with no errors', () => {
  test('renders with no errors', () => {
    wrapper = setup(initialState, false, null)
    expect(wrapper.find(TouchableWithoutFeedback).length).toEqual(1);
  })
})

describe('redux props', () => {
  let props
  test(' has redux props active', ()=>{
    wrapper = setup(initialState, false, null)
    props = wrapper.instance().props
    expect(Object.keys(props)).toEqual(expect.arrayContaining(['active']))
  })
  test('is not active', ()=>{
    wrapper = setup(initialState, false, null)
    const active = wrapper.instance().props.active
    expect(active).toBeFalsy()
  })
  test('is  active', ()=>{
    wrapper = setup(initialState, true, 'xyz')
    const active = wrapper.instance().props.active
    expect(active).toBeTruthy()
  })
})
