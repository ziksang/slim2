
export const throwIf = (condition, assertion) => {
  if (condition) throw new Error(assertion);
};

export const warnIf= (condition, assertion) => {
  if (condition) console.warn(assertion);
};
