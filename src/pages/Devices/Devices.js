import React, { useEffect, useState} from "react";
import DeviceForm from "../../components/DevicesComponents/DeviceForm/DeviceForm";
import CardContainer from "../../components/Utils/CardContainer/CardContainer";
import DeviceCard from "../../components/DevicesComponents/DeviceCard/DeviceCard";
import NewCard from "../../components/Utils/NewCard/NewCard";
import Modal from "../../components/Utils/Modal/Modal";
import Error from "../../components/Utils/Error/Error";

export default function Devices() {
  const [devices, setDevices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(false);


  const showModalHandler = () => {
    setShowModal(true);
  };

  const dismissModal = () => {
    setShowModal(false);
  };

  // const getUserDevices = useCallback(
  //   async function () {
  //     try {
  //       const response = await fetch(
  //         `https://waterwatcher-back.herokuapp.com/api/boards`,
  //         {
  //           method: "GET",
  //           headers: {
  //             authorization: localStorage.getItem("token"),
  //             'Access-Control-Allow-Origin': '*'
  //           },
  //         }
  //       );

  //       const data = await response.json();

  //       if (!response.ok) {
  //         throw new Error(data.message || "Could not get user devices");
  //       }
  //       setDevices(data.data);
  //       authCtx.refreshDevices(data.data);
  //       setTimeout(() => {
  //         setIsLoading(false);
  //       }, 200);
  //     } catch {
  //       setError(true);
  //       setIsLoading(false);
  //     }
  //   },
  //   [authCtx]
  // );

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
      throw new Error(data.message || "Could not get user devices");
    }
    setDevices(data.data);
    setTimeout(() => {
      setIsLoading(false);
    }, 200);
  }

  useEffect(() => {
    async function fetchDevices(){
      const users=  await getUserDevices();
    }
    fetchDevices();
  }, []);

  async function postUserDevice(newDevice) {
    const response = await fetch(
      `https://waterwatcher-back.herokuapp.com/api/boards`,
      {
        method: "POST",
        body: JSON.stringify(newDevice),
        headers: {
          authorization: localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Could not post device");
    }

    getUserDevices();
    dismissModal();
  }

  return (
    <CardContainer elements={devices} isLoading={isLoading}>
      <>
        {error && <Error></Error>}
        {!error && showModal && (
          <Modal
            title="New Device"
            onConfirm={postUserDevice}
            onCancel={dismissModal}
          >
            <DeviceForm
              onCancel={dismissModal}
              onSave={postUserDevice}
            ></DeviceForm>
          </Modal>
        )}
        {!error &&
          devices &&
          devices.map((device) => (
            <DeviceCard key={device._id} device={device}></DeviceCard>
          ))}
        {!error && <NewCard onClick={showModalHandler}></NewCard>}
      </>
    </CardContainer>
  );
}
