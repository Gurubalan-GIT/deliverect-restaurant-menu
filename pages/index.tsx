import { Menu } from "@modules/Menu";
import { IMenuCategory, IMenuItem } from "@modules/Menu/interfaces";
import { fetchMenuData } from "@utils/helpers";
import useStore from "@zustand/store";
import { GetServerSideProps } from "next";
import { useEffect } from "react";
import useBasketPersistence from "../hooks/useBasketPersistence";

type Props = {
  menuData: {
    categories: IMenuCategory[];
    items: IMenuItem[];
  };
};

const HomePage: React.FC<Props> = ({ menuData }) => {
  const { setMenuItems, setCategories } = useStore();

  useBasketPersistence();

  useEffect(() => {
    setCategories(menuData.categories);
    setMenuItems(menuData.items);
  }, [menuData, setCategories, setMenuItems]);

  return <Menu />;
};

export const getServerSideProps: GetServerSideProps = async () => {
  const menuData = await fetchMenuData();

  if (!menuData) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      menuData,
    },
  };
};

export default HomePage;
