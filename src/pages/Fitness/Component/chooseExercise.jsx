import { FormControlLabel, Switch, useMediaQuery } from "@mui/material";
import "../fitness.css";

const ChooseExercise = ({ setEx, ex, setAct, setEnable, enableCounter }) => {
  const matches = useMediaQuery("(min-width:680px)");
  return (
    <>
      <div className="my-3">
        <FormControlLabel
          labelPlacement="end"
          label="Timer"
          style={{ color: "white" }}
          control={
            <Switch
              checked={enableCounter}
              onChange={(ev) => setEnable(ev.target.checked)}
              inputProps={{ "aria-label": "controlled" }}
            />
          }
        />
      </div>
      {ex.map((el, index) => {
        return (
          <div key={index}>
            {matches && (
              <button
                style={{ width: "40%", fontSize: "1.4rem", margin: "auto" }}
                className="button-82-pushable mb-3"
                onClick={() => {
                  let x = ex;
                  x.splice(index, 1);
                  console.log(x);
                  setEx(x);
                  setAct(el);
                }}
              >
                <span className="button-82-shadow"></span>
                <span className="button-82-edge"></span>
                <span className="button-82-front text">{el}</span>
              </button>
            )}
            {!matches && (
              <button
                style={{ width: "80%", fontSize: "1.2rem", margin: "auto" }}
                className="button-82-pushable mb-3"
                onClick={() => {
                  let x = ex;
                  x.splice(index, 1);
                  console.log(x);
                  setEx(x);
                  setAct(el);
                }}
              >
                <span className="button-82-shadow"></span>
                <span className="button-82-edge"></span>
                <span className="button-82-front text">{el}</span>
              </button>
            )}
          </div>
        );
      })}
    </>
  );
};

export default ChooseExercise;
