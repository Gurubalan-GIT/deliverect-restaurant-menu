import { render, screen } from "@testing-library/react";
import ErrorBoundary from "./";

describe("ErrorBoundary Component", () => {
  beforeEach(() => {
    // Suppress the console error during the test
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    // Restore console.error after each test
    jest.restoreAllMocks();
  });

  it("should render child components if no error occurs", () => {
    render(
      <ErrorBoundary>
        <p>Content</p>
      </ErrorBoundary>
    );
    expect(screen.getByText("Content")).toBeInTheDocument();
  });

  it("should display error message if an error is caught", () => {
    const ErrorComponent = () => {
      throw new Error("Test Error");
    };

    render(
      <ErrorBoundary>
        <ErrorComponent />
      </ErrorBoundary>
    );

    expect(screen.getByText("Something went wrong.")).toBeInTheDocument();
    expect(
      screen.getByText("Please try refreshing the page, or contact support.")
    ).toBeInTheDocument();
  });
});
