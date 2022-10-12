import { Button } from "react-bootstrap";
import { useMediaQuery } from "@mui/material";

const ChooseExercise = ({ex, setAct}) => {
  const matches = useMediaQuery("(min-width:680px)");
  return ex.map((el) => {
    return (
      <h1 style={{ textAlign: "center" }}>
        {matches && (
          <Button
            style={{ width: "40%", fontSize: "1.4rem" }}
            onClick={() => {
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
