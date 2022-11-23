import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import "./lista.css";
import { createProductOrder, createProductos, updateProductOrder } from "../../graphql/mutations";
import { listLists, listProductos } from "../../graphql/queries";
import { API } from "aws-amplify";
import Card from "./Components/Card";
import SendIcon from "@mui/icons-material/Send";
import ListTest from "./Components/listTest";
import { Grid, TextField } from "@mui/material";

//TODO: Sort values returned from db to chronological
var stores = {};
var productIds = {};
var productOrder = {}
var orderProduct = {}

const Lista = () => {
  const [store, setStore] = useState(0);
  const [list, setList] = useState([]);
  const [entry, setEntry] = useState("");
  const [erase, setErase] = useState(false);
  const [items, setItems] = useState([]);
  const [ogItems, setOgItems] = useState([]);

  async function start() {
    const apiData = await API.graphql({ query: listLists });
    const notesfromAPI = apiData.data.listLists.items;
    var x;
    notesfromAPI.map((item) => {
      stores[item.listName] = item.id;
      if (item.listName === "Costco") {
        setStore("Costco");
        x = item;
      }
    });
    console.log("X", x)
    fetchItems(x.id);
  }

  useEffect(() => {
    start();
  }, []);

  useEffect(()=> {
    fetchItems(stores[store])
  }, [store])

  // function keyDown(ev) {
  //   if (ev.key === "Enter") {
  //     createItem();
  //   }
  // }

  async function fetchItems(storeObject) {
    console.log("listID:", storeObject);
    const apiData = await API.graphql({
      query: listProductos,
      variables: { filter: { productosListId: { eq: storeObject } } },
    });
    const products = apiData.data.listProductos.items;
    console.log("Products", products);
    var x = [];
    var y = [];
    products.map((el) => {
      x.push(el.name);
      y.push(el.name);
      productIds[el.name] = el.id;
      productOrder[el.order] = el.name
      orderProduct[el.name] = el.order
    });
    setItems(x);
    setOgItems(y);
  }

  async function createItem() {
    await API.graphql({
      query: updateProductOrder,
      variables: {
        input: { name: entry, productosListId: stores[store], order: items.length },
      },
    }).then((data) => {
      var short = data.data.createProductos;
      productIds[short.name] = short.id;
      setItems([...items, short.name]);
      setOgItems([...ogItems, short.name]);
    });

    setEntry("");
  }

  async function something() {
    console.log("ProductOrder", productOrder)
    await API.graphql({
      query: updateProductOrder,
      variables: {
        input: {id:"0a83320d-bec9-4e57-bd80-86b0c0790f51", list: [5,2,4]}
      }
    })
  }

  return (
    <div id="lista">
      <Grid
        container
        direction="row"
        justifyContent="space-evenly"
        alignItems="row"
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        paddingBottom="20px"
      >
        <Grid item xs={4}>
          <div style={{ textAlign: "center" }}>
            {store !== "Costco" && <Button onClick={()=> setStore("Costco")}>Costco</Button>}
            {store === "Costco" && (
              <Button style={{ backgroundColor: "grey" }}>Costco</Button>
            )}
          </div>
        </Grid>
        <Grid item xs={4}>
          <div style={{ textAlign: "center" }}>
            {store !== "Super" && <Button onClick={()=> setStore("Super")}>Super</Button>}
            {store === "Super" && (
              <Button style={{ backgroundColor: "grey" }}>Super</Button>
            )}
          </div>
        </Grid>
        <Grid item xs={4}>
          <div style={{ textAlign: "center" }}>
            {store !== "Otro" && <Button onClick={()=> setStore("Otro")}>Super</Button>}
            {store === "Otro" && (
              <Button style={{ backgroundColor: "grey" }}>Otro</Button>
            )}
          </div>
        </Grid>
      </Grid>
      <Button onClick={something}>Send</Button>
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
};

export default Lista;
