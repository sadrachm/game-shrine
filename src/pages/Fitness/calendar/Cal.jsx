import { Button } from "@mui/material";
import { API } from "aws-amplify";
import { useEffect, useState } from "react";
import { Calendar } from "react-calendar";
import {
  dayByDate,
  exerciseByDate,
  listFitPeople,
} from "../../../graphql/queries";

import "./Sample.css";
let userId;
let pullMap = new Map();
let pushMap = new Map();
let exerciseMap = new Map();
let ranOnce = false
export default function Cal({ setDay, user }) {
  const [value, setVal] = useState(new Date());
  const [fin, setFin] = useState(false);
  const [exercise, setExercise] = useState([]);
  function back() {
    setDay("");
  }
  async function getPeople() {
    var people = await API.graphql({
      query: listFitPeople,
      variables: { filter: { name: { eq: user.username } } },
    });
    userId = people.data.listFitPeople.items[0].id;
  }
  function consol() {
    console.log(value);
  }
  async function getDays() {
    let pullDays = await API.graphql({
      query: dayByDate,
      variables: {
        filter: { fitPersonDaysId: { eq: userId } },
        type: "pull",
        sortDirection: "DESC",
      },
    });
    pullDays = pullDays.data.dayByDate.items;
    pullDays.map((el) => {
      let x = new Date(el.createdAt);
      pullMap.set(x.getMonth() + "/" + x.getDate(), el.id);
      if (!ranOnce && exerciseMap.get(x.getMonth())) {
        exerciseMap.set(x.getMonth(), exerciseMap.get(x.getMonth())+1)
      } else {
        exerciseMap.set(x.getMonth(), 1);
      }
    });

    let pushDays = await API.graphql({
      query: dayByDate,
      variables: {
        filter: { fitPersonDaysId: { eq: userId } },
        type: "push",
        sortDirection: "DESC",
      },
    });
    pushDays = pushDays.data.dayByDate.items;
    pushDays.map((el) => {
      let x = new Date(el.createdAt);
      pushMap.set(x.getMonth() + "/" + x.getDate(), el.id);
      if (!ranOnce && exerciseMap.get(x.getMonth())) {
        exerciseMap.set(x.getMonth(), exerciseMap.get(x.getMonth())+1)
      } else {
        exerciseMap.set(x.getMonth(), 1);
      }
    });
    console.log(exerciseMap)
    setFin(true);
    ranOnce = true

  }

  async function helper() {
    await getPeople();
    getDays();
  }
  async function onChange(el) {
    let x = { data: { exerciseByDate: { items: [] } } };
    let count = 0;
    let token = undefined;
    if (pushMap.get(el.getMonth() + "/" + el.getDate())) {
      do {
        count += 1;
        x = await API.graphql({
          query: exerciseByDate,
          variables: {
            filter: {
              dayExercisesId: {
                eq: pushMap.get(el.getMonth() + "/" + el.getDate()),
              },
            },
            type: "push",
            sortDirection: "DESC",
            limit: 600,
            nextToken: token,
          },
        });
        token = x.data.exerciseByDate.nextToken;
      } while (x.data.exerciseByDate.items === [] && count < 3);
    } else if (pullMap.get(el.getMonth() + "/" + el.getDate())) {
      do {
        count += 1;
        x = await API.graphql({
          query: exerciseByDate,
          variables: {
            filter: {
              dayExercisesId: {
                eq: pullMap.get(el.getMonth() + "/" + el.getDate()),
              },
            },
            type: "pull",
            sortDirection: "DESC",
            limit: 600,
            nextToken: token,
          },
        });
        token = x.data.exerciseByDate.nextToken;
      } while (x.data.exerciseByDate.items === [] && count < 3);
    } else {
      x = { data: { exerciseByDate: { items: [] } } };
    }
    x = x.data.exerciseByDate.items;
    setExercise(x);
    setVal(el);
  }

  useEffect(() => {
    helper();
  }, []);
  return (
    <>
      {fin === false && (
        <>
          <h1>Helo This is Your Calendar</h1>{" "}
          <div className=" container">
            <main className=" container ">
              <Calendar />
            </main>
          </div>
        </>
      )}
      {fin !== false && (
        <>
          <h1>Hello This is Your Calendar</h1>{" "}
          <div className=" container">
            <main className=" container ">
              <Calendar
                tileContent={({ date, view }) => {
                  if (view == "month") {
                    let x = date.getMonth() + "/" + date.getDate();
                    if (pushMap.get(x)) {
                      return <p>Push</p>;
                    } else if (pullMap.get(x)) {
                      return <p>Pull</p>;
                    }
                  } else if (view == "year") {
                    console.log(exerciseMap)
                    if (exerciseMap.get(date.getMonth())) {
                      console.log("nani")
                      return <p>{exerciseMap.get(date.getMonth())}</p>
                    }
                    return <p>0</p>;
                  }
                }}
                onChange={onChange}
                value={value}
              />
            </main>
          </div>
          {exercise !== [] &&
            exercise.map((el) => {
              return (
                <div style={{ width: "80%", margin: "auto" }}>
                  <p
                    className="py-2"
                    style={{ border: "1px solid black", margin: 0 }}
                  >
                    {el.act}: {el.rep[0]}, {el.rep[1]}, {el.rep[2]} @{" "}
                    {el.weight} lbs{" "}
                  </p>
                </div>
              );
            })}
          <Button onClick={back}>Go Back</Button>
          <Button onClick={consol}>Console log</Button>
        </>
      )}
    </>
  );
}
