import { render } from "@testing-library/react";
import App from "~root/App";

describe("App", () => {
  it("Renders component properly", async (): Promise<void> => {
    const { container } = render(<App />);
    expect(container).toMatchSnapshot();
  });
});
