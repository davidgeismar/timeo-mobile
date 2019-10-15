import { shallow } from 'enzyme'
import Card, { UnconnectedCard } from '../Card'
import { TouchableWithoutFeedback } from 'react-native'
import { makeMockStore } from '../../../mocks/mockStore'


let store
let wrapper
const setup = (initialState = {}, canBeActivated, activationKey) => {
  store = makeMockStore(initialState);
  const wrapper = shallow(
    <Card
    canBeActivated={canBeActivated}
    activationKey={activationKey}
    store={store}/>).dive()
  return wrapper
}

//
// describe('render', () => {
  describe('it renders with no errors', () => {
    let initialState
    beforeEach(() => {
      initialState = {
        cards: {
          selectedCard: {
            id: 'xyz'
          }
        }
      }
    })
    test('renders with no errors', () => {
      wrapper = setup(initialState, false, null)
      expect(wrapper.find(TouchableWithoutFeedback).length).toEqual(1);
    })

    // test('can be activated onPress', () => {
    //   wrapper = setup(initialState, true, 'xyz')
    //   wrapper.find(TouchableWithoutFeedback).simulate('press')
    //
    //   expect(wrapper.find(TouchableWithoutFeedback).length).toEqual(1);
    // })
  })

  describe('redux props', () => {
    let props
    let initialState
    beforeEach(() => {
      initialState = {
        cards: {
          selectedCard: {
            id: 'xyz'
          }
        }
      }
    })

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
