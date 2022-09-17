import { Button, Col, Container, Row } from "react-bootstrap";
import { deleteProductos } from "../../../graphql/mutations";
import { API } from "aws-amplify";
import DeleteIcon from '@mui/icons-material/Delete';

const Card = (props) => {
  async function remove() {
    const x = props.list.filter((el) => {
      return el.id !== props.id;
    });
    props.setList(x)
    await API.graphql({
        query: deleteProductos,
        variables: { input: {id:props.id} },
      })
    //   .then((data)=> console.log(data));
  }
  return (
    <>
      <Container className="mt-3">
        <Row>
          <Col xs={8}>
            <p style={{color:"black", fontSize:"1.5rem", marginBottom:'0'}}> {props.name}</p>
          </Col>
          <Col>
            <Button variant ="primary" onClick={remove}><DeleteIcon style={{color:"white"}}/></Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Card;
