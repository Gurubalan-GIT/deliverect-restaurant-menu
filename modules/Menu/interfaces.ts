export interface IMenuCategory {
  id: string;
  name: string;
  url: string;
}

export interface IStock {
  availability: number;
}

export interface IMenuItem {
  id: string;
  name: string;
  url: string;
  price: number;
  discount_rate: number;
  stock: IStock | null;
  description: string;
  photo: string | null;
  category_id: string;
}

export interface IBasketItem extends IMenuItem {
  quantity: number;
}
