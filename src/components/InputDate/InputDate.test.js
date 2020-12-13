import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";

import InputDate from "./InputDate.svelte";

jest.mock("dayjs", () => ({
  __esModule: true, // this property makes it work
  default: jest.requireActual("dayjs"),
  namedExport: jest.fn(),
}));

const changeInputValue = async ({ label, value }) => {
  userEvent.clear(screen.getByLabelText(label));
  userEvent.type(screen.getByLabelText(label), value);
  expect(screen.getByLabelText(label)).toHaveValue(value);
  await new Promise((r) => setTimeout(r, 1));
};

describe("InputDate component", () => {
  describe(`InputDate - no defaults`, () => {
    let ele;

    beforeEach(() => {
      const props = {
        label: "label",
        key: "key",
      };
      ele = render(InputDate, { ...props });
    });

    test("... label is rendered", () => {
      expect(ele.getByText("label")).toBeInTheDocument();
    });
    test("... value is correct", () => {
      expect(ele.getByLabelText("label").value).toBe("");
    });

    test("... value is not required", async () => {
      let e = ele.container.querySelector("#key").parentElement;
      let label = "label";
      await changeInputValue({ label, value: "" });
      expect(e).toHaveClass("valid");
      await changeInputValue({ label, value: "1982-12-01" });
      expect(e).toHaveClass("valid");
    });
  });

  describe(`InputDate w/props`, () => {
    let ele;

    beforeEach(() => {
      const props = {
        label: "Date",
        key: "date",
        value: "12-01-1982",
        minDate: "01-01-1950",
        maxDate: "01-01-2020",
        required: true,
      };
      ele = render(InputDate, { ...props });
    });

    test("... label is rendered", () => {
      expect(ele.getByText("Date")).toBeInTheDocument();
    });
    test("... value is correct", () => {
      expect(ele.getByLabelText("Date").value).toBe("1982-12-01");
    });

    test("... minDate works correctly", async () => {
      let e = ele.container.querySelector("#date").parentElement;
      let label = "Date";
      await changeInputValue({ label, value: "1949-12-31" });
      expect(e).toHaveClass("invalid");
      await changeInputValue({ label, value: "1950-01-01" });
      expect(e).toHaveClass("valid");
    });

    test("... maxDate works correctly", async () => {
      let e = ele.container.querySelector("#date").parentElement;
      let label = "Date";
      await changeInputValue({ label, value: "2021-01-01" });
      expect(e).toHaveClass("invalid");
      await changeInputValue({ label, value: "2000-12-31" });
      expect(e).toHaveClass("valid");
    });

    test("... value is required", async () => {
      let e = ele.container.querySelector("#date").parentElement;
      let label = "Date";
      await changeInputValue({ label, value: "" });
      expect(e).toHaveClass("invalid");
      await changeInputValue({ label, value: "2017-12-31" });
      expect(e).toHaveClass("valid");
    });
  });
});
