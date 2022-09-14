import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
// import { Button } from "@aws-amplify/ui-react";
import Button from 'react-bootstrap/Button';
import { useState } from "react";
import { Auth } from "aws-amplify";
import { FormControl } from "react-bootstrap";
import "../gameshrine.css"


const Login = ({ setuser }) => {
  const [username, setusername] = useState("");
  const [password, setpass] = useState("");
  const [show, setShow] = useState(false);
  const [wrong, setWrong] = useState(false);
  const handleClose = () => {
    setusername("");
    setpass("");
    setShow(false);
    setWrong(false);
  };
  function preSignIn() {
    setShow(true);
  }
  async function signIn() {
    try {
      setuser(await Auth.signIn(username, password));
      handleClose();
    } catch (error) {
      console.log(error);
      setWrong(true);
    }
  }
  function handleKey(event) {
    if (event.key == "Enter") {
      return signIn();
    }
  }
  return (
    <>
      <Button variant="light" style={{marginRight:'20px', backgroundColor:"#CCFF00", borderWidth:"0"}} onClick={preSignIn}>
        Login
      </Button>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header  closeButton>
            <Modal.Title class="loginModal">Log In</Modal.Title>
          </Modal.Header>
          <Modal.Body class="loginModal" onKeyDown={handleKey}>
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Username</Form.Label>
                <Form.Control
                  placeholder="example123"
                  autoFocus
                  value={username}
                  onChange={(event) => setusername(event.target.value)}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Password</Form.Label>
                <Form.Control
                  placeholder="*****"
                  type="password"
                  value={password}
                  onChange={(event) => setpass(event.target.value)}
                />
              </Form.Group>
              {wrong && <Form.Label>Incorrect Username or Password</Form.Label>}
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={signIn}>
              Login
            </Button>
          </Modal.Footer>
        </Modal>
    </>
  );
};

export default Login;
