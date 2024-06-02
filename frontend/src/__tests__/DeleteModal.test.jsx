import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import DeleteModal from "../components/Features/Products/DeleteModal/DeleteModal";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import { AuthContextProvider } from "../contexts/AuthContext";
import { ProductContextProvider } from "../contexts/ProductContext";

const renderedButton = (
  <MemoryRouter>
    <AuthContextProvider>
      <ProductContextProvider>
        <DeleteModal />
      </ProductContextProvider>
    </AuthContextProvider>
  </MemoryRouter>
);

const renderedLockedButton = (
  <MemoryRouter>
    <AuthContextProvider>
      <ProductContextProvider>
        <DeleteModal locked={true} />
      </ProductContextProvider>
    </AuthContextProvider>
  </MemoryRouter>
);

describe("DeleteModal", () => {
  it("renders the modal button", () => {
    render(renderedButton);
    const button = screen.getByText("Delete");
    expect(button).toBeInTheDocument();
  });

  it("is disabled if it has locked attribute", () => {
    render(renderedLockedButton);
    const button = screen.getByText("Delete");
    expect(button).toBeDisabled();
  });
});
