import React, { useState } from "react";
import axios from "axios";
import { Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function AccountRegisterForm() {
  // get user information: email +password
  const [userInformation, setUserInformation] = useState({
    email: "",
    password: "",
  });

  function setUserEmail(event: React.ChangeEvent<HTMLInputElement>) {
    setUserInformation({ ...userInformation, email: event.target.value });
  }

  function setUserPassword(event: React.ChangeEvent<HTMLInputElement>) {
    setUserInformation({ ...userInformation, password: event.target.value });
  }

  const navigate = useNavigate();

  function onClickHandler() {
    const endpoint = "http://localhost:8000/users";

    axios
      .post(endpoint, userInformation)
      .then((res) => {
        if (res.status === 200) {
          // navigate to log in page
          navigate("/login");
        }
        console.log(res.data);
      })
      .catch((error) => console.log(error));
    setUserInformation({ password: "", email: "" });
  }

  return (
    <div>
      <h1> Register form</h1>
      <TextField
        id="standard-basic"
        label="Email"
        variant="standard"
        value={userInformation.email}
        onChange={setUserEmail}
      />
      <TextField
        id="standard-basic"
        label="Password"
        variant="standard"
        value={userInformation.password}
        onChange={setUserPassword}
      />
      <Button onClick={onClickHandler}>Register</Button>
    </div>
  );
}
