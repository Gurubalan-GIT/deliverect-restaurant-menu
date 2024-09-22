import { act } from "@testing-library/react";
import * as zustand from "zustand";

const { create: actualCreate, createStore: actualCreateStore } =
  jest.requireActual<typeof zustand>("zustand");

// a variable to hold reset functions for all stores declared in the app
export const storeResetFns = new Set<() => void>();

const createUnCurried = <T>(stateCreator: zustand.StateCreator<T>) => {
  const store = actualCreate(stateCreator);
  const initialState = store.getState();
  storeResetFns.add(() => {
    store.setState(initialState, true);
  });
  return store;
};

// when creating a store, we get its initial state, create a reset function and add it to the set
export const create = (<T>(stateCreator: zustand.StateCreator<T>) => {
  return typeof stateCreator === "function"
    ? createUnCurried(stateCreator)
    : createUnCurried;
}) as typeof zustand.create;

const createStoreUnCurried = <T>(stateCreator: zustand.StateCreator<T>) => {
  const store = actualCreateStore(stateCreator);
  const initialState = store.getState();
  storeResetFns.add(() => {
    store.setState(initialState, true);
  });
  return store;
};

// when creating a store, we get its initial state, create a reset function and add it to the set
export const createStore = (<T>(stateCreator: zustand.StateCreator<T>) => {
  return typeof stateCreator === "function"
    ? createStoreUnCurried(stateCreator)
    : createStoreUnCurried;
}) as typeof zustand.createStore;

// reset all stores after each test run
afterEach(() => {
  act(() => {
    storeResetFns.forEach((resetFn) => {
      resetFn();
    });
  });
});
