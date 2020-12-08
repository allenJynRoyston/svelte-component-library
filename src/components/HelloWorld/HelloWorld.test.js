import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/svelte";
import HelloWorld from "./HelloWorld.svelte";

describe("Hello World component", () => {
  test("should render component correctly (no defaults)", () => {
    const { getByText } = render(HelloWorld);
    expect(getByText("Hello First Last!")).toBeInTheDocument();
  });
  test("should render component correctly", () => {
    const { getByText } = render(HelloWorld, {
      firstname: "Allen",
      lastname: "Royston",
    });
    expect(getByText("Hello Allen Royston!")).toBeInTheDocument();
  });
});
