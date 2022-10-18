import { Button } from "react-bootstrap";
import { useMediaQuery } from "@mui/material";
import "../fitness.css";

const ChooseExercise = ({ setEx, ex, setAct }) => {
  const matches = useMediaQuery("(min-width:680px)");
  const x = "button-33 mb-3";
  return ex.map((el, index) => {
    return (
      <div style={{ textAlign: "center" }}>
        {matches && (
          <button
            style={{ width: "40%", fontSize: "1.4rem", margin: "auto" }}
            class="button-82-pushable mb-3"
            role="button"
            onClick={() => {
              let x = ex;
              x.splice(index, 1);
              console.log(x);
              setEx(x);
              setAct(el);
            }}
          >
            <span class="button-82-shadow"></span>
            <span class="button-82-edge"></span>
            <span class="button-82-front text">{el}</span>
          </button>
        )}
        {!matches && (
          <button
            style={{ width: "80%", fontSize: "1.2rem", margin: "auto" }}
            class="button-82-pushable mb-3"
            role="button"
            onClick={() => {
              let x = ex;
              x.splice(index, 1);
              console.log(x);
              setEx(x);
              setAct(el);
            }}
          >
            <span class="button-82-shadow"></span>
            <span class="button-82-edge"></span>
            <span class="button-82-front text">{el}</span>
          </button>
        )}
      </div>
    );
  });
};

export default ChooseExercise;
