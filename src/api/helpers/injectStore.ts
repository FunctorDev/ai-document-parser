import type { Store } from '@reduxjs/toolkit';

export let _store: Store;

export const injectStore = (store: Store) => {
  _store = store;
};
