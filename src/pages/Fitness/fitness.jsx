import { useState } from "react";
import { Button } from "react-bootstrap";
import SelectDay from "./Component/selectDay";
import PullDay from "./Component/pullDay";
import PushDay from "./Component/pushDay";
import { API } from "aws-amplify";
import { exerciseByDate } from "../../graphql/queries";
import { Auth } from "aws-amplify";

//TODO: Make a simpler way to order exercises to cut time during exercise

const Fitness = ({setuser}) => {
  const [day, setDay] = useState("");

  async function consol() {
    let x;
    await API.graphql({
      query: exerciseByDate,
      variables: {  type: "push", sortDirection: "DESC"  },
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

      <Button style={{marginRight:'20px'}} onClick={signOut}>Sign Out</Button>
      {day === "" && <SelectDay setDay={setDay} />}
      {day === "pull" && (
        <>
          <PullDay setDay={setDay} />
        </>
      )}

      {day === "push" && (
        <>
          <PushDay setDay={setDay}/>
        </>
      )}

      {/* <Button onClick={() => consol("")}>Console</Button>
      <Button onClick={() => setDay("")}>Go Back</Button> */}
    </>
  );
};

export default Fitness;
