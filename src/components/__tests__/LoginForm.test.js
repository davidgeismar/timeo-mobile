import getImageOftheDayMock from '../../../mocks/getImageOftheDayMock'
import { shallow } from 'enzyme'
import LoginForm, { UnconnectedLoginForm } from '../LoginForm'
import { TextInput, Platform } from 'react-native'
import StylishInput from '../common/StylishInput';
import { makeMockStore } from '../../../mocks/mockStore'
import Stressed from '../assets/Stressed'


let store
const setup = (initialState = {}) => {
  store = makeMockStore(initialState);
  // console.log(store.getState())
  const wrapper = shallow(<LoginForm store={store}/>).dive()
  return wrapper
}

//
// describe('render', () => {
  describe('it renders with no errors', () => {
    let initialState
    beforeEach(() => {
      initialState = { error: false, loading: false, authentication: { username: "", password: ""}, backgroundImage: null}
    })
    test('renders two stylish inputs on IOS', () => {
      wrapper = setup(initialState)
      expect(wrapper.find(StylishInput).length).toEqual(2);
    })

    test('renders two text inputs on Android', () => {
      Platform.OS = 'android';
      wrapper = setup(initialState)
      expect(wrapper.find(TextInput).length).toEqual(2);
    })
  })
//     // TESTS STORE + COMPONENT WHICH IS NOT NECESSARY
//     // test('it fetches and displays an ImageBackground', (done) => {
//     //   moxios.install()
//     //   moxios.stubRequest('http://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1', {
//     //     status: 200,
//     //     response: getImageOftheDayMock
//     //   })
//     //
//     //
//     //   wrapper = setup(initialState).dive()
//     //
//     //   moxios.wait(()=>{
//     //     wrapper.update()
//     //     console.log(store.getState())
//     //     console.log(wrapper.find(ImageBackground).prop('source').uri)
//     //     expect(wrapper.find(ImageBackground).prop('source').uri).toBe('/th?id=OHR.RedRocksArches_EN-GB2044389872_1920x1080.jpg&rf=LaDigue_1920x1080.jpg&pid=hp')
//     //     done()
//     //     moxios.uninstall()
//     //   })
//     // })
//
  describe('redux props', () => {
    let initialState
    let props
    beforeEach(() => {
      initialState = { error: false, loading: false, authentication: { username: "", password: ""}, backgroundImage: null}
      wrapper = setup(initialState)
      props = wrapper.instance().props
    })
    test('has username, password, error, loading, backgroundImage as props', ()=>{
      expect(Object.keys(props)).toEqual(expect.arrayContaining(['username', 'password', 'error', 'loading', 'backgroundImage']))
    })
    test('has loginUser, authUpdate, fetchImageOfTheDay action creators as functions prop', ()=>{
      expect(props.authUpdate).toBeInstanceOf(Function);
      expect(props.loginUser).toBeInstanceOf(Function);
      expect(props.fetchImageOfTheDay).toBeInstanceOf(Function);
    })
  })

  describe('it renders with an error mess', () => {
    let wrapper;
    beforeEach(() => {
      const initialState = { error: 'je suis une erreur', loading: false, authentication: { username: "", password: ""}}
      wrapper = setup(initialState)
    })
    test('displays an error mess', () => {
      expect(wrapper.contains('je suis une erreur')).toBeTruthy()
    })
  })
// //
// test('fetchImageOfTheDay runs on LoginForm mount', () => {
//   const fetchImageOfTheDayMock = jest.fn();
//   const wrapper = shallow(<UnconnectedLoginForm fetchImageOfTheDay={fetchImageOfTheDayMock}/>)
//   // console.log(wrapper.debug())
//   wrapper.instance().componentDidMount();
//   const getFetchImageOfTheDayCount = fetchImageOfTheDayMock.mock.calls.length;
//   expect(getFetchImageOfTheDayCount).toBe(1);
// })

describe('logins user', () => {
  test('it logins user on click on emoticon', () => {
    const loginUserMock = jest.fn();
    const wrapper = shallow(<UnconnectedLoginForm loginUser={loginUserMock}/>)
    wrapper.find(Stressed).parent().simulate('press')
    const getloginUserCount = loginUserMock.mock.calls.length;
    expect(getloginUserCount).toBe(1);
  })
})
