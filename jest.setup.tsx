import "@testing-library/jest-dom";

jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => {
    return <img alt="Mocked Image" {...props} />;
  },
}));
