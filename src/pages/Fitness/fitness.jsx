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
import background from "../../img/inspire.jpg";
import ShowData from "./showData/showData";

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
      <div
        style={{
          minHeight: "100vh",
          backgroundImage: `url(${background})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "53%",
        }}
      >
        {day === "" && (
          <>
            <div
              className="pt-3 pe-3"
              style={{ display: "flex", flexDirection: "row-reverse" }}
            >
              <LogoutIcon
                style={{ color: "black", fontSize: "2rem" }}
                onClick={signOut}
              />
            </div>
            <div style={{ width: "80%", margin: "auto" }}>
              <h1 style={{ textAlign: "center" }}>Welcome, {user.username}</h1>
            </div>

            <SelectDay setDay={setDay}  />
          </>
        )}
        {day === "pull" && (
          <>
            <PullDay setDay={setDay} user={user.username} />
          </>
        )}

        {day === "push" && (
          <>
            <PushDay setDay={setDay} user={user.username} />
          </>
        )}
        {day === "past" && (
          <>
            <ShowData setDay={setDay} user={user}  />
          </>
        )}

        {/* <Button onClick={() => consol("")}>Console</Button>
      <Button onClick={() => setDay("")}>Go Back</Button> */}
      </div>
    </>
  );
};

export default Fitness;

const Title = {};
