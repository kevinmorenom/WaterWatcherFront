import React from "react";
import { useState } from "react";
import classes from "./AlertForm.module.css";
import useInput from "../../../hooks/use-input";

export default function AlertForm(props) {
  const [isSchedule, setSchedule] = useState("SCHEDULE");
  
  const currentUser= props.user;

  console.log(props.devices);
  const IsEmpty = (value) => {
    return false;
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
  const limitHook = useInput(biggerThanZero);
  const contactChannelHook = useInput(IsEmpty,"EMAIL");
  const periodQuantityHook = useInput(biggerThanZero);
  const periodTypeHook = useInput(IsEmpty, "DAY");
  const startHook = useInput(isStartRange);
  const endHook = useInput(isEndRange);
  const deviceHook = useInput(IsEmpty, props.devices ? props.devices[0]:'');

  const selectChangeHandler = (event) => {
    setSchedule((prevState) => !prevState);
  };

  let userContact= contactChannelHook.value === 'EMAIL' ? currentUser.email:contactChannelHook.value === 'TELEPHONE' ? currentUser.telephone: currentUser.discord ;
  let VolumeAlert = {
    idBoard: deviceHook.value,
    name: nameHook.value,
    type: "VOLUME",
    limit: limitHook.value,
    periodQuantity: periodQuantityHook.value,
    periodType: periodTypeHook.value,
    contactChannel: { type: contactChannelHook.value, contact: userContact },
  };
  let ScheduleAlert = {
    idBoard: deviceHook.value,
    name: nameHook.value,
    type: "SCHEDULE",
    limit: limitHook.value,
    range: {
      start: {
        hour: startHook.value.split(":")[0],
        minute: startHook.value.split(":")[1],
      },
      end: {
        hour: endHook.value.split(":")[0],
        minute: endHook.value.split(":")[1],
      },
    },
    contactChannel: { type: contactChannelHook.value, contact: userContact },
  };
  const submitHandler = (event) => {
    event.preventDefault();
    props.onSave(isSchedule ? ScheduleAlert : VolumeAlert);
  };

  console.log(props.devices.length);

  let insideForm = (props.devices.length === 0) ? (<p>Please add a Device first</p>): (
    <form onSubmit={submitHandler}>
    <div className={classes.control}>
      <label htmlFor="cars">Alert Type:</label>
      <select onChange={selectChangeHandler} name="cars">
        <option value="SCHEDULE">Schedule</option>
        <option value="VOLUME">Volume</option>
      </select>
    </div>
    <div className={classes.formFlex}>
      <div className={classes.control}>
        <label htmlFor="name">Alert Name</label>
        <input
          value={nameHook.value}
          onChange={nameHook.ChangeHandler}
          onBlur={nameHook.BlurHandler}
          type="text"
          required
        />
        {nameHook.isInvalid && (
            <p className={classes.errorText}>Name should not be empty**</p>
          )}
      </div>
      <div className={classes.control}>
        <label htmlFor="name">Device</label>
        <select
          value={deviceHook.value}
          onChange={deviceHook.ChangeHandler}
          onBlur={deviceHook.BlurHandler}
          type="text"
          required
        >
          {props.devices &&
            props.devices.map((device) => (
              <option key={device.idBoard}value={device.idBoard}>
                {device.name ? device.name : "Device"}
              </option>
            ))}
        </select>
        {deviceHook.isInvalid && (
            <p className={classes.errorText}>Please select a device**</p>
          )}
      </div>
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
          {periodQuantityHook.isInvalid && (
            <p className={classes.errorText}>Invalid value**</p>
          )}
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
    <div className={classes.formFlex}>
      <div className={classes.control}>
        <label htmlFor="name">Contact Channel</label>
        <select
              value={contactChannelHook.value}
              onChange={contactChannelHook.ChangeHandler}
              onBlur={contactChannelHook.BlurHandler}
              type="text"
              required
            >
            {currentUser.email && <option value="EMAIL">Email</option>}
             { currentUser.telephone && <option value="TELEPHONE">Telephone</option>}
             { currentUser.discord && <option value="DISCORD">Discord</option>}
            </select>
      </div>
      <div className={classes.control}>
        <label htmlFor="name">.</label>
        <input disabled value={userContact}>
           
            </input>
      </div>
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
  )
  return (
    <div>
     {insideForm}
    </div>
  );
}
