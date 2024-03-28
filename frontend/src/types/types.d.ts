interface Image {
  image: string;
  _id?: string;
}

export interface Product {
  _id: string;
  name: string;
  price: string;
  category: string;
  description: string;
  images: Image[];
  product?: Product;
  related?: Product[];
  review?: Review[];
  best?: boolean;
  sale?: string;
  locked?: boolean;
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
  description: string;
}

export interface Review {
  _id: string;
  rating: number;
  name: string;
  email: string;
  review: string;
}

export interface Object {
  name: string;
  category: string;
  price: string;
  image: string;
  description: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface StoreProps {
  products?: Product[];
  setDisplayList: React.Dispatch<SetStateAction<Product[] | null>>;
  sortedProducts: (sortBy: string | null) => Product[];
}
