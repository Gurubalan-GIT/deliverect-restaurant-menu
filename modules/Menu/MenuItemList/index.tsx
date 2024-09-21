import { isEmpty, isEqual } from "@utils/helpers";
import { Fragment } from "react";
import { IMenuCategory, IMenuItem } from "../interfaces";
import MenuItem from "../MenuItem";

type Props = {
  categories: IMenuCategory[];
  filteredItems: IMenuItem[];
};

const MenuItemList: React.FC<Props> = ({ categories, filteredItems }) => {
  return (
    <div className="grid grid-cols-1 gap-6">
      {categories.map((category) => {
        const categoryItems = filteredItems.filter((item) =>
          isEqual(item.category_id, category.id)
        );

        if (isEmpty(categoryItems)) return null;

        return (
          <div key={category.id}>
            <h2 className="text-2xl font-semibold mb-4 text-blue-800">
              {category.name}
            </h2>
            <div className="space-y-4">
              {categoryItems.map((item) => (
                <Fragment key={item?.id}>
                  <MenuItem item={item} />
                  <hr className="mt-4 border-t border-gray-100" />
                </Fragment>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MenuItemList;
