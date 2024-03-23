import { fireEvent, render, screen } from "@testing-library/react";
import DeleteModal from "../DeleteModal";
import { MemoryRouter } from "react-router-dom";
import { expect } from "vitest";

const MockDeleteModal = () => {
  return (
    // MemoryRouter to simulate routing
    <MemoryRouter>
      <DeleteModal />
    </MemoryRouter>
  );
};

describe("DeleteModal", () => {
  it("renders the modal button", () => {
    render(<MockDeleteModal />);
    const deleteButton = screen.getByText("Delete");
    expect(deleteButton).toBeInTheDocument();
  });

  it("closes the modal when the 'Cancel' button is clicked", () => {
    render(<MockDeleteModal />);
    const deleteButton = screen.getByText("Delete");
    fireEvent.click(deleteButton);
    const cancelButton = screen.getByText("Cancel");
    fireEvent.click(cancelButton);
    const modalContent = screen.queryByText(
      "Are you sure you want to remove this product?"
    );
    expect(modalContent).toBeNull();
  });
});
