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

describe('mode strict should all visitable', () => {
  const store = createStore({
    state
  })

  const toBe = (assertion, expection, result) => {
    it(assertion, () => {
        expect(expection).toBe(result)
    });
  }
  const toEqual = (assertion, expection, result) => {
      it(assertion, () => {
          expect(expection).toEqual(result)
      });
  }

  toBe('number should be 1', store.state.number, 1)
  toBe('boolean should be true', store.state.boolean, true)
  toBe('string should be string', store.state.string, 'string')
  toEqual('obj should be obj', store.state.obj, obj)
  toEqual('array should be array', store.state.array, array)
})

describe('mode loose should all visitable', () => {
  const store = createStore({
    state,
    mode: 'loose'
  })

  const toBe = (assertion, expection, result) => {
    it(assertion, () => {
        expect(expection).toBe(result)
    });
  }
  const toEqual = (assertion, expection, result) => {
      it(assertion, () => {
          expect(expection).toEqual(result)
      });
  }

  toBe('number should be 1', store.state.number, 1)
  toBe('boolean should be true', store.state.boolean, true)
  toBe('string should be string', store.state.string, 'string')
  toEqual('obj should be obj', store.state.obj, obj)
  toEqual('array should be array', store.state.array, array)
})