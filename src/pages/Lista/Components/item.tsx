import * as React from "react";
import { useMotionValue, Reorder, useDragControls, motion } from "framer-motion";
import { useRaisedShadow } from "./use-raised-shadows.ts";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "react-bootstrap";

export const Item = ({ item, setItems, onRemove }) => {
  const y = useMotionValue(0);
  const boxShadow = useRaisedShadow(y);
  const dragControls = useDragControls();


  return (
    <Reorder.Item
      value={item}
      id={item}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      key={item}
      className="ReorderItem"
      initial={{opacity:0}}
      style={{ boxShadow, y, backgroundColor:"#EEF1FF" }}
      
    >
      <div style={{ color: "black" }}>{item}</div>
      <Button variant="outline-danger" size="sm">
        <DeleteIcon onClick={(ev)=> {
          onRemove()
          }} />
      </Button>
    </Reorder.Item>
  );
};
