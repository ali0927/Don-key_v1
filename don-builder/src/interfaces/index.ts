
export type IProtocol = {
    id: number;
    name: string;
    website: string;
    toolbarImageURL: string;
    showOnToolbar: "1" | "0";
    edgeColor: string;
    description: string;
    vertexImageURL: string;
    base64: string;
};

export type IProtocolCell = {
    protocolId: string;
    protocol: string;
    lastProtocol?: string;
    previousCell?: IProtocolCell | null
    x: number;
    y: number;
    w: number;
    h: number;
    isAction: boolean;
    buru: boolean;
    vertex: any | null;
    data?: any
};

export type IProtocolFromAPI = {
    base64: string;
    description: string;
    edgeColor: string;
    id: number;
    mediumImageURL: string | null;
    name: string;
    showOnToolbar: "1" | "0";
    toolbarImageURL: string;
    vertexImageURL: string;
    website: string;
    actions: any[];
    data?: any;
};

export type IActionCell = {
    vertex: any | null;
    prevProtocolCellId: string;
    nextProtocolCellId: string;
    data?: any;
    imageUrl: string;
    y: number;
    isAction: boolean;
    x: number;
    actionName: string;
    actionId: string;
};

export type IStrategy = {
    id?: string;
    protocolCells: IProtocolCell[];
    actionCells: IActionCell[];
};
