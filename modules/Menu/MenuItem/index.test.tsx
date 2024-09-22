import { mockMenuItems } from "@mocks/mockData";
import MenuItem from "@modules/Menu/MenuItem";
import { fireEvent, render, screen } from "@testing-library/react";
import useMenuStore from "@zustand/menuStore";

// Mock Zustand store
jest.mock("@zustand/menuStore");

describe("MenuItem Component", () => {
  beforeEach(() => {
    (useMenuStore as unknown as jest.Mock).mockReturnValue({
      addToBasket: jest.fn(),
      basket: [],
    });
  });

  it("should render the menu item correctly", () => {
    render(<MenuItem item={mockMenuItems[0]} />);
    expect(screen.getByText(mockMenuItems[0].name)).toBeInTheDocument();
    expect(
      screen.getByText(`AED ${(mockMenuItems[0].price / 100).toFixed(2)}`)
    ).toBeInTheDocument();
  });

  it("should add the item to the basket when clicked", () => {
    const addToBasket = jest.fn();
    (useMenuStore as unknown as jest.Mock).mockReturnValue({
      addToBasket,
      basket: [],
    });

    render(<MenuItem item={mockMenuItems[0]} />);
    fireEvent.click(screen.getByText(mockMenuItems[0].name));
    expect(addToBasket).toHaveBeenCalledWith(mockMenuItems[0]);
  });

  it("should display 'Out of Stock' if stock is zero", () => {
    render(
      <MenuItem item={{ ...mockMenuItems[1], stock: { availability: 0 } }} />
    );
    expect(screen.getByText("Out of Stock")).toBeInTheDocument();
  });
});
