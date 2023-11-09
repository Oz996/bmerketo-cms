export interface Product {
  _id: string;
  name: string;
  price: number;
  category: string;
  description: string;
  image: string;
  image2?: string;
  image3?: string;
  image4?: string;
  locked?: boolean;
  product?: Product;
  related: Product[];
  review: Review[];
  best?: boolean;
  sale?: string;
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
  image2: string;
  image3: string;
  image4: string;
  description: string;
}

export interface Review {
  _id: string;
  rating: number;
  name: string;
  email: string;
  review: string;
}

export interface CartItem extends Product {
  quantity: number;
}
