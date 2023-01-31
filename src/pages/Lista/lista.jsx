import { useEffect, useState } from "react";
import "./lista.css";
import {
  createProductos,
  deleteProductos,
  updateList,
} from "../../graphql/mutations";
import { listLists, listProductos } from "../../graphql/queries";
import { API } from "aws-amplify";
import ListTest from "./Components/listTest";
import { Grid } from "@mui/material";
import { Button } from "react-bootstrap";
import { motion, AnimatePresence } from "framer-motion";
import { Hint } from "react-autocomplete-hint";
import wordBank from "./wordBank";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

var stores = {};
var productIds = {};
var productOrder = {};
var orderProduct = {};
let order = {};
let maxima = 0;

const Lista = () => {
  const threshold = 50;
  const [scrollDir, setScrollDir] = useState("up");
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
    // Credit: https://www.fabrizioduroni.it/2022/01/02/react-detect-scroll-direction/
    let previousScrollYPosition = window.scrollY;

    const scrolledMoreThanThreshold = (currentScrollYPosition) =>
      Math.abs(currentScrollYPosition - previousScrollYPosition) > threshold;

    const isScrollingUp = (currentScrollYPosition) =>
      currentScrollYPosition > previousScrollYPosition &&
      !(previousScrollYPosition > 0 && currentScrollYPosition === 0) &&
      !(currentScrollYPosition > 0 && previousScrollYPosition === 0);

    const updateScrollDirection = () => {
      const currentScrollYPosition = window.scrollY;

      if (scrolledMoreThanThreshold(currentScrollYPosition)) {
        const newScrollDirection = isScrollingUp(currentScrollYPosition)
          ? "down"
          : "up";
        setScrollDir(newScrollDirection);
        previousScrollYPosition =
          currentScrollYPosition > 0 ? currentScrollYPosition : 0;
      }
    };

    const onScroll = () => window.requestAnimationFrame(updateScrollDirection);

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
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
    let x = [];
    for (var el of order[storeObject]) {
      if (productOrder[el] === undefined) {
        continue;
      }
      x.push(productOrder[el]);
    }
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
    let id = productIds[item];
    let x = items;
    const index = x.indexOf(item);
    if (index > -1) {
      x.splice(index, 1);
    }

    setItems(items.filter((el) => {
      if (el !== item) return el;
    }));
    updateOrder();
    await API.graphql({
      query: deleteProductos,
      variables: {
        input: { id },
      },
    });
  }
  function copy() {
    let x = items.toString(" ");
    navigator.clipboard.writeText(x);
  }

  return (
    <div id="lista">
      <ListTest deleteItem={deleteItem} items={items} setItems={setItems} />

      <div className="plus">
        <Hint options={wordBank}>
          <input
            autoComplete="off"
            autoFocus={true}
            onKeyDown={keyDown}
            value={entry}
            className="productInput"
            onChange={(el) => setEntry(el.target.value)}
          />
        </Hint>

        <Button onClick={createItem} className="mx-3" color="success">
          +
        </Button>
      </div>
      <Button className="mt-4" onClick={updateOrder}>
        Save
      </Button>
      <div style={{ height: "100px" }}></div>
      <AnimatePresence>
        {scrollDir != "down" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              display: "flex",
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-around",
            }}
            className="stores"
          >
            <Grid item xs={4}>
              <div style={{ textAlign: "center" }}>
                <Button
                  onClick={() => store !== "Costco" && setStore("Costco")}
                  className="copyButton"
                  style={{
                    backgroundColor: store !== "Costco" ? "#D2DAFF" : "#B1B2FF",
                    boxShadow: store!=="Costco" ? "4px 5px 5px black" : "none",
                  }}
                >
                  Costco
                </Button>
              </div>
            </Grid>
            <Grid item xs={4}>
              <div style={{ textAlign: "center" }}>
                <Button
                  onClick={() => store !== "Super" && setStore("Super")}
                  className="copyButton"
                  style={{
                    backgroundColor: store !== "Super" ? "#D2DAFF" : "#B1B2FF",
                    boxShadow: store!=="Super" ? "4px 5px 5px black" : "none",
                  }}
                >
                  Super
                </Button>
              </div>
            </Grid>
            <Grid item xs={4}>
              <div style={{ textAlign: "center" }}>
                <Button
                  onClick={() => store !== "Otro" && setStore("Otro")}
                  className="copyButton"
                  style={{
                    backgroundColor: store !== "Otro" ? "#D2DAFF" : "#B1B2FF",
                    boxShadow: store!=="Otro" ? "4px 5px 5px black" : "none",
                  }}
                >
                  Otro
                </Button>
              </div>
            </Grid>
            <Grid>
              <Button className="copyButton" onClick={copy}>
                <ContentCopyIcon />
              </Button>
            </Grid>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Lista;
