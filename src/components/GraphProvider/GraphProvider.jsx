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

export const GraphProvider = ({ children, openPanel, protocols }) => {
  const protocolCellsRef = useRef([]);
  const actionCellsRef = useRef([]);
  const [getSelectedCell, setSelectedCell] = useSetRef({});


  const getProtocol = (name) => {
    const index = findIndex(protocols, item => item.name === name);
    if (index === -1) {
      return null;
    }
    return protocols[index];
  }

  const [isActionConfigOpen, openActionBar, hideActionBar] = useToggle();

  const graphRef = useRef(null);
  const divRef = useRef(null);
  const addProtocolCell = (cell) => {
    protocolCellsRef.current.push(cell);
  };

  const getProtocolCells = () => {
    return protocolCellsRef.current;
  };

  const getActionCells = () => {
    return actionCellsRef.current;
  };

  const addActionCell = (cell) => {
    actionCellsRef.current.push(cell);
  };

  const getActionForCellId = useCallback((cellId) => {
    return filter(getActionCells(), function (n) {
      return n.mxObjectId === cellId;
    })[0];
  }, []);

  const getGraph = useCallback(() => {
    return graphRef.current;
  }, []);

  const getProtocolForCellId = useCallback((cellId) => {
    return filter(getProtocolCells(), function (n) {
      return n.mxObjectId === cellId;
    })[0];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getProtocolByName = useCallback((protocol) => {
    return filter(getProtocolCells(), function (n) {
      return n.protocol === protocol;
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
      return n.mxObjectId === cellId;
    })[0];

    if (!action) {
      const protocol = filter(getProtocolCells(), function (n) {
        return n.mxObjectId === cellId;
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

  const getLastCellProtocol = useCallback(() => {
    let protocols = filter(getProtocolCells(), function (n) {
      return n.isAction === false;
    });

    return protocols[protocols.length - 1];
  }, []);



  const resetGraph = useCallback(() => {
    let graph = getGraph();
    graph.removeCells(graph.getChildVertices(graph.getDefaultParent()))
  });


  const getSelectedProtocol = () => getProtocolForCellId(getSelectedCell().id);
  const insertProtocol = useCallback((protocolName) => {
    const base64 = getProtocol(protocolName).base64;

    let w = 136;
    let h = 136;

    let data = "";
    // Converts format of data url to cell style value for use in vertex
    let semi = base64.indexOf(";");

    if (semi > 0) {
      data =
        base64.substring(0, semi) +
        base64.substring(base64.indexOf(",", semi + 1));
    }
    let graph = getGraph();
    w = 110;
    h = 110;
    let parent = graph.getDefaultParent();

    const lastProtocol = getLastCellProtocol();
    let x = 200;
    let y = 150;

    if (lastProtocol) {
      x = lastProtocol.x + 150;
      y = lastProtocol.y;
    }

    let newVertex = {};
    graph.getModel().beginUpdate();
    try {
      newVertex = graph.insertVertex(
        parent,
        null,
        "",
        x,
        y,
        w,
        h,
        "resizable=0;shape=image;image=" + data + ";"
      );
    } finally {
      // Updates the display
      graph.getModel().endUpdate();
    }
    console.log(lastProtocol, "lastProtocol");
    addProtocolCell({
      mxObjectId: newVertex.id,
      vertex: newVertex,
      isAction: false,
      buru: false,
      protocol: protocolName,
      x: x,
      y: y,
      lastProtocol: lastProtocol?.protocol,
    });

    // setCurrentProtocol(protocolName);
    setSelectedCell(newVertex);

    openPanel(protocolName);
    const selectionModel = graph.getSelectionModel();
    selectionModel.setCell(newVertex);
  }, []);
  const handleDrop = useCallback((name) => {
    insertProtocol(name);
  }, []);

  const insertAction = useCallback(() => {
    let selectedProtocol = getSelectedProtocol();

    const previousCell = getProtocolByName(selectedProtocol.lastProtocol);
    console.log(selectedProtocol);
    //get action image
    let base64 =
      actionsMap[selectedProtocol.lastProtocol][selectedProtocol.protocol]
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

    const x = previousCell.x + 80;
    const y = 350;

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
    addActionCell({
      mxObjectId: actionVertex.id,
      vertex: actionVertex,
      isAction: true,
      buru: false,
      x: x,
      y: y,
    });

    //get selected cell edge color
    const protocol = getProtocol(previousCell.protocol);
    const lastCellProtocolEdge = protocol.edgeColor;
    const selectedCellProtocolEdge = getProtocol(selectedProtocol.protocol).edgeColor;

    graph.getModel().beginUpdate();

    try {
      //TODO: SHOULD STORE EDGES
      graph.insertEdge(
        parent,
        null,
        "",
        actionVertex,
        getSelectedCell(),
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

    graph.getModel().beginUpdate();
    try {
      insertProtocol("BY", 100, 150);
    } finally {
      // Updates the display
      graph.getModel().endUpdate();
    }

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
  }, []);

  const graphMethods = {
    getActionCells,
    getProtocolByName,
    getSelectedCell,
    getSelectedProtocol,
    insertAction,
    insertProtocol,
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
