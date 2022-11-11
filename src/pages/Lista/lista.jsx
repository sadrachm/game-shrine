import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import "./lista.css";
import { createProductos } from "../../graphql/mutations";
import { listLists, listProductos } from "../../graphql/queries";
import { API } from "aws-amplify";
import Card from "./Components/Card";
import SendIcon from "@mui/icons-material/Send";
import ListTest from "./Components/listTest";
import { TextField } from "@mui/material";

//TODO: Sort values returned from db to chronological

const Lista = () => {
  const [store, setStore] = useState(0);
  const [list, setList] = useState([]);
  const [listID, setListID] = useState("");
  const [entry, setEntry] = useState("");
  const [erase, setErase] = useState(false);
  const [items, setItems] = useState([]);
  const [ogItems, setOgItems] = useState([]);
  var stores = {};
  var productIds = {};

  async function start() {
    const apiData = await API.graphql({ query: listLists });
    const notesfromAPI = apiData.data.listLists.items;
    var x;
    notesfromAPI.map((item) => {
      stores[item.listName] = item.id;
      if (item.listName === "Costco") {
        setListID(item);
        x = item;
      }
    });
    console.log("Stores", stores);
    console.log(x);
    fetchItems(x);
  }

  useEffect(() => {
    start();
  }, []);

  function keyDown(ev) {
    if (ev.key === "Enter") {
      createItem();
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
    console.log(entry);
  }

  async function fetchItems(storeObject) {
    console.log("listID:", storeObject.id);
    const apiData = await API.graphql({
      query: listProductos,
      variables: { filter: { productosListId: { eq: storeObject.id } } },
    });
    const products = apiData.data.listProductos.items;
    console.log("Products", products);
    var x = [];
    var y = [];
    var z = {};
    products.map((el) => {
      x.push(el.name);
      y.push(el.name);
      z[el.name] = el.id;
    });
    productIds = z;
    setItems(x);
    setOgItems(y);
  }

  async function createItem() {
    await API.graphql({
      query: createProductos,
      variables: { input: { name: entry, productosListId: listID.id, order:items.length } },
    }).then((data) => {
      var short = data.data.createProductos;
      productIds[short.name] = short.id
      setItems([...items, short.name])
      setOgItems([...ogItems, short.name])
    });

    setEntry("");
  }

  return (
    <div id="lista">
      <ListTest items={items} setItems={setItems} ogItems={ogItems} />
      <div className="mt-3">
        <TextField
          id="outlined-basic"
          label="Outlined"
          variant="outlined"
          value={entry}
          onChange={(el) => setEntry(el.target.value)}
        />
        <Button
          style={{ background: "blue", color: "white" }}
          onClick={createItem}
          variant="contained"
        >
          +
        </Button>
      </div>
    </div>
  );
  // return (
  //   <div className="listaBody pt-5">
  //     <Container
  //       className="listaContainer"
  //       style={{
  //         width: "80%",
  //         margin: "0 auto",
  //         textAlign: "center",
  //         backgroundColor: "white",
  //       }}
  //     >
  //       <Row className="mx-0">
  //         <Col className="listaCol">
  //           {store === 0 && (
  //             <Button
  //               style={{ backgroundColor: "grey", color: "white" }}
  //               className="listaButtons"
  //             >
  //               Costco
  //             </Button>
  //           )}
  //           {store !== 0 && (
  //             <Button
  //               onClick={() => switchStore(0, "Costco")}
  //               className="listaButtons"
  //             >
  //               Costco
  //             </Button>
  //           )}
  //         </Col>
  //         <Col className="listaCol">
  //           {store === 1 && (
  //             <Button
  //               style={{ backgroundColor: "grey", color: "white" }}
  //               className="listaButtons"
  //             >
  //               Super
  //             </Button>
  //           )}
  //           {store !== 1 && (
  //             <Button
  //               onClick={() => switchStore(1, "Super")}
  //               className="listaButtons"
  //             >
  //               Super
  //             </Button>
  //           )}
  //         </Col>
  //         <Col className="listaCol">
  //           {store === 2 && (
  //             <Button
  //               style={{ backgroundColor: "grey", color: "white" }}
  //               className="listaButtons"
  //             >
  //               Otro
  //             </Button>
  //           )}
  //           {store !== 2 && (
  //             <Button
  //               onClick={() => switchStore(2, "Otro")}
  //               className="listaButtons"
  //             >
  //               Otro
  //             </Button>
  //           )}
  //         </Col>
  //         {/* <Col className="listaCol">
  //           <Button className="listaButtons">Super</Button>
  //         </Col> */}
  //       </Row>
  //       <Row>
  //         <Col>
  //           <Form.Check
  //             style={{ color: "black", textAlign: "end", margin:"5px 5% 5px 0" }}
  //             reverse
  //             type="switch"
  //             id="custom-switch"
  //             onClick={() => setErase(!erase)}
  //           />
  //         </Col>
  //       </Row>
  //       {list.map((item) => {
  //         return (
  //           <Card
  //             list={list}
  //             erase={erase}
  //             setList={setList}
  //             name={item.name}
  //             id={item.id}
  //           />
  //         );
  //       })}
  //       <Row className="content mt-4 mb-4">
  //         <Col xs={8} style={{ padding: "0" }}>
  //           <Form.Control
  //             style={{ width: "85%", margin: "0 auto", fontSize: "1rem" }}
  //             type="text"
  //             value={entry}
  //             onChange={(ev) => setEntry(ev.target.value)}
  //             onKeyDown={keyDown}
  //             placeholder="Nuevo Producto"
  //           />
  //         </Col>
  //         <Col>
  //           <Button onClick={createItem} style={{ fontSize: "1rem" }}>
  //             <SendIcon />
  //           </Button>
  //         </Col>
  //       </Row>
  //       {/* <Button onClick={consol}>Console</Button>
  //       <Button  onClick={createItem}>Create Item</Button> */}

  //       <div style={{ height: "50px" }}></div>
  //     </Container>
  //   </div>
  // );
};

export default Lista;

// async function createLista() {
//   // await API.graphql({
//   //   query: createList,
//   //   variables: { input: {listName: "Otro"} },
//   // });
// }
