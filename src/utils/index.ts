export const isFalsy = (value: unknown) => (value === 0 ? false : !value);

// 在一个函数里，改变传入的对象本身是不好的
export const cleanObject = (obj: object) => {
  const result = { ...obj };
  Object.keys(obj).forEach((key) => {
    // @ts-ignore
    const value = obj[key];
    if (isFalsy(value)) {
      // @ts-ignore
      delete result[key];
    }
  });
  return result;
};
