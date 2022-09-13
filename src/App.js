import React, { useEffect, useState } from "react";
import "./App.css";
import { withAuthenticator, Button } from "@aws-amplify/ui-react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Portfolio from "./pages/Portfolio/portfolio";
import Home from "./pages/Home/home";
import GameShrine from "./pages/GameShrine/gameshrine";
import SignOut from "./components/signOut";
import Login from "./components/login";
import { Auth } from "aws-amplify";
// import Test from './pages/test'

function App() {
  const [user, setuser] = useState(null);
  
  // Only admins need an account

  useEffect(() => {
    Auth.currentAuthenticatedUser({
      bypassCache: false, // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
    })
      .then((user) => setuser(user))
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      {/* {!user && <Login setuser={setuser} />}
      {user && <SignOut setuser={setuser} />} */}
      <Router>
        <Routes>
          <Route exact path="/home" element={<Home></Home>}></Route>
          <Route exact path="/gameshrine" element={<GameShrine></GameShrine>}></Route>
          <Route exact path="/portfolio" element={<Portfolio />}></Route>

        </Routes>
      </Router>
    </>
  );
}

export default App;
