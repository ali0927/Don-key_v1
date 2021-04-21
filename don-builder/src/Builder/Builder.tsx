import clsx from "clsx";
import { Web3Provider } from "don-components";
import { uuidv4 } from "don-utils";
import React, { useMemo, useReducer, useRef, useState, useEffect } from "react";
import Protocol from "../Components/Protocol/Protocol";
import { ProtocolBar } from "../Components/ProtocolBar";
import { IBuilderActionsContext, IProtocolFromAPI } from "../interfaces";
import ReactFlow, {
  addEdge,
  Connection,
  Controls,
  Edge,
  Elements,
  NodeTypesType,
  OnLoadParams,
  ReactFlowProvider,
  XYPosition,
  isNode,
  Node,
  isEdge,
  ArrowHeadType,
} from "react-flow-renderer";
import "./main.scss";
import { BuilderActionsProvider } from "../Components/BuilderActionsProvider/BuilderActionsProvider";
import produce from "immer";

import Panel from "../Components/Panel/Panel";
import { ActionNode } from "../ActionNode";
import { ProtocolNode } from "../ProtocolNode";
import { ConnectionLineComp } from "../ConnectionLineComp/ConnectionLineComp";
import { CustomEdge } from "../CustomEdge/CustomEdge";

const uid = function () {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

const calcPositionForActionNode = (prevNode: Node, nextNode: Node) => {
  const position: XYPosition = {
    x: (prevNode.position.x + nextNode.position.x) / 2,
    y: prevNode.position.y + 100,
  };
  return position;
};

const NodeTypes = {
  [ActionNode.name]: ActionNode,
  [ProtocolNode.name]: ProtocolNode,
};

const findNextNode = (elements: Elements, currentNode: Node) => {
  let nextNode: Node | null = null;
  const sourceId = currentNode.id;
  for (let i = 0; i < elements.length; i++) {
    const elm = elements[i];
    if (isNode(elm)) {
      continue;
    }
    if (isEdge(elm)) {
      if (elm.source === sourceId) {
        const target = elements.find((item) => item.id === elm.target);
        nextNode = (target as Node) || null;
        break;
      }
    }
  }
  return nextNode;
};
const findPreviousNode = (elements: Elements, currentNode: Node) => {
  let prevNode: Node | null = null;
  const targetId = currentNode.id;
  for (let i = 0; i < elements.length; i++) {
    const elm = elements[i];
    if (isNode(elm)) {
      continue;
    }
    if (isEdge(elm)) {
      if (elm.target === targetId) {
        const target = elements.find((item) => item.id === elm.source);
        prevNode = (target as Node) || null;
        break;
      }
    }
  }
  return prevNode;
};


const edgeTypes = {
  custom: CustomEdge,
};

function Builder({
  protocols,
  strategy,
  onChange
}: {
  protocols: IProtocolFromAPI[];
  strategy: Elements;
  onChange: (value: Elements) => void;
}) {
  const [state, setState] = useState<{
    elements: Elements;
    nextNode: Elements[0] | null;
    prevNode: Elements[0] | null;
  }>({ elements: strategy, nextNode: null, prevNode: null });
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [
    reactFlowInstance,
    setReactFlowInstance,
  ] = useState<OnLoadParams | null>(null);
  const onLoad = (_reactFlowInstance: OnLoadParams) =>
    setReactFlowInstance(_reactFlowInstance);
  const firstSeven = useMemo(() => {
    return protocols.length > 6
      ? protocols.slice(0, protocols.length - 1)
      : protocols;
  }, [protocols]);
  const protocolMap = useMemo(() => {
    const protocolMap: { [x: string]: IProtocolFromAPI } = {};
    protocols.forEach((item) => {
      protocolMap[item.name] = item;
    });
    return protocolMap;
  }, [protocols]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if(state && state?.elements?.length > 1 && state?.elements?.length > strategy?.length) {
      onChange(state?.elements);
    }

  },[state?.elements, strategy])

  const actions: IBuilderActionsContext = useMemo(() => {
    return {
      addAction: (name: string, actionData: any) => {
        setState((old) => {
          return produce(old, (draft) => {
            const { prevNode, nextNode } = old;
            if (!nextNode || !prevNode) {
              return;
            }
            if (isEdge(prevNode) || isEdge(nextNode)) {
              return;
            }
            const prevProtocol = prevNode?.data?.name;
            const nextProtocol = nextNode?.data?.name;

            const newActionNode: Node = {
              id: uid(),
              type: ActionNode.name,
              data: {
                leftColor: protocolMap[prevProtocol].edgeColor,
                rightColor: protocolMap[nextProtocol].edgeColor,
                actionData,
                label: name,
              },
              position: calcPositionForActionNode(prevNode, nextNode),
            };

            const edge1: Edge = {
              id: uid(),
              source: prevNode.id,
              target: newActionNode.id,
              style: {
                stroke: protocolMap[prevProtocol].edgeColor,
                strokeWidth: 4,
              },
              type: "smoothstep",
              arrowHeadType: ArrowHeadType.ArrowClosed,
              animated: true,
            };

            const edge2: Edge = {
              id: uid(),
              source: newActionNode.id,
              target: nextNode.id,
              style: {
                stroke: protocolMap[nextProtocol].edgeColor,
                strokeWidth: 4,
              },
              animated: true,
              arrowHeadType: ArrowHeadType.ArrowClosed,
              type: "smoothstep",
            };
            draft.elements.push(newActionNode, edge1, edge2);
          });
        });
      },
      removeAction: () => {},
    };
  }, []);

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();

    const reactFlowBounds = reactFlowWrapper.current!.getBoundingClientRect();
    const name = e.dataTransfer.getData("protocol");
    const position = reactFlowInstance!.project({
      x: e.clientX - reactFlowBounds.left,
      y: e.clientY - reactFlowBounds.top - 40,
    });
    const newNode: Elements[0] = {
      id: uid(),
      position,
      type: ProtocolNode.name,
      data: { imageUrl: protocolMap[name].vertextImage, name },
    };
    setState((old) =>
      produce(old, (draft) => {
        draft.elements.push(newNode);
      })
    );
  };

  const onDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  const onConnect = (params: Edge<any> | Connection) => {
    setState((old) => {
      return produce(old, (draft) => {
        const prevNode = old.elements.find((item) => item.id === params.source);
        const currentNode = old.elements.find(
          (item) => item.id === params.target
        );
        if (currentNode) {
          draft.nextNode = currentNode;
        }
        if (prevNode) {
          draft.prevNode = prevNode;
        }
      });
    });
  };

  const onElementClick = (e: React.MouseEvent, elm: Elements[0]) => {
    if (isNode(elm)) {
      if (elm.type === ActionNode.name) {
        setState((old) => {
          return produce(old, (draft) => {
            draft.nextNode = findNextNode(old.elements, elm);
            draft.prevNode = findPreviousNode(old.elements, elm);
          });
        });
      }
    }
  };

  const closePanel = () => {
    setState((old) => ({
      elements: old.elements,
      nextNode: null,
      prevNode: null,
    }));
  };

  return (
    <Web3Provider>
      <ReactFlowProvider>
        <BuilderActionsProvider actions={actions}>
          <div className={clsx(`page-wrapper`)} ref={reactFlowWrapper}>
            <ReactFlow
              onLoad={onLoad}
              onDrop={onDrop}
              edgeTypes={edgeTypes}
              onDragOver={onDragOver}
              nodeTypes={NodeTypes}
              onElementClick={onElementClick}
              connectionLineComponent={ConnectionLineComp}
              elements={state.elements}
              onConnect={onConnect}
              defaultZoom={0.8}
              maxZoom={0.8}
            >
              <Controls />
            </ReactFlow>
            <ProtocolBar>
              {firstSeven.map(({ name, showOnToolbar, toolbarImageURL }) => {
                return (
                  <Protocol
                    key={name}
                    icon={toolbarImageURL}
                    name={name}
                    showOnToolbar={showOnToolbar}
                  />
                );
              })}
            </ProtocolBar>
            {state.nextNode && state.prevNode && (
              <Panel
                isOpen
                lastProtocol={protocolMap[state.prevNode.data?.name as string]}
                onClose={closePanel}
                currentProtocol={
                  protocolMap[state.nextNode.data?.name as string]
                }
              ></Panel>
            )}
          </div>
        </BuilderActionsProvider>
      </ReactFlowProvider>
    </Web3Provider>
  );
}

export { Builder };

//put deploy strategy code from new farmer code
//put addCubes code from new farmer code
//put runStrategy code from new farmer code
//put ClearCube code from new farmer code
