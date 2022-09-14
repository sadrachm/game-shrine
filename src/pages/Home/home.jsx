import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button } from "@aws-amplify/ui-react";
import { Link } from "react-router-dom";
import { COLORS } from "../../theme/colors";
import "./home.css";
const Home = () => {
  return (
    <>
      <h1 class="title">Sadrach Square</h1>

      <div class="container">
        <div class="homeRow row" >
          <div class="homeCol col" >
            <Link target="_blank" to="/gameshrine">
              <Button class="button1" name="Game Shrine">
                Game Shrine
              </Button>
            </Link>
          </div>
          <div class="homeCol col" >
            <a target="_blank" class="button" href="https://sadrachreviews.herokuapp.com/">
              <Button class="button1" name="Sadrach Reviews">
                Sadrach Reviews
                <p class="small">Takes a while</p>
              </Button>
            </a>
          </div>
        </div>
        <div class="homeRow row">
          <div class="homeCol col" >
            <a target="_blank" href="https://vast-lake-43602.herokuapp.com/ ">
              <Button class="button1" name="Grocery List">
                Grocery List
                <p class="small">Takes a while</p>
              </Button>
            </a>
          </div>
          <div class="homeCol col" >
            <Link target="_blank" to="/portfolio">
              <Button class="button1" name="Portfolio">
                Portfolio
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
