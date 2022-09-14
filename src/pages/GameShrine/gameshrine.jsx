import React, { useEffect, useState } from "react";
import SignOut from "./Components/signOut";
import Login from "./Components/login";
import Navbar from "./Components/navbar";
import { Auth } from "aws-amplify";


const GameShrine = () => {
  const [user, setuser] = useState(null);
  useEffect(() => {
    Auth.currentAuthenticatedUser({
      bypassCache: false, // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
    })
      .then((user) => setuser(user))
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
    <Navbar setuser={setuser} user={user}></Navbar>

    </>
  );
};

export default GameShrine;
