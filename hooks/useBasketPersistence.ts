import useStore from "@zustand/menuStore";
import { useEffect } from "react";

const useBasketPersistence = () => {
  const { basket, loadBasketFromStorage } = useStore();

  useEffect(() => {
    loadBasketFromStorage();
  }, [loadBasketFromStorage]);

  useEffect(() => {
    if (basket.length > 0) {
      localStorage.setItem("basket", JSON.stringify(basket));
    } else {
      localStorage.removeItem("basket");
    }
  }, [basket]);
};

export default useBasketPersistence;
