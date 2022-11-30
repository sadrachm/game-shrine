import * as React from "react";
import { useMotionValue, Reorder, useDragControls, motion } from "framer-motion";
import { useRaisedShadow } from "./use-raised-shadows.ts";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "react-bootstrap";

interface Props {
  item: string;
}

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
      initial={{opacity:0}}
      style={{ boxShadow, y }}
      
    >
      <span style={{ color: "black" }}>{item}</span>
      <Button variant="outline-danger" size="sm">
        <DeleteIcon onClick={(ev)=> {
          ev.stopPropagation();
          onRemove()}} />
      </Button>
    </Reorder.Item>
  );
};
