import { makeMockStore } from '../../../mocks/mockStore'
import { START_TIMER,
         STOP_TIMER,
        ACTIVATE_TAB,
      } from '../types'
import { startTimer, stopTimer } from '../ChronoActions'

describe('ChronoActions', () => {
  it('starts timer', async () => {
    const store = makeMockStore({});
    const expectedActions =[
      {type: ACTIVATE_TAB, payload: 'chrono'},
      {type: START_TIMER, payload: {baseTime: 3400}}
    ]
    await store.dispatch(startTimer(3400))
    expect(store.getActions()[0]).toEqual(expectedActions[0])
    expect(store.getActions()[1].type).toEqual(START_TIMER)
    expect(store.getActions()[1].payload.baseTime).toEqual(3400)

  })
  it('stops timer', () => {
    const store = makeMockStore({});
    // const expectedActions =[
    //   {type: STOP_TIMER, payload: { baseTime: 3400 }},
    // ]
    store.dispatch(stopTimer(3400))
    expect(store.getActions()[0].type).toEqual(STOP_TIMER)
    expect(store.getActions()[0].payload.baseTime).toEqual(3400)
  })
})
