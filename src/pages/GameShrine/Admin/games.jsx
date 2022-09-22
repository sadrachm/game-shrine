import { listGames } from "../../../graphql/queries";
import { createGames, deleteGames } from "../../../graphql/mutations";
import { useEffect, useState } from "react";
import { API } from "aws-amplify";
import { Button } from "react-bootstrap";

const initialInput = { title: "", src: "", date: "" };

const Games = () => {
  const [inputs, setInputs] = useState(initialInput);
  const [list, setlists] = useState([]);
  async function createGame() {
    if (!inputs.title || !inputs.src || !inputs.date) return;
    console.log(inputs)
    await API.graphql({
      query: createGames,
      variables: { input: inputs },
    }).then(() => {
      setInputs(initialInput);
    });
  }
  async function fetchGames() {
    await API.graphql({
      query: listGames,
    }).then((data) => setlists(data.data.listGames.items));
  }
  useEffect(() => {
    fetchGames();
  });
  return (
    <>
      <h1 className="mt-3 display-1" style={{ textAlign: "center" }}>
        Upcoming Games
      </h1>
      <div style={{textAlign:"center"}}>
        <input
          style={{ margin: "0 10px" }}
          value={inputs.title}
          placeholder="title"
          onChange={(e) => setInputs({ ...inputs, title: e.target.value })}
        ></input>
        <input
          style={{ margin: "0 10px" }}
          value={inputs.date}
          placeholder="date"
          onChange={(e) => setInputs({ ...inputs, date: e.target.value })}
        ></input>
        <input
          style={{ margin: "0 10px" }}
          value={inputs.src}
          placeholder="source"
          onChange={(e) => setInputs({ ...inputs, src: e.target.value })}
        ></input>
        <Button onClick={createGame}>Create</Button>
      </div>
      {list.map((el) => {
        return <>
        <h1>{el.title}</h1>
        <h1>{el.date}</h1>
        <h1>{el.src}</h1>
        </>
      })}
    </>
  );
};

export default Games;
