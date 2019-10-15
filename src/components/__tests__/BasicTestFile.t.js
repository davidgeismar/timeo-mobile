import React from 'react'
import { shallow } from 'enzyme'
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

  describe('it renders with no errors', () => {
    let initialState
    beforeEach(() => {
      initialState = {}
    })
    test('renders two LinkCard', () => {
      wrapper = setup(initialState)
      expect(wrapper.find(LinkCard).length).toEqual(2);
    })
  })

  describe('redux props', () => {
    let props
    beforeEach(() => {
      const initialState = {}
      wrapper = setup(initialState)
      props = wrapper.instance().props
    })

    test('has  as props', ()=>{
      expect(Object.keys(props)).toEqual(expect.arrayContaining(['', '', '', '', '']))
    })
    test('has ', ()=>{
      expect(props.).toBeInstanceOf(Function);
    })
  })

  describe('sets a ', () => {
    test('it sets a  on press on card', () => {
      const setCurrentCardMock = jest.fn();
      const wrapper = shallow(
        <UnconnectedCardBlock
        setCurrentCard={setCurrentCardMock}
        cards={cards}
        />)
      wrapper.find(Card).first().simulate('press')
      const getsetCurrentCardCount = setCurrentCardMock.mock.calls.length;
      expect(getsetCurrentCardCount).toBe(1);
    })
  })
