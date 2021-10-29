import React from "react";
import classes from "./DeviceForm.module.css";
import useInput from "../../../hooks/use-input";

export default function DeviceForm(props) {
  const IsEmpty = (value) => {
    return value.trim() === "";
  };

  const nameHook = useInput(IsEmpty);
  const serialHook = useInput(IsEmpty);

  const submitHandler = (event) => {
    event.preventDefault();
    props.onSave({
      idBoard: serialHook.value,
      name: nameHook.value,
    });
  };

  return (
    <div>
      {/* <section className={classes.auth}> */}
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="cars">Name</label>
          <input
            value={nameHook.value}
            onChange={nameHook.ChangeHandler}
            onBlur={nameHook.BlurHandler}
            type="text"
            required
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="name">Serial Number</label>
          <input
            value={serialHook.value}
            onChange={serialHook.ChangeHandler}
            onBlur={serialHook.BlurHandler}
            type="text"
            required
          />
        </div>
        <div className={classes.actions}>
          <div className={classes.formFlex}>
            <button className={classes.control} onClick={props.onCancel}>
              Cancel
            </button>
            <button className={classes.control}>Save</button>
          </div>
        </div>
      </form>
      {/* </section> */}
    </div>
  );
}
