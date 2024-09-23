import { mockCategories, mockMenuItems } from "@mocks/mockData";
import { render, screen } from "@testing-library/react";
import MenuItemList from "./MenuItemList";

describe("MenuItemList Component", () => {
  it("renders without crashing", () => {
    render(
      <MenuItemList categories={mockCategories} filteredItems={mockMenuItems} />
    );
    expect(screen.getByText(mockCategories[0].name)).toBeInTheDocument();
  });
});
