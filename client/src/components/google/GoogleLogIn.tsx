import React from "react";
import axios from "axios";

import { GoogleLogin } from "@react-oauth/google";

export default function GoogleLogIn() {
  return (
    <div>
      <h1>GoogleLogIn</h1>
      <GoogleLogin
        onSuccess={async (credentialResponse) => {
          console.log(credentialResponse);
          const url = "http://localhost:8000/users/google-login";
          const credential = credentialResponse.credential;
          let res = await axios.post(url, { id_token: credential });
          if (res.status === 200) {
            console.log(res, "response from BE");
          } else {
            alert("Login false");
          }
        }}
        onError={() => {
          console.log("Login Failed");
        }}
      />
    </div>
  );
}
