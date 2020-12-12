import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render, screen, waitFor } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";

import Form from "./Form.svelte";

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

describe("Form component", () => {
  const onSubmitHandler = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("default: should render a warning 'No form data' if no data is sent.", () => {
    const { getByText } = render(Form);
    expect(getByText("No form data")).toBeInTheDocument();
  });

  describe("render Form components", () => {
    const formData = [
      {
        renderAs: "input",
        label: "Username",
        placeholder: "john smith",
        key: "username",
        value: "johnsmith",
        regex: /^[a-zA-Z]+$/,
        minLength: 3,
        maxLength: 10,
        required: true,
      },
      {
        renderAs: "input",
        type: "password",
        label: "Password",
        key: "password",
        value: "notapassword",
        required: true,
      },
      {
        renderAs: "textarea",
        type: "description",
        label: "Description",
        key: "description",
        value: "I am a text area text.",
        required: true,
      },
      {
        renderAs: "checkbox",
        label: "Checkbox",
        key: "checkbox",
        text: "Do you agree to the terms and agreements?",
        value: true,
      },
      {
        renderAs: "date",
        label: "Date",
        key: "date",
        value: "12-01-1982",
        minDate: "01-01-1950",
        maxDate: "01-01-2020",
        required: true,
      },
      {
        renderAs: "time",
        label: "Time",
        key: "time",
        value: "09:00",
        minTime: "07:00",
        maxTime: "22:00",
        required: true,
      },
    ];

    const onSubmit = jest.fn();

    const { container, getByText, getByLabelText } = render(Form, {
      formData,
      onSubmit,
    });

    beforeEach(async () => {
      await waitFor(async () => {
        await screen.findByTestId("form-container");
      });
    });

    describe("Input", () => {
      afterAll(async () => {
        let label = "Username";
        await changeInputValue({ label, value: "johnsmith" });
        expect(ele).toHaveClass("valid");
      });

      test("... label is rendered", () => {
        expect(getByText("Username")).toBeInTheDocument();
        expect(getByText("Password")).toBeInTheDocument();
      });
      test("... value is correct", () => {
        expect(getByLabelText("Username").value).toBe("johnsmith");
        expect(getByLabelText("Password").value).toBe("notapassword");
      });

      test("... regex is working correctly", async () => {
        let ele = container.querySelector("#username").parentElement;
        let label = "Username";
        await changeInputValue({ label, value: "123" });
        expect(ele).toHaveClass("invalid");
        await changeInputValue({ label, value: "johnsmith" });
        expect(ele).toHaveClass("valid");
        await changeInputValue({ label, value: "!@#" });
        expect(ele).toHaveClass("invalid");
      });

      test("... minLength is working correctly", async () => {
        let ele = container.querySelector("#username").parentElement;
        let label = "Username";
        await changeInputValue({ label, value: "ab" });
        expect(ele).toHaveClass("invalid");
        await changeInputValue({ label, value: "johnsmith" });
        expect(ele).toHaveClass("valid");
      });

      test("... maxLength is working correctly", async () => {
        let ele = container.querySelector("#username").parentElement;
        let label = "Username";
        await changeInputValue({
          label,
          value: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        });
        expect(ele).toHaveClass("invalid");
        await changeInputValue({ label, value: "johnsmith" });
        expect(ele).toHaveClass("valid");
      });

      test("... required is working correctly", async () => {
        let ele = container.querySelector("#username").parentElement;
        let label = "Username";
        await changeInputValue({ label, value: "johnsmith" });
        expect(ele).toHaveClass("valid");
        await changeInputValue({ label, value: "" });
        expect(ele).toHaveClass("invalid");
      });
    });

    describe("Textarea", () => {
      test("... label is rendered", () => {
        expect(getByText("Description")).toBeInTheDocument();
      });
      test("... value is correct", () => {
        expect(getByLabelText("Description").value).toBe(
          "I am a text area text."
        );
      });
    });

    describe("InputDate", () => {
      test("... label is rendered", () => {
        expect(getByText("Date")).toBeInTheDocument();
      });
      test("... value is correct", () => {
        expect(getByLabelText("Date").value).toBe("1982-12-01");
      });
    });

    describe("InputTime", () => {
      test("... label is rendered", () => {
        expect(getByText("Time")).toBeInTheDocument();
      });
      test("... value is correct", () => {
        expect(getByLabelText("Time").value).toBe("09:00");
      });
    });

    describe("InputCheckbox", () => {
      test("... label is rendered", () => {
        expect(getByText("Checkbox")).toBeInTheDocument();
      });
      test("... value is correct", () => {
        expect(getByLabelText("Checkbox").value).toBe("on");
      });
      test("... text is correct", () => {
        expect(
          getByText("Do you agree to the terms and agreements?")
        ).toBeInTheDocument();
      });
    });

    describe("OnSubmit", () => {
      test("... if the form has any errors button should be disabled", async () => {
        await changeInputValue({ label: "Username", value: "123" });
        expect(screen.getByText("Save")).toHaveAttribute("disabled");
      });
      test("... if the form has no errors button should be disabled", async () => {
        await changeInputValue({ label: "Username", value: "johnsmith" });
        expect(screen.getByText("Save")).not.toHaveAttribute("disabled");
      });
      test("... clicking on the button should send the correct props", async () => {
        await changeInputValue({ label: "Username", value: "johnsmith" });
        fireEvent.click(screen.getByText("Save"));
        await waitFor(() => {
          expect(onSubmit).toHaveBeenCalledWith([
            { key: "username", value: "johnsmith" },
            { key: "password", value: "notapassword" },
            { key: "description", value: "I am a text area text." },
            { key: "checkbox", value: true },
            { key: "date", value: "1982-12-01" },
            { key: "time", value: "09:00" },
          ]);
        });
      });
    });
  });
});
