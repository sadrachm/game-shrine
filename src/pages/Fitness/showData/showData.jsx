import { API } from "aws-amplify";
import { useEffect, useState } from "react";
import {
  exerciseByDate,
  listDays,
  listFitPeople,
} from "../../../graphql/queries";

let userId = "";
let days = [];
let filter = { or: [] };

const ShowData = ({ user }) => {
  const [data, setData] = useState([]);

  async function helper() {
    API.graphql({
      query: listFitPeople,
      variables: { filter: { name: { eq: user.username } } },
    })
      .then((data) => {
        let x = data.data.listFitPeople.items;
        userId = x[0].id;
      })
      .then(() => {
        API.graphql({
          query: listDays,
          variables: { filter: { fitPersonDaysId: { eq: userId } } },
        }).then((q) => {
          let x = q.data.listDays.items;
          x.map((el) => {
            days.push(el.id);
            filter["or"].push({ dayExercisesId: { eq: el.id } });
          });
        });
      });
  }
  useEffect(() => {
    helper();
  }, []);
  async function something(x) {
    let a = await API.graphql({
      query: exerciseByDate,
      variables: { type: x, filter: filter },
    });
    a = a.data.exerciseByDate.items;
    setData(a)
    console.log(a)
    let dic = {}
    a.map((el) => {
      if (dic[el.act]) {
        dic[el.act] = [...dic[el.act], [el.weight,...el.rep]]
      } else {
        dic[el.act] = [[el.weight,...el.rep]]
      }
    })
    console.log(dic)
    setData(dic)
    //TODO: Iterate through object to view data on screen
    dic.map((el) => {
      console.log(el)
    })
    
  }

  return (
    <>
      {/* <h1 style={{ color: "black" }}>Nani</h1> */}
      <button onClick={() => something("pull")}>Pull</button>
      <button onClick={() => something("push")}>Push</button>

      {/* {data !== [] && data.map((el) => {
        return <>
          <h1>{el}</h1>
          <h1>{data[el][0]}</h1>
          <h1>{data[el].substring(1).join(', ')}</h1>
        </>;
      })} */}

      {/* {data === "pull" && (<>
        <h1>Pull</h1>
      </>)}
      {data === "push" && (<>
        <h1>Push</h1>
      </>)} */}
    </>
  );
};

export default ShowData;
