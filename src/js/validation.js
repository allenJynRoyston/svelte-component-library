import dayjs from "dayjs";

//-----------------------------------------------------------------------------
export const validate = (props) => {
  const { required, regex, minLength, maxLength, value } = props;

  let isValid = true;
  let validationErrors = [];

  const check = () => {
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
      validationErrors.push({
        type: "minLength",
        message: "minLength missing.",
      });
      isValid = false;
    }

    if (maxLength && value.length > maxLength) {
      validationErrors.push({
        type: "maxLength",
        message: "maxLength missing.",
      });
      isValid = false;
    }
  };

  // check for validations
  if (required) {
    check();
  }
  if (!required && value.length > 0) {
    check();
  }

  return { isValid, validationErrors };
};
//-----------------------------------------------------------------------------

//-----------------------------------------------------------------------------
export const validateDate = (props) => {
  const { required, value, minDate, maxDate } = props;

  let isValid = true;
  let validationErrors = [];

  const check = () => {
    const testDate = dayjs(value);

    if (required && value.length === 0) {
      validationErrors.push({ type: "required", message: "Required missing." });
      isValid = false;
    }

    if (!dayjs(value).isValid()) {
      validationErrors.push({
        type: "regex",
        message: "Does not match date format.",
      });
      isValid = false;
    }

    if (minDate) {
      const pastDate = dayjs(minDate);
      if (pastDate.isAfter(testDate)) {
        validationErrors.push({
          type: "minDate",
          message: "Needs to be above the minimum date.",
        });
        isValid = false;
      }
    }

    if (maxDate) {
      const futureDate = dayjs(maxDate);
      if (futureDate.isBefore(testDate)) {
        validationErrors.push({
          type: "maxDate",
          message: "Needs to be below the maximum date.",
        });
        isValid = false;
      }
    }
  };

  if (required) {
    check();
  }

  if (!required && value.length > 0) {
    check();
  }

  return { isValid, validationErrors };
};
//-----------------------------------------------------------------------------

//-----------------------------------------------------------------------------
export const validateTime = (props) => {
  const { required, value, minTime, maxTime } = props;
  let isValid = true;
  let validationErrors = [];

  const parseTime = (time) => {
    const hours = time.split(":")[0];
    const minutes = time.split(":")[1];
    return dayjs().hour(hours).minute(minutes);
  };

  const check = () => {
    if (required && value.length === 0) {
      validationErrors.push({ type: "required", message: "Required missing." });
      isValid = false;
    }

    if (value) {
      const inputTime = parseTime(value);

      if (minTime) {
        const min = parseTime(minTime);
        if (min.diff(inputTime, "minutes") > 0) {
          validationErrors.push({
            type: "minTime",
            message: "Needs to be above the minimum time.",
          });
          isValid = false;
        }
      }

      if (maxTime) {
        const max = parseTime(maxTime);
        if (max.diff(inputTime, "minutes") < 0) {
          validationErrors.push({
            type: "maxTime",
            message: "Needs to be below the maximum time.",
          });
          isValid = false;
        }
      }
    }
  };

  if (required) {
    check();
  }
  if (!required && value.length > 0) {
    check();
  }

  return { isValid, validationErrors };
};
//-----------------------------------------------------------------------------

//-----------------------------------------------------------------------------
export const validateCheckbox = (props) => {
  const { required, value } = props;
  let isValid = true;
  let validationErrors = [];

  if (required && !value) {
    isValid = false;
    validationErrors.push({
      type: "required",
      message: "Checkbox required",
    });
  }

  return { isValid, validationErrors };
};
//-----------------------------------------------------------------------------
