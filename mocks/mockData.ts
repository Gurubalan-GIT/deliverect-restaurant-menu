import { IMenuCategory, IMenuItem } from "@modules/Menu/interfaces";

export const mockMenuItems: IMenuItem[] = [
  {
    id: "1",
    name: "Chicken & Avocado",
    url: "chicken-avocado",
    price: 3500,
    discount_rate: 0.1,
    stock: {
      availability: 100,
    },
    description:
      "Grilled chicken, avocado, tomato, iceberg lettuce and mayonnaise",
    photo: null,
    category_id: "1",
  },
  {
    id: "2",
    name: "Cheese Burger",
    url: "cheese-burger",
    price: 1500,
    discount_rate: 0.2,
    stock: {
      availability: 1,
    },
    description: "Very nice cheese burger.",
    photo: null,
    category_id: "1",
  },
  {
    id: "3",
    name: "Avo Burger",
    url: "avo-burger",
    price: 4300,
    discount_rate: 0,
    stock: {
      availability: 8,
    },
    description: "Delicious Avo Chicken Burger with Swiss Cheese.",
    photo: null,
    category_id: "1",
  },
  {
    id: "4",
    name: "Super Bowl",
    url: "super-bowl",
    price: 3000,
    discount_rate: 0,
    stock: {
      availability: 3,
    },
    description:
      "Beetroot hummus, edamame, quinoa, cucumber, kale, falafel, avocado, roast pumpkin, cherry tomato, spinach, cajun bagel chips, fresh lime, sunflower seeds and served with honey soya dressing",
    photo: null,
    category_id: "2",
  },
];

export const mockCategories: IMenuCategory[] = [
  {
    id: "1",
    name: "Burgers",
    url: "burgers",
  },
  {
    id: "2",
    name: "Main courses",
    url: "main-courses",
  },
];
