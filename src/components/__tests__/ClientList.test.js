import React from 'react'
import moxios  from 'moxios'
import { shallow } from 'enzyme'
import LinkCard from '../LinkCard'
import ClientList, { UnconnectedClientList } from '../ClientList'
import { makeMockStore } from '../../../mocks/mockStore'


let store
let wrapper
const setup = (initialState = {}) => {
  store = makeMockStore(initialState);
  const wrapper = shallow(<ClientList store={store}/>).dive()
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
        selectedClient: 'phone_call',
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
        selectedClient: 'phone_call',
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

    test('has selectedClient, actionKinds, currentEventId, duration, measureKind as props', ()=>{
      expect(Object.keys(props)).toEqual(expect.arrayContaining(['selectedClient', 'actionKinds', 'currentEventId', 'duration', 'measureKind']))
    })
    test('has updateEvent', ()=>{
      expect(props.updateEvent).toBeInstanceOf(Function);
    })
  })
