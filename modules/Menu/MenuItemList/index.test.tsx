import { mockCategories, mockMenuItems } from "@mocks/mockData";
import MenuItemList from "@modules/Menu/MenuItemList";
import { render, screen } from "@testing-library/react";
import { isEqual } from "@utils/helpers";

describe("MenuItemList Component", () => {
  it("should render categories and corresponding items dynamically from mock data", () => {
    render(
      <MenuItemList categories={mockCategories} filteredItems={mockMenuItems} />
    );

    // Check for each category and its respective items based on mock data
    mockCategories.forEach((category) => {
      expect(screen.getByText(category.name)).toBeInTheDocument();
      mockMenuItems
        .filter((item) => isEqual(item.category_id, category.id))
        .forEach((item) => {
          expect(screen.getByText(item.name)).toBeInTheDocument();
        });
    });
  });

  it("should not render a category if there are no items in it", () => {
    const filteredItems = mockMenuItems.filter((item) =>
      isEqual(item.category_id, "1")
    );

    render(
      <MenuItemList categories={mockCategories} filteredItems={filteredItems} />
    );

    // Check that the first category with items is rendered
    expect(screen.getByText(mockCategories[0].name)).toBeInTheDocument();

    // Check that the second category with no items is not rendered
    expect(screen.queryByText(mockCategories[1].name)).not.toBeInTheDocument();
  });
});
