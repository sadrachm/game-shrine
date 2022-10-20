import { API } from "aws-amplify";
import { useEffect, useState } from "react";
import { exerciseByDate, listDays, listFitPeople } from "../../../graphql/queries";
import Exercising from "./exercising";
import ChooseExercise from "./chooseExercise";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "../fitness.css";
import { Button } from "react-bootstrap";

let people = [];
const allEx = [];
let prevEx = {}
let id = "";

const DayTemplate = ({ setDay, ex, setEx, type }) => {
  const [dayId, setDayId] = useState("");
  const [act, setAct] = useState("");
  const dayType = type[0].toUpperCase() + type.substring(1);

  async function getPrevExercises() {
    let prev = await API.graphql({
      query : exerciseByDate,
      variables: { type, limit: 10, sortDirection: "DESC" },
    })
    prev = prev.data.exerciseByDate.items
    console.log(prev)
    let day = prev[0].dayExercisesId
    prev.map((el) => {
      if (el.dayExercisesId === day) {
        prevEx[el.act] = [el.weight, el.rep]
      }
    })
    console.log(prevEx)
  }

  async function fetch() {
    let x = await API.graphql({
      query: listFitPeople,
    });
    people = x.data.listFitPeople.items;
    id = people[0].id;
    x = await API.graphql({
      query: listDays,
    });
    let days = x.data.listDays.items;
    let today = new Date();
    let maybe;
    for (let a in days) {
      maybe = new Date(days[a].createdAt);
      if (maybe.getDate() === today.getDate()) {
        setDayId(days[a].id);
      }
    }
  }

  useEffect(() => {
    fetch();
    getPrevExercises();
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
              <div className="mb-3 mt-4" style={{ color: "white", textAlign:"center" }}>
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
          <ArrowBackIcon
            className="back mt-2 ms-2 "
            style={{ color: "white", position: "absolute", fontSize: "2rem" }}
            onClick={() => {
              setAct("");
            }}
          />
          <Exercising
            act={act}
            id={id}
            prevEx = {prevEx[act]}
            allEx={allEx}
            setAct={setAct}
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
