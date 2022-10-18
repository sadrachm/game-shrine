import { useState } from "react";
import { Button } from "react-bootstrap";
import SelectDay from "./Component/selectDay";
import PullDay from "./Component/pullDay";
import PushDay from "./Component/pushDay";
import { API } from "aws-amplify";
import { exerciseByDate } from "../../graphql/queries";
import { Auth } from "aws-amplify";
import LogoutIcon from "@mui/icons-material/Logout";
import styled from "styled-components";
import background from "../../img/background.jpg"

//TODO: Make a simpler way to order exercises to cut time during exercise

const Fitness = ({ user, setuser }) => {
  const [day, setDay] = useState("");

  async function consol() {
    await API.graphql({
      query: exerciseByDate,
      variables: { type: "push", sortDirection: "DESC" },
    }).then((data) => console.log(data.data.exerciseByDate.items));
  }
  async function signOut() {
    try {
      await Auth.signOut();
      setuser(null);
    } catch (error) {
      console.log("error signing out: ", error);
    }
  }

  return (
    <>
      {day === "" && (
        <div style={{height:'100vh', backgroundImage:`url(${background})`, backgroundRepeat:'no-repeat', backgroundSize:"cover", backgroundPosition:"100%"}}>
          <div
            className="pt-3 pe-3"
            style={{ display: "flex", flexDirection: "row-reverse",  }}
          >
            <LogoutIcon
              style={{ color: "black", fontSize: "2rem" }}
              onClick={signOut}
            />
          </div>
          <div style={{width:"80%", margin:"auto"}}>
            <h1 style={{ textAlign: "center" }}>
              Welcome, {user.username}
            </h1>
          </div>

          <SelectDay setDay={setDay} />
        </div>
      )}
      {day === "pull" && (
        <>
          <PullDay setDay={setDay} />
        </>
      )}

      {day === "push" && (
        <>
          <PushDay setDay={setDay} />
        </>
      )}

      {/* <Button onClick={() => consol("")}>Console</Button>
      <Button onClick={() => setDay("")}>Go Back</Button> */}
    </>
  );
};

export default Fitness;

const Title = {};
