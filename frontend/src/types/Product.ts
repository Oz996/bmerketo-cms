export interface Product {
  _id: string;
  name: string;
  price: string;
  category: string;
  description: string;
  image: string;
  locked?: boolean;
  product?: Product
}
