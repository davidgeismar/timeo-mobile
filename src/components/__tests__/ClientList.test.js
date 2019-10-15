import React from 'react'
import LinkCard from '../LinkCard'
import { shallow } from 'enzyme'
import ClientList, { UnconnectedClientList } from '../ClientList'
import { makeMockStore } from '../../../mocks/mockStore'

  const setup = (initialState = {}) => {
    const store = makeMockStore(initialState);
    const wrapper = shallow(<ClientList store={store}/>).dive()
    return wrapper
  }
  const initialState = {
    loading: false,
    eventsData: {
      currentEventId: 'xyz',
      currentEvent: {
        id: 'xyz',
        duration: 12345,
        measure_kind: 'automatic'
      }
    },
    clients: {
      clients: [
        {
          id: 'serenis',
          name: 'Serenis'
        },
        {
          id: 'obeya',
          name: 'obeya'
        }
      ]
    }
  }

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

    test('has events, currentEventId, clients, duration, measureKind, loadingas props', ()=>{
      expect(Object.keys(props)).toEqual(expect.arrayContaining(['events', 'currentEventId', 'clients', 'duration', 'measureKind', 'loading']))
    })
    test('has setErrorState, updateEvent', ()=>{
      expect(props.updateEvent).toBeInstanceOf(Function);
      expect(props.setErrorState).toBeInstanceOf(Function);
    })
  })

  describe('selects a client', () => {
    test('it selects a client for an event on press on card', () => {
      const updateEventMock = jest.fn();
      const wrapper = shallow(
        <UnconnectedClientList
          updateEvent={updateEventMock}
          clients={initialState.clients.clients}
        />)
      wrapper.find(LinkCard).first().simulate('press')
      const getupdateEventCount = updateEventMock.mock.calls.length;
      expect(getupdateEventCount).toBe(1);
    })
  })
