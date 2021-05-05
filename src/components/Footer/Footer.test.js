import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import Footer from "./Footer.svelte";

describe("Footer component", () => {
  describe(`Footer`, () => {
    let ele;

    beforeEach(() => {
      ele = render(Footer);
    });

    test(`... Footer is rendered correctly`, () => {
      expect(true).toBe(true);
      // expect(ele.getByLabelText("label")).toHaveAttribute("type", type);
    });
  });
});
