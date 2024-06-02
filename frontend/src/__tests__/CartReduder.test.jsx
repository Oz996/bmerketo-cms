import { describe, expect, it } from "vitest";
import { cartReducer } from "../contexts/CartContext/CartReducer";

describe("cartReducer", () => {
  const initialState = { cart: [] };
  const product = { _id: 1, name: "chair", price: 100 };

  it("should add a product to the cart", () => {
    const action = { type: "ADD", payload: product, quantity: 2 };
    const newState = cartReducer(initialState, action);
    expect(newState.cart).toHaveLength(1);
    expect(newState.cart[0].quantity).toBe(2);
  });

  it("should increment product quantity", () => {
    const initialState = {
      cart: [{ _id: 1, name: "chair", price: 100, quantity: 1 }],
    };
    const action = { type: "INCREMENT", payload: product };
    const newState = cartReducer(initialState, action);
    expect(newState.cart[0].quantity).toBe(2);
  });

  it("should decrement product quantity", () => {
    const initialState = {
      cart: [{ _id: 1, name: "chair", price: 100, quantity: 2 }],
    };
    const action = { type: "DECREMENT", payload: product };
    const newState = cartReducer(initialState, action);
    expect(newState.cart[0].quantity).toBe(1);
  });

  it("should remove a product from the cart", () => {
    const initialState = {
      cart: [{ _id: 1, name: "chair", price: 100, quantity: 1 }],
    };
    const action = { type: "REMOVE", payload: product };
    const newState = cartReducer(initialState, action);
    expect(newState.cart).toHaveLength(0);
  });

  it("should empty the cart", () => {
    const initialState = {
      cart: [
        { _id: 1, name: "chair", price: 100, quantity: 1 },
        { _id: 2, name: "sofa", price: 100, quantity: 2 },
      ],
    };
    const action = { type: "EMPTY" };
    const newState = cartReducer(initialState, action);
    expect(newState.cart).toHaveLength(0);
  });
});
