import { useState } from "react";

const useInput = (validateValue) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  const valueIsValid = validateValue(enteredValue);
  const hasError = !valueIsValid && isTouched;

  const valueChangeHadler = (event) => {
    setEnteredValue(event.target.value);
  };

  const inputBlurHadler = (event) => {
    setIsTouched(true);
  };

  const reset = () => {
    setEnteredValue('')
    setIsTouched(false)
  }
 
  return {
    value: enteredValue,
    isValid: valueIsValid,
    hasError: hasError,
    valueChangeHadler,
    inputBlurHadler,
    reset
  };
};

export default useInput;
