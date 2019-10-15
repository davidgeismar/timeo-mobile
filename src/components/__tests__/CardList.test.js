import { shallow } from 'enzyme'
import CardList, { UnconnectedCardList } from '../CardList'
import CardBlock from '../CardBlock'
import { makeMockStore } from '../../../mocks/mockStore'


let store
const setup = (initialState = {}) => {
  store = makeMockStore(initialState);
  const wrapper = shallow(<CardList store={store}/>).dive()
  return wrapper
}
const initialState =   initialState = {
    cards: {
      loading: false,
      error: false,
      searchPattern: null,
      limitToMine: false,
      searchInit: '',
      selectedCard: {
        id: 'selected_card'
      },
      list: [
        {
          cards: [
            {
                id: 'wxy',
                card_type: 'to do',
                client__name: 'Serenis',
                project__name: 'Obeya',
                reference: '12992',
                subject: 'faire des mocks',
                affected_to_id: '9827',
                creationDate: '12/12/2019'
              }
          ],
          name: 'to_do'
        },
        {
          cards: [
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
          ],
          name: 'done'
        }
      ]
    },
    eventsData: {
      currentEventId: 'current_event',
      currentEvent: {
        id: 'current_event',
        kanban__name: 'Lot 1',
        duration: 123448,
        measure_kind: 'automatic'
      }
    },
    kanbans: {
      selectedKanban: {
        id: 'wzym'
      }
    }
  }

  describe('it renders with no errors', () => {
    test('renders cardblocks', () => {
      wrapper = setup(initialState)
      expect(wrapper.find(CardBlock).length).toEqual(2);
    })
  })

  describe('redux props', () => {
    let props
    beforeEach(() => {
      wrapper = setup(initialState)
      props = wrapper.instance().props
    })
    test('has cards, selectedKanban, selectedKanbanName, searchInit, selectedCard, eventId, limitToMine, duration, measureKind, disabled, searchPattern, loading, error as props', ()=>{
      expect(Object.keys(props)).toEqual(expect.arrayContaining(['cards', 'selectedKanban', 'selectedKanbanName', 'searchInit', 'selectedCard', 'eventId', 'limitToMine', 'duration', 'measureKind', 'disabled', 'searchPattern', 'loading', 'error']))
    })
    test('has  removeSelectedCard, updateEvent, changeCardListScope, searchCards, setErrorState action creators as functions prop', ()=>{
      expect(props.removeSelectedCard).toBeInstanceOf(Function)
      expect(props.updateEvent).toBeInstanceOf(Function)
      expect(props.changeCardListScope).toBeInstanceOf(Function)
      expect(props.searchCards).toBeInstanceOf(Function)
      expect(props.setErrorState).toBeInstanceOf(Function)
    })
  })

  describe('sets a currentCard', () => {


    test('it sets a currentCard on press on card', () => {
      const removeSelectedCardMock = jest.fn();
      const wrapper = shallow(
        <UnconnectedCardList removeSelectedCard={removeSelectedCardMock}/>)
      wrapper.find(Card).first().simulate('press')
      const removeSelectedCardMockCount = removeSelectedCardMock.mock.calls.length;
      expect(removeSelectedCardMockCount).toBe(1);
    })

    test('it sets a updateEvent on press on card', () => {
      const updateEventMock = jest.fn();
      const wrapper = shallow(
        <UnconnectedCardList updateEvent={updateEventMock}/>)
      wrapper.find(Card).first().simulate('press')
      const updateEventMockCount = updateEventMock.mock.calls.length;
      expect(updateEventMockCount).toBe(1);
    })

    test('it sets a changeCardListScope on press on card', () => {
      const changeCardListScopeMock = jest.fn();
      const wrapper = shallow(
        <UnconnectedCardList changeCardListScope={changeCardListScopeMock}/>)
      wrapper.find(Card).first().simulate('press')
      const changeCardListScopeMockCount = changeCardListScopeMock.mock.calls.length;
      expect(changeCardListScopeMockCount).toBe(1);
    })

    test('it sets a searchCards on press on card', () => {
      const searchCardsMock = jest.fn();
      const wrapper = shallow(
        <UnconnectedCardList searchCardsScope={searchCardsMock}/>)
      wrapper.find(Card).first().simulate('press')
      const searchCardsMockCount =searchCardsMock.mock.calls.length;
      expect(searchCardsMockCount).toBe(1);
    })


        test('it sets a setErrorState on press on card', () => {
          const setErrorStateMock = jest.fn();
          const wrapper = shallow(
            <UnconnectedCardList setErrorStateScope={setErrorState}/>)
          wrapper.find(Card).first().simulate('press')
          const setErrorStateCount = setErrorStateMock.mock.calls.length;
          expect(setErrorStateCount).toBe(1);
        })

  })
