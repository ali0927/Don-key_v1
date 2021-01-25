/* eslint-disable react-hooks/exhaustive-deps */
import { filter, findIndex } from "lodash";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from "react";
import factory from "mxgraph";
import { useSetRef, useToggle } from "../../hooks";
import { actionsMap } from "../../hooks/ActionsMap";
import { uuidv4 } from "../../helpers/helpers";
const mx = factory({
  mxBasePath: "",
});

function mxVertexToolHandler() {
  mx.mxVertexHandler.apply(this, arguments);
}
mxVertexToolHandler.prototype = new mx.mxVertexHandler();
mxVertexToolHandler.prototype.constructor = mxVertexToolHandler;

mxVertexToolHandler.prototype.domNode = null;

const GraphContext = createContext(null);

const useRerender = () => {
  const item = useToggle();
  return [item[0], item[3]];
};

const first = uuidv4();
// const second = uuidv4();
const useGraphState = ({ getGraph, getProtocol }) => {
  const stateRef = useRef({
    protocolCells: [
      {
        protocolId: first,
        protocol: "BY",
        lastProtocol: null,
        x: 200,
        y: 150,
        w: 110,
        h: 110,
        vertex: null,
      },
      // {
      //   protocolId: second,
      //   protocol: "YFI",
      //   x: 350,
      //   y: 150,
      //   w: 110,
      //   h: 110,
      //   vertex: null,
      // },
    ],
    actionCells: [
      // {
      //   prevProtocolCellId: first,
      //   nextProtocolCellId: second,
      //   y: 350,
      //   x: 280,
      // },
    ],
  });
  const [val, rerender] = useRerender();

  const findProtocolById = (id) => {
    const index = stateRef.current.protocolCells.findIndex(
      (item) => item.protocolId === id
    );
    return stateRef.current.protocolCells[index];
  };

  const addProtocolToGraph = (cell) => {
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

  const addActionToGraph = (cell) => {
    let selectedProtocol = findProtocolById(cell.nextProtocolCellId);

    const previousCell = findProtocolById(cell.prevProtocolCellId);
    console.log(selectedProtocol);
    //get action image
    let base64 =
      actionsMap[previousCell.protocol][selectedProtocol.protocol]
        .deposit; // REFACTOR FOR GENERIC ACTIONS

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

  const insertProtocol = (name) => {
    const lastCell =
      stateRef.current.protocolCells.length > 0
        ? stateRef.current.protocolCells[
            stateRef.current.protocolCells.length - 1
          ]
        : null;
    const newCell = {
      protocolId: uuidv4(),
      protocol: name,
      lastProtocol: lastCell.protocol,
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
    return newCell;
  };

  const insertAction = (prevCellId, nextCellId) => {
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

export const GraphProvider = ({ children, openPanel, protocols }) => {
  const [getSelectedCell, setSelectedCell] = useSetRef({});

  const getProtocol = (name) => {
    const index = findIndex(protocols, (item) => item.name === name);
    if (index === -1) {
      return null;
    }
    return protocols[index];
  };

  const [isActionConfigOpen, openActionBar, hideActionBar] = useToggle();

  const graphRef = useRef(null);
  const divRef = useRef(null);

  const getGraph = useCallback(() => {
    return graphRef.current;
  }, []);
  const {getActionCells, getProtocolCells, insertProtocol, insertAction: insertinGraph,restoreGraphFromState} = useGraphState({getGraph, getProtocol})

  const getActionForCellId = useCallback((cellId) => {
    return filter(getActionCells(), function (n) {
      return n.vertex?.id === cellId;
    })[0];
  }, []);

  const getProtocolForCellId = useCallback((cellId) => {
    return filter(getProtocolCells(), function (n) {
      return n.vertex?.id === cellId;
    })[0];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getProtocolByName = useCallback((protocol) => {
    return filter(getProtocolCells(), function (n) {
      return n.vertex?.id === protocol;
    })[0];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getActionConfigStyle = useCallback(() => {
    if (!isActionConfigOpen) {
      return {};
    }
    const _selectedCell = getSelectedCell();
    if (!_selectedCell) {
      return {};
    }

    const action = getActionForCellId(_selectedCell.id);
    if (!action) {
      return {};
    }
    let left = 0;
    let top = 0;
    console.log(action);
    left = action.x + action.vertex.geometry.width / 2 + 5;
    top = action.y + action.vertex.geometry.height + 20;
    return {
      top,
      left,
      transform: `translateX(-50%)`,
      display: "block",
    };
  }, [isActionConfigOpen]);

  const isProtocol = useCallback((cellId) => {
    const action = filter(getActionCells(), function (n) {
      return n.vertex?.id === cellId;
    })[0];

    if (!action) {
      const protocol = filter(getProtocolCells(), function (n) {
        return n.vertex?.id === cellId;
      })[0];

      if (protocol) {
        return true;
      }

      return false;
    } else {
      return false;
    }
  }, []);

  const closePanel = useCallback(() => {
    openPanel(null);
  }, []);



  const getSelectedProtocol = () => getProtocolForCellId(getSelectedCell().id);
  const insertProtocolAndOpenPanel = useCallback((protocol) => {
    const graph = getGraph();
    const cell = insertProtocol(protocol);
   
    setSelectedCell(cell.vertex);
    openPanel(protocol);
    const selectionModel = graph.getSelectionModel();
    selectionModel.setCell(cell.vertex);
  }, []);
  const handleDrop = useCallback((name) => {
    insertProtocolAndOpenPanel(name);
  }, []);

  const insertAction = useCallback(() => {
    let selectedProtocol = getSelectedProtocol();
    const prevProtocol = getProtocolCells()[getProtocolCells().findIndex(item => item.protocolId === selectedProtocol.protocolId) - 1];
    insertinGraph(prevProtocol.protocolId,selectedProtocol.protocolId)
  }, []);
  useEffect(() => {
    const container = divRef.current;

    const graph = new mx.mxGraph(container);
    graphRef.current = graph;
    graph.setEnabled(true);
    graph.setAllowDanglingEdges(false);
    graph.setDisconnectOnMove(false);
    graph.setCellsMovable(false);
    graph.addMouseListener({
      mouseDown: function (sender, evt) {
        let cell = evt.getCell();
        if (cell != null) {
          setSelectedCell(cell);
          closePanel();
          const protocol = getProtocolForCellId(cell.id);
          console.log(cell, protocol);
          const aIsPRotocol = isProtocol(cell.id);
          if (aIsPRotocol) {
            openPanel(protocol.protocol);
          } else {
            closePanel();
            openActionBar(getSelectedCell().id);
          }
        } else {
          closePanel();
          hideActionBar();
        }
      },
      mouseMove: function (sender, evt) {
        mx.mxLog.debug("mouseMove");
      },
      mouseUp: function (sender, evt) {
        mx.mxLog.debug("mouseUp");
      },
    });

    graph.addListener("size", function () {
      // Adds animation to edge shape and makes "pipe" visible
      graph.view.states.visit(function (key, state) {
        if (graph.model.isEdge(state.cell)) {
          state.shape.node
            .getElementsByTagName("path")[0]
            .removeAttribute("visibility");
          state.shape.node
            .getElementsByTagName("path")[0]
            .setAttribute("stroke-width", "6");
          state.shape.node
            .getElementsByTagName("path")[0]
            .setAttribute("stroke", "lightGray");
          state.shape.node
            .getElementsByTagName("path")[1]
            .setAttribute("class", "flow");
        }
      });
    });

    graph.createHandler = function (state) {
      if (state != null && this.model.isVertex(state.cell)) {
        return new mxVertexToolHandler(state);
      }

      return mx.mxGraph.prototype.createHandler.apply(this, arguments);
    };

    // graph.getModel().beginUpdate();
    // try {
    //   insertProtocolAndOpenPanel("BY");
    // } finally {
    //   // Updates the display
    //   graph.getModel().endUpdate();
    // }

    mx.mxEvent.addListener(container, "drop", function (evt) {
      if (graph.isEnabled()) {
        evt.stopPropagation();
        evt.preventDefault();

        const protocol = evt.dataTransfer.getData("protocol");
        console.log(protocol);
        handleDrop(protocol);
      }
    });
    mx.mxEvent.addListener(container, "dragover", function (evt) {
      if (graph.isEnabled()) {
        evt.stopPropagation();
        evt.preventDefault();
      }
    });
    restoreGraphFromState();
  }, []);
  
  const graphMethods = {
    getActionCells,
    getProtocolByName,
    getSelectedCell,
    getSelectedProtocol,
    insertAction,
    insertProtocol: insertProtocolAndOpenPanel,
    getActionConfigStyle,
    getProtocol,
    resetGraph,
    divRef
  };

  return useMemo(
    () => (
      <GraphContext.Provider value={graphMethods}>
        <div ref={divRef} className="graph-wrapper"></div>
        {children}
      </GraphContext.Provider>
    ),
    [getActionConfigStyle, children]
  );
};

export const useGraphMethods = () => {
  const graphMethods = useContext(GraphContext);
  return graphMethods;
};
