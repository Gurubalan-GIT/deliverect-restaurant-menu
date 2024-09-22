import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Button from "./";

describe("Button Component", () => {
  it("should render correctly", () => {
    render(<Button onClick={() => {}}>Click Me</Button>);
    expect(screen.getByText("Click Me")).toBeInTheDocument();
  });

  it("should call onClick when clicked", async () => {
    const onClick = jest.fn();
    render(<Button onClick={onClick}>Click Me</Button>);

    const button = screen.getByText("Click Me");
    await userEvent.click(button);

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
