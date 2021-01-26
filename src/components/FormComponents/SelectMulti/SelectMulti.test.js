import "@testing-library/jest-dom/extend-expect";
import { render, screen, fireEvent } from "@testing-library/svelte";

import SelectMulti from "./SelectMulti.svelte";

const toggleValue = async (id) => {
  fireEvent.click(screen.getByTestId(`selectmulti-option-${id}`));
  await new Promise((r) => setTimeout(r, 1));
};

describe("SelectMulti component", () => {
  let onChange;

  describe(`SelectMulti - no defaults`, () => {
    let ele;
    onChange = jest.fn();

    beforeEach(() => {
      const props = {
        label: "label",
        key: "key",
      };
      ele = render(SelectMulti, { ...props });
    });

    test("... label is rendered", () => {
      expect(ele.getByText("label")).toBeInTheDocument();
    });
  });

  describe(`SelectMulti w/props`, () => {
    let ele;

    afterEach(() => {
      jest.clearAllMocks;
    });

    beforeEach(() => {
      const props = {
        type: "checkbox",
        key: "selectmulti",
        label: "Select Multi",
        value: [0, 3],
        options: [
          { id: 0, title: "option 1" },
          { id: 1, title: "option 2" },
          { id: 2, title: "option 3" },
          { id: 3, title: "option 4" },
        ],
        onInitFilter: (arr, options) => {
          return options.map((x) => {
            arr.forEach((v) => {
              x._selected = !x._selected ? x.id === v : x._selected;
            });
            return x;
          });
        },
        onChangeFilter: (arr) => {
          return arr.map((x) => {
            delete x.id;
            return x;
          });
        },
        required: true,
      };
      ele = render(SelectMulti, { ...props });
    });

    test("... label is rendered", () => {
      expect(ele.getByText("Select Multi")).toBeInTheDocument();
    });

    it("... it should render all options", () => {
      expect(ele.getByText("option 1")).toBeInTheDocument();
      expect(ele.getByText("option 2")).toBeInTheDocument();
      expect(ele.getByText("option 3")).toBeInTheDocument();
      expect(ele.getByText("option 4")).toBeInTheDocument();
    });

    it("... if selected they should be shown as clicked", () => {
      expect(screen.getByTestId("selectmulti-option-0").checked).toBe(true);
      expect(screen.getByTestId("selectmulti-option-1").checked).toBe(false);
      expect(screen.getByTestId("selectmulti-option-2").checked).toBe(false);
      expect(screen.getByTestId("selectmulti-option-3").checked).toBe(true);
    });

    test("... selecting an option works", async () => {
      await toggleValue(0);
      await toggleValue(1);
      await toggleValue(2);
      await toggleValue(3);
      expect(screen.getByTestId("selectmulti-option-0").checked).toBe(false);
      expect(screen.getByTestId("selectmulti-option-1").checked).toBe(true);
      expect(screen.getByTestId("selectmulti-option-2").checked).toBe(true);
      expect(screen.getByTestId("selectmulti-option-3").checked).toBe(false);
    });

    test("... value is required", async () => {
      await toggleValue(0);
      await toggleValue(3);
      expect(screen.getByTestId("selectmulti-option-0").checked).toBe(false);
      expect(screen.getByTestId("selectmulti-option-1").checked).toBe(false);
      expect(screen.getByTestId("selectmulti-option-2").checked).toBe(false);
      expect(screen.getByTestId("selectmulti-option-3").checked).toBe(false);

      let e = screen.getByTestId("selectmulti-container");
      expect(e).toHaveClass("invalid");

      await toggleValue(3);
      e = screen.getByTestId("selectmulti-container");
      expect(e).toHaveClass("valid");
    });
  });
});
