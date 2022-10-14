import { useState } from "react";
import { Button } from "react-bootstrap";
import SelectDay from "./Component/selectDay";
import PullDay from "./Component/pullDay";
import PushDay from "./Component/pushDay";
import { API } from "aws-amplify";
import { exerciseByDate } from "../../graphql/queries";

//TODO: Make a simpler way to order exercises to cut time during exercise

const Fitness = () => {
  const [day, setDay] = useState("");

  async function consol() {
    let x;
    await API.graphql({
      query: exerciseByDate,
      variables: {  type: "push", sortDirection: "DESC"  },
    }).then((data) => console.log(data.data.exerciseByDate.items));
  }

  return (
    <>
      {day === "" && <SelectDay setDay={setDay} />}
      {day === "pull" && (
        <>
          <PullDay />
        </>
      )}

      {day === "push" && (
        <>
          <PushDay />
        </>
      )}

      <Button onClick={() => consol("")}>Console</Button>
      <Button onClick={() => setDay("")}>Go Back</Button>
    </>
  );
};

export default Fitness;
