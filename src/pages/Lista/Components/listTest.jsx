import "./styles.css";
import * as React from "react";
import { useState } from "react";
import { Reorder } from "framer-motion";
import { Item } from "./item.tsx";

const initialItems = ["🍅 Tomato", "🥒 Cucumber", "🧀 Cheese", "🥬 Lettuce"];

export default function ListTest({ items, setItems }) {
  // const [items, setItems] = useState(initialItems);

  console.log(items);

  return (
    <div >
      <Reorder.Group
        axis="y"
        onReorder={setItems}
        values={items}
      >
        {items.map((item) => (
          <Item key={item} item={item} />
        ))}
      </Reorder.Group>
    </div>
  );
}
