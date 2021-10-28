import React, { useEffect, useState } from "react";
import classes from "./CardContainer.module.css";
import Empty from "../Empty/Empty";
import AlertCard from "./../../AlertComponents/AlertCard/AlertCard";
import NewCard from "../NewCard/NewCard";
import AlertForm from "../../AlertComponents/AlertForm/AlertForm";

export default function CardContainer(props) {
 


  return (
    <div className={classes.mainContainer}>
      {props.isLoading && <p>Loading</p>}

      <>
        <div className={classes.cardContainer}>
         {props.children}
        </div>
      </>
    </div>
  );
}
