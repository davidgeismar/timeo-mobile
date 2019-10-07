export default jest.mock(
  'react-native-router-flux', () => ({
    Actions: {
      chrono: jest.fn(),
      // whatever other Actions you use in your code
    },
  })
)
