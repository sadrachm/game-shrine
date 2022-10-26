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
let prevDay = {};

const DayTemplate = ({ user, setDay, ex, setEx, type }) => {
  const [dayId, setDayId] = useState("");
  const [act, setAct] = useState("");
  const dayType = type[0].toUpperCase() + type.substring(1);

  async function fetch() {
    let x = await API.graphql({
      query: listFitPeople,
      variables: { filter: { name: { eq: user } } },
    });
    people = x.data.listFitPeople.items;
    console.log("People", people)

    id = people[0].id;
    console.log("ID", id)
    x = await API.graphql({
      query: dayByDate,
      variables: {
        filter: { fitPersonDaysId: { eq: id } },
        type: type,
        sortDirection: "DESC",
        limit: 2,
      },
    });
    console.log("dayByDate", x)
    let days = x.data.dayByDate.items[0];
    console.log("dayByDate", days)

    if (days === undefined) {
      ex.map((el) => {
        prevEx[el] = [20, [0, 0, 0]];
      });
      return;
    }

    let today = new Date();
    let maybe = new Date(days.createdAt);
    if (maybe.getDate() === today.getDate()) {
      setDayId(days.id);
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
    prev.map((el) => {
      if (el.dayExercisesId === days.id) {
        prevEx[el.act] = [el.weight, el.rep];
      }
    });
  }

  useEffect(() => {
    fetch();
    // getPrevExercises();
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
            className="pt-4 mb-5"
            style={{
              color: "white",
              margin: "auto",
              textAlign: "center",
              fontSize: "2rem",
            }}
          >
            {dayType} Day
          </h1>
          <ChooseExercise setEx={setEx} ex={ex} setAct={setAct} />

          {allEx.map((el) => {
            return (
              <div
                className="mb-3 mt-4"
                style={{ color: "white", textAlign: "center" }}
              >
                <h1 style={{ color: "white" }}>{el.act}</h1>
                <h2>Weight: {el.weight}</h2>
                <h2>Reps: {el.rep.join(", ")}</h2>
              </div>
            );
          })}
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
            setDayId={setDayId}
            type={type}
          />
        </>
      )}
    </>
  );
};

export default DayTemplate;
