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
