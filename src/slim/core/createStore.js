
import { isPlainObject, isPlainString } from '../loggers/type';
import { throwIf, warnIf } from '../loggers/throwIf';

let isDispatching = null;

const cloneObj = p => JSON.parse(JSON.stringify(p))

const msgHelper = {
  typeError: (type) => `type of state expect to [Object] but got [${type}]`,
  shouldBe: (name, expect, got) => `${name} should be type of [${expect}] but got [${got}]`,
  cantCall: (key) => `You may not call ${key} while the reducer is executing. ` +
    'The reducer has already received the state as an argument. ' +
    'Pass it down from the top reducer instead of reading it from the store.',
  cantAssign: () => 'You may not be able to assign values ​​directly to state. ' +
    'Please return a new state for reducing or edit with state in reducer.'
};

const createStore = (conf) => {
  var {
    state = {},
    reducers = {},
    mode = 'strict'
  } = conf;
  // Determine if it is a pure object
  if (!isPlainObject(state)) {
    throw new TypeError(msgHelper.typeError(typeof state));
  }
  let currentState = observeObject(state, mode);
  let currentReducer = passReducer(reducers)

  const dispatch = (action, ...args) => {
    throwIf(
      !isPlainString(action),
    msgHelper.shouldBe('Actions', 'string', typeof action)
    )
    throwIf(
      isDispatching,
      `Reducers may not dispatch actions.`
    )
    try {
      isDispatching = action
      warnIf(
        !reducers[action],
        `You may not has not registered [${action}] in store`
      )
      if (currentReducer[action]) {
        currentReducer[action](currentState, ...args)
      }
    } finally {
      isDispatching = null
    }
  }

  let store = new Proxy({
    state: currentState,
    dispatch
  }, {
    get (target, property) {
      return Reflect.get(target, property)
    },
    set () {
      throwIf(
        !isDispatching,
          msgHelper.cantAssign()
      )
    }
  })
  return store
};

const observeObject = (object, mode) => {
  const _createProxy = (value) => {
    if (isPlainObject(value)) {
      return createProxy(value);
    } else if (Array.isArray(value)) {
      return createProxy(value, true)
    }
    return value;
  };

  const createProxy = (object, observeArray) => {
    const objectProxyHandler = {
      set (target, property, value) {
        throwIf(!isDispatching, msgHelper.cantAssign());
        return Reflect.set(target, property, _createProxy(cloneObj(value)))
      },
      get (target, property) {
        return Reflect.get(target, property);
      }
    };
    const arrayProxyHandler = {
      ...objectProxyHandler,
      set (target, property, value) {
        throwIf(!isDispatching, msgHelper.cantAssign())
        return Reflect.set(target, property, _createProxy(cloneObj(value)))
      }
    };
    for (let key in object) {
      object[key] = _createProxy(object[key]);
    }
    return new Proxy(object, observeArray ? arrayProxyHandler : objectProxyHandler);
  };
  switch (mode) {
  case 'strict':
    return createProxy(object);
  case 'loose':
    return object;
  }
};

const passReducer = (reducers) => {
  const keys = Object.keys(reducers)

  keys.forEach(key => {
      let reducer = reducers[key]

      throwIf(
          typeof reducer !== 'function',
          `Reducer for key [${key}] must be type of [fnT] but got [${typeof reducer}]`
      )
  })

  return reducers
}

export { createStore };