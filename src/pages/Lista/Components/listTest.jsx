import "./styles.css";
import * as React from "react";
import { useState } from "react";
import { AnimatePresence, Reorder, motion } from "framer-motion";
import { Item } from "./item.tsx";

export default function ListTest({ items, deleteItem, setItems }) {
  return (
    <div>
      <Reorder.Group axis="y" onReorder={setItems} values={items}>
        <AnimatePresence>
          {items.map((item) => (
            <Item
              key={item}
              onRemove={() => deleteItem(item)}
              item={item}
              setItems={setItems}
            />
          ))}
        </AnimatePresence>
      </Reorder.Group>
    </div>
  );
}
