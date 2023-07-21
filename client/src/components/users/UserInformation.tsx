import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../../redux/store";
import { TextField } from "@mui/material";
import axios from "axios";
import { userActions } from "../../redux/slices/user";
import OrderList from "../orders/OrderList";
import { Link } from "react-router-dom";

// fetch user by id
// get id from useParams
export default function UserInformation() {
  const dispatch = useDispatch();
  // get user information from redux
  const userDetail = useSelector(
    (state: RootState) => state.users.userInformation
  );

  //fetch again

  const [formData, setFormData] = useState({
    firstName: userDetail?.firstName,
  });

  const [readOnly, setReadOnly] = useState(true);

  function setUserFirstName(event: React.ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, firstName: event.target.value });
  }

  function onEditHandler() {
    setReadOnly(false);
  }
  function onSubmitHandler() {
    // send new information to backend + token

    // get token from local storage
    // name???
    const token = localStorage.getItem("userToken");

    const url = `http://localhost:8000/users/${userDetail?._id}`;
    axios
      .put(url, formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res, "new data");
        // display new information

        // update information in redux
        dispatch(userActions.setUserData(res.data));
        // way 2:fetch user by id
      })
      .catch((error) => {
        if (error.response.status === 401) {
          // alert user
          alert("pls log in to change your information");
          return;
        }
      });
    setReadOnly(true);
  }
  if (!userDetail) {
    return <div> no data ...</div>;
  }
  return (
    <div>
      <h1>User Information</h1>

      <TextField
        id="standard-basic"
        label="firstName"
        variant="standard"
        value={formData.firstName}
        onChange={setUserFirstName}
        InputProps={{
          readOnly: readOnly,
        }}
      />
      <br></br>
      <button onClick={onEditHandler}>Edit</button>
      <button onClick={onSubmitHandler}>Submit</button>
      <Link to="/order">
        <button> orders</button>
      </Link>
    </div>
  );
}
