import { fireEvent, render, screen } from "@testing-library/react";
import { Modal } from "./Modal";

describe("Modal Component Test", () => {
  it("modal shows the children and a close button", async () => {
    const handleClose = jest.fn();

    render(
      <Modal onClose={handleClose}>
        <div>test</div>
      </Modal>
    );

    expect(screen.getByText("test")).toBeTruthy();

    fireEvent.click(screen.getByRole("button"));

    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});
