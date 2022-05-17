const getVsfKey = (key: string) => `vsf-${key}`;

type Callback<TValue> = (error: Error | null, value?: TValue) => void;

const mergeLocalStorageItem = (key: string, value: Record<string, unknown>) : void => {
  const oldValue = window.localStorage.getItem(key);
  const oldObject = JSON.parse(oldValue);
  const newObject = value;
  const nextValue = JSON.stringify({
    ...JSON.parse(JSON.stringify(oldObject)),
    ...JSON.parse(JSON.stringify(newObject)),
  });
  window.localStorage.setItem(key, nextValue);
};

const createPromise = <TValue>(
  getValue: () => TValue,
  callback: Callback<TValue>,
) : Promise<TValue> => new Promise((resolve, reject) => {
  try {
    const value = getValue();
    if (callback) {
      callback(null, value);
    }
    resolve(value);
  } catch (err) {
    if (callback) {
      callback(err as Error);
    }
    reject(err);
  }
});

export const getItem = <T = unknown>(
  key: string,
  callback?: Callback<T>,
): Promise<T> => createPromise(() => JSON.parse(window.localStorage.getItem(getVsfKey(key))), callback);

export const setItem = <T = unknown>(
  key: string,
  value: T,
  callback?: Callback<void>,
): Promise<void> => createPromise(() => (window.localStorage.setItem(getVsfKey(key), JSON.stringify(value))), callback);

export const removeItem = (
  key: string,
  callback?: Callback<void>,
): Promise<void> => createPromise(() => {
  window.localStorage.removeItem(getVsfKey(key));
}, callback);

export const mergeItem = (
  key: string,
  value: Record<string, unknown>,
  callback?: Callback<void>,
): Promise<void> => createPromise(() => mergeLocalStorageItem(getVsfKey(key), value), callback);

export const clear = (callback?: Callback<void>): Promise<void> => createPromise(() => {
  window.localStorage.clear();
}, callback);
