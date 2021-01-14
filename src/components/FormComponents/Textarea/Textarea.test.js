import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";

import Textarea from "./Textarea.svelte";

const changeInputValue = async ({ label, value }) => {
  userEvent.clear(screen.getByLabelText(label));
  userEvent.type(screen.getByLabelText(label), value);
  expect(screen.getByLabelText(label)).toHaveValue(value);
  await new Promise((r) => setTimeout(r, 1));
};

describe("Textarea component", () => {
  describe(`Textarea - no defaults`, () => {
    let ele;

    beforeEach(() => {
      const props = {
        label: "label",
        key: "key",
      };
      ele = render(Textarea, { ...props });
    });

    test("... label is rendered", () => {
      expect(ele.getByText("label")).toBeInTheDocument();
    });
    test("... value is correct", () => {
      expect(ele.getByLabelText("label").value).toBe("");
    });

    test("... regex is working correctly", async () => {
      let e = ele.container.querySelector("#key").parentElement;
      let label = "label";
      await changeInputValue({ label, value: "123" });
      expect(e).toHaveClass("valid");
      await changeInputValue({ label, value: "johnsmith" });
      expect(e).toHaveClass("valid");
      await changeInputValue({ label, value: "!@#" });
      expect(e).toHaveClass("valid");
    });

    test("... minLength is working correctly", async () => {
      let e = ele.container.querySelector("#key").parentElement;
      let label = "label";
      await changeInputValue({ label, value: "" });
      expect(e).toHaveClass("valid");
      await changeInputValue({ label, value: "johnsmith" });
      expect(e).toHaveClass("valid");
    });

    test("... maxLength is working correctly", async () => {
      let e = ele.container.querySelector("#key").parentElement;
      let label = "label";
      await changeInputValue({
        label,
        value: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      });
      expect(e).toHaveClass("valid");
      await changeInputValue({ label, value: "johnsmith" });
      expect(e).toHaveClass("valid");
    });

    test("... required is working correctly", async () => {
      let e = ele.container.querySelector("#key").parentElement;
      let label = "label";
      await changeInputValue({ label, value: "johnsmith" });
      expect(e).toHaveClass("valid");
      await changeInputValue({ label, value: "" });
      expect(e).toHaveClass("valid");
    });
  });

  describe(`Textarea w/required`, () => {
    let ele;

    beforeEach(() => {
      const props = {
        label: "Description",
        placeholder: "Tell me about yourself.",
        key: "description",
        value: "I love computers.",
        regex: /^[a-zA-Z ]+$/,
        minLength: 3,
        maxLength: 100,
        required: true,
      };
      ele = render(Textarea, { ...props });
    });

    test("... label is rendered", () => {
      expect(ele.getByText("Description")).toBeInTheDocument();
    });
    test("... value is correct", () => {
      expect(ele.getByLabelText("Description").value).toBe("I love computers.");
    });

    test("... regex is working correctly", async () => {
      let e = ele.container.querySelector("#description").parentElement;
      let label = "Description";
      await changeInputValue({ label, value: "123" });
      expect(e).toHaveClass("invalid");
      await changeInputValue({ label, value: "johnsmith" });
      expect(e).toHaveClass("valid");
      await changeInputValue({ label, value: "!@#" });
      expect(e).toHaveClass("invalid");
    });

    test("... minLength is working correctly", async () => {
      let e = ele.container.querySelector("#description").parentElement;
      let label = "Description";
      await changeInputValue({ label, value: "ab" });
      expect(e).toHaveClass("invalid");
      await changeInputValue({ label, value: "johnsmith" });
      expect(e).toHaveClass("valid");
    });

    test("... maxLength is working correctly", async () => {
      let e = ele.container.querySelector("#description").parentElement;
      let label = "Description";
      await changeInputValue({
        label,
        value:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      });
      expect(e).toHaveClass("invalid");
      await changeInputValue({ label, value: "johnsmith" });
      expect(e).toHaveClass("valid");
    });

    test("... required is working correctly", async () => {
      let e = ele.container.querySelector("#description").parentElement;
      let label = "Description";
      await changeInputValue({ label, value: "johnsmith" });
      expect(e).toHaveClass("valid");
      await changeInputValue({ label, value: "" });
      expect(e).toHaveClass("invalid");
    });
  });
});
