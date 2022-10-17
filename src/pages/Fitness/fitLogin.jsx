import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
// import Button from "react-bootstrap/Button";
import { useState } from "react";
import { Auth } from "aws-amplify";

// const FitLogin = ({setuser}) => {


//     const [show, setShow] = useState(false);
//     const [wrong, setWrong] = useState(false);
//     const handleClose = () => {
//       setusername("");
//       setpass("");
//       setShow(false);
//       setWrong(false);
//     };
//     function preSignIn() {
//       setShow(true);
//     }


//     return     <>
//     <Button
//       variant="light"
//       style={{
//         marginRight: "20px",
//         borderWidth: "0",
//       }}
//       onClick={preSignIn}
//     >
//       Login
//     </Button>
//     <Modal show={show} onHide={handleClose}>
//       <Modal.Header closeButton>
//         <Modal.Title class="loginModal">Log In</Modal.Title>
//       </Modal.Header>
//       <Modal.Body class="loginModal" onKeyDown={handleKey}>
//         <Form>
//           <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
//             <Form.Label>Username</Form.Label>
//             <Form.Control
//               placeholder="example123"
//               autoFocus
//               value={username}
//               onChange={(event) => setusername(event.target.value)}
//             />
//           </Form.Group>
//           <Form.Group
//             className="mb-3"
//             controlId="exampleForm.ControlTextarea1"
//           >
//             <Form.Label>Password</Form.Label>
//             <Form.Control
//               placeholder="*****"
//               type="password"
//               value={password}
//               onChange={(event) => setpass(event.target.value)}
//             />
//           </Form.Group>
//           {wrong && <Form.Label>Incorrect Username or Password</Form.Label>}
//         </Form>
//       </Modal.Body>
//       <Modal.Footer>
//         <Button variant="secondary" onClick={handleClose}>
//           Close
//         </Button>
//         <Button variant="primary" onClick={signIn}>
//           Login
//         </Button>
//       </Modal.Footer>
//     </Modal>
//   </>
// }




import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function FitLogin({setuser}) {
    // const [username, setusername] = useState("");
    // const [password, setpass] = useState("");
    async function signIn(username, password) {
        console.log(username)
        console.log(password)
        try {
          setuser(await Auth.signIn(username, password));
        //   handleClose();
        } catch (error) {
          console.log(error);
        //   setWrong(true);
        }
      }
      function handleKey(event) {
        if (event.key == "Enter") {
          return signIn();
        }
      }
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const x = data.get('username')
    const y = data.get('password')
    console.log(x)
    signIn(x,y)
    console.log({
      email: data.get('username'),
      password: data.get('password'),
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete=""
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            {/* <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid> */}
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}


// export default FitLogin