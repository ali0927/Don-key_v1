

export const createCache = () => {
  const obj: any = {};
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