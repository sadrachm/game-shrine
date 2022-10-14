
import { useState } from "react";
import { Button } from "react-bootstrap";
const SelectDay = ({setDay}) => {
  // const [day, setDay] = useState("");

  return (
    <>
      <h1
        className="pt-5"
        style={{
          height: "45vh",
          textAlign: "center",
          flex: "1",
          justifyContent: "center",
        }}
      >
        <Button
          onClick={() => {
            setDay("pull");
          }}
          style={{ fontSize: "100%" }}
        >
          Pull Day
        </Button>
      </h1>
      <h1
        style={{
          height: "45vh",
          textAlign: "center",
          flex: "1",
          justifyContent: "center",
        }}
      >
        <Button
          onClick={() => {
            setDay("push");
          }}
          style={{ fontSize: "100%" }}
        >
          Push Day
        </Button>
      </h1>
    </>
  );
};

export default SelectDay;
