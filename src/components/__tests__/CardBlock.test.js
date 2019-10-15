import React from 'react'
import { shallow } from 'enzyme'
import CardBlock, { UnconnectedCardBlock } from '../CardBlock'
import Card from '../Card'
import { makeMockStore } from '../../../mocks/mockStore'



const setup = (initialState = {}, cards) => {
  const store = makeMockStore(initialState);
  const wrapper = shallow(<CardBlock cards={cards} store={store}/>).dive()
  return wrapper
}

const cards = [{
    id: 'wxy',
    card_type: 'to do',
    client__name: 'Serenis',
    project__name: 'Obeya',
    reference: '12992',
    subject: 'faire des mocks',
    affected_to_id: '9827',
    creationDate: '12/12/2019'
  },
  {
    id: 'wxyz',
    card_type: 'done',
    client__name: 'Xair',
    project__name: 'roumilax',
    reference: '12992',
    subject: 'faire des designs',
    affected_to_id: '98279',
    creationDate: '13/12/2019'
  }
]

const initialState = {
  user: {
    user_info: {
      logo_thumb: '/logo'
    }
  },
  resources: {
    resources: [
      {
        id: 'kiddk'
      },
      {
        id: 'wieueie'
      }
    ]
  }
}
describe('it renders with no errors', () => {
  test('renders cards', () => {
    wrapper = setup(initialState, cards)
    expect(wrapper.find(Card).length).toEqual(2);
  })
})

describe('redux props', () => {
  let props
  beforeEach(() => {
    wrapper = setup(initialState, cards)
    props = wrapper.instance().props
  })
  test('has logo_thumb, resources as props', ()=>{
    expect(Object.keys(props)).toEqual(expect.arrayContaining(['resources', 'logo_thumb']))
  })
  test('has  setCurrentCard action creators as functions prop', ()=>{
    expect(props.setCurrentCard).toBeInstanceOf(Function)
  })
})

describe('sets a currentCard', () => {
  test('it sets a currentCard on press on card', () => {
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
