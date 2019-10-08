export default jest.mock(
  'react-native-router-flux', () => ({
    Actions: {
      chrono: jest.fn(),
      client: jest.fn(),
      info: jest.fn()
      // whatever other Actions you use in your code
    },
  })
)
