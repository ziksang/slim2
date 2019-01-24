'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _typeof(obj) {
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);

    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      _defineProperty(target, key, source[key]);
    });
  }

  return target;
}

// 判断是否是纯对象
var isPlainObject = function isPlainObject(obj) {
  return Object.prototype.toString.call(obj) === '[object Object]';
}; // 判断是否是纯字符

var isPlainString = function isPlainString(obj) {
  return typeof obj === 'string';
};

var throwIf = function throwIf(condition, assertion) {
  if (condition) throw new Error(assertion);
};
var warnIf = function warnIf(condition, assertion) {
  if (condition) console.warn(assertion);
};

var isDispatching = null;

var cloneObj = function cloneObj(p) {
  return JSON.parse(JSON.stringify(p));
};

var msgHelper = {
  typeError: function typeError(type) {
    return "type of state expect to [Object] but got [".concat(type, "]");
  },
  shouldBe: function shouldBe(name, expect, got) {
    return "".concat(name, " should be type of [").concat(expect, "] but got [").concat(got, "]");
  },
  cantCall: function cantCall(key) {
    return "You may not call ".concat(key, " while the reducer is executing. ") + 'The reducer has already received the state as an argument. ' + 'Pass it down from the top reducer instead of reading it from the store.';
  },
  cantAssign: function cantAssign() {
    return 'You may not be able to assign values ​​directly to state. ' + 'Please return a new state for reducing or edit with state in reducer.';
  }
};

var createStore = function createStore(conf) {
  var _conf$state = conf.state,
      state = _conf$state === void 0 ? {} : _conf$state,
      _conf$reducers = conf.reducers,
      reducers = _conf$reducers === void 0 ? {} : _conf$reducers,
      _conf$mode = conf.mode,
      mode = _conf$mode === void 0 ? 'strict' : _conf$mode; // Determine if it is a pure object

  if (!isPlainObject(state)) {
    throw new TypeError(msgHelper.typeError(_typeof(state)));
  }

  var currentState = observeObject(state, mode);
  var currentReducer = passReducer(reducers);

  var dispatch = function dispatch(action) {
    throwIf(!isPlainString(action), msgHelper.shouldBe('Actions', 'string', _typeof(action)));
    throwIf(isDispatching, "Reducers may not dispatch actions.");

    try {
      isDispatching = action;
      warnIf(!reducers[action], "You may not has not registered [".concat(action, "] in store"));

      if (currentReducer[action]) {
        for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }

        currentReducer[action].apply(currentReducer, [currentState].concat(args));
      }
    } finally {
      isDispatching = null;
    }
  };

  var store = new Proxy({
    state: currentState,
    dispatch: dispatch
  }, {
    get: function get(target, property) {
      return Reflect.get(target, property);
    },
    set: function set() {
      throwIf(!isDispatching, msgHelper.cantAssign());
    }
  });
  return store;
};

var observeObject = function observeObject(object, mode) {
  var _createProxy = function _createProxy(value) {
    if (isPlainObject(value)) {
      return createProxy(value);
    } else if (Array.isArray(value)) {
      return createProxy(value, true);
    }

    return value;
  };

  var createProxy = function createProxy(object, observeArray) {
    var objectProxyHandler = {
      set: function set(target, property, value) {
        throwIf(!isDispatching, msgHelper.cantAssign());
        return Reflect.set(target, property, _createProxy(cloneObj(value)));
      },
      get: function get(target, property) {
        return Reflect.get(target, property);
      }
    };

    var arrayProxyHandler = _objectSpread({}, objectProxyHandler, {
      set: function set(target, property, value) {
        throwIf(!isDispatching, msgHelper.cantAssign());
        return Reflect.set(target, property, _createProxy(cloneObj(value)));
      }
    });

    for (var key in object) {
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

var passReducer = function passReducer(reducers) {
  var keys = Object.keys(reducers);
  keys.forEach(function (key) {
    var reducer = reducers[key];
    throwIf(typeof reducer !== 'function', "Reducer for key [".concat(key, "] must be type of [fnT] but got [").concat(_typeof(reducer), "]"));
  });
  return reducers;
};

exports.createStore = createStore;
