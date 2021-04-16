import { Handle, Position } from "react-flow-renderer";
import { preventHTML5DND } from "../helpers";
import { NodeComp } from "../interfaces";

export const ProtocolNode: NodeComp = (props) => {
  return (
    <>
      <Handle
        type="target"
        position={Position.Left}
        style={{ background: "#555" }}
        onConnect={(params) => console.log("handle onConnect", params)}
      />
      <img
        src={props.data.imageUrl}
        draggable={false}
        onDrag={preventHTML5DND}
      />
      <Handle
        type="source"
        position={Position.Right}
        style={{ background: "#555" }}
        onConnect={(params) => console.log("handle onConnect", params)}
      />
    </>
  );
};
