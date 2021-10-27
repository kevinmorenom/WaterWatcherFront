import { useState } from "react";
const useInput = (validateValue) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [IsTouched, setIsTouched] = useState(false);

  const isInvalid = validateValue(enteredValue) && IsTouched;

  const ChangeHandler = (event) => {
    setEnteredValue(event.target.value);
  };

  const BlurHandler = () => {
    setIsTouched(true);
  };

  const reset= ()=>{
      setEnteredValue('');
      setIsTouched(false);
  }

  return {
    value: enteredValue,
    isInvalid: isInvalid,
    ChangeHandler,
    BlurHandler,
    reset,
  };
};

export default useInput;
