//-----------------------------------------------------------------------------
export const validate = (props) => {
  const { required, regex, minLength, maxLength, value } = props;

  let isValid = true;
  let validationErrors = [];

  // check for validations
  if (required && value.length === 0) {
    validationErrors.push({ type: "required", message: "Required missing." });
    isValid = false;
  }
  if (regex && !regex.test(value)) {
    validationErrors.push({
      type: "regex",
      message: "Value does not match regex value.",
    });
    isValid = false;
  }
  if (minLength && value.length < minLength) {
    validationErrors.push({ type: "minLength", message: "minLength missing." });
    isValid = false;
  }
  if (maxLength && value.length > maxLength) {
    validationErrors.push({ type: "maxLength", message: "maxLength missing." });
    isValid = false;
  }

  return { isValid, validationErrors };
};
//-----------------------------------------------------------------------------
