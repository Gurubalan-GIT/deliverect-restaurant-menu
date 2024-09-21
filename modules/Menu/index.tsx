import emptyMenuImage from "@assets/images/empty-menu.png";
import BackArrowIcon from "@assets/svg/back-arrow.svg";
import SearchIcon from "@assets/svg/search.svg";
import Button from "@components/Button";
import Empty from "@components/Empty";
import Input from "@components/Input";
import { isEmpty } from "@utils/helpers";
import useStore from "@zustand/menuStore";
import { useDebounce } from "../../hooks/useDebounce";
import MenuItemList from "./MenuItemList";

export const Menu = () => {
  const { categories, menuItems, resetAppState, searchTerm, setSearchTerm } =
    useStore();
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const filteredItems = menuItems.filter((item) =>
    item.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
  );

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="flex items-center mb-6">
        <Button
          onClick={resetAppState}
          className="mr-4 p-2 rounded-lg transition-all duration-200 hover:bg-gray-200"
        >
          <BackArrowIcon />
        </Button>
        <h1 className="text-2xl font-bold text-blue-800">Menu</h1>
      </div>

      <div className="relative mb-8">
        <Input
          placeholder="Search for dishes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          icon={
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2" />
          }
        />
      </div>

      {isEmpty(filteredItems) ? (
        <Empty
          image={emptyMenuImage}
          text="No dishes found. Try searching something different!"
        />
      ) : (
        <MenuItemList categories={categories} filteredItems={filteredItems} />
      )}
    </div>
  );
};
