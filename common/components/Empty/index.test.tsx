import placeholderImage from "@assets/images/empty-menu.png";
import { render, screen } from "@testing-library/react";
import Empty from "./";

describe("Empty Component", () => {
  it("should render image and text correctly", () => {
    render(<Empty image={placeholderImage} text="No results found" />);

    // Check if image is rendered
    const image = screen.getByAltText("Empty State");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", placeholderImage.src); // Mock the src for StaticImageData from Next Image

    // Check if text is rendered
    expect(screen.getByText("No results found")).toBeInTheDocument();
  });

  it("should display the correct alt text for the image", () => {
    render(<Empty image={placeholderImage} text="No results found" />);

    // Check if image alt text is correct
    expect(screen.getByAltText("Empty State")).toBeInTheDocument();
  });
});
