import {
  setItem, getItem, mergeItem, removeItem, clear,
} from '~/helpers/asyncLocalStorage';

/* eslint-disable no-underscore-dangle */

describe('asyncLocalStorage :: Promised Based Localstorage Management', () => {
  test('setItem :: should store to localStorage by key', async () => {
    const KEY = 'jest';
    const VSF_KEY = `vsf-${KEY}`;
    const VALUE = 'jest-localstorage-value';
    const VSF_VALUE = JSON.stringify(VALUE);

    await setItem(KEY, VALUE);

    expect(localStorage.setItem).toHaveBeenLastCalledWith(VSF_KEY, VSF_VALUE);
    expect(localStorage.__STORE__[VSF_KEY]).toBe(VSF_VALUE);
    expect(Object.keys(localStorage.__STORE__ as Object)).toHaveLength(1);
  });

  test('getItem :: should get value from localStorage by key', async () => {
    const KEY = 'jest';
    const VSF_KEY = `vsf-${KEY}`;
    const VSF_VALUE = 'jest-localstorage-value';

    const VALUE = await getItem(KEY);

    expect(localStorage.getItem).toHaveBeenLastCalledWith(VSF_KEY);
    expect(localStorage.__STORE__[VSF_KEY]).toBe(JSON.stringify(VALUE));
    expect(VSF_VALUE).toBe(VALUE);
  });

  test('merge :: should merge values to localStorage by key', async () => {
    const KEY = 'jest';
    const VSF_KEY = `vsf-${KEY}`;
    const VALUE = { row1: 'Lonely' };
    const VSF_VALUE = JSON.stringify(VALUE);
    const MERGE_VALUE = { row2: 'Not anymore' };
    const VSF_MERGE_VALUE = JSON.stringify({
      row1: 'Lonely',
      row2: 'Not anymore',
    });

    await setItem(KEY, VALUE);

    expect(localStorage.__STORE__[VSF_KEY]).toBe(VSF_VALUE);
    expect(Object.keys(localStorage.__STORE__ as Object)).toHaveLength(1);

    await mergeItem(KEY, MERGE_VALUE);

    expect(localStorage.__STORE__[VSF_KEY]).toBe(VSF_MERGE_VALUE);
    expect(Object.keys(localStorage.__STORE__ as Object)).toHaveLength(1);
  });

  test('remove :: should remove a key and value from localStorage', async () => {
    const KEY = 'jest';
    const VSF_KEY = `vsf-${KEY}`;

    expect(Object.keys(localStorage.__STORE__ as Object)).toHaveLength(1);

    await removeItem(KEY);

    expect(localStorage.removeItem).toHaveBeenCalledWith(VSF_KEY);
    expect(Object.keys(localStorage.__STORE__ as Object)).toHaveLength(0);
  });

  test('clear :: should clear all values and keys from localStorage', async () => {
    await clear();

    expect(localStorage.clear).toHaveBeenCalledWith();
    expect(Object.keys(localStorage.__STORE__ as Object)).toHaveLength(0);
  });
});
