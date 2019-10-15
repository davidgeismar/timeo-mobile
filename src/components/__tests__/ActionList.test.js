import React from 'react'
import { shallow } from 'enzyme'
import LinkCard from '../LinkCard'
import ActionList, { UnconnectedActionList } from '../ActionList'
import { makeMockStore } from '../../../mocks/mockStore'



const setup = (initialState = {}) => {
  const store = makeMockStore(initialState);
  const wrapper = shallow(<ActionList store={store}/>).dive()
  return wrapper
}

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
  describe('it renders with no errors', () => {
    test('renders two LinkCard', () => {
      wrapper = setup(initialState)
      expect(wrapper.find(LinkCard).length).toEqual(2);
    })
  })

  describe('redux props', () => {
    let props
    beforeEach(() => {
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

  describe('selects an action', () => {
    test('it selects an action for an event on press on card', () => {
      const updateEventMock = jest.fn();
      const wrapper = shallow(
        <UnconnectedActionList
          updateEvent={updateEventMock}
          actionKinds={initialState.actionKinds}
        />)
      wrapper.find(LinkCard).first().simulate('press')
      const getupdateEventCount = updateEventMock.mock.calls.length;
      expect(getupdateEventCount).toBe(1);
    })
  })
