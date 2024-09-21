import { IMenuItem } from "@modules/Menu/interfaces";
import endpoints from "./endpoints";

export const fetchMenuData = async () => {
  try {
    const res = await fetch(endpoints.menu);
    if (!res.ok) {
      throw new Error("Failed to fetch menu data");
    }
    return await res.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getFilteredMenuItem = ({
  menuItems,
  debouncedSearchTerm,
}: {
  menuItems: IMenuItem[];
  debouncedSearchTerm: string;
}) =>
  menuItems.filter((item) =>
    item.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
  );

export const isEqual = (a: any, b: any): boolean => {
  if (a === b) return true;

  if (typeof a === "object" && typeof b === "object") {
    const aKeys = Object.keys(a);
    const bKeys = Object.keys(b);

    if (aKeys.length !== bKeys.length) return false;

    return aKeys.every((key) => isEqual(a[key], b[key]));
  }

  return false;
};

export const isEmpty = (value: any): boolean => {
  if (value === null || value === undefined) return true;

  if (typeof value === "string" || Array.isArray(value)) {
    return value.length === 0;
  }

  if (typeof value === "object") {
    return Object.keys(value).length === 0;
  }

  return false;
};
