import { createStore } from '../src/slim/index'

const str = 'string'
const boolean = true
const number = 1
const obj = { a: 1 }
const array = ['string', true, 1]

const state = {
  str,
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
  // const toEqual = (assertion, expection, result) => {
  //     it(assertion, () => {
  //         expect(expection).toEqual(result)
  //     });
  // }

  toBe('num should be 1', store.state.number, 1)
})