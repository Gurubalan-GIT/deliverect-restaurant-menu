import { mockCategories, mockMenuItems } from "@mocks/mockData";
import MenuItemList from "@modules/Menu/MenuItemList";
import { render, screen } from "@testing-library/react";

describe("MenuItemList Component", () => {
  it("should render categories and corresponding items", () => {
    render(
      <MenuItemList categories={mockCategories} filteredItems={mockMenuItems} />
    );

    expect(screen.getByText("Burgers")).toBeInTheDocument();
    expect(screen.getByText("Chicken & Avocado")).toBeInTheDocument();
    expect(screen.getByText("Cheese Burger")).toBeInTheDocument();

    expect(screen.getByText("Main courses")).toBeInTheDocument();
    expect(screen.getByText("Super Bowl")).toBeInTheDocument();
  });

  it("should not render a category if there are no items in it", () => {
    const filteredItems = mockMenuItems.filter(
      (item) => item.category_id === "1"
    );

    render(
      <MenuItemList categories={mockCategories} filteredItems={filteredItems} />
    );

    // Ensure the second category (id = 2) is not rendered
    expect(screen.queryByText("Main courses")).not.toBeInTheDocument();
  });
});
