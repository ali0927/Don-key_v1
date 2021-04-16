import { Handle, Position } from "react-flow-renderer";
import { NodeComp } from "../interfaces";

export const ActionNode: NodeComp = (props) => {
  const { leftColor, rightColor, label } = props.data;
  return (
    <>
      <Handle
        type="target"
        position={Position.Left}
        style={{ background: "#555" }}
      />
      <div
        style={{
          minHeight: 50,
          borderRadius: 4,
          width: 100,
          fontWeight: 500,
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: `linear-gradient(to right, ${leftColor}, ${rightColor})`,
        }}
      >
        {label}
      </div>
      <Handle
        type="source"
        position={Position.Right}
        style={{ background: "#555" }}
      />
    </>
  );
};
