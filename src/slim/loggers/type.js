// 判断是否是纯对象
export const isPlainObject = (obj) => {
  return Object.prototype.toString.call(obj) === '[object Object]';
};

// 判断是否是纯字符
export const isPlainString = (obj) => {
  return typeof obj === 'string';
};