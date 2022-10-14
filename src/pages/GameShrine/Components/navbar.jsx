import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Login from "./login";
import SignOut from "./signOut";

function Navhub({ setuser, user }) {
  
  return (
    <Navbar  bg="light"  expand="md">
      <Container>
        <Navbar.Brand href="/" style={{marginLeft:"5%"}}>Game Shrine</Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <div
            style={{
              width: "70%",
              display: "inline",
              marginLeft: "auto",
              // marginRight: "auto",
            }}
          >
            <Nav style={{ justifyContent: "end" }} className="me-auto">
              <Nav.Link href="#Upcoming">Upcoming Games</Nav.Link>
              <Nav.Link href="#Recent">Recent</Nav.Link>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </div>
          <div style={{ marginRight: "5%" }}>
            {!user && <Login setuser={setuser} />}
            {user && <SignOut setuser={setuser} />}
          </div>
          {/* <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form> */}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navhub;
