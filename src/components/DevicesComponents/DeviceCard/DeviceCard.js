import React from 'react';
import classes from "./DeviceCard.module.css";
import {FaEdit} from "react-icons/fa";

export default function DeviceCard() {
    const img_url =
   "https://clipartpngfree.com/save/animals/black_clock_bits_icon_rim.png";
    return (
        <div className={classes.card_wrap}>
      <div className={classes.card}>
        <div className={classes.card_up}>
          <div className={classes.card_mainData}>
            <div className={classes.card_image}>
              <img src={img_url}></img>
            </div>
            <div className={classes.card_title}>
              <p id={classes.name}>{alert.name} </p>
            </div>
            <div className={classes.actions}>
                    <button><FaEdit></FaEdit></button>
            </div>
          </div>
          <div className={classes.card_description}>
            
          </div>
        </div>
      </div>
    </div>
    )
}
