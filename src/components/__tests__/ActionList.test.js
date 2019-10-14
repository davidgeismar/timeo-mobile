import React from 'react'
import moxios  from 'moxios'
import { shallow } from 'enzyme'
import LinkCard from '../LinkCard'
import ActionList, { UnconnectedActionList } from '../ActionList'
import StylishInput from '../common/StylishInput';
import { makeMockStore } from '../../../mocks/mockStore'


let store
let wrapper
const setup = (initialState = {}) => {
  store = makeMockStore(initialState);
  const wrapper = shallow(<ActionList store={store}/>).dive()
  console.log(wrapper.debug())
  return wrapper
}

//
// describe('render', () => {
  describe('it renders with no errors', () => {
    let initialState
    beforeEach(() => {
      initialState = {
        eventsData: {
          currentEventId: 'w9320',
          currentEvent: {
            duration: 234567,
            measureKind: 'automatic',
          }
        },
        selectedAction: 'phone_call',
        actionKinds: [
        {
          id: "xyz",
          name: 'phone_call'
        },
        {
          id: 'wzi',
          name: 'meeting'
        }
      ]}
    })
    test('renders two LinkCard', () => {
      wrapper = setup(initialState)
      expect(wrapper.find(LinkCard).length).toEqual(2);
    })
  })

  describe('redux props', () => {
    let props
    beforeEach(() => {
      const initialState = {
        eventsData: {
          currentEventId: 'w9320',
          currentEvent: {
            duration: 234567,
            measureKind: 'automatic',
          }
        },
        selectedAction: 'phone_call',
        actionKinds: [
        {
          id: "xyz",
          name: 'phone_call'
        },
        {
          id: 'wzi',
          name: 'meeting'
        }
      ]}
      wrapper = setup(initialState)
      props = wrapper.instance().props
    })

    test('has selectedAction, actionKinds, currentEventId, duration, measureKind as props', ()=>{
      expect(Object.keys(props)).toEqual(expect.arrayContaining(['selectedAction', 'actionKinds', 'currentEventId', 'duration', 'measureKind']))
    })
    test('has updateEvent', ()=>{
      expect(props.updateEvent).toBeInstanceOf(Function);
    })
  })
