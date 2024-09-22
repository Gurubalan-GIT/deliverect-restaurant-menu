import menuItemFallbackImage from "@assets/images/fallback-menu-item.webp";
import { isEqual } from "@utils/helpers";
import useStore from "@zustand/menuStore";
import classNames from "classnames";
import Image from "next/image";
import { useMemo } from "react";
import { IMenuItem } from "../interfaces";

type Props = {
  item: IMenuItem;
};

const MenuItem: React.FC<Props> = ({ item }) => {
  const { addToBasket, basket } = useStore();
  const basketItem =
    basket.find((basketItem) => isEqual(basketItem.id, item.id)) || null;
  const quantityInBasket = basketItem ? basketItem.quantity : 0;
  const stockAvailability = item.stock?.availability ?? 0;

  const realizedStockAvailability = useMemo(
    () => stockAvailability - quantityInBasket,
    [stockAvailability, quantityInBasket]
  );

  const isStockAvailable = realizedStockAvailability > 0;

  const handleAddToBasket = () => {
    addToBasket(item);
  };

  return (
    <div
      onClick={handleAddToBasket}
      className={classNames(
        "menu-item",
        quantityInBasket > 0 ? "border-blue-500" : "border-transparent",
        !isStockAvailable && "item-unavailable"
      )}
    >
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h3 className="font-semibold text-lg text-blue-800">
            {quantityInBasket > 0 && `${quantityInBasket} × `}
            {item?.name}
          </h3>
          <p className="text-sm text-gray-600 line-clamp-2 overflow-hidden">
            {item?.description}
          </p>
          <p className="mt-1 text-sm">
            {item?.discount_rate > 0 ? (
              <>
                <span className="font-semibold mr-2 text-blue-800">
                  AED{" "}
                  {((item.price * (1 - item.discount_rate)) / 100).toFixed(2)}
                </span>
                <span className="line-through text-gray-600">
                  AED {(item.price / 100).toFixed(2)}
                </span>
              </>
            ) : (
              <>AED {(item.price / 100).toFixed(2)}</>
            )}
          </p>

          <div className="mt-1">
            {isStockAvailable ? (
              <p className="text-sm text-green-600">
                Available Stock: {realizedStockAvailability}
              </p>
            ) : (
              <p className="text-sm text-red-500">Out of Stock</p>
            )}
          </div>
        </div>

        <div className="ml-4">
          <Image
            src={item?.photo ?? menuItemFallbackImage}
            alt={item?.name}
            width={80}
            height={80}
            className="rounded-md"
          />
        </div>
      </div>
    </div>
  );
};

export default MenuItem;
