import React ,{useContext}from "react";
import classes from "./EditAlertForm.module.css";
import useInput from "../../../hooks/use-input";
import AuthContext from "../../../store/auth-context";

export default function EditAlertForm({ alert, onCancel, onSave }) {
  const isSchedule = alert.type.toLowerCase() === "schedule" ? true : false;
  const authCtx = useContext(AuthContext);
  const currentUser= authCtx.currentUser;
  

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

  let startString = "";
  let endString = "";
  if (alert.type.toLowerCase() === "schedule") {
    startString = `${alert.range.start.hour}:${alert.range.start.minute}`;
    endString = `${alert.range.end.hour}:${alert.range.end.minute}`;
  }

  // const nameHook = useInput(IsEmpty);
  const limitHook = useInput(biggerThanZero, alert.limit);
  const contactChannelHook = useInput(IsEmpty, alert.contactChannel.type);
  const periodQuantityHook = useInput(biggerThanZero, alert.periodQuantity);
  const periodTypeHook = useInput(IsEmpty, "DAY");
  const startHook = useInput(isStartRange, startString);
  const endHook = useInput(isEndRange, endString);
  let userContact= contactChannelHook.value === 'EMAIL' ? currentUser.email:contactChannelHook.value === 'TELEPHONE' ? currentUser.telephone: currentUser.discord ;
 
  let VolumeAlert = {
    type: "VOLUME",
    idAlert: alert._id,
    limit: limitHook.value,
    periodQuantity: periodQuantityHook.value,
    periodType: periodTypeHook.value,
    contactChannel: { type: "TELEPHONE", contact: "1234567890" },
  };
  let ScheduleAlert = {
    type: "SCHEDULE",
    idAlert: alert._id,
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
    contactChannel: { type: "TELEPHONE", contact: "1234567890" },
  };
  const submitHandler = (event) => {
    event.preventDefault();
    onSave(isSchedule ? ScheduleAlert : VolumeAlert);
  };
  return (
    <div>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="cars">Alert Type:</label>
          <select disabled value={alert.type.toUpperCase()} name="cars">
            <option value="SCHEDULE">Schedule</option>
            <option value="VOLUME">Volume</option>
          </select>
        </div>
        <div className={classes.formFlex}>
          <div className={classes.control}>
            <label htmlFor="name">Alert Name</label>
            <input value={alert.name} disabled />
          </div>
          <div className={classes.control}>
            <label htmlFor="name">Device</label>
            <select disabled>
              <option  value="41333">
                Principal
              </option>
              <option value="41335">Secundario</option>
            </select>
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
                <option value="DAY">
                  Day
                </option>
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
            <button className={classes.control} onClick={onCancel}>
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
