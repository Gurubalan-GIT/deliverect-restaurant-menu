import {
  IBasketItem,
  IMenuCategory,
  IMenuItem,
} from "@modules/Menu/interfaces";
import { isEqual } from "@utils/helpers";
import { create } from "zustand";

interface MenuStoreState {
  categories: IMenuCategory[];
  menuItems: IMenuItem[];
  basket: IBasketItem[];
  searchTerm: string;

  setCategories: (categories: IMenuCategory[]) => void;
  setMenuItems: (menuItems: IMenuItem[]) => void;
  addToBasket: (item: IMenuItem) => void;
  removeFromBasket: (id: string) => void;
  setSearchTerm: (term: string) => void;
  resetAppState: () => void;
  loadBasketFromStorage: () => void;
}

const useMenuStore = create<MenuStoreState>((set) => ({
  categories: [] as IMenuCategory[],
  menuItems: [] as IMenuItem[],
  basket: [] as IBasketItem[],
  searchTerm: "",

  setCategories: (categories) => set({ categories }),

  setMenuItems: (menuItems) => set({ menuItems }),

  setSearchTerm: (term: string) => set({ searchTerm: term }),

  addToBasket: (item) =>
    set((state) => {
      const existingItem = state.basket.find((basketItem) =>
        isEqual(basketItem.id, item.id)
      );

      const stockAvailability = item.stock?.availability ?? 0;
      if (existingItem) {
        if (existingItem.quantity >= stockAvailability) return state;

        return {
          basket: state.basket.map((basketItem) =>
            isEqual(basketItem.id, item.id)
              ? { ...basketItem, quantity: basketItem.quantity + 1 }
              : basketItem
          ),
        };
      }

      return {
        basket: [...state.basket, { ...item, quantity: 1 }],
      };
    }),

  resetAppState: () => set({ basket: [], searchTerm: "" }), // Reset search term too

  removeFromBasket: (id) =>
    set((state) => ({
      basket: state.basket.filter((basketItem) => !isEqual(basketItem.id, id)),
    })),

  loadBasketFromStorage: () => {
    const savedBasket = localStorage.getItem("basket");
    if (savedBasket) {
      set({ basket: JSON.parse(savedBasket) });
    }
  },
}));

export default useMenuStore;
