import { useContext } from "react";
import { render, waitFor } from "@testing-library/react";
import { describe, vi } from "vitest";
import {
  ProductContext,
  ProductContextProvider,
} from "../contexts/ProductContext";
import { mockProduct } from "./MockProduct";

global.fetch = vi.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(mockProduct),
  })
);

describe("ProductContextProvider", () => {
  it("fetches and provides products", async () => {
    const TestComponent = () => {
      const { products } = useContext(ProductContext);
      return (
        <div>
          {products.map((product) => (
            <div key={product._id}>{product.name}</div>
          ))}
        </div>
      );
    };
    const renderResult = render(
      <ProductContextProvider>
        <TestComponent />
      </ProductContextProvider>
    );

    await waitFor(() => {
      expect(
        renderResult.getByText("Herman Miller Embody")
      ).toBeInTheDocument();
    });
  });
});
