import { filter, findIndex } from "lodash";
import { useCallback, useEffect, useRef, useState } from "react";
import { PROTOCOLS } from "./PROTOCOLS";
import { actionsMap } from "./ActionsMap";
import { useToggle } from "./useToggle";
import factory from "mxgraph";

const mx = factory({
  mxBasePath: ""
});

let _currentProtocol = '';
let _selectedCell ={};

function mxVertexToolHandler() {
  mx.mxVertexHandler.apply(this, arguments);
}
mxVertexToolHandler.prototype = new mx.mxVertexHandler();
mxVertexToolHandler.prototype.constructor = mxVertexToolHandler;

mxVertexToolHandler.prototype.domNode = null;

function getProtocolForCellId(protocolCells, cellId) {
  return filter(protocolCells, function (n) {
    return n.mxObjectId === cellId;
  })[0];
}

function getProtocolByName(protocolCells, protocol) {
  return filter(protocolCells, function (n) {
    return n.protocol == protocol;
  })[0];
}

export const useGraph = ({ id }) => {

  const protocolCellsRef = useRef([]);
  const actionCellsRef = useRef([]);
  const [selectedCell, setSelectedCell] = useState(null);
  const [currentProtocol, setCurrentProtocol] = useState(null);
  const [isActionConfigOpen, openActionBar, hideActionBar] = useToggle();
  const [panel, openPanel] = useState(null);
  const [isModalOpen, , , toggleModal] = useToggle();


  const graphRef = useRef(null);

  const addProtocolCell = useCallback((cell) => {
    protocolCellsRef.current.push(cell);
  }, []);

  const getProtocolCells = useCallback(() => {
    return protocolCellsRef.current;
  }, []);

  const getActionCells = useCallback(() => {
    return actionCellsRef.current;
  }, []);

  const addActionCell = useCallback((cell) => {
    actionCellsRef.current.push(cell);
  }, []);

  const getActionForCellId = useCallback((cellId) => {
    return filter(getActionCells(), function (n) {
      return n.mxObjectId === cellId;
    })[0];
  }, []);

  const getGraph = useCallback(() => {
    return graphRef.current;
  }, []);

  const getActionConfigStyle = () => {
    if (!isActionConfigOpen) {
      return {};
    }
    if (!_selectedCell) {
      return {};
    }

    const action = getActionForCellId(_selectedCell.id);
    if (!action) {
      return {};
    }
    let left = 0;
    let top = 0;

    left = action.x + 20;
    top = action.y + 65;
    return {
      top,
      left,
      display: "block"
    };
  };

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

  const insertProtocol = useCallback((protocolName) => {
    const base64 = PROTOCOLS[protocolName].base64;

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

    let newVertex = graph.insertVertex(
      parent,
      null,
      "",
      x,
      y,
      w,
      h,
      "resizable=0;shape=image;image=" + data + ";"
    );

    addProtocolCell({
      mxObjectId: newVertex.id,
      vertex: newVertex,
      isAction: false,
      buru: false,
      protocol: protocolName,
      x: x,
      y: y,
      lastProtocol: _currentProtocol
    });

    _currentProtocol = protocolName;
    _selectedCell = newVertex;

    openPanel(PROTOCOLS[protocolName].panel);
    const selectionModel = graph.getSelectionModel();
    selectionModel.setCell(newVertex);

  }, []);
  const handleDrop = useCallback((name) => {
    insertProtocol(name);
  }, []);

  const insertAction = useCallback(() => {
    let selectedProtocol = getProtocolForCellId(
      getProtocolCells(),
      _selectedCell.id
    );

    const previousCell = getProtocolByName(getProtocolCells(),selectedProtocol.lastProtocol);

    //get action image
    let base64 = actionsMap[selectedProtocol.lastProtocol][selectedProtocol.protocol].deposit; // REFACTOR FOR GENERIC ACTIONS

    const graph = getGraph();
    const parent = graph.getDefaultParent();

    let data = '';
    // Converts format of data url to cell style value for use in vertex
    const semi = base64.indexOf(';');

    if (semi > 0) {
      data = base64.substring(0, semi) + base64.substring(base64.indexOf(',', semi + 1));
    }

    const vertexStyleAction = 'shape=image;strokeWidth=2;fillColor=#4F4F4F;strokeColor=black;resizable=0;' +
      'gradientColor=#313130;fontColor=white;fontStyle=0;spacingTop=12;image=' + data;

    const x = previousCell.x + 80;
    const y = 450;

    const actionVertex = graph.insertVertex(
      parent,
      null,
      "",
      x,
      y,
      103,
      61,
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

    const lastCellProtocolEdge = PROTOCOLS[previousCell.protocol].edgeColor;
    const selectedCellProtocolEdge =
      PROTOCOLS[selectedProtocol.protocol].edgeColor;

    // graph.model.setValue(actionVertex, "Deposit");


    //TODO: SHOULD STORE EDGES
    graph.insertEdge(
      parent,
      null,
      "",
      actionVertex,
      _selectedCell,
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
  }, [_selectedCell]);
  useEffect(() => {
    const container = document.getElementById(id);

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

          _selectedCell = cell;
          closePanel();
          const protocol = getProtocolForCellId(getProtocolCells(), cell.id);

          const aIsPRotocol = isProtocol(cell.id);
          if (aIsPRotocol) {
            const pData = PROTOCOLS[protocol.protocol];
            openPanel(pData.panel);
          } else {
            closePanel();
          }
        } else {
          closePanel();
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
      insertProtocol("buru", 100, 150);
    } finally {
      // Updates the display
      graph.getModel().endUpdate();
    }

    mx.mxEvent.addListener(container, "drop", function (evt) {
      if (graph.isEnabled()) {
        evt.stopPropagation();
        evt.preventDefault();

        // eslint-disable-next-line no-restricted-globals
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
  return {
    getActionConfigStyle,
    graphRef,
    insertAction,
    isModalOpen,
    toggleModal,
    panel,
    closePanel,
    openPanel,
  };
};