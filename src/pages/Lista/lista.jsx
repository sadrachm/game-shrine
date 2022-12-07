import { useEffect, useState } from "react";
import "./lista.css";
import { createProductos, deleteProductos, updateList } from "../../graphql/mutations";
import { listLists, listProductos } from "../../graphql/queries";
import { API } from "aws-amplify";
import Card from "./Components/Card";
import SendIcon from "@mui/icons-material/Send";
import ListTest from "./Components/listTest";
import { Grid, TextField } from "@mui/material";
import { Button } from "react-bootstrap";

var stores = {};
var productIds = {};
var productOrder = {};
var orderProduct = {};
let order = {};
let maxima = 0;

const Lista = () => {
  const [store, setStore] = useState(0);
  const [entry, setEntry] = useState("");
  const [items, setItems] = useState([]);

  async function start() {
    let y = await API.graphql({ query: listLists });
    const markets = y.data.listLists.items;
    markets.map((item) => {
      stores[item.listName] = item.id;
      order[item.id] = item.list;
    });
    setStore("Costco");
  }

  useEffect(() => {
    start();
  }, []);

  useEffect(() => {
    if (store === 0) {
      return;
    }
    fetchItems(stores[store]);
  }, [store]);

  function keyDown(ev) {
    if (ev.key === "Enter") {
      createItem();
    }
  }

  async function fetchItems(storeObject) {
    const apiData = await API.graphql({
      query: listProductos,
      variables: { filter: { productosListId: { eq: storeObject } } },
    });
    const products = apiData.data.listProductos.items;
    console.log("PRODUCTS", products)
    orderProduct = {};
    productOrder = {};
    productIds = {};
    products.map((el) => {
      if (el.order > maxima) {
        maxima = el.order;
      }
      productIds[el.name] = el.id;
      productOrder[el.order] = el.name;
      orderProduct[el.name] = el.order;
    });
    console.log("PRODUCT_ORDER", productOrder)
    let x = [];
    for (var el of order[storeObject]) {
      if (productOrder[el] === undefined) {
        continue;
      }
      x.push(productOrder[el]);
    }
    console.log("Items", x)
    console.log("Orders", order)
    setItems(x);
  }

  async function createItem() {
    if (entry === "") {
      return;
    }
    let apiData = await API.graphql({
      query: createProductos,
      variables: {
        input: {
          name: entry,
          productosListId: stores[store],
          order: maxima + 1,
        },
      },
    });
    order[stores[store]].push(maxima + 1);
    await API.graphql({
      query: updateList,
      variables: {
        input: { id: stores[store], list: order[stores[store]] },
      },
    });
    var short = apiData.data.createProductos;
    productIds[short.name] = short.id;
    orderProduct[short.name] = short.order;
    setItems([...items, short.name]);
    maxima += 1;

    setEntry("");
  }

  async function updateOrder() {
    let newItemOrder = [];
    console.log("Update List", items)
    items.map((el) => {
      newItemOrder.push(orderProduct[el]);
    });
    await API.graphql({
      query: updateList,
      variables: {
        input: { id: stores[store], list: newItemOrder },
      },
    });
  }
  async function deleteItem(item) {
    let id = productIds[item]
    console.log(id)
    let x = items
    const index = x.indexOf(item)
    if (index > -1) {
      x.splice(index, 1)
    }
    
    setItems(x)
    console.log(x)
    await API.graphql({
      query: deleteProductos,
      variables: {
        input: {id}
      }
    })
    console.log()
    updateOrder()
    
  }

  return (
    <div id="lista">
      <ListTest deleteItem={deleteItem} items={items} setItems={setItems} />
      <div className="plus">
        <TextField
          id="outlined-basic"
          label="New Produce"
          variant="outlined"
          onKeyDown={keyDown}
          value={entry}
          onChange={(el) => setEntry(el.target.value)}
        />
        <Button onClick={createItem}  className="mx-3" color="success">
          +
        </Button>
      </div>
      <Button className="mt-4" onClick={updateOrder}>Save</Button>
      <div style={{ height: "100px" }}></div>
      <Grid
        container
        direction="row"
        justifyContent="space-evenly"
        alignItems="row"
        rowSpacing={1}
        className="grid"
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        paddingBottom="8px"
      >
        <Grid item xs={4}>
          <div style={{ textAlign: "center" }}>
            {store !== "Costco" && (
              <Button onClick={() => setStore("Costco")}>Costco</Button>
            )}
            {store === "Costco" && (
              <Button style={{ backgroundColor: "grey" }}>Costco</Button>
            )}
          </div>
        </Grid>
        <Grid item xs={4}>
          <div style={{ textAlign: "center" }}>
            {store !== "Super" && (
              <Button onClick={() => setStore("Super")}>Super</Button>
            )}
            {store === "Super" && (
              <Button style={{ backgroundColor: "grey" }}>Super</Button>
            )}
          </div>
        </Grid>
        <Grid item xs={4}>
          <div style={{ textAlign: "center" }}>
            {store !== "Otro" && (
              <Button onClick={() => setStore("Otro")}>Otro</Button>
            )}
            {store === "Otro" && (
              <Button style={{ backgroundColor: "grey" }}>Otro</Button>
            )}
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Lista;



