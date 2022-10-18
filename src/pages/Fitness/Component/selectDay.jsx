import { useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import "../fitness.css";
const SelectDay = ({ setDay }) => {
  // const [day, setDay] = useState("");

  return (
    <>
      <div style={{ height: "15vh" }}></div>
      <div>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div style={{ flex: "2", alignContent: "space-between" }}>
            <button
              style={{ margin: "auto" }}
              className="button-45"
              role="button"
              onClick={() => {
                setDay("pull");
              }}
            >
              Pull
            </button>
          </div>
          <div style={{ flex: "2", alignContent: "space-between" }}>
            <button
              style={{ margin: "auto" }}
              className="button-45"
              role="button"
              onClick={() => {
                setDay("push");
              }}
            >
              Push
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SelectDay;
