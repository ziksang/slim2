import { createStore } from '../src/slim/index'

const setErrorMsg = 'You may not be able to assign values ​​directly to state. Please return a new state for reducing or edit with state in reducer.'



test('state must be object', () => {
  expect(() => {
    createStore({
      state: 1
    })
  }).toThrow()
})

test('not set state of object.', () => {
  expect(() => {
    const store = createStore({
      state: {
        a: 1
      }
    })
    store.state = {
      a: 2
    }
  }).toThrowError()
})