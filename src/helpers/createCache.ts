

export const createCache = (ttl = 10000) => {
  let obj: any = {};
  setTimeout(() => {
    obj = {};
  }, ttl);
  return {
    set: (key: string, val: string) => {
      obj[key] = val;
    },
    get: (key: string) => {
      return obj[key]
    },
    delete: (key: string) => {
      delete obj[key];
    }
  }
}