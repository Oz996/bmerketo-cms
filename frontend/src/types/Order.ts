import { Product } from "./Product";

export interface Order {
  _id: string;
  createdAt: string;
  updatedAt: string;
  products: Product[];
  status: string;
  user: {
    _id: string;
    email: string;
  };
}
