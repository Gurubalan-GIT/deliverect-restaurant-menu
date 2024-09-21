import BackArrowIcon from "@assets/svg/back-arrow.svg";
import SearchIcon from "@assets/svg/search.svg";
import useStore from "@zustand/store";
import { useMemo, useState } from "react";
import MenuItem from "./MenuItem";

export const Menu = () => {
  const { categories, menuItems, resetAppState } = useStore();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredItems = useMemo(
    () =>
      menuItems.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [searchTerm, menuItems]
  );

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="flex items-center mb-6">
        {/* Back Button with hover state */}
        <button
          onClick={resetAppState}
          className="mr-4 p-2 rounded-lg transition-all duration-200 hover:bg-gray-200"
        >
          <BackArrowIcon />
        </button>
        <h1 className="text-2xl font-bold text-blue-800">Menu</h1>
      </div>

      <div className="relative mb-8">
        <input
          type="text"
          placeholder="Search for dishes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full py-3 px-4 border border-gray-300 rounded-lg pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2" />
      </div>

      <div className="grid grid-cols-1 gap-6">
        {categories.map((category) => (
          <div key={category.id}>
            <h2 className="text-2xl font-semibold mb-4 text-blue-800">
              {category.name}
            </h2>
            <div className="space-y-4">
              {filteredItems
                .filter((item) => item.category_id === category.id)
                .map((item) => (
                  <>
                    <MenuItem key={item.id} item={item} />
                    <hr className="mt-4 border-t border-gray-100" />
                  </>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
