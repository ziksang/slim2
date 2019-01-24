import { createStore } from '../src/slim/index'

const string = 'string'
const boolean = true
const number = 1
const obj = { a: 1 }
const array = ['string', true, 1]

const state = {
  string,
  boolean,
  number,
  obj,
  array
}

describe('default value', () => {
  const store = createStore({})
  test('state is undefined', () => {
    expect(store.state).toEqual({})
  })
})

describe('mode strict setval equal value', () => {
  const store = createStore({
    state,
    mode: 'strict',
    reducers: {
      changeString (state) {
        state.string = 'string2'
      },
      changeBoolean (state) {
        state.boolean = false
      },
      changeNumber (state) {
        state.number = 2
      },
      changeObj (state) {
        state.obj = {
          a: 2
        }
      },
      changeArray (state) {
        state.array[0] = 'string2'
      }
    }
  })

  store.dispatch('changeNumber')
  store.dispatch('changeBoolean')
  store.dispatch('changeString')
  store.dispatch('changeObj')
  store.dispatch('changeArray')
  store.dispatch('nodispatch')

  const toBe = (assertion, expection, result) => {
    test(assertion, () => {
        expect(expection).toBe(result)
    });
  }
  const toEqual = (assertion, expection, result) => {
      test(assertion, () => {
          expect(expection).toEqual(result)
      });
  }

  toBe('number should be 1', store.state.number, 2)
  toBe('boolean should be true', store.state.boolean, false)
  toBe('string should be string', store.state.string, 'string2')
  toEqual('obj should be obj', store.state.obj, {a: 2})
  toEqual('array should be array', store.state.array, ['string2', true, 1])
})


describe('mode strict setval equal value', () => {
  const store = createStore({
    state,
    mode: 'loose',
    reducers: {
      changeString (state) {
        state.string = 'string2'
      },
      changeBoolean (state) {
        state.boolean = false
      },
      changeNumber (state) {
        state.number = 2
      },
      changeObj (state) {
        state.obj = {
          a: 2
        }
      },
      changeArray (state) {
        state.array = [{a: 1, b: {a: 2}}]
      }
    }
  })

  store.dispatch('changeNumber')
  store.dispatch('changeBoolean')
  store.dispatch('changeString')
  store.dispatch('changeObj')
  store.dispatch('changeArray')
  store.dispatch('nodispatch')

  const toBe = (assertion, expection, result) => {
    test(assertion, () => {
        expect(expection).toBe(result)
    });
  }
  const toEqual = (assertion, expection, result) => {
      test(assertion, () => {
          expect(expection).toEqual(result)
      });
  }

  toBe('number should be 1', store.state.number, 2)
  toBe('boolean should be true', store.state.boolean, false)
  toBe('string should be string', store.state.string, 'string2')
  toEqual('obj should be obj', store.state.obj, {a: 2})
  toEqual('array should be array', store.state.array, [{a: 1, b: {a: 2}}])
})
