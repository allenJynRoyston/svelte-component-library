import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render, screen } from "@testing-library/svelte";

import InputCheckbox from "./InputCheckbox.svelte";

jest.mock("dayjs", () => ({
  __esModule: true, // this property makes it work
  default: jest.requireActual("dayjs"),
  namedExport: jest.fn(),
}));

const toggleCheckbox = async ({ label }) => {
  fireEvent.click(screen.getByLabelText(label));
  await new Promise((r) => setTimeout(r, 1));
};

describe("InputCheckbox component", () => {
  describe(`InputCheckbox - no defaults`, () => {
    let ele;

    beforeEach(() => {
      const props = {
        label: "label",
        key: "key",
        value: false,
      };
      ele = render(InputCheckbox, { ...props });
    });

    test("... label is rendered", () => {
      expect(ele.getByText("label")).toBeInTheDocument();
    });
    test("... value is correct", () => {
      expect(ele.getByLabelText("label")).not.toBeChecked();
    });

    test("... value is not required", async () => {
      let e = ele.container.querySelector("#key").parentElement.parentElement;
      let label = "label";
      expect(e).toHaveClass("valid");
      await toggleCheckbox({ label });
      expect(e).toHaveClass("valid");
      await toggleCheckbox({ label });
      expect(e).toHaveClass("valid");
    });
  });

  describe(`InputCheckbox w/props`, () => {
    let ele;

    beforeEach(() => {
      const props = {
        label: "Checkbox",
        key: "checkbox",
        text: "Do you agree to the terms and agreements?",
        value: true,
        required: true,
      };
      ele = render(InputCheckbox, { ...props });
    });

    test("... label is rendered", () => {
      expect(ele.getByText("Checkbox")).toBeInTheDocument();
    });
    test("... value is correct", () => {
      expect(ele.getByLabelText("Checkbox")).toBeChecked();
    });

    test("... value is required", async () => {
      let e = ele.container.querySelector("#checkbox").parentElement
        .parentElement;
      let label = "Checkbox";
      expect(e).toHaveClass("valid");
      await toggleCheckbox({ label });
      expect(e).toHaveClass("invalid");
      await toggleCheckbox({ label });
      expect(e).toHaveClass("valid");
    });
  });
});
