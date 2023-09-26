export interface Product {
  _id: string;
  name: string;
  price: string;
  category: string;
  description: string;
  image: string;
  locked?: boolean;
  product?: Product;
}

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

export interface FormData {
  _id: string;
  name: string;
  price: string;
  category: string;
  image: string;
  description: string;
}
