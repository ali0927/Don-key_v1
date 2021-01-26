import { useRef } from "react";
import { actionsMap } from "../../hooks/ActionsMap";
import { uuidv4 } from "../../helpers/helpers";
import { api } from "../../services/api";

const saveStrategy = async (strategy: IStrategy) => {
  const { id, ...rest } = strategy;
  rest.actionCells = rest.actionCells.map((item) => ({...item, vertex: null}));
  rest.protocolCells = rest.protocolCells.map((item) => ({...item, vertex: null}));
  const json = JSON.stringify(rest);

  const result = api.put("/api/v1/strategies", { id, json });
  console.log(result);
};

type IProtocolCell = {
  protocolId: string,
  protocol: string,
  lastProtocol?: string,
  x:number
  y: number;
  w: number;
  h:number;
  isAction: boolean,
  buru: boolean,
  vertex: any | null,
}

type IActionCell = {
  vertex: any |null,
  prevProtocolCellId: string,
  nextProtocolCellId: string,
  y: number,
  isAction: boolean,
  x: number,
}

type IStrategy = {
  id?: string;
  protocolCells: IProtocolCell[];
  actionCells: IActionCell[]
}

// const second = uuidv4();
export const useGraphState = ({ strategy, getGraph, getProtocol }: {strategy: IStrategy, getGraph: any,
   getProtocol: any}) => {
     console.log(strategy);
  const stateRef = useRef(strategy);

  const findProtocolById = (id: string) => {
    const index = stateRef.current.protocolCells.findIndex(
      (item) => item.protocolId === id
    );
    return stateRef.current.protocolCells[index];
  };

  const addProtocolToGraph = (cell: IProtocolCell) => {
    const graph = getGraph();
    const parent = graph.getDefaultParent();
    let newVertex = {};
    const base64 = getProtocol(cell.protocol).base64;

    let data = "";
    // Converts format of data url to cell style value for use in vertex
    let semi = base64.indexOf(";");

    if (semi > 0) {
      data =
        base64.substring(0, semi) +
        base64.substring(base64.indexOf(",", semi + 1));
    }
    graph.getModel().beginUpdate();
    try {
      newVertex = graph.insertVertex(
        parent,
        null,
        "",
        cell.x,
        cell.y,
        cell.w,
        cell.h,
        "resizable=0;shape=image;image=" + data + ";"
      );
    } finally {
      // Updates the display
      graph.getModel().endUpdate();
    }
    cell.vertex = newVertex;
  };

  const addActionToGraph = (cell: IActionCell) => {
    let selectedProtocol = findProtocolById(cell.nextProtocolCellId);

    const previousCell = findProtocolById(cell.prevProtocolCellId);
    console.log(selectedProtocol);
    //get action image
    //@ts-ignore
    let base64 = actionsMap[previousCell.protocol][selectedProtocol.protocol].deposit; // REFACTOR FOR GENERIC ACTIONS

    const graph = getGraph();
    const parent = graph.getDefaultParent();

    let data = "";
    // Converts format of data url to cell style value for use in vertex
    const semi = base64.indexOf(";");

    if (semi > 0) {
      data =
        base64.substring(0, semi) +
        base64.substring(base64.indexOf(",", semi + 1));
    }

    const vertexStyleAction =
      "shape=image;strokeWidth=2;fillColor=#4F4F4F;strokeColor=black;resizable=0;" +
      "gradientColor=#313130;fontColor=white;fontStyle=0;spacingTop=12;image=" +
      data;

    const x = cell.x;
    const y = cell.y;

    const actionVertex = graph.insertVertex(
      parent,
      null,
      "",
      x,
      y,
      105,
      47,
      vertexStyleAction
    );

    //get selected cell edge color
    const protocol = getProtocol(previousCell.protocol);
    const lastCellProtocolEdge = protocol.edgeColor;
    const selectedCellProtocolEdge = getProtocol(selectedProtocol.protocol)
      .edgeColor;

    graph.getModel().beginUpdate();

    try {
      //TODO: SHOULD STORE EDGES
      graph.insertEdge(
        parent,
        null,
        "",
        actionVertex,
        selectedProtocol.vertex,
        "strokeWidth=3;endArrow=block;" +
          "endSize=2;endFill=1;strokeColor=" +
          selectedCellProtocolEdge +
          ";rounded=1;edgeStyle=orthogonalEdgeStyle"
      );
      graph.insertEdge(
        parent,
        null,
        "",
        previousCell.vertex,
        actionVertex,
        "strokeWidth=3;endArrow=block;" +
          "endSize=2;endFill=1;strokeColor=" +
          lastCellProtocolEdge +
          ";rounded=1;edgeStyle=orthogonalEdgeStyle"
      );
    } finally {
      // Updates the display
      graph.getModel().endUpdate();
    }
    cell.vertex = actionVertex;
  };

  const insertProtocol = (name: string) => {
    const lastCell =
      stateRef.current.protocolCells.length > 0
        ? stateRef.current.protocolCells[
            stateRef.current.protocolCells.length - 1
          ]
        : null;
    const newCell = {
      protocolId: uuidv4(),
      protocol: name,
      lastProtocol: lastCell?.protocol,
      x: (lastCell?.x || 0) + 150,
      y: 150,
      w: 110,
      h: 110,
      isAction: false,
      buru: false,
      vertex: null,
    };
    addProtocolToGraph(newCell);
    stateRef.current.protocolCells.push(newCell);
    saveStrategy(stateRef.current);
    return newCell;
  };

  const insertAction = (prevCellId: string, nextCellId: string) => {
    const protocol = findProtocolById(prevCellId);
    const cell = {
      vertex: null,
      prevProtocolCellId: prevCellId,
      nextProtocolCellId: nextCellId,
      y: 350,
      isAction: true,
      x: protocol.x + 80,
    };

    addActionToGraph(cell);
    stateRef.current.actionCells.push(cell);
    saveStrategy(stateRef.current);
    return cell;
  };

  const restoreGraphFromState = () => {
    stateRef.current.protocolCells.forEach((cell) => {
      addProtocolToGraph(cell);
    });

    stateRef.current.actionCells.forEach((cell) => {
      addActionToGraph(cell);
    });
  };

  const getActionCells = () => {
    return stateRef.current.actionCells;
  };
  const getProtocolCells = () => {
    return stateRef.current.protocolCells;
  };
  return {
    restoreGraphFromState,
    insertAction,
    insertProtocol,
    getActionCells,
    getProtocolCells,
  };
};
