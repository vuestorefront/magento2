const getVsfKey = (key) => `vsf-${key}`;

const mergeLocalStorageItem = (key: string, value: string) => {
  const oldValue = window.localStorage.getItem(key);
  const oldObject = JSON.parse(oldValue);
  const newObject = value;
  const nextValue = JSON.stringify({ ...JSON.parse(JSON.stringify(oldObject)), ...JSON.parse(JSON.stringify(newObject)) });
  window.localStorage.setItem(key, nextValue);
};

const createPromise = (getValue, callback): Promise<any> => new Promise((resolve, reject) => {
  try {
    const value = getValue();
    if (callback) {
      callback(null, value);
    }
    resolve(value);
  } catch (err) {
    if (callback) {
      callback(err);
    }
    reject(err);
  }
});

// eslint-disable-next-line max-len
export const getItem = (key: string, callback?: Function): Promise<any> => createPromise(() => JSON.parse(window.localStorage.getItem(getVsfKey(key))), callback);

// eslint-disable-next-line max-len
export const setItem = (key: string, value: string, callback?: Function): Promise<any> => createPromise(() => (window.localStorage.setItem(getVsfKey(key), JSON.stringify(value))), callback);

// eslint-disable-next-line max-len
export const removeItem = (key: string, callback?: Function): Promise<any> => createPromise(() => {
  window.localStorage.removeItem(getVsfKey(key));
}, callback);

// eslint-disable-next-line max-len
export const mergeItem = (key: string, value: string, callback?: Function): Promise<any> => createPromise(() => mergeLocalStorageItem(getVsfKey(key), value), callback);

export const clear = (callback?: Function): Promise<any> => createPromise(() => {
  window.localStorage.clear();
}, callback);
