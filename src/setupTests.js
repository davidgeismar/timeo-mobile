import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
console.log('running setuptests')
Enzyme.configure({
  adapter: new Adapter(),
  disableLifecycleMethods: true,
})
