import { useEffect, useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  Row,
} from "react-bootstrap";
import "./lista.css";
import { createProductos } from "../../graphql/mutations";
import { listLists, listProductos } from "../../graphql/queries";
import { API } from "aws-amplify";
import Card from "./Components/Card";
import SendIcon from '@mui/icons-material/Send';

//TODO: Sort values returned from db to chronological

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
          x = item;
        }
      })
    );
    fetchItems(x);
  }
  useEffect(() => {
    start();
  }, []);

  function keyDown(ev) {
    if (ev.key === "Enter") {
      createItem()
    }
  }

  async function switchStore(val, storeName) {
    setStore(val);
    const apiData = await API.graphql({ query: listLists });
    const notesfromAPI = apiData.data.listLists.items;
    var x;
    await Promise.all(
      notesfromAPI.map(async (item) => {
        if (item.listName === storeName) {
          setListID(item);
          x = item;
        }
      })
    );
    fetchItems(x);
  }
  function consol() {
    console.log(list);
  }
  async function fetchItems(storeObject) {
    console.log("listID:", storeObject.id);
    const apiData = await API.graphql({ query: listProductos });
    const notesFromAPI = apiData.data.listProductos.items;
    var x = [];
    await Promise.all(
      notesFromAPI.map(async (item) => {
        if (item.productosListId === storeObject.id) {
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
      variables: { input: { name: entry, productosListId: listID.id } },
    }).then((data) => {
      var short = data.data.createProductos;
      var c = {
        name: short.name,
        productosListId: short.productosListId,
        createdAt: short.createdAt,
        updatedAt: short.updatedAt,
        id: short.id,
      };
      setList([...list, c]);
    });

    setEntry("");
  }

  return (
    <div className="listaBody pt-5">
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
            {store === 0 && (
              <Button
                style={{ backgroundColor: "grey", color: "white" }}
                className="listaButtons"
              >
                Costco
              </Button>
            )}
            {store !== 0 && (
              <Button
                onClick={() => switchStore(0, "Costco")}
                className="listaButtons"
              >
                Costco
              </Button>
            )}
          </Col>
          <Col className="listaCol">
            {store === 1 && (
              <Button
                style={{ backgroundColor: "grey", color: "white" }}
                className="listaButtons"
              >
                Super
              </Button>
            )}
            {store !== 1 && (
              <Button
                onClick={() => switchStore(1, "Super")}
                className="listaButtons"
              >
                Super
              </Button>
            )}
          </Col>
          <Col className="listaCol">
            {store === 2 && (
              <Button
                style={{ backgroundColor: "grey", color: "white" }}
                className="listaButtons"
              >
                Otro
              </Button>
            )}
            {store !== 2 && (
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
        {list.map((item) => {
          return (
            <Card list={list} setList={setList} name={item.name} id={item.id} />
          );
        })}
        <Row className="content mt-4 mb-4">
          <Col xs={8} style={{padding:"0"}}>
            <Form.Control
              style={{ width: "85%", margin: "0 auto", fontSize: "1rem" }}
              type="text"
              value={entry}
              onChange={(ev) => setEntry(ev.target.value)}
              onKeyDown={keyDown}
              placeholder="Nuevo Producto"
            />
          </Col>
          <Col>
            <Button onClick={createItem} style={{fontSize: "1rem"}}><SendIcon/></Button>
          </Col>
        </Row>
        {/* <Button onClick={consol}>Console</Button>
        <Button  onClick={createItem}>Create Item</Button> */}

        <div style={{ height: "50px" }}></div>
      </Container>
    </div>
  );
};

export default Lista;

// async function createLista() {
//   // await API.graphql({
//   //   query: createList,
//   //   variables: { input: {listName: "Otro"} },
//   // });
// }
