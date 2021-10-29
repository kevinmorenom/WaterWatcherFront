import React, { useEffect, useState } from "react";
import AlertCard from "../../components/AlertComponents/AlertCard/AlertCard";
import AlertForm from "../../components/AlertComponents/AlertForm/AlertForm";
import NewCard from "../../components/Utils/NewCard/NewCard";
import CardContainer from "./../../components/Utils/CardContainer/CardContainer";
import Modal from "../../components/Utils/Modal/Modal";
import EditAlertForm from "../../components/AlertComponents/EditAlertForm/EditAlertForm";
import Error from "../../components/Utils/Error/Error";

export default function Alerts() {
  const [showModal, setShowModal] = useState(false);
  const [editAlert, setEditAlert] = useState(null);
  const [error, setError] = useState(false);

  const showModalHandler = () => {
    setShowModal(true);
  };

  const dismissModal = () => {
    setShowModal(false);
  };

  const showEditModal = (alertID) => {
    setEditAlert(alertID);
  };

  const dismissEditModal = () => {
    setEditAlert(null);
  };

  const [alerts, setAlerts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function getUserAlerts() {
    try {
      const response = await fetch(
        `https://waterwatcher-back.herokuapp.com/api/alerts`,
        {
          method: "GET",
          headers: {
            authorization: localStorage.getItem("token"),
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Could not get alerts.");
      }
      setAlerts(data.alerts);
      setTimeout(() => {
        setIsLoading(false);
      }, 200);
    } catch {
      console.log("Error");
      alert("Something went wrong");
      setError(true);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getUserAlerts();
  }, []);

  async function postAlert(newAlert) {
    try {
      const response = await fetch(
        `https://waterwatcher-back.herokuapp.com/api/alerts`,
        {
          method: "POST",
          body: JSON.stringify(newAlert),
          headers: {
            authorization: localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Could not post alert");
      }

      getUserAlerts();
      dismissModal();
    } catch {
      alert("Something went wrong");
    }
  }

  const updateVolumeURL =
    "https://waterwatcher-back.herokuapp.com/api/alerts/updateVolume";
  const updateScheduleURL =
    "https://waterwatcher-back.herokuapp.com/api/alerts/updateSchedule";

  async function putAlert(editedAlert) {

    let updateURL =
      editedAlert.type === "VOLUME" ? updateVolumeURL : updateScheduleURL;

      try{

      } catch{
        
      }
    const response = await fetch(updateURL, {
      method: "PUT",
      body: JSON.stringify(editedAlert),
      headers: {
        authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Could not edit alert");
    }

    getUserAlerts();
    dismissEditModal();
  }

  async function deleteAlert(idAlert) {
    try {
      const response = await fetch(
        `https://waterwatcher-back.herokuapp.com/api/alerts/${idAlert}`,
        {
          method: "DELETE",
          headers: {
            authorization: localStorage.getItem("token"),
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Could not DELETE alert");
      }

      getUserAlerts();
      dismissModal();
    } catch {
      alert("Something went wrong");
    }
  }

  return (
    <>
      {error && <Error></Error>}
      {!error && showModal && (
        <Modal title="New Alert" onConfirm={postAlert} onCancel={dismissModal}>
          <AlertForm onCancel={dismissModal} onSave={postAlert}></AlertForm>
        </Modal>
      )}
      {!error && editAlert && (
        <Modal
          title="Edit Alert"
          onConfirm={putAlert}
          onCancel={dismissEditModal}
        >
          <EditAlertForm
            alert={editAlert}
            onCancel={dismissEditModal}
            onSave={putAlert}
          ></EditAlertForm>
        </Modal>
      )}
      {!error && (
        <CardContainer
          elements={alerts}
          isLoading={isLoading}
          getElements={getUserAlerts}
        >
          {alerts &&
            alerts.map((alert) => (
              <AlertCard
                key={alert._id}
                alert={alert}
                onEdit={showEditModal}
                onDelete={deleteAlert}
              ></AlertCard>
            ))}
          <NewCard Modaltitle="New Alert" onClick={showModalHandler}></NewCard>
        </CardContainer>
      )}
    </>
  );
}
