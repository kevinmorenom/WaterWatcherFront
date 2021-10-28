import React, { useState } from "react";
import classes from "./NewCard.module.css";
import { FaPlusCircle } from "react-icons/fa";
import Modal from "../Modal/Modal";
import Auth from "../../Auth/Auth";
import AlertForm from "../../AlertComponents/AlertForm/AlertForm";

export default function NewCard(props) {
  const [showModal, setShowModal] = useState(false);

  const addAlertHandler = () => {
    setShowModal(true);
  };

  const dismissModal = () => {
    setShowModal(false);
  };

  return (
    <>
      {showModal && (
        <Modal
          title="New Alert"
          onConfirm={dismissModal}
          onCancel={dismissModal}
        >
          {props.children}
        </Modal>
      )}

      <div className={classes.card_wrap}>
        <div className={classes.card}>
          <div className={classes.card_up}>
            <button onClick={addAlertHandler}>
              <FaPlusCircle size={40}></FaPlusCircle>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
