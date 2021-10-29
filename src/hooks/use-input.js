import { useState } from "react";
const useInput = (validateValue,initialValue="") => {
  const [enteredValue, setEnteredValue] = useState(initialValue);
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
