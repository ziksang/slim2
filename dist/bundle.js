'use strict';

var a = 10;
var b = a + 10;
var mm = new Proxy({
  name: 1
}, {
  get: function get(target, key) {
    return target[key];
  }
});
console.log(mm.name);

module.exports = b;
