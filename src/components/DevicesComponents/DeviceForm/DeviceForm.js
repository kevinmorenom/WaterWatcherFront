import React from "react";
import { useState } from "react";
import classes from "./DeviceForm.module.css";
import useInput from "../../../hooks/use-input";

export default function AlertForm() {
  const [isSchedule, setSchedule] = useState(true);
  const IsEmpty = (value) => {
    return value.trim() === "";
  };

  const isStartRange = (start, end) => {
    return start > end;
  };

  const isEndRange = (start, end) => {
    return end < start;
  };

  const biggerThanZero = (value) => {
    return value < 0;
  };

  const nameHook = useInput(IsEmpty);
  const typeHook = useInput(IsEmpty);
  const limitHook = useInput(biggerThanZero);
  const contactChannelHook = useInput(IsEmpty);
  const periodQuantityHook = useInput(biggerThanZero);
  const periodTypeHook = useInput(IsEmpty);
  const startHook = useInput(isStartRange);
  const endHook = useInput(isEndRange);

  const selectChangeHandler = (event) => {
    setSchedule((prevState) => !prevState);
  };

  const submitHandler = (event) => {
    event.preventDefault();
  };

  return (
    <div>
      {/* <section className={classes.auth}> */}
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label for="cars">Alert Type:</label>
          <select onChange={selectChangeHandler} name="cars">
            <option value="SCHEDULE">Schedule</option>
            <option value="VOLUME">Volume</option>
          </select>
        </div>
        <div className={classes.control}>
          <label htmlFor="name">Alert Name</label>
          <input
            value={nameHook.value}
            onChange={nameHook.ChangeHandler}
            onBlur={nameHook.BlurHandler}
            type="text"
            required
          />
        </div>
        {!isSchedule && (
          <div className={classes.formFlex}>
            <div className={classes.control}>
              <label htmlFor="name">Period</label>
              <input
                value={periodQuantityHook.value}
                onChange={periodQuantityHook.ChangeHandler}
                onBlur={periodQuantityHook.BlurHandler}
                type="number"
                required
              />
            </div>
            <div className={classes.control}>
              <label htmlFor="name">Your Name</label>
              <select
                value={periodTypeHook.value}
                onChange={periodTypeHook.ChangeHandler}
                onBlur={periodTypeHook.BlurHandler}
                type="text"
                required
              >
                <option value="DAY">Day</option>
                <option value="WEEK">Week</option>
                <option value="MONTH">Month</option>
              </select>
            </div>
          </div>
        )}
        {isSchedule && (
          <div className={classes.formFlex}>
            <div className={classes.control}>
              <label htmlFor="name">From</label>
              <input
                value={startHook.value}
                onChange={startHook.ChangeHandler}
                onBlur={startHook.BlurHandler}
                type="time"
                required
              />
            </div>
            <div className={classes.control}>
              <label htmlFor="name">To</label>
              <input
                value={endHook.value}
                onChange={endHook.ChangeHandler}
                onBlur={endHook.BlurHandler}
                type="time"
                required
              />
            </div>
          </div>
        )}
        <div className={classes.control}>
          <label htmlFor="name">Limit</label>
          <input
            value={limitHook.value}
            onChange={limitHook.ChangeHandler}
            onBlur={limitHook.BlurHandler}
            type="number"
            id="number"
            required
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="name">Contact Channel</label>
          <input
            value={contactChannelHook.value}
            onChange={contactChannelHook.ChangeHandler}
            onBlur={contactChannelHook.BlurHandler}
            type="text"
            id="name"
            required
          />
        </div>
      </form>
      {/* </section> */}
    </div>
  );
}
