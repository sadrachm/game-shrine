import { Button } from "@mui/material";
import { API } from "aws-amplify";
import { useEffect, useState } from "react";
import { Calendar } from "react-calendar";
import { dayByDate, listFitPeople } from "../../../graphql/queries";

import "./Sample.css";
let userId;
let pullMap = new Map();
let pushMap = new Map();
export default function Cal({ setDay, user }) {
  const [value, onChange] = useState(new Date());
  const [fin, setFin] = useState(false)
  function back() {
    setDay("");
  }
  async function getPeople() {
    var people = await API.graphql({
      query: listFitPeople,
      variables: { filter: { name: { eq: user.username } } },
    });
    userId = people.data.listFitPeople.items[0].id;
    console.log("user", userId);
  }
  function consol() {
    console.log(value);
  }
  async function getDays() {
    console.log(userId);
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
      pullMap.set(x.getMonth() + "/" + x.getDate(), 1);
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
      pushMap.set(x.getMonth() + "/" + x.getDate(), 1);
    });
    setFin(true)
  }

  async function helper() {
    console.log(user);
    await getPeople();
    getDays();
  }

  useEffect(() => {
    helper();
  }, []);
  return (
    <>
    {fin === false && <>
          <h1>Helo This is Your Calendar</h1>{" "}
          <div className=" container">
            <main className=" container ">
              <Calendar/>
            </main>
          </div>
        </>}
      {fin !== false && (
        <>
          <h1>Hello This is Your Calendar</h1>{" "}
          <div className=" container">
            <main className=" container ">
              <Calendar
                tileContent={({ date, view }) => {
                  if (view == "month") {
                    let x = date.getMonth() + "/" + date.getDate();
                    if (pushMap.get(x) === 1) {
                      return <p>Push</p>;
                    } else if (pullMap.get(x) === 1) {
                      return <p>Pull</p>;
                    }
                  }
                }}
                onChange={onChange}
                value={value}
              />
            </main>
          </div>
          <Button onClick={back}>Go Back</Button>
          <Button onClick={consol}>Console log</Button>
        </>
      )}
    </>
  );
}
