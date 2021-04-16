import React from "react";
import { NodeProps, XYPosition } from "react-flow-renderer";

export type NodeComp = React.FC<NodeProps>;

export type IProtocolFromAPI = {
  description: string;
  edgeColor: string;
  name: string;
  showOnToolbar: boolean;
  toolbarImageURL: string;
  vertextImage: string;
  website: string;
  actions: {
    [actionName: string]: {
      icon: string;
      Comp: React.ComponentType;
    };
  };
  data?: any;
};

export type IBuilderActionsContext = {
  addAction: (name: string, actionData: any) => void;
  removeAction: (id: string) => void;
};
