import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button } from "@aws-amplify/ui-react";
import { COLORS } from "../../theme/colors";
import "./home.css";
const Home = () => {
  return (
    <>
        <h1 class = "title">
          Sadrach Square
        </h1>

      <Container style={{ margin: "0", maxWidth: "100%" }}>
        <Row style={{ height: "45vh", width: "100%", padding: "0" }}>
          <Col style={{ textAlign: "center", padding: "0" }}>
            <Button class="button" name="Game Shrine">
              Game Shrine
            </Button>
          </Col>
          <Col style={{ textAlign: "center", padding: "0" }}>
            <Button class="button" name="asd">
              Sadrach Reviews
            </Button>
          </Col>
        </Row>
        <Row style={{ width: "100%", height: "45vh", padding: "0" }}>
          <Col style={{ textAlign: "center", padding: "0" }}>
            <Button class="button" name="asd">
              Grocery List
            </Button>
          </Col>
          <Col style={{ textAlign: "center", padding: "0" }}>
            <Button class="button" name="asd">
              Coachlink Expo
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Home;
