export type Product = {
  _id: string;
  title: string;
  price: number;
  image: string;
};

export type User = {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
};

export type ProductOrder = Product & {
  quantity: number;
};

export type Order = {
  _id: string;
  userId: string;
  productList: ProductOrder[];
  createdAt: string;
};
