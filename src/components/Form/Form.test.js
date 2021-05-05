import "@testing-library/jest-dom/extend-expect";
import { render, screen, waitFor, fireEvent } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import Form from "./Form.svelte";

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

jest.mock("dayjs", () => ({
  __esModule: true, // this property makes it work
  default: jest.requireActual("dayjs"),
  namedExport: jest.fn(),
}));

let formData = [
  {
    renderAs: "input",
    label: "Firstname",
    placeholder: "example: john smith",
    key: "firstname",
    value: "allen",
    regex: /^[a-zA-Z.]+$/,
    minLength: 3,
    maxLength: 25,
    required: true,
    sizing: {
      desktop: 25,
      mobile: 50,
    },
  },
  {
    renderAs: "input",
    label: "Lastname",
    placeholder: "example: john smith",
    key: "lastname",
    value: "royston",
    regex: /^[a-zA-Z.]+$/,
    minLength: 3,
    maxLength: 25,
    required: true,
    sizing: {
      desktop: 25,
      mobile: 50,
    },
  },
  {
    renderAs: "input",
    label: "Username",
    placeholder: "example: john smith",
    key: "username",
    value: "allen.royston",
    regex: /^[a-zA-Z.]+$/,
    minLength: 3,
    maxLength: 25,
    required: true,
    sizing: {
      desktop: 25,
      mobile: 50,
    },
  },
  {
    renderAs: "input",
    type: "password",
    label: "Password",
    key: "password",
    value: "notapassword",
    allowShowToggle: true,
    required: true,
    sizing: {
      desktop: 25,
      mobile: 50,
    },
  },
  {
    renderAs: "input",
    type: "number",
    label: "Age",
    placeholder: "example: john smith",
    key: "age",
    value: "25",
    regex: /^[0-9]+$/,
    minLength: 1,
    maxLength: 3,
    required: true,
    sizing: {
      desktop: 25,
      mobile: 50,
    },
  },
  {
    renderAs: "input",
    label: "City",
    key: "city",
    value: "Reno",
    required: true,
    sizing: {
      desktop: 25,
      mobile: 50,
    },
  },
  {
    renderAs: "textarea",
    label: "Description",
    key: "description",
    value: "I am a developer",
    required: true,
    contentEdit: false,
    minLength: 5,
    sizing: {
      desktop: 100,
      mobile: 100,
    },
  },
  {
    renderAs: "date",
    label: "Date",
    key: "date",
    value: "12-01-1982",
    minDate: "01-01-1950",
    maxDate: "01-01-2020",
    required: true,
    sizing: {
      desktop: 50,
      mobile: 100,
    },
  },
  {
    renderAs: "time",
    label: "Time",
    key: "time",
    value: "09:00",
    minTime: "07:00",
    maxTime: "22:00",
    required: true,
    sizing: {
      desktop: 50,
      mobile: 100,
    },
  },
  {
    renderAs: "select",
    label: "Select",
    key: "select",
    value: 3,
    defaultOption: "Select an option",
    options: [
      { id: 1, title: "option 0" },
      { id: 2, title: "option 1" },
      { id: 3, title: "option 2" },
      { id: 4, title: "option 3" },
    ],
    onInitFilter: (val, options) => {
      return options.find((x) => x.id === val);
    },
    onChangeFilter: (val) => {
      return val && val.id;
    },
    required: true,
  },
  // {
  //   renderAs: "fileinput",
  //   label: "File Input",
  //   key: "fileinput",
  //   value: 2,
  //   accept: "image/png, image/jpeg",
  //   required: true,
  // },
  {
    renderAs: "selectmulti",
    type: "checkbox",
    label: "Multi Select",
    key: "selectmulti",
    value: [1, 3],
    options: [
      { id: 1, title: "option 0" },
      { id: 2, title: "option 1" },
      { id: 3, title: "option 2" },
      { id: 4, title: "option 3" },
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
        return x.id;
      });
    },
    required: true,
  },
  {
    renderAs: "rating",
    type: "star",
    label: "Ratings",
    key: "rating",
    value: 2,
    required: true,
    maxLength: 5,
    slots: {
      selected: "❤",
      notSelected: "♡",
    },
    fixedWidth: "40px",
  },
  {
    renderAs: "checkbox",
    label: "Agree",
    key: "agree",
    text: "Do you agree to the terms and agreements?",
    value: true,
    required: true,
  },
];

const changeInputValue = async ({ label, value }) => {
  userEvent.clear(screen.getByLabelText(label));
  userEvent.type(screen.getByLabelText(label), value);
  expect(screen.getByLabelText(label)).toHaveValue(value);
  await new Promise((r) => setTimeout(r, 1));
};

describe("Form component", () => {
  const waitForForm = () => {
    return new Promise(async (resolve) => {
      await waitFor(() => {
        expect(screen.getByTestId("form-container")).toBeInTheDocument();
        resolve();
      });
    });
  };

  describe(`Form`, () => {
    let ele;
    let onSubmit = jest.fn();

    beforeEach(() => {
      const props = {
        isBusy: false,
        formData,
        onSubmit,
        padding: 0,
        idModifier: null,
        localStorageKey: null,
        clearLocalStorage: true,
      };

      ele = render(Form, { ...props });
    });

    formData.forEach((x) => {
      const { renderAs, label, value } = x;

      test(`input for '${label}' has the correct value: ${value}`, async () => {
        await waitForForm();
        let e;
        switch (renderAs) {
          case "input" || "textarea" || "time" || "checkbox":
            e = ele.getByLabelText(label);
            expect(e.value).toBe(value);
            break;
          case "date":
            e = ele.getByLabelText(label);
            expect(e.value).toBe("1982-12-01");
            break;
          case "select":
            expect(screen.getByTestId("option-0").selected).toBe(false);
            expect(screen.getByTestId("option-1").selected).toBe(false);
            expect(screen.getByTestId("option-2").selected).toBe(true);
            expect(screen.getByTestId("option-3").selected).toBe(false);
            break;
          case "selectmulti":
            expect(screen.getByTestId("selectmulti-option-0").checked).toBe(
              true
            );
            expect(screen.getByTestId("selectmulti-option-1").checked).toBe(
              false
            );
            expect(screen.getByTestId("selectmulti-option-2").checked).toBe(
              true
            );
            expect(screen.getByTestId("selectmulti-option-3").checked).toBe(
              false
            );
            break;
          case "rating":
            expect(screen.getByTestId(`rating-btn-1`)).toHaveTextContent("❤");
            expect(screen.getByTestId(`rating-btn-2`)).toHaveTextContent("❤");
            expect(screen.getByTestId(`rating-btn-3`)).toHaveTextContent("♡");
            expect(screen.getByTestId(`rating-btn-4`)).toHaveTextContent("♡");
            expect(screen.getByTestId(`rating-btn-5`)).toHaveTextContent("♡");
            break;
        }
      });
    });
  });

  describe(`Form validation`, () => {
    let ele;
    let onSubmit = jest.fn();

    beforeEach(() => {
      const props = {
        isBusy: false,
        formData: [
          {
            renderAs: "input",
            label: "Firstname",
            placeholder: "example: john smith",
            key: "firstname",
            value: "",
            regex: /^[a-zA-Z.]+$/,
            minLength: 3,
            maxLength: 25,
            required: true,
            sizing: {
              desktop: 25,
              mobile: 50,
            },
          },
        ],
        onSubmit,
        padding: 0,
        idModifier: null,
        localStorageKey: null,
        clearLocalStorage: true,
      };

      ele = render(Form, { ...props });
    });

    test(`Submit buttons should be disabled, clicking on it should not trigger the onSubmit function`, async () => {
      const button = screen.getByTestId("submit-btn");
      expect(button).toHaveAttribute("disabled");
      fireEvent.click(screen.getByTestId("submit-btn"));
      expect(onSubmit).not.toBeCalled();
    });

    test(`Submit buttons should be disabled, clicking on it should not trigger the onSubmit function`, async () => {
      const button = screen.getByTestId("submit-btn");
      expect(button).toHaveAttribute("disabled");
      fireEvent.click(screen.getByTestId("submit-btn"));
      expect(onSubmit).not.toBeCalled();

      await changeInputValue({ label: "Firstname", value: "allen" });
      fireEvent.click(screen.getByTestId("submit-btn"));
      expect(onSubmit).toHaveBeenLastCalledWith([
        { key: "firstname", value: "allen" },
      ]);
    });
  });

  describe(`Data`, () => {
    let ele;
    let onSubmit = jest.fn();

    test(`If dataset is empty, should return an empty message`, async () => {
      const props = {
        onSubmit,
      };

      ele = render(Form, { ...props });
      await waitForForm();
      expect(screen.getByTestId("empty-form")).toBeInTheDocument();
    });
  });

  describe(`Busy`, () => {
    let ele;
    let onSubmit = jest.fn();

    test(`If busy is false, then busy icon should NOT be visible`, async () => {
      const props = {
        isBusy: false,
        formData,
        onSubmit,
        padding: 0,
        idModifier: null,
        localStorageKey: null,
        clearLocalStorage: true,
      };

      ele = render(Form, { ...props });
      await waitForForm();
      expect(screen.getByTestId("busy")).not.toHaveClass("show");
    });

    test(`If busy is true, then busy icon should be visible`, async () => {
      const props = {
        isBusy: true,
        formData,
        onSubmit,
        padding: 0,
        idModifier: null,
        localStorageKey: null,
        clearLocalStorage: true,
      };

      ele = render(Form, { ...props });
      await waitForForm();
      expect(screen.getByTestId("busy")).toHaveClass("show");
    });
  });

  describe(`OnSubmit`, () => {
    let ele;
    let onSubmit = jest.fn();

    beforeEach(() => {
      const props = {
        isBusy: false,
        formData,
        onSubmit,
        padding: 0,
        idModifier: null,
        localStorageKey: null,
        clearLocalStorage: true,
      };

      ele = render(Form, { ...props });
    });
    test(`Clicking the Submit button should return an array with the correct information in it`, async () => {
      await waitForForm();

      fireEvent.click(screen.getByTestId("submit-btn"));

      await waitFor(() =>
        expect(onSubmit).toHaveBeenLastCalledWith([
          { key: "firstname", value: "allen" },
          { key: "lastname", value: "royston" },
          { key: "username", value: "allen.royston" },
          { key: "password", value: "notapassword" },
          { key: "age", value: "25" },
          { key: "city", value: "Reno" },
          { key: "description", value: "I am a developer" },
          { key: "date", value: "1982-12-01" },
          { key: "time", value: "09:00" },
          { key: "select", value: 3 },
          { key: "selectmulti", value: [1, 3] },
          { key: "rating", value: 2 },
          { key: "agree", value: true },
        ])
      );
    });
  });
});
