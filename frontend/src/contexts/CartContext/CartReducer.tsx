import { CartItem, Product } from "../../types/types";

export type Actions =
  | { type: "ADD"; payload: Product; quantity: number }
  | { type: "INCREMENT"; payload: Product }
  | { type: "DECREMENT"; payload: Product }
  | { type: "REMOVE"; payload: Product }
  | { type: "EMPTY" };

interface Cart {
  cart: CartItem[];
}

export const cartReducer = (state: Cart, action: Actions) => {
  switch (action.type) {
    case "ADD":
      const existingProduct = state.cart?.find(
        (product) => product._id === action.payload._id
      );
      console.log(existingProduct)
      if (existingProduct) {
        return {
          ...state,
          cart: state.cart?.map((product) =>
            product._id === action.payload._id
              ? [{ ...product, quantity: product.quantity + action.quantity }]
              : product
          ),
        };
      } else {
        const newProduct = {
          ...state,
          cart: [
            ...state.cart,
            { ...action.payload, quantity: action.quantity },
          ],
        };
        console.log(newProduct)
        return newProduct;
      }
    case "INCREMENT":
      return {
        ...state,
        cart: state.cart?.map((product) =>
          product._id === action.payload._id
            ? { ...product, quantity: product.quantity + 1 }
            : product
        ),
      };
    case "DECREMENT":
      return {
        ...state,
        cart: state.cart
          .map((product) =>
            product._id === action.payload._id
              ? { ...product, quantity: product.quantity - 1 }
              : product
          )
          .filter((product) => product.quantity > 0),
      };
    case "REMOVE":
      const product = state.cart?.find(
        (product) => product._id === action.payload._id
      );
      if (product) {
        const cart = state.cart?.filter(
          (product) => product._id !== action.payload._id
        );
        const updatedCart = { ...state, cart: cart };
        return updatedCart;
      }
      return state;
    case "EMPTY":
      return { ...state, cart: [] };
    default:
      return state;
  }
};
