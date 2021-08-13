export const updateObject = (oldObject, newValues) => {
  // 用空对象作为第一个参数传递给 Object.assign，以确保是复制数据，而不是去改变原来的数据
  return Object.assign({}, oldObject, newValues);
};
