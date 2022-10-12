import { Button } from "react-bootstrap";
import { useMediaQuery } from "@mui/material";

const ChooseExercise = ({setEx, ex, setAct}) => {
  const matches = useMediaQuery("(min-width:680px)");
  return ex.map((el, index) => {
    return (
      <h1 style={{ textAlign: "center" }}>
        {matches && (
          <Button
            style={{ width: "40%", fontSize: "1.4rem" }}
            onClick={() => {
              let x = ex
              x.splice(index, 1)
              setEx(x)
              setAct(el);
            }}
          >
            {el}
          </Button>
        )}
        {!matches && (
          <Button
            style={{ width: "80%", fontSize: "1.2rem" }}
            onClick={() => {
              let x = ex.pop(index)
              setAct(el);
            }}
          >
            {el}
          </Button>
        )}
      </h1>
    );
  });
};

export default ChooseExercise;
