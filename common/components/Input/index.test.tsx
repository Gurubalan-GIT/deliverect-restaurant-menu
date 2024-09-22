import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Input from "./";

describe("Input Component", () => {
  it("should render correctly", () => {
    render(<Input value="" onChange={() => {}} placeholder="Search..." />);
    expect(screen.getByPlaceholderText("Search...")).toBeInTheDocument();
  });

  it("should call onChange when value changes", async () => {
    const handleChange = jest.fn();
    render(<Input value="" onChange={handleChange} placeholder="Search..." />);

    const input = screen.getByPlaceholderText("Search...");
    await userEvent.type(input, "New Value");

    expect(handleChange).toHaveBeenCalledTimes(9);
  });
});
