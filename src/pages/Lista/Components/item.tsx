import * as React from "react";
import {
  useMotionValue,
  Reorder,
  useDragControls,
} from "framer-motion";
import { useRaisedShadow } from "./use-raised-shadows.ts";

interface Props {
  item: string;
}

export const Item = ({ item }: Props) => {
  const y = useMotionValue(0);
  const boxShadow = useRaisedShadow(y);
  const dragControls = useDragControls();

  return (
    <Reorder.Item
      value={item}
      id={item}      
      style={{ boxShadow, y }}
      dragListener={true}
      dragControls={dragControls}
    >
      <span style={{ color: "black" }}>{item}</span>
      {/* <button>Click Me</button> */}
    </Reorder.Item>
  );
};
