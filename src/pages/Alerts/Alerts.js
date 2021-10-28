import React, { useEffect, useState } from "react";
import AlertCard from "../../components/AlertComponents/AlertCard/AlertCard";
import AlertForm from "../../components/DevicesComponents/DeviceForm/DeviceForm";
import NewCard from "../../components/Utils/NewCard/NewCard";
import CardContainer from "./../../components/Utils/CardContainer/CardContainer";

export default function Alerts() {
  const [alerts, setAlerts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function getUserAlerts() {
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
    setIsLoading(false);
  }

  useEffect(() => {
    getUserAlerts();
  }, []);

  return (
    <>
      <div>"This is the alert page"</div>
      <CardContainer
        elements={alerts}
        isLoading={isLoading}
        getElements={getUserAlerts}
      >
        {alerts && alerts.map((alert) => <AlertCard alert={alert}></AlertCard>)}
        <NewCard onAdd={getUserAlerts}>
          <AlertForm></AlertForm>
        </NewCard>
      </CardContainer>
    </>
  );
}
