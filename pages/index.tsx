import ErrorBoundary from "@components/ErrorBoundary";
import { Menu } from "@modules/Menu";
import { IMenuCategory, IMenuItem } from "@modules/Menu/interfaces";
import { fetchMenuData } from "@utils/helpers";
import useStore from "@zustand/menuStore";
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

  return (
    <ErrorBoundary>
      <Menu />
    </ErrorBoundary>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
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
  } catch (error) {
    console.error(error);
    return {
      props: {
        error: "Failed to load menu data",
      },
    };
  }
};

export default HomePage;
