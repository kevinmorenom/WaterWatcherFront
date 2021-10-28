import React, { useEffect, useState } from "react";
import DeviceForm from "../../components/DevicesComponents/DeviceForm/DeviceForm";
import CardContainer from "../../components/Utils/CardContainer/CardContainer";
import DeviceCard from "../../components/DevicesComponents/DeviceCard/DeviceCard";
import NewCard from "../../components/Utils/NewCard/NewCard";

export default function Devices() {
  const [devices, setDevices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function getUserDevices() {
    const response = await fetch(
      `https://waterwatcher-back.herokuapp.com/api/boards`,
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
    setDevices(data.data);
    setIsLoading(false);
  }

  useEffect(() => {
    getUserDevices();
  }, []);

  
  return <CardContainer elements={devices} isLoading={isLoading}>
     <>
       {devices &&
              devices.map((device) => <DeviceCard device={device}></DeviceCard>)}
              <NewCard onAdd={getUserDevices}>
                <p>hola</p>
            </NewCard>
     </>
  </CardContainer>;
}
