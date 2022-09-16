import { useEffect, useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  Nav,
  Navbar,
  NavDropdown,
  Row,
} from "react-bootstrap";
import "./lista.css";
import { createList, createProductos } from "../../graphql/mutations";
import { listLists, listProductos } from "../../graphql/queries";
import { API } from "aws-amplify";
import Card from "./Components/Card";

const Lista = () => {
  const [store, setStore] = useState(0);
  const [list, setList] = useState([]);
  const [listID, setListID] = useState("");
  const [entry, setEntry] = useState("");

  async function start() {
    const apiData = await API.graphql({ query: listLists });
    const notesfromAPI = apiData.data.listLists.items;
    var x;
    await Promise.all(
      notesfromAPI.map(async (item) => {
        if (item.listName === "Costco") {
          setListID(item);
        }
      })
    );
  }
  useEffect(() => {
    start();
    consol();
  }, []);

  async function switchStore(val, storeName) {
    setStore(val);
    const apiData = await API.graphql({ query: listLists });
    const notesfromAPI = apiData.data.listLists.items;
    var x;
    await Promise.all(
      notesfromAPI.map(async (item) => {
        if (item.listName === storeName) {
          setListID(item);
        }
      })
    );
  }
  async function consol() {
    const apiData = await API.graphql({ query: listProductos });
    const notesFromAPI = apiData.data.listProductos.items;
    var x = [];
    await Promise.all(
      notesFromAPI.map(async (item) => {
        if (item.productosListId === listID.id) {
          x.push(item);
        }
      })
    );
    setList(x);
    console.log(x);
    console.log(entry);
  }
  async function createItem() {
    await API.graphql({
      query: createProductos,
      variables: { input: { name: "Pina", productosListId: listID.id } },
    });
  }

  async function createLista() {
    // await API.graphql({
    //   query: createList,
    //   variables: { input: {listName: "Otro"} },
    // });
  }
  return (
    <div className="listaBody pt-5">
      {/* <h1 class="display-1 pt-5 listaTitle">Lista</h1> */}
      <Container
        className="listaContainer"
        style={{
          width: "80%",
          margin: "0 auto",
          textAlign: "center",
          backgroundColor: "white",
        }}
      >
        <Row className="mx-0">
          <Col className="listaCol">
            {store == 0 && (
              <Button
                style={{ backgroundColor: "grey", color: "white" }}
                className="listaButtons"
              >
                Costco
              </Button>
            )}
            {store != 0 && (
              <Button
                onClick={() => switchStore(0, "Costco")}
                className="listaButtons"
              >
                Costco
              </Button>
            )}
          </Col>
          <Col className="listaCol">
            {store == 1 && (
              <Button
                style={{ backgroundColor: "grey", color: "white" }}
                className="listaButtons"
              >
                Super
              </Button>
            )}
            {store != 1 && (
              <Button
                onClick={() => switchStore(1, "Super")}
                className="listaButtons"
              >
                Super
              </Button>
            )}
          </Col>
          <Col className="listaCol">
            {store == 2 && (
              <Button
                style={{ backgroundColor: "grey", color: "white" }}
                className="listaButtons"
              >
                Otro
              </Button>
            )}
            {store != 2 && (
              <Button
                onClick={() => switchStore(2, "Otro")}
                className="listaButtons"
              >
                Otro
              </Button>
            )}
          </Col>
          {/* <Col className="listaCol">
            <Button className="listaButtons">Super</Button>
          </Col> */}
        </Row>
        <Row className="content mx-0 pt-4">
          <h1>Something</h1>
        </Row>
        <Row className="content mx-0 pt-4">
          <h1>Something</h1>
        </Row>
        <Row className="content mx-0 pt-4">
          <h1>Something</h1>
        </Row>
        <Row className="content mx-0 pt-4">
          <h1>Something</h1>
        </Row>
        <Row className="content mx-0 pt-4">
          <Form.Control
            type="text"
            value={entry}
            onChange={(ev) => setEntry(ev.target.value)}
            placeholder="Nuevo Producto"
          />
        </Row>
        <Button onClick={consol}>Console</Button>
        <Button onClick={createItem}>Create Item</Button>
        
        {list.map((item)=> {
            return <Card name={item.name} />
        })}
      </Container>
    </div>
  );
};

export default Lista;
