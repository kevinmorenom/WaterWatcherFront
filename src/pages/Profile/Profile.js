import React, { useState, useEffect } from "react";
import ProfileForm from "../../components/ProfileComponents/ProfileForm";

export default function Profile() {
  const [user, setUser] = useState(null);

  async function getUser() {
    try {
      const response = await fetch(
        `https://waterwatcher-back.herokuapp.com/api/users/user`,
        {
          method: "GET",
          headers: {
            authorization: localStorage.getItem("token"),
          },
        }
      );

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Could not get user");
      }
      setUser(data.user);
      return data.user;
    } catch {
      alert("Something went wrong while getting user Data");
    }
  }

  const updateHandler = (user) => {
      console.log(user);

  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div>
      This is profile
      {user && (
        <ProfileForm user={user} updateUser={updateHandler}></ProfileForm>
      )}
    </div>
  );
}
