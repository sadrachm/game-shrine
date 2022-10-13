import { API } from "aws-amplify";
import { useEffect, useState } from "react";
import { listDays, listFitPeople } from "../../../graphql/queries";
import Exercising from "./exercising";
import ChooseExercise from "./chooseExercise";
import { Button, Col, Container, Row } from "react-bootstrap";

let dayId = "";
let people = [];
const allEx = [];
let id = "";

const DayTemplate = ({ ex, setEx }) => {
  function consol() {
    console.log(allEx);
  }
  const [act, setAct] = useState("");
  async function fetch() {
    let x = await API.graphql({
      query: listFitPeople,
    });
    people = x.data.listFitPeople.items;    
    id = people[0].id
  }
  useEffect(() => {
    fetch();
  }, []);

  return (
    <>
      {act === "" && (
        <>
          <ChooseExercise setEx={setEx} ex={ex} setAct={setAct} />
        </>
      )}
      {act !== "" && (
        <>
          <Exercising act={act} id = {id} allEx={allEx} setAct={setAct} dayId={dayId} />
        </>
      )}
      {allEx.map((el) => {
        return (
          <div className="mb-3" style={{ color: "black" }}>
            <h1>{el.act}</h1>
            <h2>Weight: {el.weight}</h2>
            <h2>Reps: {el.rep.join(", ")}</h2>
          </div>
        );
      })}
      <Button className="mt-5" onClick={() => consol()}>
        Console
      </Button>
    </>
  );
};

export default DayTemplate;
