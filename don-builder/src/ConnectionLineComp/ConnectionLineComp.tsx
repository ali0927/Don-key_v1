import { ConnectionLineComponent } from "react-flow-renderer";

export const ConnectionLineComp: ConnectionLineComponent = ({
  sourceX,
  sourceY,
  sourcePosition,
  targetX,
  targetY,
  targetPosition,
  connectionLineType,
  connectionLineStyle,
}) => {
  return (
    <g>
      <path
        fill="none"
        stroke={connectionLineStyle?.color || "#222"}
        strokeWidth={1.5}
        className="animated"
        d={`M${sourceX},${sourceY} C ${sourceX} ${targetY} ${sourceX} ${targetY} ${targetX},${targetY}`}
      />
      <circle
        cx={targetX}
        cy={targetY}
        fill="#fff"
        r={3}
        stroke={connectionLineStyle?.color || "#222"}
        strokeWidth={1.5}
      />
    </g>
  );
};
