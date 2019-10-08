import { makeMockStore } from '../../../mocks/mockStore'
import { SELECT_HOUR,
         SELECT_MINUTE
      } from '../types'
import { selectEventDuration } from '../DurationActions'

describe('DurationActions', () => {
  let store
  beforeEach(()=>{
    store = makeMockStore({});
  })
  it('select Event Duration of type hour', async () => {
    const expectedActions =[
      {type: SELECT_HOUR, payload: 5},
    ]
    store.dispatch(selectEventDuration({kind: 'hour', value: 5}))
    expect(store.getActions()).toEqual(expectedActions)
  })
  it('select Event Duration of type minute', () => {
    const expectedActions =[
      {type: SELECT_MINUTE, payload: 30},
    ]
    store.dispatch(selectEventDuration({kind: 'minute', value: 30}))
    expect(store.getActions()).toEqual(expectedActions)
  })
})
