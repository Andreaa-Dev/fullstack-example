import React, { useState } from "react";
import axios from "axios";
import { Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { userActions } from "../../redux/slices/user";

export default function AccountLogInForm() {
  const [userInformation, setUserInformation] = useState({
    email: "",
    password: "",
  });

  function getUserEmail(event: React.ChangeEvent<HTMLInputElement>) {
    setUserInformation({ ...userInformation, email: event.target.value });
  }

  function getUserPassword(event: React.ChangeEvent<HTMLInputElement>) {
    setUserInformation({ ...userInformation, password: event.target.value });
  }

  const navigate = useNavigate();
  const dispatch = useDispatch();

  function onClickHandler() {
    const endpoint = "http://localhost:8000/users/login";

    axios
      .post(endpoint, userInformation)
      .then((res) => {
        if (res.status === 200) {
          // res.data: object: user information + token

          // save to redux
          dispatch(userActions.setUserData(res.data.userData));

          // save token to local storage
          // cookie: same domain
          // cookie more safe than local storage
          const userToken = res.data.token;
          localStorage.setItem("userToken", userToken);

          // navigate to user information page
          // fetch user by id
          // navigate(`/users/${res.data.userData._id}`);

          navigate(`/user`);
        }
        console.log(res.data);
      })
      .catch((error) => console.log(error));
  }
  return (
    <div>
      <h1> Log In Form </h1>
      <TextField
        id="standard-basic"
        label="Email"
        variant="standard"
        onChange={getUserEmail}
      />
      <TextField
        id="standard-basic"
        label="Password"
        variant="standard"
        onChange={getUserPassword}
      />
      <Button onClick={onClickHandler}>Log in</Button>
    </div>
  );
}
