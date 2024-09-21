import {
  IBasketItem,
  IMenuCategory,
  IMenuItem,
} from "@modules/Menu/interfaces";
import { create } from "zustand";

interface StoreState {
  categories: IMenuCategory[];
  menuItems: IMenuItem[];
  basket: IBasketItem[];

  setCategories: (categories: IMenuCategory[]) => void;
  setMenuItems: (menuItems: IMenuItem[]) => void;
  addToBasket: (item: IMenuItem) => void;
  removeFromBasket: (id: string) => void;
  resetAppState: () => void;
  loadBasketFromStorage: () => void;
}

const useStore = create<StoreState>((set) => ({
  categories: [],
  menuItems: [],
  basket: [],

  setCategories: (categories) => set({ categories }),

  setMenuItems: (menuItems) => set({ menuItems }),

  addToBasket: (item) =>
    set((state) => {
      const existingItem = state.basket.find(
        (basketItem) => basketItem.id === item.id
      );
      const stockAvailability = item.stock?.availability ?? 0;

      if (existingItem && existingItem.quantity < stockAvailability) {
        return {
          basket: state.basket.map((basketItem) =>
            basketItem.id === item.id
              ? { ...basketItem, quantity: basketItem.quantity + 1 }
              : basketItem
          ),
        };
      } else if (!existingItem) {
        return {
          basket: [...state.basket, { ...item, quantity: 1 }],
        };
      }
      return state;
    }),

  removeFromBasket: (id) =>
    set((state) => ({
      basket: state.basket.filter((item) => item.id !== id),
    })),

  resetAppState: () => set({ basket: [] }),

  loadBasketFromStorage: () => {
    const savedBasket = localStorage.getItem("basket");
    if (savedBasket) {
      set({ basket: JSON.parse(savedBasket) });
    }
  },
}));

export default useStore;
