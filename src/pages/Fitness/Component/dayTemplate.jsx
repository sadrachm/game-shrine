import { API } from "aws-amplify";
import { useEffect, useState } from "react";
import {
  dayByDate,
  exerciseByDate,
  listFitPeople,
} from "../../../graphql/queries";
import Exercising from "./exercising";
import ChooseExercise from "./chooseExercise";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "../fitness.css";

let people = [];
const allEx = [];
let prevEx = {};
let id = "";

const DayTemplate = ({ user, setDay, ex, setEx, type }) => {
  const [dayId, setDayId] = useState("");
  const [act, setAct] = useState("");
  const [enableCounter, setEnable] = useState(true);
  const dayType = type[0].toUpperCase() + type.substring(1);

  async function fetch() {
    let x = await API.graphql({
      query: listFitPeople,
      variables: { filter: { name: { eq: user } } },
    });

    people = x.data.listFitPeople.items;
    console.log("People", people);

    id = people[0].id;
    console.log("ID", id);
    x = await API.graphql({
      query: dayByDate,
      variables: {
        filter: { fitPersonDaysId: { eq: id } },
        type: type,
        sortDirection: "DESC",
        limit:5
      },
    });
    console.log(x);
    x = x.data.dayByDate.items;
    let days;
    x.map((el, index) => {
      // TODO: Check if it has been 24 hours rather than if its the same day
      let today = new Date();
      let maybe = new Date(el.createdAt);
      if (index === 0 && maybe.getDate() === today.getDate()) {
        setDayId(el.id);
      } else if (index >= 1) {
        console.log("Fix dayByDate limit");
      } else {
        days = el;
      }
      return 1
    });

    console.log("prevEx", prevEx)
    console.log("days", days)
    if (days === undefined) {
      ex.map((el) => {
        prevEx[el] = [20, [0, 0, 0]];
        return 1
      });
    }

    let prev = await API.graphql({
      query: exerciseByDate,
      variables: {
        filter: { dayExercisesId: { eq: days.id } },
        type,
        sortDirection: "DESC",
      },
    });

    prev = prev.data.exerciseByDate.items;
    console.log("EX", ex)

    prev.map((el) => {
      if (el.dayExercisesId === days.id) {
        prevEx[el.act] = [el.weight, el.rep];
      }
      return 1
    });
    for (let x in ex) {
      if (!(ex[x] in prevEx)) {
        prevEx[ex[x]] = [20,[0,0,0]]
      }
    }
    console.log("Ex again", prevEx)
  }

  useEffect(() => {
    fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {act === "" && (
        <>
          <ArrowBackIcon
            className="back mt-2 ms-2 "
            style={{ color: "white", position: "absolute", fontSize: "2rem" }}
            onClick={() => {
              setDay("");
            }}
          />
          <h1
            className="pt-4 "
            style={{
              color: "white",
              margin: "auto",
              textAlign: "center",
              fontSize: "2rem",
            }}
          >
            {dayType} Day
          </h1>
          <div style={{textAlign:'center'}}>
            <ChooseExercise
              enableCounter={enableCounter}
              setEnable={setEnable}
              setEx={setEx}
              ex={ex}
              setAct={setAct}
            />
          </div>
            <div>
          {allEx.map((el) => {
            return (
              <div
                className="pb-3"
                style={{ color: "white", textAlign: "center" }}
              >
                <h1 style={{ color: "white" }}>{el.act}</h1>
                <h2 style={{ color: "white" }}>Weight: {el.weight}</h2>
                <h2 style={{ color: "white" }}>Reps: {el.rep.join(", ")}</h2>
              </div>
            );
          })}</div>
        </>
      )}
      {act !== "" && (
        <>
          <Exercising
            setAct={setAct}
            act={act}
            id={id}
            prevEx={prevEx[act]}
            allEx={allEx}
            dayId={dayId}
            ex={ex}
            setEx={setEx}
            setDayId={setDayId}
            type={type}
            enableCounter={enableCounter}
          />
        </>
      )}
    </>
  );
};

export default DayTemplate;
