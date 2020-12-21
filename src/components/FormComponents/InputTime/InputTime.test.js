import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";

import InputTime from "./InputTime.svelte";

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

describe("InputTime component", () => {
  describe(`InputTime - no defaults`, () => {
    let ele;

    beforeEach(() => {
      const props = {
        label: "label",
        key: "key",
      };
      ele = render(InputTime, { ...props });
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
      await changeInputValue({ label, value: "10:00" });
      expect(e).toHaveClass("valid");
    });
  });

  describe(`Input w/props`, () => {
    let ele;

    beforeEach(() => {
      const props = {
        label: "Time",
        key: "time",
        value: "09:00",
        minTime: "07:00",
        maxTime: "22:00",
        required: true,
      };
      ele = render(InputTime, { ...props });
    });

    test("... label is rendered", () => {
      expect(ele.getByText("Time")).toBeInTheDocument();
    });
    test("... value is correct", () => {
      expect(ele.getByLabelText("Time").value).toBe("09:00");
    });

    test("... min time works correctly", async () => {
      let e = ele.container.querySelector("#time").parentElement;
      let label = "Time";
      await changeInputValue({ label, value: "06:59" });
      expect(e).toHaveClass("invalid");
      await changeInputValue({ label, value: "07:00" });
      expect(e).toHaveClass("valid");
    });

    test("... max time works correctly", async () => {
      let e = ele.container.querySelector("#time").parentElement;
      let label = "Time";
      await changeInputValue({ label, value: "22:01" });
      expect(e).toHaveClass("invalid");
      await changeInputValue({ label, value: "22:00" });
      expect(e).toHaveClass("valid");
    });

    test("... value is not required", async () => {
      let e = ele.container.querySelector("#time").parentElement;
      let label = "Time";
      await changeInputValue({ label, value: "" });
      expect(e).toHaveClass("invalid");
      await changeInputValue({ label, value: "10:00" });
      expect(e).toHaveClass("valid");
    });
  });
});
